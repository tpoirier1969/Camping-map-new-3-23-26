window.CAMPING_STATES_MANIFEST = {
  "AL": {"code":"AL","name":"Alabama","file":"data/states/AL.js","count":2},
  "AZ": {"code":"AZ","name":"Arizona","file":"data/states/AZ.js","count":10},
  "AR": {"code":"AR","name":"Arkansas","file":"data/states/AR.js","count":28},
  "CA": {"code":"CA","name":"California","file":"data/states/CA.js","count":9},
  "CO": {"code":"CO","name":"Colorado","file":"data/states/CO.js","count":37},
  "DE": {"code":"DE","name":"Delaware","file":"data/states/DE.js","count":1},
  "FL": {"code":"FL","name":"Florida","file":"data/states/FL.js","count":1},
  "IL": {"code":"IL","name":"Illinois","file":"data/states/IL.js","count":100},
  "IN": {"code":"IN","name":"Indiana","file":"data/states/IN.js","count":5},
  "IA": {"code":"IA","name":"Iowa","file":"data/states/IA.js","count":16},
  "LA": {"code":"LA","name":"Louisiana","file":"data/states/LA.js","count":3},
  "ME": {"code":"ME","name":"Maine","file":"data/states/ME.js","count":6},
  "MI": {"code":"MI","name":"Michigan","file":"data/states/MI.js","count":540},
  "MN": {"code":"MN","name":"Minnesota","file":"data/states/MN.js","count":27},
  "MS": {"code":"MS","name":"Mississippi","file":"data/states/MS.js","count":4},
  "MO": {"code":"MO","name":"Missouri","file":"data/states/MO.js","count":41},
  "MT": {"code":"MT","name":"Montana","file":"data/states/MT.js","count":6},
  "NE": {"code":"NE","name":"Nebraska","file":"data/states/NE.js","count":20},
  "NH": {"code":"NH","name":"New Hampshire","file":"data/states/NH.js","count":1},
  "ND": {"code":"ND","name":"North Dakota","file":"data/states/ND.js","count":3},
  "OH": {"code":"OH","name":"Ohio","file":"data/states/OH.js","count":1},
  "SD": {"code":"SD","name":"South Dakota","file":"data/states/SD.js","count":8},
  "TN": {"code":"TN","name":"Tennessee","file":"data/states/TN.js","count":19},
  "TX": {"code":"TX","name":"Texas","file":"data/states/TX.js","count":1},
  "UT": {"code":"UT","name":"Utah","file":"data/states/UT.js","count":5},
  "WI": {"code":"WI","name":"Wisconsin","file":"data/states/WI.js","count":190},
  "WY": {"code":"WY","name":"Wyoming","file":"data/states/WY.js","count":19}
};

/*
  Camping Map v22.3.23 — Michigan cost/detail cleanup pass 3

  File strategy note:
  - This is a replacement for the existing data/states-manifest-v22.3.3.js file.
  - No extra add-on file is required.
  - The main MI.js file remains untouched because it is large and easy to damage when only a few records need verified field cleanup.
  - This script installs a small pre-load hook. When data/states/MI.js is loaded by the app, these verified patch fields are merged into the matching Michigan records before the map renders them.
*/
(function(){
  'use strict';

  const PATCH_VERSION = 'v22.3.23';
  const PATCH_DATE = '2026-04';

  const MI_PATCHES = [
    {
      id: 's1055',
      name: 'Agate Beach Park Campground',
      fields: {
        owner: 'Stanton Township',
        layer: 'local',
        subtype: 'rustic',
        layerLabel: 'Local campgrounds',
        cost: '$20/night primitive sites; verify posted current rate',
        showers: 'No',
        access: 'Drive-in township park campground on Lake Superior. Primitive first-come style camping is the safe assumption; verify the posted kiosk/rules on arrival, especially with larger RVs.',
        amenities: 'Primitive campsites with picnic tables and fire rings, manual pump drinking water, vault toilets, beach access, pavilion/playground area nearby; no hookups should be assumed except where locally posted.',
        trailheads: 'Lake Superior beach walking, agate hunting, shoreline exploring, nearby Keweenaw touring, and Misery Bay / Little Elm River shoreline access.',
        season: 'Warm-season township park camping; local reports and township planning material describe spring-through-fall use. Verify current season and posted rules before relying on it.',
        reviewSummary: 'Simple Lake Superior primitive camping where the beach is the whole point. Good for small campers and tents; not a modern-service campground.',
        costDisplay: 'Stanton Township recreation-planning material lists Agate Beach Park overnight camping at $20 per site, paid on an honor basis. Because township park fees can change at the kiosk, treat this as verified historical/official guidance and confirm the current posted rate before arrival.',
        costSourceName: 'Stanton Township 5-Year Recreation Plan; Campendium user rate cross-check',
        costSourceUrl: 'https://www.stantontownship.com/wp-content/uploads/2023/11/Stanton-Township-5-Year-Recreation-Plan-FINAL-DRAFT-11.09.23.pdf',
        costCheckedDate: PATCH_DATE,
        costCheckedYear: 2026,
        costNeedsReview: true,
        extraLinks: 'Stanton Township recreation plan | https://www.stantontownship.com/wp-content/uploads/2023/11/Stanton-Township-5-Year-Recreation-Plan-FINAL-DRAFT-11.09.23.pdf\nCampendium Agate Beach Park | https://www.campendium.com/agate-beach\nOutdoor Michigan Agate Beach Township Park | https://outdoormichigan.org/feature/12137'
      }
    },
    {
      id: 's9',
      name: 'Alcona Park Campground (west side)',
      fields: {
        owner: 'Curtis Township / Alcona Park',
        layer: 'local',
        subtype: 'modern',
        layerLabel: 'Local campgrounds',
        cost: '$36-$46/night depending on campground area and hookup level',
        showers: 'Yes; shower tokens listed by park rules',
        access: 'Drive-up public park campground at Alcona Park. The park has multiple camping areas, so match the reservation/site area to your rig size and hookup needs before arrival.',
        amenities: 'Modern bathhouse/restrooms, showers, laundry in developed areas, dump station, ice/firewood sales, electric/water or full-service sites depending on area; rustic Birch Point sites have vault toilets.',
        trailheads: 'Alcona Park day-use facilities, boating/canoeing access, hiking trails, picnic pavilions, playgrounds, and boat launches.',
        season: 'Modern campground listed April 23-December 1; full-service campground listed May 15-October 1. Peak-summer reservations may require a five-night minimum.',
        reviewSummary: 'Large developed public park campground with several service tiers. Better for a planned lake/park stay than a quick no-frills overnight.',
        costDisplay: 'Alcona Park lists modern electric/water sites at $36/night, full-service back-in sites at $44/night, and full-service pull-through 30/50 amp sites at $46/night. The park also lists a $10 reservation fee and shower tokens purchased at the office.',
        costSourceName: 'Alcona Park official campground rates and rules',
        costSourceUrl: 'https://alconapark.org/modern-campground/',
        costCheckedDate: PATCH_DATE,
        costCheckedYear: 2026,
        costNeedsReview: false,
        extraLinks: 'Alcona Park campgrounds overview | https://alconapark.org/campgrounds/\nAlcona Park modern campground rates | https://alconapark.org/modern-campground/\nAlcona Park full-service campground rates | https://alconapark.org/full-service-campground/\nAlcona Park campground rules | https://alconapark.org/campground-rules/'
      }
    },
    {
      id: 's30',
      name: 'Au Gres City Park',
      fields: {
        name: 'City of Au Gres Riverfront Campground',
        owner: 'City of Au Gres',
        layer: 'local',
        subtype: 'modern',
        layerLabel: 'Local campgrounds',
        website: 'https://cityofaugresmi.com/city-augres-campground/',
        cost: '$36-$40/night campsites; cabins extra',
        showers: 'Yes',
        access: 'Easy city campground access near US-23 and the Au Gres River. Reservations are recommended and all campsites have water and electric hookups; some sites also include sewer.',
        amenities: '108 campsites, water/electric on all campsites, sewer on full-hookup sites, cabins, modern bathhouse with hot showers, Wi-Fi, dump station, fish-cleaning station, kayak/small boat ramp, playground, camp office, ice/firewood/snacks, picnic table and fire ring at sites.',
        trailheads: 'Au Gres River paddling/boating, Saginaw Bay fishing access, nearby riverfront walkway, city park sports courts, playgrounds, and downtown Au Gres access.',
        season: 'Camping season April 15-October 15. Reservations open after January 1 for the current camping season.',
        reviewSummary: 'Good municipal campground for anglers, paddlers, and riverfront camping with real amenities. More useful as a comfortable basecamp than a rustic escape.',
        costDisplay: 'The City of Au Gres lists 2026-style camper rates as $38/night on-river sites, $36/night off-river sites, and $40/night full-hookup sites, with weekly and monthly rates also listed. Additional tent charge is listed at $10/night.',
        costSourceName: 'City of Au Gres Riverfront Campground official rates',
        costSourceUrl: 'https://cityofaugresmi.com/city-augres-campground/',
        costCheckedDate: PATCH_DATE,
        costCheckedYear: 2026,
        costNeedsReview: false,
        extraLinks: 'City of Au Gres Riverfront Campground | https://cityofaugresmi.com/city-augres-campground/\nCampground amenities | https://cityofaugrescampground.com/campground-amenities/\nReservations and policies | https://cityofaugrescampground.com/reservations/'
      }
    },
    {
      id: 's31',
      name: 'Au Train Beach Campground',
      fields: {
        owner: 'Paddling Michigan / private operator',
        layer: 'private',
        subtype: 'modern',
        layerLabel: 'Private campgrounds',
        website: 'https://www.paddlingmichigan.com/lodging/au-train-beach-campground/',
        cost: 'Check booking engine/current rate',
        showers: 'Yes',
        access: 'Walk-in campground layout near M-28 and Lake Superior beach access. Campground lodging ranges from pitch-your-own tent sites to furnished safari tents, yurts, grand yurts, and mini-tipis; confirm parking/wagon access and unit type when booking.',
        amenities: 'Pitch-your-own rustic tent sites plus furnished safari tents, yurts, grand yurts, and mini-tipis; fire pits, charcoal grills, picnic tables, restrooms, showers, common-area Wi-Fi, Sandhill Lodge guest hangout space, ice and firewood for sale.',
        trailheads: 'Au Train Beach, Au Train River paddling, Pictured Rocks day trips, Grand Island, nearby waterfalls, Hiawatha National Forest touring, and the Au Train River Songbird Trail area.',
        season: 'Operator lists the campground open May through the end of September. Deposit and balance-payment rules apply through the booking operator.',
        reviewSummary: 'A private beach/glamping-style campground rather than a public state campground. Strong location for Lake Superior and paddling, but confirm exact site type and pricing before booking.',
        costDisplay: 'The operator does not expose a simple static nightly campsite rate on the public information page; use the booking system or call for current pricing. Public page confirms 50% deposit at booking and balance due 30 days before arrival.',
        costSourceName: 'Paddling Michigan Au Train Beach Campground information page',
        costSourceUrl: 'https://www.paddlingmichigan.com/lodging/au-train-beach-campground/',
        costCheckedDate: PATCH_DATE,
        costCheckedYear: 2026,
        costNeedsReview: true,
        extraLinks: 'Paddling Michigan Au Train Beach Campground | https://www.paddlingmichigan.com/lodging/au-train-beach-campground/\nMichigan.org Au Train Beach Campground | https://www.michigan.org/property/au-train-beach-campground'
      }
    },
    {
      id: 's33',
      name: 'Aune Osborn Campground',
      fields: {
        layer: 'local',
        subtype: 'modern',
        layerLabel: 'Local campgrounds',
        cost: '$42 non-waterfront / $48 premium waterfront; $8 reservation fee',
        costDisplay: 'For the 2026 season, Sault Ste. Marie lists Aune Osborn at $48/night for premium waterfront sites and $42/night for non-waterfront sites, plus an $8 non-refundable reservation/transaction fee. Monthly rates are also listed: $1,150 waterfront and $1,000 non-waterfront.',
        costSourceName: 'City of Sault Ste. Marie 2026 Aune Osborn Camping Rates',
        costSourceUrl: 'https://www.saultcity.com/parksrec/page/aune-osborn-campground',
        costCheckedDate: PATCH_DATE,
        costCheckedYear: 2026,
        costNeedsReview: false,
        season: 'Camping season runs May 15-October 15; 2026 reservation windows opened in March 2026.',
        extraLinks: 'Aune Osborn official campground page | https://www.saultcity.com/parksrec/page/aune-osborn-campground\nAune Osborn seasonal information | https://www.saultcity.com/parksrec/page/aune-osborn-seasonal-information\nReservation fees and cancellation policy | https://www.saultcity.com/parksrec/page/aune-osborn-campground-reservation-fees-cancellation-policy'
      }
    },
    {
      id: 's34',
      name: 'Aune Osborn Campground',
      fields: {
        layer: 'local',
        subtype: 'modern',
        layerLabel: 'Local campgrounds',
        cost: '$42 non-waterfront / $48 premium waterfront; $8 reservation fee',
        costDisplay: 'For the 2026 season, Sault Ste. Marie lists Aune Osborn at $48/night for premium waterfront sites and $42/night for non-waterfront sites, plus an $8 non-refundable reservation/transaction fee. Monthly rates are also listed: $1,150 waterfront and $1,000 non-waterfront.',
        costSourceName: 'City of Sault Ste. Marie 2026 Aune Osborn Camping Rates',
        costSourceUrl: 'https://www.saultcity.com/parksrec/page/aune-osborn-campground',
        costCheckedDate: PATCH_DATE,
        costCheckedYear: 2026,
        costNeedsReview: false,
        season: 'Camping season runs May 15-October 15; 2026 reservation windows opened in March 2026.',
        extraLinks: 'Aune Osborn official campground page | https://www.saultcity.com/parksrec/page/aune-osborn-campground\nAune Osborn seasonal information | https://www.saultcity.com/parksrec/page/aune-osborn-seasonal-information\nReservation fees and cancellation policy | https://www.saultcity.com/parksrec/page/aune-osborn-campground-reservation-fees-cancellation-policy'
      }
    }
  ];

  function norm(value){
    return String(value || '').trim().toLowerCase().replace(/[^a-z0-9]+/g, ' ').replace(/\s+/g, ' ').trim();
  }

  function mergeLines(existing, incoming){
    const lines = [];
    const seen = new Set();
    String(existing || '').split(/\r?\n/).concat(String(incoming || '').split(/\r?\n/)).forEach(line => {
      const clean = line.trim();
      if(!clean) return;
      const key = clean.toLowerCase();
      if(seen.has(key)) return;
      seen.add(key);
      lines.push(clean);
    });
    return lines.join('\n');
  }

  function assignFields(site, fields){
    Object.keys(fields).forEach(key => {
      const value = fields[key];
      if(key === 'extraLinks') {
        site.extraLinks = mergeLines(site.extraLinks, value);
        return;
      }
      site[key] = value;
    });
    site.costAuditVersion = PATCH_VERSION;
    site.costCheckedDate = site.costCheckedDate || PATCH_DATE;
  }

  function applyMichiganPatches(miSites){
    if(!Array.isArray(miSites) || miSites.__camping_v22323_applied) return 0;
    let changed = 0;
    MI_PATCHES.forEach(patch => {
      const candidates = miSites.filter(site => {
        if(patch.id) return String(site.id || '') === patch.id;
        if(patch.name) return norm(site.name) === norm(patch.name);
        return false;
      });
      candidates.forEach(site => {
        assignFields(site, patch.fields);
        changed += 1;
      });
    });
    try {
      Object.defineProperty(miSites, '__camping_v22323_applied', {value: true, enumerable: false});
    } catch(_err) {
      miSites.__camping_v22323_applied = true;
    }
    window.CAMPING_V22323_PATCH_STATUS = {
      version: PATCH_VERSION,
      changed,
      expectedPatchRecords: MI_PATCHES.length,
      checkedDate: PATCH_DATE
    };
    return changed;
  }

  function installMichiganDataHook(){
    const data = window.CAMPING_STATE_DATA || (window.CAMPING_STATE_DATA = {});
    if(data.__camping_v22323_hooked) {
      if(Array.isArray(data.MI)) applyMichiganPatches(data.MI);
      return;
    }

    let currentMI = data.MI;
    Object.defineProperty(data, 'MI', {
      configurable: true,
      enumerable: true,
      get(){ return currentMI; },
      set(value){
        currentMI = value;
        applyMichiganPatches(currentMI);
      }
    });

    try {
      Object.defineProperty(data, '__camping_v22323_hooked', {value: true, enumerable: false});
    } catch(_err) {
      data.__camping_v22323_hooked = true;
    }

    if(Array.isArray(currentMI)) applyMichiganPatches(currentMI);
  }

  function refreshVersionDisplay(){
    if(document && document.title) {
      document.title = 'Camping Map v22.3.23 Michigan cost audit pass 3';
    }
    const tag = document.getElementById('versionTag');
    if(tag) tag.textContent = PATCH_VERSION;
    const status = document.getElementById('dataStats');
    if(status && window.CAMPING_V22323_PATCH_STATUS && !status.dataset.v22323Note) {
      status.dataset.v22323Note = '1';
      const current = status.textContent ? status.textContent + ' · ' : '';
      status.textContent = current + 'MI cost patch ' + PATCH_VERSION + ' applied to ' + window.CAMPING_V22323_PATCH_STATUS.changed + ' record(s).';
    }
  }

  installMichiganDataHook();
  refreshVersionDisplay();

  let tries = 0;
  const timer = setInterval(function(){
    tries += 1;
    installMichiganDataHook();
    refreshVersionDisplay();
    if((window.CAMPING_V22323_PATCH_STATUS && window.CAMPING_V22323_PATCH_STATUS.changed > 0) || tries > 80) {
      clearInterval(timer);
    }
  }, 100);
})();
