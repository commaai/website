#!/usr/bin/env python3
from collections import defaultdict
from pathlib import Path
from datetime import datetime
import json

import jinja2

from opendbc.car.docs import get_all_car_docs, get_all_footnotes
from opendbc.car.docs_definitions import CarDocs, BaseCarHarness, Column, Device, ExtraCarsColumn, PartType, Star, SupportType

WEB4_DIR = Path(__file__).parent.parent
TEMPLATES = ((WEB4_DIR / "templates/vehicles_template.json", WEB4_DIR / "src/lib/vehicles.json"),
             (WEB4_DIR / "templates/harness-parts_template.html", WEB4_DIR / "static/harness-parts.html"))
DATE_FILE = WEB4_DIR / "src/lib/compatibility-meta.json"

# Hand-researched stock driver-assist features per car (from brochures), used to say "adds" vs "upgrades".
# Only the fields below are shipped to the site; confidence/sources/notes stay here.
STOCK_FEATURES = json.loads((WEB4_DIR / "scripts/stock-features.json").read_text())
STOCK_FEATURE_FIELDS = ("lane_centering", "driver_monitoring", "fcw", "dashcam")


def get_stock_features(car_docs: CarDocs) -> dict | None:
  features = STOCK_FEATURES.get(car_docs.name)
  return {field: features[field] for field in STOCK_FEATURE_FIELDS} if features else None


def group_by_make(all_car_docs: list[CarDocs]) -> dict[str, list[CarDocs]]:
  sorted_car_docs = defaultdict(list)
  for car_docs in all_car_docs:
    sorted_car_docs[car_docs.make].append(car_docs)
  return dict(sorted_car_docs)


def render_template(all_car_docs, template_path: Path) -> str:
  template = jinja2.Template(template_path.read_text(), trim_blocks=True, lstrip_blocks=True)
  footnotes = [fn.value.text for fn in get_all_footnotes()]
  return template.render(all_car_docs=all_car_docs, PartType=PartType,
                         group_by_make=group_by_make, footnotes=footnotes,
                         Device=Device, Column=Column, ExtraCarsColumn=ExtraCarsColumn,
                         BaseCarHarness=BaseCarHarness, Star=Star, SupportType=SupportType,
                         get_stock_features=get_stock_features)


if __name__ == "__main__":
  all_car_docs = get_all_car_docs()

  missing = [car.name for car in all_car_docs if car.support_type == SupportType.UPSTREAM and car.make != "comma" and car.name not in STOCK_FEATURES]
  if missing:
    print("WARNING: no stock features in scripts/stock-features.json for:\n  " + "\n  ".join(missing))

  for template_path, out_path in TEMPLATES:
    content = render_template(all_car_docs, template_path)
    out_path.write_text(content)
    print(f"Generated and written to {out_path}")

  last_updated = datetime.utcnow().strftime("%B %d, %Y").replace(" 0", " ")
  DATE_FILE.write_text(json.dumps({"last_updated": last_updated}, indent=2))
  print(f"Updated last updated date to {last_updated}")
