// Illinois final cleanup supplement v23.1.40
// Source-backed layer and Kinkaid cleanup only; no new coordinates are invented.
(function(){
  window.CAMPING_STATE_DATA = window.CAMPING_STATE_DATA || {};
  var rows = window.CAMPING_STATE_DATA['IL'] || [];
  function patch(id, data){
    var row = rows.find(function(site){ return site && site.id === id; });
    if(!row) return;
    Object.assign(row, data);
  }
  function rustic(id, data){
    patch(id, Object.assign({
      layer: 'rustic',
      subtype: 'rustic / primitive',
      rawCategory: 'public',
      categoryLabel: 'Rustic / Primitive',
      sourceFolder: 'Illinois rustic / primitive cleanup v23.1.40',
      ownerLevel: 'Public',
      layerLabel: 'Rustic / Primitive',
      markerType: 'system',
      locationPrecision: 'Existing active coordinate retained as campground/system marker; not individual campsite coordinates.',
      lastChecked: '2026-06-25'
    }, data || {}));
  }

  rustic('s24', {
    owner: 'Illinois Department of Natural Resources',
    website: 'https://dnr.illinois.gov/parks/camp/park.applerivercanyon.html',
    showers: 'No showers for the Class C Canyon Ridge campground.',
    amenities: '49 Class C sites at Canyon Ridge; 6 group sites at Walnut Grove Youth Campground; winter camping available at Walnut Grove.',
    description: 'Official IDNR camping page says Apple River Canyon has 49 Class C sites without showers and 6 group sites at Walnut Grove. Modern triad is not met, so this record is classified Rustic / Primitive. Existing active coordinate retained as a broad park/campground marker, not an exact campsite pin.',
    reviewSummary: 'v23.1.40 official-source layer correction from Modern/generic public to Rustic / Primitive.'
  });

  rustic('s379', {
    owner: 'Illinois Department of Natural Resources',
    website: 'https://dnr.illinois.gov/parks/camp/park.hennepincanal.html',
    showers: 'No showers.',
    amenities: 'Class C primitive designated canal campground; no electricity; first-come, first-served; fires only in designated fire pits.',
    description: 'Official IDNR Hennepin Canal camping page lists Lock 6 as a designated Class C primitive campground. IDNR states canal camping is first-come, designated sites only, no towpath camping, and no showers or electricity. Existing coordinate retained as the active campground marker.',
    reviewSummary: 'v23.1.40 official-source layer correction from Modern/generic public to Rustic / Primitive.'
  });

  rustic('s380', {
    owner: 'Illinois Department of Natural Resources',
    website: 'https://dnr.illinois.gov/parks/camp/park.hennepincanal.html',
    showers: 'No showers.',
    amenities: 'Class C primitive designated canal campground; no electricity; first-come, first-served; fires only in designated fire pits.',
    description: 'Official IDNR Hennepin Canal camping page lists Lock 11 as a designated Class C primitive campground. IDNR states canal camping is first-come, designated sites only, no towpath camping, and no showers or electricity. Existing coordinate retained as the active campground marker.',
    reviewSummary: 'v23.1.40 official-source layer correction from Modern/generic public to Rustic / Primitive.'
  });

  rustic('s351', {
    owner: 'Illinois Department of Natural Resources',
    website: 'https://dnr.illinois.gov/parks/camp/park.greenriver.html',
    amenities: 'Camping spaces with vehicular access; sanitary dump station.',
    description: 'Official IDNR page confirms camping spaces with vehicular access and a sanitary dump station at Green River State Wildlife Area, but no official proof of electric sites, modern/flush restrooms, and showers was recovered. Classified Rustic / Primitive unless later official Modern-triad proof is found.',
    reviewSummary: 'v23.1.40 official-source layer correction from Modern/generic public to Rustic / Primitive.'
  });

  rustic('s91', {
    owner: 'Illinois Department of Natural Resources',
    website: 'https://dnr.illinois.gov/parks/camp/park.bigriver.html',
    amenities: 'Tent and trailer camping at Shady Pines; permit required.',
    description: 'Official IDNR Big River page says tent and trailer camping is available at Shady Pines and campers must obtain a permit. The accessible official source does not prove the Modern triad, so this record is classified Rustic / Primitive.',
    reviewSummary: 'v23.1.40 official-source layer correction from Modern/generic public to Rustic / Primitive.'
  });

  rustic('s239', {
    owner: 'Illinois Department of Natural Resources',
    website: 'https://dnr.illinois.gov/parks/camp/park.delabar.html',
    amenities: 'Tent/trailer camping with electrical hookups, drinking water, sanitary station, and trailer-fill jet pump; group camping by permission.',
    description: 'Official IDNR Delabar page lists tent/trailer camping with electrical hookups, drinking water, sanitary station, and trailer-fill jet pump, but the accessible official source does not prove showers or modern/flush restrooms. Modern triad is not met, so this record is classified Rustic / Primitive unless later official proof supports Modern.',
    reviewSummary: 'v23.1.40 official-source layer correction from Modern/generic public to Rustic / Primitive.'
  });

  rustic('s928', {
    owner: 'Illinois Department of Natural Resources',
    website: 'https://dnr.illinois.gov/parks/camp/park.trailoftears.html',
    amenities: 'Class C tent camping with vehicle access; Class D backpack camping; some log shelters and privies; group camping at a few sites.',
    description: 'Official IDNR page confirms both Class C tent camping and Class D backpack camping at Trail of Tears State Forest. Existing active coordinate is retained only as a broad forest/camping-system marker; separate Class C/Class D coordinates were not recovered in v23.1.40. This record is classified Rustic / Primitive rather than Modern.',
    reviewSummary: 'v23.1.40 official-source layer correction from Modern/generic public to Rustic / Primitive. Backpack-specific sites remain held for exact coordinates.'
  });

  rustic('s755', {
    owner: 'Illinois Department of Natural Resources',
    website: 'https://dnr.illinois.gov/parks/camp/park.pyramid.html',
    showers: 'No electrical hookups in camping areas; showers not proven by official source used for this correction.',
    amenities: 'Three Class C camping areas; Class D hike-in campsites; equestrian camp; youth group camping; water and trailer dump near site office.',
    description: 'Official IDNR page says Pyramid SRA camping is designated-only, with three Class C camping areas, Class D hike-in campsites, an equestrian camp, and a youth group area. IDNR also states there are no electrical hookups in the camping areas. Modern triad is not met, so this record is classified Rustic / Primitive. Hike-in Class D sites remain held for exact coordinates.',
    reviewSummary: 'v23.1.40 official-source layer correction from Modern/generic public to Rustic / Primitive.'
  });

  rustic('s762', {
    owner: 'Illinois Department of Natural Resources',
    website: 'https://dnr.illinois.gov/parks/camp/park.randolphcounty.html',
    amenities: '51 Class B/E sites; 95 Class C sites; equestrian site with stalls; four Class D primitive campsites; group camp area.',
    description: 'Official IDNR page confirms low-service and primitive camping types at Randolph County State Recreation Area, including Class B/E, Class C, Class D primitive, equestrian, and group camping. The accessible official source does not prove full Modern criteria for the broad active row, so this record is classified Rustic / Primitive.',
    reviewSummary: 'v23.1.40 official-source layer correction from Modern/generic public/local to Rustic / Primitive.'
  });

  rustic('s798', {
    owner: 'Illinois Department of Natural Resources',
    website: 'https://dnr.illinois.gov/parks/camp/park.salinecounty.html',
    showers: 'No electricity; showers not proven.',
    amenities: 'Tent/trailer camping area; trailer disposal; permit required; equestrian campground exists.',
    description: 'Official IDNR page says the Saline County State Fish and Wildlife Area camping area accommodates tent and trailer campers, has trailer disposal, requires a permit, and electricity is not available. Modern triad is not met, so this record is classified Rustic / Primitive.',
    reviewSummary: 'v23.1.40 official-source layer correction from Modern/generic public/local to Rustic / Primitive.'
  });

  patch('s451', {
    name: 'Kinkaid Lake Village Marina & Campground / Johnson Creek Recreation Area',
    layer: 'private',
    subtype: 'modern',
    rawCategory: 'private',
    categoryLabel: 'Private Campgrounds',
    sourceFolder: 'Illinois Kinkaid cleanup v23.1.40',
    owner: 'Kinkaid Lake Village Marina & Campground',
    ownerLevel: 'Private/operator',
    layerLabel: 'Private campgrounds',
    website: 'https://kinkaidmarina.com/campsites/',
    showers: 'Yes — operator site lists a shower house.',
    amenities: 'Operator site lists seasonal RV/tent camping, electric/water/sewer hookups, shower house, laundromat, internet, and campground rules. Donald Brittin primitive tent-only component remains blocked until exact operator coordinates are recovered.',
    description: 'Kinkaid cleanup: official/operator source supports public-facing modern camping at Kinkaid Lake Village Marina & Campground / Johnson Creek Recreation Area. Existing active coordinate is retained for the current operator campground marker; no new coordinate was invented. Verify current rates, rules, and availability with operator before staying.',
    reviewSummary: 'v23.1.40 correction from stale public/state row to Private Campgrounds / Modern based on official operator source and existing active row.',
    locationPrecision: 'Existing active coordinate retained; no new coordinate invented from address, marina dock, or map click.',
    lastChecked: '2026-06-25'
  });

  patch('s467', {
    layer: 'info',
    subtype: 'reference',
    rawCategory: 'info',
    categoryLabel: 'Info / Reference',
    sourceFolder: 'Illinois Kinkaid cleanup v23.1.40',
    owner: 'Illinois Department of Natural Resources / Kinkaid-area context',
    ownerLevel: 'Reference only',
    layerLabel: 'Info / reference',
    website: 'https://dnr.illinois.gov/parks/camp/park.kinkaidlake.html',
    markerType: 'rule_area',
    cost: 'Not a campground record.',
    showers: 'Not applicable.',
    amenities: 'Reference marker only. Camping around Kinkaid is tied to USFS/Shawnee, Kinkaid-Reed’s Creek Conservancy District, and Kinkaid Lake Village Marina / Johnson Creek; camping is not allowed on DNR property.',
    description: 'Kinkaid cleanup: this broad Kinkaid Lake row is no longer treated as a boondocking/dispersed campsite or campground marker. Official IDNR source says camping is permitted by USFS, Kinkaid-Reed’s Creek Conservancy District, and Johnson Creek/Kinkaid Village Marina, but camping is not allowed on DNR property. Use this only as context; do not treat this point as a legal campsite.',
    reviewSummary: 'v23.1.40 removes broad Kinkaid boondocking/generic camping interpretation from camping layers. USFS/Shawnee Kinkaid leads remain out of scope for this Illinois non-USFS cleanup.',
    locationPrecision: 'Existing broad lake/context coordinate retained as Info / Reference only; not an exact campsite pin.',
    lastChecked: '2026-06-25'
  });

  window.CAMPING_STATE_DATA['IL'] = rows;
})();
