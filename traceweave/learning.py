"""Portable inference for GPU-trained weights. Suggestions never approve logs."""
import hashlib
import ipaddress
import json
import math
import re
from functools import lru_cache
from pathlib import Path

DIMENSIONS=2048
LABELS=("src_ip","dst_ip","src_port","dst_port","action","timestamp","protocol","ignore")
MODEL_PATH=Path(__file__).resolve().parents[1]/"models/field_mapper.json"

def normalized_name(name):
    return re.sub(r"[^a-z0-9]","",str(name).lower())

def features(name,value):
    words=re.sub(r"([a-z])([A-Z])",r"\1 \2",str(name)).lower()
    words=re.findall(r"[a-z]+|[0-9]+",words)
    compact="^"+"_".join(words)+"$"
    tokens={"word:"+word for word in words}
    for size in (2,3,4):
        tokens.update("gram:"+compact[start:start+size] for start in range(max(0,len(compact)-size+1)))
    vector={}
    for token in sorted(tokens):
        index=int.from_bytes(hashlib.blake2s(token.encode(),digest_size=4).digest(),"little")%DIMENSIONS
        vector[index]=vector.get(index,0)+1.0
    norm=math.sqrt(sum(v*v for v in vector.values())) or 1
    vector={i:v/norm for i,v in vector.items()}
    kind="text"
    text=str(value).strip()
    try:
        ipaddress.ip_address(text)
        kind="ip"
    except ValueError:
        if text.isdigit(): kind="number"
        elif re.match(r"^\d{4}-\d\d-\d\d[T ]",text): kind="time"
        elif text.lower() in ("allow","accept","permit","deny","drop","block","reject"): kind="action"
        elif text.lower() in ("tcp","udp","icmp","icmpv6"): kind="protocol"
    if isinstance(value,(dict,list,bool)) or value is None: kind="complex"
    vector[DIMENSIONS+("text","ip","number","time","action","protocol","complex").index(kind)]=0.5
    return vector

def classify(model,name,value):
    vector=features(name,value)
    logits=[sum(weights[index]*amount for index,amount in vector.items())+bias for weights,bias in zip(model["weights"],model["bias"])]
    maximum=max(logits)
    exps=[math.exp(x-maximum) for x in logits]
    probabilities=[x/sum(exps) for x in exps]
    order=sorted(range(len(probabilities)),key=lambda index:probabilities[index],reverse=True)
    best,second=order[:2]
    label=model["labels"][best]
    score=probabilities[best]
    margin=score-probabilities[second]
    accepted=label!="ignore" and score>=model["threshold"] and margin>=model["margin"]
    return {"target":label if accepted else None,"predicted":label,"score":round(score,4),"margin":round(margin,4),"method":"gpu-trained-field-mapper","model_version":model["version"],"review_required":True}

@lru_cache(maxsize=1)
def load_model():
    if not MODEL_PATH.exists(): return None
    model=json.loads(MODEL_PATH.read_text(encoding="utf-8"))
    if not isinstance(model,dict) or not isinstance(model.get("version"),str):
        raise ValueError("Invalid mapping model metadata")
    if model.get("feature_version")!=1 or model.get("labels")!=list(LABELS) or len(model.get("weights",[]))!=len(LABELS):
        raise ValueError("Unsupported mapping model artifact")
    if any(len(row)!=DIMENSIONS+7 for row in model["weights"]): raise ValueError("Invalid mapping model dimensions")
    if len(model.get("bias",[]))!=len(LABELS) or not 0<=model.get("threshold",-1)<=1 or not 0<=model.get("margin",-1)<=1:
        raise ValueError("Invalid mapping model parameters")
    if any(not isinstance(x,(int,float)) or not math.isfinite(x) for row in model["weights"] for x in row):
        raise ValueError("Non-finite mapping model weights")
    if any(not isinstance(x,(int,float)) or not math.isfinite(x) for x in model["bias"]):
        raise ValueError("Non-finite mapping model bias")
    return model

def model_info():
    try:
        model=load_model()
        if model is None: return {"available":False,"reason":"No trained model installed"}
        return {"available":True,"version":model["version"],"training_backend":model["training"]["backend"],"training_device":model["training"]["adapter"].rstrip('\x00'),"review_required":True,"purpose":"Optional field-mapping suggestions for unfamiliar formats; never automatic approval","inference":"Local portable inference; no GPU or network needed to use the saved model"}
    except (OSError,ValueError,KeyError,TypeError):
        return {"available":False,"reason":"Model unavailable; ordinary parsing and manual review remain available"}

def propose(fields,existing,validator):
    try: model=load_model()
    except (OSError,ValueError,KeyError,TypeError): return {},[]
    if model is None: return {},[]
    used=set(existing.values())
    candidates=[]
    for name,value in fields.items():
        if name in existing: continue
        prediction=classify(model,name,value)
        target=prediction["target"]
        if target is None or target in used: continue
        try: validator(target,value)
        except (TypeError,ValueError,OverflowError): continue
        candidates.append({"field":name,**prediction})
    mapping={}
    evidence=[]
    for target in LABELS[:-1]:
        options=[p for p in candidates if p["target"]==target]
        # An ambiguous choice between two source fields is left to the reviewer.
        if len(options)==1:
            mapping[options[0]["field"]]=target
            evidence.append(options[0])
    return mapping,evidence
