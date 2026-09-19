"""Read the supplied workbook without modifying it; retain exact cell provenance."""
import hashlib
import json
from pathlib import Path
from xml.etree import ElementTree as ET
from zipfile import ZipFile

ROOT = Path(__file__).resolve().parents[1]
NS = {"s": "http://schemas.openxmlformats.org/spreadsheetml/2006/main"}


def inspect():
    path = next(ROOT.glob("*.xlsx"))
    with ZipFile(path) as archive:
        strings = []
        if "xl/sharedStrings.xml" in archive.namelist():
            strings = ["".join(n.itertext()) for n in ET.fromstring(archive.read("xl/sharedStrings.xml")).findall("s:si", NS)]
        sheets = ET.fromstring(archive.read("xl/workbook.xml")).findall("s:sheets/s:sheet", NS)
        relationships = {r.attrib["Id"]: r.attrib["Target"] for r in ET.fromstring(archive.read("xl/_rels/workbook.xml.rels"))}
        result = {"file": path.name, "sha256": hashlib.sha256(path.read_bytes()).hexdigest(), "sheets": []}
        for sheet in sheets:
            rid = sheet.attrib["{http://schemas.openxmlformats.org/officeDocument/2006/relationships}id"]
            target = relationships[rid]
            target = target.lstrip("/") if target.startswith("/") else "xl/" + target
            tree = ET.fromstring(archive.read(target))
            cells = {}
            formulas = {}
            for c in tree.findall("s:sheetData/s:row/s:c", NS):
                value = c.find("s:v", NS)
                typ = c.attrib.get("t")
                if typ == "s":
                    value = strings[int(value.text)] if value is not None else None
                elif typ == "inlineStr":
                    value = "".join(c.find("s:is", NS).itertext())
                else:
                    value = value.text if value is not None else None
                cells[c.attrib["r"]] = value
                formula = c.find("s:f", NS)
                if formula is not None:
                    formulas[c.attrib["r"]] = formula.text
            result["sheets"].append({"name": sheet.attrib["name"], "state": sheet.attrib.get("state", "visible"), "range": tree.find("s:dimension", NS).attrib["ref"], "cells": cells, "formulas": formulas})
    result["image"] = [{"file": p.name, "sha256": hashlib.sha256(p.read_bytes()).hexdigest()} for p in ROOT.glob("*.jpeg")]
    output = ROOT / "docs" / "evidence" / "input_extract.json"
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding="utf-8")
    return result


if __name__ == "__main__":
    result = inspect()
    for sheet in result["sheets"]:
        print("SHEET:", sheet["name"], sheet["range"], "FORMULAS:", sheet["formulas"])
        for address, value in sheet["cells"].items():
            if value is not None:
                print(f"{address}: {value}")
