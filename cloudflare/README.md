# Total Realty Source Cloudflare API

This Worker privately routes agent contact forms and stores listing view counts in D1. Personal agent emails and the Resend key must only be added as encrypted Cloudflare secrets.

## Private secrets

- `RESEND_API_KEY`
- `CONTACT_RATE_SALT`
- `FROM_EMAIL` (for example, `Total Realty Source <website@updates.totalrealtysource.com>`)
- `AGENT_EMAILS_JSON`, a JSON object keyed by agent slug

Never commit those values or a `.dev.vars` file. After creating the D1 database, replace the placeholder database ID in `wrangler.jsonc`, apply `schema.sql`, add the secrets through Wrangler or the Cloudflare dashboard, deploy, and connect `api.totalrealtysource.com` as the Worker custom domain.
