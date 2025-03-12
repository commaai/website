#!/usr/bin/env python3
import os
from opendbc.car.docs import generate_cars_md, get_all_car_docs

WEB4_DIR = os.path.abspath(os.path.join(os.path.dirname(os.path.realpath(__file__)), ".."))
VEHICLES_OUT_FILE = os.path.join(WEB4_DIR, "src/lib/vehicles.json")
HARNESS_PARTS_OUT_FILE = os.path.join(WEB4_DIR, "static/harness-parts.html")

if __name__ == '__main__':
  for out_file, template_file in ((VEHICLES_OUT_FILE, "templates/vehicles_template.json"),
                                  (HARNESS_PARTS_OUT_FILE, "templates/harness-parts_template.html")):
    content = generate_cars_md(get_all_car_docs(), os.path.join(WEB4_DIR, template_file))
    with open(out_file, "w") as f:
      f.write(content)
    print(f"Generated and written to {out_file}")
