// Tod's Boondocking & Camping Maps — area-outline corrections v23.1.124
(function(){
  'use strict';
  window.CAMPING_AREA_OUTLINES = Array.isArray(window.CAMPING_AREA_OUTLINES) ? window.CAMPING_AREA_OUTLINES : [];
  const PATCHES = {
  "wi-ashland-county-forest-outline-v2311": {
    "category": "County forest boondocking/dispersed context",
    "campingLayer": "boondocking",
    "opportunityKind": "official-boondocking-rule-area-outline",
    "status": "available",
    "sourceName": "Wisconsin DNR County Forests FeatureServer and Ashland County Forest 2021–2035 plan",
    "officialCampingLegality": "Ashland County Forest plan allows remote camping in eligible Class 2 recreation areas, prohibits it in Class 1 areas, requires no ordinary permit and limits stays to 14 consecutive days.",
    "caution": "Official county-forest boundary only, not a campsite. Remote camping is limited to eligible Class 2 recreation areas and is prohibited in Class 1 areas; maximum 14 consecutive days. Obey gates, legal-road restrictions, fire rules and current postings.",
    "recommendedUse": "context-only",
    "rulesSummary": "Remote camping is allowed in eligible Class 2 areas, prohibited in Class 1 areas and limited to 14 consecutive days.",
    "rulesDetails": [
      "Use only eligible Class 2 recreation areas.",
      "Camping is prohibited in Class 1 recreation areas.",
      "No ordinary permit is required under the reviewed plan; maximum stay is 14 consecutive days.",
      "The outline does not encode Class 1 exclusions, gated roads, inholdings or temporary restrictions."
    ],
    "lastChecked": "2026-07-23",
    "dataCorrectionVersion": "v23.1.124",
    "dataCorrectionFile": "data/area-outlines-v23.1.124.js"
  },
  "wi-oneida-county-forest-outline-v2311": {
    "sourceName": "Wisconsin DNR County Forests FeatureServer and Oneida County Forestry",
    "officialCampingLegality": "Oneida County remote camping requires a $20 permit and is limited to 14 consecutive days on eligible County Forest land. Enterprise Campground is separate.",
    "caution": "Official county-forest boundary only, not a campsite. A $20 permit is required and camping is limited to 14 consecutive days. Verify the exact eligible tract, legal access, gates, exclusions and current permit conditions; Enterprise Campground is separate.",
    "rulesSummary": "Oneida County remote camping requires a $20 permit and has a 14-consecutive-day limit.",
    "rulesDetails": [
      "Obtain the current $20 remote-camping permit.",
      "Maximum stay is 14 consecutive days.",
      "Verify eligible forest blocks, legal roads, gates and exclusions.",
      "Do not merge the separate 11-site Enterprise Campground into the remote-camping outline."
    ],
    "lastChecked": "2026-07-23",
    "dataCorrectionVersion": "v23.1.124",
    "dataCorrectionFile": "data/area-outlines-v23.1.124.js"
  },
  "wi-marinette-county-forest-outline-v2311": {
    "officialCampingLegality": "Marinette County Forest camping requires a $25 permit, is limited to 14 consecutive days, uses natural openings only and excludes county parks, campgrounds, timber-sale areas and restricted buffers.",
    "caution": "Official county-forest boundary only, not a campsite. A $25 permit is required; use natural openings only, do not clear vegetation, and avoid county parks, campgrounds, timber-sale areas and restricted buffers. Verify legal access, gates, postings and fire rules.",
    "rulesSummary": "$25 permit; 14-day maximum; natural openings only; parks, campgrounds, timber-sale areas and restricted buffers excluded.",
    "lastChecked": "2026-07-23",
    "dataCorrectionVersion": "v23.1.124",
    "dataCorrectionFile": "data/area-outlines-v23.1.124.js"
  },
  "wi-florence-county-forest-outline-v2311": {
    "officialCampingLegality": "Florence County allows tents, trailers, cars and trucks to camp on eligible County Forest land without charge for no more than 14 days.",
    "caution": "Official county-forest boundary only, not a campsite. Tents, trailers, cars and trucks may camp without charge for no more than 14 days. Do not block roads, parking areas or lake access; verify ownership, legal access, gates, closures and postings.",
    "rulesSummary": "Vehicle-associated County Forest camping is allowed without charge for up to 14 days, subject to access, closures and postings.",
    "lastChecked": "2026-07-23",
    "dataCorrectionVersion": "v23.1.124",
    "dataCorrectionFile": "data/area-outlines-v23.1.124.js"
  }
};
  const ADDITIONS = [
  {
    "id": "wi-iron-county-forest-outline-v23124",
    "name": "Iron County Forest",
    "stateCode": "WI",
    "category": "County forest boondocking/dispersed context",
    "campingLayer": "boondocking",
    "opportunityKind": "official-boondocking-rule-area-outline",
    "status": "available",
    "type": "arcgis-query",
    "sourceName": "Wisconsin DNR County Forests FeatureServer and Iron County Forest rules",
    "sourceUrl": "https://services5.arcgis.com/Ul9AyFFeFTjf08DW/ArcGIS/rest/services/County_Forests/FeatureServer/0",
    "layerUrl": "https://services5.arcgis.com/Ul9AyFFeFTjf08DW/ArcGIS/rest/services/County_Forests/FeatureServer/0",
    "where": "PROP_NAME = 'Iron County Forest'",
    "outFields": "FID,FR_PROP_CO,PROP_NAME,CHANGE_DT,CHANGE_BY,COLL_CODE,COLL_TEXT",
    "outSR": 4326,
    "boundaryRepresents": "Iron County Forest land polygon from official Wisconsin DNR county-forest data; not the whole county and not private registration locations.",
    "exactCampingBoundary": false,
    "officialCampingLegality": "Iron County allows camping anywhere within eligible County Forest land for up to two weeks at no charge, with county registration. Named developed/rustic sites remain separate.",
    "caution": "Official county-forest boundary only, not a campsite. Remote camping is allowed for up to two weeks at no charge with registration, but verify county ownership, legal-road access, gates, timber activity, postings and current restrictions. Do not use private registration submissions as public campsite pins.",
    "recommendedUse": "context-only",
    "rulesSummary": "Remote camping is allowed on eligible Iron County Forest land for up to two weeks at no charge, with county registration.",
    "rulesDetails": [
      "Camp only on Iron County Forest land with legal access.",
      "County registration is required; private registrant locations are not a public campsite inventory.",
      "Potato River Falls, Foster Falls, Wren Falls and Shay Dam remain separate named records.",
      "The outline does not encode private inholdings, roads, gates, timber operations or temporary closures."
    ],
    "labelPlacement": "one label per major separated polygon part; tiny fragments suppressed to avoid clutter",
    "lastChecked": "2026-07-23",
    "dataCorrectionVersion": "v23.1.124",
    "dataCorrectionFile": "data/area-outlines-v23.1.124.js"
  }
];

  function clean(v){ return String(v == null ? '' : v).trim().toLowerCase(); }
  Object.keys(PATCHES).forEach(id => {
    const row = window.CAMPING_AREA_OUTLINES.find(x => clean(x.id) === clean(id));
    if(row) Object.assign(row, PATCHES[id]);
  });
  ADDITIONS.forEach(row => {
    if(!window.CAMPING_AREA_OUTLINES.some(x => clean(x.id) === clean(row.id))) window.CAMPING_AREA_OUTLINES.push(row);
  });
})();
