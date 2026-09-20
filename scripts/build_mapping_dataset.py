"""Author a reproducible field-name task; no generated row is a production log.

Splits are by distinct normalized field name. Validation chooses an abstention
threshold; test names are never used for optimizer updates or threshold choice.
"""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
VALUES = {"src_ip":"192.0.2.1","dst_ip":"198.51.100.2","src_port":50000,"dst_port":443,"action":"deny","timestamp":"2026-09-20T00:00:00Z","protocol":"tcp","ignore":"unknown"}
NAMES = {
    "train": {
        "src_ip":"src srcip sourceip src_ip source_ip sourceAddress source_address source.ip src.address srcHostAddress sourceHost sourceIPv4 sourceIPv6 client_ip clientAddress client.ip initiator_ip sender_address originating_ip sourceEndpointAddress senderIP",
        "dst_ip":"dst dstip dest_ip destination_ip destinationAddress destAddress destination.ip dst.address destinationHost remoteDestinationIP destinationIPv4 destinationIPv6 server_ip serverAddress server.ip responder_ip receiver_address target_ip destinationEndpointAddress receiverIP",
        "src_port":"spt srcport sourceport src_port source_port source.port src.transportPort sourcePortNumber client_port clientPort client.port initiator_port senderPort outboundSourcePort",
        "dst_port":"dpt dstport destport dst_port dest_port destination_port destination.port destinationPortNumber server_port serverPort server.port responder_port receiverPort targetPort",
        "action":"action act verdict decision policyAction firewallAction firewall_decision traffic_action packetAction disposition accessDecision ruleAction connectionAction eventDecision",
        "timestamp":"timestamp event_time eventTime time eventTimestamp occurred_at observed_at logged_at recordedAt event_date dateTime timeGenerated timeCreated event.time utcTimestamp",
        "protocol":"proto protocol transport transport_protocol networkProtocol ipProtocol transportProtocol protocol_name ip_proto network.transport ip.protocol transportName",
        "ignore":"message msg rule ruleid ruleName policyid policyName session_id sessionid deviceid hostname username user password signature signature_id alert_action severity category interface srcintf dstintf srcmac dstmac source_country destination_country bytes sentbyte receivedbyte packets source_nat_ip destination_nat_ip source_port_count destination_port_count flow_id count duration process_id process_name application app vendor event_type status source_interface destination_interface user_agent address ip port origin target data payload metadata label name state error_code"
    },
    "validation": {
        "src_ip":"sourceNetworkAddress clientHostIP source_endpoint_ip senderIPv4",
        "dst_ip":"destinationNetworkAddress serverHostIP destination_endpoint_ip receiverIPv4",
        "src_port":"srcPortNumber clientTransportPort sender_port sourceTcpPort",
        "dst_port":"dstPortNumber serverTransportPort receiver_port destinationTcpPort",
        "action":"trafficDecision packetDecision firewallVerdict access_action",
        "timestamp":"eventDateTime observedTime log_timestamp created_at",
        "protocol":"transportType network_protocol transport_proto protocolType",
        "ignore":"source_geo destination_geo message_text session_state signatureName source_nat_address destination_nat_address ip_address port_number timestamp_format allowed_count action_count event_count eventSource originNode"
    },
    "test": {
        "src_ip":"srcIPv4 sourceHostIP clientNetworkAddress initiating_ip packet.source.ip source_endpoint_address",
        "dst_ip":"dstIPv4 destinationHostIP serverNetworkAddress responding_ip packet.destination.ip destination_endpoint_address",
        "src_port":"sourceTransportPort clientTcpPort packet.source.port source_endpoint_port srcTcpPort initiating_port",
        "dst_port":"destinationTransportPort serverTcpPort packet.destination.port destination_endpoint_port dstTcpPort responding_port",
        "action":"networkDecision traffic_verdict packet_policy_action accessVerdict firewallDisposition decisionTaken",
        "timestamp":"eventCreatedAt logTime event_logged_at observationTimestamp occurrenceTime timeOfEvent",
        "protocol":"packetProtocol ipTransportProtocol network_transport_name l4Protocol transportLayerProtocol protocolUsed",
        "ignore":"source_city destination_city source_network_name destination_network_name log_message record_count uptime gateway_id endpointAddress peer_ip nat_src_ip nat_dst_ip sourcePortTotal destinationPortTotal timeZone eventTimeFormat actionStatistics rawData interfaceName severityLevel"
    }
}

def main():
    rows=[]
    seen={}
    excluded=[]
    for split, classes in NAMES.items():
        for label, names in classes.items():
            for name in names.split():
                key=re.sub(r"[^a-z0-9]","",name.lower())
                if key in seen and seen[key]!=split:
                    excluded.append({"field":name,"split":split,"reason":"Normalized name already present in "+seen[key]})
                    continue
                seen[key]=split
                value=VALUES[label]
                if label=="ignore":
                    value="192.0.2.30" if any(part in name.lower() for part in ("ip","address")) else 10 if any(part in name.lower() for part in ("port","count","byte","total","duration","uptime")) else "deny" if "action" in name.lower() else "unknown"
                rows.append({"field":name,"value":value,"label":label,"split":split})
    result={"version":1,"provenance":"Authored field-name supervision based on the project's network taxonomy. Values are synthetic type examples, not captured traffic. Labels are authored expectations, not independent vendor ground truth.","task":"Map an unfamiliar field name and value shape to one of seven network attributes, or abstain.","excluded_cross_split_duplicates":excluded,"rows":rows}
    target=ROOT/"datasets/model/field_labels.json"
    target.parent.mkdir(parents=True,exist_ok=True)
    target.write_text(json.dumps(result,indent=2)+"\n",encoding="utf-8",newline="\n")
    print(json.dumps({split:sum(r['split']==split for r in rows) for split in NAMES}))

if __name__=="__main__": main()
