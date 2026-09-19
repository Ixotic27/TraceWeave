import http.client
import json
import os
import subprocess
import sys
import unittest
from pathlib import Path


class ServerTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.process = subprocess.Popen([sys.executable, "-m", "traceweave.server", "--port", "0", "--db", ":memory:"], cwd=Path(__file__).resolve().parents[1], stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, creationflags=subprocess.CREATE_NO_WINDOW if os.name == "nt" else 0)
        line = cls.process.stdout.readline().strip()
        if not line.startswith("TraceWeave ready at"):
            cls.process.terminate()
            raise RuntimeError("Test server did not start: " + line)
        cls.port = int(line.rsplit(":", 1)[1])

    @classmethod
    def tearDownClass(cls):
        cls.process.terminate()
        cls.process.communicate(timeout=5)

    def request(self, method, path, data=None, extra=None):
        conn = http.client.HTTPConnection("127.0.0.1", self.port, timeout=5)
        headers = {"Content-Type":"application/json", **(extra or {})}
        conn.request(method,path,body=json.dumps(data) if data is not None else None,headers=headers)
        response = conn.getresponse()
        status, body = response.status, response.read()
        conn.close()
        return status, body

    def test_local_page_and_assets(self):
        for path in ("/", "/style.css", "/app.js"):
            status, body = self.request("GET", path)
            self.assertEqual(status,200)
            self.assertTrue(body)

    def test_cross_origin_request_rejected(self):
        status, _ = self.request("POST", "/api/demo", {"mode":"samples"}, {"Origin":"https://untrusted.example"})
        self.assertEqual(status,403)

    def test_non_json_mutation_rejected(self):
        status, _ = self.request("POST", "/api/demo", {"mode":"samples"}, {"Content-Type":"text/plain"})
        self.assertEqual(status,415)

    def test_demo_contracts_and_export(self):
        status, _ = self.request("POST", "/api/demo", {"mode":"samples"})
        self.assertEqual(status,200)
        _, body = self.request("GET", "/api/state")
        state = json.loads(body)
        self.assertEqual(state["counts"]["normalized"],8)
        self.assertEqual(len(state["contracts"]),7)
        status, export = self.request("GET", "/api/export")
        self.assertEqual(status,200)
        self.assertEqual(len(export.splitlines()),8)
        self.assertTrue(all(json.loads(line)["status"] == "normalized" for line in export.splitlines()))

    def test_unknown_route_is_404(self):
        status, _ = self.request("GET", "/missing")
        self.assertEqual(status,404)


if __name__ == "__main__":
    unittest.main()
