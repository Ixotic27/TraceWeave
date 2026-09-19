import base64
import json
import uuid
import unittest
from pathlib import Path

from traceweave.engine import Engine, parse_record, normalize, suggest
from traceweave.fixtures import SAMPLES, DRIFT, ADVERSARIAL


class EngineTests(unittest.TestCase):
    def setUp(self):
        self.engine = Engine()

    def tearDown(self):
        self.engine.close()

    def enroll(self, sample=SAMPLES[0]):
        row = self.engine.ingest(*sample)
        self.engine.approve(row["source"], row["fingerprint"], row["suggested_mapping"])
        return self.engine.latest()[-1]

    def test_all_documented_formats_normalize_after_review(self):
        for sample in SAMPLES:
            with self.subTest(source=sample[0]):
                row = self.enroll(sample)
                self.assertEqual(row["status"], "normalized")
                self.assertIn(row["canonical"]["action"], ("allow", "deny"))

    def test_upload_never_auto_approves(self):
        row = self.engine.ingest(*SAMPLES[0])
        self.assertEqual(row["status"], "needs_mapping")
        self.assertEqual(self.engine.export(), [])

    def test_raw_bytes_preserve_crlf_and_whitespace(self):
        raw = b'  src=192.0.2.1 dst=198.51.100.1 action=deny  \r\n'
        row = self.engine.ingest("test", raw)
        self.assertEqual(base64.b64decode(row["raw_base64"]), raw)
        self.assertEqual(self.engine.verify()["verified"], 1)

    def test_duplicate_json_key_quarantined(self):
        row = self.engine.ingest(*ADVERSARIAL[0])
        self.assertEqual(row["status"], "quarantined")
        self.assertIn("Duplicate field", row["errors"][0])

    def test_duplicate_kv_field_rejected(self):
        with self.assertRaises(ValueError):
            parse_record(b"src=192.0.2.1 src=198.51.100.1")

    def test_binary_input_retained(self):
        row = self.engine.ingest(*ADVERSARIAL[-1])
        self.assertEqual(row["status"], "quarantined")
        self.assertEqual(base64.b64decode(row["raw_base64"]), ADVERSARIAL[-1][1])

    def test_invalid_port_cannot_reach_export(self):
        self.enroll()
        row = self.engine.ingest(*ADVERSARIAL[1])
        self.assertEqual(row["status"], "quarantined")
        self.assertNotIn(row["id"], [r["id"] for r in self.engine.export()])

    def test_unknown_action_cannot_reach_export(self):
        self.enroll()
        row = self.engine.ingest(*ADVERSARIAL[2])
        self.assertEqual(row["status"], "quarantined")

    def test_drift_review_replay_keeps_old_revision(self):
        self.enroll()
        rows = [self.engine.ingest(*sample) for sample in DRIFT]
        self.assertTrue(all(r["status"] == "drift" for r in rows))
        mapping = {**rows[0]["suggested_mapping"], "origin": "src_ip"}
        result = self.engine.approve(rows[0]["source"], rows[0]["fingerprint"], mapping)
        self.assertEqual(result["normalized"], 2)
        history = self.engine.history(rows[0]["id"])
        self.assertEqual([r["status"] for r in history], ["drift", "normalized"])
        self.assertEqual(history[0]["raw_sha256"], history[1]["raw_sha256"])

    def test_same_shape_unknown_action_still_rejected(self):
        first = self.enroll()
        bad = self.engine.ingest(*ADVERSARIAL[2])
        self.assertEqual(first["fingerprint"], bad["fingerprint"])
        self.assertEqual(bad["status"], "quarantined")

    def test_unmapped_nested_content_retained(self):
        row = self.enroll(SAMPLES[2])
        self.assertEqual(row["unmapped"]["/vendor/rule"], "DNS")
        self.assertEqual(row["lineage"]["src_ip"]["selector"], "/src_ip")

    def test_json_pointer_no_path_collision(self):
        _, fields = parse_record(b'{"a.b":1,"a":{"b":2},"a/b":3}')
        self.assertEqual(fields, {"/a.b": 1, "/a/b": 2, "/a~1b": 3})

    def test_no_timezone_guess(self):
        fields = {"src":"192.0.2.1", "dst":"198.51.100.1", "action":"deny", "timestamp":"2026-09-19T12:00:00"}
        _, _, _, errors = normalize(fields, suggest(fields))
        self.assertTrue(any("timezone" in e for e in errors))

    def test_boolean_is_not_a_port(self):
        _, _, _, errors = normalize({"dpt":True}, {"dpt":"dst_port"})
        self.assertTrue(any("unsupported value type" in e for e in errors))

    def test_mapping_rejects_duplicate_targets(self):
        row = self.engine.ingest(*SAMPLES[0])
        with self.assertRaises(ValueError):
            self.engine.approve(row["source"], row["fingerprint"], {"src":"src_ip", "dst":"src_ip"})

    def test_mapping_cannot_silently_invent_a_field(self):
        row = self.engine.ingest(*SAMPLES[0])
        with self.assertRaises(ValueError):
            self.engine.approve(row["source"], row["fingerprint"], {"imaginary":"src_ip", "dst":"dst_ip", "action":"action"})

    def test_source_contract_isolation(self):
        self.enroll()
        other = self.engine.ingest("other-source", SAMPLES[0][1])
        self.assertEqual(other["status"], "needs_mapping")

    def test_rollback_reprocesses_with_previous_contract(self):
        row = self.enroll()
        mapping = dict(row["suggested_mapping"])
        mapping.pop("spt")
        self.engine.approve(row["source"], row["fingerprint"], mapping)
        self.assertNotIn("src_port", self.engine.latest()[0]["canonical"])
        self.engine.rollback(row["source"], row["fingerprint"])
        self.assertEqual(self.engine.latest()[0]["canonical"]["src_port"], 51432)

    def test_evidence_corruption_detected(self):
        row = self.enroll()
        self.engine.db.execute("UPDATE events SET raw=? WHERE id=?", (b"altered", row["id"]))
        self.assertEqual(self.engine.verify()["failed"], [row["id"]])
        updated = self.engine.process(row["id"])
        self.assertEqual(updated["status"], "quarantined")

    def test_database_persistence(self):
        folder = Path(__file__).resolve().parents[1] / "data"
        folder.mkdir(exist_ok=True)
        path = folder / ("test-" + uuid.uuid4().hex + ".sqlite3")
        try:
            one = Engine(path)
            row = one.ingest(*SAMPLES[0])
            one.approve(row["source"], row["fingerprint"], row["suggested_mapping"])
            one.close()
            two = Engine(path)
            self.assertEqual(two.latest()[0]["status"], "normalized")
            self.assertEqual(two.verify()["verified"], 1)
            two.close()
        finally:
            if path.exists():
                path.unlink()

    def test_xml_entities_not_evaluated(self):
        row = self.engine.ingest("xml", b'<!DOCTYPE x [<!ENTITY a "b">]><x><src>&a;</src></x>')
        self.assertEqual(row["status"], "quarantined")

    def test_unquoted_ambiguous_values_rejected(self):
        with self.assertRaises(ValueError):
            parse_record(b'src=192.0.2.1 dst=198.51.100.1 action=deny rule=two words')

    def test_quoted_values_and_escaped_quotes(self):
        _, fields = parse_record(b'src=192.0.2.1 rule="two \\"words\\""')
        self.assertEqual(fields["rule"], 'two "words"')

    def test_invalid_records_remain_after_contract_replay(self):
        self.enroll()
        self.engine.ingest(*ADVERSARIAL[1])
        row = self.engine.latest()[0]
        result = self.engine.approve(row["source"], row["fingerprint"], row["suggested_mapping"])
        self.assertEqual(result["normalized"], 1)
        self.assertEqual(self.engine.latest()[1]["status"], "quarantined")


if __name__ == "__main__":
    unittest.main()
