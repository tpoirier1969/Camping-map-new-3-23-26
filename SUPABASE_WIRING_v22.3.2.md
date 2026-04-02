# Camping map Supabase wiring (v22.3.2)

This build runs in two modes:

- **Static fallback**: uses bundled state files.
- **Supabase mode**: reads verified sites from `camping.verified_sites_v` and pending sites from `camping.pending_sites_v`.

## Files

- `config.example.js` — copy to `config.js` and add your Supabase URL/anon key.
- `supabase_seed_sites_v22.3.2.csv` — optional seed import for `camping.sites`.
- `supabase_seed_urls_v22.3.2.sql` — optional helper SQL for backfilling source URLs.

## Browser behavior

- If `config.js` is absent, the app stays in static mode.
- If `config.js` is present and valid, sign-in enables pending/verified workflow.
- Pending popups expose the verification checkbox that promotes a row into permanent data.

## Notes

- The state dropdown lists all 50 states.
- States with no mapped records display `(0)`.
- Michigan remains the default dataset.


## Local pending layer

- Static mode now also loads `data/pending-sites-v22.3.2.js` so the **Needs Verification** layer works even before Supabase is connected.
- Promotion checkbox still requires Supabase sign-in because static mode does not write permanent data.
- `michigan-pending-log-v22.3.2.csv` is included as the durable research log for newly found Michigan sites.
