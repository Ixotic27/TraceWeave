"""Install the official Windows release locally after verifying its SHA-256."""
import hashlib
import io
import json
import tarfile
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DEST = ROOT / ".tools/supabase"

def get(url, cap):
    with urllib.request.urlopen(urllib.request.Request(url,headers={"User-Agent":"TraceWeave-setup"}),timeout=60) as response:
        data=response.read(cap+1)
    if len(data)>cap: raise ValueError("Release exceeds download size cap")
    return data

release=json.loads(get("https://api.github.com/repos/supabase/cli/releases/latest",2000000))
assets={a["name"]:a["browser_download_url"] for a in release["assets"]}
name="supabase_windows_amd64.tar.gz"
checksums=next(value for key,value in assets.items() if key.endswith("checksums.txt"))
expected=next(line.split()[0] for line in get(checksums,200000).decode().splitlines() if line.split()[-1].lstrip('*')==name)
payload=get(assets[name],100000000)
actual=hashlib.sha256(payload).hexdigest()
if actual!=expected: raise ValueError("CLI release checksum mismatch")
DEST.mkdir(parents=True,exist_ok=True)
with tarfile.open(fileobj=io.BytesIO(payload),mode="r:gz") as archive:
    member=next(m for m in archive.getmembers() if m.name in ("supabase.exe","./supabase.exe"))
    if not member.isfile() or member.size>150000000: raise ValueError("Unexpected CLI archive entry")
    (DEST/"supabase.exe").write_bytes(archive.extractfile(member).read())
(DEST/"release.json").write_text(json.dumps({"version":release["tag_name"],"url":assets[name],"sha256":actual},indent=2),encoding="utf-8")
print(json.dumps({"version":release["tag_name"],"sha256_verified":True,"binary":str(DEST/'supabase.exe')}))
