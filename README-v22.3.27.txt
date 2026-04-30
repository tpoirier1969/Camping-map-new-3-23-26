Camping Map v22.3.27 direct Michigan data replacement

Install:
Replace this file in your project:
  data/states/MI.js

Included:
  data/states/MI.js

Not included:
  config.js
  index.html
  app JS files
  manifest file
  patch/sidecar files

What changed:
- Built directly from v22.3.26 MI.js.
- Preserved 535 Michigan records and record order.
- Continued cost cleanup without touching boondocking cost gaps.
- Fixed two Brighton Recreation Area records that had been misread as local/operator campgrounds:
  * Appleton Lake Campground -> state/rustic DNR, $20/night
  * Bishop Lake Campgrounds -> state/modern DNR, $32/night 20/30-amp
- Added official DNR rate details for Hoeft, Perch Lake, Thunder Bay River, and Tippy Dam.
- Added official Forest Service / Recreation.gov rate details for Loon Call, Steuben Lake, Swan Lake, Triangle Lake, Black River NFCG, Bobcat Lake, and Pomeroy Lake.
- Improved Lake Michigan Recreation Area wording: official page exposes day-use fees but not static camping rate in this pass.
- Improved Ewing Point wording but kept costNeedsReview true because I did not confirm the rate from the official page.

Verification:
- node --check data/states/MI.js passed.
- Record count after rebuild: 535.
- Remaining costNeedsReview true count after this pass: 157.
