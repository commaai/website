#!/usr/bin/env python3
import os
from opendbc.car.docs import generate_cars_md, get_all_car_docs

WEB4_DIR = os.path.abspath(os.path.join(os.path.dirname(os.path.realpath(__file__)), ".."))
OUT_FILE = os.path.join(WEB4_DIR, "src/lib/vehicles.json")

if __name__ == '__main__':
  content = generate_cars_md(get_all_car_docs(), os.path.join(WEB4_DIR, "static/vehicles_template.json"))
  # TODO: remove when we publish web4
  content = content.replace("link-light-new-regular-text", "highlight")
  with open(OUT_FILE, "w") as f:
    f.write(content)
  print(f"Generated and written to {OUT_FILE}")
