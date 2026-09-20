"""Download bounded, commit-pinned public integration fixtures, never into the UI."""
import hashlib
import json
import sys
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "datasets/public/elastic"
HEADERS = {"User-Agent": "TraceWeave-data-research", "Accept": "application/vnd.github+json"}


def fetch(url, limit=6000000):
    with urllib.request.urlopen(urllib.request.Request(url, headers=HEADERS), timeout=45) as response:
        data = response.read(limit + 1)
    if len(data) > limit:
        raise ValueError("Download exceeds fixed size cap")
    return data


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    manifest_path = OUT / "manifest.json"
    if manifest_path.exists():
        manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
        fetch_licenses(manifest)
        manifest_path.write_text(json.dumps(manifest, indent=2), encoding="utf-8", newline="\n")
        print("Verified pinned dataset and retained license notices.")
        return
    commit = json.loads(fetch("https://api.github.com/repos/elastic/integrations/commits/main"))["sha"]
    base = f"https://raw.githubusercontent.com/elastic/integrations/{commit}/"
    manifest = {"repository":"https://github.com/elastic/integrations", "commit":commit, "purpose":"Development/reference fixtures, not production logs or an independent field-label benchmark", "files":[]}
    for name in ["LICENSE.txt", "NOTICE.txt"]:
        try:
            content = fetch(base + name)
        except urllib.error.HTTPError as exc:
            if name == "NOTICE.txt" and exc.code == 404:
                continue
            raise
        (OUT / name).write_bytes(content)
        manifest["files"].append({"path":name,"url":base+name,"sha256":hashlib.sha256(content).hexdigest(),"bytes":len(content),"role":"license"})
    for family, stream in [("fortinet_fortigate","log"),("pfsense","log"),("suricata","eve")]:
        path = f"packages/{family}/data_stream/{stream}/_dev/test/pipeline"
        entries = json.loads(fetch(f"https://api.github.com/repos/elastic/integrations/contents/{path}?ref={commit}"))
        names = {item["name"] for item in entries}
        preferred = {"fortinet_fortigate":["test-fortinet-7-4.log","test-fortinet-7-2.log"], "pfsense":["test-pfsense-bsd.log","test-pfsense-syslog.log"]}.get(family)
        if preferred is None:
            preferred = sorted(name for name in names if name.endswith((".log", ".json")) and "expected" not in name)[:2]
        for name in preferred:
            if name not in names:
                raise ValueError(f"Expected fixture missing: {family}/{name}")
            for filename in [name, name + "-expected.json"]:
                if filename not in names:
                    continue
                content = fetch(base + path + "/" + filename)
                destination = OUT / family / filename
                destination.parent.mkdir(exist_ok=True)
                destination.write_bytes(content)
                manifest["files"].append({"family":family,"path":destination.relative_to(OUT).as_posix(),"url":base+path+"/"+filename,"sha256":hashlib.sha256(content).hexdigest(),"bytes":len(content),"lines":len(content.splitlines()),"role":"expected" if "expected" in filename else "input"})
                print(f"Downloaded {family}/{filename}: {len(content)} bytes", flush=True)
    fetch_licenses(manifest)
    manifest_path.write_text(json.dumps(manifest, indent=2), encoding="utf-8", newline="\n")
    print(f"Pinned {commit}; {len(manifest['files'])} files")


def fetch_licenses(manifest):
    commit = manifest["commit"]
    base = f"https://raw.githubusercontent.com/elastic/integrations/{commit}/"
    entries = json.loads(fetch(f"https://api.github.com/repos/elastic/integrations/contents/licenses?ref={commit}"))
    paths = ["licenses/" + entry["name"] for entry in entries if entry["type"] == "file"]
    paths += [f"packages/{family}/LICENSE.txt" for family in ("fortinet_fortigate","pfsense","suricata")]
    for path in paths:
        local = "upstream-licenses/" + path.replace("/", "__")
        if any(item["path"] == local for item in manifest["files"]):
            continue
        try:
            content = fetch(base + path)
        except urllib.error.HTTPError as exc:
            if exc.code == 404:
                continue
            raise
        destination = OUT / local
        destination.parent.mkdir(exist_ok=True)
        destination.write_bytes(content)
        manifest["files"].append({"path":local,"url":base+path,"sha256":hashlib.sha256(content).hexdigest(),"bytes":len(content),"role":"license"})


if __name__ == "__main__":
    main()
