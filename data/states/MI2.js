// Camping Map Michigan base data continuation v23.0.33
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
          dataCorrectionVersion: 'v23.0.33',
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

  // Add: Mouth of the Montreal River, Keweenaw — user-requested boondocking site.
  if(!existsByIdOrName('mi-boondocking-montreal-river-mouth', /mouth\s+of\s+the\s+montreal\s+river|montreal\s+river\s+mouth/)){
    list.push({
      id: 'mi-boondocking-montreal-river-mouth',
      name: 'Mouth of the Montreal River',
      lat: 47.3925361,
      lng: -87.8410194,
      stateCode: 'MI',
      stateName: 'Michigan',
      layer: 'boondocking',
      subtype: 'rustic',
      siteForm: 'dispersed-area',
      rawCategory: 'boondocking rustic',
      categoryLabel: 'Boondocking',
      sourceFolder: 'Michigan base data continuation',
      owner: 'Michigan public land / Keweenaw shoreline area',
      layerLabel: 'Boondocking / dispersed',
      description: 'Boondocking-style public-land camping area at the Lake Superior mouth of the Montreal River on the Keweenaw Peninsula. The draw is remote shoreline access, river-mouth scenery, and a low-service setting rather than developed campground amenities.',
      website: 'https://en.wikipedia.org/wiki/Montreal_River_(Michigan)',
      sourceName: 'Montreal River public-land acquisition reference; user-requested project site',
      sourceUrl: 'https://en.wikipedia.org/wiki/Montreal_River_(Michigan)',
      sourceNotes: 'The Montreal River page notes the state purchase covers the river mouth and several miles upstream; this record is included as a project-requested boondocking site, not a developed campground.',
      cost: 'Free / no developed campground fee expected; verify any posted local/state restrictions before staying.',
      costDisplay: 'No developed campground fee is expected for this boondocking-style public-land site, but verify current posted rules before relying on it.',
      costCheckedDate: checked,
      costNeedsReview: false,
      showers: 'No',
      access: 'Remote Keweenaw shoreline/river-mouth access. Expect rough-road conditions, limited services, and possible seasonal access issues. Arrive in daylight and verify the exact legal parking/camping spot on site.',
      amenities: 'No developed services assumed. Self-contained camping only; pack in/pack out; no showers or hookups.',
      trailheads: 'Montreal River mouth shoreline, nearby falls/river corridor, and Keweenaw coast exploration.',
      season: 'Best treated as seasonal access; snow, shoreline conditions, washouts, and posted restrictions can change access.',
      reviewSummary: 'Useful as a remote Keweenaw boondocking-style site for campers who want Lake Superior solitude and can handle no-service conditions.',
      locationPrecision: 'River-mouth coordinate for the Montreal River where it enters Lake Superior; no modern campground services claimed.',
      verificationStatus: 'verified-project-addition',
      verificationDate: checked,
      verificationNotes: 'Added at user request as a Michigan boondocking site. Montreal River mouth coordinate and public-land context checked; no modern campground services claimed.',
      dataCorrectionFile: 'data/states/MI2.js',
      dataCorrectionVersion: 'v23.0.33',
      dataCorrectionDate: checked
    });
  }
})();
