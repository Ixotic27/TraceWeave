"""Authored synthetic records. No real user, network, or organization data."""
SAMPLES = [
    ("gateway-alpha", b'timestamp="2026-09-19T14:00:00Z" src=192.0.2.10 dst=198.51.100.20 spt=51432 dpt=443 action=deny proto=6 rule="Outbound policy"\r\n'),
    ("gateway-alpha", b'timestamp="2026-09-19T14:00:01Z" src=192.0.2.11 dst=198.51.100.21 spt=51433 dpt=443 action=allow proto=6 rule="Approved traffic"\r\n'),
    ("gateway-json", b'{"timestamp":"2026-09-19T14:00:02Z","src_ip":"2001:db8::10","dst_ip":"2001:db8::20","dst_port":53,"action":"allow","protocol":"udp","vendor":{"rule":"DNS"}}\n'),
    ("gateway-cef", b'CEF:0|Example|Gateway|1.0|100|Traffic|5|src=192.0.2.12 dst=198.51.100.22 dpt=22 act=deny proto=6\n'),
    ("gateway-syslog", b'<134>1 2026-09-19T14:00:03Z edge firewall - - - src=192.0.2.13 dst=198.51.100.23 dpt=443 action=permit proto=tcp\n'),
    ("gateway-leef", b'LEEF:1.0|Example|Gateway|1.0|100|src=192.0.2.14\tdst=198.51.100.24\tdpt=3389\taction=block\n'),
    ("gateway-xml", b'<event><src>192.0.2.15</src><dst>198.51.100.25</dst><dpt>443</dpt><action>allow</action></event>\n'),
    ("gateway-csv", b'src,dst,dpt,action\r\n192.0.2.16,198.51.100.26,8080,deny\r\n'),
]
DRIFT = [
    ("gateway-alpha", b'timestamp="2026-09-19T14:02:00Z" origin=192.0.2.10 dst=198.51.100.20 spt=51432 dpt=443 action=deny proto=6 rule="Firmware update"\r\n'),
    ("gateway-alpha", b'timestamp="2026-09-19T14:02:01Z" origin=192.0.2.11 dst=198.51.100.21 spt=51433 dpt=443 action=deny proto=6 rule="Firmware update"\r\n'),
]
ADVERSARIAL = [
    ("gateway-json", b'{"src_ip":"192.0.2.10","src_ip":"203.0.113.99","dst_ip":"198.51.100.20","action":"deny"}\n'),
    ("gateway-alpha", b'timestamp="2026-09-19T14:00:05Z" src=192.0.2.10 dst=198.51.100.20 spt=51432 dpt=99999 action=deny proto=6 rule="Invalid port"\n'),
    ("gateway-alpha", b'timestamp="2026-09-19T14:00:06Z" src=192.0.2.10 dst=198.51.100.20 spt=51432 dpt=443 action=unknown proto=6 rule="Unknown action"\n'),
    ("unrecognized", b'\xff\xfe\x00unrecognized binary\r\n'),
]
