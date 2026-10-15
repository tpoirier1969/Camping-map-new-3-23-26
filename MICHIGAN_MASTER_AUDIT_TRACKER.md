# MMAT: Michigan Master Audit Tracker

**Scope:** All 83 Michigan counties, plus cross-county public-land and water-access systems accounted for under their actual geographic footprints.  
**Established:** 2026-10-14. **Audit baseline:** GitHub `main` at `v23.1.131`, commit `1d24d3a9bb77019ccfeafb0169253384ea7bbf09`.  
**Binding rules:** [PROJECT_RULES.md](PROJECT_RULES.md). Always reread current live `PROJECT_RULES.md` and project settings before any research, edits, worker handoff, import or county closure.

**This file is the durable, canonical county-closure tracker. It is not itself camping-site data.** Campsite records remain in the established map files and investigation ledgers. Do not manufacture counts, site positions, or county closure status.

## Fast resume checkpoint (maintain after **every** batch)

**Last confirmed:** 2026-10-15; v23.1.142 Michigan Mecosta Gray's Riverside addition, parent baseline commit 4f6a60f791409947a1027cfbde7c0e9cb8691f34; check live main HEAD for this release commit. 788 actual MI runtime camping records; 0/83 counties closed.
**Latest integration checkpoint:** 2026-10-15 Mecosta official 2026-2030 county private campgrounds reconciled: new Gray's Riverside import, Canadian Lakes member-restricted rejection, four Mecosta and one Newaygo historic leads stored; details below.
**Michigan inventory:** **788 actual runtime camping records** after v23.1.142; **0/83 counties closed**. Check all manifest-loaded Michigan files and supplements, not static base rows.
**Current geographic lock:** Mecosta + Newaygo counties, both **OPEN / PARTIAL**. **Next queued:** Lake + Oceana only *after* current batch's bounded work is checkpointed; open counties stay OPEN until the full closeout gate is met.
**Most recent accepted map changes:** v23.1.142 adds Mecosta Gray's Riverside public private campground after first-party booking and unique named Google POI proof; five new leads and Canadian Lakes nonpublic rejection. Prior:  v23.1.141 adds Lonesome Lake Campground after separate Google Maps named campground coordinate rescue, retiring an old unresolved lead. v23.1.140 imports the operator-confirmed 6782 E 16th St Dragon Adventures Base Camp campsite grounds (not the 6372 E 36th St rental storefront). v23.1.139 imports Sportsman Park & Leisure Time RV Park from two existing official/operator-backed Newaygo leads. v23.1.138 rejects former Pettibone Lake campground on direct county Parks no-camping proof; operator-proven Lonesome Lake remains coordinate blocked (no active pin). v23.1.137 adds two distinct Newaygo Croton Drive private campgrounds from operator and Apple named-map proof. v23.1.136 adds Pickerel Lakeside private campground and corrects existing Croton Township Rustic to Modern on direct electric-service proof. v23.1.134 added 8 source-backed private campgrounds; v23.1.135 restored Hungerford Equestrian Group Campsite at separate Recreation.gov official facility coordinates. v23.1.133 superseded the false duplicate import interpretation from v23.1.132.
**Remaining current work:** confirm Sarns Resort 2026 public transient policy with operator (active sale listing is not closure evidence); finish the township/place-anchor, private/seasonal exceptions, non-modern, water-access, USFS, and dispersed/rule-area matrices for Mecosta/Newaygo; reconcile the official Newaygo 2025/2026 campground inventory row by row; check unresolved operator/club/event/alias entries in `data/leads.js`. Do not invent points or promote county inventory names without present overnight proof.
**Canonical data outcomes:** Active sites in owning original `data/states/` file and actual manifest-loaded supplements; unresolved in `data/leads.js`; disproven in `data/rejected.js`; map-visible unverified only when a defensible position is known, via the *existing* Needs Verification dataset. Close out every named lead exactly once.
**Next safe action:** Take one *bounded* remaining Mecosta/Newaygo source-system or township/forest subarea, use TinyFish Search/Fetch and Agent only where useful, independently verify official/operator sources, run the **complete** required repo baseline and cross-file duplicate check, integrate qualified sites and ledgers with unified release QA, then update this checkpoint and append the short batch record below.

### Low-context execution contract

1. **At chat/session start:** Read current ChatGPT project settings, current `PROJECT_RULES.md`, **this checkpoint**, current `version.js`, current live commit and every required baseline file. For large required files, retrieve/process full content in manageable tool calls (or blob by SHA) and report compact counts, SHAs and targeted excerpts, *not enormous raw bodies*. An incomplete/truncated baseline is still a hard stop under `PROJECT_RULES.md`.
2. **Discover in bounded geographic pieces:** Normally one county subarea/source-system at a time (or a tightly related 1–2-county slice), not a statewide roaming run. Separate TinyFish Search, Fetch and Agent in the scorecard. An Agent's completion message is not proof of complete discovery.
3. **Commit at each batch end:** Reconcile all named leads against *all* manifest-loaded Michigan files, pending, leads, rejected, and coordinate neighbors; integrate every import-ready addition/correction; retire promoted duplicates; preserve unresolved and disproven records; run runtime/layer/source/coordinate/version QA. If no records qualify, log an explicit zero-add closeout, not an invented map update. Don't increment the release version for research alone.
4. **Persist before moving on:** Replace this checkpoint's snapshot fields; append one compact batch record with `date | geographic lock | repo base/release SHA | TinyFish method+URL+run ID | leads and dispositions | active/ledger deltas | QA | exact blockers and acquisition paths | next geographic slice`. Point to full official evidence/record URLs; store detailed material in the repo, not in a long conversation transcript. Never erase earlier batch evidence.
5. **Handoff/reset:** After several batches or when chat context becomes heavy, start a fresh chat and have it resume from this checkpoint and current repository, **not a conversational retelling**. New workers/supervisors must first follow *both* current ChatGPT project settings and live `PROJECT_RULES.md`. No background processing is implied.

**Checkpoint maintenance rule:** This section is a **replace-in-place operational snapshot**. Historical discoveries, proofs, dispositions, commits, failed TinyFish runs and county closure decisions belong in the append-only sections below. Do not mistake a stale checkpoint count for live truth.

## Statewide rollup

- **Counties:** 83 total (15 Upper Peninsula, 68 Lower Peninsula).
- **Closed against the full current-source audit standard:** **0 / 83**. Existing statewide releases and earlier campground corrections are NOT evidence that every county has completed the full current discovery matrix.
- **County work partially documented:** Mecosta, Newaygo, Keweenaw, Menominee, Wayne. Partial means evidence or integration exists; it does **not** mean all county targets were found and reconciled.
- **Current Michigan map manifest count:** 780 in `data/states-manifest.js` at the initial baseline. This count may change; verify the live manifest after each integration.
- **Active input files:** `data/states/MI.js`, `data/states/MI2.js` and every Michigan-related supplement listed in the current state manifest. Never reconcile only the first Michigan file.
- **Two permanent non-active result lists:** `data/rejected.js` is the disproven / permanently closed / prohibited / nonpublic ledger; `data/leads.js` is the genuinely unresolved evidence/coordinate ledger. A credible lead with a defensible actual camping-area position may also appear in the existing `Needs Verification` map layer via `data/pending-sites-v22.3.3.js` (runtime `window.CAMPING_PENDING_DATA`). Leads without an honest mapped location stay in the ledger only.

## Completion protocol

Every county must have all of the following before its closure changes to `COMPLETE`:

1. **Required baseline preflight:** Read the *current complete* `PROJECT_RULES.md`, `version.js`, `data/states-manifest.js`, all active Michigan files and manifest-loaded corrections/supplements, `data/leads.js`, `data/rejected.js`, the current Needs Verification input, and any additional assignment-specific source. If required content is inaccessible or truncated, STOP and request that exact current file. Do not mark a county complete or bypass the blocker.
2. **Place-anchor discovery matrix:** Search the county, municipalities and townships, important unincorporated places, state/federal/public land units, highways, lake/river corridors, water trails, boat/backpack access, county parks, recreation areas and private campgrounds. Include Rustic / Primitive, Boat / Backpack, Boondocking / Dispersed, Modern and private overnight options, and distinguish rule-area records from actual camp pads.
3. **TinyFish methods logged:** Use TinyFish Search and Fetch where valuable; use the Agent on interactive sites or to test effectiveness. Record successful and failed runs **individually**. A completed, zero-result Agent run is not sufficient evidence of zero sites. Record what TinyFish *actually discovered*, not what an official source later established.
4. **Official/operator proof and geographic position:** Confirm overnight access, current status, public access, type/layer, important restrictions and a defensible campground/camping-area coordinate. Never use an agency office, lake/park center, dam, boat landing, parking lot, or invented point as a campsite location. Follow the campground-address evidence policy in PROJECT_RULES.md; document any limited precision.
5. **Complete reconciliation:** Normalize aliases and compare each candidate against every manifest-loaded Michigan active file, supplements, `data/leads.js`, `data/rejected.js`, and existing Needs Verification records; check nearby coordinate neighbors as well as names. One physical camping opportunity gets one consistent final disposition.
6. **Resolution and integration:** Apply authorized additions/layer and coordinate corrections to existing files, preserving valid existing information. For non-active outcomes, update the appropriate existing investigation ledger and Needs Verification map layer where positional evidence permits. Do not promote doubtful leads or display disproven sites as plausible overnight locations.
7. **Closeout QA:** Confirm map visibility and correct layer, source trail, accurate marker position, no stale lead/pending duplicates after promotion, no duplicate active sites, current version/build/manifest references as required by PROJECT_RULES.md, and an auditable final disposition for every in-scope candidate. Record evidence, accepted/rejected changes and blockers before checking `COMPLETE`.

**Status key:** `—` = no *county-wide stage completion* demonstrated; `P` = documented partial stage only; `✓` = stage complete with a linked evidence log. `OPEN` = county not closed; `COMPLETE` only if every required stage is `✓` and its inventory/disposition evidence is present. The Agent column is not a mandatory stage; use it only when interaction or controlled comparison adds value.

## County tracker

| County | Peninsula | TinyFish discovery | Official-source matrix | Active + ledgers duplicate review | Resolutions integrated | Final QA | County | Notes / evidence |
|---|---|---|---|---|---|---|---|---|
| Alcona | LP | — | — | — | — | — | OPEN |  |
| Alger | UP | — | — | — | — | — | OPEN |  |
| Allegan | LP | — | — | — | — | — | OPEN |  |
| Alpena | LP | — | — | — | — | — | OPEN |  |
| Antrim | LP | — | — | — | — | — | OPEN |  |
| Arenac | LP | — | — | — | — | — | OPEN |  |
| Baraga | UP | — | — | — | — | — | OPEN |  |
| Barry | LP | — | — | — | — | — | OPEN |  |
| Bay | LP | — | — | — | — | — | OPEN |  |
| Benzie | LP | — | — | — | — | — | OPEN |  |
| Berrien | LP | — | — | — | — | — | OPEN |  |
| Branch | LP | — | — | — | — | — | OPEN |  |
| Calhoun | LP | — | — | — | — | — | OPEN |  |
| Cass | LP | — | — | — | — | — | OPEN |  |
| Charlevoix | LP | — | — | — | — | — | OPEN |  |
| Cheboygan | LP | — | — | — | — | — | OPEN |  |
| Chippewa | UP | — | — | — | — | — | OPEN |  |
| Clare | LP | — | — | — | — | — | OPEN |  |
| Clinton | LP | — | — | — | — | — | OPEN |  |
| Crawford | LP | — | — | — | — | — | OPEN |  |
| Delta | UP | — | — | — | — | — | OPEN |  |
| Dickinson | UP | — | — | — | — | — | OPEN |  |
| Eaton | LP | — | — | — | — | — | OPEN |  |
| Emmet | LP | — | — | — | — | — | OPEN |  |
| Genesee | LP | — | — | — | — | — | OPEN |  |
| Gladwin | LP | — | — | — | — | — | OPEN |  |
| Gogebic | UP | — | — | — | — | — | OPEN |  |
| Grand Traverse | LP | — | — | — | — | — | OPEN |  |
| Gratiot | LP | — | — | — | — | — | OPEN |  |
| Hillsdale | LP | — | — | — | — | — | OPEN |  |
| Houghton | UP | — | — | — | — | — | OPEN |  |
| Huron | LP | — | — | — | — | — | OPEN |  |
| Ingham | LP | — | — | — | — | — | OPEN |  |
| Ionia | LP | — | — | — | — | — | OPEN |  |
| Iosco | LP | — | — | — | — | — | OPEN |  |
| Iron | UP | — | — | — | — | — | OPEN |  |
| Isabella | LP | — | — | — | — | — | OPEN |  |
| Jackson | LP | — | — | — | — | — | OPEN |  |
| Kalamazoo | LP | — | — | — | — | — | OPEN |  |
| Kalkaska | LP | — | — | — | — | — | OPEN |  |
| Kent | LP | — | — | — | — | — | OPEN |  |
| Keweenaw | UP | P | P | P | P | — | OPEN | v23.1.127 added 35 NPS Isle Royale campgrounds; a campground import does NOT establish county-wide public/private/dispersed closeout. |
| Lake | LP | — | — | — | — | — | OPEN |  |
| Lapeer | LP | — | — | — | — | — | OPEN |  |
| Leelanau | LP | — | — | — | — | — | OPEN |  |
| Lenawee | LP | — | — | — | — | — | OPEN |  |
| Livingston | LP | — | — | — | — | — | OPEN |  |
| Luce | UP | — | — | — | — | — | OPEN |  |
| Mackinac | UP | — | — | — | — | — | OPEN |  |
| Macomb | LP | — | — | — | — | — | OPEN |  |
| Manistee | LP | — | — | — | — | — | OPEN |  |
| Marquette | UP | — | — | — | — | — | OPEN |  |
| Mason | LP | — | — | — | — | — | OPEN |  |
| Mecosta | LP | P | P | P | P | — | OPEN | v23.1.128 integrated Tubbs Lake Mainland, Tubbs Lake Island, Haymarsh Lake; county directory also has 4 preexisting campgrounds. Wider private, township, and remote camping sweep NOT closed. Oct 14 continuation: partial operator-discovery and TinyFish QA; see log below. |
| Menominee | UP | — | P | P | P | — | OPEN | v23.1.131 resolved distinct River Park campground identities; full county inventory and closure review outstanding. |
| Midland | LP | — | — | — | — | — | OPEN |  |
| Missaukee | LP | — | — | — | — | — | OPEN |  |
| Monroe | LP | — | — | — | — | — | OPEN |  |
| Montcalm | LP | — | — | — | — | — | OPEN |  |
| Montmorency | LP | — | — | — | — | — | OPEN |  |
| Muskegon | LP | — | — | — | — | — | OPEN |  |
| Newaygo | LP | P | P | P | P | — | OPEN | v23.1.128 integrated Diamond Lake, Sandy Beach, White Cloud and Ed H. Henning county campgrounds; corrected Oak/Poplar layers. Official 2025 hazard-plan campground inventory and GIS provide many still-to-close names. Oct 14 continuation: partial USFS/operator discovery; see log below. |
| Oakland | LP | — | — | — | — | — | OPEN |  |
| Oceana | LP | — | — | — | — | — | OPEN |  |
| Ogemaw | LP | — | — | — | — | — | OPEN |  |
| Ontonagon | UP | — | — | — | — | — | OPEN |  |
| Osceola | LP | — | — | — | — | — | OPEN |  |
| Oscoda | LP | — | — | — | — | — | OPEN |  |
| Otsego | LP | — | — | — | — | — | OPEN |  |
| Ottawa | LP | — | — | — | — | — | OPEN |  |
| Presque Isle | LP | — | — | — | — | — | OPEN |  |
| Roscommon | LP | — | — | — | — | — | OPEN |  |
| Saginaw | LP | — | — | — | — | — | OPEN |  |
| Sanilac | LP | — | — | — | — | — | OPEN |  |
| Schoolcraft | UP | — | — | — | — | — | OPEN |  |
| Shiawassee | LP | — | — | — | — | — | OPEN |  |
| St. Clair | LP | — | — | — | — | — | OPEN |  |
| St. Joseph | LP | — | — | — | — | — | OPEN |  |
| Tuscola | LP | — | — | — | — | — | OPEN |  |
| Van Buren | LP | — | — | — | — | — | OPEN |  |
| Washtenaw | LP | — | — | — | — | — | OPEN |  |
| Wayne | LP | — | P | P | P | — | OPEN | v23.1.127 added Wayne County Fairgrounds RV park; full county inventory/closure review outstanding. |
| Wexford | LP | — | — | — | — | — | OPEN |  |

## Geographic work queue

**Current batch 1: Mecosta and Newaygo counties.** Do the remaining whole-county place-anchor sweep, not merely the already checked county-park directory. Complete private/operator campgrounds, townships, state forest and federal camping, dispersed/rule-area systems, water-access camps, county inventory exception records, location standards and full duplicate/lead/rejected closure.

**Next batch 2: Lake and Oceana counties.** Adjacent Lower Peninsula geography, including overlapping Manistee National Forest and local/private campgrounds. Do not start from a statewide random list.

**Later batches:** Select geographic neighboring county groups of 2–4 from `OPEN` rows; use smaller units for heavily forested/complex counties (e.g., Keweenaw/Isle Royale). Prefer county/ranger-district/watershed geography, not an across-state source-type assignment. Record the next selected group here at the close of the preceding batch.

**No background-completion implication:** Each work session completes the specific bounded batch it can actually verify, commits the durable site and tracker changes, and leaves all unfinished counties `OPEN`. The next session reads current source and tracker and resumes. Never claim an unfinished county/state is done.

## Existing source trails and release anchors (not county-closeout proof)

- **Mecosta:** [official county directory](https://www.mecostacountyparks.com/park-information.html), [Tubbs Lake mainland/island](https://www.mecostacountyparks.com/tubbs-lake.html), [Haymarsh Lake](https://www.mecostacountyparks.com/haymarsh-lake.html). TinyFish Agent run `75207a9f-e91c-4f4f-b062-1cb0705769ab` found four already-known county campground names; independent county pages/Fetch also surfaced Tubbs and Haymarsh. `v23.1.128` imported three rustic sections. **Do not count this as whole-county discovery completion.**
- **Newaygo:** [four county campgrounds](https://www.newaygocountymi.gov/departments/parks/newaygo-county-campgrounds/), [individual reservation maps](https://www.newaygocountymi.gov/departments/parks/park-reservations/), [official 2025 county hazard-management campground inventory](https://www.newaygocountymi.gov/wp-content/uploads/2025/03/2025_Newaygo_County_Community_Profile.pdf), county GIS feature inventory. TinyFish Agent run `8be2a550-cb6b-4334-b467-ffd6f098e6b5` reported zero parks (a failed/empty discovery despite completion); Search and Fetch identified all four official parks. `v23.1.128` imported four county sites and corrected Oak/Poplar to Rustic. Broader 2025 campground inventory still requires careful alias/status reconciliation.
- **Keweenaw:** NPS Isle Royale official campground discovery (TinyFish run `bad9f66a-e5ed-4179-87bd-d8fe1d2e5fa9`); `v23.1.127` integrated 35 NPS Isle Royale campgrounds, not a full Keweenaw county closeout.
- **Menominee:** `v23.1.131` resolved separate River Park campground identities; whole-county inventory pending.
- **Wayne:** `v23.1.127` integrated Wayne County Fairgrounds RV Park; whole-county inventory pending.

## TinyFish effectiveness ledger

Record each bounded assignment here (or link to its complete repo-backed batch log). **Keep Search, Fetch and Agent results separate**, and never count already active sites as new.

| Batch / source | TinyFish Search | TinyFish Fetch | TinyFish Agent | Reference inventory | New verified active | Known active / alias | Agent misses or false completion | Cost / provenance | Status |
|---|---|---|---|---|---|---|---|---|---|
| Mecosta county-park directory, earlier preliminary test | Official search located county pages | Retrieved six county campground names incl. Tubbs and Haymarsh | Four already-known county campground names | Six campground names, with Tubbs as two campground sections | Three rustic sections in v23.1.128; attribution requires separating Search/Fetch from official verification | Four county campgrounds | Tubbs and Haymarsh not found by initial Agent directory pass | Agent run `75207a9f-e91c-4f4f-b062-1cb0705769ab`; exact per-run cost not recorded | PARTIAL |
| Newaygo county-park directory, earlier preliminary test | Four official county parks | Four official county parks | Zero despite 'completed' | Four county-operated campgrounds; separate official 2025 county inventory is much broader | Four county parks in v23.1.128; discovery already existed in leads before this test | Four previously logged leads | Zero-result Agent run is invalid as county completion | Agent run `8be2a550-cb6b-4334-b467-ffd6f098e6b5`; exact per-run cost not recorded | PARTIAL |

**Add for every future run:** date, geography/anchor, full source URL, method (Search/Fetch/Agent), Agent run ID if any, search/fetch result count, independently checked names, previously active count, promoted active count, unique valid discoveries, missed sites, exclusions, steps/cost where measurable, evidence URLs, and source SHA/commit. Never infer a cost from the unchanged wallet alone.

## County closeout / change history

| Date | Repository version / commit | County | Event | Outcome |
|---|---|---|---|---|
| 2026-10-14 | v23.1.127 | Keweenaw, Wayne and other MI | 56 Michigan active additions (35 Isle Royale NPS, 10 DNR, 10 USFS, 1 Wayne County Fairgrounds) and removal of permanently closed Forest Lake | Prior integration; county audit closure **not claimed** |
| 2026-10-14 | v23.1.128 | Mecosta, Newaygo | 12 source-backed Michigan additions, layer corrections, and linkage of existing Needs Verification map data | Prior integration; county audit closure **not claimed** |
| 2026-10-14 | v23.1.131 | Menominee | Three distinct River Park identities reconciled, 58-site City of Menominee campground added | Prior integration; county audit closure **not claimed** |
| 2026-10-14 | v23.1.131 / `1d24d3a9bb77019ccfeafb0169253384ea7bbf09` | 83 counties | Initialized MMAT from live current repository and available primary-source trails | 0 / 83 closed; first audit batch queued: Mecosta + Newaygo |
| 2026-10-14 | v23.1.132 | Newaygo, Mecosta | Six candidate definitions serialized, but five USFS definitions duplicated older v23.1.115 active names; MI2 later-block runtime error uncovered on deeper QA | **Superseded by v23.1.133 reconciliation**, not six net additions |
| 2026-10-14 | v23.1.133 | Mecosta, Newaygo | Repair MI2 runtime correction helper, restore older active blocks, keep 1 truly new Bluegill private, retire 1 wrongly placed Hungerford group marker to leads, remove two stale pending duplicates | 771 actual MI runtime, 0 counties closed |


## Continued Mecosta and Newaygo research — 2026-10-14

**PARTIAL; 0 county closeouts. No camping data files changed in this checkpoint.** Audit ran against live `main` `v23.1.131` and current `PROJECT_RULES.md`, manifest, Michigan primary and continuation files, all Michigan runtime supplements, leads, rejected, and pending records. Large files `data/states/MI.js` and `data/leads.js` were fully accessible using GitHub `fetch_blob` by SHA when `fetch_file` returned empty bodies.

### Newaygo: directly source-backed USFS campground candidates

These existing USFS recreation facilities appear absent as separately named records from the manifest-loaded MI active data. **ADD CANDIDATE, Rustic / Primitive**; no import or county completion yet. The coordinates below are published as campground recreation-site positions by USFS and are *not* the forest office postal address.

| Campground | Latitude | Longitude | Controlling official source |
|---|---:|---:|---|
| Twinwood Lake | 43.47594802 | -85.76753603 | https://www.fs.usda.gov/r09/huron-manistee/recreation/twinwood-lake-campground |
| Shelley Lake | 43.712811 | -85.814014 | https://www.fs.usda.gov/r09/huron-manistee/recreation/shelley-lake-campground |
| Brush Lake | 43.63916667 | -85.68972222 | https://www.fs.usda.gov/r09/huron-manistee/recreation/brush-lake-campground |
| Indian Lake **in Manistee NF**, not Indian Lake State Park in the U.P. | 43.67181060 | -85.82236579 | https://www.fs.usda.gov/r09/huron-manistee/recreation/indian-lake-campground |
| Hungerford Horse Camp (main Hungerford campground) | 43.70166667 | -85.62222222 | https://www.fs.usda.gov/r09/huron-manistee/recreation/hungerford-horse-camp |

**Hungerford group geometry issue:** https://www.fs.usda.gov/r09/huron-manistee/recreation/hungerford-group-horse-camp reuses effectively the same 43.701667,-85.62222 point as the main horse camp, but https://www.recreation.gov/camping/campgrounds/234678 explicitly locates its separate reservable group site *1.25 miles north* of the main site. Recreation.gov-derived facility metadata consistently gives approximately **43.716667,-85.624444** for the group facility; direct reservation system/GIS coordinate confirmation is pending. **NEEDS VERIFICATION; do not place this group campsite at the main campground point.** The 48-site Hungerford Lake / Family / Main campground is an alias/identity investigation: do not import it as a third campground without proof of separate physical identity.

### Private campground operator leads and exceptions

**Mecosta ADD CANDIDATES:** Bluegill Lake Family Camping Resort, direct operator GPS **43.696331,-85.228844**, address 15854 Pretty Lake Drive (http://www.bluegillcamping.com/contact-us.html); River Ridge RV Resort, **22265 8 Mile Road, Stanwood**, overnight RV stays (https://riverridgeresort.com/contact-us/); CranHill Family Campground, **14444 17 Mile Road, Rodney**, 2026 individual campsite reservations and operator map link locating main ranch near 43.716942,-85.373779 (https://www.cranhillranch.com/). **Sarns Resort**: official tourism directory confirms campsites at **4398 Newcosta Avenue, Morley** (https://www.bigrapids.org/member-detail/sarns-resort/); verify current transient activity and site coordinate before promotion. Do not place generic office/address centroids as campground pads.

**Newaygo existing-lead ADD CANDIDATES with operator overnight proof:** Mystery Creek (9570 Wisner Ave, https://mystery-creek-campground.com/); Little Switzerland (254 Pickeral Lake Dr, 2026 fall promotions, https://www.littleswissrnc.com/); Timbers Edge (50 sites, https://www.timbersedgecampground.com/, **operator warns final access-road GPS directions may lead onto impassable roads**); Pickerel Lakeside (12666 N Woodbridge Ave, https://lakecamp-cottages.com/); Lonesome Lake (318 W 18 Mile Rd, predominantly seasonal, occasionally transient, https://lonesomelakecampground.com/); Happy Campers (5380 Croton Dr, https://www.happycampers5380.com/); Salmon Run (8845 Felch Ave, reservations, https://www.salmonrunmi.com/); Adventure Bound West Michigan (https://www.abcamping.com/westmichigan/, **already in both leads and pending**, reconcile before promotion). Chinook, Sportsman Park and other existing Newaygo ledger names still need direct status/coordinate rescue. These are NOT 8 new map imports.

**Existing active / reject identity controls:** Newaygo State Park Oak (`s653`) and Poplar (`s737`) are existing two **Rustic** campground units with 99 sites combined; official https://www.michigan.gov/recsearch/parks/newaygo confirms no electricity, modern bathrooms or showers. `mi-v231128-fremont-lake-park` is already an active Fremont Lake Park Campground record; do not reimport it after abbreviated name matching fails. Davis Bridge Park is explicitly **no camping** on https://www.mecostacountyparks.com/park-information.html and already in `data/rejected.js`. Fort Faith is an organized religious camp/retreat, not verified as an ordinary public nightly campsite facility. Pines Point is in **Oceana**, not Newaygo; park it for the next Lake/Oceana batch. Do not add generic boondocking dots to state game areas: check specific current Michigan DNR restrictions and land ownership.

### TinyFish effectiveness and closure blockers

TinyFish **Search / Fetch** exposed these official USFS pages and private operator evidence but are not themselves legal camping or coordinate proof. TinyFish **Agent** run `ee8a69f0-523c-4916-83dc-544e0f71a245` on https://www.bigrapids.org/campgrounds/ reported all 15 listings examined in 4 steps / 24 seconds, **but gave demonstrably false street addresses**, including River Ridge (operator address is Stanwood 8 Mile Road, not a Big Rapids 5 Mile Road address). Accept **zero Agent-issued locations without independent source checking**. Earlier Newaygo directory Agent also returned 0 despite 4 real county campgrounds.

The current official [2026 Newaygo County Hazard Analysis PDF](https://www.newaygocountymi.gov/wp-content/uploads/2025/11/2026-Newaygo-County-Hazard-Analysis.pdf) is ~51MB and exceeds the current web-PDF gateway limit; search-index snippets are *not* a complete campground inventory. **EXTERNAL ACCESS REQUIRED:** acquire this exact PDF with a normal browser download and extract its campground facility table in a local PDF reader; optionally ask Newaygo County Emergency Services for their current facility spreadsheet. Reconcile every named row against all loaded MI active records and leads/rejected/pending before county completion.

**Next work:** complete township/place-anchor and nonmodern searches, official USFS county facility control list and private/seasonal exception rows; resolve Hungerford main/group coordinates, operator-address positions, alias and spatial collisions. Then update actual `data/leads.js`, `data/rejected.js`, pending and active runtime records only for properly closed outcomes in an authorized revision. Both counties stay OPEN.

## Integration checkpoint: v23.1.132 (October 14, 2026)

**Superseded candidate-based report (corrected in v23.1.133):** Attempted to add six source-backed candidate sites into `data/states/MI2.js`: Newaygo USFS Twinwood Lake, Shelley Lake, Brush Lake, Indian Lake (Manistee NF), and Hungerford Horse Camp (five Rustic / Primitive); Mecosta Bluegill Lake Family Camping Resort (one Private). Each has USFS named campground GPS or Bluegill operator-published GPS, and the source URLs, owner, season, location confidence, layer, county and overnight-use facts in its active record. No guessed coordinates.

**Pending promotion:** Shelley Lake (`pending-mi-019`) and Indian Lake (`pending-mi-015`) were already verified from current official USFS pages and removed from the static Needs Verification dataset after promotion to active. The other 19 pending records remain unchanged. `data/leads.js` gained one distinct unresolved lead, `mi-v231132-newaygo-hungerford-equestrian-group-coordinate-rescue`: Recreation.gov identifies a separately bookable northern group campsite, but USFS's group webpage repeats the main horse-camp coordinates. **Do not place the separate group camp at the main horse camp pin.**

**Runtime/count QA:** Michigan manifest count 771 → 777; unified application/data version `v23.1.132`. Source-backed active additions 6, pending removals 2, lead additions 1, rejected changes 0. The original other state datasets, marker icon policy, area overlays, user UI, and release app code were not altered. No county-wide completion claimed: **Mecosta OPEN; Newaygo OPEN; 0 of 83 Michigan counties closed.**

**Still required:** Current Newaygo county Hazard Analysis campground roster extraction, USFS family/group Hungerford identity and direct official group location rescue, operator address-to-campground geometry for other private candidates, township and dispersed rule checks, then full duplicate/season/status and end-user map QA. The historical v23.1.131 research matrix above describes the pre-integration condition and remains preserved for audit history.

## Integration correction: v23.1.133, October 14, 2026

**Supersedes the v23.1.132 release's new-site count.** Full runtime evaluation of `data/states/MI.js` followed by the entirety of `data/states/MI2.js` proved that Twinwood Lake, Shelley Lake, Brush Lake, Indian Lake (Newaygo/Manistee NF), and Hungerford Horse Camp **were already present** as original v23.1.115 active records in MI2's *first*, separate IIFE. Earlier static reconciliation inspected only the `const additions` array near the end, mistakenly interpreting these as new. The five v23.1.132 duplicate array entries were rejected by the runtime name de-duplication and have now been removed from the source. **Do not report these five as new additions.**

The existing later MI2 IIFE was also calling `patchByName` defined only inside the previously closed earlier IIFE. This caused `ReferenceError: patchByName is not defined` and prevented the entire later MI2 block, including prior v23.1.116–v23.1.131 additions, from loading. v23.1.133 repairs that helper's scope *within the original MI2 source file* so all preexisting intended data additions and correction logic run again. The actual runtime audit (base MI, complete MI2, and all four Michigan manifest supplements) is the QA acceptance basis, **not** a partial static count.

**Net accepted inventory change relative to functional v23.1.131 baseline:** `+1` public overnight private campground, Bluegill Lake Family Camping Resort, at operator GPS **43.696331,-85.228844** (https://www.bluegillcamping.com/contact-us.html); `-1` existing active Hungerford Equestrian Group Campsite whose marker incorrectly reused the distinct Hungerford Horse Camp coordinates. Recreation.gov (https://www.recreation.gov/camping/campgrounds/234678) confirms that the separate group facility is about 1.25 miles *north* of the main camp. The group opportunity is retained in the canonical lead `mi-v231132-newaygo-hungerford-equestrian-group-coordinate-rescue` until direct official campground-specific RIDB/GIS coordinate rescue allows a correct active marker. Preserve the valid main Horse Camp pin unchanged. Retiring this one materially wrong location is source-backed, not an assumption that group camping is prohibited.

**Needs Verification:** `pending-mi-015` Indian Lake and `pending-mi-019` Shelley Lake were stale preexisting pending duplicates of v23.1.115 active sites. Their removal remains correct; all other pending records stay intact.

**Expected runtime QA:** MI total `771`; six previously listed USFS campgrounds have only their original five real source records (plus the now-retired group represented as a lead), and new Bluegill once; Oak and Poplar remain Rustic; Menominee Grayling correction and historical additions execute. County closeouts remain **0/83**, both Mecosta and Newaygo **OPEN**. MMAT's older v23.1.132 numbers reflect the superseded candidate-based interpretation, not the authoritative current active count.

## Worker / supervisor handoff rule

Every handoff must explicitly instruct the recipient to **read and follow both the current ChatGPT project settings and the current repo `PROJECT_RULES.md` before starting**. Include `REQUIRED BASELINE PREFLIGHT`, a precise named geographic lock, and `RETURN ACCEPTANCE GATE` using the outcomes applicable to that assignment, as required by current `PROJECT_RULES.md`. A polished partial inventory, zero-result TinyFish call or incomplete manifest reconciliation never qualifies as `COMPLETE`.


## v23.1.134 batch-end integration, 2026-10-14

**8 active additions, 771 to 779 Michigan runtime, 0/83 county closures:** River Ridge RV Resort (Mecosta County 43.58164,-85.53218); CranHill Ranch Family Campground (Mecosta County 43.716942,-85.373779); Chinook Campground (Newaygo County 43.34705,-85.936); Salmon Run Campground & Vic's Canoes (Newaygo County 43.39072,-85.83216); Mystery Creek Campground (Newaygo County 43.38063,-85.87097); Timbers Edge Campground (Newaygo County 43.632383,-85.942665); Adventure Bound West Michigan (Newaygo County 43.47371525,-85.74699567); Little Switzerland Resort & Campground (Newaygo County 43.4527,-85.808). Private layer. All are operator-proved overnight campgrounds with named campground-area point cross-checks; guide points, never individual campsite GPS.

**Canonical ledger:** 6 promoted Newaygo leads retired and `pending-mi-020` removed after promotion. 13 unresolved Newaygo/Mecosta county-roster cases added to `data/leads.js` with source/blocker, including Croton Dam Float Trips, Sarns, fair-event camping and ten club/mobile-home/alias exceptions. Hungerford separate northern group coordinate still held. Other pending/rejected records unchanged.

**Source:** TinyFish Search/Fetch retrieved the previously inaccessible Newaygo Hazard Analysis 2026 PDF at https://www.newaygocountymi.gov/wp-content/uploads/2025/11/2026-Newaygo-County-Hazard-Analysis.pdf containing 43-site historical 2025 county campground table. Treat as credible inventory, not automatic live public booking proof. County-wide nonmodern, township, dispersed, canoe, and private exception closures remain undone. **Mecosta and Newaygo OPEN**. Next: finish those source anchors then Lake/Oceana. Import accepted discoveries at each bounded batch end as Tod directed.


## v23.1.135 microbatch integration, 2026-10-14

**ADD (1) Rustic / Primitive:** Hungerford Equestrian Group Campsite, Newaygo, **43.7166667, -85.6244444**. Direct first-party Recreation.gov JSON `https://www.recreation.gov/api/camps/campgrounds/234678` publishes campground facility `facility_latitude` and `facility_longitude`; official text places reservable group facility 1.25 mi north of main Horse Camp. USFS group webpage repeats incorrect main Horse Camp position `43.70166667,-85.62222` and must NOT override Recreation.gov facility coordinate. New unique `mi-v231135-hungerford-equestrian-group-campsite` added after v23.1.133 retirement of mislocated original. Canonical lead `mi-v231132-newaygo-hungerford-equestrian-group-coordinate-rescue` retired. 779 → 780 active Michigan runtime. 0/83 counties closed. Coordinates are facility guide point, not campsite pad.


## v23.1.136 Newaygo named-operator microbatch, 2026-10-15

**Geographic lock:** Newaygo County, Bitely/Lilley Township Pickerel Lakeside plus Croton Drive campground verification; existing Croton Township active layer review. **Baseline:** `de9fefc46db58ffc83979781faef54687a0f073c`, v23.1.135. TinyFish Search (4 bounded operator/official queries) and TinyFish Fetch (operator campground, rates, directions, campground map asset links), followed by independent operator/OSM and named-map-provider comparison. No TinyFish Agent run was necessary (no gated interaction). No false claim of county completion.

**ADD (1) Private Campgrounds:** Pickerel Lakeside Campground and Cottages, `43.78325,-85.8467`, **operator** https://lakecamp-cottages.com/campground/ and https://lakecamp-cottages.com/directions/ prove 45 public transient sites and actual driveway/site-map, with 2026 campsite-map asset; named **OpenStreetMap** campground node `2933398157` https://www.openstreetmap.org/node/2933398157 gives campground-area position. Coordinate is an honest approximate facility guide, not an individual pad, office, lake center or road navigation point. **PROMOTE:** retire the previously unresolved `mi-v231128-tinyfish-lead-pickerel-lakeside-campground-and-cottages` from `data/leads.js`. Other similarly named Pickerel Lake State Forest Campgrounds are geographically distinct and unchanged.

**EXISTING ACTIVE RECORD LAYER CORRECTION (1):** Croton Township Campground `s225` remains at `43.4463922,-85.658117`; layer moves **Rustic → Modern** because https://www.crotontownshipcampground.com/campsites-rates unambiguously states electric hookup **at every campsite**, dump and water-fill services, with 2026 short-stay online booking. The earlier rustic correction-risk narrative was stale/inconsistent with this operator proof, so it was corrected in place. Position, cost details and valid existing facts preserved.

**NEEDS VERIFICATION / NO NEW PIN (2):** Happy Campers Campground https://www.happycampers5380.com/prices-and-sites (5380 Croton Drive) and Croton Dam Float Trips https://www.crotondamfloattrips.com/home-1 (5355 Croton Drive) both currently offer overnight camping, but presently identified campsite point coordinates rely on Campendium/The Dyrt user-review directories. These are discovery leads **only**, not final coordinate proof. Their canonical lead blocker/acquisition paths are updated; obtain named operator parcel/OSM/Apple/Google campsite feature or agency GIS, checking that the adjacent businesses are genuinely distinct, then promote at the next qualified batch. Both belong in `data/leads.js`, with no dishonest Needs Verification map pin.

**QA:** All six MI manifest runtime inputs checked in order. Original 780 Michigan active records; **781 after this addition**, with 1 correction only, no lost or duplicated original sites; no close-coordinate collision within 0.15 mile for Pickerel; leads promoted -1, rejects 0, pending 0; manifest count 781; `version.js` unified app/data v23.1.136 and original `index.html` loads authoritative version.js dynamically. **0/83 counties closed**. Next: Croton Drive coordinate rescue followed by the remaining Mecosta/Newaygo townships, dispersed/water-access inventory, then Lake/Oceana.


## v23.1.137 Croton Drive adjacent campgrounds, 2026-10-15

**Geographic lock:** Newaygo County, Croton Drive near Croton Dam. **Baseline:** v23.1.136, `dd730a95c5f12f4e79bd19182cba2464dae4a668`. TinyFish Search/Fetch previously confirmed both current operators and official Newaygo County 2025/2026 campground inventory. Two independent TinyFish **Agent** runs accessed dynamic Apple Maps named venue listings and retrieved exact map place coordinates from their place URL, IDs, categories and distinct operator addresses. Agent runs: Croton `c1aa1f22-3707-4f75-bab4-7d0e7f4d3405` (9 steps, 53 seconds); Happy Campers `f6eb56fe-7d0e-4659-a655-cd48316bdaf5` (4 steps, 21 seconds). Run IDs and outcome are preserved; cost unrecorded, not guessed.

**ADD (2) Private Campgrounds:** (1) **Croton Dam Float Trips Camping** `43.436519,-85.667831` at **5355 E Croton Drive**, named Apple Maps place ID `I6D13D0EEA9744D73`, category Campground. Official/operator proof https://www.crotondamfloattrips.com/home-1 and https://www.crotondamfloattrips.com/ ; historical 2025/2026 county table lists 24 sites. (2) **Happy Campers Campground** `43.435942,-85.668268` at **5380 E Croton Drive**, named Apple Maps place ID `I18239E42EC241FB3`, category RV Park. First-party proof https://www.happycampers5380.com/ and posted campground map link https://www.happycampers5380.com/prices-and-sites . Apple venue-specific coordinates were recovered from actual place URLs (not search result center, arbitrary coordinates or reviewed campground GPS). Both operator websites independently offer paid public overnight camping; address/phone/name/property are distinct despite being adjacent. Coordinates are **approximate named campground facility guide points, not individual campsite pads nor guaranteed exact entrance**. Final map proof: operator + named commercial map POI, not user reviews.

**Lead closure:** `mi-v231128-tinyfish-lead-happy-campers-campground` and `mi-v231134-followup-croton-dam-float-trips-camping` retired after promotion. No new Needs Verification map records and no rejected changes. No existing active duplicates by all six Michigan runtime-loaded files; newly imported pins are approximately 0.045 mile apart, deliberately retained as independently named/operator-backed places, not coordinate clones; nearby existing Croton Township Campground is more than 0.8 mile away.

**QA:** Existing 781 MI runtime records → 783 with both imports, no original record removals or revisions; manifest MI count 783, unified `version.js` app/data v23.1.137, original map icon/layer/runtime structures untouched. **0/83 counties closed.** Next: remaining Newaygo/Mecosta operator and township exceptions, county 2025/2026 inventory, water/boat and dispersed camping source sweeps; then Lake/Oceana.


## v23.1.138 Pettibone policy and Lonesome coordinates microbatch, 2026-10-15

**Geographic lock:** Newaygo County / northern Bitely and Pettibone Lake. **Base:** `6343bc0ba618670c58e1bb0944f1ab42908a1fde`, v23.1.137. TinyFish Search and direct current county Parks recreation-plan/first-party operator verification. TinyFish Apple Maps Agent run `391e4d88-dd6e-42ea-8560-1c3b0f44f2e9`, 14 steps/118 seconds, returned zero named Lonesome campground coordinates; no cost inference. No completed county closure.

**REJECT / DO NOT IMPORT:** **Pettibone Lake County Park (former campground)**, 490 Pettibone Drive, Bitely. Official [Newaygo County 2023–2027 Recreation Plan](https://wmsrdc.org/wp-content/uploads/2023/01/Newaygo-Co-Rec-Plan_2023-2027-2.pdf), p.17, unambiguously states *day-use only* and *No camping is permitted*; p.20 identifies conversion from former campground to day-use. A separate [2026 Hazard Analysis](https://www.newaygocountymi.gov/wp-content/uploads/2025/11/2026-Newaygo-County-Hazard-Analysis.pdf) repeats a stale 16-site campground entry, not present public overnight authorization. Remove old Pettibone lead `mi-v231128-tinyfish-lead-pettibone-lake-park-camping-area`; add a specific `data/rejected.js` record with source conflict, rejection and conditions for reopening. No active or Needs Verification pin.

**NEEDS VERIFICATION / EXTERNAL ACCESS REQUIRED:** **Lonesome Lake Campground**, 318 W 18 Mile Rd, Bitely, operator https://lonesomelakecampground.com/ currently offers occasional nightly/transient stays at seasonal campground. Apple Maps has **no named campground POI** for this property; generic geocoded address is not a camping pin. Preserve lead `mi-v231128-tinyfish-lead-lonesome-lake-campground`, record Agent failed coordinate rescue and request a named OSM campground footprint, parcel/aerial site map or operator-confirmed entrance GPS (210-667-6163, llcampground@yahoo.com). Do not invent a lake-center proxy.

**Batch QA:** Michigan runtime active record count **unchanged at 783**; no new import or layer correction. `data/leads.js` 2027→2026 (one Pettibone lead retired, Lonesome updated); `data/rejected.js` 811→812 (one explicit no-camping rejection); pending unchanged; manifest Michigan count 783; unified `version.js` v23.1.138; **0 of 83 counties closed**. Next geographic work: other named Mecosta/Newaygo exceptions and township/river/dispersed matrix, then Lake/Oceana.


## Mecosta Sarns Resort live-operator checkpoint 2026-10-15 (research only, no app release)

**Geographic lock:** Mecosta County / Morley / Sarns Resort, 4398 Newcosta Ave. **Baseline:** v23.1.138, commit `129299eaf080d6b7a415d1c89fec9bbbe20c4b91`. TinyFish Search queried Sarns campground overnight stays, current reservations, sold/for-sale status and 2026 records. TinyFish Fetch checked the local [Mecosta County tourism directory](https://www.bigrapids.org/member-detail/sarns-resort/) and a [2026 property sale listing, MLS 26047198](https://www.eaglerealtymi.com/real-estate/michric-mls/property/26047198-4398-newcosta-avenue-parcel-b-morley-mi-49336/). No Agent necessary; no active new campground import.

**EXTERNAL ACCESS REQUIRED / maintain lead:** Sarns remains listed by local tourism organization as an overnight campground with rustic/full-hookup sites, cabins, docks and showers, 4398 Newcosta Ave, phone **(231) 598-0422**. 2026 real-estate marketing describes existing campground as for sale, including 100 sites and cabins; **for sale does not mean closed or unavailable for bookings**. However independent **current transient booking/operating status, owner handoff and exact campground-area location** were not confirmed by these sources. Retain existing `mi-v231134-followup-sarns-resort` in `data/leads.js`; no unproved public camping pin and no closure rejection. **Next acquisition:** Call current published resort phone **(231) 598-0422**, ask (1) whether nonmember public transient campsites are currently bookable through 2026/2027, (2) exact operator/booking link and seasons, (3) campground-site entrance map or named campground feature/GPS, and (4) whether sale/ownership transfer affects operations. If unreachable, contact Mecosta County visitor bureau / listing agent for current operator and use county GIS/parcel or operator map to verify grounds, not office/lake center.

**QA:** No app/data/ledger source changed and no version increment for this research-only checkpoint. Michigan remains **783 active map records, 0/83 counties closed**. TinyFish proved old operator campground presence but did not find current 2026 transient booking proof; no fabricated closure or false coordinate.


## v23.1.139 Newaygo White Cloud/Hardy Pond microbatch, 2026-10-15

**Geographic lock:** White Cloud / Hardy Pond / Seaman Lake. Base `7f9aa436110d1b135a179c6216905b43e5c13c29`, v23.1.138; current full baseline required files (all six MI runtime inputs, leads, rejected, pending, rules, manifest) read and checked. TinyFish Search/Fetch discovered current [Sportsman Park operator](https://sportsmanparkcampground.com/) seasonal and limited rustic camping/online rental, and [Camp Michigan directory](https://campmichigan.com/campground/leisure-time-rv-park-llc-manistee-national-forest/) lists Leisure Time RV Park as an actual RV camping business with hookups and campground amenities. Two TinyFish Agents targeted **Apple Maps named campgrounds**: Sportsman run `d5833f35-6f45-4214-825f-72d5b1a84e0a`, 4 steps/16s, place ID `IF00C382A6AB7E989`; Leisure Time run `64e5bb33-e08a-4209-8f16-0d168eacc0cb`, 5 steps/19s, place ID `I984719E8DFD73243`. Costs not inferred.

**ADD (2), Private Campgrounds:** Sportsman Park Campground & Boat Slips **43.509786,-85.633291** at 2500 S Sportsman Dr; private seasonals, limited overnight rustic spots by phone and bookable 5th-wheel rental. Leisure Time RV Park LLC **43.468291,-85.743055**, 4799 S Spruce Ave, open RV campground association listing with operator seasonal/weekender context; exact nightly availability by phone. Apple coordinates directly embedded in unique named-place URLs, not search centers or campground user-review pins. Both guide points are campground facilities, not individual pads. No full modern campground service claims inferred for rustic-only spots.

**Dupes/QA:** Six Michigan manifest-loaded runtime files executed, **783 → 785**, both new names unique. Nearby Sandy Beach County Park (0.70mi) and Adventure Bound West Michigan (0.42mi) are distinct physical campgrounds, operators and addresses. Promote/retire exactly two historical leads `mi-v231128-tinyfish-lead-sportsman-park-campground-and-boat-slips`, `mi-v231128-tinyfish-lead-leisure-time-rv-park`. Rejected and pending unchanged. Michigan manifest count=785; unified app and data `version.js` v23.1.139; data updated within original `data/states/MI2.js`; no app UI or other state changes. **0/83 counties closed**. Next: finish Newaygo named facility/club exceptions, then non-modern/dispersed/water trail and Mecosta remainder, before Lake/Oceana.


## v23.1.140 Newaygo Dragon Trail campground site, 2026-10-15

**Geographic lock:** White Cloud / Hardy Dam Dragon Trail corridor. Parent baseline `64a94b25dd485be4af22c84ec08ca23fa1666590`, v23.1.139. TinyFish Search found Newaygo County Tourism Council listing and [first-party Dragon Adventures Base Camp website](https://dragonadventuresbasecamp.com/), TinyFish Fetch confirmed [operator campsite page](https://dragonadventuresbasecamp.com/camping/) and [separate two-location contact page](https://dragonadventuresbasecamp.com/contact/). Three operator-listed 30-amp water/electric campsites #2,#3,#5, rustic/group camping, and overnight van/truck accommodations are bookable. No single site pads inferred.

**ADD (1), Private Campgrounds:** Dragon Adventures Base Camp Campground at **43.525596,-85.633390**, camping property operator address **6782 E 16th St, White Cloud MI 49349**. TinyFish Agent `3d53fcc2-70bc-4010-8007-42ebb3ed7e30` (6 steps/24s) extracted an exact named [Apple Maps venue URL](https://maps.apple.com/place?place-id=I7E10F4DC160866BB) with the matching campground address. Venue category Sports Club, but campground existence/overnight proof is **from operator**, and Apple named property point is an approximate campground-area guide (not a campsite pad). **STORE/Rentals at 6372 E 36th St is a separate address and expressly must not be used for camping pin.** Other named campgrounds within 2 mi verified distinct: Sportsman Park 1.09mi, Sandy Beach County Park 1.78mi, Oxbow Park 1.92mi. No matching active/lead/rejected/pending record. No TinyFish cost asserted.

**Official USFS county preflight findings:** Huron-Manistee campground directory pages 0–5 examined; Highbank Lake, Nichols Lake South and Walkup Lake are officially Newaygo County sites with Forest Service campground coordinates, but all three were already active in Michigan runtime at exact matching published USFS coordinates. **Existing, no duplicate import.** Additional directory facilities in other counties not imported in this county lock.

**Batch QA:** Active Michigan records 785→786; one operator-source-backed named new facility, zero existing record changes/coordinate moves, no lead/rejected/pending changes. Unified version `v23.1.140`, manifest count 786. **Mecosta/Newaygo remain OPEN and statewide county closures 0/83**. Continue geographic county inventory, canoe/backpack/dispersed and remaining named operator exceptions, then Lake/Oceana.


## 2026-10-15 Mecosta tourism named-directory closure (research checkpoint, no version bump)

**Geographic/source lock:** Mecosta County tourism organization [Big Rapids campground list](https://www.bigrapids.org/campgrounds/), currently **15** named members. TinyFish Fetch (official tourism member list and member-detail links) followed by full-runtime original `data/states/MI.js` + `data/states/MI2.js` and manifest supplement/name reconciliation. The source list has a category catch-all, not a certification that every member offers regular open-to-public nightly camping. **Do not mark Mecosta County COMPLETE.**

**Previously active, no duplicate add (11 directory entries):** River Ridge RV Resort; CranHill Ranch Family Campground; Mecosta Pines Campground; Bluegill Lake Family Camping Resort; Brower Park; Merrill-Gorrel County Park (name uses hyphen, existing `s602`); Paris Park; School Section Lake Veterans Park; Haymarsh Lake Campground; Tubbs Lake (existing **mainland and island** units); and Ivan's Campground & Cabins (Lake County / Baldwin, outside this county geographic lock, already active `s435`). Thus **10 Mecosta members already on map, plus one cross-county directory listing already on map**. Do not silently add more campsites because one directory member corresponds to two genuine camping components.

**Four nonactive directory members disposition:** (1) Sarns Resort remains a named unresolved `data/leads.js` entry for **current 2026 public bookings and campground-specific facility map**, despite tourism listing and real estate sale; not proof of closure. (2) Davis Bridge Boat Launch/park is already an official **no public camping** reject; do not reopen from the tourism member-category label. (3) Fort Faith Baptist Bible Camp, 5005 210th Ave, Morley, is an organized religious camp; not established as a generally bookable public camping facility. No overnight-general-public claim from the directory; written nonimport decision, investigate only if operator itself advertises public individual bookings. (4) Mecosta MX, 8636 11 Mile Rd, is a motorsport venue. The tourism campground category itself and race/event access are not proof of regular public campsite operation; written nonimport/false-positive category decision, reopen only on separate operator overnight policy. No evidence warranting a new Needs Verification dot or rejected camping site just from these tourism labels.

**Result:** All 15 tourism directory names explicitly accounted for; **0 new imports**, 0 unresolved leads lost, 0 new rejects or pending. No app/data file changes or version bump; map remains **v23.1.140 with 786 Michigan runtime camping records** and **0/83 county closures**. Continue official Newaygo 2025/2026 roster exceptions (e.g., K and K, Cindy Lou, clubs), Mecosta off-directory townships, water-access/backpack, and dispersed rule matrices, retaining exact provenance/coordinate standards.


## v23.1.141 Newaygo Lonesome Lake named-map coordinate rescue, 2026-10-15

**Geographic lock:** northern Newaygo / Bitely / 318 W 18 Mile Rd. Parent baseline `4ec1162309c70ab6fa5fc79fea183bf9bd2e8510` v23.1.140. TinyFish Search/Fetch again verified [operator source](https://lonesomelakecampground.com/) currently advertises occasional **public transient** overnight camping for $30/night alongside seasonal sites. Previous TinyFish Apple Agent `391e4d88-dd6e-42ea-8560-1c3b0f44f2e9` had failed to find named POI. **New Google Maps TinyFish Agent** `340c2f51-f79a-4cc0-91f3-6d7abd39c956` (8 steps, 39 sec) located [uniquely named Lonesome Lake Camp Ground POI](https://www.google.com/maps/place/Lonesome+Lake+Camp+Ground/@43.813136,-85.808943,17z/data=!4m15!1m8!3m7!1s0x881ecef43743131b:0xf52139f3adba828b!2sLonesome+Lake+Camp+Ground!8m2!3d43.813136!4d-85.808943!10e1!16s%2Fg%2F11cn3j863q!3m5!1s0x881ecef43743131b:0xf52139f3adba828b!8m2!3d43.813136!4d-85.808943!16s%2Fg%2F11cn3j863q), category **Campground**, unique Google Maps place ID `0x881ecef43743131b:0xf52139f3adba828b`, matching operator name, address, phone, and website. POI coordinate **43.813136,-85.808943**, not road center or lake center. Photo/review data not used as proof. No cost inferred.

**ADD (1), Private Campgrounds:** Lonesome Lake Campground 53 mostly seasonal spaces with operator-offered limited nightly transient RV/tent stays. Show seasonal availability caveat and facility guide coordinate precision, not exact campsite pad. Existing Pickerel Lakeside is 2.795 miles away, a distinct operator/site; no other active within 3 miles, no pending/rejected name match. Retire lead `mi-v231128-tinyfish-lead-lonesome-lake-campground` after real coordinate rescue. **Historical lead previously held due absent named Apple POI is closed by a different authoritative named map provider; the prior failed Apple lookup is preserved for TinyFish effectiveness accounting.**

**QA:** 786 Michigan runtime records→**787**; 1 new site; leads -1, pending/rejected 0, manifest 787, unified app and data version `v23.1.141`; no unrelated changes. **0/83 counties closed**, still need remaining named Newaygo roster/USFS state and dispersed/canoe matrix, plus Mecosta county-wide closeout before Lake/Oceana.


## Newaygo small-operator / Hideaway alias research-only batch, 2026-10-15

**Geographic/source lock:** Newaygo County, Hesperia 6245 N Comstock Ave and select 2025/2026 public-health roster exceptions at Whitneyville / White Cloud. **Base:** live main `f89ed52671e6a3ae76329a86a054dc2f5d8fbb1f`, unified `v23.1.141`, 787 Michigan runtime camping records. Pass type: bounded PROOF/COORDINATE RESCUE, not a county closure or an Oceana search.

**Cindy Lou's Hide A Way / Smitty's Hideaway & Campground, 6245 N Comstock, Hesperia:** [2025 official Newaygo Community Profile](https://www.newaygocountymi.gov/wp-content/uploads/2025/03/2025_Newaygo_County_Community_Profile.pdf) lists Cindy Lou's Hide A Way at this address with 22 camping sites. Independent public web search surfaced older **Smitty's Hideaway Campground** at the identical 6245 N Comstock address and phone 231-854-0230 ([historic directory](https://michigan-campground.county-office.com/smittys-hideaway-campground-mi-campground/)). [MapQuest Smitty entry](https://www.mapquest.com/us/michigan/smittys-hideaway-campground-441026938) marks *Smitty's* permanently closed, but this is not current official proof that the newer Cindy Lou's listing is closed or open. Historical USGS/topographic Smitty named feature reported near 43.66167,-85.99944; this historic mapped feature is **not** proof of today's campground entrance/pads.

**TinyFish effectiveness:** Search 2025 official listing found Cindy Lou but did not independently resolve Smitty alias or current operator. Fetch obtained March 2025 county PDF text, MapQuest closure label and historic directory address. Targeted Google Maps Agent run `29c16328-249f-4b10-acf7-9b7523607a5d` ([run](https://agent.tinyfish.ai/runs/29c16328-249f-4b10-acf7-9b7523607a5d), 18 steps / ~92 sec) found **no named campground POI under either name** at 6245 N Comstock, only a generic *building/address* result 43.6664589,-86.0021027. That point is expressly **not** a campsite or campground-entrance pin. The historical named USGS map point and current generic street address are separated; do not swap either in as an asserted current campsite. The agent's unrelated Hideaway result in Mears is a different Oceana County property, not an alias. Search/Fetch/Agent are separate stages; absence of POI is not proof of shutdown.

**Final action — NEEDS VERIFICATION / MATCHED EXISTING LEAD — STILL BLOCKED:** retain existing `mi-v231128-tinyfish-lead-cindy-lou-s-hide-a-way`; add Smitty's as same-address **possible prior name**, not a second independent candidate. Do not activate, move to another camping layer, use the generic address as a campsite, or reject from third-party closed label alone. **Exact next acquisition:** District Health Department #10 current licensed campground operator/status record, Newaygo county campground contact or operator by name/phone 231-854-0230, and property-specific site/aerial mapping to establish real campground footprint and public short-stay access. Only then promote with honestly named facility coordinate.

**Two additional existing-roster exceptions screened:** `mi-v231134-followup-k-and-k-camping-llc` (7701 Whitneyville Rd) and `mi-v231134-followup-shi-lo-cum-vhf` (2940 N Felch Ave) appear in county inventories, but TinyFish exact-name searches and independent public web returned no current first-party public/transient booking proof or safe campground-specific position. Both retain their existing `data/leads.js` records; no invented closure or active pin. Continue with local health district/current licensed campground status and operator contacts. Non-modern USFS and water-access/dispersed camping matrices were **not** closed by this narrowly scoped pass.

**Batch outcome / QA:** **0 active imports**, **0 corrections**, **0 rejected additions**, **0 lead deletions**, **0 coordinate changes**, **0 new layer records**. Existing source leads remain named and accountable; **787 active Michigan records**, `v23.1.141` unchanged, **0/83 counties closed**. Checkpoint/ledger only. **Next geographic slice:** remaining Newaygo non-modern / water-access / dispersed official matrix, and Mecosta off-directory / township matrix, then Lake + Oceana.

## 2026-10-15 Newaygo DNR/USFS camping-rule cross-check (research checkpoint, no version bump)

**Geographic lock:** Newaygo County, Oak/Poplar Newaygo State Park and Manistee NF/Twinwood Lake; narrow PROOF / duplicate and rules review (not full county discovery). **Base:** v23.1.141 live Michigan MI.js/MI2.js and tracker.

**DNR duplicate/layer result:** [Michigan DNR Newaygo State Park](https://www.michigan.gov/recsearch/parks/newaygo) directly confirms two separate rustic campground loops, **Oak #1–48** and **Poplar #49–99**, 99 sites total, and expressly **no electric, showers or modern restrooms**. Corresponding active map records `s653 Oak CampGround` (43.502883,-85.584532) and `s737 Poplar Campground` (43.504505,-85.590069) were previously corrected to **Rustic / Primitive** by `data/states/MI2.js` v23.1.128 patch. **Final action ALREADY CORRECT — NO ACTION; no third Newaygo State Park camping dot**, no launch/office proxy. Unresolved old `mi-v231115-w6-g-newaygo-state-park-rustic-campgrounds` lead is redundant with named existing two loops; review for future ledger retirement in an authorized data-integration pass, not another pin.

**USFS developed camping:** Federal [Bigelow-Newaygo environmental assessment](https://www.fs.usda.gov/emc/nepa/revisions/includes/docs/restoration/proposedces/bigelownewaygo-ea.pdf), in Newaygo County, explicitly identifies **Twinwood Lake** as the sole federally managed developed recreation site in that project footprint and describes fee-supported camping. Corresponding active `mi-v231115-twinwood-lake-campground` is already in MI2.js at 43.47594802,-85.76753603, Rustic / Primitive. **ALREADY CORRECT / NO DUPLICATE.** This finding is for the *Bigelow-Newaygo project footprint only*, not a claim that Twinwood is the county's sole federal campground. Earlier county directory review already accounted for Highbank Lake, Nichols Lake South and Walkup Lake; do not duplicate those either.

**USFS dispersed camping/rule-area:** [Huron-Manistee NF official Camping & Cabins](https://www.fs.usda.gov/activity/hmnf/recreation/camping-cabins/?actid=33&recid=18536) allows dispersed primitive tent camping on National Forest land outside developed campgrounds except posted prohibited areas and expressly forbids dispersed camping **within 200 feet of water**. The Bigelow-Newaygo assessment separately documents camping on its southern federal tracts without developed recreation facilities; these are **area/rule opportunities**, not named campsite pads. **Final action AREA / RULE GEOMETRY REVIEW — NO ACTIVE PIN ADDED**. Before active representation, reconcile existing Federal Areas/boondocking overlays and National Forest surface/ownership geometry, current forest orders/MVUM roads, excluded parcels and boundary against selected-state display. Do not select an arbitrary forest center, trailhead, boat launch, river bank, road pull-off, or facility office as a camping point. Distinguish legally available area from vehicle-accessible locations.

**QA/result:** 0 added, 0 removed, 0 retargeted, 0 coordinate changed. Version stays **v23.1.141**, Michigan runtime camping count **787** and county closure **0/83**. The full Newaygo canoe/water-access camp matrix and legal dispersed geometry are **still OPEN**; remaining Mecosta/Newaygo subareas remain OPEN, Lake/Oceana are queued.


## v23.1.142 Mecosta county private roster, 2026-10-15

**Baseline:** 4f6a60f791409947a1027cfbde7c0e9cb8691f34 at v23.1.141, 787 Michigan records. **Source and geographic lock:** Mecosta [official 2026-2030 parks master plan](https://www.mecostacountyparks.com/uploads/9/2/6/3/92633552/final_approved_-_mecosta_parks_and_rec_plan_2026.pdf), Private Campgrounds table, page 31. Eleven names reconciled: four already active (Bluegill Lake, CranHill Ranch, River Ridge RV Resort, Mecosta Pines); Sarns Resort prior unresolved lead remains; one new active Gray's; one nonpublic Canadian Lakes reject; four new leads Holiday Terrace, Speed's, Tubbs Resort and Youngs Lake. Also park immediately prior Newaygo White River Roughing Area historic name as new non-active lead.

**ADD Private (1):** Gray's Riverside Campground, 14161 New Millpond Rd, Big Rapids MI, coordinates 43.6731027,-85.4477326 from [Google named Campground POI](https://www.google.com/maps/place/Gray's+Riverside+Campground/@43.6731027,-85.4477326,17z/data=!3m1!4b1!4m6!3m5!1s0x8818d3e7322b6d93:0x38f8295deda9b966!8m2!3d43.6731027!4d-85.4477326!16s%2Fg%2F11rd_dv086) place 0x8818d3e7322b6d93:0x38f8295deda9b966. Current [operator](https://graysriversidecamp.com/) offers RV/tent camping; [operator-written bookable listing](https://www.hipcamp.com/en-US/land/michigan-gray-s-riverside-camp-9mxhwvkn) describes instant-bookable RV/tent camping, hookups and showers; first-person host confirms public eligibility. TinyFish Google Maps Agent [run](https://agent.tinyfish.ai/runs/9eac073a-a3cd-432a-9e4e-22efc06df964), 3 steps/17 sec, uniquely matched venue category/address/phone/website; point is campground grounds guide, not campsite pad. No same-name duplicate across MI runtime/supplements/pending/leads/rejected; nearest named active ~4.78 mi (CranHill). County says 22 sites but operator listing says 13; do not assert current count.

**Nonpublic REJECT (1):** Canadian Lakes Campground, [CLPOC official Article II campground rules](https://canadianlakes.org/wp-content/uploads/2026/02/CanadianLakesRules-2.3_editedbyLMH2.pdf) allow member reservations and member-sponsored guests rather than direct bookings by unaffiliated public; campground is real, 370 licensed sites, but not general public. Reopen only if owner/operator policy changes. No active/Needs Verification point.

**New durable leads (5):** Mecosta Holiday Terrace Campground (2026 county four spaces vs mobile-home residential directory, no transient policy); Speed's Campground (county 20 sites, no present operator/point), Tubbs Resort (county 60, no present private operator/point; distinct existing DNR Tubbs Lake Mainland/Island sites), Youngs Lake Campground (county 160, old location listings but no operator-confirmed current nightly booking and safe site coordinate), plus Newaygo White River Roughing Area Campground (historic topographic named locale with no current camping legality). Each added to `data/leads.js` with targeted operator/county-health/GIS acquisition path, not fabricated pins. Legacy Sarns prior lead retained. No ad hoc state/layer creation.

**TinyFish method:** Search six named county exceptions, operator/official pages; Fetch CLPOC campground Article II and current county plan; Google Maps Agent one uniquely named Gray's venue; 2026 operator bookings cross-check. No agent dollar cost inferred. **QA:** 787→788 active MI; 1 new private; five new leads; one rejected; 0 removals; 0 old coordinates/layers changed. Manifest 788, shared `version.js` v23.1.142 for app and data; unchanged app.js/index.html runtime and config.js. County closeouts 0/83. **Next:** bounded Youngs Lake/Speed's/Tubbs operator/license chase or Newaygo canoe/dispersed geometry; Mecosta/Newaygo remain OPEN, Lake/Oceana still queued.
