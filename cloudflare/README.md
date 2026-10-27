# Total Realty Source Cloudflare API

This Worker privately routes agent contact forms and stores listing view counts in D1. Personal agent emails and the Resend key must only be added as encrypted Cloudflare secrets.

Website testimonial submissions use the fixed `REVIEW_EMAIL` Wrangler variable and are emailed for manual approval. They are never published automatically.

Agent contact and tour-request submissions are delivered only through the matching entry in `AGENT_EMAILS_JSON`. There is intentionally no shared-inbox fallback: if an agent is missing from the private map, the form returns a configuration error instead of sending the inquiry to another recipient.

## Private secrets

- `RESEND_API_KEY`
- `CONTACT_RATE_SALT`
- `FROM_EMAIL` (for example, `Total Realty Source <website@updates.totalrealtysource.com>`)
- `AGENT_EMAILS_JSON`, a JSON object keyed by agent slug

Never commit those values or a `.dev.vars` file. After creating the D1 database, replace the placeholder database ID in `wrangler.jsonc`, apply `schema.sql`, add the secrets through Wrangler or the Cloudflare dashboard, deploy, and connect `api.totalrealtysource.com` as the Worker custom domain.
