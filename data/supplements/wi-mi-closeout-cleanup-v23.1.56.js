// Tod's Boondocking & Camping Maps — WI/MI/UP closeout cleanup v23.1.56
// Reconstructed compatibility file for the manifest-referenced v23.1.56 runtime corrections.
// The current package contained the v23.1.56 build notes and manifest references, but not this file.
// Scope from BUILD-NOTES-v23.1.56.txt: no new active records; four MI active records are corrected to Rustic / Primitive.
(function(){
  'use strict';
  const VERSION = 'v23.1.56';
  const FILE = 'data/supplements/wi-mi-closeout-cleanup-v23.1.56.js';
  const CORRECTIONS = {
    MI: {
      s269: 'East Lake Campsites — corrected to Rustic / Primitive from v23.1.56 WI/MI/UP closeout cleanup notes.',
      s1073: 'Swan Lake Campsites — corrected to Rustic / Primitive from v23.1.56 WI/MI/UP closeout cleanup notes.',
      s497: 'Lake Gogebic County Park — corrected to Rustic / Primitive because Modern proof was not met by available official/operator evidence.',
      s545: 'Little Girls Point County Park — corrected to Rustic / Primitive based on county rustic/vault-restroom proof.'
    }
  };
  function clean(v){return String(v == null ? '' : v).trim().toLowerCase();}
  function patchSite(site, reason){
    Object.assign(site, {
      layer: 'rustic',
      subtype: 'rustic / primitive',
      rawCategory: 'rustic / primitive',
      categoryLabel: 'Rustic / Primitive',
      layerLabel: 'Rustic / Primitive',
      facilityType: site.facilityType || 'Rustic / Primitive Campground',
      markerType: 'rustic-primitive-campground',
      showers: site.showers || 'No Modern shower/bathhouse proof in v23.1.56 closeout notes.',
      reviewSummary: reason,
      popupNote: (site.popupNote ? site.popupNote + ' ' : '') + 'v23.1.56 closeout cleanup: layer corrected to Rustic / Primitive; verify current amenities, fees, rules, and access before staying.',
      verificationStatus: site.verificationStatus || 'verified-legal-layer-corrected-v23.1.56',
      dataCorrectionFile: FILE,
      dataCorrectionVersion: VERSION,
      dataCorrectionDate: '2026-06-29'
    });
  }
  function applyAll(){
    window.CAMPING_STATE_DATA = window.CAMPING_STATE_DATA || {};
    Object.keys(CORRECTIONS).forEach(stateCode => {
      const list = window.CAMPING_STATE_DATA[stateCode];
      if(!Array.isArray(list))return;
      const rows = CORRECTIONS[stateCode];
      Object.keys(rows).forEach(id => {
        const site = list.find(s => clean(s && s.id) === clean(id));
        if(site)patchSite(site, rows[id]);
      });
    });
  }
  applyAll();
})();

// v23.1.125: Western U.P. community-reported boondocking additions.
// Tod approved a lighter community threshold for this class of site: a camping-app listing plus at least one
// firsthand overnight report can support an active Community Reported boondocking record when no official
// contradiction is found. FR 360 is included by Tod's explicit site-specific approval after Google Maps review.
(function(){
  'use strict';
  const VERSION = 'v23.1.125';
  const FILE = 'data/supplements/wi-mi-closeout-cleanup-v23.1.56.js';
  const CHECKED = '2026-08-18';
  window.CAMPING_STATE_DATA = window.CAMPING_STATE_DATA || {};
  const list = window.CAMPING_STATE_DATA.MI = Array.isArray(window.CAMPING_STATE_DATA.MI) ? window.CAMPING_STATE_DATA.MI : [];

  function norm(v){return String(v == null ? '' : v).toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();}
  function add(site){
    const nameKey = norm(site.name);
    if(list.some(existing => String(existing && existing.id || '') === site.id || norm(existing && existing.name) === nameKey)) return;
    list.push(Object.assign({
      stateCode: 'MI',
      stateName: 'Michigan',
      layer: 'boondocking',
      subtype: 'boondocking / dispersed',
      siteForm: 'community-reported dispersed campsite / tight cluster',
      rawCategory: 'Boondocking / Dispersed',
      categoryLabel: 'Boondocking / Dispersed',
      layerLabel: 'Boondocking / Dispersed',
      sourceFolder: 'Western U.P. community boondocking v23.1.125',
      cost: 'Free community-reported dispersed camping; verify current permits, rules and postings.',
      costDisplay: 'Free / no developed campground fee reported. Verify current permits, rules and postings before staying.',
      costNeedsReview: true,
      showers: 'No',
      water: 'No developed potable-water service reported.',
      toilets: 'No developed toilet service reported.',
      electric: 'No',
      amenities: 'No developed services assumed. Pack in / pack out and be self-contained.',
      season: 'Seasonal road and weather conditions can limit access; verify current closures, fire restrictions and posted rules.',
      exactCampsiteLocation: false,
      verificationStatus: 'community-reported-active-v23.1.125',
      verificationDate: CHECKED,
      dataCorrectionFile: FILE,
      dataCorrectionVersion: VERSION,
      dataCorrectionDate: CHECKED
    }, site));
  }

  add({
    id: 'mi-v231125-crowned-creek-south-boundary-road-community-boondocking',
    name: 'Crowned Creek on South Boundary Road',
    lat: 46.70984841,
    lng: -89.76249555,
    owner: 'Public-land setting near the Porcupine Mountains / Ottawa National Forest area; verify current parcel and postings',
    description: 'Community Reported roadside forest boondocking near South Boundary Road. A 2026 camper report describes an overnight at a single pull-in campsite with a central fire ring, and The Dyrt lists the location as dispersed camping. This is community proof, not an official designated-campsite listing.',
    website: 'https://thedyrt.com/camping/michigan/crowned-creek-on-south-boundary-road',
    sourceName: 'The Dyrt camping-app listing plus 2026 firsthand camper overnight report',
    sourceUrl: 'https://thedyrt.com/camping/michigan/crowned-creek-on-south-boundary-road',
    officialSourceUrl: 'https://www.fs.usda.gov/r09/ottawa',
    access: 'Drive-in roadside clearing. The reported site is close to South Boundary Road; the continuation beyond it may be overgrown or rough.',
    reviewSummary: 'Community Reported — camping-app listing plus a firsthand 2026 overnight report at the same location.',
    communityEvidence: 'The Dyrt lists dispersed camping at this coordinate; a July 2026 camper reported staying at the single pull-in site and described the fire ring and access.',
    officialContradictionCheck: 'No site-specific official no-camping or closure contradiction was found in the checked Ottawa National Forest public web materials. Posted signs and current forest/state rules control on the ground.',
    coordinateConfidence: 'High for the community-reported site locator; not an official agency campsite coordinate.',
    locationPrecision: 'The Dyrt community campsite pin at the described South Boundary Road pull-in; not official agency precision.',
    userFacingCaution: 'Community Reported. Verify current ownership, posted restrictions, fire rules and road conditions before staying.'
  });

  add({
    id: 'mi-v231125-ontonagon-river-dispersed-community-boondocking',
    name: 'Ontonagon River Dispersed',
    lat: 46.6988451,
    lng: -89.1578341,
    owner: 'Public-land setting in the western U.P.; verify current parcel and posted restrictions',
    description: 'Community Reported dispersed camping near the Ontonagon River corridor. The Dyrt identifies the location as drive-in dispersed camping, and a July 2026 camper reported staying here, with one spot near the highway and two additional spots farther down the trail.',
    website: 'https://thedyrt.com/camping/michigan/ontonagon-river-dispersed',
    sourceName: 'The Dyrt camping-app listing plus July 2026 firsthand camper overnight report',
    sourceUrl: 'https://thedyrt.com/camping/michigan/ontonagon-river-dispersed',
    officialSourceUrl: 'https://www.fs.usda.gov/r09/ottawa/recreation/ontonagon-ranger-district',
    access: 'Drive-in primitive access. Community report describes one spot near the highway and two more farther down the trail.',
    reviewSummary: 'Community Reported — camping-app listing plus a firsthand July 2026 overnight report at the same site.',
    communityEvidence: 'The Dyrt lists this as dispersed camping at 46.6988451, -89.1578341; a July 2026 camper reported an overnight stay and described three usable camping spots.',
    officialContradictionCheck: 'No site-specific official no-camping or closure contradiction was found in the checked Ottawa National Forest / Ontonagon Ranger District public web materials. Posted restrictions control on site.',
    coordinateConfidence: 'High for the camping-app/community site locator; not an official agency campsite coordinate.',
    locationPrecision: 'The Dyrt community campsite coordinate; represents the small described dispersed-site cluster.',
    userFacingCaution: 'Community Reported. No amenities. Verify current public-land status, postings, fire restrictions and access before staying.'
  });

  add({
    id: 'mi-v231125-lake-perrault-community-boondocking',
    name: 'Lake Perrault Dispersed Camping',
    lat: 47.02924716,
    lng: -88.73128049,
    owner: 'Public-land setting; community sources describe dispersed camping, but verify current land manager and postings',
    description: 'Community Reported dispersed camping around Lake Perrault. The Dyrt lists the location as drive-in dispersed camping and contains multiple firsthand overnight reports describing cleared sites and rock fire rings, including several near the water. Access road potholes and limited room for larger rigs are recurring cautions.',
    website: 'https://thedyrt.com/camping/michigan/lake-perrault',
    sourceName: 'The Dyrt camping-app listing with multiple firsthand camper overnight reports',
    sourceUrl: 'https://thedyrt.com/camping/michigan/lake-perrault',
    access: 'Drive-in on an unpaved road reported to have large potholes. Best suited to tents, vans and smaller trailers; larger rigs may have limited turning room.',
    reviewSummary: 'Community Reported — multiple campers describe overnight dispersed camping, cleared sites and fire rings at the same lakefront cluster.',
    communityEvidence: 'The Dyrt lists dispersed camping at 47.02924716, -88.73128049 and carries multiple firsthand reports of overnight stays and established cleared camping spots.',
    officialContradictionCheck: 'No site-specific official contradiction was located in the checked public sources. Current ownership, permit requirements and posted restrictions should be verified before staying.',
    coordinateConfidence: 'High for the community-reported camping cluster; not an official agency campsite coordinate.',
    locationPrecision: 'Camping-app/community pin for the Lake Perrault dispersed cluster, not an individual campsite pad.',
    userFacingCaution: 'Community Reported. Rough potholed access and no services. Verify current ownership, permits and posted rules before staying.'
  });

  add({
    id: 'mi-v231125-fr360-marenisco-community-boondocking',
    name: 'FR 360 Boondocking — Marenisco',
    lat: 46.66874,
    lng: -89.61162,
    owner: 'Ottawa National Forest area / public-land setting; verify exact parcel and current postings',
    description: 'Community-reported primitive clearings along Forest Road 360 near Marenisco. A public boondocking guide identifies several small clearings with informal fire rings at this coordinate. Tod reviewed the location in Google Maps and explicitly approved it for the active boondocking layer. This is not presented as an official designated campground.',
    website: 'https://boondockinglocations.com/the-michigan-up-boondocking/',
    sourceName: 'Boondocking Locations community guide plus Tod Google Maps visual review and explicit approval',
    sourceUrl: 'https://boondockinglocations.com/the-michigan-up-boondocking/',
    officialSourceUrl: 'https://www.fs.usda.gov/r09/ottawa',
    access: 'Unpaved Forest Road 360. Community guide recommends higher clearance in wet conditions and describes small sites suitable for tents or compact campers.',
    reviewSummary: 'Community Reported / Tod-approved — guide-described primitive clearings at FR 360, visually reviewed in Google Maps before addition.',
    communityEvidence: 'Boondocking Locations identifies FR 360 at 46.66874, -89.61162 as primitive boondocking with small clearings and informal fire rings. Tod independently reviewed the location in Google Maps and directed that it be added.',
    officialContradictionCheck: 'No site-specific official no-camping or closure contradiction was found in the checked Ottawa National Forest public web materials. Current MVUM access, forest orders and posted restrictions control.',
    coordinateConfidence: 'Medium-high community locator with project-owner visual confirmation; not an official agency campsite coordinate.',
    locationPrecision: 'Community guide coordinate for the FR 360 clearing area, visually reviewed by Tod; not an individual pad or official campsite point.',
    userFacingCaution: 'Community Reported / user-approved. Verify MVUM road status, current postings, fire restrictions and ground conditions before staying.'
  });
})();
