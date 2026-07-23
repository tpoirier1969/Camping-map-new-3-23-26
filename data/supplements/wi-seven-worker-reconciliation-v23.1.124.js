// Tod's Boondocking & Camping Maps — Wisconsin seven-worker reconciliation v23.1.124
(function(){
  'use strict';
  const VERSION = "v23.1.124";
  const FILE = "data/supplements/wi-seven-worker-reconciliation-v23.1.124.js";
  const DATE = "2026-07-23";
  const ADDITIONS = [
  {
    "stateCode": "WI",
    "stateName": "Wisconsin",
    "auditBatch": "v23.1.124 Wisconsin seven-worker boondocking and technical Supervisor reconciliation",
    "lastChecked": "2026-07-23",
    "dataCorrectionFile": "data/supplements/wi-seven-worker-reconciliation-v23.1.124.js",
    "dataCorrectionVersion": "v23.1.124",
    "dataCorrectionDate": "2026-07-23",
    "qualityGate": "four-blank-spot-plus-three-technical-worker-returns-supervisor-reconciliation",
    "id": "wi-dnr-van-loon-canoe-campsite-v23124",
    "name": "Van Loon Wildlife Area Canoe Campsite",
    "lat": 44.06145,
    "lng": -91.31016,
    "county": "La Crosse",
    "nearestTown": "Highway 53 Landing / Black River",
    "layer": "boat-backpack",
    "subtype": "official canoe-access primitive campsite",
    "categoryLabel": "Boat / Backpack",
    "layerLabel": "Boat / Backpack",
    "owner": "Wisconsin DNR — Van Loon Wildlife Area",
    "ownerLevel": "State",
    "rawCategory": "official one-site primitive canoe campsite",
    "markerType": "official-campsite-coordinate",
    "exactCampsiteLocation": true,
    "siteGeometryType": "Official county-licensed campsite coordinate corroborated by DNR property map",
    "locationPrecision": "High-confidence campsite coordinate; not the Highway 53 landing or parking area",
    "legalityStatus": "Verified Legal",
    "verificationStatus": "verified-legal-v23124-official-canoe-campsite",
    "website": "https://dnr.wisconsin.gov/topic/Lands/WildlifeAreas/vanloon",
    "sourceUrl": "https://dnr.wisconsin.gov/topic/Lands/WildlifeAreas/vanloon",
    "officialRulesUrl": "https://dnr.wisconsin.gov/topic/Lands/WildlifeAreas/vanloon",
    "coordinateSourceUrl": "https://frog.healthspace.com/Clients/WI/LaCrosse/web.nsf/module_facilities.xsp?module=Camps",
    "sourceName": "Wisconsin DNR and La Crosse County licensed-campground facility record",
    "description": "Official one-site primitive canoe campsite in the northern portion of Van Loon Wildlife Area. The campsite is reached by water and is separate from the Highway 53 landing and parking area.",
    "access": "Canoe or small-motorboat access from Highway 53 Landing. Vehicle access ends at the landing; river levels and flooding may affect access.",
    "amenities": "One primitive first-come campsite; no toilet, drinking water, electricity or developed services.",
    "reservationRequired": "No — first come, first served. Verify current DNR rules.",
    "userFacingCaution": "Official one-site primitive canoe camp. Access by canoe or small motorboat from Highway 53 Landing; do not camp at the landing or parking area. First come, first served. No toilet, drinking water or other services. This marker is the county-licensed campsite coordinate corroborated by the DNR campsite map, not a navigation waypoint. Verify river levels, flooding, posted State Natural Area restrictions, closures and landing availability before travel."
  },
  {
    "stateCode": "WI",
    "stateName": "Wisconsin",
    "auditBatch": "v23.1.124 Wisconsin seven-worker boondocking and technical Supervisor reconciliation",
    "lastChecked": "2026-07-23",
    "dataCorrectionFile": "data/supplements/wi-seven-worker-reconciliation-v23.1.124.js",
    "dataCorrectionVersion": "v23.1.124",
    "dataCorrectionDate": "2026-07-23",
    "qualityGate": "four-blank-spot-plus-three-technical-worker-returns-supervisor-reconciliation",
    "id": "wi-dnr-wood-county-wa-ball-road-seasonal-primitive-v23124",
    "name": "Wood County Wildlife Area — Ball Road Seasonal Primitive Camping Area",
    "lat": 44.302642,
    "lng": -90.168265,
    "county": "Wood",
    "nearestTown": "Ball Road / Wood County Wildlife Area",
    "layer": "rustic",
    "subtype": "seasonal designated primitive camping area",
    "categoryLabel": "Rustic / Primitive",
    "layerLabel": "Rustic / Primitive",
    "owner": "Wisconsin DNR — Wood County Wildlife Area",
    "ownerLevel": "State",
    "rawCategory": "official seasonal primitive camping area",
    "markerType": "official-geospatial-pdf-area-symbol",
    "exactCampsiteLocation": false,
    "siteGeometryType": "Official DNR geospatial-PDF campsite-with-pit-toilet symbol center",
    "locationPrecision": "Approximate camping-area center with estimated 50–150 metre uncertainty; not an individual pad, gate or parking point",
    "legalityStatus": "Verified Legal",
    "verificationStatus": "verified-legal-v23124-map-derived-seasonal-area",
    "website": "https://dnr.wisconsin.gov/topic/Lands/WildlifeAreas/woodcounty",
    "sourceUrl": "https://dnr.wisconsin.gov/sites/default/files/topic/Lands/woodcounty.pdf",
    "officialRulesUrl": "https://dnr.wisconsin.gov/topic/Lands/WildlifeAreas/woodcounty",
    "sourceName": "Wisconsin DNR — Wood County Wildlife Area property page and geospatial PDF",
    "description": "Official seasonal primitive camping area on the Ball Road side of Wood County Wildlife Area. The marker is the transformed center of the official campsite-with-pit-toilet map symbol.",
    "access": "Vehicle-to-designated-area access with associated parking. Follow signs and use the signed camping area; the marker is not the gate or parking lot.",
    "amenities": "Primitive camping area with pit toilet; no potable water. Self-registration required.",
    "cost": "Free; self-registration required.",
    "season": "Open only during spring turkey seasons and September 1 through December 31.",
    "userFacingCaution": "Map-derived seasonal primitive camping-area marker, not an individual campsite or parking pin. Estimated precision is 50–150 metres. Open only during spring turkey seasons and September 1–December 31; self-register, bring water and pack out all garbage. Follow signs and verify current access, hunting-season conditions and fire restrictions."
  },
  {
    "stateCode": "WI",
    "stateName": "Wisconsin",
    "auditBatch": "v23.1.124 Wisconsin seven-worker boondocking and technical Supervisor reconciliation",
    "lastChecked": "2026-07-23",
    "dataCorrectionFile": "data/supplements/wi-seven-worker-reconciliation-v23.1.124.js",
    "dataCorrectionVersion": "v23.1.124",
    "dataCorrectionDate": "2026-07-23",
    "qualityGate": "four-blank-spot-plus-three-technical-worker-returns-supervisor-reconciliation",
    "id": "wi-dnr-wood-county-wa-amundson-road-seasonal-primitive-v23124",
    "name": "Wood County Wildlife Area — Amundson Road Seasonal Primitive Camping Area",
    "lat": 44.254921,
    "lng": -90.191966,
    "county": "Wood",
    "nearestTown": "Amundson Road / Wood County Wildlife Area",
    "layer": "rustic",
    "subtype": "seasonal designated primitive camping area",
    "categoryLabel": "Rustic / Primitive",
    "layerLabel": "Rustic / Primitive",
    "owner": "Wisconsin DNR — Wood County Wildlife Area",
    "ownerLevel": "State",
    "rawCategory": "official seasonal primitive camping area",
    "markerType": "official-geospatial-pdf-area-symbol",
    "exactCampsiteLocation": false,
    "siteGeometryType": "Official DNR geospatial-PDF campsite-with-pit-toilet symbol center",
    "locationPrecision": "Approximate camping-area center with estimated 50–150 metre uncertainty; not an individual pad, gate or parking point",
    "legalityStatus": "Verified Legal",
    "verificationStatus": "verified-legal-v23124-map-derived-seasonal-area",
    "website": "https://dnr.wisconsin.gov/topic/Lands/WildlifeAreas/woodcounty",
    "sourceUrl": "https://dnr.wisconsin.gov/sites/default/files/topic/Lands/woodcounty.pdf",
    "officialRulesUrl": "https://dnr.wisconsin.gov/topic/Lands/WildlifeAreas/woodcounty",
    "sourceName": "Wisconsin DNR — Wood County Wildlife Area property page and geospatial PDF",
    "description": "Official seasonal primitive camping area on the Amundson Road side of Wood County Wildlife Area. The marker is the transformed center of the official campsite-with-pit-toilet map symbol.",
    "access": "Vehicle-to-designated-area access with associated parking. Follow signs and use the signed camping area; the marker is not the gate or parking lot.",
    "amenities": "Primitive camping area with pit toilet; no potable water. Self-registration required.",
    "cost": "Free; self-registration required.",
    "season": "Open only during spring turkey seasons and September 1 through December 31.",
    "userFacingCaution": "Map-derived seasonal primitive camping-area marker, not an individual campsite or parking pin. Estimated precision is 50–150 metres. Open only during spring turkey seasons and September 1–December 31; self-register, bring water and pack out all garbage. Follow signs and verify current access, hunting-season conditions and fire restrictions."
  }
];
  const CORRECTIONS = {
  "wi-cnf-dispersed-camping-rule-area-v23113": {
    "verificationStatus": "verified-legal-v23124-current-forest-order-and-mvum",
    "sourceName": "USDA Forest Service — current CNF Forest Order and MVUM services",
    "sourceUrl": "https://www.fs.usda.gov/r09/chequamegon-nicolet/alerts/forest-order-09-13-25-02-general-occupancy-and-use-restrictions",
    "officialRulesUrl": "https://www.fs.usda.gov/sites/nfs/files/r09/chequamegon-nicolet/publication/alerts/09-13-25-02_ClosureOrder.pdf",
    "stayLimit": "Current Forest Order: no more than 21 days in a 28-day period at one location, then move at least one road mile; verify later orders.",
    "description": "Chequamegon-Nicolet National Forest dispersed-camping rule-area marker. Current Forest Order 09-13-25-02 limits occupancy, requires a one-road-mile move and prohibits dispersed camping within one-quarter mile of developed recreation sites. Vehicle access depends on current MVUM route class, season and ground conditions.",
    "access": "Use only legal public routes shown open for the vehicle and season on the current MVUM. Do not assume off-road vehicle access or that every clearing is a campsite.",
    "userFacingCaution": "Rule-area marker only, not a campsite. Dispersed camping is prohibited within one-quarter mile of developed recreation sites. Verify National Forest ownership, current MVUM road status, seasonal access, closures, postings, private inholdings and ground conditions before selecting an existing durable site."
  },
  "wi-v23123-horn-lake-community-cluster": {
    "name": "Horn Lake Community-Reported Camping Point — Needs Verification",
    "layer": "pending",
    "subtype": "community-reported county-forest camping point needing parcel/access verification",
    "categoryLabel": "Needs Verification",
    "layerLabel": "Needs Verification",
    "pending": true,
    "owner": "Lincoln County Forest context; exact county/private boundary and landing footprint unresolved",
    "rawCategory": "community-reported overnight point with unresolved ownership/access geometry",
    "markerType": "needs-verification-community-point",
    "legalityStatus": "Research Needed",
    "verificationStatus": "pending-v23124-horn-lake-parcel-and-access-geometry",
    "description": "Five independent community reports identify overnight use near Horn Lake, but Lincoln County explicitly states Horn Lake is not a designated campground. County-forest ownership, road right-of-way and the boat-landing/parking footprint are not yet proven at the pin.",
    "access": "Approximately two miles of dirt road. Do not block Horn Lake Road, parking, the gravel boat landing or lake access. Seasonal gates and road conditions may apply.",
    "userFacingCaution": "Needs Verification. Community-reported point, not a designated campground. County-forest ownership and the lake-access/road footprint are not verified at this pin. Do not block the road, landing, parking or lake access; verify parcel ownership, seasonal road status, postings and current county rules before staying."
  },
  "wi-chippewa-county-forest-camping-area-v23113": {
    "name": "Chippewa County Forest Dispersed Camping Rule Area",
    "layer": "boondocking",
    "categoryLabel": "Boondocking / Dispersed",
    "layerLabel": "Boondocking / Dispersed",
    "subtype": "county forest dispersed-camping rule area",
    "rawCategory": "official vehicle-associated county forest dispersed camping",
    "verificationStatus": "verified-legal-v23124-vehicle-associated-county-forest-rule",
    "permitRequired": "No ordinary permit requirement stated on the current county page; verify current rules.",
    "cost": "No charge stated on the current county page.",
    "stayLimit": "Up to two weeks; then leave County Forest land for at least 24 hours.",
    "description": "Official Chippewa County Forest vehicle-associated dispersed-camping rule area. Tents, trailers, cars, trucks and portable hunting or fishing cabins may be used outside developed campgrounds, full-facility recreation areas and posted no-camping areas.",
    "access": "Use eligible county forest land and legal roads only. Verify gates, logging activity, seasonal road condition and posted exclusions.",
    "userFacingCaution": "County-forest rule area, not a campsite. Tents, trailers, cars, trucks and portable cabins may camp up to two weeks except in developed or posted no-camping areas. After the maximum stay, leave the County Forest for at least 24 hours; verify boundaries, roads, gates and postings."
  },
  "wi-marathon-county-forest-undesignated-area-v23113": {
    "layer": "boondocking",
    "categoryLabel": "Boondocking / Dispersed",
    "layerLabel": "Boondocking / Dispersed",
    "subtype": "permit-selected county forest undesignated camping units",
    "rawCategory": "official permit-selected undesignated camping system",
    "nearestTown": "Bern, Burma Road, Elderon, Hewitt–Harrison, Kronenwetter, Leather Camp, Miller, Nine Mile, Ringle and Wisconsin River units",
    "verificationStatus": "verified-legal-v23124-ten-unit-permit-system",
    "permitRequired": "Yes — individual undesignated-camping permit required.",
    "cost": "$25 individual permit.",
    "stayLimit": "One to 14 consecutive nights.",
    "description": "Official Marathon County Forest undesignated-camping permit system covering ten current forest units. The county approves the requested unit/location; this representative marker is not a preapproved campsite.",
    "access": "Online applications must be submitted more than two days ahead. Use only the approved unit/location and legal access; verify gates, exclusions and current conditions.",
    "userFacingCaution": "Permit-selected county-forest unit, not a campsite. A $25 individual permit covers one to 14 consecutive nights; online requests must be submitted more than two days ahead. Camp only in the approved unit/location and verify legal access, gates, exclusions and current terms."
  },
  "wi-wood-county-forest-primitive-area-v23113": {
    "name": "Wood County Forest General Camping Authority — Needs Verification",
    "layer": "pending",
    "categoryLabel": "Needs Verification",
    "layerLabel": "Needs Verification",
    "pending": true,
    "subtype": "county forest general camping authority requiring current rule proof",
    "rawCategory": "unverified county forest camping rule-area claim",
    "legalityStatus": "Research Needed",
    "verificationStatus": "pending-v23124-current-general-camping-clause-not-recovered",
    "permitRequired": "Unknown — current general County Forest camping authority was not recovered.",
    "cost": "Unknown.",
    "stayLimit": "Unknown.",
    "description": "Needs Verification. The current roads/access chapter and Richfield 360 information do not by themselves prove general dispersed camping throughout Wood County Forest. Keep separate from the two official Wood County Wildlife Area seasonal camping areas and the seven designated Richfield 360 sites.",
    "access": "Do not use this representative point as a campsite. Verify the current ordinance or County Forest plan, eligible property, public-road access and developed-area exclusions.",
    "userFacingCaution": "Needs Verification. A current general Wood County Forest camping clause was not recovered. Do not rely on the former permit or stay-limit claims and do not confuse this marker with the separate Wood County Wildlife Area seasonal areas or Richfield 360 designated sites."
  },
  "wi-eau-claire-county-forest-camping-area-v23113": {
    "name": "Eau Claire County Forest Camping Authority — Needs Verification",
    "layer": "pending",
    "categoryLabel": "Needs Verification",
    "layerLabel": "Needs Verification",
    "pending": true,
    "subtype": "county forest camping authority requiring current permit confirmation",
    "rawCategory": "unverified county forest camping permit claim",
    "legalityStatus": "Research Needed",
    "verificationStatus": "pending-v23124-current-permit-product-not-recovered",
    "sourceUrl": "https://www.eccountyparks.com/parks/passes-and-permits/",
    "officialRulesUrl": "https://www.eccountyparks.com/parks/passes-and-permits/",
    "permitRequired": "Unknown — the former direct permit URL no longer exposes a current County Forest camping product.",
    "cost": "Unknown; remove the former fee claim.",
    "stayLimit": "Unknown.",
    "description": "Needs Verification. A current public Eau Claire County Forest camping permit, eligible-area map and location-selection model could not be recovered from the live county permit page.",
    "access": "Do not use this representative point as a campsite. Obtain current written county rules before planning an overnight stay.",
    "userFacingCaution": "Needs Verification. A current public County Forest camping permit and its eligible-area/location-selection rules could not be recovered from the live county permit page. Do not rely on the former fee or camping terms; contact Eau Claire County Parks & Forest before planning an overnight stay."
  },
  "wi-jackson-county-forest-camping-area-v23113": {
    "verificationStatus": "verified-legal-v23124-current-permit-and-road-rules",
    "permitRequired": "Yes — obtain the permit before setup or the first night.",
    "cost": "$10 per night per camping unit.",
    "stayLimit": "Maximum 14 consecutive days; current county page describes year-round permitting.",
    "sourceUrl": "https://www.co.jackson.wi.us/index.asp?SEC=593778E5-C69A-4689-B226-26BA9B0E226E",
    "officialRulesUrl": "https://www.jacksoncountyparks.us/parks/permits_and_products/camping_permits/forest_camping_permit_per_night/",
    "description": "Official Jackson County Forest permit-selected camping rule area. Campers select an eligible county-forest location and obtain the permit; offices, vendors and registration locations are not campsites.",
    "access": "Vehicle camping must be off the public-road right-of-way. Use legal access, respect private property and obey designated ATV routes, gates and closures.",
    "userFacingCaution": "Permit-selected county-forest spot, not an office or registration coordinate. $10 per night per camping unit; register before setup; maximum 14 consecutive days. Vehicle camping must be off the public-road right-of-way; use legal access, respect private property and obey trail, fire and closure rules."
  },
  "wi-clark-county-forest-camping-area-v23113": {
    "name": "Clark County Forest Camping Permit Area",
    "verificationStatus": "verified-legal-v23124-current-permit-and-exclusions",
    "permitRequired": "Yes — permit required before setup.",
    "cost": "$7 per night per camping unit.",
    "sourceUrl": "https://www.clarkcountywi.gov/off-season-camping",
    "officialRulesUrl": "https://www.clarkcountywi.gov/off-season-camping",
    "description": "Official Clark County Forest permit-selected camping rule area. Camping is allowed on most eligible county forest land, subject to trail and mound-top exclusions. Registration stations and trailheads are not campsites.",
    "access": "No camping within 250 feet of trails at Levis/Trow or Wildcat Mound and no camping on mound tops. Verify boundaries, roads, gates and postings.",
    "userFacingCaution": "Permit-selected county-forest area, not a registration point. A permit is required before setup and costs $7 per night per unit. No camping within 250 feet of trails at Levis/Trow or Wildcat Mound or on the mound tops; verify boundaries, roads, postings and closures."
  },
  "wi-foster-falls-rustic-v23113": {
    "verificationStatus": "verified-legal-v23124-official-site-four-community-reports",
    "communityReportCount": 4,
    "communityReportBasis": "Glen B. 2026-06-16; Irvin N. 2024-09-19; Marsha Y. 2023-05-10; Michael G. 2022-07-06.",
    "website": "https://www.co.iron.wi.gov/162/County-Forest",
    "sourceUrl": "https://thedyrt.com/camping/wisconsin/foster-falls",
    "officialRulesUrl": "https://www.co.iron.wi.gov/FormCenter/Forestry-Parks-5/Register-For-Your-Campsite-Today-46",
    "sourceName": "Iron County Forest plus four independent Foster Falls community reports",
    "permitRequired": "County registration required.",
    "cost": "No charge under current county rustic-camping information.",
    "stayLimit": "Maximum 14 days.",
    "toilets": "Not confirmed by current Iron County material; do not rely on a toilet at Foster Falls.",
    "description": "Official one-site Iron County rustic campsite near Foster Falls, corroborated by four independent campers. The current county material confirms no water or electricity but does not confirm a toilet at Foster Falls.",
    "access": "Sullivan Fire Lane approach. Community reports describe an approximately eight-mile approach that is mostly paved with some smooth gravel; turnaround and road geometry are poor for large rigs.",
    "amenities": "One established primitive site; no water or electricity. Toilet is not confirmed by current county material.",
    "userFacingCaution": "Verified Legal one-site Iron County rustic camp near Foster Falls. Register before staying; 14-day maximum. Gravel access and limited turnaround make rigs over 30 feet a poor fit. No water or electricity. Current county material does not confirm a toilet. The marker is the community source-map pin for the turnaround site, not the waterfall or parking-area coordinate."
  },
  "wi-brule-river-state-forest-backpack-camping": {
    "subtype": "designated backpack campsite system",
    "markerType": "official-backpack-system-point",
    "exactCampsiteLocation": false,
    "siteGeometryType": "System/context point for nine designated backpack campsites; not an individual campsite",
    "sourceUrl": "https://dnr.wisconsin.gov/topic/parks/camping/backpack",
    "officialRulesUrl": "https://dnr.wisconsin.gov/topic/parks/camping/backpack",
    "sourceName": "Wisconsin DNR — Brule–St. Croix North Country Trail backpack campsites",
    "description": "Official nine-site backpack camping system along the Brule–St. Croix North Country Trail segment. These designated sites are the legal camping locations for the corridor; the marker is not an individual campsite.",
    "access": "Backpack/hike-in only. Use the designated sites and current trail map; do not camp at trailheads, parking lots, river accesses or shorelines.",
    "amenities": "Nine designated backpack campsites with water access, fire ring, wilderness latrine, bench and tent pads; verify current conditions.",
    "userFacingCaution": "System marker only, not an individual campsite. Nine designated backpack sites are the legal camping locations along the Brule–St. Croix NCT segment. Do not camp at trailheads, picnic areas, parking lots, river accesses, the Brule River shoreline or Lake Superior shoreline. Obtain current maps and verify water, trail, bridge, fire and closure conditions."
  },
  "wi-flambeau-river-backpack-camping-area": {
    "markerType": "backpack-rule-area",
    "exactCampsiteLocation": false,
    "siteGeometryType": "Free-choice backpack rule-area marker; no fixed campsite inventory",
    "locationPrecision": "Representative forest rule-area point only; not a campsite, trailhead or campground coordinate.",
    "description": "Official Flambeau River State Forest free-choice backpack camping rule area outside Native Community Management Areas. A free special permit is required; campers must be at least one mile from the vehicle and 100 feet from designated roads or trails.",
    "access": "Backpack only. Obtain the free permit and current map from forest headquarters; do not create roadside or parking-area campsite points.",
    "userFacingCaution": "Approximate rule-area marker, not a campsite. Backpack camping is free-choice only where allowed, outside Native Community Management Areas, at least one mile from the vehicle and 100 feet from designated roads or trails. Obtain the free permit and current map from forest headquarters. Do not use this marker as a navigation waypoint."
  },
  "wi-black-river-sf-backpack-rule-area-v23113": {
    "verificationStatus": "verified-legal-v23124-free-choice-backpack-rule-area",
    "siteGeometryType": "Free-choice backpack rule-area marker; no fixed campsite inventory",
    "description": "Official Black River State Forest backpack rule area. DNR does not publish a fixed general-backpacking campsite inventory. A free special permit is required; camp at least one mile from the vehicle and 100 feet from a designated road or trail, outside prohibited areas.",
    "userFacingCaution": "Approximate backpack rule-area marker, not an exact campsite. A free special permit is required. Camp at least one mile from the vehicle and 100 feet from designated roads or trails, outside prohibited areas. Do not create or rely on roadside, trailhead or parking-lot campsite points."
  },
  "wi-marinette-county-forest-camping-area-v23113": {
    "verificationStatus": "verified-legal-v23124-current-permit-and-exclusions",
    "permitRequired": "Yes — $25 Marinette County Forest camping permit required.",
    "cost": "$25 permit.",
    "stayLimit": "Maximum 14 consecutive days; then move at least one mile and remain away for seven days before returning.",
    "description": "Official Marinette County Forest permit-selected camping rule-area marker. Camping is limited to county-owned forest land in natural openings; no vegetation clearing. County parks, campgrounds, timber-sale areas and other restricted buffers are excluded.",
    "access": "Use public/legal access only and a natural opening. Verify county ownership, road right-of-way, gates, timber operations and current closures.",
    "userFacingCaution": "Permit-selected county-forest area, not a campsite. $25 permit, 14-day maximum; natural openings only; no clearing; timber-sale areas and one-quarter-mile restricted buffers are closed. Verify county ownership, legal access, gates, postings and fire restrictions."
  },
  "wi-oconto-county-forest-permit-area-v23113": {
    "name": "Oconto County Forest Permit Camping System Context",
    "layer": "info",
    "categoryLabel": "Info / Reference",
    "layerLabel": "Info / Reference",
    "subtype": "county permit-camping system context",
    "verificationStatus": "verified-v23124-six-current-permit-units",
    "description": "Information marker for the current Oconto County Forest permit-camping system: Abrams, Bagley, Brazeau, Breed, Morgan and Stiles. The six component area records and current permit map control; this marker is not a campsite.",
    "cost": "$10 per night.",
    "stayLimit": "Maximum 14 consecutive days.",
    "permitRequired": "Yes — obtain the permit for the correct unit.",
    "userFacingCaution": "Permit-selected system context, not a campsite. Camp only on eligible Oconto County Forest property within Abrams, Bagley, Brazeau, Breed, Morgan or Stiles; $10 per night, 14-day maximum, no services. Verify the exact parcel, public-road access, gates and current postings."
  },
  "wi-florence-county-forest-dispersed-area-v23113": {
    "verificationStatus": "verified-legal-v23124-current-county-faq",
    "description": "Official Florence County Forest dispersed-camping rule area. Tents, trailers, cars and trucks may camp without charge for no more than 14 days, subject to county ownership, access, closures and postings.",
    "cost": "No charge.",
    "stayLimit": "Maximum 14 days.",
    "permitRequired": "No ordinary permit requirement stated in the current county FAQ; verify current rules.",
    "access": "Do not block roads, parking areas or lake access. Verify gates, timber operations, seasonal closures and postings.",
    "userFacingCaution": "County-forest rule area, not a campsite. Tents, trailers, cars and trucks may camp without charge for no more than 14 days. Do not block roads, parking areas or lake access; verify county ownership, legal access, gates, closures, postings and fire restrictions."
  },
  "wi-cnf-mountain-lake-road-4-v2318": {
    "reviewSummary": "v23.1.124 confirms the later Mountain Lakes Road pull-off lead is the same point, approximately 3.9 metres from this active record. The duplicate lead is closed; no second marker is added.",
    "userFacingCaution": "This source pin resolves to existing Mountain Lake Road #4. Use only an existing durable site and verify current MVUM road legality, postings, closures, surface and turnaround before camping."
  }
};

  function text(v){ return String(v == null ? '' : v).trim(); }
  function clean(v){ return text(v).toLowerCase(); }
  function exists(list, site){
    const id = clean(site.id);
    const lat = Number(site.lat), lng = Number(site.lng);
    const name = clean(site.name);
    return list.some(s => clean(s.id) === id ||
      (Number.isFinite(lat) && Number.isFinite(lng) && Math.abs(Number(s.lat)-lat) < 0.00003 && Math.abs(Number(s.lng)-lng) < 0.00003 && clean(s.name) === name) ||
      (name && clean(s.name) === name));
  }
  function patch(list,id,values){
    const site = list.find(s => clean(s.id) === clean(id));
    if(!site) return false;
    Object.assign(site, values, {dataCorrectionFile:FILE,dataCorrectionVersion:VERSION,dataCorrectionDate:DATE,lastChecked:DATE});
    return true;
  }
  window.CAMPING_STATE_DATA = window.CAMPING_STATE_DATA || {};
  const list = window.CAMPING_STATE_DATA.WI = Array.isArray(window.CAMPING_STATE_DATA.WI) ? window.CAMPING_STATE_DATA.WI : [];
  Object.keys(CORRECTIONS).forEach(id => patch(list,id,CORRECTIONS[id]));
  ADDITIONS.forEach(site => { if(!exists(list,site)) list.push(site); });
})();
