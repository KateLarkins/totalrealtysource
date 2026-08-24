#!/usr/bin/env python3
"""Generate scalable city pages, permanent listing pages, and the XML sitemap."""

from datetime import date
from html import escape, unescape
from pathlib import Path
from urllib.parse import quote
import json
import re
import shutil

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "forsale.html"
SITE = "https://totalrealtysource.com"


def clean(value):
    value = re.sub(r"<br\s*/?>", ", ", str(value or ""), flags=re.I)
    value = re.sub(r"<[^>]+>", " ", value)
    return re.sub(r"\s+", " ", unescape(value)).strip(" ,")


def first(pattern, source, default=""):
    match = re.search(pattern, source, flags=re.I | re.S)
    return clean(match.group(1)) if match else default


def slugify(value):
    return re.sub(r"[^a-z0-9]+", "-", clean(value).lower()).strip("-")


def absolute_image(value):
    if re.match(r"https?://", value, flags=re.I):
        return value
    parts = Path(value).parts
    current = ROOT
    corrected = []
    for part in parts:
        if current.exists():
            actual = next((entry.name for entry in current.iterdir() if entry.name.casefold() == part.casefold()), part)
        else:
            actual = part
        corrected.append(actual)
        current /= actual
    return f"{SITE}/{quote('/'.join(corrected), safe='/')}"


def consecutive_slides(source):
    """Read only the first uninterrupted carousel image run."""
    first_slide = re.search(r'<img[^>]+class="slide"[^>]+src="([^"]+)"[^>]*>', source, flags=re.I)
    if not first_slide:
        return []
    images = [clean(first_slide.group(1))]
    cursor = first_slide.end()
    while True:
        following = re.match(r'\s*<img[^>]+class="slide"[^>]+src="([^"]+)"[^>]*>', source[cursor:], flags=re.I)
        if not following:
            break
        images.append(clean(following.group(1)))
        cursor += following.end()
    return images


def parse_listings():
    html = SOURCE.read_text(encoding="utf-8")
    cards = list(re.finditer(r'<div class="card"(?P<attrs>[^>]*)data-modal="(?P<modal>[^"]+)"[^>]*>', html, flags=re.I))
    listings = []
    used_slugs = set()
    for index, match in enumerate(cards):
        modal_id = match.group("modal")
        modal_start = html.find(f'<div id="{modal_id}"', match.end())
        if modal_start < 0:
            continue
        next_card = cards[index + 1].start() if index + 1 < len(cards) else len(html)
        card = html[match.start():modal_start]
        modal = html[modal_start:next_card]
        attrs = match.group("attrs")
        address = first(r"<h2[^>]*>(.*?)</h2>", modal) or first(r'<p class="address"[^>]*>(.*?)</p>', card, "Property listing")
        city_match = re.search(r",\s*([^,]+),\s*TN\s*(\d{5}(?:-\d{4})?)?", address, flags=re.I)
        if city_match:
            city, zipcode = clean(city_match.group(1)), clean(city_match.group(2))
        else:
            card_address = first(r'<p class="address"[^>]*>(.*?)</p>', card)
            parts = [part.strip() for part in card_address.split(",")]
            city = parts[1].replace("TN", "").strip() if len(parts) > 1 else "West Tennessee"
            zipcode = ""
        price = first(r'<p class="price"[^>]*>(.*?)</p>', card, "Contact for price")
        stats = {}
        for value, label in re.findall(r'<div[^>]*>\s*<strong[^>]*>(.*?)</strong>\s*<span[^>]*>(.*?)</span>', card, flags=re.I | re.S):
            stats[clean(label).lower().replace(".", "")] = clean(value)
        property_type = first(r"<strong>\s*Type:\s*</strong>\s*([^<]+)", modal, "Property")
        description = first(r"Property Description\s*</h3>\s*<p[^>]*>(.*?)</p>", modal)
        description = re.sub(r"Information deemed reliable[\s\S]*$", "", description, flags=re.I).strip()
        if not description:
            description = f"Explore this {property_type.lower()} for sale in {city}, Tennessee. Contact Total Realty Source for complete property details and showing information."
        images = consecutive_slides(modal)
        if not images:
            image = first(r'<img[^>]+src="([^"]+)"', card)
            images = [image] if image else []
        agent = first(r'<strong[^>]*data-agent-name[^>]*>(.*?)</strong>', modal, "Total Realty Source")
        lat = first(r'data-lat="([^"]+)"', match.group(0))
        lng = first(r'data-lng="([^"]+)"', match.group(0))
        category = first(r'data-map-category="([^"]+)"', match.group(0), "other")
        street = address.split(",")[0].strip()
        base_slug = slugify(f"{street}-{city}-tn")
        slug = base_slug
        if slug in used_slugs:
            unique_hint = first(r"MLS\s*#?:?\s*</?[^>]*>?\s*([A-Z0-9-]+)", modal) or modal_id
            slug = f"{base_slug}-{slugify(unique_hint)}"
            sequence = 2
            while slug in used_slugs:
                slug = f"{base_slug}-{slugify(unique_hint)}-{sequence}"
                sequence += 1
        used_slugs.add(slug)
        listings.append({
            "modal": modal_id, "address": address, "street": street, "city": city, "zip": zipcode,
            "price": price, "beds": stats.get("beds", ""), "baths": stats.get("baths", ""),
            "sqft": stats.get("sqft", stats.get("sqft", "")), "type": property_type,
            "description": description, "images": images, "agent": agent, "lat": lat, "lng": lng,
            "category": category, "slug": slug,
        })
    return listings


def site_header(prefix=""):
    return f'''<header class="site-header"><a href="{prefix}index.html"><img src="{prefix}logo.png/horizontallogo.png" alt="Total Realty Source"></a><nav aria-label="Primary"><a href="{prefix}index.html">Home</a><a href="{prefix}forsale.html">For Sale</a><a href="{prefix}events.html">Events</a><a href="{prefix}about.html">Our Team</a><a href="{prefix}contact.html">Contact</a></nav></header>'''


def site_footer(prefix=""):
    return f'''<footer><strong>Total Realty Source</strong><span>117 South Main Street, Medina, TN 38355</span><a href="tel:17315749340">731-574-9340</a><a href="{prefix}contact.html">Contact our team</a><a href="{prefix}jackson-tn/north-jackson/">North Jackson homes</a><a href="{prefix}jackson-tn/midtown/">Midtown Jackson real estate</a><a href="{prefix}jackson-tn/homes-with-land/">Jackson homes with land</a><a href="{prefix}jackson-tn/under-300k/">Jackson homes under $300K</a></footer>'''


CSS = '''*{box-sizing:border-box}body{margin:0;color:#17212a;background:#f7f8f8;font-family:Lora,Georgia,serif}.site-header{display:flex;align-items:center;justify-content:space-between;gap:30px;padding:16px max(5vw,24px);background:#fff;border-bottom:1px solid #d9dfe3}.site-header img{width:230px;max-width:55vw;height:auto}.site-header nav{display:flex;flex-wrap:wrap;gap:20px}.site-header a,footer a{color:#0b4068}.shell{max-width:1220px;margin:auto;padding:48px 24px 80px}.crumbs{margin-bottom:25px;font-size:13px}.crumbs a{color:#0b4068}h1,h2,h3{font-family:"Bodoni Moda",Georgia,serif}h1{font-size:clamp(38px,6vw,64px);line-height:1.05;margin:0 0 18px}.intro,.seo-copy{max-width:820px;font-size:17px;line-height:1.75}.seo-copy{margin:24px 0}.listing-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:22px;margin-top:35px}.listing-card{overflow:hidden;color:#17212a;background:#fff;border:1px solid #d8dee2;border-radius:8px;text-decoration:none}.listing-card img{display:block;width:100%;height:220px;object-fit:cover}.listing-card div{padding:17px}.listing-card strong,.listing-card span{display:block}.listing-card strong{font-size:19px}.listing-card span{margin-top:6px;font-size:13px}.category-links,.nearby{display:flex;flex-wrap:wrap;gap:10px;margin:24px 0}.category-links a,.nearby a,.cta{display:inline-flex;padding:10px 14px;color:#fff;background:#0b4068;border-radius:5px;text-decoration:none}.listing-hero{display:grid;grid-template-columns:1.4fr .8fr;gap:28px}.gallery{display:grid;grid-template-columns:2fr 1fr;gap:8px}.gallery img{width:100%;height:220px;object-fit:cover;border-radius:6px}.gallery img:first-child{grid-row:span 2;height:448px}.listing-summary{padding:28px;background:#fff;border:1px solid #d8dee2;border-radius:8px}.price{font-size:32px;font-weight:700}.facts{display:flex;flex-wrap:wrap;gap:18px;padding:18px 0;border-block:1px solid #d8dee2}.content-grid{display:grid;grid-template-columns:1fr 330px;gap:30px;margin-top:35px}.description{font-size:16px;line-height:1.8}.contact-card{align-self:start;padding:25px;background:#fff;border:1px solid #d8dee2;border-radius:8px}.map{width:100%;height:360px;border:0;border-radius:8px}footer{display:flex;flex-wrap:wrap;justify-content:center;gap:18px 22px;padding:35px;color:#fff;background:#023e6c}footer a{color:#fff}@media(max-width:850px){.listing-grid{grid-template-columns:1fr 1fr}.listing-hero,.content-grid{grid-template-columns:1fr}}@media(max-width:560px){.site-header{align-items:flex-start;flex-direction:column}.listing-grid{grid-template-columns:1fr}.gallery{display:block}.gallery img,.gallery img:first-child{height:260px;margin-bottom:8px}}'''


def card(listing, prefix="../../"):
    image = absolute_image(listing["images"][0]) if listing["images"] else f"{SITE}/logo.png/logocircle.png"
    details = " · ".join(value for value in [f'{listing["beds"]} beds' if listing["beds"] else "", f'{listing["baths"]} baths' if listing["baths"] else "", f'{listing["sqft"]} sqft' if listing["sqft"] else ""] if value)
    return f'''<a class="listing-card" href="{prefix}listings/{listing['slug']}/"><img loading="lazy" width="640" height="420" src="{escape(image)}" alt="Front exterior of {escape(listing['street'])} in {escape(listing['city'])}, Tennessee"><div><strong>{escape(listing['price'])}</strong><span>{escape(listing['address'])}</span><span>{escape(details or listing['type'])}</span></div></a>'''


def write_city_pages(listings):
    cities = sorted({item["city"] for item in listings if item["city"] and item["city"] != "West Tennessee"})
    for city in cities:
        city_slug = f"{slugify(city)}-tn"
        folder = ROOT / "homes-for-sale" / city_slug
        folder.mkdir(parents=True, exist_ok=True)
        local = [item for item in listings if item["city"].lower() == city.lower()]
        nearby = [other for other in cities if other != city][:6]
        categories = sorted({item["category"] for item in local})
        canonical = f"{SITE}/homes-for-sale/{city_slug}/"
        title = f"Homes for Sale in {city}, TN | Total Realty Source"
        description = f"Browse current homes, land, and real estate for sale in {city}, Tennessee. View local listings and connect with Total Realty Source."
        breadcrumb = {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":SITE},{"@type":"ListItem","position":2,"name":"Homes for Sale","item":f"{SITE}/forsale.html"},{"@type":"ListItem","position":3,"name":f"{city}, TN","item":canonical}]}
        item_list = {"@context":"https://schema.org","@type":"ItemList","name":f"Current real estate listings in {city}, Tennessee","numberOfItems":len(local),"itemListElement":[{"@type":"ListItem","position":position,"url":f"{SITE}/listings/{item['slug']}/","name":item["address"]} for position,item in enumerate(local,1)]}
        page = f'''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>{escape(title)}</title><meta name="description" content="{escape(description)}"><link rel="canonical" href="{canonical}"><link rel="preconnect" href="https://fonts.googleapis.com"><link href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:wght@500;700&family=Lora:wght@400;600;700&display=swap" rel="stylesheet"><style>{CSS}</style><script type="application/ld+json">{json.dumps([breadcrumb,item_list])}</script></head><body>{site_header('../../')}<main class="shell"><nav class="crumbs"><a href="../../index.html">Home</a> / <a href="../../forsale.html">Homes for Sale</a> / {escape(city)}, TN</nav><h1>Homes for Sale in {escape(city)}, Tennessee</h1><p class="intro">Explore current real estate opportunities in {escape(city)} and across West Tennessee. Total Realty Source helps buyers compare local homes, land, and other property types with experienced guidance from search through closing.</p><div class="category-links">{''.join(f'<a href="#{escape(category)}">{escape(category.title())}</a>' for category in categories)}</div><h2>Current {escape(city)} listings</h2><div class="listing-grid">{''.join(card(item) for item in local) or '<p>No active properties are displayed in this city right now.</p>'}</div><h2>Explore nearby West Tennessee markets</h2><div class="nearby">{''.join(f'<a href="../{slugify(other)}-tn/">{escape(other)} homes for sale</a>' for other in nearby)}</div></main>{site_footer('../../')}</body></html>'''
        (folder / "index.html").write_text(page, encoding="utf-8")
    return cities


def numeric_price(value):
    try:
        return float(re.sub(r"[^0-9.]", "", value))
    except ValueError:
        return 0


def write_jackson_specialty_pages(listings):
    jackson = [item for item in listings if item["city"].lower() == "jackson"]
    pages = [
        ("north-jackson", "Homes for Sale in North Jackson, TN", "Explore current residential properties in Jackson's 38305 market and connect with a local Total Realty Source agent for neighborhood-specific guidance.", lambda item: item["zip"].startswith("38305") and item["category"] == "homes"),
        ("midtown", "Midtown Jackson, TN Real Estate", "Explore current residential opportunities in Jackson's 38301 market. A local agent can confirm whether a property is within your preferred Midtown area.", lambda item: item["zip"].startswith("38301") and item["category"] == "homes"),
        ("homes-with-land", "Jackson, TN Homes with Land and Acreage", "Browse Jackson-area homes whose current listing descriptions reference acreage, land, or larger lots.", lambda item: item["category"] == "homes" and re.search(r"\b(acre|acres|acreage|land|large lot)\b", item["description"], re.I)),
        ("new-construction", "New Construction Homes in Jackson, TN", "Review current Jackson listings that reference new construction or newly built homes, plus connect with a local agent about upcoming inventory.", lambda item: item["category"] == "homes" and re.search(r"\b(new construction|newly built|brand new)\b", item["description"], re.I)),
        ("under-300k", "Homes for Sale in Jackson, TN Under $300K", "Browse current Jackson homes priced below $300,000. Prices and availability are refreshed with the active listing workflow.", lambda item: item["category"] == "homes" and 0 < numeric_price(item["price"]) < 300000),
        ("luxury", "Luxury Properties in Jackson, TN", "Explore current Jackson properties priced at $500,000 and above, including distinctive homes, acreage, and investment opportunities.", lambda item: numeric_price(item["price"]) >= 500000),
    ]
    links = ''.join(f'<a href="../{slug}/">{escape(title)}</a>' for slug,title,_,_ in pages)
    urls = []
    for slug,title,description,matcher in pages:
        matches = [item for item in jackson if matcher(item)]
        canonical = f"{SITE}/jackson-tn/{slug}/"
        folder = ROOT / "jackson-tn" / slug
        folder.mkdir(parents=True, exist_ok=True)
        breadcrumb = {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":SITE},{"@type":"ListItem","position":2,"name":"Jackson homes for sale","item":f"{SITE}/homes-for-sale/jackson-tn/"},{"@type":"ListItem","position":3,"name":title,"item":canonical}]}
        item_list = {"@context":"https://schema.org","@type":"ItemList","name":title,"numberOfItems":len(matches),"itemListElement":[{"@type":"ListItem","position":position,"url":f"{SITE}/listings/{item['slug']}/","name":item["address"]} for position,item in enumerate(matches,1)]}
        page = f'''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>{escape(title)} | Total Realty Source</title><meta name="description" content="{escape(description)}"><link rel="canonical" href="{canonical}"><link rel="preconnect" href="https://fonts.googleapis.com"><link href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:wght@500;700&family=Lora:wght@400;600;700&display=swap" rel="stylesheet"><style>{CSS}</style><script type="application/ld+json">{json.dumps([breadcrumb,item_list])}</script></head><body>{site_header('../../')}<main class="shell"><nav class="crumbs"><a href="../../index.html">Home</a> / <a href="../../homes-for-sale/jackson-tn/">Jackson homes for sale</a> / {escape(title)}</nav><h1>{escape(title)}</h1><p class="intro">{escape(description)}</p><p class="seo-copy">Property boundaries, neighborhood names, school zones, prices, and availability should always be confirmed with a local real estate professional. Total Realty Source can help you compare the current options that fit your goals.</p><div class="nearby">{links}</div><h2>Current matching properties</h2><div class="listing-grid">{''.join(card(item) for item in matches) or '<p>No matching active properties are displayed right now. Contact our team for upcoming or recently added options.</p>'}</div><p><a class="cta" href="../../contact.html">Ask a Jackson-area agent</a></p></main>{site_footer('../../')}</body></html>'''
        (folder / "index.html").write_text(page, encoding="utf-8")
        urls.append(canonical)
    return urls


def write_listing_pages(listings):
    by_city = {}
    for item in listings:
        by_city.setdefault(item["city"], []).append(item)
    for item in listings:
        folder = ROOT / "listings" / item["slug"]
        folder.mkdir(parents=True, exist_ok=True)
        canonical = f"{SITE}/listings/{item['slug']}/"
        city_slug = f"{slugify(item['city'])}-tn"
        title = f"{item['street']}, {item['city']} TN | {item['type']} for Sale"
        meta = f"{item['price']} {item['type'].lower()} for sale at {item['address']}. View photos, property details, map, and listing agent information."
        image_urls = [absolute_image(image) for image in item["images"]]
        property_schema = {"@context":"https://schema.org","@type":"SingleFamilyResidence" if item["category"] == "homes" else "Residence" if item["category"] == "other" else "Place","name":item["address"],"description":item["description"],"url":canonical,"image":image_urls,"address":{"@type":"PostalAddress","streetAddress":item["street"],"addressLocality":item["city"],"addressRegion":"TN","postalCode":item["zip"],"addressCountry":"US"},"offers":{"@type":"Offer","priceCurrency":"USD","price":re.sub(r"[^0-9.]", "", item["price"]),"availability":"https://schema.org/InStock"},"broker":{"@type":"RealEstateAgent","name":item["agent"],"worksFor":{"@type":"RealEstateAgent","name":"Total Realty Source","telephone":"+1-731-574-9340","url":SITE}}}
        if item["beds"]: property_schema["numberOfBedrooms"] = item["beds"]
        if item["baths"]: property_schema["numberOfBathroomsTotal"] = item["baths"]
        if item["sqft"]: property_schema["floorSize"] = {"@type":"QuantitativeValue","value":item["sqft"],"unitCode":"FTK"}
        breadcrumb = {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":SITE},{"@type":"ListItem","position":2,"name":f"{item['city']} homes for sale","item":f"{SITE}/homes-for-sale/{city_slug}/"},{"@type":"ListItem","position":3,"name":item["street"],"item":canonical}]}
        gallery = ''.join(f'<img {"" if index == 0 else "loading=\"lazy\" "}width="960" height="640" src="{escape(url)}" alt="{escape("Front exterior" if index == 0 else f"Property view {index + 1}")} of {escape(item["street"])} in {escape(item["city"])}, Tennessee">' for index, url in enumerate(image_urls[:5]))
        related = [other for other in by_city.get(item["city"], []) if other["slug"] != item["slug"]][:3]
        map_query = quote(item["address"])
        page = f'''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>{escape(title)}</title><meta name="description" content="{escape(meta)}"><link rel="canonical" href="{canonical}"><meta property="og:type" content="website"><meta property="og:title" content="{escape(title)}"><meta property="og:description" content="{escape(meta)}"><meta property="og:image" content="{escape(image_urls[0] if image_urls else SITE + '/logo.png/logocircle.png')}"><link rel="preconnect" href="https://fonts.googleapis.com"><link href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:wght@500;700&family=Lora:wght@400;600;700&display=swap" rel="stylesheet"><style>{CSS}</style><script type="application/ld+json">{json.dumps([breadcrumb, property_schema])}</script></head><body>{site_header('../../')}<main class="shell"><nav class="crumbs"><a href="../../index.html">Home</a> / <a href="../../homes-for-sale/{city_slug}/">{escape(item['city'])} homes for sale</a> / {escape(item['street'])}</nav><div class="listing-hero"><div class="gallery">{gallery}</div><section class="listing-summary"><p>For Sale</p><h1>{escape(item['address'])}</h1><p class="price">{escape(item['price'])}</p><div class="facts"><span>{escape(item['beds'] or '—')} beds</span><span>{escape(item['baths'] or '—')} baths</span><span>{escape(item['sqft'] or '—')} sqft</span><span>{escape(item['type'])}</span></div><p>Listed by {escape(item['agent'])}</p><a class="cta" href="../../contact.html?property={quote(item['address'])}">Ask about this property</a></section></div><div class="content-grid"><article><h2>About this property</h2><p class="description">{escape(item['description'])}</p><h2>Location</h2><iframe class="map" title="Map of {escape(item['address'])}" loading="lazy" src="https://www.google.com/maps?q={map_query}&output=embed"></iframe></article><aside class="contact-card"><h2>Schedule a showing</h2><p>Contact Total Realty Source for availability, showing times, and additional listing information.</p><a class="cta" href="tel:17315749340">Call 731-574-9340</a></aside></div><h2>Related {escape(item['city'])} properties</h2><div class="listing-grid">{''.join(card(other) for other in related) or '<p>Browse the city page for more nearby properties.</p>'}</div><p><a href="../../homes-for-sale/{city_slug}/">← Back to homes for sale in {escape(item['city'])}, TN</a></p></main>{site_footer('../../')}</body></html>'''
        (folder / "index.html").write_text(page, encoding="utf-8")


def urlset(urls, today):
    return '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + ''.join(f'  <url><loc>{escape(url)}</loc><lastmod>{today}</lastmod></url>\n' for url in urls) + '</urlset>\n'


def write_robots_and_sitemaps(listings, cities, specialty_urls):
    page_urls = [SITE + "/", SITE + "/forsale.html", SITE + "/about.html", SITE + "/contact.html", SITE + "/events.html", SITE + "/amy-mclemore.html"]
    page_urls += [f"{SITE}/homes-for-sale/{slugify(city)}-tn/" for city in cities]
    page_urls += specialty_urls
    listing_urls = [f"{SITE}/listings/{item['slug']}/" for item in listings]
    today = date.today().isoformat()
    (ROOT / "sitemap-pages.xml").write_text(urlset(page_urls, today), encoding="utf-8")
    (ROOT / "sitemap-listings.xml").write_text(urlset(listing_urls, today), encoding="utf-8")
    image_rows = []
    for item in listings:
        if not item["images"]:
            continue
        page_url = f"{SITE}/listings/{item['slug']}/"
        images = ''.join(f'<image:image><image:loc>{escape(absolute_image(image))}</image:loc><image:title>{escape(item["address"])}</image:title><image:caption>{escape("Property photo of " + item["street"] + " in " + item["city"] + ", Tennessee")}</image:caption></image:image>' for image in item["images"])
        image_rows.append(f'  <url><loc>{escape(page_url)}</loc>{images}</url>\n')
    image_xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n' + ''.join(image_rows) + '</urlset>\n'
    (ROOT / "sitemap-images.xml").write_text(image_xml, encoding="utf-8")
    sitemap_urls = [f"{SITE}/sitemap-pages.xml", f"{SITE}/sitemap-listings.xml", f"{SITE}/sitemap-images.xml"]
    sitemap_index = '<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + ''.join(f'  <sitemap><loc>{url}</loc><lastmod>{today}</lastmod></sitemap>\n' for url in sitemap_urls) + '</sitemapindex>\n'
    (ROOT / "sitemap.xml").write_text(sitemap_index, encoding="utf-8")
    (ROOT / "sitemap_index.xml").write_text(sitemap_index, encoding="utf-8")
    (ROOT / "robots.txt").write_text(f"User-agent: *\nAllow: /\nDisallow: /forsale-closed.html\nSitemap: {SITE}/sitemap_index.xml\n", encoding="utf-8")


def main():
    listings = parse_listings()
    for output in (ROOT / "homes-for-sale", ROOT / "listings"):
        if output.exists():
            shutil.rmtree(output)
    cities = write_city_pages(listings)
    write_listing_pages(listings)
    specialty_urls = write_jackson_specialty_pages(listings)
    write_robots_and_sitemaps(listings, cities, specialty_urls)
    print(f"Generated {len(cities)} city pages, {len(specialty_urls)} Jackson specialty pages, and {len(listings)} permanent listing pages.")


if __name__ == "__main__":
    main()
