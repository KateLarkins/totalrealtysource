# Listing update workflow

When reconciling the website with Flexmls:

1. Add, update, or remove the listing cards in `forsale.html`.
2. Whenever a property has closed, update `homepageListingMetrics.closedListings` in `index.html` to the latest verified Flexmls total. This one value updates both homepage closed-listing displays.
3. Confirm the homepage property count matches the number of active cards. The homepage calculates this automatically; `52` in `index.html` is only the no-network fallback.
4. Open Flexmls office-listing statistics and update `homepage-average-list-price` in `index.html` with the current average List Price.
5. Check the Flexmls Hot Sheet for the previous seven days. When it shows a price reduction, add `data-previous-price="$OLD_PRICE"` and `data-promotion-date="YYYY-MM-DD"` to that listing's `.card`. The website keeps the current price in its normal color and automatically adds a green downward arrow plus the green reduction amount on both the card and modal for seven days.
6. When Flexmls shows an open house, add `data-open-house-start="YYYY-MM-DDTHH:MM:SS-05:00"`, `data-open-house-end="YYYY-MM-DDTHH:MM:SS-05:00"`, and `data-open-house-description="DESCRIPTION"` to that listing's `.card`. Keep `data-agent` set to the listing agent, because that name is displayed as the event host. The listing and modal bubbles remain visible until the ending time, and `events.html` automatically adds the open house to its Open Houses section.
7. Check Total Realty Source's Facebook Events page for future community events. Add verified upcoming events to `MANUAL_EVENTS` in `events.js`; never add Facebook events that have already ended.
8. During every property reconciliation, remove price-promotion attributes older than seven days and remove ended open-house attributes from the HTML. Both the listing page and Events page also suppress ended open houses automatically if cleanup has not happened yet.
9. Before finishing, verify every current open house on its listing card, in its listing modal, and on `events.html`. Confirm the property image is on the left, the description and listing-agent host are on the right, and Today!/Tomorrow labels are correct.
10. Verify that every current property has a readable, color-coded price bubble on the map in its correct location. Check this in the initial West Tennessee view and after zooming.
11. Whenever the automated listing reconciliation changes listing information, update `listingMachineUpdatedAt` in `forsale.html` to the completion time in ISO 8601 Central Time. If only one listing changed, set `data-listing-updated` on that listing card instead. Every listing modal uses this value for its “Listing updated” line.
12. When Flexmls provides a verified virtual-tour URL, add `data-virtual-tour-url="HTTPS_URL"` to that listing's `.card`. Remove the attribute if the MLS no longer includes the tour. Never add a guessed, generated, or non-MLS virtual tour; the modal hides the Virtual Tour button when this attribute is absent.
13. Preserve every verified Flexmls fact available for the modal, including bedrooms, bathrooms, room dimensions, heating, cooling, appliances, parking, construction, utilities, subdivision, HOA, taxes, parcel details, and market dates. Place them in the modal overview or Key Features list so the Facts & Features section can display them. Do not invent Zestimate, view, save, tax, HOA, room, or financial values that Flexmls does not provide.
14. After every listing reconciliation, run `python3 scripts/generate_listing_share_pages.py`. Verify it generated one page per active `.card[data-modal]`. These crawlable pages supply Facebook and X with the listing image, address title, price, and one-sentence amenities description, then redirect visitors to the exact modal.
15. Verify every agent profile after each listing reconciliation. `amy-mclemore.html` and the profiles served by `agent-profile.html` read current assignments directly from `forsale.html`; confirm each listing appears under the correct agent, including the Lynda/Lynda C Climer, Lisa/Lisa Ann Ballinger, and Tammy/Tamra L Jones name variations. Periodically recheck public professional sources before changing sales totals, review totals, price ranges, experience, recent sales, or service areas.

Last verified in Flexmls on August 20, 2026:

- Closed listings: 192
- Average list price: $222,426
