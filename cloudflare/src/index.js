const ALLOWED_ORIGINS = new Set([
  "https://totalrealtysource.com",
  "https://www.totalrealtysource.com",
  "http://127.0.0.1:5501",
  "http://localhost:5501",
]);

const AGENT_SLUGS = new Set([
  "lynda-climer", "brandie-bassett", "jackie-david", "ashley-mcmillan",
  "lisa-ballinger", "tammy-jones", "laura-burke", "amy-mclemore",
]);

function corsHeaders(origin) {
  return {
    "Access-Control-Allow-Origin": ALLOWED_ORIGINS.has(origin) ? origin : "https://totalrealtysource.com",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    "Vary": "Origin",
  };
}

function json(data, status, origin) {
  return Response.json(data, { status, headers: { ...corsHeaders(origin), "Cache-Control": "no-store" } });
}

function validListingId(value) {
  return /^[a-zA-Z0-9_-]{2,80}$/.test(value || "");
}

async function visitorHash(request, salt) {
  const input = `${request.headers.get("CF-Connecting-IP") || "unknown"}:${salt}`;
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(input));
  return [...new Uint8Array(digest)].map(value => value.toString(16).padStart(2, "0")).join("");
}

async function handleViews(request, env, listingId, origin) {
  if (!validListingId(listingId)) return json({ error: "Invalid listing." }, 400, origin);
  if (request.method === "GET") {
    const count = await env.DB.prepare("SELECT view_count FROM listing_views WHERE listing_id = ?").bind(listingId).first("view_count");
    return json({ listingId, views: Number(count || 0) }, 200, origin);
  }
  const count = await env.DB.prepare(`
    INSERT INTO listing_views (listing_id, view_count, updated_at) VALUES (?, 1, CURRENT_TIMESTAMP)
    ON CONFLICT(listing_id) DO UPDATE SET view_count = view_count + 1, updated_at = CURRENT_TIMESTAMP
    RETURNING view_count
  `).bind(listingId).first("view_count");
  return json({ listingId, views: Number(count || 1) }, 200, origin);
}

async function handleContact(request, env, origin) {
  const contentLength = Number(request.headers.get("Content-Length") || 0);
  if (contentLength > 20000) return json({ error: "Message is too large." }, 413, origin);
  let body;
  try { body = await request.json(); }
  catch (_) { return json({ error: "Invalid form submission." }, 400, origin); }
  if (body.website) return json({ ok: true }, 200, origin);

  const agent = String(body.agent || "").trim();
  const name = String(body.name || "").trim().slice(0, 100);
  const phone = String(body.phone || "").trim().slice(0, 40);
  const email = String(body.email || "").trim().slice(0, 160);
  const message = String(body.message || "").trim().slice(0, 4000);
  if (!AGENT_SLUGS.has(agent) || name.length < 2 || message.length < 5 || !/^\S+@\S+\.\S+$/.test(email)) {
    return json({ error: "Please complete every field with valid information." }, 400, origin);
  }

  const hash = await visitorHash(request, env.CONTACT_RATE_SALT);
  const recent = await env.DB.prepare("SELECT COUNT(*) AS total FROM contact_attempts WHERE visitor_hash = ? AND created_at >= datetime('now', '-1 hour')").bind(hash).first("total");
  if (Number(recent || 0) >= 5) return json({ error: "Too many messages were submitted. Please try again later." }, 429, origin);

  let recipients;
  try { recipients = JSON.parse(env.AGENT_EMAILS_JSON); }
  catch (_) { return json({ error: "Contact delivery is not configured." }, 503, origin); }
  const recipient = recipients[agent];
  if (!recipient) return json({ error: "This agent’s contact delivery is not configured." }, 503, origin);

  const emailResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { "Authorization": `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: env.FROM_EMAIL,
      to: [recipient],
      reply_to: email,
      subject: `Total Realty Source website inquiry for ${agent}`,
      text: `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nAgent: ${agent}\n\n${message}`,
    }),
  });
  if (!emailResponse.ok) {
    console.error(JSON.stringify({ event: "contact_delivery_failed", status: emailResponse.status, agent }));
    return json({ error: "Your message could not be delivered. Please call the agent instead." }, 502, origin);
  }
  await env.DB.prepare("INSERT INTO contact_attempts (visitor_hash) VALUES (?)").bind(hash).run();
  return json({ ok: true }, 200, origin);
}

async function handleReview(request, env, origin) {
  const contentLength = Number(request.headers.get("Content-Length") || 0);
  if (contentLength > 20000) return json({ error: "Testimonial is too large." }, 413, origin);
  let body;
  try { body = await request.json(); }
  catch (_) { return json({ error: "Invalid form submission." }, 400, origin); }
  if (body.website) return json({ ok: true }, 200, origin);

  const agent = String(body.agent || "").trim();
  const name = String(body.name || "").trim().slice(0, 100);
  const email = String(body.email || "").trim().slice(0, 160);
  const rating = Number(body.rating);
  const review = String(body.review || "").trim().slice(0, 4000);
  if (!AGENT_SLUGS.has(agent) || name.length < 2 || !/^\S+@\S+\.\S+$/.test(email) || !Number.isInteger(rating) || rating < 1 || rating > 5 || review.length < 10) {
    return json({ error: "Please complete every field with valid information." }, 400, origin);
  }

  const hash = await visitorHash(request, env.CONTACT_RATE_SALT);
  const recent = await env.DB.prepare("SELECT COUNT(*) AS total FROM contact_attempts WHERE visitor_hash = ? AND created_at >= datetime('now', '-1 hour')").bind(hash).first("total");
  if (Number(recent || 0) >= 5) return json({ error: "Too many submissions were received. Please try again later." }, 429, origin);
  if (!env.REVIEW_EMAIL) return json({ error: "Testimonial delivery is not configured." }, 503, origin);

  const emailResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { "Authorization": `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: env.FROM_EMAIL,
      to: [env.REVIEW_EMAIL],
      reply_to: email,
      subject: `Testimonial awaiting approval for ${agent}`,
      text: `Reviewer: ${name}\nEmail: ${email}\nAgent: ${agent}\nRating: ${rating} of 5\n\n${review}\n\nThis testimonial has not been published. Review and verify it before adding it to the website.`,
    }),
  });
  if (!emailResponse.ok) {
    console.error(JSON.stringify({ event: "review_delivery_failed", status: emailResponse.status, agent }));
    return json({ error: "Your testimonial could not be delivered." }, 502, origin);
  }
  await env.DB.prepare("INSERT INTO contact_attempts (visitor_hash) VALUES (?)").bind(hash).run();
  return json({ ok: true }, 200, origin);
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: corsHeaders(origin) });
    if (origin && !ALLOWED_ORIGINS.has(origin)) return json({ error: "Origin not allowed." }, 403, origin);
    const url = new URL(request.url);
    const viewMatch = url.pathname.match(/^\/api\/views\/([^/]+)$/);
    try {
      if (viewMatch && (request.method === "GET" || request.method === "POST")) return await handleViews(request, env, decodeURIComponent(viewMatch[1]), origin);
      if (url.pathname === "/api/contact" && request.method === "POST") return await handleContact(request, env, origin);
      if (url.pathname === "/api/review" && request.method === "POST") return await handleReview(request, env, origin);
      return json({ error: "Not found." }, 404, origin);
    } catch (error) {
      console.error(JSON.stringify({ event: "worker_error", message: error instanceof Error ? error.message : String(error) }));
      return json({ error: "Service temporarily unavailable." }, 500, origin);
    }
  },
};
