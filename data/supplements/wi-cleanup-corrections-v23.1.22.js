// Wisconsin v23.1.22 cleanup/correction supplement
// Purpose: targeted corrections from read-only QA. No new campground/recreation-area adds.
// Actions: remove stale Black Lake duplicate, enrich Bear/Lost Lake CNF records,
// tighten county forest rule-area wording, and align WI manifest count with post-guard runtime rows.
(function(){
  'use strict';
  window.CAMPING_STATE_DATA = window.CAMPING_STATE_DATA || {};
  const state = 'WI';
  const original = Array.isArray(window.CAMPING_STATE_DATA[state]) ? window.CAMPING_STATE_DATA[state] : [];
  const norm = v => String(v == null ? '' : v).trim().toLowerCase();
  const hasName = (site, phrase) => norm(site && site.name).includes(norm(phrase));
  const byId = id => site => norm(site && site.id) === norm(id);
  const byName = name => site => norm(site && site.name) === norm(name);
  const versionPatch = {
    dataCorrectionFile: 'data/supplements/wi-cleanup-corrections-v23.1.22.js',
    dataCorrectionVersion: 'v23.1.22',
    dataCorrectionDate: '2026-06-22',
    lastChecked: '2026-06-22',
    cleanupBatch: 'v23.1.22 Wisconsin targeted cleanup/correction package',
    qualityGate: 'official-source-backed-worker-QA-plus-supervisor-review; no new fake pins or review-source coordinates'
  };

  // Remove only the stale active baseline Black Lake row identified by Worker 8.
  // Keeper is the official USFS v23.1.17 row or any remaining Black Lake row patched below.
  const filtered = original.filter(site => {
    const id = norm(site && site.id);
    if(id === 's94' && hasName(site, 'Black Lake Recreation Area')) return false;
    return true;
  });
  window.CAMPING_STATE_DATA[state] = filtered;

  function findOne(pred){ return window.CAMPING_STATE_DATA[state].find(pred); }
  function patchRecord(pred, patch){
    const row = findOne(pred);
    if(!row) return false;
    Object.assign(row, versionPatch, patch);
    return true;
  }
  function patchByIdOrName(id, name, patch){
    return patchRecord(byId(id), patch) || patchRecord(byName(name), patch) || patchRecord(site => hasName(site, name), patch);
  }

  // Black Lake Recreation Area — retain one official USFS system marker, not stale s94.
  patchByIdOrName('wi-cnf-black-lake-recreation-area-v23117', 'Black Lake Recreation Area', {
    id: 'wi-cnf-black-lake-recreation-area-v23117',
    name: 'Black Lake Recreation Area',
    stateCode: 'WI',
    stateName: 'Wisconsin',
    layer: 'rustic',
    subtype: 'rustic',
    categoryLabel: 'Rustic / Primitive',
    layerLabel: 'Rustic / Primitive',
    owner: 'Chequamegon-Nicolet National Forest',
    ownerLevel: 'Federal',
    lat: 45.98399,
    lng: -90.93476,
    markerType: 'system-campground-point',
    siteGeometryType: 'System / Campground Point',
    exactCampsiteLocation: false,
    legalityStatus: 'Verified Legal',
    verificationStatus: 'verified-legal-v23122-cnf-cleanup',
    coordinateSource: 'Official USDA Forest Service Black Lake Recreation Area coordinate; Worker 8 CNF final cleanup proof.',
    locationPrecision: 'Official USFS campground/recreation-area system point; not an individual campsite coordinate.',
    sourceUrl: 'https://www.fs.usda.gov/r09/chequamegon-nicolet/recreation/black-lake-recreation-area',
    sourceName: 'USDA Forest Service — Chequamegon-Nicolet National Forest, Black Lake Recreation Area',
    amenities: '29 campsites; picnic tables, fire rings, vault toilets, potable hand pump, and no RV water/dump hookups documented by USFS. Verify current amenities and availability.',
    cost: '$15/night shown by USFS at time of QA; verify current fees/reservations before travel.',
    popupNote: 'Official USFS campground/system point only; not an individual campsite pin. Verify current fees, reservations, fire restrictions, amenities, and road status before travel.',
    description: 'Verified Legal. Official Chequamegon-Nicolet National Forest campground/recreation-area system point for Black Lake Recreation Area. Stale baseline duplicate s94 was removed by the v23.1.22 cleanup supplement.',
    access: 'USFS campground/recreation-area access; verify current road, fee, reservation, and open/closed status before travel.',
    sources: [
      'USDA Forest Service — Black Lake Recreation Area',
      'Worker 8 WI-CNF-FINAL-CLEANUP-PROOF'
    ]
  });

  // Bear Lake Recreation Area — enrich existing legacy row, no new add.
  patchByIdOrName('s59', 'Bear Lake Recreation Area', {
    name: 'Bear Lake Recreation Area',
    stateCode: 'WI',
    stateName: 'Wisconsin',
    layer: 'rustic',
    subtype: 'rustic',
    categoryLabel: 'Rustic / Primitive',
    layerLabel: 'Rustic / Primitive',
    owner: 'Chequamegon-Nicolet National Forest',
    ownerLevel: 'Federal',
    lat: 45.513166,
    lng: -88.530101,
    markerType: 'system-campground-point',
    siteGeometryType: 'System / Campground Point',
    exactCampsiteLocation: false,
    legalityStatus: 'Verified Legal',
    verificationStatus: 'verified-legal-v23122-cnf-cleanup',
    coordinateSource: 'Official USDA Forest Service Bear Lake Recreation Area coordinate; Worker 8 CNF final cleanup proof.',
    locationPrecision: 'Official USFS campground/recreation-area system point; not an individual campsite coordinate.',
    sourceUrl: 'https://www.fs.usda.gov/r09/chequamegon-nicolet/recreation/bear-lake-recreation-area',
    sourceName: 'USDA Forest Service — Chequamegon-Nicolet National Forest, Bear Lake Recreation Area',
    amenities: '27-site campground with five tent-only walk-in sites, drinking water, vault toilets, swim beach, picnic area, and boat landing documented by USFS. Verify current amenities.',
    cost: '$15/night shown by USFS at time of QA; verify current fees/reservations before travel.',
    popupNote: 'Official USFS campground/system point only; not an individual campsite pin. Verify current fees, reservations, fire restrictions, amenities, and road status before travel.',
    description: 'Verified Legal. Official Chequamegon-Nicolet National Forest campground/recreation-area system point for Bear Lake Recreation Area. Existing legacy row enriched by v23.1.22 cleanup supplement; no new site added.',
    access: 'USFS campground/recreation-area access; verify current road, fee, reservation, and open/closed status before travel.',
    sources: [
      'USDA Forest Service — Bear Lake Recreation Area',
      'Worker 8 WI-CNF-FINAL-CLEANUP-PROOF'
    ]
  });

  // Lost Lake Recreation Area — enrich existing legacy row, no new add.
  patchByIdOrName('s566', 'Lost Lake Recreation Area', {
    name: 'Lost Lake Recreation Area',
    stateCode: 'WI',
    stateName: 'Wisconsin',
    layer: 'rustic',
    subtype: 'rustic',
    categoryLabel: 'Rustic / Primitive',
    layerLabel: 'Rustic / Primitive',
    owner: 'Chequamegon-Nicolet National Forest',
    ownerLevel: 'Federal',
    lat: 45.883571,
    lng: -88.558474,
    markerType: 'system-campground-point',
    siteGeometryType: 'System / Campground Point',
    exactCampsiteLocation: false,
    legalityStatus: 'Verified Legal',
    verificationStatus: 'verified-legal-v23122-cnf-cleanup',
    coordinateSource: 'Official USDA Forest Service Lost Lake Recreation Area coordinate; Worker 8 CNF final cleanup proof.',
    locationPrecision: 'Official USFS campground/recreation-area system point; not an individual campsite coordinate.',
    sourceUrl: 'https://www.fs.usda.gov/r09/chequamegon-nicolet/recreation/lost-lake-recreation-area',
    sourceName: 'USDA Forest Service — Chequamegon-Nicolet National Forest, Lost Lake Recreation Area',
    amenities: '27-site campground with picnic tables, fire rings/grills, drinking water, and reservation/first-come context documented by USFS. Verify current amenities.',
    cost: '$15/night shown by USFS at time of QA; verify current fees/reservations before travel.',
    popupNote: 'Official USFS campground/system point only; not an individual campsite pin. Verify current reservations, road status, fire restrictions, amenities, and open dates before travel.',
    description: 'Verified Legal. Official Chequamegon-Nicolet National Forest campground/recreation-area system point for Lost Lake Recreation Area. Existing legacy row enriched by v23.1.22 cleanup supplement; no new site added.',
    access: 'USFS campground/recreation-area access; verify current road, fee, reservation, and open/closed status before travel.',
    sources: [
      'USDA Forest Service — Lost Lake Recreation Area',
      'Worker 8 WI-CNF-FINAL-CLEANUP-PROOF'
    ]
  });

  // County forest rule-area wording cleanup — no new pins, no geometry upgrade claimed.
  patchByIdOrName('wi-marinette-county-forest-camping-area-v23113', 'Marinette County Forest Camping Permit Area', {
    layer: 'boondocking',
    subtype: 'county forest camping permit rule-area marker',
    categoryLabel: 'Boondocking / Dispersed',
    layerLabel: 'Boondocking / Dispersed',
    markerType: 'rule-area',
    siteGeometryType: 'Area / Rule Marker',
    exactCampsiteLocation: false,
    legalityStatus: 'Verified Legal',
    verificationStatus: 'verified-legal-v23122-county-rule-area-cleanup',
    locationPrecision: 'Representative county forest camping permit rule-area marker only; not an exact campsite coordinate.',
    popupNote: 'Permit/rule-area marker only, not a campsite pin. Camping allowed only on Marinette County Forest lands under current permit terms; not county parks, campgrounds, or equestrian campgrounds. Confirm boundaries, postings, access, and fire restrictions before staying.',
    description: 'Verified Legal. Marinette County Forest camping permit rule-area record. This is a representative permit/rule marker only, not an exact campsite coordinate.',
    sources: [
      'Marinette County official camping permit source',
      'Worker 2 WI-MARINETTE-FLORENCE-BOON-RULEAREA-QA'
    ]
  });

  patchByIdOrName('wi-florence-county-forest-dispersed-area-v23113', 'Florence County Forest Dispersed Camping Area', {
    layer: 'boondocking',
    subtype: 'county forest dispersed camping rule-area marker',
    categoryLabel: 'Boondocking / Dispersed',
    layerLabel: 'Boondocking / Dispersed',
    markerType: 'rule-area',
    siteGeometryType: 'Area / Rule Marker',
    exactCampsiteLocation: false,
    legalityStatus: 'Verified Legal',
    verificationStatus: 'verified-legal-v23122-county-rule-area-cleanup',
    locationPrecision: 'Representative county forest dispersed camping rule-area marker only; not an exact campsite coordinate.',
    popupNote: 'Dispersed camping rule-area marker only, not a campsite pin. Verify current Florence County Forest boundaries, postings, road access, seasonal restrictions, fire restrictions, and county camping rules before staying.',
    description: 'Verified Legal. Florence County Forest dispersed camping rule-area record. This is a representative area/rule marker only, not an exact campsite coordinate.',
    sources: [
      'Florence County official County Forest plan/source',
      'Worker 2 WI-MARINETTE-FLORENCE-BOON-RULEAREA-QA'
    ]
  });

  patchByIdOrName('wi-price-county-forest-dispersed-area-v23113', 'Price County Forest Dispersed Camping Area', {
    layer: 'boondocking',
    subtype: 'county forest dispersed camping permit rule-area marker',
    categoryLabel: 'Boondocking / Dispersed',
    layerLabel: 'Boondocking / Dispersed',
    markerType: 'rule-area',
    siteGeometryType: 'Area / Rule Marker',
    exactCampsiteLocation: false,
    legalityStatus: 'Verified Legal',
    verificationStatus: 'verified-legal-v23122-county-rule-area-cleanup',
    locationPrecision: 'Representative county forest dispersed camping permit rule-area marker only; not an exact campsite coordinate.',
    popupNote: 'Verified Legal — Price County Forestry and Parks issues dispersed camping permits for Price County Forest. Area/rule marker only, not a campsite coordinate. Camp only at the approved/designated permit location. Not valid within 1/4 mile of campgrounds, day-use areas, or boat landings. Do not block roads, trails, gates, or rights-of-way. Verify current permit approval, county forest boundary, road access, postings, and fire restrictions before staying.',
    description: 'Verified Legal. Price County Forest dispersed camping permit rule-area record. This is a representative permit/rule marker only, not an exact campsite coordinate.',
    sources: [
      'Price County Forestry and Parks Department — Special Camp Registration Permit / Dispersed Camping Policy and Guidelines',
      'Worker 3 WI-PRICE-RUSK-BOON-RULEAREA-QA'
    ]
  });

  patchByIdOrName('wi-rusk-county-forest-dispersed-area-v23113', 'Rusk County Forest Dispersed Camping Area', {
    layer: 'boondocking',
    subtype: 'county forest dispersed camping permit rule-area marker',
    categoryLabel: 'Boondocking / Dispersed',
    layerLabel: 'Boondocking / Dispersed',
    markerType: 'rule-area',
    siteGeometryType: 'Area / Rule Marker',
    exactCampsiteLocation: false,
    legalityStatus: 'Verified Legal',
    verificationStatus: 'verified-legal-v23122-county-rule-area-cleanup',
    locationPrecision: 'Representative county forest dispersed camping permit rule-area marker only; not an exact campsite coordinate.',
    popupNote: 'Verified Legal — Rusk County sells a dispersed camping permit for County Forest camping. Area/rule marker only, not a campsite coordinate. No campground-style amenities are implied. Use only legal public access and durable locations where camping is allowed. Verify current permit terms, county forest boundary, road status, posted closures, fire restrictions, and private inholdings before staying.',
    description: 'Verified Legal. Rusk County Forest dispersed camping permit rule-area record. This is a representative permit/rule marker only, not an exact campsite coordinate.',
    sources: [
      'Rusk County official dispersed camping permit / forestry sources',
      'Worker 3 WI-PRICE-RUSK-BOON-RULEAREA-QA'
    ]
  });
})();
