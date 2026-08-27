#!/bin/bash
set -euo pipefail

if [[ $# -ne 1 ]]; then
  echo "Usage: bash scripts/run_manual_mls_update.sh /absolute/path/to/textexport.csv" >&2
  exit 2
fi

project_dir="$(cd "$(dirname "$0")/.." && pwd)"
runtime_node="/Users/katharinelarkins/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node"
cd "$project_dir"

if [[ ! -x "$runtime_node" ]]; then
  runtime_node="$(command -v node || true)"
fi
if [[ -z "$runtime_node" ]]; then
  echo "Node.js runtime was not found." >&2
  exit 1
fi

"$runtime_node" scripts/update_listing_cards_from_export.mjs "$1" forsale.html
python3 scripts/generate_listing_share_pages.py
python3 scripts/generate_seo_pages.py

python3 - <<'PY'
import re
from pathlib import Path
s = Path('forsale.html').read_text()
cards = re.findall(r'<div class="card"[^>]*data-mls="(\d+)"', s)
if len(cards) != len(set(cards)):
    raise SystemExit('Duplicate displayed MLS identifiers found; review before publishing.')
if re.search(r'<p class="price"></p>|</p>\d', s):
    raise SystemExit('Broken price markup found; review before publishing.')
print(f'Validated {len(cards)} unique displayed listings and regenerated listing/SEO pages.')
PY
