Camping Map v22.3.3 auth-ui-fix build.

Included:
- index.html
- app-v22.3.3.js
- data/states-manifest-v22.3.3.js
- data/pending-sites-v22.3.3.js
- data/sites.master.json
- data/states/*.js
- SUPABASE_WIRING_v22.3.3.md
- michigan-pending-log-v22.3.3.csv

Highlights:
- Static map now shows a local Needs Verification layer.
- Pending-site popup keeps the verification checkbox workflow for Supabase-backed promotion.
- Michigan pending batch has been seeded from official forest-service comparisons.

- Supabase auth text is clearer about missing/invalid config.js.
- Sign-in now works from Enter in the auth fields because the inputs are inside a form.
- Clicking Sign in without a valid config.js now explains why it cannot proceed.
