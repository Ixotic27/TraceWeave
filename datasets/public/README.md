# Public parser reference corpus

150 original log records in six files, pinned to Elastic integrations commit
`4f0750dd4ec7cfa1e74e3a9e975a2fe04f63fd24`. The manifest records each original
URL, byte count and SHA-256. Companion expected-output files are retained for
comparison. These are public integration-test fixtures, not private enterprise
traffic or a statistically independent production sample.

FortiGate: 89 records; pfSense: 36; Suricata: 25. The files are never loaded into
the user's active database automatically. Source files and expected outputs must
remain separate from model evaluation labels. Reproduction: run
`python scripts/fetch_public_logs.py` with Internet access during development.
There are no dataset downloads at application runtime.

Upstream's license notice and license texts are retained in `elastic/LICENSE.txt`
and `elastic/upstream-licenses/`. The repository states Elastic License 2.0 applies
by default unless a file/subtree says otherwise. These third-party files retain
their original terms; they are not relicensed as TraceWeave code. See each retained
notice and upstream URL. Using the corpus does not imply unrestricted licensing
for a hosted service.
