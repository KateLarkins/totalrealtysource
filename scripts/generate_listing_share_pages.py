#!/usr/bin/env python3
"""Generate crawlable social-preview pages for active cards in forsale.html."""

from html import escape, unescape
from pathlib import Path
from urllib.parse import quote
import re

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "forsale.html"
OUTPUT = ROOT / "listing-share"
SITE = "https://totalrealtysource.com"


def clean(value: str) -> str:
    value = re.sub(r"<br\s*/?>", ", ", value, flags=re.I)
    value = re.sub(r"<[^>]+>", " ", value)
    value = unescape(value)
    value = value.replace("—", ",").replace("–", " to ")
    return re.sub(r"\s+", " ", value).strip(" ,")


def first(pattern: str, source: str, default: str = "") -> str:
    match = re.search(pattern, source, flags=re.I | re.S)
    return clean(match.group(1)) if match else default


def slugify(value: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", clean(value).lower()).strip("-")


def sentence(address: str, card: str, modal: str) -> str:
    stats = {}
    for value, label in re.findall(r"<div[^>]*>\s*<strong[^>]*>(.*?)</strong>\s*<span[^>]*>(.*?)</span>", card, flags=re.I | re.S):
        stats[clean(label).lower()] = clean(value)
    type_value = first(r"<strong>\s*Type:\s*</strong>\s*([^<]+)", modal, "Property")
    features = []
    for value in re.findall(r"<li[^>]*>\s*<strong>[^<]+:</strong>\s*([^<]+)</li>", modal, flags=re.I | re.S):
        for item in clean(value).split(";"):
            item = item.strip()
            if item and item.lower() not in {"n/a", "none", "no"} and item not in features:
                features.append(item)
            if len(features) == 3:
                break
        if len(features) == 3:
            break
    details = []
    for key, label in (("beds", "bedrooms"), ("baths", "bathrooms"), ("sq.ft.", "square feet"), ("sqft", "square feet")):
        if stats.get(key) and not any(label in item for item in details):
            details.append(f"{stats[key]} {label}")
    detail_text = f" with {', '.join(details)}" if details else ""
    amenity_text = f" and features {', '.join(features)}" if features and details else f" featuring {', '.join(features)}" if features else ""
    result = f"{address} is a {type_value}{detail_text}{amenity_text}."
    return re.sub(r"\s+", " ", result).replace("..", ".")


def main() -> None:
    html = SOURCE.read_text(encoding="utf-8")
    OUTPUT.mkdir(exist_ok=True)
    cards = list(re.finditer(r'<div class="card"(?P<attrs>[^>]*)data-modal="(?P<modal>[^"]+)"[^>]*>', html, flags=re.I))
    generated = 0
    slug_counts = {}
    for index, match in enumerate(cards):
        modal_id = match.group("modal")
        card_end = html.find(f'<div id="{modal_id}"', match.end())
        if card_end < 0:
            continue
        card = html[match.start():card_end]
        next_card = cards[index + 1].start() if index + 1 < len(cards) else len(html)
        modal = html[card_end:next_card]
        card_address = first(r'<p class="address"[^>]*>(.*?)</p>', card, "Property listing")
        address = first(r"<h2[^>]*>(.*?)</h2>", modal) or card_address
        price = first(r'<p class="price"[^>]*>(.*?)</p>', card, "Price available on listing")
        image = first(r'<img[^>]+class="slide"[^>]+src="([^"]+)"', modal) or first(r'<img[^>]+src="([^"]+)"', card)
        if image and not re.match(r"https?://", image, flags=re.I):
            image = f"{SITE}/{quote(image, safe='/')}"
        image_path = image.lower().split("?", 1)[0]
        image_type = "image/png" if image_path.endswith(".png") else "image/webp" if image_path.endswith(".webp") else "image/jpeg"
        description = sentence(address, card, modal)
        base_slug = slugify(card_address)
        slug_counts[base_slug] = slug_counts.get(base_slug, 0) + 1
        address_slug = base_slug if slug_counts[base_slug] == 1 else f"{base_slug}-{slug_counts[base_slug]}"
        canonical = f"{SITE}/listing-share/{quote(address_slug)}.html"
        destination = f"{SITE}/forsale.html?listing={quote(address_slug)}"
        page = f'''<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="robots" content="noindex,follow">
  <title>{escape(address)} | Total Realty Source</title>
  <meta name="description" content="{escape(description, quote=True)}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Total Realty Source">
  <meta property="og:title" content="{escape(address, quote=True)}">
  <meta property="og:description" content="{escape(price + '. ' + description, quote=True)}">
  <meta property="og:image" content="{escape(image, quote=True)}">
  <meta property="og:image:secure_url" content="{escape(image, quote=True)}">
  <meta property="og:image:type" content="{image_type}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="{escape(address, quote=True)}">
  <meta property="og:url" content="{escape(canonical, quote=True)}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="{escape(address, quote=True)}">
  <meta name="twitter:description" content="{escape(price + '. ' + description, quote=True)}">
  <meta name="twitter:image" content="{escape(image, quote=True)}">
  <link rel="canonical" href="{escape(canonical, quote=True)}">
  <meta http-equiv="refresh" content="0;url={escape(destination, quote=True)}">
</head>
<body>
  <p>Opening <a href="{escape(destination, quote=True)}">{escape(address)}</a>.</p>
  <script>location.replace({destination!r});</script>
</body>
</html>
'''
        (OUTPUT / f"{address_slug}.html").write_text(page, encoding="utf-8")
        # Retain the former internal-name URL as an invisible compatibility redirect.
        (OUTPUT / f"{modal_id}.html").write_text(page, encoding="utf-8")
        generated += 1
    print(f"Generated {generated} listing share pages in {OUTPUT}")


if __name__ == "__main__":
    main()
