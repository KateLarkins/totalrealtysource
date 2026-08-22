#!/usr/bin/env python3
"""Generate social-preview bridge pages for Total Realty Source agent profiles."""

from html import escape
from pathlib import Path
from urllib.parse import quote

ROOT = Path(__file__).resolve().parents[1]
SITE = "https://totalrealtysource.com"

AGENTS = {
    "lynda-climer": ("Lynda Climer", "Untitled design-10/5.png"),
    "brandie-bassett": ("Brandie Bassett", "Untitled design-10/7.png"),
    "jackie-david": ("Jackie David", "Untitled design-10/8.png"),
    "ashley-mcmillan": ("Ashley McMillan", "Untitled design-10/2ashley.png"),
    "lisa-ballinger": ("Lisa Ballinger", "Untitled design-10/6.png"),
    "tammy-jones": ("Tammy Jones", "Untitled design-10/3tammy.png"),
    "laura-burke": ("Laura Burke", "Untitled design-10/4.png"),
}


def main():
    output = ROOT / "agent-share"
    output.mkdir(exist_ok=True)
    for slug, (name, photo) in AGENTS.items():
        share_url = f"{SITE}/agent-share/{slug}.html"
        profile_url = f"{SITE}/agent-profile.html?agent={slug}"
        image_url = f"{SITE}/{quote(photo, safe='/')}"
        title = f"REALTOR® {name} | Total Realty Source"
        description = f"Meet REALTOR® {name}, serving buyers and sellers with Total Realty Source across West Tennessee."
        page = f'''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,follow"><title>{escape(title)}</title><meta name="description" content="{escape(description)}"><meta property="og:type" content="profile"><meta property="og:site_name" content="Total Realty Source"><meta property="og:title" content="{escape(title)}"><meta property="og:description" content="{escape(description)}"><meta property="og:image" content="{escape(image_url)}"><meta property="og:image:alt" content="Headshot of REALTOR® {escape(name)}"><meta property="og:url" content="{escape(share_url)}"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="{escape(title)}"><meta name="twitter:description" content="{escape(description)}"><meta name="twitter:image" content="{escape(image_url)}"><link rel="canonical" href="{escape(profile_url)}"><meta http-equiv="refresh" content="0;url={escape(profile_url)}"></head><body><p>Opening <a href="{escape(profile_url)}">REALTOR® {escape(name)}'s profile</a>…</p><script>location.replace({profile_url!r});</script></body></html>'''
        (output / f"{slug}.html").write_text(page, encoding="utf-8")
    print(f"Generated {len(AGENTS)} agent share pages.")


if __name__ == "__main__":
    main()
