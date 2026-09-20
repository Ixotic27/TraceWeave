# Local field-mapping model

Version: `field-mapper-dml-1`. Trained September 20, 2026 (Asia/Calcutta).

## What it does

A small supervised linear classifier suggests seven field meanings: source IP,
destination IP, source port, destination port, action, timestamp and protocol.
An eighth class represents fields that should be ignored. Character n-grams,
word tokens and value-shape features form a 2,055-dimensional input.
The model has **16,448 learned parameters** and its JSON artifact is **358,590 bytes**.
It is not an LLM or a threat-detection model.

The engine first applies known device profiles or exact aliases. Only unfamiliar
fields in the generic profile are eligible for learned suggestions. Existing
aliases are not overwritten, values must pass the target validator, and ambiguous
competing source fields are left for the reviewer. Every new structure still
requires human approval. Model failure leaves ordinary parsing/manual review
available. There is no cloud inference and no automatic runtime training.

## GPU evidence

Training used **AMD Radeon RX 6500M**, DirectML adapter 0 (`privateuseone:0`).
PyTorch 2.4.1 runs with the separate `torch-directml` plugin. Its wheel reports
`2.4.1+cpu`; that package suffix does not describe the selected DirectML device.
A GPU matrix-multiply/backpropagation smoke test passed, and every training
parameter gradient was checked against the selected GPU. Warnings indicating an
unsupported DirectML operator or CPU fallback are treated as errors. There is no
CPU-training fallback in the script.

800 full-batch SGD updates completed in 1.214 seconds, including final weight
transfer but excluding imports, preprocessing and the warmup probe. The training
input tensors occupy about 1.39 MB; this is **not** a measurement of total VRAM.
Loss changed from 2.084275 to 0.068812. Data preparation, report generation and the
small portable inference routine use ordinary host code; forward/backward and
optimizer updates ran on the selected GPU. The saved model can be used on an
air-gapped machine without installing the training framework.

[Microsoft's DirectML setup](https://learn.microsoft.com/en-us/windows/ai/directml/pytorch-windows)
and the [publisher's package](https://pypi.org/project/torch-directml/) document
Windows GPU training support. DirectML is a preview dependency used for training.

## Dataset and measured limits

The corpus is **authored field-name supervision with synthetic value shapes**,
not captured enterprise traffic. It contains 169 training, 40 validation and 60
test examples. Normalized field names do not overlap across those splits;
punctuation/case variants within a training group are not independent examples.
Five cross-split duplicates were excluded explicitly. Public vendor log files in
`datasets/public/` are parser reference material; this run did not claim them as
independently labeled AI training or test examples.

The validation set alone selected a softmax threshold of 0.65 and a best-versus-
second score margin of 0.4. Scores are **uncalibrated**, not probabilities of
semantic correctness. No test-driven retraining was performed after this report.

| Held-out field-name result | Count |
| --- | ---: |
| Examples | 60 |
| Suggestions | 41 |
| Correct suggestions | 39 |
| Incorrect suggestions | 2 |
| Abstentions | 19 |
| Precision when suggesting | 95.12% |
| Correct positive-label coverage | 39 / 40 |
| Top-1 classification accuracy, including ignore | 88.33% |

The two incorrect suggestions were `sourcePortTotal → src_port` and
`actionStatistics → action`; both should be ignored in the authored taxonomy.
These show why a plausible field name and a valid-looking value cannot establish
meaning. The review gate is necessary. These metrics describe this small authored
task and do not establish real-vendor accuracy, attack-detection quality, universal
coverage, or performance against commercial tools.

## Reproduce

Use Windows with a DirectX 12 GPU and Python 3.12. No driver changes are required
by these scripts. Install into a separate training environment:

```powershell
python -m venv .venv-gpu
python -m pip --python .venv-gpu/Scripts/python.exe install --only-binary=:all: -r requirements-gpu.txt
python scripts/build_mapping_dataset.py
.venv-gpu/Scripts/python.exe scripts/train_field_mapper_gpu.py --gpu-name "RX 6500M"
```

`requirements-gpu-lock.txt` records all versions installed in this run. The script
refuses to use a different GPU if the requested adapter is absent. Weights are
JSON, not executable pickles. Restart the local server after replacing the model.

Artifacts: `models/field_mapper.json`, `datasets/model/field_labels.json`, and
`docs/evidence/gpu-training.json`. The evidence records the dataset/model SHA-256,
adapter, GPU gradient probe, loss history, threshold selection and every held-out
prediction. The normal app still starts through `run.ps1` without PyTorch.
