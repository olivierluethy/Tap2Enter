# Tap2Enter — PHP Lead-Capture API

Two POST endpoints that back the click + email-capture flow on the landing page.
Designed to be deployed to PHP shared hosting (the rest of the site runs on
Next.js / Vercel separately).

## Endpoints

- `POST /api/track-click.php` — record a CTA click, returns `{ success, lead_id }`.
- `POST /api/submit-email.php` — attach an email to a previously tracked click,
  identified by `(lead_id, session_id)`.

Both endpoints accept JSON, enforce CORS against `ALLOWED_ORIGINS`, and apply a
per-IP-hash + per-endpoint rate limit (default 10 req/min).

## Deployment

1. Apply the migrations in `migrations/` against your MySQL/MariaDB database
   (e.g. via PhpMyAdmin → SQL tab).
2. Upload the contents of this folder to `https://<host>/api/` on the shared
   host.
3. Copy `.env.example` to `.env` and fill in the values:
   - `DB_*` — database credentials.
   - `IP_HASH_SALT` — one-shot random string (e.g. `openssl rand -hex 32`).
     **Never change this** after the first request — it would invalidate
     existing rate-limit buckets.
   - `ALLOWED_ORIGINS` — comma-separated list (no trailing slash).
4. Verify that `.env` and the helper files are not directly accessible (the
   shipped `.htaccess` blocks them on Apache; on nginx, replicate the same
   restrictions in your server config).

## Smoke tests

```sh
# Track a click
curl -i -X POST https://tap2enter.com/api/track-click.php \
  -H "Content-Type: application/json" \
  -H "Origin: https://tap2enter.com" \
  -d '{"session_id":"00000000-0000-4000-8000-000000000001","trigger_source":"early_access_hero"}'

# Submit an email (use the lead_id from the previous response)
curl -i -X POST https://tap2enter.com/api/submit-email.php \
  -H "Content-Type: application/json" \
  -H "Origin: https://tap2enter.com" \
  -d '{"session_id":"00000000-0000-4000-8000-000000000001","lead_id":1,"email":"test@example.com"}'
```

## Security notes

- Raw IPs are never stored — only `sha256(IP_HASH_SALT + "|" + ip)`.
- Honeypot field `website` on `submit-email.php` returns 200 OK without
  inserting, so scrapers can't detect the trap.
- Rate limit lives in the `rate_limits` table; rows older than 1h are GC'd
  best-effort on every request.
