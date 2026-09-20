"""Train on the explicitly selected AMD GPU; unsupported DML operations fail.

No CPU training fallback. JSON export permits dependency-free local inference.
"""
import argparse
import hashlib
import json
import platform
import sys
import time
import warnings
from datetime import datetime, timezone
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(ROOT))
from traceweave.learning import DIMENSIONS,LABELS,features,classify,normalized_name


def evaluate(model,rows):
    outcomes=[]
    for row in rows:
        prediction=classify(model,row["field"],row["value"])
        outcomes.append({"field":row["field"],"expected":row["label"],**prediction})
    suggestions=[item for item in outcomes if item["target"] is not None]
    correct=sum(item["target"]==item["expected"] for item in suggestions)
    positive=sum(item["expected"]!="ignore" for item in outcomes)
    return {"examples":len(rows),"suggestions":len(suggestions),"correct_suggestions":correct,"incorrect_suggestions":len(suggestions)-correct,"abstained":len(rows)-len(suggestions),"precision_when_suggesting":correct/len(suggestions) if suggestions else None,"positive_coverage":correct/positive if positive else 0,"top1_accuracy":sum(item["predicted"]==item["expected"] for item in outcomes)/len(outcomes),"outcomes":outcomes}


def main():
    parser=argparse.ArgumentParser()
    parser.add_argument("--gpu-name",default="RX 6500M")
    parser.add_argument("--epochs",type=int,default=800)
    args=parser.parse_args()
    import torch
    import torch_directml
    warnings.filterwarnings("error",message=".*DML backend.*")
    warnings.filterwarnings("error",message=".*fall.*CPU.*")
    adapters=[{"index":index,"name":torch_directml.device_name(index)} for index in range(torch_directml.device_count())]
    matches=[adapter for adapter in adapters if args.gpu_name.lower() in adapter["name"].lower()]
    if len(matches)!=1:
        raise RuntimeError("Expected exactly one requested GPU; refusing CPU/integrated fallback: "+json.dumps(adapters))
    selected=matches[0]
    device=torch_directml.device(selected["index"])
    print(json.dumps({"gpu":selected,"device":str(device),"torch":torch.__version__}),flush=True)
    # Backpropagation smoke test verifies the chosen device before training.
    probe=torch.tensor([[1.,2.],[3.,4.]],device=device,requires_grad=True)
    probe_loss=(probe@probe).sum()
    probe_loss.backward()
    smoke={"value":probe_loss.detach().cpu().item(),"gradient_device":str(probe.grad.device),"passed":str(probe.grad.device)==str(device)}
    if not smoke["passed"]: raise RuntimeError("GPU backpropagation probe failed")
    data_path=ROOT/"datasets/model/field_labels.json"
    dataset=json.loads(data_path.read_text(encoding="utf-8"))
    splits={name:[row for row in dataset["rows"] if row["split"]==name] for name in ("train","validation","test")}
    names={split:{normalized_name(row["field"]) for row in rows} for split,rows in splits.items()}
    if names["train"]&names["test"] or names["train"]&names["validation"] or names["test"]&names["validation"]:
        raise ValueError("Field-name leakage between splits")
    # Preprocessing occurs before upload; all forward/backward/SGD updates use DML.
    x=[]; y=[]
    for row in splits["train"]:
        dense=[0.]*(DIMENSIONS+7)
        for index,value in features(row["field"],row["value"]).items(): dense[index]=value
        x.append(dense); y.append(LABELS.index(row["label"]))
    inputs=torch.tensor(x,dtype=torch.float32,device=device)
    targets=torch.tensor(y,dtype=torch.long,device=device)
    torch.manual_seed(20260920)
    network=torch.nn.Linear(DIMENSIONS+7,len(LABELS)).to(device)
    optimizer=torch.optim.SGD(network.parameters(),lr=1.2,momentum=0.9,weight_decay=0.0003,foreach=False)
    loss_function=torch.nn.CrossEntropyLoss()
    start=time.perf_counter(); losses=[]
    for epoch in range(args.epochs):
        optimizer.zero_grad(set_to_none=True)
        predictions=network(inputs)
        loss=loss_function(predictions,targets)
        loss.backward()
        if any(str(p.grad.device)!=str(device) for p in network.parameters()):
            raise RuntimeError("A training gradient left the selected GPU")
        optimizer.step()
        if epoch%100==0 or epoch==args.epochs-1:
            value=loss.detach().cpu().item()
            losses.append({"epoch":epoch+1,"loss":value})
            print(f"GPU epoch {epoch+1}/{args.epochs}: loss={value:.6f}",flush=True)
    # Synchronize by copying final weights. No executable/pickle artifact is used.
    weights=network.weight.detach().cpu().tolist()
    bias=network.bias.detach().cpu().tolist()
    elapsed=time.perf_counter()-start
    model={"version":"field-mapper-dml-1","feature_version":1,"labels":list(LABELS),"weights":weights,"bias":bias,"threshold":0.8,"margin":0.2,"training":{"backend":"DirectML","adapter":selected["name"],"device":str(device),"epochs":args.epochs,"seed":20260920,"dataset_sha256":hashlib.sha256(data_path.read_bytes()).hexdigest()}}
    # Fixed grid uses only validation data. Prefer precision, then coverage.
    choices=[]
    for threshold in (0.65,0.75,0.8,0.85,0.9,0.95):
        for margin in (0.15,0.25,0.4):
            model.update(threshold=threshold,margin=margin)
            report=evaluate(model,splits["validation"])
            if report["suggestions"] and report["precision_when_suggesting"]>=0.95:
                choices.append((report["correct_suggestions"],report["precision_when_suggesting"],threshold,margin))
    if choices:
        _,_,threshold,margin=max(choices)
    else:
        threshold,margin=0.99,0.6
    model.update(threshold=threshold,margin=margin)
    report={"created_at":datetime.now(timezone.utc).isoformat(),"hardware":selected,"available_adapters":adapters,"backend":"DirectML","torch_version":torch.__version__,"python":platform.python_version(),"smoke_test":smoke,"optimizer":"SGD, all parameter updates and gradients on selected DirectML device","training_seconds":round(elapsed,3),"parameter_count":sum(p.numel() for p in network.parameters()),"gpu_input_bytes":inputs.numel()*inputs.element_size()+targets.numel()*targets.element_size(),"loss_history":losses,"split_counts":{key:len(value) for key,value in splits.items()},"split_overlap":False,"threshold":threshold,"margin":margin,"validation":evaluate(model,splits["validation"]),"test":evaluate(model,splits["test"]),"limitations":["Authored field names and synthetic value shapes, not independent production data.","Scores are uncalibrated softmax outputs, not probabilities of semantic correctness.","No automatic approval or normalization of model suggestions.","Not an LLM; not trained to detect cyberattacks; names alone cannot prove field meaning.","Inference artifact is portable; training requires the selected GPU. No CPU training fallback is implemented."]}
    destination=ROOT/"models/field_mapper.json"; destination.parent.mkdir(exist_ok=True)
    destination.write_text(json.dumps(model,separators=(',',':'))+'\n',encoding='utf-8',newline='\n')
    report["model_sha256"]=hashlib.sha256(destination.read_bytes()).hexdigest()
    report["model_bytes"]=destination.stat().st_size
    (ROOT/"docs/evidence/gpu-training.json").write_text(json.dumps(report,indent=2)+'\n',encoding='utf-8',newline='\n')
    print(json.dumps({"gpu":selected['name'],"seconds":report['training_seconds'],"test":{key:value for key,value in report['test'].items() if key!='outcomes'},"model_bytes":report['model_bytes']}),flush=True)


if __name__=="__main__": main()
