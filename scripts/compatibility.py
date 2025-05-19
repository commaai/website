#!/usr/bin/env python3
from pathlib import Path
from datetime import datetime
import json
from opendbc.car.docs import generate_cars_md, get_all_car_docs

WEB4_DIR = Path(__file__).parent.parent
TEMPLATES = ((WEB4_DIR / "templates/vehicles_template.json", WEB4_DIR / "src/lib/vehicles.json"),
             (WEB4_DIR / "templates/harness-parts_template.html", WEB4_DIR / "static/harness-parts.html"))
DATE_FILE = WEB4_DIR / "src/lib/compatibility-meta.json"

if __name__ == "__main__":
  all_car_docs = get_all_car_docs()

  for template_path, out_path in TEMPLATES:
    content = generate_cars_md(all_car_docs, template_path)
    out_path.write_text(content)
    print(f"Generated and written to {out_path}")

  last_updated = datetime.utcnow().strftime("%B %d, %Y").replace(" 0", " ")
  DATE_FILE.write_text(json.dumps({"last_updated": last_updated}, indent=2))
  print(f"Updated last updated date to {last_updated}")
