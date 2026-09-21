# TraceWeave: simple guide

## What problem are we solving?

Network devices and security tools write logs in different formats. A firewall,
server, cloud service, and intrusion sensor may all use different names for the
same idea. Security teams then spend time writing one parser for every source,
and useful analysis is delayed.

The original log is also important evidence. A useful system must keep exactly
what arrived, explain how fields were interpreted, and avoid silently guessing
when a value is unclear.

## What is our solution?

TraceWeave is a log workspace that turns different device records into a common,
reviewable shape.

It follows this path:

1. You upload a file or paste records from a device.
2. TraceWeave keeps the original bytes and identifies the input format.
3. It finds likely meanings such as Source IP, Destination IP, Action, and
   Protocol.
4. You check the field meanings and approve them for that source format.
5. TraceWeave validates the values, keeps a link back to the original fields,
   and lets you export the reviewed records as NDJSON.

The small field-matching model only makes suggestions. It never approves a log
by itself. Known device rules take priority, and unclear fields stay available
for review.

## How to use the website

1. Open [TraceWeave](https://traceweave.onrender.com/) and sign in. Google sign-in
   or email sign-in can be used when enabled for the account.
2. Select **Add logs**.
3. Enter a name for the device or source, such as `Office firewall`.
4. Upload a log file or choose **Paste logs**. Leave record detection on
   **Detect automatically** unless the file needs a specific mode.
5. Select **Add logs**. Empty lines are ignored, so a blank line at the end of a
   pasted log does not become a second record.
6. Open a record marked **Needs review**. Read any possible field matches and
   compare them with the device documentation.
7. Choose the correct source field for each required meaning, then select
   **Save settings & process logs**.
8. When records are marked **Ready to export**, select **Export ready logs**.
9. Use **Sources** to see the devices you have added and **Activity** to see
   saved field decisions. The record details also let you download the original
   content.

## What the labels mean

- **Ready to export:** required fields passed validation and can be exported.
- **Needs review:** the source format is new and its field meanings need your
  confirmation.
- **Format changed:** a known source sent a different field structure.
- **Couldn’t process:** the format or a value needs attention; the original is
  still available for inspection.

## What is already included?

- Lossless original-content retention and SHA-256 consistency checks.
- Source-specific field settings with replay and rollback.
- Conservative suggestions for unfamiliar field names.
- Hosted sign-in and account-scoped workspace persistence.
- Privacy and terms pages linked from the workspace.
- Local operation for air-gapped use.

## Current limits

The current release accepts bounded file or pasted uploads. It does not yet act
as a direct TCP/Syslog collector, cover every vendor grammar, or claim complete
OCSF conformance. The hosted workspace has practical free-service limits. Use
the original-content download and NDJSON export when you need an external copy.

## Does the model need an upgrade?

Not for the current workflow. The model is small, fast, runs without a paid API,
and is deliberately placed behind human review. Its measured results are strong
on the authored field-name task, but that task is not the same as broad,
real-world vendor coverage.

The next useful upgrade is better evidence rather than a larger model: collect
labelled FortiGate, pfSense, Suricata, and other permitted device examples; keep
separate training and evaluation sets; measure reviewer time; and add tests for
renamed, missing, malformed, and ambiguous fields. Only after those results show
a real gap should we replace the classifier or add a larger model.

For the detailed technical record, see [MODEL_CARD.md](MODEL_CARD.md) and
[NEXT_STEPS.md](NEXT_STEPS.md).
