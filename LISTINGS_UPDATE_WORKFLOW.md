# FlexMLS listings update workflow

Use this exact compact workflow for every Total Realty Source listing check.

1. Open `https://ctn.flexmls.com/`.
2. Immediately inspect the page for a login or timed-out session.
3. If login is shown, stop and ask the user to log in. Do not navigate, search, or try alternate routes while logged out.
4. After the user confirms login, open the three-dashed-line menu at the top.
5. Select **Office Listings**.
6. Never select **My Listings**. It only shows the signed-in account's personal inventory and is not the brokerage-wide source.
7. Compare Office Listings with `forsale.html` for additions, removals, status changes, price changes, open houses, virtual tours, photos, agent assignments, and property details.
8. Count unique physical properties on the website. If one address has multiple MLS category records, show the property once unless the records represent distinct offerings.
9. Update the homepage property count and average for-sale listing price during the same pass. Do not include rental prices in the for-sale average.
10. Regenerate permanent listing and share pages after editing:
    - `python3 scripts/generate_seo_pages.py`
    - `python3 scripts/generate_listing_share_pages.py`
11. Run `git diff --check` and verify the active card count before reporting completion.

Keep the browser pass focused. Do not reconstruct an office-level Quick Search unless Office Listings is genuinely unavailable.
