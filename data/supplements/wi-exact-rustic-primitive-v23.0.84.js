// Wisconsin exact rustic / primitive point cleanup v23.0.84
// Adds/refreshes only official coordinate-bearing records from the Option C backlog.
(function(){
  'use strict';
  window.CAMPING_STATE_DATA = window.CAMPING_STATE_DATA || {};
  const list = window.CAMPING_STATE_DATA['WI'] = Array.isArray(window.CAMPING_STATE_DATA['WI']) ? window.CAMPING_STATE_DATA['WI'] : [];
  const checked = '2026-06-03';
  const batch = 'v23.0.84 exact rustic / primitive backlog';
  function text(v){ return String(v || '').trim(); }
  function norm(v){ return text(v).toLowerCase(); }
  function nameOf(site){ return norm(site && site.name); }
  function existsByIdOrName(id, pattern){ return list.some(site => text(site.id) === id || pattern.test(nameOf(site))); }
  function patchByName(pattern, patch){
    let count = 0;
    list.forEach(site => {
      if(pattern.test(nameOf(site))){
        Object.assign(site, patch, {
          lastChecked: checked,
          verificationStatus: patch.verificationStatus || 'verified-v23.0.84-exact-official-coordinate',
          auditBatch: batch,
          qualityGate: 'official-coordinate-bearing-source',
          dataCorrectionFile: 'data/supplements/wi-exact-rustic-primitive-v23.0.84.js',
          dataCorrectionVersion: 'v23.0.84',
          dataCorrectionDate: checked
        });
        count++;
      }
    });
    return count;
  }
  function addSite(site, pattern){
    if(!existsByIdOrName(site.id, pattern)){
      list.push(Object.assign({
        stateCode: 'WI',
        stateName: 'Wisconsin',
        lastChecked: checked,
        verificationStatus: 'verified-v23.0.84-exact-official-coordinate',
        auditBatch: batch,
        qualityGate: 'official-coordinate-bearing-source',
        dataCorrectionFile: 'data/supplements/wi-exact-rustic-primitive-v23.0.84.js',
        dataCorrectionVersion: 'v23.0.84',
        dataCorrectionDate: checked
      }, site));
    }
  }

  patchByName(/bagley\s+rapids\s+recreation\s+area/, {
    layer: 'federal',
    subtype: 'rustic',
    markerType: 'exact',
    exactCampsiteLocation: true,
    categoryLabel: 'Rustic Campgrounds',
    layerLabel: 'Rustic Campgrounds',
    owner: 'USDA Forest Service — Chequamegon-Nicolet National Forest',
    ownerLevel: 'Federal',
    website: 'https://www.fs.usda.gov/r09/chequamegon-nicolet/recreation/bagley-rapids-recreation-area',
    sourceName: 'USDA Forest Service — Bagley Rapids Recreation Area',
    sourceUrl: 'https://www.fs.usda.gov/r09/chequamegon-nicolet/recreation/bagley-rapids-recreation-area',
    cost: '$15/night single site; Interagency Senior/Access Pass discount may apply.',
    costDisplay: '$15/night single site per USFS page; discounts may apply.',
    water: 'Potable water available; USFS page lists solar well and hand pump.',
    toilets: 'Restroom/toilet status should be checked on-site; accessible USFS text does not expose a clear toilet type.',
    electric: 'No electric hookups.',
    showers: 'No showers documented.',
    amenities: '36 campsites near the Oconto River; no electric hookups; potable water by solar well/hand pump; first-come camping only.',
    access: 'Drive-in federal rustic campground about 5 minutes south of Mountain via Bagley Rapids Road / FR 2111.',
    season: 'May 2 - October 15 per USFS page.',
    locationPrecision: 'Official USFS latitude/longitude: 45.1575, -88.4659.',
    sourceNotes: 'v23.0.84 refreshed from current official USFS page with official coordinate, fee, season and amenity details.'
  });

  patchByName(/chipmunk\s+rapids\s+recreation\s+area/, {
    lat: 45.8925,
    lng: -88.55666667,
    layer: 'federal',
    subtype: 'rustic',
    markerType: 'exact',
    exactCampsiteLocation: true,
    categoryLabel: 'Rustic Campgrounds',
    layerLabel: 'Rustic Campgrounds',
    owner: 'USDA Forest Service — Chequamegon-Nicolet National Forest',
    ownerLevel: 'Federal',
    website: 'https://www.fs.usda.gov/r09/chequamegon-nicolet/recreation/chipmunk-rapids-recreation-area',
    sourceName: 'USDA Forest Service — Chipmunk Rapids Recreation Area',
    sourceUrl: 'https://www.fs.usda.gov/r09/chequamegon-nicolet/recreation/chipmunk-rapids-recreation-area',
    cost: '$15/night single site; Interagency Senior/Access Pass discount may apply.',
    costDisplay: '$15/night single site per USFS page; discounts may apply.',
    water: 'Potable water available from artesian well.',
    toilets: 'Vault toilet documented by USFS description; check current onsite status.',
    electric: 'No electric hookups documented.',
    showers: 'No showers documented.',
    amenities: '6 campsites with fire rings, vault toilet, drinking water/artesian well, Pine River carry-in canoe access nearby.',
    access: 'Drive-in rustic national forest campground on FR 2156 / Chipmunk Rapids Road west of Florence.',
    season: 'April 25 - November 30 per USFS page.',
    locationPrecision: 'Official USFS latitude/longitude: 45.8925, -88.55666667.',
    sourceNotes: 'v23.0.84 refreshed from current official USFS page with official coordinate, fee, season and amenity details.'
  });

  patchByName(/richardson\s+lake\s+recreation\s+area/, {
    layer: 'federal',
    subtype: 'rustic',
    markerType: 'exact',
    exactCampsiteLocation: true,
    categoryLabel: 'Rustic Campgrounds',
    layerLabel: 'Rustic Campgrounds',
    owner: 'USDA Forest Service — Chequamegon-Nicolet National Forest',
    ownerLevel: 'Federal',
    website: 'https://www.fs.usda.gov/r09/chequamegon-nicolet/recreation/richardson-lake-recreation-area',
    sourceName: 'USDA Forest Service — Richardson Lake Recreation Area',
    sourceUrl: 'https://www.fs.usda.gov/r09/chequamegon-nicolet/recreation/richardson-lake-recreation-area',
    cost: '$15/night single site; Interagency Senior/Access Pass discount may apply.',
    costDisplay: '$15/night single site per USFS page; discounts may apply.',
    water: 'Potable water available.',
    toilets: 'Documented unknown: USFS text says vault toilets are provided in one section, but the facility block says restrooms are not available. Check current USFS page/onsite notices.',
    electric: 'No electric hookups documented.',
    showers: 'No showers documented.',
    amenities: '26 wooded sites; camp host; drinking water; swim beach; picnic area; boat landing; some reservable sites.',
    access: 'Drive-in federal rustic campground on Richardson Lake Road / FR 2880 west of Wabeno.',
    season: 'May 2 - November 30 per USFS page.',
    locationPrecision: 'Official USFS latitude/longitude: 45.4415, -88.7153.',
    sourceNotes: 'v23.0.84 refreshed from current official USFS page with official coordinate, fee, season and amenity details.'
  });

  addSite({
    id: 'wi-lauterman-national-recreation-area-walk-in-canoe-in-v23084',
    name: 'Lauterman National Recreation Area Walk-In / Canoe-In Campsites',
    lat: 45.92416667,
    lng: -88.49694444,
    layer: 'boat-backpack',
    subtype: 'walk-in-canoe-in',
    siteForm: 'walk-in-canoe-in-campsites',
    markerType: 'exact',
    exactCampsiteLocation: true,
    rawCategory: 'official USFS walk-in canoe-in primitive campsites',
    categoryLabel: 'Boat / Backpack',
    layerLabel: 'Boat / Backpack',
    owner: 'USDA Forest Service — Chequamegon-Nicolet National Forest',
    ownerLevel: 'Federal',
    description: 'Official USFS marker for Lauterman National Recreation Area primitive camping: five walk-in/canoe-in campsites along Lauterman Lake with tables, tent pads, fire rings and wilderness-style toilets. This is a camping marker, separate from the existing day-use/trailhead traveler-stop marker.',
    website: 'https://www.fs.usda.gov/r09/chequamegon-nicolet/recreation/lauterman-national-recreation-area',
    sourceName: 'USDA Forest Service — Lauterman National Recreation Area',
    sourceUrl: 'https://www.fs.usda.gov/r09/chequamegon-nicolet/recreation/lauterman-national-recreation-area',
    cost: '$5/night single campsite; $5 day-use fee also listed by USFS.',
    costDisplay: '$5/night single campsite; verify current USFS fee/pass terms.',
    water: 'No potable water documented for the camping area.',
    toilets: 'Wilderness-style toilets at the primitive campsites per USFS description; facility block says restrooms are not available at the recreation area/trailhead.',
    electric: 'No',
    showers: 'No',
    amenities: 'Five walk-in/canoe-in campsites with tables, tent pads, fire rings and wilderness-style toilets; trailhead/parking and Lauterman National Recreation Trail access nearby.',
    access: 'Walk-in or canoe-in primitive camping near Lauterman Lake; trailhead directions from State Highway 70 west of Florence.',
    season: 'January 1 - December 31 per USFS page; verify winter access and road conditions before relying on it.',
    reservation_url: 'https://www.fs.usda.gov/r09/chequamegon-nicolet/recreation/lauterman-national-recreation-area',
    locationPrecision: 'Official USFS latitude/longitude for Lauterman National Recreation Area access: 45.92416667, -88.49694444. Campsites are primitive walk-in/canoe-in sites, not individual campsite coordinate pins.',
    reviewSummary: 'Small, low-service primitive camping option for paddlers, hikers and mountain bikers who want a quieter Lauterman Lake base rather than a drive-up campground loop.',
    userFacingCaution: 'Exact official recreation-area/camping marker, not an individual numbered campsite pin. Use USFS trail/site information and posted rules to locate the designated campsites.'
  }, /lauterman\s+national\s+recreation\s+area.*walk|lauterman.*canoe.*camp/);
})();
