// Michigan exact rustic / primitive point cleanup v23.0.84
// Adds/refreshes only official coordinate-bearing records from the Option C backlog.
(function(){
  'use strict';
  window.CAMPING_STATE_DATA = window.CAMPING_STATE_DATA || {};
  const list = window.CAMPING_STATE_DATA['MI'] = Array.isArray(window.CAMPING_STATE_DATA['MI']) ? window.CAMPING_STATE_DATA['MI'] : [];
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
          dataCorrectionFile: 'data/supplements/mi-exact-rustic-primitive-v23.0.84.js',
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
        stateCode: 'MI',
        stateName: 'Michigan',
        lastChecked: checked,
        verificationStatus: 'verified-v23.0.84-exact-official-coordinate',
        auditBatch: batch,
        qualityGate: 'official-coordinate-bearing-source',
        dataCorrectionFile: 'data/supplements/mi-exact-rustic-primitive-v23.0.84.js',
        dataCorrectionVersion: 'v23.0.84',
        dataCorrectionDate: checked
      }, site));
    }
  }

  patchByName(/bay\s+furnace\s+campground/, {
    lat: 46.441368,
    lng: -86.7078021,
    layer: 'federal',
    subtype: 'rustic',
    markerType: 'exact',
    exactCampsiteLocation: true,
    rawCategory: 'official USDA developed rustic campground',
    categoryLabel: 'Rustic Campgrounds',
    layerLabel: 'Rustic Campgrounds',
    owner: 'USDA Forest Service — Hiawatha National Forest',
    ownerLevel: 'Federal',
    description: 'Developed USDA Forest Service campground near Lake Superior and the Bay Furnace historic/day-use area. This is a campground marker, not boondocking or dispersed camping.',
    website: 'https://www.fs.usda.gov/r09/hiawatha/recreation/bay-furnace-campground',
    sourceName: 'USDA Forest Service — Bay Furnace Campground',
    sourceUrl: 'https://www.fs.usda.gov/r09/hiawatha/recreation/bay-furnace-campground',
    cost: '$22/night single site; dump station $5/use per USFS page.',
    costDisplay: '$22/night single site; dump station $5/use per USFS page. Active paving/closure alerts may affect availability.',
    water: 'Potable water is not available at this site per USFS facility block.',
    toilets: 'Restroom status should be checked on-site; accessible USFS facility block says restrooms are not available.',
    electric: 'No electric hookups documented.',
    showers: 'No',
    amenities: 'Developed campground/day-use setting with Lake Superior scenery and Bay Furnace historic area nearby; verify current paving/closure alerts before travel.',
    access: 'Drive-in campground north of M-28 near Christmas, across from Kewadin Casino.',
    season: 'May 9 - October 8 per USFS page; verify active Bay Furnace repaving alert before travel.',
    locationPrecision: 'Official USFS latitude/longitude: 46.441368, -86.7078021.',
    sourceNotes: 'v23.0.84 refresh: treat as developed USDA campground/rustic layer, not boondocking.'
  });

  patchByName(/camp\s+cook\s+campsites/, {
    layer: 'federal',
    subtype: 'rustic',
    markerType: 'exact',
    exactCampsiteLocation: true,
    rawCategory: 'official USDA primitive campsites',
    categoryLabel: 'Rustic Campgrounds',
    layerLabel: 'Rustic Campgrounds',
    owner: 'USDA Forest Service — Hiawatha National Forest',
    ownerLevel: 'Federal',
    website: 'https://www.fs.usda.gov/r09/hiawatha/recreation/camp-cook-campsites',
    sourceName: 'USDA Forest Service — Camp Cook Campsites',
    sourceUrl: 'https://www.fs.usda.gov/r09/hiawatha/recreation/camp-cook-campsites',
    cost: '$8/night single site during reservation season.',
    costDisplay: '$8/night single site during reservation season; no services/no reservations/no fees after Columbus Day through May 15 per USFS page.',
    water: 'Potable water is not available at this site per USFS facility block.',
    toilets: 'Vault toilet.',
    electric: 'No',
    showers: 'No',
    amenities: 'Four primitive/reservable campsites near the Fishdam River; vault toilet; no potable water.',
    access: 'Drive-in small forest campsite area via CR 442 and FR 2052B.',
    season: 'May 15 - Columbus Day reservation season; no services/no reservations/no fees after that through May 15.',
    locationPrecision: 'Official USFS latitude/longitude: 46.0391177, -86.581667.'
  });

  patchByName(/chicago\s+lake\s+dispersed\s+campsite|chicago\s+lake\s+campsites/, {
    name: 'Chicago Lake Campsites',
    lat: 46.03991694,
    lng: -86.61096417,
    layer: 'federal',
    subtype: 'rustic',
    markerType: 'exact',
    exactCampsiteLocation: true,
    rawCategory: 'official USDA primitive campsites',
    categoryLabel: 'Rustic Campgrounds',
    sourceFolder: 'Federal Campgrounds',
    layerLabel: 'Rustic Campgrounds',
    owner: 'USDA Forest Service — Hiawatha National Forest',
    ownerLevel: 'Federal',
    description: 'Official Hiawatha National Forest primitive campsites on Chicago Lake. Four sites are listed by USFS/Recreation.gov, with site #1 decommissioned in the Recreation.gov text and three active reservable sites shown there. This v23.0.84 correction replaces the older DNR/dispersed-style label for this same backlog item.',
    website: 'https://www.fs.usda.gov/r09/hiawatha/recreation/chicago-lake-campsites',
    sourceName: 'USDA Forest Service — Chicago Lake Campsites',
    sourceUrl: 'https://www.fs.usda.gov/r09/hiawatha/recreation/chicago-lake-campsites',
    cost: '$8/night single site during reservation season.',
    costDisplay: '$8/night single site during reservation season; no services/no reservations/no fees after Columbus Day through May 15 per USFS page.',
    water: 'Potable water is not available at this site.',
    toilets: 'Pit / primitive toilets available.',
    electric: 'No',
    showers: 'No',
    amenities: 'Primitive campsites clustered at the north end of Chicago Lake; pit/primitive toilets; boat launch; no potable water.',
    access: 'Forest-road access from FH-13, CR 442 and FR 2422. Site #1 access road is poor; USFS recommends 4WD/tents for that site.',
    season: 'May 15 - Columbus Day reservation season; no services/no reservations/no fees after that through May 15.',
    locationPrecision: 'Official USFS latitude/longitude: 46.03991694, -86.61096417.',
    sourceNotes: 'v23.0.84 official-source correction from older Chicago Lake Dispersed/DNR-style record to official Hiawatha National Forest Chicago Lake Campsites.'
  });

  patchByName(/cookson\s+lake\s+campsites/, {
    layer: 'federal',
    subtype: 'rustic',
    markerType: 'exact',
    exactCampsiteLocation: true,
    rawCategory: 'official USDA primitive campsites',
    categoryLabel: 'Rustic Campgrounds',
    layerLabel: 'Rustic Campgrounds',
    owner: 'USDA Forest Service — Hiawatha National Forest',
    ownerLevel: 'Federal',
    website: 'https://www.fs.usda.gov/r09/hiawatha/recreation/cookson-lake-campsites',
    sourceName: 'USDA Forest Service — Cookson Lake Campsites',
    sourceUrl: 'https://www.fs.usda.gov/r09/hiawatha/recreation/cookson-lake-campsites',
    cost: '$8/night per site.',
    costDisplay: '$8/night per site per USFS page; Interagency passes accepted.',
    water: 'Potable water is not available at this site.',
    toilets: 'Pit/primitive toilet near one site; bring toilet paper.',
    electric: 'No',
    showers: 'No',
    amenities: 'Five primitive campsites on the south shore of Cookson Lake; tables, fire rings, pit toilet, public boat ramp by site 2; no drinking water.',
    access: 'Forest-road access from FH-13 via FR 2258 and FR 2257.',
    season: 'May 15 - Columbus Day per USFS page.',
    locationPrecision: 'Official USFS latitude/longitude: 46.1952825, -86.5615597.'
  });

  patchByName(/council\s+lake\s+campsites/, {
    layer: 'federal',
    subtype: 'rustic',
    markerType: 'exact',
    exactCampsiteLocation: true,
    rawCategory: 'official USDA primitive campsites',
    categoryLabel: 'Rustic Campgrounds',
    layerLabel: 'Rustic Campgrounds',
    owner: 'USDA Forest Service — Hiawatha National Forest',
    ownerLevel: 'Federal',
    website: 'https://www.fs.usda.gov/r09/hiawatha/recreation/council-lake-campsites',
    sourceName: 'USDA Forest Service — Council Lake Campsites',
    sourceUrl: 'https://www.fs.usda.gov/r09/hiawatha/recreation/council-lake-campsites',
    cost: '$8/night per site.',
    costDisplay: '$8/night per site per USFS page; Interagency passes accepted.',
    water: 'Potable water is not available at this site; bring water or filter/boil lake water.',
    toilets: 'Toilet near site #1; bring toilet paper.',
    electric: 'No',
    showers: 'No',
    amenities: 'Four primitive campsites on the south shore of Council Lake; fire pits; carry-in boat access; toilet near site #1; no drinking water.',
    access: 'Forest-road access from FH-13 to FR 2661; road ends at Council Lake.',
    season: 'May 15 - Columbus Day per USFS page.',
    locationPrecision: 'Official USFS latitude/longitude: 46.2419622, -86.646949.'
  });

  patchByName(/island\s+lake\s+campground/, {
    lat: 46.270452,
    lng: -86.65081,
    layer: 'federal',
    subtype: 'rustic',
    markerType: 'exact',
    exactCampsiteLocation: true,
    rawCategory: 'official USDA rustic campground',
    categoryLabel: 'Rustic Campgrounds',
    layerLabel: 'Rustic Campgrounds',
    owner: 'USDA Forest Service — Hiawatha National Forest',
    ownerLevel: 'Federal',
    website: 'https://www.fs.usda.gov/r09/hiawatha/recreation/island-lake-campground',
    sourceName: 'USDA Forest Service — Island Lake Campground',
    sourceUrl: 'https://www.fs.usda.gov/r09/hiawatha/recreation/island-lake-campground',
    cost: '$22/night standard non-electric site; double/group rates differ.',
    costDisplay: '$22/night standard non-electric site; double family and group rates differ per USFS page.',
    water: 'Potable water is not available at this site.',
    toilets: 'Restroom status should be checked on-site; accessible USFS facility block says restrooms are not available.',
    electric: 'No electric hookups documented.',
    showers: 'No',
    amenities: 'Rustic drive-in national forest campground on 32.5-acre Island Lake; canoeing, fishing, hiking and OHV-camping context; no potable water.',
    access: 'Drive-in campground via FH-13, FR 2268/2254 and FR 2557.',
    season: 'May 15 - September 7 per USFS page.',
    locationPrecision: 'Official USFS latitude/longitude: 46.270452, -86.65081.'
  });

  patchByName(/pete['’]?s\s+lake\s+campground|petes\s+lake\s+campground/, {
    lat: 46.231281,
    lng: -86.604125,
    layer: 'federal',
    subtype: 'rustic',
    markerType: 'exact',
    exactCampsiteLocation: true,
    rawCategory: 'official USDA rustic campground',
    categoryLabel: 'Rustic Campgrounds',
    layerLabel: 'Rustic Campgrounds',
    owner: 'USDA Forest Service — Hiawatha National Forest',
    ownerLevel: 'Federal',
    website: 'https://www.fs.usda.gov/r09/hiawatha/recreation/petes-lake-campground',
    sourceName: 'USDA Forest Service — Pete\'s Lake Campground',
    sourceUrl: 'https://www.fs.usda.gov/r09/hiawatha/recreation/petes-lake-campground',
    cost: '$22/night standard non-electric site; premium, double and walk-in rates differ.',
    costDisplay: '$22/night standard non-electric site; premium, double and walk-in rates differ per USFS page.',
    water: 'Potable water is not available at this site per USFS facility block.',
    toilets: 'Restroom status should be checked on-site; accessible USFS facility block says restrooms are not available.',
    electric: 'No electric hookups documented.',
    showers: 'No',
    amenities: 'Drive-in national forest campground with day-use area, picnic areas, swimming beach, accessible fishing pier and lake access; no potable water in the accessible facility block.',
    access: 'Drive-in campground from FH-13 and FR 2173 near Pete\'s Lake.',
    season: 'May 13 - September 30 per USFS page.',
    locationPrecision: 'Official USFS latitude/longitude: 46.231281, -86.604125.'
  });

  patchByName(/bermuda\s+campsite\s+on\s+grand\s+island/, {
    layer: 'boat-backpack',
    subtype: 'hike-bike-boat-in',
    siteForm: 'hike-bike-boat-in-campsite',
    markerType: 'exact',
    exactCampsiteLocation: true,
    rawCategory: 'official USDA Grand Island hike-bike-boat-in campsite',
    categoryLabel: 'Boat / Backpack',
    layerLabel: 'Boat / Backpack',
    owner: 'USDA Forest Service — Hiawatha National Forest / Grand Island NRA',
    ownerLevel: 'Federal',
    website: 'https://www.fs.usda.gov/r09/hiawatha/recreation/bermuda-campsite-grand-island',
    sourceName: 'USDA Forest Service — Bermuda Campsite on Grand Island',
    sourceUrl: 'https://www.fs.usda.gov/r09/hiawatha/recreation/bermuda-campsite-grand-island',
    water: 'Potable water is not available at this site; nearest water is Murray Bay Day Use Area, about 100 yards away per USFS page.',
    toilets: 'Latrine nearby.',
    electric: 'No',
    showers: 'No',
    locationPrecision: 'Official USFS latitude/longitude: 46.471847, -86.653882.',
    userFacingCaution: 'Hike-in, bike-in or boat-in only. Public vehicles are not allowed on Grand Island.'
  });

  patchByName(/duck\s+lake\s+campsite\s+on\s+grand\s+island/, {
    layer: 'boat-backpack',
    subtype: 'hike-bike-boat-in',
    siteForm: 'hike-bike-boat-in-campsite',
    markerType: 'exact',
    exactCampsiteLocation: true,
    rawCategory: 'official USDA Grand Island hike-bike-boat-in campsite',
    categoryLabel: 'Boat / Backpack',
    layerLabel: 'Boat / Backpack',
    owner: 'USDA Forest Service — Hiawatha National Forest / Grand Island NRA',
    ownerLevel: 'Federal',
    website: 'https://www.fs.usda.gov/r09/hiawatha/recreation/duck-lake-campsite-grand-island',
    sourceName: 'USDA Forest Service — Duck Lake Campsite on Grand Island',
    sourceUrl: 'https://www.fs.usda.gov/r09/hiawatha/recreation/duck-lake-campsite-grand-island',
    water: 'Potable water is not available at this site; nearest potable water is Murray Bay Day Use Area, about 0.5 mile away per USFS page.',
    toilets: 'Latrine nearby.',
    electric: 'No',
    showers: 'No',
    locationPrecision: 'Official USFS latitude/longitude: 46.47927195, -86.65136611.',
    userFacingCaution: 'Hike-in, bike-in or boat-in only. Public vehicles are not allowed on Grand Island.'
  });

  addSite({
    id: 'mi-indian-river-campground-hiawatha-v23084',
    name: 'Indian River Campground',
    lat: 46.15436889,
    lng: -86.40376611,
    layer: 'federal',
    subtype: 'rustic',
    markerType: 'exact',
    exactCampsiteLocation: true,
    rawCategory: 'official USDA rustic campground',
    categoryLabel: 'Rustic Campgrounds',
    sourceFolder: 'Federal Campgrounds',
    layerLabel: 'Rustic Campgrounds',
    owner: 'USDA Forest Service — Hiawatha National Forest',
    ownerLevel: 'Federal',
    description: 'Rustic Hiawatha National Forest campground on a bluff overlooking the Indian River, near the halfway point on the Indian River Canoe Trail.',
    website: 'https://www.fs.usda.gov/r09/hiawatha/recreation/indian-river-campground',
    sourceName: 'USDA Forest Service — Indian River Campground',
    sourceUrl: 'https://www.fs.usda.gov/r09/hiawatha/recreation/indian-river-campground',
    cost: '$22/night single site; $44/night double site per USFS page.',
    costDisplay: '$22/night single site; $44/night double site per USFS page.',
    water: 'Potable water is not available at this site.',
    toilets: 'Restroom status should be checked on-site; accessible USFS facility block says restrooms are not available.',
    electric: 'No',
    showers: 'No',
    amenities: 'Rustic campground overlooking the Indian River with short trail to river and canoe-trail access context; no potable water documented.',
    access: 'Drive-in campground on M-94 between Shingleton and Manistique.',
    season: 'May 17 - September 5 per USFS page.',
    locationPrecision: 'Official USFS latitude/longitude: 46.15436889, -86.40376611.',
    reviewSummary: 'Good low-service overnight stop for Indian River paddlers or campers wanting river access without campground frills.'
  }, /indian\s+river\s+campground/);

  addSite({
    id: 'mi-hemlock-campsite-grand-island-v23084',
    name: 'Hemlock Campsite on Grand Island',
    lat: 46.495956,
    lng: -86.682619,
    layer: 'boat-backpack',
    subtype: 'hike-bike-boat-in',
    siteForm: 'hike-bike-boat-in-campsite',
    markerType: 'exact',
    exactCampsiteLocation: true,
    rawCategory: 'official USDA Grand Island hike-bike-boat-in campsite',
    categoryLabel: 'Boat / Backpack',
    layerLabel: 'Boat / Backpack',
    owner: 'USDA Forest Service — Hiawatha National Forest / Grand Island NRA',
    ownerLevel: 'Federal',
    description: 'Official Grand Island campsite on the island’s western side near Waterfall Beach. Hike-in, bike-in or boat-in only; public vehicles are not allowed on Grand Island.',
    website: 'https://www.fs.usda.gov/r09/hiawatha/recreation/hemlock-campsite-grand-island',
    sourceName: 'USDA Forest Service — Hemlock Campsite on Grand Island',
    sourceUrl: 'https://www.fs.usda.gov/r09/hiawatha/recreation/hemlock-campsite-grand-island',
    cost: '$10/night single site.',
    costDisplay: '$10/night single site per USFS page.',
    water: 'Potable water is not available at this site; nearest potable water is about 0.5 mile south at Juniper Flats Group Campsite per USFS page.',
    toilets: 'Primitive latrine nearby.',
    electric: 'No',
    showers: 'No',
    amenities: 'Backcountry campsite for up to 6 people in 2 tents; primitive latrine, food storage pole, fire ring, benches and firewood provided in/near campsite.',
    access: 'Hike/bike via island trail system or kayak via Waterfall Beach, then climb stairs and walk about 100 yards north to the campsite.',
    season: 'May 24 - October 14 per USFS page; off-season access logistics are limited and ice travel is not recommended.',
    locationPrecision: 'Official USFS latitude/longitude: 46.495956, -86.682619.',
    userFacingCaution: 'Hike-in, bike-in or boat-in only. Public vehicles are not allowed on Grand Island; verify ferry/boat logistics before planning.'
  }, /hemlock\s+campsite\s+on\s+grand\s+island/);

  addSite({
    id: 'mi-channel-marker-campsite-grand-island-v23084',
    name: 'Channel Marker Campsite on Grand Island',
    lat: 46.453782,
    lng: -86.681466,
    layer: 'boat-backpack',
    subtype: 'hike-bike-boat-in',
    siteForm: 'hike-bike-boat-in-campsite',
    markerType: 'exact',
    exactCampsiteLocation: true,
    rawCategory: 'official USDA Grand Island hike-bike-boat-in campsite',
    categoryLabel: 'Boat / Backpack',
    layerLabel: 'Boat / Backpack',
    owner: 'USDA Forest Service — Hiawatha National Forest / Grand Island NRA',
    ownerLevel: 'Federal',
    description: 'Official Grand Island campsite on the southwest tip of the island near Merchandise Beach and Murray Bay Beach. Hike-in, bike-in or boat-in only; public vehicles are not allowed on Grand Island.',
    website: 'https://www.fs.usda.gov/r09/hiawatha/recreation/channel-marker-campsite-grand-island',
    sourceName: 'USDA Forest Service — Channel Marker Campsite on Grand Island',
    sourceUrl: 'https://www.fs.usda.gov/r09/hiawatha/recreation/channel-marker-campsite-grand-island',
    cost: '$10/night single site.',
    costDisplay: '$10/night single site per USFS page.',
    water: 'Potable water is not available at this site; water is available at Williams Landing, Juniper Flats, Farrell Cottage and Murray Bay Day Use Area per USFS page.',
    toilets: 'Latrine nearby.',
    electric: 'No',
    showers: 'No',
    amenities: 'Backcountry campsite for up to 6 people; latrine, food storage pole/locker, fire ring, benches and firewood nearby.',
    access: 'Hike/bike via island trail system or kayak via unnamed beach about 0.5 mile west of William’s Landing, then walk about 100 feet inland.',
    season: 'May 24 - October 14 per USFS page; off-season access logistics are limited and ice travel is not recommended.',
    locationPrecision: 'Official USFS latitude/longitude: 46.453782, -86.681466.',
    userFacingCaution: 'Hike-in, bike-in or boat-in only. Public vehicles are not allowed on Grand Island; verify ferry/boat logistics before planning.'
  }, /channel\s+marker\s+campsite\s+on\s+grand\s+island/);
})();
