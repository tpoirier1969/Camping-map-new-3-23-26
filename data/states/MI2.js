// Camping Map Michigan base data continuation v23.0.34
// Purpose: final-level Michigan corrections/additions without rewriting the large MI.js base file.
// This is a second Michigan base-data file, not a candidate overlay.
(function(){
  'use strict';
  window.CAMPING_STATE_DATA = window.CAMPING_STATE_DATA || {};
  const list = window.CAMPING_STATE_DATA['MI'] = Array.isArray(window.CAMPING_STATE_DATA['MI']) ? window.CAMPING_STATE_DATA['MI'] : [];
  const checked = '2026-05-14';
  function text(v){ return String(v || '').trim(); }
  function nameOf(site){ return text(site && site.name).toLowerCase(); }
  function patchByName(pattern, patch){
    let count = 0;
    list.forEach(site => {
      if(pattern.test(nameOf(site))){
        Object.assign(site, patch, {
          dataCorrectionFile: 'data/states/MI2.js',
          dataCorrectionVersion: 'v23.0.34',
          dataCorrectionDate: checked
        });
        count++;
      }
    });
    return count;
  }
  function existsByIdOrName(id, namePattern){
    return list.some(site => text(site.id) === id || namePattern.test(nameOf(site)));
  }

  // Fix: Hurricane River had a bad Lake Superior/offshore pin in at least one deployed data path.
  // Corrected to a land-side campground/trailhead-area point at the Hurricane River mouth access.
  patchByName(/hurricane\s+river/, {
    lat: 46.66607,
    lng: -86.16794,
    stateCode: 'MI',
    stateName: 'Michigan',
    layer: 'federal',
    subtype: 'rustic',
    owner: 'National Park Service / Pictured Rocks National Lakeshore',
    layerLabel: 'Rustic campgrounds',
    categoryLabel: 'Federal Campgrounds',
    website: 'https://www.nps.gov/piro/planyourvisit/campgrounds.htm',
    showers: 'No',
    locationPrecision: 'Corrected land-side campground/trailhead-area pin near the Hurricane River mouth access; not offshore.',
    verificationStatus: 'verified-coordinate-correction',
    verificationNotes: 'Corrects previously reported offshore/Lake Superior placement. Hurricane River Campground is at the Hurricane River mouth in Pictured Rocks National Lakeshore, with trail access toward Au Sable Light.'
  });

  // Fix: Misery Bay is not a modern campground layer item in this project. Keep it with rougher low-service camping.
  patchByName(/misery\s+bay/, {
    layer: 'boondocking',
    subtype: 'rustic',
    rawCategory: 'boondocking rustic',
    categoryLabel: 'Boondocking',
    layerLabel: 'Boondocking / dispersed',
    showers: 'No services expected',
    access: 'Low-service Lake Superior / public-land style camping area. Verify current access, road condition, and any posted restrictions before relying on it.',
    amenities: 'No developed modern campground services should be assumed; self-contained camping is the safe assumption.',
    verificationStatus: 'verified-layer-correction',
    verificationNotes: 'Layer corrected from Modern Campgrounds based on project classification: Misery Bay belongs with boondocking/rustic style camping, not modern campground service.'
  });

  // Corrected v23.1.96: Mouth of the Montreal River is hike/boat-in, not vehicle-access boondocking.
  if(!existsByIdOrName('mi-boondocking-montreal-river-mouth', /mouth\s+of\s+the\s+montreal\s+river|montreal\s+river\s+mouth/)){
    list.push({
      id: 'mi-boondocking-montreal-river-mouth',
      name: 'Mouth of the Montreal River',
      lat: 47.3925361,
      lng: -87.8410194,
      stateCode: 'MI',
      stateName: 'Michigan',
      layer: 'boat-backpack',
      subtype: 'boat / backpack',
      siteForm: 'hike-boat-in-primitive-site',
      rawCategory: 'boat / backpack primitive',
      categoryLabel: 'Boat / Backpack',
      sourceFolder: 'Michigan base data continuation',
      owner: 'Michigan public land / Keweenaw shoreline area',
      layerLabel: 'Boat / Backpack',
      description: 'Hike/boat-in primitive camping area at the Lake Superior mouth of the Montreal River on the Keweenaw Peninsula. This is not normal vehicle-access boondocking; the draw is remote shoreline/river-mouth access and a low-service setting rather than developed campground amenities.',
      website: 'https://en.wikipedia.org/wiki/Montreal_River_(Michigan)',
      sourceName: 'Montreal River public-land acquisition reference; user-requested project site',
      sourceUrl: 'https://en.wikipedia.org/wiki/Montreal_River_(Michigan)',
      sourceNotes: 'The Montreal River page notes the state purchase covers the river mouth and several miles upstream; this record is included as a project-requested hike/boat-in primitive site, not a developed campground or normal drive-up boondocking site.',
      cost: 'Free / no developed campground fee expected; verify any posted local/state restrictions before staying.',
      costDisplay: 'No developed campground fee is expected for this hike/boat-in primitive public-land site, but verify current posted rules before relying on it.',
      costCheckedDate: checked,
      costNeedsReview: false,
      showers: 'No',
      access: 'Remote Keweenaw shoreline/river-mouth hike/boat-in access. This is not normal vehicle camping. Expect limited services, water/weather exposure, rough approaches, and possible seasonal access issues. Arrive in daylight and verify the exact legal parking/camping/staging situation on site.',
      amenities: 'No developed services assumed. Self-contained camping only; pack in/pack out; no showers or hookups.',
      trailheads: 'Montreal River mouth shoreline, nearby falls/river corridor, and Keweenaw coast exploration.',
      season: 'Best treated as seasonal access; snow, shoreline conditions, washouts, and posted restrictions can change access.',
      reviewSummary: 'Useful as a remote Keweenaw hike/boat-in primitive site for campers who want Lake Superior solitude and can handle no-service conditions.',
      locationPrecision: 'River-mouth coordinate for the Montreal River where it enters Lake Superior; hike/boat-in primitive access, not normal vehicle-access boondocking; no modern campground services claimed.',
      verificationStatus: 'verified-project-addition',
      verificationDate: checked,
      verificationNotes: 'Corrected at user request from Boondocking / Dispersed to Boat / Backpack because local knowledge says the site is hike/boat-in, not normal vehicle-access boondocking. Montreal River mouth coordinate retained; no modern campground services claimed.',
      dataCorrectionFile: 'data/states/MI2.js',
      dataCorrectionVersion: 'v23.1.96',
      dataCorrectionDate: '2026-07-09'
    });
  }

  // Add: v23.0.82 Green Bay -> Ishpeming corridor boondocking rule/validation records.
  const corridorChecked = '2026-06-03';
  function addCorridorSite(site, namePattern){
    if(!existsByIdOrName(site.id, namePattern)){
      list.push(Object.assign({
        dataCorrectionFile: 'data/states/MI2.js',
        dataCorrectionVersion: 'v23.0.82',
        dataCorrectionDate: corridorChecked
      }, site));
    }
  }

  addCorridorSite({
    id: 'mi-hiawatha-rapid-river-manistique-dispersed-rule-area-v23082',
    name: 'Hiawatha National Forest Rapid River / Manistique Dispersed Camping Rule Area',
    lat: 45.87754,
    lng: -84.831527,
    stateCode: 'MI',
    stateName: 'Michigan',
    layer: 'boondocking',
    subtype: 'rule_area',
    rawCategory: 'official national forest dispersed camping rule area',
    categoryLabel: 'Boondocking / Dispersed',
    sourceFolder: 'v23.0.82 Green Bay to Ishpeming corridor boondocking rule areas',
    owner: 'USDA Forest Service — Hiawatha National Forest',
    ownerLevel: 'Federal',
    layerLabel: 'Boondocking / Dispersed',
    description: 'Rule/contact marker for Hiawatha National Forest dispersed camping in the Rapid River / Manistique corridor. This is not a campsite pin. Use current USDA forest orders, MVUM access, posted closures, water setbacks, stay limits and permit rules before selecting a legal dispersed site.',
    website: 'https://www.fs.usda.gov/r09/hiawatha/alerts/occupancy-and-use-within-hiawatha-national-forest',
    sourceName: 'USDA Forest Service / Recreation.gov — Hiawatha National Forest',
    sourceUrl: 'https://www.fs.usda.gov/r09/hiawatha/alerts/occupancy-and-use-within-hiawatha-national-forest',
    officialRulesUrl: 'https://www.fs.usda.gov/r09/hiawatha/alerts/occupancy-and-use-within-hiawatha-national-forest',
    officialMapUrl: 'https://www.fs.usda.gov/r09/hiawatha/maps-guides',
    officialContactUrl: 'https://www.recreation.gov/gateways/1081',
    cost: 'No broad dispersed-camping fee proven; designated dispersed sites may differ.',
    costDisplay: 'No broad dispersed-camping fee proven; designated dispersed sites may differ.',
    showers: 'No',
    water: 'No developed water service.',
    toilets: 'No developed toilet service.',
    electric: 'No',
    amenities: 'No developed amenities for dispersed camping.',
    access: 'Rule/contact marker at the Hiawatha National Forest Supervisor’s Office. Legal camping location depends on USDA forest order, MVUM, closures and site-specific rules.',
    season: 'Subject to USDA orders, closures, road status, fire restrictions, MVUM access and posted restrictions.',
    markerType: 'rule_area',
    exactCampsiteLocation: false,
    parentCoordinatePurpose: 'Forest-wide USDA Supervisor’s Office parent/contact marker for Hiawatha dispersed-camping rule information; not a campsite.',
    coordinateConfidence: 'High for official parent/contact coordinate from Recreation.gov; false for campsite location.',
    locationPrecision: 'Parent/contact marker only. Recreation.gov lists Hiawatha National Forest Supervisor’s Office GPS coordinates at 45.87754, -84.831527.',
    ruleSummary: 'Hiawatha Occupancy and Use order includes dispersed camping restrictions: 16 consecutive days in one location, move requirement, no camping in posted closed/no-camping areas, and no camping within 50 feet of water unless posted otherwise.',
    userFacingCaution: 'Rule/contact marker only — this is not a campsite pin. Use current Hiawatha MVUM and USDA orders before treating any spot as legal.',
    areaOverlayStatus: 'not-yet-available',
    areaOverlayNote: 'Future outline should use official USDA forest/ranger-district boundary or GIS data only.',
    lastChecked: corridorChecked,
    verificationStatus: 'verified-v23.0.82-rule-area',
    auditBatch: 'v23.0.82 corridor boondocking rule/system markers',
    qualityGate: 'official-legality-plus-parent-marker'
  }, /hiawatha.*rapid\s+river.*manistique.*dispersed|rapid\s+river.*manistique.*dispersed/);

  addCorridorSite({
    id: 'mi-delta-county-forestland-rustic-camping-permit-rule-area-v23082',
    name: 'Delta County Forestland Rustic Camping Permit Rule Area',
    lat: 45.913,
    lng: -87.3064444,
    stateCode: 'MI',
    stateName: 'Michigan',
    layer: 'boondocking',
    subtype: 'rule_area',
    rawCategory: 'official county forest rustic camping permit rule area',
    categoryLabel: 'Boondocking / Dispersed',
    sourceFolder: 'v23.0.82 Green Bay to Ishpeming corridor boondocking rule areas',
    owner: 'Delta County Parks & Recreation / Delta County Forestland',
    ownerLevel: 'County',
    layerLabel: 'Boondocking / Dispersed',
    description: 'Rule/access marker for Delta County Forestland rustic camping by free permit. This is not a campsite pin. Campers must contact Delta County Parks, obtain and post the free permit, and camp only in suitable county forest areas where access and postings allow it.',
    website: 'https://deltacountymi.gov/parks/forestland/',
    sourceName: 'Delta County Forestland',
    sourceUrl: 'https://deltacountymi.gov/parks/forestland/',
    officialRulesUrl: 'https://deltacountymi.gov/wp-content/uploads/2025/03/Delta-County-Forest-Land-Policies-and-Regulations.pdf',
    officialMapUrl: 'https://deltacountymi.gov/wp-content/uploads/2025/03/delta-county-forest-map.pdf',
    officialContactUrl: 'https://deltacountymi.gov/parks/forestland/',
    cost: 'Free permit required.',
    costDisplay: 'Free permit required; contact Delta County Parks & Recreation.',
    showers: 'No',
    water: 'No potable water.',
    toilets: 'No restroom facilities.',
    electric: 'No',
    amenities: 'No developed amenities; spotty cell reception noted by county.',
    access: 'Official county forestland access/directions marker, not a campsite. Main road maintained; secondary roads may be rough or seasonal.',
    season: 'Year-round recreational use described, but seasonal road/gate restrictions may apply during thaw, weather or logging conditions.',
    markerType: 'rule_area',
    exactCampsiteLocation: false,
    parentCoordinatePurpose: 'Official County Forestland access/directions coordinate; not a campsite or specific permitted camping location.',
    coordinateConfidence: 'High for official county directions/access coordinate; false for campsite location.',
    locationPrecision: 'Official Delta County Forestland directions link uses destination coordinate 45.913, -87.3064444.',
    ruleSummary: 'Rustic camping is allowed on Delta County Forestland with a free permit that must be posted; no camping in the parking area adjacent to the partnership/MNRTF sign and walking trailhead; vegetation cutting/damage prohibited.',
    userFacingCaution: 'Rule/access marker only — this is not a campsite pin. Obtain and post the free permit, avoid prohibited parking/trailhead areas, do not block access, and do not cut or damage vegetation.',
    areaOverlayStatus: 'not-yet-available',
    areaOverlayNote: 'Future outline should use official Delta County Forestland map/GIS/boundary data only.',
    lastChecked: corridorChecked,
    verificationStatus: 'verified-v23.0.82-rule-area',
    auditBatch: 'v23.0.82 corridor boondocking rule/system markers',
    qualityGate: 'official-legality-plus-parent-marker'
  }, /delta\s+county\s+forestland.*rustic\s+camping|delta\s+county\s+forestland/);

  addCorridorSite({
    id: 'mi-marquette-county-forest-camping-registration-needs-verification-v23082',
    name: 'Marquette County Forest Camping Registration Rule Area — Needs Verification',
    lat: 46.537,
    lng: -87.395,
    stateCode: 'MI',
    stateName: 'Michigan',
    layer: 'info',
    subtype: 'needs-verification',
    rawCategory: 'needs verification county forest camping rule area',
    categoryLabel: 'Needs Verification',
    sourceFolder: 'v23.0.82 Green Bay to Ishpeming corridor boondocking validation leads',
    owner: 'Marquette County Forestry Commission / Marquette County Planning',
    ownerLevel: 'County',
    layerLabel: 'Needs Verification',
    description: 'Needs Verification lead for Marquette County Forest camping registration rules. Official legality is proven, but no accepted official parent/contact/access coordinate has been found. This is not an import-ready legal camping marker.',
    website: 'https://www.co.marquette.mi.us/departments/planning/camping_in_the_county_forest.php',
    sourceName: 'Marquette County Camping in the County Forest',
    sourceUrl: 'https://www.co.marquette.mi.us/departments/planning/camping_in_the_county_forest.php',
    officialRulesUrl: 'https://www.co.marquette.mi.us/departments/planning/camping_in_the_county_forest.php',
    officialMapUrl: 'https://www.co.marquette.mi.us/departments/planning/county_forest.php',
    officialContactUrl: 'https://www.co.marquette.mi.us/departments/planning/index.php',
    cost: 'No fee found in checked county sources; registration card process documented.',
    costDisplay: 'No fee found in checked county sources; registration card process documented.',
    showers: 'No',
    water: 'No developed water service documented.',
    toilets: 'No developed toilet service documented.',
    electric: 'No',
    amenities: 'No developed amenities documented for county forest camping.',
    access: 'Validation marker only. Do not treat this coordinate as a campsite, access point or office coordinate.',
    season: 'Not fully verified; follow county forest rules, posted closures, fire restrictions and access conditions.',
    markerType: 'rule_area',
    exactCampsiteLocation: false,
    parentCoordinatePurpose: 'Needs official parent/contact/access coordinate before promotion from validation layer.',
    coordinateConfidence: 'Low — placeholder validation marker only, not an accepted parent coordinate.',
    locationPrecision: 'Validation-layer placeholder only. Official coordinate proof still missing; do not use as campsite/access coordinate.',
    ruleSummary: 'Official Marquette County sources prove county forest camping rules, including 15 consecutive night limit, move at least 1/2 mile from previous camp, and occupancy/trash/fire rules.',
    userFacingCaution: 'Needs Verification — not an import-ready legal camping location. Official camping legality is proven, but an accepted official parent/contact/access coordinate is still missing.',
    exactMissingProof: 'Official Marquette County GIS feature, ArcGIS layer data, official access-point coordinate, official coordinate-bearing map point, or official Resource Management/Forestry contact page exposing coordinates.',
    areaOverlayStatus: 'not-yet-available',
    areaOverlayNote: 'Future outline should use official Marquette County Forest GIS/boundary data only.',
    lastChecked: corridorChecked,
    verificationStatus: 'needs-verification-v23.0.82',
    auditBatch: 'v23.0.82 corridor boondocking validation leads',
    qualityGate: 'legality-proven-coordinate-missing'
  }, /marquette\s+county\s+forest.*camping.*registration|marquette\s+county\s+forest.*needs\s+verification/);

})();