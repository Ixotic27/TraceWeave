"""Explicit remote verification using a disposable workspace, then exact cleanup.

Run only against the dedicated TraceWeave project. Never reads the user's DB.
"""
import argparse
import json
import os
import subprocess
import sys
import urllib.error
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))
from traceweave.cloud import CloudExport, configuration
from traceweave.engine import Engine


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--project-ref', required=True)
    args = parser.parse_args()
    config = configuration()
    if config.get('SUPABASE_URL') != f'https://{args.project_ref}.supabase.co':
        raise SystemExit('Requested project does not match server configuration')
    local = dict(line.split('=',1) for line in (ROOT/'.env').read_text().splitlines() if '=' in line and not line.startswith('#'))
    public_key = local.get('SUPABASE_PUBLIC_KEY')
    if not public_key: raise SystemExit('A publishable/anon key is needed for denial checks')
    cli = ROOT/'.tools/supabase/supabase.exe'
    if not cli.exists(): raise SystemExit('CLI required for exact verification-workspace cleanup')
    env = os.environ.copy()
    ca = ROOT/'.tools/windows-trusted-ca.pem'
    if ca.exists(): env['NODE_EXTRA_CA_CERTS'] = str(ca)
    engine = Engine(use_model=False)
    cloud = CloudExport(engine, config)
    url = cloud.url+'/rest/v1/traceweave_revisions?workspace_id=eq.'+cloud.workspace_id
    evidence = {'at':datetime.now(timezone.utc).isoformat(),'project_ref':args.project_ref,'checks':{}}

    def call(method, key, data=None):
        headers = {'apikey':key,'Content-Type':'application/json'}
        if key.startswith('eyJ'): headers['Authorization']='Bearer '+key
        request = urllib.request.Request(url,method=method,headers=headers,data=None if data is None else json.dumps(data).encode())
        try:
            with cloud.opener.open(request,timeout=15) as response:
                return response.status,response.read(100000)
        except urllib.error.HTTPError as exc:
            return exc.code,b''

    try:
        assert cloud.check()['connection_verified']
        public_headers = {'apikey':public_key}
        if public_key.startswith('eyJ'): public_headers['Authorization']='Bearer '+public_key
        public_request = urllib.request.Request(cloud.url+'/auth/v1/settings',headers=public_headers)
        with cloud.opener.open(public_request,timeout=15) as response:
            assert response.status==200
            response.read(100000)
        evidence['checks']['public_key_valid']=True
        grants_sql = "select relrowsecurity as rls_enabled, has_table_privilege('anon','public.traceweave_revisions','SELECT') as anon_select, has_table_privilege('authenticated','public.traceweave_revisions','SELECT') as authenticated_select, has_table_privilege('service_role','public.traceweave_revisions','INSERT') as server_insert, has_table_privilege('service_role','public.traceweave_revisions','UPDATE') as server_update, has_table_privilege('service_role','public.traceweave_revisions','DELETE') as server_delete from pg_class where oid='public.traceweave_revisions'::regclass;"
        grants = subprocess.run([str(cli),'db','query','--linked','--project-ref',args.project_ref,grants_sql,'--output','json'],env=env,capture_output=True,text=True,timeout=60)
        if grants.returncode: raise RuntimeError('Could not inspect table grants')
        access = json.loads(grants.stdout)['rows'][0]
        assert access=={'rls_enabled':True,'anon_select':False,'authenticated_select':False,'server_insert':True,'server_update':False,'server_delete':False}
        evidence['checks']['database_access_controls']=access
        row = engine.ingest('traceweave-verification',b'src=192.0.2.1 dst=198.51.100.2 action=deny\r\n')
        assert cloud.sync(True)['sent']==0
        engine.approve(row['source'],row['fingerprint'],row['suggested_mapping'])
        assert cloud.sync(True)['sent']==1
        # Simulate a lost local acknowledgement and exercise remote deduplication.
        with engine.db: engine.db.execute('DELETE FROM cloud_receipts')
        assert cloud.sync(True)['sent']==1
        status, body = call('GET',cloud.key)
        records=json.loads(body)
        assert status==200 and len(records)==1
        assert records[0]['payload']['raw_base64']==row['raw_base64']
        assert records[0]['payload']['raw_sha256']==row['raw_sha256']
        evidence['checks'].update(connection=True,review_gate=True,raw_round_trip=True,duplicate_retry=True)
        for method,data in [('GET',None),('POST',records)]:
            status,_=call(method,public_key,data)
            assert status in (401,403),f'Anonymous {method} unexpectedly returned {status}'
            evidence['checks']['anonymous_'+method.lower()+'_denied']=status
        for method,data in [('PATCH',{'source':'should-not-change'}),('DELETE',None)]:
            status,_=call(method,cloud.key,data)
            assert status in (401,403),f'Server {method} unexpectedly returned {status}'
            evidence['checks']['server_'+method.lower()+'_denied']=status
    finally:
        # UUID is generated by this process, never read from user input or records.
        sql = ROOT/'.tools/verification-cleanup.sql'
        sql.write_text("delete from public.traceweave_revisions where workspace_id = '"+cloud.workspace_id+"'::uuid;\n",encoding='utf-8')
        cleanup = subprocess.run([str(cli),'db','query','--linked','--project-ref',args.project_ref,'--file',str(sql),'--output','json'],env=env,capture_output=True,text=True,timeout=60)
        if cleanup.returncode:
            raise RuntimeError('Verification cleanup failed; disposable workspace '+cloud.workspace_id+' must be removed. No credentials printed.')
        status,body=call('GET',cloud.key)
        evidence['checks']['verification_rows_removed']=status==200 and json.loads(body)==[]
        engine.close()
        if not evidence['checks']['verification_rows_removed']: raise RuntimeError('Cleanup could not be verified')
    (ROOT/'docs/evidence/cloud-verification.json').write_text(json.dumps(evidence,indent=2)+'\n',encoding='utf-8')
    print(json.dumps(evidence))


if __name__=='__main__': main()
