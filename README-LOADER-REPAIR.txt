Boondocking & Camping Maps — loader repair v23.0.7a

Purpose:
- Repairs the data-loading issue introduced by the prior v23.0.7 upload-ready package.
- Restores states-manifest-v22.3.3.js to a plain manifest only.
- Replaces mi-rest-roadside-v23.0.7.js with a safe data-only file.

Important:
- This package intentionally does NOT make the new rest/roadside records appear on the map yet.
- It removes the loader-side behavior that could stall startup.
- No config.js is included.
- No SQL is required.

Next clean implementation:
- Add rest/roadside records by either directly updating data/states/MI.js, or by updating the app code to support state supplement files explicitly.
- Do not use document.write, Element.prototype patching, MutationObserver UI relabeling, or load-order interception.
