#!/usr/bin/env python3
import os
import jinja2
import json
from opendbc.car.docs import get_all_car_docs, get_all_footnotes, group_by_make
from opendbc.car.docs_definitions import BaseCarHarness, CarDocs, CarHarness, Column, Device, ExtraCarsColumn, PartType, SupportType

WEB4_DIR = os.path.abspath(os.path.join(os.path.dirname(os.path.realpath(__file__)), ".."))
CAR_HARNESSES_JSON = os.path.join(WEB4_DIR, "src/lib/constants/car-harnesses.json")

TEMPLATES = (("vehicles_template.json", "src/lib/vehicles.json"),
             ("harness-parts_template.html", "static/harness-parts.html"),
             ("non-standard-harness-parts_template.html", "src/lib/non-standard-harness-parts.html"),
             ("standard-harness-parts_template.html", "src/lib/standard-harness-parts.html"))

def generate_cars_md(all_car_docs: list[CarDocs], template_fn: str) -> str:
  with open(template_fn) as f:
    template = jinja2.Template(f.read(), trim_blocks=True, lstrip_blocks=True)

  upstream_car_docs = [car for car in all_car_docs if car.support_type == SupportType.UPSTREAM]

  base_harness_parts = frozenset({ part.value.name for part in BaseCarHarness("").parts })
  standard_harness_parts = [*base_harness_parts, "harness connector"]

  with open(CAR_HARNESSES_JSON) as f:
    shop_car_harness_names = [product["title"] for product in json.load(f)]

  # group harnesses with identical part lists
  non_standard_harness_parts = {}
  for harness in CarHarness:
    if harness.value.name.replace(" connector", "") not in shop_car_harness_names:
      print("skipping not in shop", harness)
      continue
    parts = frozenset({ part.value.name for part in harness.value.parts })
    if base_harness_parts == parts: continue
    if harness.value.has_connector:
      parts = frozenset({ *parts, "harness connector" })
    if parts not in non_standard_harness_parts:
      non_standard_harness_parts[parts] = set()
    non_standard_harness_parts[parts].add(harness)

  non_standard_harness_parts_by_name = {}
  for parts, harnesses in non_standard_harness_parts.items():
    # use actual connector name when this group is a single harness
    if len(harnesses) == 1:
      for harness in harnesses: break
      parts = [part for part in parts if part != "harness connector"] + [harness.value.name]

    # build group title
    harness_names = sorted((harness.value.name.replace(" connector", "") for harness in harnesses), reverse=True)
    name = harness_names.pop()
    while len(harness_names) > 1:
      name = "{}, {}".format(name, harness_names.pop())
    if len(harness_names) == 1:
      name = "{} and {}".format(name, harness_names.pop())
    non_standard_harness_parts_by_name[name] = sorted(parts, key=str.casefold)

  footnotes = [fn.value.text for fn in get_all_footnotes()]

  return template.render(all_car_docs=all_car_docs, PartType=PartType,
                         group_by_make=group_by_make, footnotes=footnotes,
                         non_standard_harness_parts=non_standard_harness_parts_by_name,
                         standard_harness_parts=standard_harness_parts,
                         Device=Device, Column=Column, ExtraCarsColumn=ExtraCarsColumn,
                         BaseCarHarness=BaseCarHarness, upstream_car_docs=upstream_car_docs)

if __name__ == '__main__':
  for template_file, out_file in TEMPLATES:
    content = generate_cars_md(get_all_car_docs(), os.path.join(WEB4_DIR, "templates", template_file))
    with open(os.path.join(WEB4_DIR, out_file), "w") as f:
      f.write(content)
    print(f"Generated and written to {out_file}")
