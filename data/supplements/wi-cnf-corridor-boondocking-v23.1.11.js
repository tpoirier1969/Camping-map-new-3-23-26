// Wisconsin CNF corridor boondocking import v23.1.11
// Adds 2 verified corridor-priority Chequamegon-Nicolet NF Boondocking / Dispersed records:
// Camp 3 Dispersed and Burnt Bridge. No config.js. No app/index wrapper changes.
(function(){
  'use strict';
  window.CAMPING_STATE_DATA = window.CAMPING_STATE_DATA || {};
  const list = window.CAMPING_STATE_DATA['WI'] = Array.isArray(window.CAMPING_STATE_DATA['WI']) ? window.CAMPING_STATE_DATA['WI'] : [];
  function text(v){return String(v == null ? '' : v).trim();}
  function existsByIdOrCoordinate(id, lat, lng){
    return list.some(site => text(site.id) === id || (Math.abs(Number(site.lat)-Number(lat)) < 0.00002 && Math.abs(Number(site.lng)-Number(lng)) < 0.00002));
  }
  const common = {
    stateCode: 'WI',
    stateName: 'Wisconsin',
    owner: 'USDA Forest Service — Chequamegon-Nicolet National Forest',
    ownerLevel: 'Federal',
    subtype: 'dispersed',
    rawCategory: 'verified CNF primitive/dispersed campsite cluster',
    exactCampsiteLocation: false,
    auditBatch: 'v23.1.11 WI CNF corridor boondocking import',
    lastChecked: '2026-06-10',
    dataCorrectionFile: 'data/supplements/wi-cnf-corridor-boondocking-v23.1.11.js',
    dataCorrectionVersion: 'v23.1.11',
    dataCorrectionDate: '2026-06-10',
    verificationStatus: 'verified-v23.1.11-cnf-corridor-hard-pass',
    qualityGate: 'published-coordinate-plus-official-DNR-USFS-site-context-and-CNF-rules',
    website: 'https://www.fs.usda.gov/r09/chequamegon-nicolet/recreation/camping-cabins',
    sourceName: 'Hard verification pass: public campsite coordinate + official DNR/USFS/CNF context',
    sourceUrl: 'https://www.fs.usda.gov/r09/chequamegon-nicolet/recreation/camping-cabins',
    officialRulesUrl: 'https://www.fs.usda.gov/r09/chequamegon-nicolet/recreation/camping-cabins',
    officialForestOrderUrl: 'https://www.fs.usda.gov/r09/chequamegon-nicolet/alerts/forest-order-09-13-25-02-general-occupancy-and-use-restrictions',
    officialMvumUrl: 'https://www.fs.usda.gov/r09/chequamegon-nicolet/maps-guides/motor-vehicle-use-maps',
    cost: 'No ordinary CNF dispersed-camping fee documented; verify current posted notices, pass, or parking instructions on arrival.',
    costDisplay: 'No ordinary dispersed-camping fee documented; verify posted notices.',
    showers: 'No showers documented; primitive/dispersed site context.',
    electric: 'No electric hookups documented.',
    water: 'No potable water documented.',
    toilets: 'Primitive/no facilities unless posted or present on site; verify on arrival.',
    season: 'Follow current CNF MVUM, seasonal road closures, weather, and posted restrictions.',
    ruleSummary: 'CNF dispersed camping is allowed outside developed campground settings and exclusions, subject to stay limits, setbacks, MVUM/open-road rules, parking limits, and resource-protection rules.',
    stayLimit: 'CNF current order/rules: do not exceed 21 days in the same dispersed location within a 28-day period; move at least one road mile before returning under the rule period.',
    knownRestrictions: 'Verify current MVUM/open-road status; camp only at the established primitive site/pull-off; do not block roads, landings, bridge approaches, or turnarounds; avoid resource damage and posted closures.',
    locationPrecision: 'Published coordinate and official map/access context support a primitive campsite cluster; use as navigate-and-verify field lead, not a surveyed campsite corner.',
    layer: 'boondocking',
    categoryLabel: 'Boondocking',
    layerLabel: 'Boondocking / Dispersed',
    markerType: 'verified-cnf-dispersed-campsite-cluster'
  };
  const additions = [
    Object.assign({}, common, {
      id: 'wi-cnf-camp-3-dispersed-v23111',
      name: 'Camp 3 Dispersed',
      lat: 45.62817900000001,
      lng: -88.59914110000001,
      county: 'Forest',
      nearestTown: 'Laona / Armstrong Creek edge',
      nearestRoadOrAccess: 'Browns Road / Camp Three Lake access; CNF roads 2131, 2132, and 2128 area per official access context',
      coordinateSource: 'The Dyrt — Camp 3 Dispersed; hard verification used official Wisconsin DNR Camp Three Lake access context',
      coordinateSourceUrl: 'https://thedyrt.com/camping/wisconsin/camp-3-dispersed',
      officialOwnershipUrl: 'https://dnr.wisconsin.gov/topic/statenaturalareas/CampThreeLake',
      officialAccessUrl: 'https://dnrmaps.wi.gov/LF_ShowDetails/boats.aspx?ID=2871',
      description: 'Primitive CNF lake campsite cluster at Camp Three Lake. Public coordinate describes drive-in access and two lake-adjacent sites; official DNR/USFS-managed access context confirms two adjacent campsites, resolving the boat-landing-only concern enough for active boondocking import.',
      access: 'Access off Browns Road / Camp Three Lake area; verify current Lakewood-Laona MVUM road status and posted conditions before driving in.',
      amenities: 'Primitive lake campsite context. No hookups or potable water documented. Official access context confirms two adjacent campsites near the access area.',
      reviewSummary: 'Moved to active Boondocking / Dispersed after hard verification found official DNR/USFS-managed access context with two adjacent campsites plus CNF dispersed camping rules. Do not use the landing/turnaround if the actual campsite is not obvious.',
      userFacingCaution: 'CNF primitive/dispersed campsite cluster at Camp Three Lake. Official access context confirms adjacent campsites, but verify posted notices and MVUM access. Do not camp in the landing, road, or turnaround.'
    }),
    Object.assign({}, common, {
      id: 'wi-cnf-burnt-bridge-dispersed-v23111',
      name: 'Burnt Bridge Dispersed',
      lat: 45.562444799999994,
      lng: -88.4952108,
      county: 'Forest',
      nearestTown: 'Armstrong Creek / Laona edge',
      nearestRoadOrAccess: 'Burnt Bridge Road / Forest Road 2134 / Peshtigo River area',
      coordinateSource: 'The Dyrt — Burnt Bridge; hard verification used official USFS Peshtigo River area map context',
      coordinateSourceUrl: 'https://thedyrt.com/camping/wisconsin/burnt-bridge-wi',
      officialOwnershipUrl: 'https://www.fs.usda.gov/r09/chequamegon-nicolet/maps-guides/motor-vehicle-use-maps',
      officialAccessUrl: 'https://www.fs.usda.gov/r09/chequamegon-nicolet/maps-guides/motor-vehicle-use-maps',
      description: 'Primitive dispersed campsite cluster near Burnt Bridge / FR 2134 on the Peshtigo River. Public source describes two primitive sites, one north and one south of the bridge; hard verification found official USFS map support for dispersed campsite symbols in the Burnt Bridge cluster.',
      access: 'Burnt Bridge Road / FR 2134; verify current Lakewood-Laona MVUM legal motor-vehicle use and parking before relying on the route.',
      amenities: 'Primitive riverside campsite context; no hookups or potable water documented.',
      reviewSummary: 'Moved to active Boondocking / Dispersed after hard verification found official USFS dispersed-campsite map context for the Burnt Bridge / FR 2134 cluster. Bridge/road conflict remains a user caution: camp only at the actual primitive site, not on the road, bridge approach, or turnaround.',
      userFacingCaution: 'CNF dispersed campsite cluster near Burnt Bridge / FR 2134. Use the actual primitive site, not the bridge approach, road, landing, or turnaround. Verify current MVUM and posted conditions.'
    })
  ];
  additions.forEach(site => {
    if(!existsByIdOrCoordinate(site.id, site.lat, site.lng)) list.push(site);
  });
})();
