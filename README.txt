Camping Map v22.3.4 Michigan default + legend build.

Included in this rebuild:
- app-v22.3.4.js
- index.html
- existing data/states-manifest-v22.3.3.js
- existing data/pending-sites-v22.3.3.js
- existing Supabase wiring docs and support files

What changed in v22.3.4:
- fresh localStorage keys so older saved state/layer combinations do not bleed into this build
- default startup resets to Michigan with the normal main camping layers enabled
- visible on-map legend added to explain symbol colors
- layer redraw path made safer to reduce hiccups when switching layers
- redraws now close stale popups and re-render on the next animation frame
- status text is clearer when no layers are enabled or no sites are visible

Still not included:
- config.js

For live sign-in and verified/pending table sync, your root-level config.js still has to be present and valid.
