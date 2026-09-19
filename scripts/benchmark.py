"""Reproducible local benchmark. Synthetic data; no commercial comparisons."""
import json
import platform
import statistics
import sys
import time
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))
from traceweave.engine import Engine, normalize, parse_record, suggest
from traceweave.fixtures import SAMPLES, DRIFT, ADVERSARIAL


def main():
    engine = Engine()
    for source, raw in SAMPLES:
        row = engine.ingest(source, raw)
        if row["status"] != "normalized":
            engine.approve(source, row["fingerprint"], row["suggested_mapping"])
    # New values and field order, same grammar. No claim of independent external labels.
    corpus = []
    for i in range(120):
        src = f"192.0.2.{i % 200 + 1}"
        dst = f"198.51.100.{i % 200 + 1}"
        action = "allow" if i % 2 else "deny"
        raw = f'proto=6 action={action} dpt=443 spt={50000+i} dst={dst} src={src} timestamp="2026-09-19T14:00:00Z" rule="evaluation sample"\n'.encode()
        changed = raw.replace(b" src=", b" origin=")
        expected = {"src_ip":src,"dst_ip":dst,"action":action}
        corpus.append(("known", raw, expected))
        corpus.append(("renamed", changed, expected))
    baseline_correct = 0
    trace_before = 0
    ids = []
    start = time.perf_counter()
    for scenario, raw, expected in corpus:
        _, fields = parse_record(raw)
        canonical, _, _, errors = normalize(fields, suggest(fields))
        baseline_correct += int(not errors and all(canonical.get(k) == v for k,v in expected.items()))
        row = engine.ingest("gateway-alpha", raw)
        ids.append((row["id"], expected))
        trace_before += int(row["status"] == "normalized" and all(row["canonical"].get(k) == v for k,v in expected.items()))
    initial_seconds = time.perf_counter() - start
    changed = next(r for r in engine.latest() if r["status"] == "drift")
    mapping = {**changed["suggested_mapping"], "origin":"src_ip"}
    replay_start = time.perf_counter()
    replay = engine.approve("gateway-alpha", changed["fingerprint"], mapping)
    replay_ms = (time.perf_counter() - replay_start) * 1000
    latest = {r["id"]:r for r in engine.latest()}
    trace_after = sum(latest[eid]["status"] == "normalized" and all(latest[eid]["canonical"].get(k)==v for k,v in expected.items()) for eid, expected in ids)
    negative = [engine.ingest(source,raw) for source,raw in ADVERSARIAL]
    # Measures in-memory SQLite transaction + parsing + versioned result insertion.
    # 1,000 repeated fixtures are a throughput microbenchmark, not a generalization set.
    durations=[]
    for i in range(1000):
        t=time.perf_counter(); engine.ingest(*SAMPLES[i % len(SAMPLES)]); durations.append(time.perf_counter()-t)
    ordered=sorted(durations)
    result = {
        "benchmark_version":"1.0", "python":platform.python_version(), "platform":platform.platform(),
        "data":"Authored synthetic fixtures, 240 evaluation records: 120 known structure + 120 renamed-field structure",
        "baseline":"Same parsers and validators, fixed aliases, rejects missing required fields; no mapping review/replay",
        "baseline_correct_valid_records":baseline_correct,"traceweave_correct_before_review":trace_before,"traceweave_correct_after_one_review":trace_after,"evaluation_records":len(corpus),
        "negative_records":len(negative),"negative_records_exported":sum(r["status"] == "normalized" for r in negative),
        "replayed_records":replay["replayed"],"replay_compute_ms":round(replay_ms,2),"human_review_time":"Not measured",
        "raw_integrity":engine.verify(),
        "microbenchmark":{"events":len(durations),"storage":"SQLite in memory; durable disk I/O excluded","events_per_second":round(1/sum(durations)*len(durations),1),"p50_ms":round(statistics.median(durations)*1000,3),"p95_ms":round(ordered[int(len(ordered)*.95)]*1000,3)},
        "limits":["No commercial competitor benchmark", "No external vendor holdout", "No statistically calibrated accuracy claim", "No 10x or billion-events/day achievement claim", "The comparison includes an operator-supplied mapping; the baseline can recover too if edited and replayed"]
    }
    out=ROOT / "docs/evidence/benchmark.json"; out.parent.mkdir(parents=True,exist_ok=True); out.write_text(json.dumps(result,indent=2),encoding="utf-8")
    engine.close()
    print(json.dumps(result,indent=2))


if __name__ == "__main__":
    main()
