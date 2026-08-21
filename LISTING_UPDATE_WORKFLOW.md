# Listing update workflow

When reconciling the website with Flexmls:

1. Add, update, or remove the listing cards in `forsale.html`.
2. Whenever a property has closed, update `homepageListingMetrics.closedListings` in `index.html` to the latest verified Flexmls total. This one value updates both homepage closed-listing displays.
3. Confirm the homepage property count matches the number of active cards. The homepage calculates this automatically; `52` in `index.html` is only the no-network fallback.
4. Open Flexmls office-listing statistics and update `homepage-average-list-price` in `index.html` with the current average List Price.

Last verified in Flexmls on August 20, 2026:

- Closed listings: 192
- Average list price: $222,426
