"""Versioned, conservative device profiles. No action or timezone is invented."""
import csv
import re
from datetime import datetime, timezone


def pfsense_record(text):
    match = re.search(r"\bfilterlog(?:\[\d+\]:|\s+\d+\s+-\s+-)\s+(.*)$", text)
    if not match:
        return None
    values = next(csv.reader([match.group(1)]))
    if len(values) < 17 or values[8] not in ("4", "6"):
        raise ValueError("pfSense filterlog: incomplete or unsupported IP payload")
    offset = 18 if values[8] == "4" else 15
    if len(values) < offset + 2:
        raise ValueError("pfSense filterlog: missing source/destination columns")
    fields = {f"csv/{index}": value for index, value in enumerate(values)}
    envelope = re.match(r"^<\d{1,3}>1\s+(\S+)", text)
    if envelope and envelope.group(1) != "-":
        fields["syslog/timestamp"] = envelope.group(1)
    return "pfSense filterlog", fields


def profile_for(fmt, fields):
    profile = {"id":"generic/1","vendor":"Generic","event_class":"firewall_decision","required":["src_ip","dst_ip","action"],"mapping":{},"transforms":{},"warnings":[]}
    if fmt == "pfSense filterlog":
        start = 18 if fields.get("csv/8") == "4" else 15
        proto = 15 if start == 18 else 13
        mapping = {f"csv/{start}":"src_ip",f"csv/{start+1}":"dst_ip","csv/6":"action",f"csv/{proto}":"protocol"}
        if fields.get(f"csv/{proto}") in ("6","17"):
            for index, target in [(start+2,"src_port"),(start+3,"dst_port")]:
                if f"csv/{index}" in fields:
                    mapping[f"csv/{index}"] = target
        if "syslog/timestamp" in fields:
            mapping["syslog/timestamp"] = "timestamp"
        else:
            profile["warnings"].append("The BSD syslog timestamp has no year or timezone; no complete time was inferred.")
        profile.update(id="pfsense.filterlog/1",vendor="pfSense",mapping=mapping)
        profile["transforms"]["csv/6"] = "pfsense-action/1"
    elif "/event_type" in fields and ("/flow_id" in fields or any(key.startswith("/stats/") for key in fields)):
        event_type = fields["/event_type"]
        kind = "security_alert" if event_type == "alert" else "network_connection" if "/src_ip" in fields or "/dest_ip" in fields else "device_event"
        mapping = {key:target for key,target in {"/src_ip":"src_ip","/dest_ip":"dst_ip","/src_port":"src_port","/dest_port":"dst_port","/proto":"protocol","/timestamp":"timestamp","/verdict/action":"action"}.items() if key in fields}
        profile.update(id="suricata.eve/1",vendor="Suricata",event_class=kind,required=["timestamp"] if kind == "device_event" else ["src_ip","dst_ip"],mapping=mapping)
        if "/alert/action" in fields:
            profile["warnings"].append("The alert action is retained separately; it is not a final traffic verdict.")
    elif "logid" in fields and fields.get("type") in ("traffic","utm","event"):
        traffic = fields.get("type") == "traffic"
        kind = "firewall_decision" if traffic and fields.get("action") in ("accept","deny","drop","block") else "network_connection" if traffic else "device_event"
        mapping = {key:target for key,target in {"srcip":"src_ip","dstip":"dst_ip","srcport":"src_port","dstport":"dst_port","proto":"protocol","eventtime":"timestamp"}.items() if key in fields}
        if kind == "firewall_decision":
            mapping["action"] = "action"
        profile.update(id="fortigate.traffic/1" if traffic else "fortigate.other/1",vendor="FortiGate",event_class=kind,required=["src_ip","dst_ip","action"] if kind == "firewall_decision" else ["src_ip","dst_ip"] if traffic else ["timestamp"],mapping=mapping)
        if "eventtime" in mapping:
            profile["transforms"]["eventtime"] = "fortigate-epoch/1"
        if "action" in fields and "action" not in mapping:
            profile["warnings"].append("The device action describes a session or device event; no allow/deny verdict was inferred.")
    return profile


def profile_value(profile, selector, target, value):
    transform = profile.get("transforms", {}).get(selector)
    if profile["id"] == "suricata.eve/1" and target == "action" and selector != "/verdict/action":
        raise ValueError("Suricata final action must come from verdict.action, not alert.action")
    if transform == "pfsense-action/1" and target == "action":
        if value not in ("pass","block"):
            raise ValueError("pfSense action: only pass/block are supported")
        return {"pass":"allow","block":"deny"}[value], transform
    if transform == "fortigate-epoch/1" and target == "timestamp":
        text = str(value)
        if not text.isdigit() or len(text) not in (10,19):
            raise ValueError("FortiGate eventtime requires documented seconds (10 digits) or nanoseconds (19 digits)")
        seconds, nanos = (int(text),0) if len(text) == 10 else divmod(int(text),1000000000)
        stamp = datetime.fromtimestamp(seconds, timezone.utc).strftime("%Y-%m-%dT%H:%M:%S")
        return stamp + (f".{nanos:09d}" if len(text) == 19 else "") + "+00:00", transform
    return value, None
