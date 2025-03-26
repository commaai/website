#!/usr/bin/env python3
from pathlib import Path
from opendbc.car.docs import generate_cars_md, get_all_car_docs

WEB4_DIR = Path(__file__).parent.parent
TEMPLATES = ((WEB4_DIR / "templates/vehicles_template.json", WEB4_DIR / "src/lib/vehicles.json"),
             (WEB4_DIR / "templates/harness-parts_template.html", WEB4_DIR / "static/harness-parts.html"))

if __name__ == "__main__":
  all_car_docs = get_all_car_docs()

  for template_path, out_path in TEMPLATES:
    content = generate_cars_md(all_car_docs, template_path)
    out_path.write_text(content)
    print(f"Generated and written to {out_path}")
