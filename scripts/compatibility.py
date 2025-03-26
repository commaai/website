#!/usr/bin/env python3
from collections import defaultdict
from pathlib import Path
import json
from opendbc.car.docs import generate_cars_md, get_all_car_docs
from opendbc.car.docs_definitions import BaseCarHarness, CarHarness

WEB4_DIR = Path(__file__).parent.parent
CAR_HARNESSES_JSON = WEB4_DIR / "src/lib/constants/car-harnesses.json"
TEMPLATES = ((WEB4_DIR / "templates/vehicles_template.json", WEB4_DIR / "src/lib/vehicles.json"),
             (WEB4_DIR / "templates/harness-parts_template.html", WEB4_DIR / "src/lib/harness-parts.html"))


def format_human_list(names: list[str]) -> str:
  names = sorted(names)
  return names[0] if len(names) == 1 else ", and ".join([", ".join(names[:-1]), names[-1]]) if len(names) > 1 else ""


if __name__ == "__main__":
  all_car_docs = get_all_car_docs()

  shop_harness_product_names = [product["title"] for product in json.loads(CAR_HARNESSES_JSON.read_text())]
  base_harness_parts = {part.value.name for part in BaseCarHarness("").parts} | {"harness connector"}
  standard_harness_parts = sorted(base_harness_parts, key=str.casefold)

  non_standard_harness_groups = defaultdict(list)
  for harness in CarHarness:
    product_name = harness.value.name[:-len(" connector")]
    if product_name not in shop_harness_product_names: continue
    parts = {part.value.name for part in harness.value.parts}
    if harness.value.has_connector:
      parts |= {"harness connector"}
    if parts == base_harness_parts: continue
    non_standard_harness_groups[frozenset(parts)].append(product_name)

  non_standard_harnesses = dict(sorted({
    format_human_list(names): sorted(parts, key=str.casefold)
    for parts, names in non_standard_harness_groups.items()
  }.items()))

  for template_path, out_path in TEMPLATES:
    content = generate_cars_md(all_car_docs, template_path, standard_harness_parts=standard_harness_parts,
                               non_standard_harnesses=non_standard_harnesses)
    out_path.write_text(content)
    print(f"Generated and written to {out_path}")
