window.TRACEWEAVE_DEMO = {
  "samples": {
    "events": [
      {
        "id": 1,
        "revision": 3,
        "source": "gateway-alpha",
        "raw_sha256": "7fa08dfecfb325af8054f2a1b66173ddbadcff2a169002790ed01597f45cb6e0",
        "raw_base64": "dGltZXN0YW1wPSIyMDI2LTA5LTE5VDE0OjAwOjAwWiIgc3JjPTE5Mi4wLjIuMTAgZHN0PTE5OC41MS4xMDAuMjAgc3B0PTUxNDMyIGRwdD00NDMgYWN0aW9uPWRlbnkgcHJvdG89NiBydWxlPSJPdXRib3VuZCBwb2xpY3kiDQo=",
        "raw_text": "timestamp=\"2026-09-19T14:00:00Z\" src=192.0.2.10 dst=198.51.100.20 spt=51432 dpt=443 action=deny proto=6 rule=\"Outbound policy\"\r\n",
        "schema": "traceweave.network/0.1",
        "status": "normalized",
        "format": "KV",
        "fingerprint": "dd5767faa5e4fa70",
        "fields": {
          "timestamp": "2026-09-19T14:00:00Z",
          "src": "192.0.2.10",
          "dst": "198.51.100.20",
          "spt": "51432",
          "dpt": "443",
          "action": "deny",
          "proto": "6",
          "rule": "Outbound policy"
        },
        "canonical": {
          "action": "deny",
          "dst_port": 443,
          "dst_ip": "198.51.100.20",
          "protocol": "tcp",
          "src_port": 51432,
          "src_ip": "192.0.2.10",
          "timestamp": "2026-09-19T14:00:00+00:00"
        },
        "lineage": {
          "action": {
            "selector": "action",
            "original_value": "deny",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "7fa08dfecfb325af8054f2a1b66173ddbadcff2a169002790ed01597f45cb6e0",
            "contract_version": 1
          },
          "dst_port": {
            "selector": "dpt",
            "original_value": "443",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "7fa08dfecfb325af8054f2a1b66173ddbadcff2a169002790ed01597f45cb6e0",
            "contract_version": 1
          },
          "dst_ip": {
            "selector": "dst",
            "original_value": "198.51.100.20",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "7fa08dfecfb325af8054f2a1b66173ddbadcff2a169002790ed01597f45cb6e0",
            "contract_version": 1
          },
          "protocol": {
            "selector": "proto",
            "original_value": "6",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "7fa08dfecfb325af8054f2a1b66173ddbadcff2a169002790ed01597f45cb6e0",
            "contract_version": 1
          },
          "src_port": {
            "selector": "spt",
            "original_value": "51432",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "7fa08dfecfb325af8054f2a1b66173ddbadcff2a169002790ed01597f45cb6e0",
            "contract_version": 1
          },
          "src_ip": {
            "selector": "src",
            "original_value": "192.0.2.10",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "7fa08dfecfb325af8054f2a1b66173ddbadcff2a169002790ed01597f45cb6e0",
            "contract_version": 1
          },
          "timestamp": {
            "selector": "timestamp",
            "original_value": "2026-09-19T14:00:00Z",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "7fa08dfecfb325af8054f2a1b66173ddbadcff2a169002790ed01597f45cb6e0",
            "contract_version": 1
          }
        },
        "unmapped": {
          "rule": "Outbound policy"
        },
        "errors": [],
        "suggested_mapping": {
          "src": "src_ip",
          "dst": "dst_ip",
          "spt": "src_port",
          "dpt": "dst_port",
          "action": "action",
          "timestamp": "timestamp",
          "proto": "protocol"
        },
        "contract_version": 1
      },
      {
        "id": 2,
        "revision": 3,
        "source": "gateway-alpha",
        "raw_sha256": "ef4775629ea843c2f473fa333d2d8e4cdfd7578c3eadf55a88140ed6ae359f1a",
        "raw_base64": "dGltZXN0YW1wPSIyMDI2LTA5LTE5VDE0OjAwOjAxWiIgc3JjPTE5Mi4wLjIuMTEgZHN0PTE5OC41MS4xMDAuMjEgc3B0PTUxNDMzIGRwdD00NDMgYWN0aW9uPWFsbG93IHByb3RvPTYgcnVsZT0iQXBwcm92ZWQgdHJhZmZpYyINCg==",
        "raw_text": "timestamp=\"2026-09-19T14:00:01Z\" src=192.0.2.11 dst=198.51.100.21 spt=51433 dpt=443 action=allow proto=6 rule=\"Approved traffic\"\r\n",
        "schema": "traceweave.network/0.1",
        "status": "normalized",
        "format": "KV",
        "fingerprint": "dd5767faa5e4fa70",
        "fields": {
          "timestamp": "2026-09-19T14:00:01Z",
          "src": "192.0.2.11",
          "dst": "198.51.100.21",
          "spt": "51433",
          "dpt": "443",
          "action": "allow",
          "proto": "6",
          "rule": "Approved traffic"
        },
        "canonical": {
          "action": "allow",
          "dst_port": 443,
          "dst_ip": "198.51.100.21",
          "protocol": "tcp",
          "src_port": 51433,
          "src_ip": "192.0.2.11",
          "timestamp": "2026-09-19T14:00:01+00:00"
        },
        "lineage": {
          "action": {
            "selector": "action",
            "original_value": "allow",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "ef4775629ea843c2f473fa333d2d8e4cdfd7578c3eadf55a88140ed6ae359f1a",
            "contract_version": 1
          },
          "dst_port": {
            "selector": "dpt",
            "original_value": "443",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "ef4775629ea843c2f473fa333d2d8e4cdfd7578c3eadf55a88140ed6ae359f1a",
            "contract_version": 1
          },
          "dst_ip": {
            "selector": "dst",
            "original_value": "198.51.100.21",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "ef4775629ea843c2f473fa333d2d8e4cdfd7578c3eadf55a88140ed6ae359f1a",
            "contract_version": 1
          },
          "protocol": {
            "selector": "proto",
            "original_value": "6",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "ef4775629ea843c2f473fa333d2d8e4cdfd7578c3eadf55a88140ed6ae359f1a",
            "contract_version": 1
          },
          "src_port": {
            "selector": "spt",
            "original_value": "51433",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "ef4775629ea843c2f473fa333d2d8e4cdfd7578c3eadf55a88140ed6ae359f1a",
            "contract_version": 1
          },
          "src_ip": {
            "selector": "src",
            "original_value": "192.0.2.11",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "ef4775629ea843c2f473fa333d2d8e4cdfd7578c3eadf55a88140ed6ae359f1a",
            "contract_version": 1
          },
          "timestamp": {
            "selector": "timestamp",
            "original_value": "2026-09-19T14:00:01Z",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "ef4775629ea843c2f473fa333d2d8e4cdfd7578c3eadf55a88140ed6ae359f1a",
            "contract_version": 1
          }
        },
        "unmapped": {
          "rule": "Approved traffic"
        },
        "errors": [],
        "suggested_mapping": {
          "src": "src_ip",
          "dst": "dst_ip",
          "spt": "src_port",
          "dpt": "dst_port",
          "action": "action",
          "timestamp": "timestamp",
          "proto": "protocol"
        },
        "contract_version": 1
      },
      {
        "id": 3,
        "revision": 3,
        "source": "gateway-json",
        "raw_sha256": "80e61b7d059e1dd90aa9a9f17a31bafb6ec3cb139233cff46268aaaa9c636fb2",
        "raw_base64": "eyJ0aW1lc3RhbXAiOiIyMDI2LTA5LTE5VDE0OjAwOjAyWiIsInNyY19pcCI6IjIwMDE6ZGI4OjoxMCIsImRzdF9pcCI6IjIwMDE6ZGI4OjoyMCIsImRzdF9wb3J0Ijo1MywiYWN0aW9uIjoiYWxsb3ciLCJwcm90b2NvbCI6InVkcCIsInZlbmRvciI6eyJydWxlIjoiRE5TIn19Cg==",
        "raw_text": "{\"timestamp\":\"2026-09-19T14:00:02Z\",\"src_ip\":\"2001:db8::10\",\"dst_ip\":\"2001:db8::20\",\"dst_port\":53,\"action\":\"allow\",\"protocol\":\"udp\",\"vendor\":{\"rule\":\"DNS\"}}\n",
        "schema": "traceweave.network/0.1",
        "status": "normalized",
        "format": "JSON",
        "fingerprint": "109da2702f75285a",
        "fields": {
          "/timestamp": "2026-09-19T14:00:02Z",
          "/src_ip": "2001:db8::10",
          "/dst_ip": "2001:db8::20",
          "/dst_port": 53,
          "/action": "allow",
          "/protocol": "udp",
          "/vendor/rule": "DNS"
        },
        "canonical": {
          "action": "allow",
          "dst_ip": "2001:db8::20",
          "dst_port": 53,
          "protocol": "udp",
          "src_ip": "2001:db8::10",
          "timestamp": "2026-09-19T14:00:02+00:00"
        },
        "lineage": {
          "action": {
            "selector": "/action",
            "original_value": "allow",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "80e61b7d059e1dd90aa9a9f17a31bafb6ec3cb139233cff46268aaaa9c636fb2",
            "contract_version": 1
          },
          "dst_ip": {
            "selector": "/dst_ip",
            "original_value": "2001:db8::20",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "80e61b7d059e1dd90aa9a9f17a31bafb6ec3cb139233cff46268aaaa9c636fb2",
            "contract_version": 1
          },
          "dst_port": {
            "selector": "/dst_port",
            "original_value": 53,
            "transform": "validate-and-normalize/1",
            "raw_sha256": "80e61b7d059e1dd90aa9a9f17a31bafb6ec3cb139233cff46268aaaa9c636fb2",
            "contract_version": 1
          },
          "protocol": {
            "selector": "/protocol",
            "original_value": "udp",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "80e61b7d059e1dd90aa9a9f17a31bafb6ec3cb139233cff46268aaaa9c636fb2",
            "contract_version": 1
          },
          "src_ip": {
            "selector": "/src_ip",
            "original_value": "2001:db8::10",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "80e61b7d059e1dd90aa9a9f17a31bafb6ec3cb139233cff46268aaaa9c636fb2",
            "contract_version": 1
          },
          "timestamp": {
            "selector": "/timestamp",
            "original_value": "2026-09-19T14:00:02Z",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "80e61b7d059e1dd90aa9a9f17a31bafb6ec3cb139233cff46268aaaa9c636fb2",
            "contract_version": 1
          }
        },
        "unmapped": {
          "/vendor/rule": "DNS"
        },
        "errors": [],
        "suggested_mapping": {
          "/src_ip": "src_ip",
          "/dst_ip": "dst_ip",
          "/dst_port": "dst_port",
          "/action": "action",
          "/timestamp": "timestamp",
          "/protocol": "protocol"
        },
        "contract_version": 1
      },
      {
        "id": 4,
        "revision": 3,
        "source": "gateway-cef",
        "raw_sha256": "76261709d8838c39b8145516078aad5c96613d9beed5159f0de0f4040665fc6d",
        "raw_base64": "Q0VGOjB8RXhhbXBsZXxHYXRld2F5fDEuMHwxMDB8VHJhZmZpY3w1fHNyYz0xOTIuMC4yLjEyIGRzdD0xOTguNTEuMTAwLjIyIGRwdD0yMiBhY3Q9ZGVueSBwcm90bz02Cg==",
        "raw_text": "CEF:0|Example|Gateway|1.0|100|Traffic|5|src=192.0.2.12 dst=198.51.100.22 dpt=22 act=deny proto=6\n",
        "schema": "traceweave.network/0.1",
        "status": "normalized",
        "format": "CEF",
        "fingerprint": "97be2803b7f547d8",
        "fields": {
          "src": "192.0.2.12",
          "dst": "198.51.100.22",
          "dpt": "22",
          "act": "deny",
          "proto": "6"
        },
        "canonical": {
          "action": "deny",
          "dst_port": 22,
          "dst_ip": "198.51.100.22",
          "protocol": "tcp",
          "src_ip": "192.0.2.12"
        },
        "lineage": {
          "action": {
            "selector": "act",
            "original_value": "deny",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "76261709d8838c39b8145516078aad5c96613d9beed5159f0de0f4040665fc6d",
            "contract_version": 1
          },
          "dst_port": {
            "selector": "dpt",
            "original_value": "22",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "76261709d8838c39b8145516078aad5c96613d9beed5159f0de0f4040665fc6d",
            "contract_version": 1
          },
          "dst_ip": {
            "selector": "dst",
            "original_value": "198.51.100.22",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "76261709d8838c39b8145516078aad5c96613d9beed5159f0de0f4040665fc6d",
            "contract_version": 1
          },
          "protocol": {
            "selector": "proto",
            "original_value": "6",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "76261709d8838c39b8145516078aad5c96613d9beed5159f0de0f4040665fc6d",
            "contract_version": 1
          },
          "src_ip": {
            "selector": "src",
            "original_value": "192.0.2.12",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "76261709d8838c39b8145516078aad5c96613d9beed5159f0de0f4040665fc6d",
            "contract_version": 1
          }
        },
        "unmapped": {},
        "errors": [],
        "suggested_mapping": {
          "src": "src_ip",
          "dst": "dst_ip",
          "dpt": "dst_port",
          "act": "action",
          "proto": "protocol"
        },
        "contract_version": 1
      },
      {
        "id": 5,
        "revision": 3,
        "source": "gateway-syslog",
        "raw_sha256": "8a30da05501ee4c1282dc2d15deb903580ba7deaadb6aeb1397f3cab8ba0031a",
        "raw_base64": "PDEzND4xIDIwMjYtMDktMTlUMTQ6MDA6MDNaIGVkZ2UgZmlyZXdhbGwgLSAtIC0gc3JjPTE5Mi4wLjIuMTMgZHN0PTE5OC41MS4xMDAuMjMgZHB0PTQ0MyBhY3Rpb249cGVybWl0IHByb3RvPXRjcAo=",
        "raw_text": "<134>1 2026-09-19T14:00:03Z edge firewall - - - src=192.0.2.13 dst=198.51.100.23 dpt=443 action=permit proto=tcp\n",
        "schema": "traceweave.network/0.1",
        "status": "normalized",
        "format": "Syslog/KV",
        "fingerprint": "0f79710e3a341e6b",
        "fields": {
          "src": "192.0.2.13",
          "dst": "198.51.100.23",
          "dpt": "443",
          "action": "permit",
          "proto": "tcp"
        },
        "canonical": {
          "action": "allow",
          "dst_port": 443,
          "dst_ip": "198.51.100.23",
          "protocol": "tcp",
          "src_ip": "192.0.2.13"
        },
        "lineage": {
          "action": {
            "selector": "action",
            "original_value": "permit",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "8a30da05501ee4c1282dc2d15deb903580ba7deaadb6aeb1397f3cab8ba0031a",
            "contract_version": 1
          },
          "dst_port": {
            "selector": "dpt",
            "original_value": "443",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "8a30da05501ee4c1282dc2d15deb903580ba7deaadb6aeb1397f3cab8ba0031a",
            "contract_version": 1
          },
          "dst_ip": {
            "selector": "dst",
            "original_value": "198.51.100.23",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "8a30da05501ee4c1282dc2d15deb903580ba7deaadb6aeb1397f3cab8ba0031a",
            "contract_version": 1
          },
          "protocol": {
            "selector": "proto",
            "original_value": "tcp",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "8a30da05501ee4c1282dc2d15deb903580ba7deaadb6aeb1397f3cab8ba0031a",
            "contract_version": 1
          },
          "src_ip": {
            "selector": "src",
            "original_value": "192.0.2.13",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "8a30da05501ee4c1282dc2d15deb903580ba7deaadb6aeb1397f3cab8ba0031a",
            "contract_version": 1
          }
        },
        "unmapped": {},
        "errors": [],
        "suggested_mapping": {
          "src": "src_ip",
          "dst": "dst_ip",
          "dpt": "dst_port",
          "action": "action",
          "proto": "protocol"
        },
        "contract_version": 1
      },
      {
        "id": 6,
        "revision": 3,
        "source": "gateway-leef",
        "raw_sha256": "fb1633929c7ab5734f79f256c1e305384344e0852510130d3037c26ec4fc8a48",
        "raw_base64": "TEVFRjoxLjB8RXhhbXBsZXxHYXRld2F5fDEuMHwxMDB8c3JjPTE5Mi4wLjIuMTQJZHN0PTE5OC41MS4xMDAuMjQJZHB0PTMzODkJYWN0aW9uPWJsb2NrCg==",
        "raw_text": "LEEF:1.0|Example|Gateway|1.0|100|src=192.0.2.14\tdst=198.51.100.24\tdpt=3389\taction=block\n",
        "schema": "traceweave.network/0.1",
        "status": "normalized",
        "format": "LEEF",
        "fingerprint": "a4090c05ef5da801",
        "fields": {
          "src": "192.0.2.14",
          "dst": "198.51.100.24",
          "dpt": "3389",
          "action": "block"
        },
        "canonical": {
          "action": "deny",
          "dst_port": 3389,
          "dst_ip": "198.51.100.24",
          "src_ip": "192.0.2.14"
        },
        "lineage": {
          "action": {
            "selector": "action",
            "original_value": "block",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "fb1633929c7ab5734f79f256c1e305384344e0852510130d3037c26ec4fc8a48",
            "contract_version": 1
          },
          "dst_port": {
            "selector": "dpt",
            "original_value": "3389",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "fb1633929c7ab5734f79f256c1e305384344e0852510130d3037c26ec4fc8a48",
            "contract_version": 1
          },
          "dst_ip": {
            "selector": "dst",
            "original_value": "198.51.100.24",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "fb1633929c7ab5734f79f256c1e305384344e0852510130d3037c26ec4fc8a48",
            "contract_version": 1
          },
          "src_ip": {
            "selector": "src",
            "original_value": "192.0.2.14",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "fb1633929c7ab5734f79f256c1e305384344e0852510130d3037c26ec4fc8a48",
            "contract_version": 1
          }
        },
        "unmapped": {},
        "errors": [],
        "suggested_mapping": {
          "src": "src_ip",
          "dst": "dst_ip",
          "dpt": "dst_port",
          "action": "action"
        },
        "contract_version": 1
      },
      {
        "id": 7,
        "revision": 3,
        "source": "gateway-xml",
        "raw_sha256": "3b8179555bde7f0ad1bdebae3873aa9c1e29dc705d4db960594249242e933898",
        "raw_base64": "PGV2ZW50PjxzcmM+MTkyLjAuMi4xNTwvc3JjPjxkc3Q+MTk4LjUxLjEwMC4yNTwvZHN0PjxkcHQ+NDQzPC9kcHQ+PGFjdGlvbj5hbGxvdzwvYWN0aW9uPjwvZXZlbnQ+Cg==",
        "raw_text": "<event><src>192.0.2.15</src><dst>198.51.100.25</dst><dpt>443</dpt><action>allow</action></event>\n",
        "schema": "traceweave.network/0.1",
        "status": "normalized",
        "format": "XML",
        "fingerprint": "675f4005fe89caaf",
        "fields": {
          "src": "192.0.2.15",
          "dst": "198.51.100.25",
          "dpt": "443",
          "action": "allow"
        },
        "canonical": {
          "action": "allow",
          "dst_port": 443,
          "dst_ip": "198.51.100.25",
          "src_ip": "192.0.2.15"
        },
        "lineage": {
          "action": {
            "selector": "action",
            "original_value": "allow",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "3b8179555bde7f0ad1bdebae3873aa9c1e29dc705d4db960594249242e933898",
            "contract_version": 1
          },
          "dst_port": {
            "selector": "dpt",
            "original_value": "443",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "3b8179555bde7f0ad1bdebae3873aa9c1e29dc705d4db960594249242e933898",
            "contract_version": 1
          },
          "dst_ip": {
            "selector": "dst",
            "original_value": "198.51.100.25",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "3b8179555bde7f0ad1bdebae3873aa9c1e29dc705d4db960594249242e933898",
            "contract_version": 1
          },
          "src_ip": {
            "selector": "src",
            "original_value": "192.0.2.15",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "3b8179555bde7f0ad1bdebae3873aa9c1e29dc705d4db960594249242e933898",
            "contract_version": 1
          }
        },
        "unmapped": {},
        "errors": [],
        "suggested_mapping": {
          "src": "src_ip",
          "dst": "dst_ip",
          "dpt": "dst_port",
          "action": "action"
        },
        "contract_version": 1
      },
      {
        "id": 8,
        "revision": 3,
        "source": "gateway-csv",
        "raw_sha256": "ce9430bde6c8ddcc162c997849b16c2987553d35f7a7829ca9ee442003ef0bb3",
        "raw_base64": "c3JjLGRzdCxkcHQsYWN0aW9uDQoxOTIuMC4yLjE2LDE5OC41MS4xMDAuMjYsODA4MCxkZW55DQo=",
        "raw_text": "src,dst,dpt,action\r\n192.0.2.16,198.51.100.26,8080,deny\r\n",
        "schema": "traceweave.network/0.1",
        "status": "normalized",
        "format": "CSV",
        "fingerprint": "efc9dc8a34a3d132",
        "fields": {
          "src": "192.0.2.16",
          "dst": "198.51.100.26",
          "dpt": "8080",
          "action": "deny"
        },
        "canonical": {
          "action": "deny",
          "dst_port": 8080,
          "dst_ip": "198.51.100.26",
          "src_ip": "192.0.2.16"
        },
        "lineage": {
          "action": {
            "selector": "action",
            "original_value": "deny",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "ce9430bde6c8ddcc162c997849b16c2987553d35f7a7829ca9ee442003ef0bb3",
            "contract_version": 1
          },
          "dst_port": {
            "selector": "dpt",
            "original_value": "8080",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "ce9430bde6c8ddcc162c997849b16c2987553d35f7a7829ca9ee442003ef0bb3",
            "contract_version": 1
          },
          "dst_ip": {
            "selector": "dst",
            "original_value": "198.51.100.26",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "ce9430bde6c8ddcc162c997849b16c2987553d35f7a7829ca9ee442003ef0bb3",
            "contract_version": 1
          },
          "src_ip": {
            "selector": "src",
            "original_value": "192.0.2.16",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "ce9430bde6c8ddcc162c997849b16c2987553d35f7a7829ca9ee442003ef0bb3",
            "contract_version": 1
          }
        },
        "unmapped": {},
        "errors": [],
        "suggested_mapping": {
          "src": "src_ip",
          "dst": "dst_ip",
          "dpt": "dst_port",
          "action": "action"
        },
        "contract_version": 1
      }
    ],
    "counts": {
      "normalized": 8,
      "needs_mapping": 0,
      "drift": 0,
      "quarantined": 0
    },
    "raw_bytes": 866,
    "audit": [
      {
        "id": 7,
        "at": "2026-09-19T16:23:23.499589+00:00",
        "action": "mapping_approved",
        "details": "{\"source\": \"gateway-csv\", \"fingerprint\": \"efc9dc8a34a3d132\", \"version\": 1, \"mapping\": {\"src\": \"src_ip\", \"dst\": \"dst_ip\", \"dpt\": \"dst_port\", \"action\": \"action\"}, \"validation\": [{\"id\": 8, \"valid\": true, \"errors\": []}]}"
      },
      {
        "id": 6,
        "at": "2026-09-19T16:23:23.498559+00:00",
        "action": "mapping_approved",
        "details": "{\"source\": \"gateway-xml\", \"fingerprint\": \"675f4005fe89caaf\", \"version\": 1, \"mapping\": {\"src\": \"src_ip\", \"dst\": \"dst_ip\", \"dpt\": \"dst_port\", \"action\": \"action\"}, \"validation\": [{\"id\": 7, \"valid\": true, \"errors\": []}]}"
      },
      {
        "id": 5,
        "at": "2026-09-19T16:23:23.498559+00:00",
        "action": "mapping_approved",
        "details": "{\"source\": \"gateway-leef\", \"fingerprint\": \"a4090c05ef5da801\", \"version\": 1, \"mapping\": {\"src\": \"src_ip\", \"dst\": \"dst_ip\", \"dpt\": \"dst_port\", \"action\": \"action\"}, \"validation\": [{\"id\": 6, \"valid\": true, \"errors\": []}]}"
      },
      {
        "id": 4,
        "at": "2026-09-19T16:23:23.497524+00:00",
        "action": "mapping_approved",
        "details": "{\"source\": \"gateway-syslog\", \"fingerprint\": \"0f79710e3a341e6b\", \"version\": 1, \"mapping\": {\"src\": \"src_ip\", \"dst\": \"dst_ip\", \"dpt\": \"dst_port\", \"action\": \"action\", \"proto\": \"protocol\"}, \"validation\": [{\"id\": 5, \"valid\": true, \"errors\": []}]}"
      },
      {
        "id": 3,
        "at": "2026-09-19T16:23:23.497524+00:00",
        "action": "mapping_approved",
        "details": "{\"source\": \"gateway-cef\", \"fingerprint\": \"97be2803b7f547d8\", \"version\": 1, \"mapping\": {\"src\": \"src_ip\", \"dst\": \"dst_ip\", \"dpt\": \"dst_port\", \"act\": \"action\", \"proto\": \"protocol\"}, \"validation\": [{\"id\": 4, \"valid\": true, \"errors\": []}]}"
      },
      {
        "id": 2,
        "at": "2026-09-19T16:23:23.496267+00:00",
        "action": "mapping_approved",
        "details": "{\"source\": \"gateway-json\", \"fingerprint\": \"109da2702f75285a\", \"version\": 1, \"mapping\": {\"/src_ip\": \"src_ip\", \"/dst_ip\": \"dst_ip\", \"/dst_port\": \"dst_port\", \"/action\": \"action\", \"/timestamp\": \"timestamp\", \"/protocol\": \"protocol\"}, \"validation\": [{\"id\": 3, \"valid\": true, \"errors\": []}]}"
      },
      {
        "id": 1,
        "at": "2026-09-19T16:23:23.496267+00:00",
        "action": "mapping_approved",
        "details": "{\"source\": \"gateway-alpha\", \"fingerprint\": \"dd5767faa5e4fa70\", \"version\": 1, \"mapping\": {\"src\": \"src_ip\", \"dst\": \"dst_ip\", \"spt\": \"src_port\", \"dpt\": \"dst_port\", \"action\": \"action\", \"timestamp\": \"timestamp\", \"proto\": \"protocol\"}, \"validation\": [{\"id\": 1, \"valid\": true, \"errors\": []}, {\"id\": 2, \"valid\": true, \"errors\": []}]}"
      }
    ],
    "contracts": [
      {
        "source": "gateway-alpha",
        "fingerprint": "dd5767faa5e4fa70",
        "version": 1,
        "mapping": "{\"action\": \"action\", \"dpt\": \"dst_port\", \"dst\": \"dst_ip\", \"proto\": \"protocol\", \"spt\": \"src_port\", \"src\": \"src_ip\", \"timestamp\": \"timestamp\"}",
        "active": 1
      },
      {
        "source": "gateway-cef",
        "fingerprint": "97be2803b7f547d8",
        "version": 1,
        "mapping": "{\"act\": \"action\", \"dpt\": \"dst_port\", \"dst\": \"dst_ip\", \"proto\": \"protocol\", \"src\": \"src_ip\"}",
        "active": 1
      },
      {
        "source": "gateway-csv",
        "fingerprint": "efc9dc8a34a3d132",
        "version": 1,
        "mapping": "{\"action\": \"action\", \"dpt\": \"dst_port\", \"dst\": \"dst_ip\", \"src\": \"src_ip\"}",
        "active": 1
      },
      {
        "source": "gateway-json",
        "fingerprint": "109da2702f75285a",
        "version": 1,
        "mapping": "{\"/action\": \"action\", \"/dst_ip\": \"dst_ip\", \"/dst_port\": \"dst_port\", \"/protocol\": \"protocol\", \"/src_ip\": \"src_ip\", \"/timestamp\": \"timestamp\"}",
        "active": 1
      },
      {
        "source": "gateway-leef",
        "fingerprint": "a4090c05ef5da801",
        "version": 1,
        "mapping": "{\"action\": \"action\", \"dpt\": \"dst_port\", \"dst\": \"dst_ip\", \"src\": \"src_ip\"}",
        "active": 1
      },
      {
        "source": "gateway-syslog",
        "fingerprint": "0f79710e3a341e6b",
        "version": 1,
        "mapping": "{\"action\": \"action\", \"dpt\": \"dst_port\", \"dst\": \"dst_ip\", \"proto\": \"protocol\", \"src\": \"src_ip\"}",
        "active": 1
      },
      {
        "source": "gateway-xml",
        "fingerprint": "675f4005fe89caaf",
        "version": 1,
        "mapping": "{\"action\": \"action\", \"dpt\": \"dst_port\", \"dst\": \"dst_ip\", \"src\": \"src_ip\"}",
        "active": 1
      }
    ],
    "targets": [
      "src_ip",
      "dst_ip",
      "src_port",
      "dst_port",
      "action",
      "timestamp",
      "protocol"
    ]
  },
  "drift": {
    "events": [
      {
        "id": 1,
        "revision": 3,
        "source": "gateway-alpha",
        "raw_sha256": "7fa08dfecfb325af8054f2a1b66173ddbadcff2a169002790ed01597f45cb6e0",
        "raw_base64": "dGltZXN0YW1wPSIyMDI2LTA5LTE5VDE0OjAwOjAwWiIgc3JjPTE5Mi4wLjIuMTAgZHN0PTE5OC41MS4xMDAuMjAgc3B0PTUxNDMyIGRwdD00NDMgYWN0aW9uPWRlbnkgcHJvdG89NiBydWxlPSJPdXRib3VuZCBwb2xpY3kiDQo=",
        "raw_text": "timestamp=\"2026-09-19T14:00:00Z\" src=192.0.2.10 dst=198.51.100.20 spt=51432 dpt=443 action=deny proto=6 rule=\"Outbound policy\"\r\n",
        "schema": "traceweave.network/0.1",
        "status": "normalized",
        "format": "KV",
        "fingerprint": "dd5767faa5e4fa70",
        "fields": {
          "timestamp": "2026-09-19T14:00:00Z",
          "src": "192.0.2.10",
          "dst": "198.51.100.20",
          "spt": "51432",
          "dpt": "443",
          "action": "deny",
          "proto": "6",
          "rule": "Outbound policy"
        },
        "canonical": {
          "action": "deny",
          "dst_port": 443,
          "dst_ip": "198.51.100.20",
          "protocol": "tcp",
          "src_port": 51432,
          "src_ip": "192.0.2.10",
          "timestamp": "2026-09-19T14:00:00+00:00"
        },
        "lineage": {
          "action": {
            "selector": "action",
            "original_value": "deny",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "7fa08dfecfb325af8054f2a1b66173ddbadcff2a169002790ed01597f45cb6e0",
            "contract_version": 1
          },
          "dst_port": {
            "selector": "dpt",
            "original_value": "443",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "7fa08dfecfb325af8054f2a1b66173ddbadcff2a169002790ed01597f45cb6e0",
            "contract_version": 1
          },
          "dst_ip": {
            "selector": "dst",
            "original_value": "198.51.100.20",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "7fa08dfecfb325af8054f2a1b66173ddbadcff2a169002790ed01597f45cb6e0",
            "contract_version": 1
          },
          "protocol": {
            "selector": "proto",
            "original_value": "6",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "7fa08dfecfb325af8054f2a1b66173ddbadcff2a169002790ed01597f45cb6e0",
            "contract_version": 1
          },
          "src_port": {
            "selector": "spt",
            "original_value": "51432",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "7fa08dfecfb325af8054f2a1b66173ddbadcff2a169002790ed01597f45cb6e0",
            "contract_version": 1
          },
          "src_ip": {
            "selector": "src",
            "original_value": "192.0.2.10",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "7fa08dfecfb325af8054f2a1b66173ddbadcff2a169002790ed01597f45cb6e0",
            "contract_version": 1
          },
          "timestamp": {
            "selector": "timestamp",
            "original_value": "2026-09-19T14:00:00Z",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "7fa08dfecfb325af8054f2a1b66173ddbadcff2a169002790ed01597f45cb6e0",
            "contract_version": 1
          }
        },
        "unmapped": {
          "rule": "Outbound policy"
        },
        "errors": [],
        "suggested_mapping": {
          "src": "src_ip",
          "dst": "dst_ip",
          "spt": "src_port",
          "dpt": "dst_port",
          "action": "action",
          "timestamp": "timestamp",
          "proto": "protocol"
        },
        "contract_version": 1
      },
      {
        "id": 2,
        "revision": 3,
        "source": "gateway-alpha",
        "raw_sha256": "ef4775629ea843c2f473fa333d2d8e4cdfd7578c3eadf55a88140ed6ae359f1a",
        "raw_base64": "dGltZXN0YW1wPSIyMDI2LTA5LTE5VDE0OjAwOjAxWiIgc3JjPTE5Mi4wLjIuMTEgZHN0PTE5OC41MS4xMDAuMjEgc3B0PTUxNDMzIGRwdD00NDMgYWN0aW9uPWFsbG93IHByb3RvPTYgcnVsZT0iQXBwcm92ZWQgdHJhZmZpYyINCg==",
        "raw_text": "timestamp=\"2026-09-19T14:00:01Z\" src=192.0.2.11 dst=198.51.100.21 spt=51433 dpt=443 action=allow proto=6 rule=\"Approved traffic\"\r\n",
        "schema": "traceweave.network/0.1",
        "status": "normalized",
        "format": "KV",
        "fingerprint": "dd5767faa5e4fa70",
        "fields": {
          "timestamp": "2026-09-19T14:00:01Z",
          "src": "192.0.2.11",
          "dst": "198.51.100.21",
          "spt": "51433",
          "dpt": "443",
          "action": "allow",
          "proto": "6",
          "rule": "Approved traffic"
        },
        "canonical": {
          "action": "allow",
          "dst_port": 443,
          "dst_ip": "198.51.100.21",
          "protocol": "tcp",
          "src_port": 51433,
          "src_ip": "192.0.2.11",
          "timestamp": "2026-09-19T14:00:01+00:00"
        },
        "lineage": {
          "action": {
            "selector": "action",
            "original_value": "allow",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "ef4775629ea843c2f473fa333d2d8e4cdfd7578c3eadf55a88140ed6ae359f1a",
            "contract_version": 1
          },
          "dst_port": {
            "selector": "dpt",
            "original_value": "443",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "ef4775629ea843c2f473fa333d2d8e4cdfd7578c3eadf55a88140ed6ae359f1a",
            "contract_version": 1
          },
          "dst_ip": {
            "selector": "dst",
            "original_value": "198.51.100.21",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "ef4775629ea843c2f473fa333d2d8e4cdfd7578c3eadf55a88140ed6ae359f1a",
            "contract_version": 1
          },
          "protocol": {
            "selector": "proto",
            "original_value": "6",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "ef4775629ea843c2f473fa333d2d8e4cdfd7578c3eadf55a88140ed6ae359f1a",
            "contract_version": 1
          },
          "src_port": {
            "selector": "spt",
            "original_value": "51433",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "ef4775629ea843c2f473fa333d2d8e4cdfd7578c3eadf55a88140ed6ae359f1a",
            "contract_version": 1
          },
          "src_ip": {
            "selector": "src",
            "original_value": "192.0.2.11",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "ef4775629ea843c2f473fa333d2d8e4cdfd7578c3eadf55a88140ed6ae359f1a",
            "contract_version": 1
          },
          "timestamp": {
            "selector": "timestamp",
            "original_value": "2026-09-19T14:00:01Z",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "ef4775629ea843c2f473fa333d2d8e4cdfd7578c3eadf55a88140ed6ae359f1a",
            "contract_version": 1
          }
        },
        "unmapped": {
          "rule": "Approved traffic"
        },
        "errors": [],
        "suggested_mapping": {
          "src": "src_ip",
          "dst": "dst_ip",
          "spt": "src_port",
          "dpt": "dst_port",
          "action": "action",
          "timestamp": "timestamp",
          "proto": "protocol"
        },
        "contract_version": 1
      },
      {
        "id": 3,
        "revision": 3,
        "source": "gateway-json",
        "raw_sha256": "80e61b7d059e1dd90aa9a9f17a31bafb6ec3cb139233cff46268aaaa9c636fb2",
        "raw_base64": "eyJ0aW1lc3RhbXAiOiIyMDI2LTA5LTE5VDE0OjAwOjAyWiIsInNyY19pcCI6IjIwMDE6ZGI4OjoxMCIsImRzdF9pcCI6IjIwMDE6ZGI4OjoyMCIsImRzdF9wb3J0Ijo1MywiYWN0aW9uIjoiYWxsb3ciLCJwcm90b2NvbCI6InVkcCIsInZlbmRvciI6eyJydWxlIjoiRE5TIn19Cg==",
        "raw_text": "{\"timestamp\":\"2026-09-19T14:00:02Z\",\"src_ip\":\"2001:db8::10\",\"dst_ip\":\"2001:db8::20\",\"dst_port\":53,\"action\":\"allow\",\"protocol\":\"udp\",\"vendor\":{\"rule\":\"DNS\"}}\n",
        "schema": "traceweave.network/0.1",
        "status": "normalized",
        "format": "JSON",
        "fingerprint": "109da2702f75285a",
        "fields": {
          "/timestamp": "2026-09-19T14:00:02Z",
          "/src_ip": "2001:db8::10",
          "/dst_ip": "2001:db8::20",
          "/dst_port": 53,
          "/action": "allow",
          "/protocol": "udp",
          "/vendor/rule": "DNS"
        },
        "canonical": {
          "action": "allow",
          "dst_ip": "2001:db8::20",
          "dst_port": 53,
          "protocol": "udp",
          "src_ip": "2001:db8::10",
          "timestamp": "2026-09-19T14:00:02+00:00"
        },
        "lineage": {
          "action": {
            "selector": "/action",
            "original_value": "allow",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "80e61b7d059e1dd90aa9a9f17a31bafb6ec3cb139233cff46268aaaa9c636fb2",
            "contract_version": 1
          },
          "dst_ip": {
            "selector": "/dst_ip",
            "original_value": "2001:db8::20",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "80e61b7d059e1dd90aa9a9f17a31bafb6ec3cb139233cff46268aaaa9c636fb2",
            "contract_version": 1
          },
          "dst_port": {
            "selector": "/dst_port",
            "original_value": 53,
            "transform": "validate-and-normalize/1",
            "raw_sha256": "80e61b7d059e1dd90aa9a9f17a31bafb6ec3cb139233cff46268aaaa9c636fb2",
            "contract_version": 1
          },
          "protocol": {
            "selector": "/protocol",
            "original_value": "udp",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "80e61b7d059e1dd90aa9a9f17a31bafb6ec3cb139233cff46268aaaa9c636fb2",
            "contract_version": 1
          },
          "src_ip": {
            "selector": "/src_ip",
            "original_value": "2001:db8::10",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "80e61b7d059e1dd90aa9a9f17a31bafb6ec3cb139233cff46268aaaa9c636fb2",
            "contract_version": 1
          },
          "timestamp": {
            "selector": "/timestamp",
            "original_value": "2026-09-19T14:00:02Z",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "80e61b7d059e1dd90aa9a9f17a31bafb6ec3cb139233cff46268aaaa9c636fb2",
            "contract_version": 1
          }
        },
        "unmapped": {
          "/vendor/rule": "DNS"
        },
        "errors": [],
        "suggested_mapping": {
          "/src_ip": "src_ip",
          "/dst_ip": "dst_ip",
          "/dst_port": "dst_port",
          "/action": "action",
          "/timestamp": "timestamp",
          "/protocol": "protocol"
        },
        "contract_version": 1
      },
      {
        "id": 4,
        "revision": 3,
        "source": "gateway-cef",
        "raw_sha256": "76261709d8838c39b8145516078aad5c96613d9beed5159f0de0f4040665fc6d",
        "raw_base64": "Q0VGOjB8RXhhbXBsZXxHYXRld2F5fDEuMHwxMDB8VHJhZmZpY3w1fHNyYz0xOTIuMC4yLjEyIGRzdD0xOTguNTEuMTAwLjIyIGRwdD0yMiBhY3Q9ZGVueSBwcm90bz02Cg==",
        "raw_text": "CEF:0|Example|Gateway|1.0|100|Traffic|5|src=192.0.2.12 dst=198.51.100.22 dpt=22 act=deny proto=6\n",
        "schema": "traceweave.network/0.1",
        "status": "normalized",
        "format": "CEF",
        "fingerprint": "97be2803b7f547d8",
        "fields": {
          "src": "192.0.2.12",
          "dst": "198.51.100.22",
          "dpt": "22",
          "act": "deny",
          "proto": "6"
        },
        "canonical": {
          "action": "deny",
          "dst_port": 22,
          "dst_ip": "198.51.100.22",
          "protocol": "tcp",
          "src_ip": "192.0.2.12"
        },
        "lineage": {
          "action": {
            "selector": "act",
            "original_value": "deny",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "76261709d8838c39b8145516078aad5c96613d9beed5159f0de0f4040665fc6d",
            "contract_version": 1
          },
          "dst_port": {
            "selector": "dpt",
            "original_value": "22",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "76261709d8838c39b8145516078aad5c96613d9beed5159f0de0f4040665fc6d",
            "contract_version": 1
          },
          "dst_ip": {
            "selector": "dst",
            "original_value": "198.51.100.22",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "76261709d8838c39b8145516078aad5c96613d9beed5159f0de0f4040665fc6d",
            "contract_version": 1
          },
          "protocol": {
            "selector": "proto",
            "original_value": "6",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "76261709d8838c39b8145516078aad5c96613d9beed5159f0de0f4040665fc6d",
            "contract_version": 1
          },
          "src_ip": {
            "selector": "src",
            "original_value": "192.0.2.12",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "76261709d8838c39b8145516078aad5c96613d9beed5159f0de0f4040665fc6d",
            "contract_version": 1
          }
        },
        "unmapped": {},
        "errors": [],
        "suggested_mapping": {
          "src": "src_ip",
          "dst": "dst_ip",
          "dpt": "dst_port",
          "act": "action",
          "proto": "protocol"
        },
        "contract_version": 1
      },
      {
        "id": 5,
        "revision": 3,
        "source": "gateway-syslog",
        "raw_sha256": "8a30da05501ee4c1282dc2d15deb903580ba7deaadb6aeb1397f3cab8ba0031a",
        "raw_base64": "PDEzND4xIDIwMjYtMDktMTlUMTQ6MDA6MDNaIGVkZ2UgZmlyZXdhbGwgLSAtIC0gc3JjPTE5Mi4wLjIuMTMgZHN0PTE5OC41MS4xMDAuMjMgZHB0PTQ0MyBhY3Rpb249cGVybWl0IHByb3RvPXRjcAo=",
        "raw_text": "<134>1 2026-09-19T14:00:03Z edge firewall - - - src=192.0.2.13 dst=198.51.100.23 dpt=443 action=permit proto=tcp\n",
        "schema": "traceweave.network/0.1",
        "status": "normalized",
        "format": "Syslog/KV",
        "fingerprint": "0f79710e3a341e6b",
        "fields": {
          "src": "192.0.2.13",
          "dst": "198.51.100.23",
          "dpt": "443",
          "action": "permit",
          "proto": "tcp"
        },
        "canonical": {
          "action": "allow",
          "dst_port": 443,
          "dst_ip": "198.51.100.23",
          "protocol": "tcp",
          "src_ip": "192.0.2.13"
        },
        "lineage": {
          "action": {
            "selector": "action",
            "original_value": "permit",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "8a30da05501ee4c1282dc2d15deb903580ba7deaadb6aeb1397f3cab8ba0031a",
            "contract_version": 1
          },
          "dst_port": {
            "selector": "dpt",
            "original_value": "443",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "8a30da05501ee4c1282dc2d15deb903580ba7deaadb6aeb1397f3cab8ba0031a",
            "contract_version": 1
          },
          "dst_ip": {
            "selector": "dst",
            "original_value": "198.51.100.23",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "8a30da05501ee4c1282dc2d15deb903580ba7deaadb6aeb1397f3cab8ba0031a",
            "contract_version": 1
          },
          "protocol": {
            "selector": "proto",
            "original_value": "tcp",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "8a30da05501ee4c1282dc2d15deb903580ba7deaadb6aeb1397f3cab8ba0031a",
            "contract_version": 1
          },
          "src_ip": {
            "selector": "src",
            "original_value": "192.0.2.13",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "8a30da05501ee4c1282dc2d15deb903580ba7deaadb6aeb1397f3cab8ba0031a",
            "contract_version": 1
          }
        },
        "unmapped": {},
        "errors": [],
        "suggested_mapping": {
          "src": "src_ip",
          "dst": "dst_ip",
          "dpt": "dst_port",
          "action": "action",
          "proto": "protocol"
        },
        "contract_version": 1
      },
      {
        "id": 6,
        "revision": 3,
        "source": "gateway-leef",
        "raw_sha256": "fb1633929c7ab5734f79f256c1e305384344e0852510130d3037c26ec4fc8a48",
        "raw_base64": "TEVFRjoxLjB8RXhhbXBsZXxHYXRld2F5fDEuMHwxMDB8c3JjPTE5Mi4wLjIuMTQJZHN0PTE5OC41MS4xMDAuMjQJZHB0PTMzODkJYWN0aW9uPWJsb2NrCg==",
        "raw_text": "LEEF:1.0|Example|Gateway|1.0|100|src=192.0.2.14\tdst=198.51.100.24\tdpt=3389\taction=block\n",
        "schema": "traceweave.network/0.1",
        "status": "normalized",
        "format": "LEEF",
        "fingerprint": "a4090c05ef5da801",
        "fields": {
          "src": "192.0.2.14",
          "dst": "198.51.100.24",
          "dpt": "3389",
          "action": "block"
        },
        "canonical": {
          "action": "deny",
          "dst_port": 3389,
          "dst_ip": "198.51.100.24",
          "src_ip": "192.0.2.14"
        },
        "lineage": {
          "action": {
            "selector": "action",
            "original_value": "block",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "fb1633929c7ab5734f79f256c1e305384344e0852510130d3037c26ec4fc8a48",
            "contract_version": 1
          },
          "dst_port": {
            "selector": "dpt",
            "original_value": "3389",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "fb1633929c7ab5734f79f256c1e305384344e0852510130d3037c26ec4fc8a48",
            "contract_version": 1
          },
          "dst_ip": {
            "selector": "dst",
            "original_value": "198.51.100.24",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "fb1633929c7ab5734f79f256c1e305384344e0852510130d3037c26ec4fc8a48",
            "contract_version": 1
          },
          "src_ip": {
            "selector": "src",
            "original_value": "192.0.2.14",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "fb1633929c7ab5734f79f256c1e305384344e0852510130d3037c26ec4fc8a48",
            "contract_version": 1
          }
        },
        "unmapped": {},
        "errors": [],
        "suggested_mapping": {
          "src": "src_ip",
          "dst": "dst_ip",
          "dpt": "dst_port",
          "action": "action"
        },
        "contract_version": 1
      },
      {
        "id": 7,
        "revision": 3,
        "source": "gateway-xml",
        "raw_sha256": "3b8179555bde7f0ad1bdebae3873aa9c1e29dc705d4db960594249242e933898",
        "raw_base64": "PGV2ZW50PjxzcmM+MTkyLjAuMi4xNTwvc3JjPjxkc3Q+MTk4LjUxLjEwMC4yNTwvZHN0PjxkcHQ+NDQzPC9kcHQ+PGFjdGlvbj5hbGxvdzwvYWN0aW9uPjwvZXZlbnQ+Cg==",
        "raw_text": "<event><src>192.0.2.15</src><dst>198.51.100.25</dst><dpt>443</dpt><action>allow</action></event>\n",
        "schema": "traceweave.network/0.1",
        "status": "normalized",
        "format": "XML",
        "fingerprint": "675f4005fe89caaf",
        "fields": {
          "src": "192.0.2.15",
          "dst": "198.51.100.25",
          "dpt": "443",
          "action": "allow"
        },
        "canonical": {
          "action": "allow",
          "dst_port": 443,
          "dst_ip": "198.51.100.25",
          "src_ip": "192.0.2.15"
        },
        "lineage": {
          "action": {
            "selector": "action",
            "original_value": "allow",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "3b8179555bde7f0ad1bdebae3873aa9c1e29dc705d4db960594249242e933898",
            "contract_version": 1
          },
          "dst_port": {
            "selector": "dpt",
            "original_value": "443",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "3b8179555bde7f0ad1bdebae3873aa9c1e29dc705d4db960594249242e933898",
            "contract_version": 1
          },
          "dst_ip": {
            "selector": "dst",
            "original_value": "198.51.100.25",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "3b8179555bde7f0ad1bdebae3873aa9c1e29dc705d4db960594249242e933898",
            "contract_version": 1
          },
          "src_ip": {
            "selector": "src",
            "original_value": "192.0.2.15",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "3b8179555bde7f0ad1bdebae3873aa9c1e29dc705d4db960594249242e933898",
            "contract_version": 1
          }
        },
        "unmapped": {},
        "errors": [],
        "suggested_mapping": {
          "src": "src_ip",
          "dst": "dst_ip",
          "dpt": "dst_port",
          "action": "action"
        },
        "contract_version": 1
      },
      {
        "id": 8,
        "revision": 3,
        "source": "gateway-csv",
        "raw_sha256": "ce9430bde6c8ddcc162c997849b16c2987553d35f7a7829ca9ee442003ef0bb3",
        "raw_base64": "c3JjLGRzdCxkcHQsYWN0aW9uDQoxOTIuMC4yLjE2LDE5OC41MS4xMDAuMjYsODA4MCxkZW55DQo=",
        "raw_text": "src,dst,dpt,action\r\n192.0.2.16,198.51.100.26,8080,deny\r\n",
        "schema": "traceweave.network/0.1",
        "status": "normalized",
        "format": "CSV",
        "fingerprint": "efc9dc8a34a3d132",
        "fields": {
          "src": "192.0.2.16",
          "dst": "198.51.100.26",
          "dpt": "8080",
          "action": "deny"
        },
        "canonical": {
          "action": "deny",
          "dst_port": 8080,
          "dst_ip": "198.51.100.26",
          "src_ip": "192.0.2.16"
        },
        "lineage": {
          "action": {
            "selector": "action",
            "original_value": "deny",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "ce9430bde6c8ddcc162c997849b16c2987553d35f7a7829ca9ee442003ef0bb3",
            "contract_version": 1
          },
          "dst_port": {
            "selector": "dpt",
            "original_value": "8080",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "ce9430bde6c8ddcc162c997849b16c2987553d35f7a7829ca9ee442003ef0bb3",
            "contract_version": 1
          },
          "dst_ip": {
            "selector": "dst",
            "original_value": "198.51.100.26",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "ce9430bde6c8ddcc162c997849b16c2987553d35f7a7829ca9ee442003ef0bb3",
            "contract_version": 1
          },
          "src_ip": {
            "selector": "src",
            "original_value": "192.0.2.16",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "ce9430bde6c8ddcc162c997849b16c2987553d35f7a7829ca9ee442003ef0bb3",
            "contract_version": 1
          }
        },
        "unmapped": {},
        "errors": [],
        "suggested_mapping": {
          "src": "src_ip",
          "dst": "dst_ip",
          "dpt": "dst_port",
          "action": "action"
        },
        "contract_version": 1
      },
      {
        "id": 9,
        "revision": 1,
        "source": "gateway-alpha",
        "raw_sha256": "bd48cf0f42049b99cd01ff63d8b8ae599a936017a166a426d8c1be1673572181",
        "raw_base64": "dGltZXN0YW1wPSIyMDI2LTA5LTE5VDE0OjAyOjAwWiIgb3JpZ2luPTE5Mi4wLjIuMTAgZHN0PTE5OC41MS4xMDAuMjAgc3B0PTUxNDMyIGRwdD00NDMgYWN0aW9uPWRlbnkgcHJvdG89NiBydWxlPSJGaXJtd2FyZSB1cGRhdGUiDQo=",
        "raw_text": "timestamp=\"2026-09-19T14:02:00Z\" origin=192.0.2.10 dst=198.51.100.20 spt=51432 dpt=443 action=deny proto=6 rule=\"Firmware update\"\r\n",
        "schema": "traceweave.network/0.1",
        "status": "drift",
        "format": "KV",
        "fingerprint": "553805ef89af6ac1",
        "fields": {
          "timestamp": "2026-09-19T14:02:00Z",
          "origin": "192.0.2.10",
          "dst": "198.51.100.20",
          "spt": "51432",
          "dpt": "443",
          "action": "deny",
          "proto": "6",
          "rule": "Firmware update"
        },
        "canonical": {
          "dst_ip": "198.51.100.20",
          "src_port": 51432,
          "dst_port": 443,
          "action": "deny",
          "timestamp": "2026-09-19T14:02:00+00:00",
          "protocol": "tcp"
        },
        "lineage": {
          "dst_ip": {
            "selector": "dst",
            "original_value": "198.51.100.20",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "bd48cf0f42049b99cd01ff63d8b8ae599a936017a166a426d8c1be1673572181",
            "contract_version": null
          },
          "src_port": {
            "selector": "spt",
            "original_value": "51432",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "bd48cf0f42049b99cd01ff63d8b8ae599a936017a166a426d8c1be1673572181",
            "contract_version": null
          },
          "dst_port": {
            "selector": "dpt",
            "original_value": "443",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "bd48cf0f42049b99cd01ff63d8b8ae599a936017a166a426d8c1be1673572181",
            "contract_version": null
          },
          "action": {
            "selector": "action",
            "original_value": "deny",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "bd48cf0f42049b99cd01ff63d8b8ae599a936017a166a426d8c1be1673572181",
            "contract_version": null
          },
          "timestamp": {
            "selector": "timestamp",
            "original_value": "2026-09-19T14:02:00Z",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "bd48cf0f42049b99cd01ff63d8b8ae599a936017a166a426d8c1be1673572181",
            "contract_version": null
          },
          "protocol": {
            "selector": "proto",
            "original_value": "6",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "bd48cf0f42049b99cd01ff63d8b8ae599a936017a166a426d8c1be1673572181",
            "contract_version": null
          }
        },
        "unmapped": {
          "origin": "192.0.2.10",
          "rule": "Firmware update"
        },
        "errors": [
          "Structure changed; review mapping before export",
          "Required field unavailable: src_ip"
        ],
        "suggested_mapping": {
          "dst": "dst_ip",
          "spt": "src_port",
          "dpt": "dst_port",
          "action": "action",
          "timestamp": "timestamp",
          "proto": "protocol"
        },
        "contract_version": null
      },
      {
        "id": 10,
        "revision": 1,
        "source": "gateway-alpha",
        "raw_sha256": "d9b17268bcdd538230bc0916bf3a9d3cbc8f67e275a94929169e5e0a7a0aa2bd",
        "raw_base64": "dGltZXN0YW1wPSIyMDI2LTA5LTE5VDE0OjAyOjAxWiIgb3JpZ2luPTE5Mi4wLjIuMTEgZHN0PTE5OC41MS4xMDAuMjEgc3B0PTUxNDMzIGRwdD00NDMgYWN0aW9uPWRlbnkgcHJvdG89NiBydWxlPSJGaXJtd2FyZSB1cGRhdGUiDQo=",
        "raw_text": "timestamp=\"2026-09-19T14:02:01Z\" origin=192.0.2.11 dst=198.51.100.21 spt=51433 dpt=443 action=deny proto=6 rule=\"Firmware update\"\r\n",
        "schema": "traceweave.network/0.1",
        "status": "drift",
        "format": "KV",
        "fingerprint": "553805ef89af6ac1",
        "fields": {
          "timestamp": "2026-09-19T14:02:01Z",
          "origin": "192.0.2.11",
          "dst": "198.51.100.21",
          "spt": "51433",
          "dpt": "443",
          "action": "deny",
          "proto": "6",
          "rule": "Firmware update"
        },
        "canonical": {
          "dst_ip": "198.51.100.21",
          "src_port": 51433,
          "dst_port": 443,
          "action": "deny",
          "timestamp": "2026-09-19T14:02:01+00:00",
          "protocol": "tcp"
        },
        "lineage": {
          "dst_ip": {
            "selector": "dst",
            "original_value": "198.51.100.21",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "d9b17268bcdd538230bc0916bf3a9d3cbc8f67e275a94929169e5e0a7a0aa2bd",
            "contract_version": null
          },
          "src_port": {
            "selector": "spt",
            "original_value": "51433",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "d9b17268bcdd538230bc0916bf3a9d3cbc8f67e275a94929169e5e0a7a0aa2bd",
            "contract_version": null
          },
          "dst_port": {
            "selector": "dpt",
            "original_value": "443",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "d9b17268bcdd538230bc0916bf3a9d3cbc8f67e275a94929169e5e0a7a0aa2bd",
            "contract_version": null
          },
          "action": {
            "selector": "action",
            "original_value": "deny",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "d9b17268bcdd538230bc0916bf3a9d3cbc8f67e275a94929169e5e0a7a0aa2bd",
            "contract_version": null
          },
          "timestamp": {
            "selector": "timestamp",
            "original_value": "2026-09-19T14:02:01Z",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "d9b17268bcdd538230bc0916bf3a9d3cbc8f67e275a94929169e5e0a7a0aa2bd",
            "contract_version": null
          },
          "protocol": {
            "selector": "proto",
            "original_value": "6",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "d9b17268bcdd538230bc0916bf3a9d3cbc8f67e275a94929169e5e0a7a0aa2bd",
            "contract_version": null
          }
        },
        "unmapped": {
          "origin": "192.0.2.11",
          "rule": "Firmware update"
        },
        "errors": [
          "Structure changed; review mapping before export",
          "Required field unavailable: src_ip"
        ],
        "suggested_mapping": {
          "dst": "dst_ip",
          "spt": "src_port",
          "dpt": "dst_port",
          "action": "action",
          "timestamp": "timestamp",
          "proto": "protocol"
        },
        "contract_version": null
      }
    ],
    "counts": {
      "normalized": 8,
      "needs_mapping": 0,
      "drift": 2,
      "quarantined": 0
    },
    "raw_bytes": 1128,
    "audit": [
      {
        "id": 7,
        "at": "2026-09-19T16:23:23.499589+00:00",
        "action": "mapping_approved",
        "details": "{\"source\": \"gateway-csv\", \"fingerprint\": \"efc9dc8a34a3d132\", \"version\": 1, \"mapping\": {\"src\": \"src_ip\", \"dst\": \"dst_ip\", \"dpt\": \"dst_port\", \"action\": \"action\"}, \"validation\": [{\"id\": 8, \"valid\": true, \"errors\": []}]}"
      },
      {
        "id": 6,
        "at": "2026-09-19T16:23:23.498559+00:00",
        "action": "mapping_approved",
        "details": "{\"source\": \"gateway-xml\", \"fingerprint\": \"675f4005fe89caaf\", \"version\": 1, \"mapping\": {\"src\": \"src_ip\", \"dst\": \"dst_ip\", \"dpt\": \"dst_port\", \"action\": \"action\"}, \"validation\": [{\"id\": 7, \"valid\": true, \"errors\": []}]}"
      },
      {
        "id": 5,
        "at": "2026-09-19T16:23:23.498559+00:00",
        "action": "mapping_approved",
        "details": "{\"source\": \"gateway-leef\", \"fingerprint\": \"a4090c05ef5da801\", \"version\": 1, \"mapping\": {\"src\": \"src_ip\", \"dst\": \"dst_ip\", \"dpt\": \"dst_port\", \"action\": \"action\"}, \"validation\": [{\"id\": 6, \"valid\": true, \"errors\": []}]}"
      },
      {
        "id": 4,
        "at": "2026-09-19T16:23:23.497524+00:00",
        "action": "mapping_approved",
        "details": "{\"source\": \"gateway-syslog\", \"fingerprint\": \"0f79710e3a341e6b\", \"version\": 1, \"mapping\": {\"src\": \"src_ip\", \"dst\": \"dst_ip\", \"dpt\": \"dst_port\", \"action\": \"action\", \"proto\": \"protocol\"}, \"validation\": [{\"id\": 5, \"valid\": true, \"errors\": []}]}"
      },
      {
        "id": 3,
        "at": "2026-09-19T16:23:23.497524+00:00",
        "action": "mapping_approved",
        "details": "{\"source\": \"gateway-cef\", \"fingerprint\": \"97be2803b7f547d8\", \"version\": 1, \"mapping\": {\"src\": \"src_ip\", \"dst\": \"dst_ip\", \"dpt\": \"dst_port\", \"act\": \"action\", \"proto\": \"protocol\"}, \"validation\": [{\"id\": 4, \"valid\": true, \"errors\": []}]}"
      },
      {
        "id": 2,
        "at": "2026-09-19T16:23:23.496267+00:00",
        "action": "mapping_approved",
        "details": "{\"source\": \"gateway-json\", \"fingerprint\": \"109da2702f75285a\", \"version\": 1, \"mapping\": {\"/src_ip\": \"src_ip\", \"/dst_ip\": \"dst_ip\", \"/dst_port\": \"dst_port\", \"/action\": \"action\", \"/timestamp\": \"timestamp\", \"/protocol\": \"protocol\"}, \"validation\": [{\"id\": 3, \"valid\": true, \"errors\": []}]}"
      },
      {
        "id": 1,
        "at": "2026-09-19T16:23:23.496267+00:00",
        "action": "mapping_approved",
        "details": "{\"source\": \"gateway-alpha\", \"fingerprint\": \"dd5767faa5e4fa70\", \"version\": 1, \"mapping\": {\"src\": \"src_ip\", \"dst\": \"dst_ip\", \"spt\": \"src_port\", \"dpt\": \"dst_port\", \"action\": \"action\", \"timestamp\": \"timestamp\", \"proto\": \"protocol\"}, \"validation\": [{\"id\": 1, \"valid\": true, \"errors\": []}, {\"id\": 2, \"valid\": true, \"errors\": []}]}"
      }
    ],
    "contracts": [
      {
        "source": "gateway-alpha",
        "fingerprint": "dd5767faa5e4fa70",
        "version": 1,
        "mapping": "{\"action\": \"action\", \"dpt\": \"dst_port\", \"dst\": \"dst_ip\", \"proto\": \"protocol\", \"spt\": \"src_port\", \"src\": \"src_ip\", \"timestamp\": \"timestamp\"}",
        "active": 1
      },
      {
        "source": "gateway-cef",
        "fingerprint": "97be2803b7f547d8",
        "version": 1,
        "mapping": "{\"act\": \"action\", \"dpt\": \"dst_port\", \"dst\": \"dst_ip\", \"proto\": \"protocol\", \"src\": \"src_ip\"}",
        "active": 1
      },
      {
        "source": "gateway-csv",
        "fingerprint": "efc9dc8a34a3d132",
        "version": 1,
        "mapping": "{\"action\": \"action\", \"dpt\": \"dst_port\", \"dst\": \"dst_ip\", \"src\": \"src_ip\"}",
        "active": 1
      },
      {
        "source": "gateway-json",
        "fingerprint": "109da2702f75285a",
        "version": 1,
        "mapping": "{\"/action\": \"action\", \"/dst_ip\": \"dst_ip\", \"/dst_port\": \"dst_port\", \"/protocol\": \"protocol\", \"/src_ip\": \"src_ip\", \"/timestamp\": \"timestamp\"}",
        "active": 1
      },
      {
        "source": "gateway-leef",
        "fingerprint": "a4090c05ef5da801",
        "version": 1,
        "mapping": "{\"action\": \"action\", \"dpt\": \"dst_port\", \"dst\": \"dst_ip\", \"src\": \"src_ip\"}",
        "active": 1
      },
      {
        "source": "gateway-syslog",
        "fingerprint": "0f79710e3a341e6b",
        "version": 1,
        "mapping": "{\"action\": \"action\", \"dpt\": \"dst_port\", \"dst\": \"dst_ip\", \"proto\": \"protocol\", \"src\": \"src_ip\"}",
        "active": 1
      },
      {
        "source": "gateway-xml",
        "fingerprint": "675f4005fe89caaf",
        "version": 1,
        "mapping": "{\"action\": \"action\", \"dpt\": \"dst_port\", \"dst\": \"dst_ip\", \"src\": \"src_ip\"}",
        "active": 1
      }
    ],
    "targets": [
      "src_ip",
      "dst_ip",
      "src_port",
      "dst_port",
      "action",
      "timestamp",
      "protocol"
    ]
  },
  "adversarial": {
    "events": [
      {
        "id": 1,
        "revision": 3,
        "source": "gateway-alpha",
        "raw_sha256": "7fa08dfecfb325af8054f2a1b66173ddbadcff2a169002790ed01597f45cb6e0",
        "raw_base64": "dGltZXN0YW1wPSIyMDI2LTA5LTE5VDE0OjAwOjAwWiIgc3JjPTE5Mi4wLjIuMTAgZHN0PTE5OC41MS4xMDAuMjAgc3B0PTUxNDMyIGRwdD00NDMgYWN0aW9uPWRlbnkgcHJvdG89NiBydWxlPSJPdXRib3VuZCBwb2xpY3kiDQo=",
        "raw_text": "timestamp=\"2026-09-19T14:00:00Z\" src=192.0.2.10 dst=198.51.100.20 spt=51432 dpt=443 action=deny proto=6 rule=\"Outbound policy\"\r\n",
        "schema": "traceweave.network/0.1",
        "status": "normalized",
        "format": "KV",
        "fingerprint": "dd5767faa5e4fa70",
        "fields": {
          "timestamp": "2026-09-19T14:00:00Z",
          "src": "192.0.2.10",
          "dst": "198.51.100.20",
          "spt": "51432",
          "dpt": "443",
          "action": "deny",
          "proto": "6",
          "rule": "Outbound policy"
        },
        "canonical": {
          "action": "deny",
          "dst_port": 443,
          "dst_ip": "198.51.100.20",
          "protocol": "tcp",
          "src_port": 51432,
          "src_ip": "192.0.2.10",
          "timestamp": "2026-09-19T14:00:00+00:00"
        },
        "lineage": {
          "action": {
            "selector": "action",
            "original_value": "deny",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "7fa08dfecfb325af8054f2a1b66173ddbadcff2a169002790ed01597f45cb6e0",
            "contract_version": 1
          },
          "dst_port": {
            "selector": "dpt",
            "original_value": "443",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "7fa08dfecfb325af8054f2a1b66173ddbadcff2a169002790ed01597f45cb6e0",
            "contract_version": 1
          },
          "dst_ip": {
            "selector": "dst",
            "original_value": "198.51.100.20",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "7fa08dfecfb325af8054f2a1b66173ddbadcff2a169002790ed01597f45cb6e0",
            "contract_version": 1
          },
          "protocol": {
            "selector": "proto",
            "original_value": "6",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "7fa08dfecfb325af8054f2a1b66173ddbadcff2a169002790ed01597f45cb6e0",
            "contract_version": 1
          },
          "src_port": {
            "selector": "spt",
            "original_value": "51432",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "7fa08dfecfb325af8054f2a1b66173ddbadcff2a169002790ed01597f45cb6e0",
            "contract_version": 1
          },
          "src_ip": {
            "selector": "src",
            "original_value": "192.0.2.10",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "7fa08dfecfb325af8054f2a1b66173ddbadcff2a169002790ed01597f45cb6e0",
            "contract_version": 1
          },
          "timestamp": {
            "selector": "timestamp",
            "original_value": "2026-09-19T14:00:00Z",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "7fa08dfecfb325af8054f2a1b66173ddbadcff2a169002790ed01597f45cb6e0",
            "contract_version": 1
          }
        },
        "unmapped": {
          "rule": "Outbound policy"
        },
        "errors": [],
        "suggested_mapping": {
          "src": "src_ip",
          "dst": "dst_ip",
          "spt": "src_port",
          "dpt": "dst_port",
          "action": "action",
          "timestamp": "timestamp",
          "proto": "protocol"
        },
        "contract_version": 1
      },
      {
        "id": 2,
        "revision": 3,
        "source": "gateway-alpha",
        "raw_sha256": "ef4775629ea843c2f473fa333d2d8e4cdfd7578c3eadf55a88140ed6ae359f1a",
        "raw_base64": "dGltZXN0YW1wPSIyMDI2LTA5LTE5VDE0OjAwOjAxWiIgc3JjPTE5Mi4wLjIuMTEgZHN0PTE5OC41MS4xMDAuMjEgc3B0PTUxNDMzIGRwdD00NDMgYWN0aW9uPWFsbG93IHByb3RvPTYgcnVsZT0iQXBwcm92ZWQgdHJhZmZpYyINCg==",
        "raw_text": "timestamp=\"2026-09-19T14:00:01Z\" src=192.0.2.11 dst=198.51.100.21 spt=51433 dpt=443 action=allow proto=6 rule=\"Approved traffic\"\r\n",
        "schema": "traceweave.network/0.1",
        "status": "normalized",
        "format": "KV",
        "fingerprint": "dd5767faa5e4fa70",
        "fields": {
          "timestamp": "2026-09-19T14:00:01Z",
          "src": "192.0.2.11",
          "dst": "198.51.100.21",
          "spt": "51433",
          "dpt": "443",
          "action": "allow",
          "proto": "6",
          "rule": "Approved traffic"
        },
        "canonical": {
          "action": "allow",
          "dst_port": 443,
          "dst_ip": "198.51.100.21",
          "protocol": "tcp",
          "src_port": 51433,
          "src_ip": "192.0.2.11",
          "timestamp": "2026-09-19T14:00:01+00:00"
        },
        "lineage": {
          "action": {
            "selector": "action",
            "original_value": "allow",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "ef4775629ea843c2f473fa333d2d8e4cdfd7578c3eadf55a88140ed6ae359f1a",
            "contract_version": 1
          },
          "dst_port": {
            "selector": "dpt",
            "original_value": "443",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "ef4775629ea843c2f473fa333d2d8e4cdfd7578c3eadf55a88140ed6ae359f1a",
            "contract_version": 1
          },
          "dst_ip": {
            "selector": "dst",
            "original_value": "198.51.100.21",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "ef4775629ea843c2f473fa333d2d8e4cdfd7578c3eadf55a88140ed6ae359f1a",
            "contract_version": 1
          },
          "protocol": {
            "selector": "proto",
            "original_value": "6",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "ef4775629ea843c2f473fa333d2d8e4cdfd7578c3eadf55a88140ed6ae359f1a",
            "contract_version": 1
          },
          "src_port": {
            "selector": "spt",
            "original_value": "51433",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "ef4775629ea843c2f473fa333d2d8e4cdfd7578c3eadf55a88140ed6ae359f1a",
            "contract_version": 1
          },
          "src_ip": {
            "selector": "src",
            "original_value": "192.0.2.11",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "ef4775629ea843c2f473fa333d2d8e4cdfd7578c3eadf55a88140ed6ae359f1a",
            "contract_version": 1
          },
          "timestamp": {
            "selector": "timestamp",
            "original_value": "2026-09-19T14:00:01Z",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "ef4775629ea843c2f473fa333d2d8e4cdfd7578c3eadf55a88140ed6ae359f1a",
            "contract_version": 1
          }
        },
        "unmapped": {
          "rule": "Approved traffic"
        },
        "errors": [],
        "suggested_mapping": {
          "src": "src_ip",
          "dst": "dst_ip",
          "spt": "src_port",
          "dpt": "dst_port",
          "action": "action",
          "timestamp": "timestamp",
          "proto": "protocol"
        },
        "contract_version": 1
      },
      {
        "id": 3,
        "revision": 3,
        "source": "gateway-json",
        "raw_sha256": "80e61b7d059e1dd90aa9a9f17a31bafb6ec3cb139233cff46268aaaa9c636fb2",
        "raw_base64": "eyJ0aW1lc3RhbXAiOiIyMDI2LTA5LTE5VDE0OjAwOjAyWiIsInNyY19pcCI6IjIwMDE6ZGI4OjoxMCIsImRzdF9pcCI6IjIwMDE6ZGI4OjoyMCIsImRzdF9wb3J0Ijo1MywiYWN0aW9uIjoiYWxsb3ciLCJwcm90b2NvbCI6InVkcCIsInZlbmRvciI6eyJydWxlIjoiRE5TIn19Cg==",
        "raw_text": "{\"timestamp\":\"2026-09-19T14:00:02Z\",\"src_ip\":\"2001:db8::10\",\"dst_ip\":\"2001:db8::20\",\"dst_port\":53,\"action\":\"allow\",\"protocol\":\"udp\",\"vendor\":{\"rule\":\"DNS\"}}\n",
        "schema": "traceweave.network/0.1",
        "status": "normalized",
        "format": "JSON",
        "fingerprint": "109da2702f75285a",
        "fields": {
          "/timestamp": "2026-09-19T14:00:02Z",
          "/src_ip": "2001:db8::10",
          "/dst_ip": "2001:db8::20",
          "/dst_port": 53,
          "/action": "allow",
          "/protocol": "udp",
          "/vendor/rule": "DNS"
        },
        "canonical": {
          "action": "allow",
          "dst_ip": "2001:db8::20",
          "dst_port": 53,
          "protocol": "udp",
          "src_ip": "2001:db8::10",
          "timestamp": "2026-09-19T14:00:02+00:00"
        },
        "lineage": {
          "action": {
            "selector": "/action",
            "original_value": "allow",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "80e61b7d059e1dd90aa9a9f17a31bafb6ec3cb139233cff46268aaaa9c636fb2",
            "contract_version": 1
          },
          "dst_ip": {
            "selector": "/dst_ip",
            "original_value": "2001:db8::20",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "80e61b7d059e1dd90aa9a9f17a31bafb6ec3cb139233cff46268aaaa9c636fb2",
            "contract_version": 1
          },
          "dst_port": {
            "selector": "/dst_port",
            "original_value": 53,
            "transform": "validate-and-normalize/1",
            "raw_sha256": "80e61b7d059e1dd90aa9a9f17a31bafb6ec3cb139233cff46268aaaa9c636fb2",
            "contract_version": 1
          },
          "protocol": {
            "selector": "/protocol",
            "original_value": "udp",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "80e61b7d059e1dd90aa9a9f17a31bafb6ec3cb139233cff46268aaaa9c636fb2",
            "contract_version": 1
          },
          "src_ip": {
            "selector": "/src_ip",
            "original_value": "2001:db8::10",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "80e61b7d059e1dd90aa9a9f17a31bafb6ec3cb139233cff46268aaaa9c636fb2",
            "contract_version": 1
          },
          "timestamp": {
            "selector": "/timestamp",
            "original_value": "2026-09-19T14:00:02Z",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "80e61b7d059e1dd90aa9a9f17a31bafb6ec3cb139233cff46268aaaa9c636fb2",
            "contract_version": 1
          }
        },
        "unmapped": {
          "/vendor/rule": "DNS"
        },
        "errors": [],
        "suggested_mapping": {
          "/src_ip": "src_ip",
          "/dst_ip": "dst_ip",
          "/dst_port": "dst_port",
          "/action": "action",
          "/timestamp": "timestamp",
          "/protocol": "protocol"
        },
        "contract_version": 1
      },
      {
        "id": 4,
        "revision": 3,
        "source": "gateway-cef",
        "raw_sha256": "76261709d8838c39b8145516078aad5c96613d9beed5159f0de0f4040665fc6d",
        "raw_base64": "Q0VGOjB8RXhhbXBsZXxHYXRld2F5fDEuMHwxMDB8VHJhZmZpY3w1fHNyYz0xOTIuMC4yLjEyIGRzdD0xOTguNTEuMTAwLjIyIGRwdD0yMiBhY3Q9ZGVueSBwcm90bz02Cg==",
        "raw_text": "CEF:0|Example|Gateway|1.0|100|Traffic|5|src=192.0.2.12 dst=198.51.100.22 dpt=22 act=deny proto=6\n",
        "schema": "traceweave.network/0.1",
        "status": "normalized",
        "format": "CEF",
        "fingerprint": "97be2803b7f547d8",
        "fields": {
          "src": "192.0.2.12",
          "dst": "198.51.100.22",
          "dpt": "22",
          "act": "deny",
          "proto": "6"
        },
        "canonical": {
          "action": "deny",
          "dst_port": 22,
          "dst_ip": "198.51.100.22",
          "protocol": "tcp",
          "src_ip": "192.0.2.12"
        },
        "lineage": {
          "action": {
            "selector": "act",
            "original_value": "deny",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "76261709d8838c39b8145516078aad5c96613d9beed5159f0de0f4040665fc6d",
            "contract_version": 1
          },
          "dst_port": {
            "selector": "dpt",
            "original_value": "22",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "76261709d8838c39b8145516078aad5c96613d9beed5159f0de0f4040665fc6d",
            "contract_version": 1
          },
          "dst_ip": {
            "selector": "dst",
            "original_value": "198.51.100.22",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "76261709d8838c39b8145516078aad5c96613d9beed5159f0de0f4040665fc6d",
            "contract_version": 1
          },
          "protocol": {
            "selector": "proto",
            "original_value": "6",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "76261709d8838c39b8145516078aad5c96613d9beed5159f0de0f4040665fc6d",
            "contract_version": 1
          },
          "src_ip": {
            "selector": "src",
            "original_value": "192.0.2.12",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "76261709d8838c39b8145516078aad5c96613d9beed5159f0de0f4040665fc6d",
            "contract_version": 1
          }
        },
        "unmapped": {},
        "errors": [],
        "suggested_mapping": {
          "src": "src_ip",
          "dst": "dst_ip",
          "dpt": "dst_port",
          "act": "action",
          "proto": "protocol"
        },
        "contract_version": 1
      },
      {
        "id": 5,
        "revision": 3,
        "source": "gateway-syslog",
        "raw_sha256": "8a30da05501ee4c1282dc2d15deb903580ba7deaadb6aeb1397f3cab8ba0031a",
        "raw_base64": "PDEzND4xIDIwMjYtMDktMTlUMTQ6MDA6MDNaIGVkZ2UgZmlyZXdhbGwgLSAtIC0gc3JjPTE5Mi4wLjIuMTMgZHN0PTE5OC41MS4xMDAuMjMgZHB0PTQ0MyBhY3Rpb249cGVybWl0IHByb3RvPXRjcAo=",
        "raw_text": "<134>1 2026-09-19T14:00:03Z edge firewall - - - src=192.0.2.13 dst=198.51.100.23 dpt=443 action=permit proto=tcp\n",
        "schema": "traceweave.network/0.1",
        "status": "normalized",
        "format": "Syslog/KV",
        "fingerprint": "0f79710e3a341e6b",
        "fields": {
          "src": "192.0.2.13",
          "dst": "198.51.100.23",
          "dpt": "443",
          "action": "permit",
          "proto": "tcp"
        },
        "canonical": {
          "action": "allow",
          "dst_port": 443,
          "dst_ip": "198.51.100.23",
          "protocol": "tcp",
          "src_ip": "192.0.2.13"
        },
        "lineage": {
          "action": {
            "selector": "action",
            "original_value": "permit",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "8a30da05501ee4c1282dc2d15deb903580ba7deaadb6aeb1397f3cab8ba0031a",
            "contract_version": 1
          },
          "dst_port": {
            "selector": "dpt",
            "original_value": "443",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "8a30da05501ee4c1282dc2d15deb903580ba7deaadb6aeb1397f3cab8ba0031a",
            "contract_version": 1
          },
          "dst_ip": {
            "selector": "dst",
            "original_value": "198.51.100.23",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "8a30da05501ee4c1282dc2d15deb903580ba7deaadb6aeb1397f3cab8ba0031a",
            "contract_version": 1
          },
          "protocol": {
            "selector": "proto",
            "original_value": "tcp",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "8a30da05501ee4c1282dc2d15deb903580ba7deaadb6aeb1397f3cab8ba0031a",
            "contract_version": 1
          },
          "src_ip": {
            "selector": "src",
            "original_value": "192.0.2.13",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "8a30da05501ee4c1282dc2d15deb903580ba7deaadb6aeb1397f3cab8ba0031a",
            "contract_version": 1
          }
        },
        "unmapped": {},
        "errors": [],
        "suggested_mapping": {
          "src": "src_ip",
          "dst": "dst_ip",
          "dpt": "dst_port",
          "action": "action",
          "proto": "protocol"
        },
        "contract_version": 1
      },
      {
        "id": 6,
        "revision": 3,
        "source": "gateway-leef",
        "raw_sha256": "fb1633929c7ab5734f79f256c1e305384344e0852510130d3037c26ec4fc8a48",
        "raw_base64": "TEVFRjoxLjB8RXhhbXBsZXxHYXRld2F5fDEuMHwxMDB8c3JjPTE5Mi4wLjIuMTQJZHN0PTE5OC41MS4xMDAuMjQJZHB0PTMzODkJYWN0aW9uPWJsb2NrCg==",
        "raw_text": "LEEF:1.0|Example|Gateway|1.0|100|src=192.0.2.14\tdst=198.51.100.24\tdpt=3389\taction=block\n",
        "schema": "traceweave.network/0.1",
        "status": "normalized",
        "format": "LEEF",
        "fingerprint": "a4090c05ef5da801",
        "fields": {
          "src": "192.0.2.14",
          "dst": "198.51.100.24",
          "dpt": "3389",
          "action": "block"
        },
        "canonical": {
          "action": "deny",
          "dst_port": 3389,
          "dst_ip": "198.51.100.24",
          "src_ip": "192.0.2.14"
        },
        "lineage": {
          "action": {
            "selector": "action",
            "original_value": "block",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "fb1633929c7ab5734f79f256c1e305384344e0852510130d3037c26ec4fc8a48",
            "contract_version": 1
          },
          "dst_port": {
            "selector": "dpt",
            "original_value": "3389",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "fb1633929c7ab5734f79f256c1e305384344e0852510130d3037c26ec4fc8a48",
            "contract_version": 1
          },
          "dst_ip": {
            "selector": "dst",
            "original_value": "198.51.100.24",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "fb1633929c7ab5734f79f256c1e305384344e0852510130d3037c26ec4fc8a48",
            "contract_version": 1
          },
          "src_ip": {
            "selector": "src",
            "original_value": "192.0.2.14",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "fb1633929c7ab5734f79f256c1e305384344e0852510130d3037c26ec4fc8a48",
            "contract_version": 1
          }
        },
        "unmapped": {},
        "errors": [],
        "suggested_mapping": {
          "src": "src_ip",
          "dst": "dst_ip",
          "dpt": "dst_port",
          "action": "action"
        },
        "contract_version": 1
      },
      {
        "id": 7,
        "revision": 3,
        "source": "gateway-xml",
        "raw_sha256": "3b8179555bde7f0ad1bdebae3873aa9c1e29dc705d4db960594249242e933898",
        "raw_base64": "PGV2ZW50PjxzcmM+MTkyLjAuMi4xNTwvc3JjPjxkc3Q+MTk4LjUxLjEwMC4yNTwvZHN0PjxkcHQ+NDQzPC9kcHQ+PGFjdGlvbj5hbGxvdzwvYWN0aW9uPjwvZXZlbnQ+Cg==",
        "raw_text": "<event><src>192.0.2.15</src><dst>198.51.100.25</dst><dpt>443</dpt><action>allow</action></event>\n",
        "schema": "traceweave.network/0.1",
        "status": "normalized",
        "format": "XML",
        "fingerprint": "675f4005fe89caaf",
        "fields": {
          "src": "192.0.2.15",
          "dst": "198.51.100.25",
          "dpt": "443",
          "action": "allow"
        },
        "canonical": {
          "action": "allow",
          "dst_port": 443,
          "dst_ip": "198.51.100.25",
          "src_ip": "192.0.2.15"
        },
        "lineage": {
          "action": {
            "selector": "action",
            "original_value": "allow",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "3b8179555bde7f0ad1bdebae3873aa9c1e29dc705d4db960594249242e933898",
            "contract_version": 1
          },
          "dst_port": {
            "selector": "dpt",
            "original_value": "443",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "3b8179555bde7f0ad1bdebae3873aa9c1e29dc705d4db960594249242e933898",
            "contract_version": 1
          },
          "dst_ip": {
            "selector": "dst",
            "original_value": "198.51.100.25",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "3b8179555bde7f0ad1bdebae3873aa9c1e29dc705d4db960594249242e933898",
            "contract_version": 1
          },
          "src_ip": {
            "selector": "src",
            "original_value": "192.0.2.15",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "3b8179555bde7f0ad1bdebae3873aa9c1e29dc705d4db960594249242e933898",
            "contract_version": 1
          }
        },
        "unmapped": {},
        "errors": [],
        "suggested_mapping": {
          "src": "src_ip",
          "dst": "dst_ip",
          "dpt": "dst_port",
          "action": "action"
        },
        "contract_version": 1
      },
      {
        "id": 8,
        "revision": 3,
        "source": "gateway-csv",
        "raw_sha256": "ce9430bde6c8ddcc162c997849b16c2987553d35f7a7829ca9ee442003ef0bb3",
        "raw_base64": "c3JjLGRzdCxkcHQsYWN0aW9uDQoxOTIuMC4yLjE2LDE5OC41MS4xMDAuMjYsODA4MCxkZW55DQo=",
        "raw_text": "src,dst,dpt,action\r\n192.0.2.16,198.51.100.26,8080,deny\r\n",
        "schema": "traceweave.network/0.1",
        "status": "normalized",
        "format": "CSV",
        "fingerprint": "efc9dc8a34a3d132",
        "fields": {
          "src": "192.0.2.16",
          "dst": "198.51.100.26",
          "dpt": "8080",
          "action": "deny"
        },
        "canonical": {
          "action": "deny",
          "dst_port": 8080,
          "dst_ip": "198.51.100.26",
          "src_ip": "192.0.2.16"
        },
        "lineage": {
          "action": {
            "selector": "action",
            "original_value": "deny",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "ce9430bde6c8ddcc162c997849b16c2987553d35f7a7829ca9ee442003ef0bb3",
            "contract_version": 1
          },
          "dst_port": {
            "selector": "dpt",
            "original_value": "8080",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "ce9430bde6c8ddcc162c997849b16c2987553d35f7a7829ca9ee442003ef0bb3",
            "contract_version": 1
          },
          "dst_ip": {
            "selector": "dst",
            "original_value": "198.51.100.26",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "ce9430bde6c8ddcc162c997849b16c2987553d35f7a7829ca9ee442003ef0bb3",
            "contract_version": 1
          },
          "src_ip": {
            "selector": "src",
            "original_value": "192.0.2.16",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "ce9430bde6c8ddcc162c997849b16c2987553d35f7a7829ca9ee442003ef0bb3",
            "contract_version": 1
          }
        },
        "unmapped": {},
        "errors": [],
        "suggested_mapping": {
          "src": "src_ip",
          "dst": "dst_ip",
          "dpt": "dst_port",
          "action": "action"
        },
        "contract_version": 1
      },
      {
        "id": 9,
        "revision": 1,
        "source": "gateway-alpha",
        "raw_sha256": "bd48cf0f42049b99cd01ff63d8b8ae599a936017a166a426d8c1be1673572181",
        "raw_base64": "dGltZXN0YW1wPSIyMDI2LTA5LTE5VDE0OjAyOjAwWiIgb3JpZ2luPTE5Mi4wLjIuMTAgZHN0PTE5OC41MS4xMDAuMjAgc3B0PTUxNDMyIGRwdD00NDMgYWN0aW9uPWRlbnkgcHJvdG89NiBydWxlPSJGaXJtd2FyZSB1cGRhdGUiDQo=",
        "raw_text": "timestamp=\"2026-09-19T14:02:00Z\" origin=192.0.2.10 dst=198.51.100.20 spt=51432 dpt=443 action=deny proto=6 rule=\"Firmware update\"\r\n",
        "schema": "traceweave.network/0.1",
        "status": "drift",
        "format": "KV",
        "fingerprint": "553805ef89af6ac1",
        "fields": {
          "timestamp": "2026-09-19T14:02:00Z",
          "origin": "192.0.2.10",
          "dst": "198.51.100.20",
          "spt": "51432",
          "dpt": "443",
          "action": "deny",
          "proto": "6",
          "rule": "Firmware update"
        },
        "canonical": {
          "dst_ip": "198.51.100.20",
          "src_port": 51432,
          "dst_port": 443,
          "action": "deny",
          "timestamp": "2026-09-19T14:02:00+00:00",
          "protocol": "tcp"
        },
        "lineage": {
          "dst_ip": {
            "selector": "dst",
            "original_value": "198.51.100.20",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "bd48cf0f42049b99cd01ff63d8b8ae599a936017a166a426d8c1be1673572181",
            "contract_version": null
          },
          "src_port": {
            "selector": "spt",
            "original_value": "51432",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "bd48cf0f42049b99cd01ff63d8b8ae599a936017a166a426d8c1be1673572181",
            "contract_version": null
          },
          "dst_port": {
            "selector": "dpt",
            "original_value": "443",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "bd48cf0f42049b99cd01ff63d8b8ae599a936017a166a426d8c1be1673572181",
            "contract_version": null
          },
          "action": {
            "selector": "action",
            "original_value": "deny",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "bd48cf0f42049b99cd01ff63d8b8ae599a936017a166a426d8c1be1673572181",
            "contract_version": null
          },
          "timestamp": {
            "selector": "timestamp",
            "original_value": "2026-09-19T14:02:00Z",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "bd48cf0f42049b99cd01ff63d8b8ae599a936017a166a426d8c1be1673572181",
            "contract_version": null
          },
          "protocol": {
            "selector": "proto",
            "original_value": "6",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "bd48cf0f42049b99cd01ff63d8b8ae599a936017a166a426d8c1be1673572181",
            "contract_version": null
          }
        },
        "unmapped": {
          "origin": "192.0.2.10",
          "rule": "Firmware update"
        },
        "errors": [
          "Structure changed; review mapping before export",
          "Required field unavailable: src_ip"
        ],
        "suggested_mapping": {
          "dst": "dst_ip",
          "spt": "src_port",
          "dpt": "dst_port",
          "action": "action",
          "timestamp": "timestamp",
          "proto": "protocol"
        },
        "contract_version": null
      },
      {
        "id": 10,
        "revision": 1,
        "source": "gateway-alpha",
        "raw_sha256": "d9b17268bcdd538230bc0916bf3a9d3cbc8f67e275a94929169e5e0a7a0aa2bd",
        "raw_base64": "dGltZXN0YW1wPSIyMDI2LTA5LTE5VDE0OjAyOjAxWiIgb3JpZ2luPTE5Mi4wLjIuMTEgZHN0PTE5OC41MS4xMDAuMjEgc3B0PTUxNDMzIGRwdD00NDMgYWN0aW9uPWRlbnkgcHJvdG89NiBydWxlPSJGaXJtd2FyZSB1cGRhdGUiDQo=",
        "raw_text": "timestamp=\"2026-09-19T14:02:01Z\" origin=192.0.2.11 dst=198.51.100.21 spt=51433 dpt=443 action=deny proto=6 rule=\"Firmware update\"\r\n",
        "schema": "traceweave.network/0.1",
        "status": "drift",
        "format": "KV",
        "fingerprint": "553805ef89af6ac1",
        "fields": {
          "timestamp": "2026-09-19T14:02:01Z",
          "origin": "192.0.2.11",
          "dst": "198.51.100.21",
          "spt": "51433",
          "dpt": "443",
          "action": "deny",
          "proto": "6",
          "rule": "Firmware update"
        },
        "canonical": {
          "dst_ip": "198.51.100.21",
          "src_port": 51433,
          "dst_port": 443,
          "action": "deny",
          "timestamp": "2026-09-19T14:02:01+00:00",
          "protocol": "tcp"
        },
        "lineage": {
          "dst_ip": {
            "selector": "dst",
            "original_value": "198.51.100.21",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "d9b17268bcdd538230bc0916bf3a9d3cbc8f67e275a94929169e5e0a7a0aa2bd",
            "contract_version": null
          },
          "src_port": {
            "selector": "spt",
            "original_value": "51433",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "d9b17268bcdd538230bc0916bf3a9d3cbc8f67e275a94929169e5e0a7a0aa2bd",
            "contract_version": null
          },
          "dst_port": {
            "selector": "dpt",
            "original_value": "443",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "d9b17268bcdd538230bc0916bf3a9d3cbc8f67e275a94929169e5e0a7a0aa2bd",
            "contract_version": null
          },
          "action": {
            "selector": "action",
            "original_value": "deny",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "d9b17268bcdd538230bc0916bf3a9d3cbc8f67e275a94929169e5e0a7a0aa2bd",
            "contract_version": null
          },
          "timestamp": {
            "selector": "timestamp",
            "original_value": "2026-09-19T14:02:01Z",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "d9b17268bcdd538230bc0916bf3a9d3cbc8f67e275a94929169e5e0a7a0aa2bd",
            "contract_version": null
          },
          "protocol": {
            "selector": "proto",
            "original_value": "6",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "d9b17268bcdd538230bc0916bf3a9d3cbc8f67e275a94929169e5e0a7a0aa2bd",
            "contract_version": null
          }
        },
        "unmapped": {
          "origin": "192.0.2.11",
          "rule": "Firmware update"
        },
        "errors": [
          "Structure changed; review mapping before export",
          "Required field unavailable: src_ip"
        ],
        "suggested_mapping": {
          "dst": "dst_ip",
          "spt": "src_port",
          "dpt": "dst_port",
          "action": "action",
          "timestamp": "timestamp",
          "proto": "protocol"
        },
        "contract_version": null
      },
      {
        "id": 11,
        "revision": 1,
        "source": "gateway-json",
        "raw_sha256": "a8b016c0cef5edaae3c23b2ca48908804866e54bf7b94d807118ad845739d161",
        "raw_base64": "eyJzcmNfaXAiOiIxOTIuMC4yLjEwIiwic3JjX2lwIjoiMjAzLjAuMTEzLjk5IiwiZHN0X2lwIjoiMTk4LjUxLjEwMC4yMCIsImFjdGlvbiI6ImRlbnkifQo=",
        "raw_text": "{\"src_ip\":\"192.0.2.10\",\"src_ip\":\"203.0.113.99\",\"dst_ip\":\"198.51.100.20\",\"action\":\"deny\"}\n",
        "schema": "traceweave.network/0.1",
        "status": "quarantined",
        "format": "Unknown",
        "fingerprint": "",
        "fields": {},
        "canonical": {},
        "lineage": {},
        "unmapped": {},
        "errors": [
          "Duplicate field: src_ip"
        ],
        "suggested_mapping": {},
        "contract_version": null
      },
      {
        "id": 12,
        "revision": 1,
        "source": "gateway-alpha",
        "raw_sha256": "3cfc33b7c46cb7c1f287de69833c5c52da1e2a57ef956d0b6473edbd4f5cd1ef",
        "raw_base64": "dGltZXN0YW1wPSIyMDI2LTA5LTE5VDE0OjAwOjA1WiIgc3JjPTE5Mi4wLjIuMTAgZHN0PTE5OC41MS4xMDAuMjAgc3B0PTUxNDMyIGRwdD05OTk5OSBhY3Rpb249ZGVueSBwcm90bz02IHJ1bGU9IkludmFsaWQgcG9ydCIK",
        "raw_text": "timestamp=\"2026-09-19T14:00:05Z\" src=192.0.2.10 dst=198.51.100.20 spt=51432 dpt=99999 action=deny proto=6 rule=\"Invalid port\"\n",
        "schema": "traceweave.network/0.1",
        "status": "quarantined",
        "format": "KV",
        "fingerprint": "dd5767faa5e4fa70",
        "fields": {
          "timestamp": "2026-09-19T14:00:05Z",
          "src": "192.0.2.10",
          "dst": "198.51.100.20",
          "spt": "51432",
          "dpt": "99999",
          "action": "deny",
          "proto": "6",
          "rule": "Invalid port"
        },
        "canonical": {
          "action": "deny",
          "dst_ip": "198.51.100.20",
          "protocol": "tcp",
          "src_port": 51432,
          "src_ip": "192.0.2.10",
          "timestamp": "2026-09-19T14:00:05+00:00"
        },
        "lineage": {
          "action": {
            "selector": "action",
            "original_value": "deny",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "3cfc33b7c46cb7c1f287de69833c5c52da1e2a57ef956d0b6473edbd4f5cd1ef",
            "contract_version": 1
          },
          "dst_ip": {
            "selector": "dst",
            "original_value": "198.51.100.20",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "3cfc33b7c46cb7c1f287de69833c5c52da1e2a57ef956d0b6473edbd4f5cd1ef",
            "contract_version": 1
          },
          "protocol": {
            "selector": "proto",
            "original_value": "6",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "3cfc33b7c46cb7c1f287de69833c5c52da1e2a57ef956d0b6473edbd4f5cd1ef",
            "contract_version": 1
          },
          "src_port": {
            "selector": "spt",
            "original_value": "51432",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "3cfc33b7c46cb7c1f287de69833c5c52da1e2a57ef956d0b6473edbd4f5cd1ef",
            "contract_version": 1
          },
          "src_ip": {
            "selector": "src",
            "original_value": "192.0.2.10",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "3cfc33b7c46cb7c1f287de69833c5c52da1e2a57ef956d0b6473edbd4f5cd1ef",
            "contract_version": 1
          },
          "timestamp": {
            "selector": "timestamp",
            "original_value": "2026-09-19T14:00:05Z",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "3cfc33b7c46cb7c1f287de69833c5c52da1e2a57ef956d0b6473edbd4f5cd1ef",
            "contract_version": 1
          }
        },
        "unmapped": {
          "rule": "Invalid port"
        },
        "errors": [
          "dst_port: port outside 0..65535"
        ],
        "suggested_mapping": {
          "src": "src_ip",
          "dst": "dst_ip",
          "spt": "src_port",
          "dpt": "dst_port",
          "action": "action",
          "timestamp": "timestamp",
          "proto": "protocol"
        },
        "contract_version": 1
      },
      {
        "id": 13,
        "revision": 1,
        "source": "gateway-alpha",
        "raw_sha256": "dc2c983adcb626143c9d07d143c2a92905c913b43948cc0ecd6679dc155896fd",
        "raw_base64": "dGltZXN0YW1wPSIyMDI2LTA5LTE5VDE0OjAwOjA2WiIgc3JjPTE5Mi4wLjIuMTAgZHN0PTE5OC41MS4xMDAuMjAgc3B0PTUxNDMyIGRwdD00NDMgYWN0aW9uPXVua25vd24gcHJvdG89NiBydWxlPSJVbmtub3duIGFjdGlvbiIK",
        "raw_text": "timestamp=\"2026-09-19T14:00:06Z\" src=192.0.2.10 dst=198.51.100.20 spt=51432 dpt=443 action=unknown proto=6 rule=\"Unknown action\"\n",
        "schema": "traceweave.network/0.1",
        "status": "quarantined",
        "format": "KV",
        "fingerprint": "dd5767faa5e4fa70",
        "fields": {
          "timestamp": "2026-09-19T14:00:06Z",
          "src": "192.0.2.10",
          "dst": "198.51.100.20",
          "spt": "51432",
          "dpt": "443",
          "action": "unknown",
          "proto": "6",
          "rule": "Unknown action"
        },
        "canonical": {
          "dst_port": 443,
          "dst_ip": "198.51.100.20",
          "protocol": "tcp",
          "src_port": 51432,
          "src_ip": "192.0.2.10",
          "timestamp": "2026-09-19T14:00:06+00:00"
        },
        "lineage": {
          "dst_port": {
            "selector": "dpt",
            "original_value": "443",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "dc2c983adcb626143c9d07d143c2a92905c913b43948cc0ecd6679dc155896fd",
            "contract_version": 1
          },
          "dst_ip": {
            "selector": "dst",
            "original_value": "198.51.100.20",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "dc2c983adcb626143c9d07d143c2a92905c913b43948cc0ecd6679dc155896fd",
            "contract_version": 1
          },
          "protocol": {
            "selector": "proto",
            "original_value": "6",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "dc2c983adcb626143c9d07d143c2a92905c913b43948cc0ecd6679dc155896fd",
            "contract_version": 1
          },
          "src_port": {
            "selector": "spt",
            "original_value": "51432",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "dc2c983adcb626143c9d07d143c2a92905c913b43948cc0ecd6679dc155896fd",
            "contract_version": 1
          },
          "src_ip": {
            "selector": "src",
            "original_value": "192.0.2.10",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "dc2c983adcb626143c9d07d143c2a92905c913b43948cc0ecd6679dc155896fd",
            "contract_version": 1
          },
          "timestamp": {
            "selector": "timestamp",
            "original_value": "2026-09-19T14:00:06Z",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "dc2c983adcb626143c9d07d143c2a92905c913b43948cc0ecd6679dc155896fd",
            "contract_version": 1
          }
        },
        "unmapped": {
          "rule": "Unknown action"
        },
        "errors": [
          "action: unknown vocabulary; explicit adapter required",
          "Required field unavailable: action"
        ],
        "suggested_mapping": {
          "src": "src_ip",
          "dst": "dst_ip",
          "spt": "src_port",
          "dpt": "dst_port",
          "action": "action",
          "timestamp": "timestamp",
          "proto": "protocol"
        },
        "contract_version": 1
      },
      {
        "id": 14,
        "revision": 1,
        "source": "unrecognized",
        "raw_sha256": "5d6723d90ae35f7ed21b3fb872697d3dc620dab31c796a2e862ee4713104c5fe",
        "raw_base64": "//4AdW5yZWNvZ25pemVkIGJpbmFyeQ0K",
        "raw_text": "\ufffd\ufffd\u0000unrecognized binary\r\n",
        "schema": "traceweave.network/0.1",
        "status": "quarantined",
        "format": "Unknown",
        "fingerprint": "",
        "fields": {},
        "canonical": {},
        "lineage": {},
        "unmapped": {},
        "errors": [
          "'utf-8' codec can't decode byte 0xff in position 0: invalid start byte"
        ],
        "suggested_mapping": {},
        "contract_version": null
      }
    ],
    "counts": {
      "normalized": 8,
      "needs_mapping": 0,
      "drift": 2,
      "quarantined": 4
    },
    "raw_bytes": 1496,
    "audit": [
      {
        "id": 7,
        "at": "2026-09-19T16:23:23.499589+00:00",
        "action": "mapping_approved",
        "details": "{\"source\": \"gateway-csv\", \"fingerprint\": \"efc9dc8a34a3d132\", \"version\": 1, \"mapping\": {\"src\": \"src_ip\", \"dst\": \"dst_ip\", \"dpt\": \"dst_port\", \"action\": \"action\"}, \"validation\": [{\"id\": 8, \"valid\": true, \"errors\": []}]}"
      },
      {
        "id": 6,
        "at": "2026-09-19T16:23:23.498559+00:00",
        "action": "mapping_approved",
        "details": "{\"source\": \"gateway-xml\", \"fingerprint\": \"675f4005fe89caaf\", \"version\": 1, \"mapping\": {\"src\": \"src_ip\", \"dst\": \"dst_ip\", \"dpt\": \"dst_port\", \"action\": \"action\"}, \"validation\": [{\"id\": 7, \"valid\": true, \"errors\": []}]}"
      },
      {
        "id": 5,
        "at": "2026-09-19T16:23:23.498559+00:00",
        "action": "mapping_approved",
        "details": "{\"source\": \"gateway-leef\", \"fingerprint\": \"a4090c05ef5da801\", \"version\": 1, \"mapping\": {\"src\": \"src_ip\", \"dst\": \"dst_ip\", \"dpt\": \"dst_port\", \"action\": \"action\"}, \"validation\": [{\"id\": 6, \"valid\": true, \"errors\": []}]}"
      },
      {
        "id": 4,
        "at": "2026-09-19T16:23:23.497524+00:00",
        "action": "mapping_approved",
        "details": "{\"source\": \"gateway-syslog\", \"fingerprint\": \"0f79710e3a341e6b\", \"version\": 1, \"mapping\": {\"src\": \"src_ip\", \"dst\": \"dst_ip\", \"dpt\": \"dst_port\", \"action\": \"action\", \"proto\": \"protocol\"}, \"validation\": [{\"id\": 5, \"valid\": true, \"errors\": []}]}"
      },
      {
        "id": 3,
        "at": "2026-09-19T16:23:23.497524+00:00",
        "action": "mapping_approved",
        "details": "{\"source\": \"gateway-cef\", \"fingerprint\": \"97be2803b7f547d8\", \"version\": 1, \"mapping\": {\"src\": \"src_ip\", \"dst\": \"dst_ip\", \"dpt\": \"dst_port\", \"act\": \"action\", \"proto\": \"protocol\"}, \"validation\": [{\"id\": 4, \"valid\": true, \"errors\": []}]}"
      },
      {
        "id": 2,
        "at": "2026-09-19T16:23:23.496267+00:00",
        "action": "mapping_approved",
        "details": "{\"source\": \"gateway-json\", \"fingerprint\": \"109da2702f75285a\", \"version\": 1, \"mapping\": {\"/src_ip\": \"src_ip\", \"/dst_ip\": \"dst_ip\", \"/dst_port\": \"dst_port\", \"/action\": \"action\", \"/timestamp\": \"timestamp\", \"/protocol\": \"protocol\"}, \"validation\": [{\"id\": 3, \"valid\": true, \"errors\": []}]}"
      },
      {
        "id": 1,
        "at": "2026-09-19T16:23:23.496267+00:00",
        "action": "mapping_approved",
        "details": "{\"source\": \"gateway-alpha\", \"fingerprint\": \"dd5767faa5e4fa70\", \"version\": 1, \"mapping\": {\"src\": \"src_ip\", \"dst\": \"dst_ip\", \"spt\": \"src_port\", \"dpt\": \"dst_port\", \"action\": \"action\", \"timestamp\": \"timestamp\", \"proto\": \"protocol\"}, \"validation\": [{\"id\": 1, \"valid\": true, \"errors\": []}, {\"id\": 2, \"valid\": true, \"errors\": []}]}"
      }
    ],
    "contracts": [
      {
        "source": "gateway-alpha",
        "fingerprint": "dd5767faa5e4fa70",
        "version": 1,
        "mapping": "{\"action\": \"action\", \"dpt\": \"dst_port\", \"dst\": \"dst_ip\", \"proto\": \"protocol\", \"spt\": \"src_port\", \"src\": \"src_ip\", \"timestamp\": \"timestamp\"}",
        "active": 1
      },
      {
        "source": "gateway-cef",
        "fingerprint": "97be2803b7f547d8",
        "version": 1,
        "mapping": "{\"act\": \"action\", \"dpt\": \"dst_port\", \"dst\": \"dst_ip\", \"proto\": \"protocol\", \"src\": \"src_ip\"}",
        "active": 1
      },
      {
        "source": "gateway-csv",
        "fingerprint": "efc9dc8a34a3d132",
        "version": 1,
        "mapping": "{\"action\": \"action\", \"dpt\": \"dst_port\", \"dst\": \"dst_ip\", \"src\": \"src_ip\"}",
        "active": 1
      },
      {
        "source": "gateway-json",
        "fingerprint": "109da2702f75285a",
        "version": 1,
        "mapping": "{\"/action\": \"action\", \"/dst_ip\": \"dst_ip\", \"/dst_port\": \"dst_port\", \"/protocol\": \"protocol\", \"/src_ip\": \"src_ip\", \"/timestamp\": \"timestamp\"}",
        "active": 1
      },
      {
        "source": "gateway-leef",
        "fingerprint": "a4090c05ef5da801",
        "version": 1,
        "mapping": "{\"action\": \"action\", \"dpt\": \"dst_port\", \"dst\": \"dst_ip\", \"src\": \"src_ip\"}",
        "active": 1
      },
      {
        "source": "gateway-syslog",
        "fingerprint": "0f79710e3a341e6b",
        "version": 1,
        "mapping": "{\"action\": \"action\", \"dpt\": \"dst_port\", \"dst\": \"dst_ip\", \"proto\": \"protocol\", \"src\": \"src_ip\"}",
        "active": 1
      },
      {
        "source": "gateway-xml",
        "fingerprint": "675f4005fe89caaf",
        "version": 1,
        "mapping": "{\"action\": \"action\", \"dpt\": \"dst_port\", \"dst\": \"dst_ip\", \"src\": \"src_ip\"}",
        "active": 1
      }
    ],
    "targets": [
      "src_ip",
      "dst_ip",
      "src_port",
      "dst_port",
      "action",
      "timestamp",
      "protocol"
    ]
  },
  "drift_approved": {
    "events": [
      {
        "id": 1,
        "revision": 3,
        "source": "gateway-alpha",
        "raw_sha256": "7fa08dfecfb325af8054f2a1b66173ddbadcff2a169002790ed01597f45cb6e0",
        "raw_base64": "dGltZXN0YW1wPSIyMDI2LTA5LTE5VDE0OjAwOjAwWiIgc3JjPTE5Mi4wLjIuMTAgZHN0PTE5OC41MS4xMDAuMjAgc3B0PTUxNDMyIGRwdD00NDMgYWN0aW9uPWRlbnkgcHJvdG89NiBydWxlPSJPdXRib3VuZCBwb2xpY3kiDQo=",
        "raw_text": "timestamp=\"2026-09-19T14:00:00Z\" src=192.0.2.10 dst=198.51.100.20 spt=51432 dpt=443 action=deny proto=6 rule=\"Outbound policy\"\r\n",
        "schema": "traceweave.network/0.1",
        "status": "normalized",
        "format": "KV",
        "fingerprint": "dd5767faa5e4fa70",
        "fields": {
          "timestamp": "2026-09-19T14:00:00Z",
          "src": "192.0.2.10",
          "dst": "198.51.100.20",
          "spt": "51432",
          "dpt": "443",
          "action": "deny",
          "proto": "6",
          "rule": "Outbound policy"
        },
        "canonical": {
          "action": "deny",
          "dst_port": 443,
          "dst_ip": "198.51.100.20",
          "protocol": "tcp",
          "src_port": 51432,
          "src_ip": "192.0.2.10",
          "timestamp": "2026-09-19T14:00:00+00:00"
        },
        "lineage": {
          "action": {
            "selector": "action",
            "original_value": "deny",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "7fa08dfecfb325af8054f2a1b66173ddbadcff2a169002790ed01597f45cb6e0",
            "contract_version": 1
          },
          "dst_port": {
            "selector": "dpt",
            "original_value": "443",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "7fa08dfecfb325af8054f2a1b66173ddbadcff2a169002790ed01597f45cb6e0",
            "contract_version": 1
          },
          "dst_ip": {
            "selector": "dst",
            "original_value": "198.51.100.20",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "7fa08dfecfb325af8054f2a1b66173ddbadcff2a169002790ed01597f45cb6e0",
            "contract_version": 1
          },
          "protocol": {
            "selector": "proto",
            "original_value": "6",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "7fa08dfecfb325af8054f2a1b66173ddbadcff2a169002790ed01597f45cb6e0",
            "contract_version": 1
          },
          "src_port": {
            "selector": "spt",
            "original_value": "51432",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "7fa08dfecfb325af8054f2a1b66173ddbadcff2a169002790ed01597f45cb6e0",
            "contract_version": 1
          },
          "src_ip": {
            "selector": "src",
            "original_value": "192.0.2.10",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "7fa08dfecfb325af8054f2a1b66173ddbadcff2a169002790ed01597f45cb6e0",
            "contract_version": 1
          },
          "timestamp": {
            "selector": "timestamp",
            "original_value": "2026-09-19T14:00:00Z",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "7fa08dfecfb325af8054f2a1b66173ddbadcff2a169002790ed01597f45cb6e0",
            "contract_version": 1
          }
        },
        "unmapped": {
          "rule": "Outbound policy"
        },
        "errors": [],
        "suggested_mapping": {
          "src": "src_ip",
          "dst": "dst_ip",
          "spt": "src_port",
          "dpt": "dst_port",
          "action": "action",
          "timestamp": "timestamp",
          "proto": "protocol"
        },
        "contract_version": 1
      },
      {
        "id": 2,
        "revision": 3,
        "source": "gateway-alpha",
        "raw_sha256": "ef4775629ea843c2f473fa333d2d8e4cdfd7578c3eadf55a88140ed6ae359f1a",
        "raw_base64": "dGltZXN0YW1wPSIyMDI2LTA5LTE5VDE0OjAwOjAxWiIgc3JjPTE5Mi4wLjIuMTEgZHN0PTE5OC41MS4xMDAuMjEgc3B0PTUxNDMzIGRwdD00NDMgYWN0aW9uPWFsbG93IHByb3RvPTYgcnVsZT0iQXBwcm92ZWQgdHJhZmZpYyINCg==",
        "raw_text": "timestamp=\"2026-09-19T14:00:01Z\" src=192.0.2.11 dst=198.51.100.21 spt=51433 dpt=443 action=allow proto=6 rule=\"Approved traffic\"\r\n",
        "schema": "traceweave.network/0.1",
        "status": "normalized",
        "format": "KV",
        "fingerprint": "dd5767faa5e4fa70",
        "fields": {
          "timestamp": "2026-09-19T14:00:01Z",
          "src": "192.0.2.11",
          "dst": "198.51.100.21",
          "spt": "51433",
          "dpt": "443",
          "action": "allow",
          "proto": "6",
          "rule": "Approved traffic"
        },
        "canonical": {
          "action": "allow",
          "dst_port": 443,
          "dst_ip": "198.51.100.21",
          "protocol": "tcp",
          "src_port": 51433,
          "src_ip": "192.0.2.11",
          "timestamp": "2026-09-19T14:00:01+00:00"
        },
        "lineage": {
          "action": {
            "selector": "action",
            "original_value": "allow",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "ef4775629ea843c2f473fa333d2d8e4cdfd7578c3eadf55a88140ed6ae359f1a",
            "contract_version": 1
          },
          "dst_port": {
            "selector": "dpt",
            "original_value": "443",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "ef4775629ea843c2f473fa333d2d8e4cdfd7578c3eadf55a88140ed6ae359f1a",
            "contract_version": 1
          },
          "dst_ip": {
            "selector": "dst",
            "original_value": "198.51.100.21",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "ef4775629ea843c2f473fa333d2d8e4cdfd7578c3eadf55a88140ed6ae359f1a",
            "contract_version": 1
          },
          "protocol": {
            "selector": "proto",
            "original_value": "6",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "ef4775629ea843c2f473fa333d2d8e4cdfd7578c3eadf55a88140ed6ae359f1a",
            "contract_version": 1
          },
          "src_port": {
            "selector": "spt",
            "original_value": "51433",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "ef4775629ea843c2f473fa333d2d8e4cdfd7578c3eadf55a88140ed6ae359f1a",
            "contract_version": 1
          },
          "src_ip": {
            "selector": "src",
            "original_value": "192.0.2.11",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "ef4775629ea843c2f473fa333d2d8e4cdfd7578c3eadf55a88140ed6ae359f1a",
            "contract_version": 1
          },
          "timestamp": {
            "selector": "timestamp",
            "original_value": "2026-09-19T14:00:01Z",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "ef4775629ea843c2f473fa333d2d8e4cdfd7578c3eadf55a88140ed6ae359f1a",
            "contract_version": 1
          }
        },
        "unmapped": {
          "rule": "Approved traffic"
        },
        "errors": [],
        "suggested_mapping": {
          "src": "src_ip",
          "dst": "dst_ip",
          "spt": "src_port",
          "dpt": "dst_port",
          "action": "action",
          "timestamp": "timestamp",
          "proto": "protocol"
        },
        "contract_version": 1
      },
      {
        "id": 3,
        "revision": 3,
        "source": "gateway-json",
        "raw_sha256": "80e61b7d059e1dd90aa9a9f17a31bafb6ec3cb139233cff46268aaaa9c636fb2",
        "raw_base64": "eyJ0aW1lc3RhbXAiOiIyMDI2LTA5LTE5VDE0OjAwOjAyWiIsInNyY19pcCI6IjIwMDE6ZGI4OjoxMCIsImRzdF9pcCI6IjIwMDE6ZGI4OjoyMCIsImRzdF9wb3J0Ijo1MywiYWN0aW9uIjoiYWxsb3ciLCJwcm90b2NvbCI6InVkcCIsInZlbmRvciI6eyJydWxlIjoiRE5TIn19Cg==",
        "raw_text": "{\"timestamp\":\"2026-09-19T14:00:02Z\",\"src_ip\":\"2001:db8::10\",\"dst_ip\":\"2001:db8::20\",\"dst_port\":53,\"action\":\"allow\",\"protocol\":\"udp\",\"vendor\":{\"rule\":\"DNS\"}}\n",
        "schema": "traceweave.network/0.1",
        "status": "normalized",
        "format": "JSON",
        "fingerprint": "109da2702f75285a",
        "fields": {
          "/timestamp": "2026-09-19T14:00:02Z",
          "/src_ip": "2001:db8::10",
          "/dst_ip": "2001:db8::20",
          "/dst_port": 53,
          "/action": "allow",
          "/protocol": "udp",
          "/vendor/rule": "DNS"
        },
        "canonical": {
          "action": "allow",
          "dst_ip": "2001:db8::20",
          "dst_port": 53,
          "protocol": "udp",
          "src_ip": "2001:db8::10",
          "timestamp": "2026-09-19T14:00:02+00:00"
        },
        "lineage": {
          "action": {
            "selector": "/action",
            "original_value": "allow",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "80e61b7d059e1dd90aa9a9f17a31bafb6ec3cb139233cff46268aaaa9c636fb2",
            "contract_version": 1
          },
          "dst_ip": {
            "selector": "/dst_ip",
            "original_value": "2001:db8::20",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "80e61b7d059e1dd90aa9a9f17a31bafb6ec3cb139233cff46268aaaa9c636fb2",
            "contract_version": 1
          },
          "dst_port": {
            "selector": "/dst_port",
            "original_value": 53,
            "transform": "validate-and-normalize/1",
            "raw_sha256": "80e61b7d059e1dd90aa9a9f17a31bafb6ec3cb139233cff46268aaaa9c636fb2",
            "contract_version": 1
          },
          "protocol": {
            "selector": "/protocol",
            "original_value": "udp",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "80e61b7d059e1dd90aa9a9f17a31bafb6ec3cb139233cff46268aaaa9c636fb2",
            "contract_version": 1
          },
          "src_ip": {
            "selector": "/src_ip",
            "original_value": "2001:db8::10",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "80e61b7d059e1dd90aa9a9f17a31bafb6ec3cb139233cff46268aaaa9c636fb2",
            "contract_version": 1
          },
          "timestamp": {
            "selector": "/timestamp",
            "original_value": "2026-09-19T14:00:02Z",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "80e61b7d059e1dd90aa9a9f17a31bafb6ec3cb139233cff46268aaaa9c636fb2",
            "contract_version": 1
          }
        },
        "unmapped": {
          "/vendor/rule": "DNS"
        },
        "errors": [],
        "suggested_mapping": {
          "/src_ip": "src_ip",
          "/dst_ip": "dst_ip",
          "/dst_port": "dst_port",
          "/action": "action",
          "/timestamp": "timestamp",
          "/protocol": "protocol"
        },
        "contract_version": 1
      },
      {
        "id": 4,
        "revision": 3,
        "source": "gateway-cef",
        "raw_sha256": "76261709d8838c39b8145516078aad5c96613d9beed5159f0de0f4040665fc6d",
        "raw_base64": "Q0VGOjB8RXhhbXBsZXxHYXRld2F5fDEuMHwxMDB8VHJhZmZpY3w1fHNyYz0xOTIuMC4yLjEyIGRzdD0xOTguNTEuMTAwLjIyIGRwdD0yMiBhY3Q9ZGVueSBwcm90bz02Cg==",
        "raw_text": "CEF:0|Example|Gateway|1.0|100|Traffic|5|src=192.0.2.12 dst=198.51.100.22 dpt=22 act=deny proto=6\n",
        "schema": "traceweave.network/0.1",
        "status": "normalized",
        "format": "CEF",
        "fingerprint": "97be2803b7f547d8",
        "fields": {
          "src": "192.0.2.12",
          "dst": "198.51.100.22",
          "dpt": "22",
          "act": "deny",
          "proto": "6"
        },
        "canonical": {
          "action": "deny",
          "dst_port": 22,
          "dst_ip": "198.51.100.22",
          "protocol": "tcp",
          "src_ip": "192.0.2.12"
        },
        "lineage": {
          "action": {
            "selector": "act",
            "original_value": "deny",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "76261709d8838c39b8145516078aad5c96613d9beed5159f0de0f4040665fc6d",
            "contract_version": 1
          },
          "dst_port": {
            "selector": "dpt",
            "original_value": "22",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "76261709d8838c39b8145516078aad5c96613d9beed5159f0de0f4040665fc6d",
            "contract_version": 1
          },
          "dst_ip": {
            "selector": "dst",
            "original_value": "198.51.100.22",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "76261709d8838c39b8145516078aad5c96613d9beed5159f0de0f4040665fc6d",
            "contract_version": 1
          },
          "protocol": {
            "selector": "proto",
            "original_value": "6",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "76261709d8838c39b8145516078aad5c96613d9beed5159f0de0f4040665fc6d",
            "contract_version": 1
          },
          "src_ip": {
            "selector": "src",
            "original_value": "192.0.2.12",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "76261709d8838c39b8145516078aad5c96613d9beed5159f0de0f4040665fc6d",
            "contract_version": 1
          }
        },
        "unmapped": {},
        "errors": [],
        "suggested_mapping": {
          "src": "src_ip",
          "dst": "dst_ip",
          "dpt": "dst_port",
          "act": "action",
          "proto": "protocol"
        },
        "contract_version": 1
      },
      {
        "id": 5,
        "revision": 3,
        "source": "gateway-syslog",
        "raw_sha256": "8a30da05501ee4c1282dc2d15deb903580ba7deaadb6aeb1397f3cab8ba0031a",
        "raw_base64": "PDEzND4xIDIwMjYtMDktMTlUMTQ6MDA6MDNaIGVkZ2UgZmlyZXdhbGwgLSAtIC0gc3JjPTE5Mi4wLjIuMTMgZHN0PTE5OC41MS4xMDAuMjMgZHB0PTQ0MyBhY3Rpb249cGVybWl0IHByb3RvPXRjcAo=",
        "raw_text": "<134>1 2026-09-19T14:00:03Z edge firewall - - - src=192.0.2.13 dst=198.51.100.23 dpt=443 action=permit proto=tcp\n",
        "schema": "traceweave.network/0.1",
        "status": "normalized",
        "format": "Syslog/KV",
        "fingerprint": "0f79710e3a341e6b",
        "fields": {
          "src": "192.0.2.13",
          "dst": "198.51.100.23",
          "dpt": "443",
          "action": "permit",
          "proto": "tcp"
        },
        "canonical": {
          "action": "allow",
          "dst_port": 443,
          "dst_ip": "198.51.100.23",
          "protocol": "tcp",
          "src_ip": "192.0.2.13"
        },
        "lineage": {
          "action": {
            "selector": "action",
            "original_value": "permit",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "8a30da05501ee4c1282dc2d15deb903580ba7deaadb6aeb1397f3cab8ba0031a",
            "contract_version": 1
          },
          "dst_port": {
            "selector": "dpt",
            "original_value": "443",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "8a30da05501ee4c1282dc2d15deb903580ba7deaadb6aeb1397f3cab8ba0031a",
            "contract_version": 1
          },
          "dst_ip": {
            "selector": "dst",
            "original_value": "198.51.100.23",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "8a30da05501ee4c1282dc2d15deb903580ba7deaadb6aeb1397f3cab8ba0031a",
            "contract_version": 1
          },
          "protocol": {
            "selector": "proto",
            "original_value": "tcp",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "8a30da05501ee4c1282dc2d15deb903580ba7deaadb6aeb1397f3cab8ba0031a",
            "contract_version": 1
          },
          "src_ip": {
            "selector": "src",
            "original_value": "192.0.2.13",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "8a30da05501ee4c1282dc2d15deb903580ba7deaadb6aeb1397f3cab8ba0031a",
            "contract_version": 1
          }
        },
        "unmapped": {},
        "errors": [],
        "suggested_mapping": {
          "src": "src_ip",
          "dst": "dst_ip",
          "dpt": "dst_port",
          "action": "action",
          "proto": "protocol"
        },
        "contract_version": 1
      },
      {
        "id": 6,
        "revision": 3,
        "source": "gateway-leef",
        "raw_sha256": "fb1633929c7ab5734f79f256c1e305384344e0852510130d3037c26ec4fc8a48",
        "raw_base64": "TEVFRjoxLjB8RXhhbXBsZXxHYXRld2F5fDEuMHwxMDB8c3JjPTE5Mi4wLjIuMTQJZHN0PTE5OC41MS4xMDAuMjQJZHB0PTMzODkJYWN0aW9uPWJsb2NrCg==",
        "raw_text": "LEEF:1.0|Example|Gateway|1.0|100|src=192.0.2.14\tdst=198.51.100.24\tdpt=3389\taction=block\n",
        "schema": "traceweave.network/0.1",
        "status": "normalized",
        "format": "LEEF",
        "fingerprint": "a4090c05ef5da801",
        "fields": {
          "src": "192.0.2.14",
          "dst": "198.51.100.24",
          "dpt": "3389",
          "action": "block"
        },
        "canonical": {
          "action": "deny",
          "dst_port": 3389,
          "dst_ip": "198.51.100.24",
          "src_ip": "192.0.2.14"
        },
        "lineage": {
          "action": {
            "selector": "action",
            "original_value": "block",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "fb1633929c7ab5734f79f256c1e305384344e0852510130d3037c26ec4fc8a48",
            "contract_version": 1
          },
          "dst_port": {
            "selector": "dpt",
            "original_value": "3389",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "fb1633929c7ab5734f79f256c1e305384344e0852510130d3037c26ec4fc8a48",
            "contract_version": 1
          },
          "dst_ip": {
            "selector": "dst",
            "original_value": "198.51.100.24",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "fb1633929c7ab5734f79f256c1e305384344e0852510130d3037c26ec4fc8a48",
            "contract_version": 1
          },
          "src_ip": {
            "selector": "src",
            "original_value": "192.0.2.14",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "fb1633929c7ab5734f79f256c1e305384344e0852510130d3037c26ec4fc8a48",
            "contract_version": 1
          }
        },
        "unmapped": {},
        "errors": [],
        "suggested_mapping": {
          "src": "src_ip",
          "dst": "dst_ip",
          "dpt": "dst_port",
          "action": "action"
        },
        "contract_version": 1
      },
      {
        "id": 7,
        "revision": 3,
        "source": "gateway-xml",
        "raw_sha256": "3b8179555bde7f0ad1bdebae3873aa9c1e29dc705d4db960594249242e933898",
        "raw_base64": "PGV2ZW50PjxzcmM+MTkyLjAuMi4xNTwvc3JjPjxkc3Q+MTk4LjUxLjEwMC4yNTwvZHN0PjxkcHQ+NDQzPC9kcHQ+PGFjdGlvbj5hbGxvdzwvYWN0aW9uPjwvZXZlbnQ+Cg==",
        "raw_text": "<event><src>192.0.2.15</src><dst>198.51.100.25</dst><dpt>443</dpt><action>allow</action></event>\n",
        "schema": "traceweave.network/0.1",
        "status": "normalized",
        "format": "XML",
        "fingerprint": "675f4005fe89caaf",
        "fields": {
          "src": "192.0.2.15",
          "dst": "198.51.100.25",
          "dpt": "443",
          "action": "allow"
        },
        "canonical": {
          "action": "allow",
          "dst_port": 443,
          "dst_ip": "198.51.100.25",
          "src_ip": "192.0.2.15"
        },
        "lineage": {
          "action": {
            "selector": "action",
            "original_value": "allow",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "3b8179555bde7f0ad1bdebae3873aa9c1e29dc705d4db960594249242e933898",
            "contract_version": 1
          },
          "dst_port": {
            "selector": "dpt",
            "original_value": "443",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "3b8179555bde7f0ad1bdebae3873aa9c1e29dc705d4db960594249242e933898",
            "contract_version": 1
          },
          "dst_ip": {
            "selector": "dst",
            "original_value": "198.51.100.25",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "3b8179555bde7f0ad1bdebae3873aa9c1e29dc705d4db960594249242e933898",
            "contract_version": 1
          },
          "src_ip": {
            "selector": "src",
            "original_value": "192.0.2.15",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "3b8179555bde7f0ad1bdebae3873aa9c1e29dc705d4db960594249242e933898",
            "contract_version": 1
          }
        },
        "unmapped": {},
        "errors": [],
        "suggested_mapping": {
          "src": "src_ip",
          "dst": "dst_ip",
          "dpt": "dst_port",
          "action": "action"
        },
        "contract_version": 1
      },
      {
        "id": 8,
        "revision": 3,
        "source": "gateway-csv",
        "raw_sha256": "ce9430bde6c8ddcc162c997849b16c2987553d35f7a7829ca9ee442003ef0bb3",
        "raw_base64": "c3JjLGRzdCxkcHQsYWN0aW9uDQoxOTIuMC4yLjE2LDE5OC41MS4xMDAuMjYsODA4MCxkZW55DQo=",
        "raw_text": "src,dst,dpt,action\r\n192.0.2.16,198.51.100.26,8080,deny\r\n",
        "schema": "traceweave.network/0.1",
        "status": "normalized",
        "format": "CSV",
        "fingerprint": "efc9dc8a34a3d132",
        "fields": {
          "src": "192.0.2.16",
          "dst": "198.51.100.26",
          "dpt": "8080",
          "action": "deny"
        },
        "canonical": {
          "action": "deny",
          "dst_port": 8080,
          "dst_ip": "198.51.100.26",
          "src_ip": "192.0.2.16"
        },
        "lineage": {
          "action": {
            "selector": "action",
            "original_value": "deny",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "ce9430bde6c8ddcc162c997849b16c2987553d35f7a7829ca9ee442003ef0bb3",
            "contract_version": 1
          },
          "dst_port": {
            "selector": "dpt",
            "original_value": "8080",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "ce9430bde6c8ddcc162c997849b16c2987553d35f7a7829ca9ee442003ef0bb3",
            "contract_version": 1
          },
          "dst_ip": {
            "selector": "dst",
            "original_value": "198.51.100.26",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "ce9430bde6c8ddcc162c997849b16c2987553d35f7a7829ca9ee442003ef0bb3",
            "contract_version": 1
          },
          "src_ip": {
            "selector": "src",
            "original_value": "192.0.2.16",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "ce9430bde6c8ddcc162c997849b16c2987553d35f7a7829ca9ee442003ef0bb3",
            "contract_version": 1
          }
        },
        "unmapped": {},
        "errors": [],
        "suggested_mapping": {
          "src": "src_ip",
          "dst": "dst_ip",
          "dpt": "dst_port",
          "action": "action"
        },
        "contract_version": 1
      },
      {
        "id": 9,
        "revision": 2,
        "source": "gateway-alpha",
        "raw_sha256": "bd48cf0f42049b99cd01ff63d8b8ae599a936017a166a426d8c1be1673572181",
        "raw_base64": "dGltZXN0YW1wPSIyMDI2LTA5LTE5VDE0OjAyOjAwWiIgb3JpZ2luPTE5Mi4wLjIuMTAgZHN0PTE5OC41MS4xMDAuMjAgc3B0PTUxNDMyIGRwdD00NDMgYWN0aW9uPWRlbnkgcHJvdG89NiBydWxlPSJGaXJtd2FyZSB1cGRhdGUiDQo=",
        "raw_text": "timestamp=\"2026-09-19T14:02:00Z\" origin=192.0.2.10 dst=198.51.100.20 spt=51432 dpt=443 action=deny proto=6 rule=\"Firmware update\"\r\n",
        "schema": "traceweave.network/0.1",
        "status": "normalized",
        "format": "KV",
        "fingerprint": "553805ef89af6ac1",
        "fields": {
          "timestamp": "2026-09-19T14:02:00Z",
          "origin": "192.0.2.10",
          "dst": "198.51.100.20",
          "spt": "51432",
          "dpt": "443",
          "action": "deny",
          "proto": "6",
          "rule": "Firmware update"
        },
        "canonical": {
          "action": "deny",
          "dst_port": 443,
          "dst_ip": "198.51.100.20",
          "src_ip": "192.0.2.10",
          "protocol": "tcp",
          "src_port": 51432,
          "timestamp": "2026-09-19T14:02:00+00:00"
        },
        "lineage": {
          "action": {
            "selector": "action",
            "original_value": "deny",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "bd48cf0f42049b99cd01ff63d8b8ae599a936017a166a426d8c1be1673572181",
            "contract_version": 2
          },
          "dst_port": {
            "selector": "dpt",
            "original_value": "443",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "bd48cf0f42049b99cd01ff63d8b8ae599a936017a166a426d8c1be1673572181",
            "contract_version": 2
          },
          "dst_ip": {
            "selector": "dst",
            "original_value": "198.51.100.20",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "bd48cf0f42049b99cd01ff63d8b8ae599a936017a166a426d8c1be1673572181",
            "contract_version": 2
          },
          "src_ip": {
            "selector": "origin",
            "original_value": "192.0.2.10",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "bd48cf0f42049b99cd01ff63d8b8ae599a936017a166a426d8c1be1673572181",
            "contract_version": 2
          },
          "protocol": {
            "selector": "proto",
            "original_value": "6",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "bd48cf0f42049b99cd01ff63d8b8ae599a936017a166a426d8c1be1673572181",
            "contract_version": 2
          },
          "src_port": {
            "selector": "spt",
            "original_value": "51432",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "bd48cf0f42049b99cd01ff63d8b8ae599a936017a166a426d8c1be1673572181",
            "contract_version": 2
          },
          "timestamp": {
            "selector": "timestamp",
            "original_value": "2026-09-19T14:02:00Z",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "bd48cf0f42049b99cd01ff63d8b8ae599a936017a166a426d8c1be1673572181",
            "contract_version": 2
          }
        },
        "unmapped": {
          "rule": "Firmware update"
        },
        "errors": [],
        "suggested_mapping": {
          "dst": "dst_ip",
          "spt": "src_port",
          "dpt": "dst_port",
          "action": "action",
          "timestamp": "timestamp",
          "proto": "protocol"
        },
        "contract_version": 2
      },
      {
        "id": 10,
        "revision": 2,
        "source": "gateway-alpha",
        "raw_sha256": "d9b17268bcdd538230bc0916bf3a9d3cbc8f67e275a94929169e5e0a7a0aa2bd",
        "raw_base64": "dGltZXN0YW1wPSIyMDI2LTA5LTE5VDE0OjAyOjAxWiIgb3JpZ2luPTE5Mi4wLjIuMTEgZHN0PTE5OC41MS4xMDAuMjEgc3B0PTUxNDMzIGRwdD00NDMgYWN0aW9uPWRlbnkgcHJvdG89NiBydWxlPSJGaXJtd2FyZSB1cGRhdGUiDQo=",
        "raw_text": "timestamp=\"2026-09-19T14:02:01Z\" origin=192.0.2.11 dst=198.51.100.21 spt=51433 dpt=443 action=deny proto=6 rule=\"Firmware update\"\r\n",
        "schema": "traceweave.network/0.1",
        "status": "normalized",
        "format": "KV",
        "fingerprint": "553805ef89af6ac1",
        "fields": {
          "timestamp": "2026-09-19T14:02:01Z",
          "origin": "192.0.2.11",
          "dst": "198.51.100.21",
          "spt": "51433",
          "dpt": "443",
          "action": "deny",
          "proto": "6",
          "rule": "Firmware update"
        },
        "canonical": {
          "action": "deny",
          "dst_port": 443,
          "dst_ip": "198.51.100.21",
          "src_ip": "192.0.2.11",
          "protocol": "tcp",
          "src_port": 51433,
          "timestamp": "2026-09-19T14:02:01+00:00"
        },
        "lineage": {
          "action": {
            "selector": "action",
            "original_value": "deny",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "d9b17268bcdd538230bc0916bf3a9d3cbc8f67e275a94929169e5e0a7a0aa2bd",
            "contract_version": 2
          },
          "dst_port": {
            "selector": "dpt",
            "original_value": "443",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "d9b17268bcdd538230bc0916bf3a9d3cbc8f67e275a94929169e5e0a7a0aa2bd",
            "contract_version": 2
          },
          "dst_ip": {
            "selector": "dst",
            "original_value": "198.51.100.21",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "d9b17268bcdd538230bc0916bf3a9d3cbc8f67e275a94929169e5e0a7a0aa2bd",
            "contract_version": 2
          },
          "src_ip": {
            "selector": "origin",
            "original_value": "192.0.2.11",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "d9b17268bcdd538230bc0916bf3a9d3cbc8f67e275a94929169e5e0a7a0aa2bd",
            "contract_version": 2
          },
          "protocol": {
            "selector": "proto",
            "original_value": "6",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "d9b17268bcdd538230bc0916bf3a9d3cbc8f67e275a94929169e5e0a7a0aa2bd",
            "contract_version": 2
          },
          "src_port": {
            "selector": "spt",
            "original_value": "51433",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "d9b17268bcdd538230bc0916bf3a9d3cbc8f67e275a94929169e5e0a7a0aa2bd",
            "contract_version": 2
          },
          "timestamp": {
            "selector": "timestamp",
            "original_value": "2026-09-19T14:02:01Z",
            "transform": "validate-and-normalize/1",
            "raw_sha256": "d9b17268bcdd538230bc0916bf3a9d3cbc8f67e275a94929169e5e0a7a0aa2bd",
            "contract_version": 2
          }
        },
        "unmapped": {
          "rule": "Firmware update"
        },
        "errors": [],
        "suggested_mapping": {
          "dst": "dst_ip",
          "spt": "src_port",
          "dpt": "dst_port",
          "action": "action",
          "timestamp": "timestamp",
          "proto": "protocol"
        },
        "contract_version": 2
      }
    ],
    "counts": {
      "normalized": 10,
      "needs_mapping": 0,
      "drift": 0,
      "quarantined": 0
    },
    "raw_bytes": 1128,
    "audit": [
      {
        "id": 8,
        "at": "2026-09-19T16:23:23.507292+00:00",
        "action": "mapping_approved",
        "details": "{\"source\": \"gateway-alpha\", \"fingerprint\": \"553805ef89af6ac1\", \"version\": 2, \"mapping\": {\"timestamp\": \"timestamp\", \"origin\": \"src_ip\", \"dst\": \"dst_ip\", \"spt\": \"src_port\", \"dpt\": \"dst_port\", \"action\": \"action\", \"proto\": \"protocol\"}, \"validation\": [{\"id\": 9, \"valid\": true, \"errors\": []}, {\"id\": 10, \"valid\": true, \"errors\": []}]}"
      },
      {
        "id": 7,
        "at": "2026-09-19T16:23:23.506254+00:00",
        "action": "mapping_approved",
        "details": "{\"source\": \"gateway-csv\", \"fingerprint\": \"efc9dc8a34a3d132\", \"version\": 1, \"mapping\": {\"src\": \"src_ip\", \"dst\": \"dst_ip\", \"dpt\": \"dst_port\", \"action\": \"action\"}, \"validation\": [{\"id\": 8, \"valid\": true, \"errors\": []}]}"
      },
      {
        "id": 6,
        "at": "2026-09-19T16:23:23.506254+00:00",
        "action": "mapping_approved",
        "details": "{\"source\": \"gateway-xml\", \"fingerprint\": \"675f4005fe89caaf\", \"version\": 1, \"mapping\": {\"src\": \"src_ip\", \"dst\": \"dst_ip\", \"dpt\": \"dst_port\", \"action\": \"action\"}, \"validation\": [{\"id\": 7, \"valid\": true, \"errors\": []}]}"
      },
      {
        "id": 5,
        "at": "2026-09-19T16:23:23.505224+00:00",
        "action": "mapping_approved",
        "details": "{\"source\": \"gateway-leef\", \"fingerprint\": \"a4090c05ef5da801\", \"version\": 1, \"mapping\": {\"src\": \"src_ip\", \"dst\": \"dst_ip\", \"dpt\": \"dst_port\", \"action\": \"action\"}, \"validation\": [{\"id\": 6, \"valid\": true, \"errors\": []}]}"
      },
      {
        "id": 4,
        "at": "2026-09-19T16:23:23.505224+00:00",
        "action": "mapping_approved",
        "details": "{\"source\": \"gateway-syslog\", \"fingerprint\": \"0f79710e3a341e6b\", \"version\": 1, \"mapping\": {\"src\": \"src_ip\", \"dst\": \"dst_ip\", \"dpt\": \"dst_port\", \"action\": \"action\", \"proto\": \"protocol\"}, \"validation\": [{\"id\": 5, \"valid\": true, \"errors\": []}]}"
      },
      {
        "id": 3,
        "at": "2026-09-19T16:23:23.505224+00:00",
        "action": "mapping_approved",
        "details": "{\"source\": \"gateway-cef\", \"fingerprint\": \"97be2803b7f547d8\", \"version\": 1, \"mapping\": {\"src\": \"src_ip\", \"dst\": \"dst_ip\", \"dpt\": \"dst_port\", \"act\": \"action\", \"proto\": \"protocol\"}, \"validation\": [{\"id\": 4, \"valid\": true, \"errors\": []}]}"
      },
      {
        "id": 2,
        "at": "2026-09-19T16:23:23.504175+00:00",
        "action": "mapping_approved",
        "details": "{\"source\": \"gateway-json\", \"fingerprint\": \"109da2702f75285a\", \"version\": 1, \"mapping\": {\"/src_ip\": \"src_ip\", \"/dst_ip\": \"dst_ip\", \"/dst_port\": \"dst_port\", \"/action\": \"action\", \"/timestamp\": \"timestamp\", \"/protocol\": \"protocol\"}, \"validation\": [{\"id\": 3, \"valid\": true, \"errors\": []}]}"
      },
      {
        "id": 1,
        "at": "2026-09-19T16:23:23.503176+00:00",
        "action": "mapping_approved",
        "details": "{\"source\": \"gateway-alpha\", \"fingerprint\": \"dd5767faa5e4fa70\", \"version\": 1, \"mapping\": {\"src\": \"src_ip\", \"dst\": \"dst_ip\", \"spt\": \"src_port\", \"dpt\": \"dst_port\", \"action\": \"action\", \"timestamp\": \"timestamp\", \"proto\": \"protocol\"}, \"validation\": [{\"id\": 1, \"valid\": true, \"errors\": []}, {\"id\": 2, \"valid\": true, \"errors\": []}]}"
      }
    ],
    "contracts": [
      {
        "source": "gateway-alpha",
        "fingerprint": "dd5767faa5e4fa70",
        "version": 1,
        "mapping": "{\"action\": \"action\", \"dpt\": \"dst_port\", \"dst\": \"dst_ip\", \"proto\": \"protocol\", \"spt\": \"src_port\", \"src\": \"src_ip\", \"timestamp\": \"timestamp\"}",
        "active": 1
      },
      {
        "source": "gateway-alpha",
        "fingerprint": "553805ef89af6ac1",
        "version": 2,
        "mapping": "{\"action\": \"action\", \"dpt\": \"dst_port\", \"dst\": \"dst_ip\", \"origin\": \"src_ip\", \"proto\": \"protocol\", \"spt\": \"src_port\", \"timestamp\": \"timestamp\"}",
        "active": 1
      },
      {
        "source": "gateway-cef",
        "fingerprint": "97be2803b7f547d8",
        "version": 1,
        "mapping": "{\"act\": \"action\", \"dpt\": \"dst_port\", \"dst\": \"dst_ip\", \"proto\": \"protocol\", \"src\": \"src_ip\"}",
        "active": 1
      },
      {
        "source": "gateway-csv",
        "fingerprint": "efc9dc8a34a3d132",
        "version": 1,
        "mapping": "{\"action\": \"action\", \"dpt\": \"dst_port\", \"dst\": \"dst_ip\", \"src\": \"src_ip\"}",
        "active": 1
      },
      {
        "source": "gateway-json",
        "fingerprint": "109da2702f75285a",
        "version": 1,
        "mapping": "{\"/action\": \"action\", \"/dst_ip\": \"dst_ip\", \"/dst_port\": \"dst_port\", \"/protocol\": \"protocol\", \"/src_ip\": \"src_ip\", \"/timestamp\": \"timestamp\"}",
        "active": 1
      },
      {
        "source": "gateway-leef",
        "fingerprint": "a4090c05ef5da801",
        "version": 1,
        "mapping": "{\"action\": \"action\", \"dpt\": \"dst_port\", \"dst\": \"dst_ip\", \"src\": \"src_ip\"}",
        "active": 1
      },
      {
        "source": "gateway-syslog",
        "fingerprint": "0f79710e3a341e6b",
        "version": 1,
        "mapping": "{\"action\": \"action\", \"dpt\": \"dst_port\", \"dst\": \"dst_ip\", \"proto\": \"protocol\", \"src\": \"src_ip\"}",
        "active": 1
      },
      {
        "source": "gateway-xml",
        "fingerprint": "675f4005fe89caaf",
        "version": 1,
        "mapping": "{\"action\": \"action\", \"dpt\": \"dst_port\", \"dst\": \"dst_ip\", \"src\": \"src_ip\"}",
        "active": 1
      }
    ],
    "targets": [
      "src_ip",
      "dst_ip",
      "src_port",
      "dst_port",
      "action",
      "timestamp",
      "protocol"
    ]
  },
  "benchmark": {
    "benchmark_version": "1.0",
    "python": "3.12.14",
    "platform": "Windows-11-10.0.26200-SP0",
    "data": "Authored synthetic fixtures, 240 evaluation records: 120 known structure + 120 renamed-field structure",
    "baseline": "Same parsers and validators, fixed aliases, rejects missing required fields; no mapping review/replay",
    "baseline_correct_valid_records": 120,
    "traceweave_correct_before_review": 120,
    "traceweave_correct_after_one_review": 240,
    "evaluation_records": 240,
    "negative_records": 4,
    "negative_records_exported": 0,
    "replayed_records": 120,
    "replay_compute_ms": 63.21,
    "human_review_time": "Not measured",
    "raw_integrity": {
      "records": 1252,
      "verified": 1252,
      "failed": [],
      "scope": "Local byte integrity, not proof of origin or tamper-proof storage"
    },
    "microbenchmark": {
      "events": 1000,
      "storage": "SQLite in memory; durable disk I/O excluded",
      "events_per_second": 2235.7,
      "p50_ms": 0.388,
      "p95_ms": 0.946
    },
    "limits": [
      "No commercial competitor benchmark",
      "No external vendor holdout",
      "No statistically calibrated accuracy claim",
      "No 10x or billion-events/day achievement claim",
      "The comparison includes an operator-supplied mapping; the baseline can recover too if edited and replayed"
    ]
  }
};
