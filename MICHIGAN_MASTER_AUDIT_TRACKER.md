# MMAT: Michigan Master Audit Tracker

**Scope:** All 83 Michigan counties, plus cross-county public-land and water-access systems accounted for under their actual geographic footprints.  
**Established:** 2026-10-14. **Audit baseline:** GitHub `main` at `v23.1.131`, commit `1d24d3a9bb77019ccfeafb0169253384ea7bbf09`.  
**Binding rules:** [PROJECT_RULES.md](PROJECT_RULES.md). Always reread current live `PROJECT_RULES.md` and project settings before any research, edits, worker handoff, import or county closure.

**This file is the durable, canonical county-closure tracker. It is not itself camping-site data.** Campsite records remain in the established map files and investigation ledgers. Do not manufacture counts, site positions, or county closure status.

## Statewide rollup

- **Counties:** 83 total (15 Upper Peninsula, 68 Lower Peninsula).
- **Closed against the full current-source audit standard:** **0 / 83**. Existing statewide releases and earlier campground corrections are NOT evidence that every county has completed the full current discovery matrix.
- **County work partially documented:** Mecosta, Newaygo, Keweenaw, Menominee, Wayne. Partial means evidence or integration exists; it does **not** mean all county targets were found and reconciled.
- **Current Michigan map manifest count:** 771 in `data/states-manifest.js` at the initial baseline. This count may change; verify the live manifest after each integration.
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

## Worker / supervisor handoff rule

Every handoff must explicitly instruct the recipient to **read and follow both the current ChatGPT project settings and the current repo `PROJECT_RULES.md` before starting**. Include `REQUIRED BASELINE PREFLIGHT`, a precise named geographic lock, and `RETURN ACCEPTANCE GATE` using the outcomes applicable to that assignment, as required by current `PROJECT_RULES.md`. A polished partial inventory, zero-result TinyFish call or incomplete manifest reconciliation never qualifies as `COMPLETE`.
