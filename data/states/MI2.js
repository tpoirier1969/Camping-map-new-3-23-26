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
    const correctionVersion = text(patch && patch.dataCorrectionVersion) || 'v23.0.34';
    const correctionDate = text(patch && patch.dataCorrectionDate) || checked;
    list.forEach(site => {
      if(pattern.test(nameOf(site))){
        Object.assign(site, patch, {
          dataCorrectionFile: 'data/states/MI2.js',
          dataCorrectionVersion: correctionVersion,
          dataCorrectionDate: correctionDate
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
    layer: 'rustic',
    subtype: 'rustic',
    owner: 'National Park Service / Pictured Rocks National Lakeshore',
    layerLabel: 'Rustic / Primitive',
    categoryLabel: 'Rustic / Primitive',
    website: 'https://www.nps.gov/piro/planyourvisit/campgrounds.htm',
    showers: 'No',
    locationPrecision: 'Corrected land-side campground/trailhead-area pin near the Hurricane River mouth access; not offshore.',
    verificationStatus: 'verified-coordinate-layer-correction',
    verificationNotes: 'Corrects previously reported offshore/Lake Superior placement and normalizes the designated drive-in campground to Rustic / Primitive based on NPS no-hookup, vault-toilet/well-water service.',
    dataCorrectionVersion: 'v23.1.112',
    dataCorrectionDate: '2026-07-14'
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



  // v23.1.114: Eastern U.P. exact-site/component closeout.
  // Integrates only clean official-coordinate additions and source-backed corrections.
  const easternUpChecked = '2026-07-14';

  patchByName(/^pretty\s+lake\s+state\s+forest\s+campground$/, {
    lat: 46.603335,
    lng: -85.65739,
    website: 'https://www.michigan.gov/recsearch/sfcampgroundsn-z/prettylake',
    sourceName: 'Michigan DNR — Pretty Lake State Forest Campground',
    sourceUrl: 'https://www.michigan.gov/recsearch/sfcampgroundsn-z/prettylake',
    locationPrecision: 'Official Michigan DNR parent-campground coordinate. This point represents the 18-site drive-in campground only; remote sites 19–26 require separate exact coordinates and are not represented by this pin.',
    coordinateConfidence: 'High — official Michigan DNR parent-campground coordinate.',
    verificationStatus: 'verified-official-coordinate-v23.1.114',
    verificationNotes: 'Moved the single live Pretty Lake parent record to the official DNR campground coordinate. The separate walk-in/paddle-in sites 19–26 remain in data/leads.js until honest individual coordinates are recovered.',
    dataCorrectionVersion: 'v23.1.114',
    dataCorrectionDate: easternUpChecked
  });

  patchByName(/^fox\s+river\s+state\s+forest\s+campground$/, {
    lat: 46.399214,
    lng: -86.028395,
    website: 'https://www.michigan.gov/recsearch/sfcampgroundsa-m/foxriver',
    sourceName: 'Michigan DNR — Fox River State Forest Campground',
    sourceUrl: 'https://www.michigan.gov/recsearch/sfcampgroundsa-m/foxriver',
    locationPrecision: 'Official Michigan DNR campground coordinate.',
    coordinateConfidence: 'High — official Michigan DNR coordinate.',
    verificationStatus: 'verified-official-coordinate-v23.1.114',
    verificationNotes: 'Official DNR coordinate applied. This campground is also an exclusion anchor for Michigan state-forest dispersed camping: qualifying dispersed sites must be more than one mile from a state forest campground.',
    dataCorrectionVersion: 'v23.1.114',
    dataCorrectionDate: easternUpChecked
  });

  patchByName(/^east\s+branch\s+of\s+the\s+fox\s+river\s+state\s+forest\s+campground$/, {
    lat: 46.4655831207,
    lng: -85.944199273,
    website: 'https://www.michigan.org/property/east-branch-fox-river-state-forest-campground',
    sourceName: 'Pure Michigan / Michigan DNR-linked — East Branch of Fox River State Forest Campground',
    sourceUrl: 'https://www.michigan.org/property/east-branch-fox-river-state-forest-campground',
    locationPrecision: 'Official state-published campground coordinate.',
    coordinateConfidence: 'High — official state-published coordinate.',
    verificationStatus: 'verified-official-coordinate-v23.1.114',
    verificationNotes: 'Official state-published coordinate applied. This campground creates a one-mile dispersed-camping exclusion under Michigan DNR state-forest rules.',
    dataCorrectionVersion: 'v23.1.114',
    dataCorrectionDate: easternUpChecked
  });

  patchByName(/^tahquamenon\s+falls\s+state\s+park\s+rivermouth\s+campgrounds$/, {
    name: 'Tahquamenon Falls State Park — Rivermouth Modern Campground',
    layer: 'modern',
    subtype: 'modern',
    rawCategory: 'state modern campground',
    categoryLabel: 'Modern Campgrounds',
    layerLabel: 'Modern Campgrounds',
    description: 'The modern Rivermouth campground component at Tahquamenon Falls State Park, separate from the Rivermouth Rustic / Pines campground. Michigan DNR describes modern/electric camping, modern restroom and shower facilities, and river access in this campground area.',
    website: 'https://www.michigan.gov/recsearch/parks/tahquamenonfalls',
    sourceName: 'Michigan DNR — Tahquamenon Falls State Park',
    sourceUrl: 'https://www.michigan.gov/recsearch/parks/tahquamenonfalls',
    access: 'Drive-in modern state-park campground at the Tahquamenon River mouth. Verify current loop, electric service, reservations, seasonal services and road conditions with Michigan DNR.',
    amenities: 'Modern/electric campground services, restroom and shower facilities, sanitation/recycling support and river access; verify current unit-specific availability.',
    locationPrecision: 'Existing campground-component coordinate retained; no coordinate move was made in v23.1.114.',
    coordinateConfidence: 'Medium — legitimate official campground component; exact component entrance still merits reservation-map QA.',
    verificationStatus: 'verified-component-layer-v23.1.114',
    verificationNotes: 'Normalized to the official Rivermouth Modern component. This is not a duplicate of the separate Rivermouth Rustic / Pines campground.',
    dataCorrectionVersion: 'v23.1.114',
    dataCorrectionDate: easternUpChecked
  });

  patchByName(/^tahquamenon\s+river\s+mouth\s+campground$/, {
    name: 'Tahquamenon Falls State Park — Rivermouth Rustic / Pines Campground',
    layer: 'rustic',
    subtype: 'rustic / semi-modern',
    rawCategory: 'state rustic semi-modern campground',
    categoryLabel: 'Rustic / Primitive',
    layerLabel: 'Rustic / Primitive',
    description: 'The separate Rivermouth Rustic / Pines campground component at Tahquamenon Falls State Park. Michigan DNR describes rustic riverfront camping among red pines, with vault toilets, seasonal water spigots and seasonal access to nearby modern facilities.',
    website: 'https://www.michigan.gov/recsearch/parks/tahquamenonfalls',
    sourceName: 'Michigan DNR — Tahquamenon Falls State Park',
    sourceUrl: 'https://www.michigan.gov/recsearch/parks/tahquamenonfalls',
    showers: 'No dedicated shower house stated for the rustic component; nearby modern facilities may be seasonally available — verify.',
    access: 'Drive-in rustic/semi-modern state-park campground along the Tahquamenon River. Verify exact loop, seasonal water, reservations and current facility access.',
    amenities: 'Vault toilets, seasonal water spigots, picnic/fire-ring camping and nearby river access; do not assume full modern services at the rustic component.',
    locationPrecision: 'Existing campground-component coordinate retained; no coordinate move was made in v23.1.114.',
    coordinateConfidence: 'Medium — legitimate official campground component; exact component entrance still merits reservation-map QA.',
    verificationStatus: 'verified-component-layer-v23.1.114',
    verificationNotes: 'Corrected from a generic Modern/state campground record to the separate official Rivermouth Rustic / Pines component. It is not a duplicate of Rivermouth Modern.',
    dataCorrectionVersion: 'v23.1.114',
    dataCorrectionDate: easternUpChecked
  });

  function addEasternUpExactSite(site, namePattern){
    if(!existsByIdOrName(site.id, namePattern)){
      list.push(Object.assign({
        dataCorrectionFile: 'data/states/MI2.js',
        dataCorrectionVersion: 'v23.1.114',
        dataCorrectionDate: easternUpChecked
      }, site));
    }
  }

  const tahquamenonBackcountryMap = 'https://www.michigan.gov/recsearch/-/media/Project/Websites/recsearch/documents/MapsT-Z/tahquamenon_backcountry_map.pdf?hash=856E509E8A6D47DAEDD0CFC7C6273A64&rev=8f560f49b5e7493f87d5ecfa1d799ac6';
  const tahquamenonParkPage = 'https://www.michigan.gov/recsearch/parks/tahquamenonfalls';

  addEasternUpExactSite({
    id: 'mi-tahquamenon-clark-lake-backcountry-campsite',
    name: 'Tahquamenon Falls State Park — Clark Lake Backcountry Campsite',
    lat: 46.6163167,
    lng: -85.2407,
    stateCode: 'MI',
    stateName: 'Michigan',
    layer: 'boat-backpack',
    subtype: 'hike-in backcountry',
    siteForm: 'hike-in designated backcountry campsite',
    rawCategory: 'state designated hike-in backcountry campsite',
    categoryLabel: 'Boat / Backpack',
    sourceFolder: 'Eastern U.P. exact-site closeout v23.1.114',
    owner: 'Michigan DNR — Tahquamenon Falls State Park',
    layerLabel: 'Boat / Backpack',
    description: 'Official designated and reservable hike-in backcountry campsite in Tahquamenon Falls State Park. This is an exact campsite point, not permission to camp elsewhere inside the park boundary.',
    website: tahquamenonParkPage,
    sourceName: 'Michigan DNR — Tahquamenon Falls Backcountry Map',
    sourceUrl: tahquamenonBackcountryMap,
    cost: 'Reservation required; verify current Michigan DNR rate.',
    costDisplay: 'Reservation required. Verify the current Michigan DNR backcountry campsite rate before booking.',
    costNeedsReview: true,
    showers: 'No',
    water: 'Carry or treat water; verify current DNR instructions.',
    toilets: 'Latrine',
    electric: 'No',
    amenities: 'Picnic table, fire ring and latrine as described by Michigan DNR; no modern campground services.',
    access: 'Hike-in designated backcountry campsite. Verify route, trail conditions, reservation, weather, fire restrictions and current park rules.',
    season: 'Verify current reservable dates, trail access and seasonal closures with Michigan DNR.',
    reviewSummary: 'Exact official DNR backcountry campsite for hikers seeking a designated remote overnight inside Tahquamenon Falls State Park.',
    locationPrecision: 'Exact official DNR GPS coordinate converted from N 46°36.979 W 085°14.442.',
    coordinateConfidence: 'High — exact coordinate printed on the official Michigan DNR backcountry map.',
    exactCampsiteLocation: true,
    verificationStatus: 'verified-official-exact-coordinate-v23.1.114',
    verificationDate: easternUpChecked,
    verificationNotes: 'Official DNR designated backcountry campsite. Reservation required; not general dispersed camping.'
  }, /tahquamenon.*clark\s+lake.*backcountry/);

  addEasternUpExactSite({
    id: 'mi-tahquamenon-old-stove-backcountry-campsite',
    name: 'Tahquamenon Falls State Park — Old Stove Backcountry Campsite',
    lat: 46.5688333,
    lng: -85.1772,
    stateCode: 'MI',
    stateName: 'Michigan',
    layer: 'boat-backpack',
    subtype: 'hike-in backcountry',
    siteForm: 'hike-in designated backcountry campsite',
    rawCategory: 'state designated hike-in backcountry campsite',
    categoryLabel: 'Boat / Backpack',
    sourceFolder: 'Eastern U.P. exact-site closeout v23.1.114',
    owner: 'Michigan DNR — Tahquamenon Falls State Park',
    layerLabel: 'Boat / Backpack',
    description: 'Official designated and reservable hike-in backcountry campsite in Tahquamenon Falls State Park. This is an exact campsite point, not permission to camp elsewhere inside the park boundary.',
    website: tahquamenonParkPage,
    sourceName: 'Michigan DNR — Tahquamenon Falls Backcountry Map',
    sourceUrl: tahquamenonBackcountryMap,
    cost: 'Reservation required; verify current Michigan DNR rate.',
    costDisplay: 'Reservation required. Verify the current Michigan DNR backcountry campsite rate before booking.',
    costNeedsReview: true,
    showers: 'No',
    water: 'Carry or treat water; verify current DNR instructions.',
    toilets: 'Latrine',
    electric: 'No',
    amenities: 'Picnic table, fire ring and latrine as described by Michigan DNR; no modern campground services.',
    access: 'Hike-in designated backcountry campsite. Verify route, trail conditions, reservation, weather, fire restrictions and current park rules.',
    season: 'Verify current reservable dates, trail access and seasonal closures with Michigan DNR.',
    reviewSummary: 'Exact official DNR backcountry campsite for hikers seeking a designated remote overnight inside Tahquamenon Falls State Park.',
    locationPrecision: 'Exact official DNR GPS coordinate converted from N 46°34.130 W 085°10.632.',
    coordinateConfidence: 'High — exact coordinate printed on the official Michigan DNR backcountry map.',
    exactCampsiteLocation: true,
    verificationStatus: 'verified-official-exact-coordinate-v23.1.114',
    verificationDate: easternUpChecked,
    verificationNotes: 'Official DNR designated backcountry campsite. Reservation required; not general dispersed camping.'
  }, /tahquamenon.*old\s+stove.*backcountry/);

  addEasternUpExactSite({
    id: 'mi-tahquamenon-wilderness-backcountry-campsite',
    name: 'Tahquamenon Falls State Park — Wilderness Backcountry Campsite',
    lat: 46.5900833,
    lng: -85.2800167,
    stateCode: 'MI',
    stateName: 'Michigan',
    layer: 'boat-backpack',
    subtype: 'hike-in backcountry',
    siteForm: 'hike-in designated backcountry campsite',
    rawCategory: 'state designated hike-in backcountry campsite',
    categoryLabel: 'Boat / Backpack',
    sourceFolder: 'Eastern U.P. exact-site closeout v23.1.114',
    owner: 'Michigan DNR — Tahquamenon Falls State Park',
    layerLabel: 'Boat / Backpack',
    description: 'Official designated and reservable hike-in backcountry campsite in Tahquamenon Falls State Park. This is an exact campsite point, not permission to camp elsewhere inside the park boundary.',
    website: tahquamenonParkPage,
    sourceName: 'Michigan DNR — Tahquamenon Falls Backcountry Map',
    sourceUrl: tahquamenonBackcountryMap,
    cost: 'Reservation required; verify current Michigan DNR rate.',
    costDisplay: 'Reservation required. Verify the current Michigan DNR backcountry campsite rate before booking.',
    costNeedsReview: true,
    showers: 'No',
    water: 'Carry or treat water; verify current DNR instructions.',
    toilets: 'Latrine',
    electric: 'No',
    amenities: 'Picnic table, fire ring and latrine as described by Michigan DNR; no modern campground services.',
    access: 'Hike-in designated backcountry campsite. Verify route, trail conditions, reservation, weather, fire restrictions and current park rules.',
    season: 'Verify current reservable dates, trail access and seasonal closures with Michigan DNR.',
    reviewSummary: 'Exact official DNR backcountry campsite for hikers seeking a designated remote overnight inside Tahquamenon Falls State Park.',
    locationPrecision: 'Exact official DNR GPS coordinate converted from N 46°35.405 W 085°16.801.',
    coordinateConfidence: 'High — exact coordinate printed on the official Michigan DNR backcountry map.',
    exactCampsiteLocation: true,
    verificationStatus: 'verified-official-exact-coordinate-v23.1.114',
    verificationDate: easternUpChecked,
    verificationNotes: 'Official DNR designated backcountry campsite. Reservation required; not general dispersed camping.'
  }, /tahquamenon.*wilderness.*backcountry/);

})();
