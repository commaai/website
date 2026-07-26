#!/usr/bin/env python3
from pathlib import Path
from datetime import datetime
import json

import jinja2

from opendbc.car.docs import get_all_car_docs, get_all_footnotes, group_by_make
from opendbc.car.docs_definitions import BaseCarHarness, Column, Device, ExtraCarsColumn, PartType, SupportType

WEB4_DIR = Path(__file__).parent.parent
TEMPLATES = ((WEB4_DIR / "templates/vehicles_template.json", WEB4_DIR / "src/lib/vehicles.json"),
             (WEB4_DIR / "templates/harness-parts_template.html", WEB4_DIR / "static/harness-parts.html"))
DATE_FILE = WEB4_DIR / "src/lib/compatibility-meta.json"


def render_template(all_car_docs, template_path: Path) -> str:
  template = jinja2.Template(template_path.read_text(), trim_blocks=True, lstrip_blocks=True)
  footnotes = [fn.value.text for fn in get_all_footnotes()]
  return template.render(all_car_docs=all_car_docs, PartType=PartType,
                         group_by_make=group_by_make, footnotes=footnotes,
                         Device=Device, Column=Column, ExtraCarsColumn=ExtraCarsColumn,
                         BaseCarHarness=BaseCarHarness, SupportType=SupportType)


if __name__ == "__main__":
  all_car_docs = get_all_car_docs()

  for template_path, out_path in TEMPLATES:
    content = render_template(all_car_docs, template_path)
    out_path.write_text(content)
    print(f"Generated and written to {out_path}")

  last_updated = datetime.utcnow().strftime("%B %d, %Y").replace(" 0", " ")
  DATE_FILE.write_text(json.dumps({"last_updated": last_updated}, indent=2))
  print(f"Updated last updated date to {last_updated}")
