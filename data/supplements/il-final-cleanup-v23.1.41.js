// v23.1.41 Illinois final cleanup: supersedes v23.1.40 Illinois cleanup supplement.
// Applies source-backed layer corrections, restores Johnson Creek as separate from Kinkaid Lake Village Marina,
// adds coordinate-safe Kinkaid/Devils Kitchen records from Tod-supplied exact coordinates, and preserves Kinkaid context honestly.
(function(){
  window.CAMPING_STATE_DATA = window.CAMPING_STATE_DATA || {};
  const rows = window.CAMPING_STATE_DATA['IL'] || [];
  const byId = new Map(rows.map((s,i)=>[String(s.id||''),{s,i}]));
  const byName = new Map(rows.map((s,i)=>[String(s.name||'').toLowerCase(),{s,i}]));
  function patch(id, fields){
    const hit = byId.get(String(id));
    if(!hit) return null;
    Object.assign(hit.s, fields);
    return hit.s;
  }
  function addUnique(site){
    const id = String(site.id||'');
    const nameKey = String(site.name||'').toLowerCase();
    if(id && byId.has(id)) { Object.assign(byId.get(id).s, site); return; }
    if(nameKey && byName.has(nameKey)) { Object.assign(byName.get(nameKey).s, site); return; }
    rows.push(site);
    byId.set(id,{s:site,i:rows.length-1});
    byName.set(nameKey,{s:site,i:rows.length-1});
  }
  function rustic(id, extra){
    return patch(id, Object.assign({
      layer:'rustic',
      subtype:'rustic / primitive',
      rawCategory:'public',
      categoryLabel:'Rustic / Primitive',
      sourceFolder:'Illinois final cleanup v23.1.41',
      ownerLevel:'Public agency',
      layerLabel:'Rustic / Primitive',
      locationPrecision:'Existing active coordinate retained; broad campground/system marker, not an exact campsite pin.',
      lastChecked:'2026-06-25'
    }, extra||{}));
  }

  rustic('s24', {
    owner:'Illinois Department of Natural Resources',
    website:'https://dnr.illinois.gov/parks/camp/park.applerivercanyon.html',
    showers:'No showers for Class C campground per IDNR source.',
    amenities:'49 Class C sites at Canyon Ridge Campground; 6 group sites at Walnut Grove Youth Campground; winter camping at Walnut Grove.',
    description:'Official IDNR page says Apple River Canyon has Class C sites without showers and group sites at Walnut Grove. Modern triad is not met, so this active record is classified Rustic / Primitive. Existing coordinate retained as broad campground/park marker.',
    reviewSummary:'v23.1.41 official-source layer correction from Modern/generic public to Rustic / Primitive.'
  });
  rustic('s379', {owner:'Illinois Department of Natural Resources',website:'https://dnr.illinois.gov/parks/camp/park.hennepincanal.html',showers:'No showers.',amenities:'Class C primitive designated canal campground; no electricity; first-come, first-served; no towpath camping.',description:'Official IDNR Hennepin Canal page lists Lock 6 as a designated Class C primitive campground. IDNR states camping is designated-sites-only, no towpath camping, and no showers/electricity. Existing coordinate retained as campground marker.',reviewSummary:'v23.1.41 official-source layer correction to Rustic / Primitive.'});
  rustic('s380', {owner:'Illinois Department of Natural Resources',website:'https://dnr.illinois.gov/parks/camp/park.hennepincanal.html',showers:'No showers.',amenities:'Class C primitive designated canal campground; no electricity; first-come, first-served; no towpath camping.',description:'Official IDNR Hennepin Canal page lists Lock 11 as a designated Class C primitive campground. IDNR states camping is designated-sites-only, no towpath camping, and no showers/electricity. Existing coordinate retained as campground marker.',reviewSummary:'v23.1.41 official-source layer correction to Rustic / Primitive.'});
  rustic('s351', {owner:'Illinois Department of Natural Resources',website:'https://dnr.illinois.gov/parks/camp/park.greenriver.html',amenities:'Camping spaces with vehicular access; sanitary dump station.',description:'Official IDNR page confirms camping spaces with vehicular access and a sanitary dump station at Green River State Wildlife Area, but full Modern-triad proof was not recovered. Classified Rustic / Primitive unless later official proof supports Modern.',reviewSummary:'v23.1.41 official-source layer correction to Rustic / Primitive.'});
  rustic('s91', {owner:'Illinois Department of Natural Resources',website:'https://dnr.illinois.gov/parks/camp/park.bigriver.html',amenities:'Tent and trailer camping at Shady Pines; permit required.',description:'Official IDNR Big River page says tent and trailer camping is available at Shady Pines and campers must obtain a permit. The accessible official source does not prove the Modern triad, so this record is classified Rustic / Primitive.',reviewSummary:'v23.1.41 official-source layer correction to Rustic / Primitive.'});
  rustic('s239', {owner:'Illinois Department of Natural Resources',website:'https://dnr.illinois.gov/parks/camp/park.delabar.html',amenities:'Tent/trailer camping with electrical hookups, drinking water, sanitary station, and trailer-fill jet pump; group camping by permission.',description:'Official IDNR Delabar page lists tent/trailer camping with electrical hookups, drinking water, sanitary station, and trailer-fill jet pump, but the accessible official source does not prove showers or modern/flush restrooms. Modern triad is not met, so this record is classified Rustic / Primitive unless later official proof supports Modern.',reviewSummary:'v23.1.41 official-source layer correction to Rustic / Primitive.'});
  rustic('s928', {owner:'Illinois Department of Natural Resources',website:'https://dnr.illinois.gov/parks/camp/park.trailoftears.html',amenities:'Class C tent camping with vehicle access; Class D backpack camping; some log shelters and privies; group camping at a few sites.',description:'Official IDNR page confirms both Class C tent camping and Class D backpack camping at Trail of Tears State Forest. Existing coordinate retained only as a broad forest/camping-system marker; separate Class C/Class D coordinates were not recovered. This record is classified Rustic / Primitive rather than Modern.',reviewSummary:'v23.1.41 official-source layer correction. Backpack-specific sites remain held for exact coordinates.'});
  rustic('s755', {owner:'Illinois Department of Natural Resources',website:'https://dnr.illinois.gov/parks/camp/park.pyramid.html',showers:'No electrical hookups in camping areas; showers not proven by official source used for this correction.',amenities:'Three Class C camping areas; Class D hike-in campsites; equestrian camp; youth group camping; water and trailer dump near site office.',description:'Official IDNR page says Pyramid SRA camping is designated-only, with three Class C camping areas, Class D hike-in campsites, an equestrian camp, and a youth group area. IDNR also states there are no electrical hookups in the camping areas. Modern triad is not met, so this record is classified Rustic / Primitive. Hike-in Class D sites remain held for exact coordinates.',reviewSummary:'v23.1.41 official-source layer correction to Rustic / Primitive.'});
  rustic('s762', {owner:'Illinois Department of Natural Resources',website:'https://dnr.illinois.gov/parks/camp/park.randolphcounty.html',amenities:'51 Class B/E sites; 95 Class C sites; equestrian site with stalls; four Class D primitive campsites; group camp area.',description:'Official IDNR page confirms low-service and primitive camping types at Randolph County State Recreation Area, including Class B/E, Class C, Class D primitive, equestrian, and group camping. The accessible official source does not prove full Modern criteria for the broad active row, so this record is classified Rustic / Primitive.',reviewSummary:'v23.1.41 official-source layer correction to Rustic / Primitive.'});
  rustic('s798', {owner:'Illinois Department of Natural Resources',website:'https://dnr.illinois.gov/parks/camp/park.salinecounty.html',showers:'No electricity; showers not proven.',amenities:'Tent/trailer camping area; trailer disposal; permit required; equestrian campground exists.',description:'Official IDNR page says the Saline County State Fish and Wildlife Area camping area accommodates tent and trailer campers, has trailer disposal, requires a permit, and electricity is not available. Modern triad is not met, so this record is classified Rustic / Primitive.',reviewSummary:'v23.1.41 official-source layer correction to Rustic / Primitive.'});

  patch('s451', {
    name:'Johnson Creek Recreation Area',
    lat:37.83359459282547,
    lng:-89.51894527535929,
    layer:'state',
    subtype:'modern',
    rawCategory:'public',
    categoryLabel:'State / County / Town',
    sourceFolder:'State, county, and town Campgrounds',
    owner:'',
    ownerLevel:'',
    layerLabel:'State campgrounds',
    website:'https://dnr.illinois.gov/parks/camp/park.kinkaidlake.html',
    description:'Restored as Johnson Creek Recreation Area, separate from Kinkaid Lake Village Marina & Campground. Coordinate corrected from Tod-supplied exact location. IDNR Kinkaid page says camping is permitted by USFS, Kinkaid-Reed\'s Creek Conservancy District, and at Johnson Creek Recreation Area at Kinkaid Village Marina, and that camping is not allowed on DNR property. Further source work should verify the operating jurisdiction and amenities before any future layer change.',
    reviewSummary:'v23.1.41 restores Johnson Creek as its own active record after v23.1.40 incorrectly merged it with Kinkaid Lake Village Marina & Campground.',
    locationPrecision:'Tod-supplied corrected coordinate for Johnson Creek Recreation Area.',
    lastChecked:'2026-06-25'
  });

  patch('s467', {
    layer:'info', subtype:'reference', rawCategory:'info', categoryLabel:'Info / Reference', sourceFolder:'Illinois Kinkaid cleanup v23.1.41', owner:'Illinois Department of Natural Resources / Kinkaid-area context', ownerLevel:'Reference only', layerLabel:'Info / reference', website:'https://dnr.illinois.gov/parks/camp/park.kinkaidlake.html', markerType:'rule_area', cost:'Not a campground record.', showers:'Not applicable.', amenities:'Reference marker only. Camping around Kinkaid is tied to USFS/Shawnee, Kinkaid-Reed\'s Creek Conservancy District, Johnson Creek Recreation Area, and Kinkaid Lake Village Marina; camping is not allowed on DNR property.', description:'Kinkaid cleanup: this broad Kinkaid Lake row is no longer treated as a boondocking/dispersed campsite or campground marker. Official IDNR source says camping is permitted by USFS, Kinkaid-Reed\'s Creek Conservancy District, and at Johnson Creek Recreation Area at Kinkaid Village Marina, but camping is not allowed on DNR property. Use this only as context; do not treat this point as a legal campsite.', reviewSummary:'v23.1.41 keeps broad Kinkaid Lake out of camping layers. USFS/Shawnee and district-specific Kinkaid leads remain for targeted future work.', locationPrecision:'Existing broad lake/context coordinate retained as Info / Reference only; not an exact campsite pin.', lastChecked:'2026-06-25'
  });

  addUnique({
    id:'il-v23141-kinkaid-lake-village-marina-campground',
    name:'Kinkaid Lake Village Marina & Campground',
    lat:37.799181078721766,
    lng:-89.41360062354141,
    stateCode:'IL', stateName:'Illinois',
    layer:'private', subtype:'modern', rawCategory:'private', categoryLabel:'Private Campgrounds', sourceFolder:'Illinois Kinkaid cleanup v23.1.41', owner:'Kinkaid Lake Village Marina & Campground', ownerLevel:'Private/operator', layerLabel:'Private campgrounds',
    website:'https://kinkaidmarina.com/campsites/',
    cost:'See operator for current rates and reservations.',
    showers:'Yes — operator lists shower house facilities.',
    amenities:'Operator lists Ed Bottoms and Glenn Seeber campgrounds at 2063 Marina Road with electric/water/sewer hookups, 30/50 amp service, shower house, laundromat, short-stay internet, boat slips, fuel, restaurant, and campground rules. Donald Brittin primitive tent-only campground is a separate component.',
    description:'Private/operator modern campground on Kinkaid Lake, separate from Johnson Creek Recreation Area. Coordinates supplied by Tod for the campground/marina area. Official operator source confirms public-facing seasonal RV/tent camping and modern campground amenities including hookups and shower house.',
    reviewSummary:'v23.1.41 new add from Tod-supplied exact coordinate with official operator proof. Verify current rules, rates, and availability with operator.',
    locationPrecision:'Tod-supplied exact campground coordinate; operator source confirms campground identity but did not expose GIS coordinates.',
    lastChecked:'2026-06-25'
  });

  addUnique({
    id:'il-v23141-devils-kitchen-lake-campground',
    name:'Devils Kitchen Lake Campground',
    lat:37.645463221074806,
    lng:-89.10824469347529,
    stateCode:'IL', stateName:'Illinois',
    layer:'rustic', subtype:'primitive campground', rawCategory:'public', categoryLabel:'Rustic / Primitive', sourceFolder:'Illinois Devils Kitchen cleanup v23.1.41', owner:'U.S. Fish & Wildlife Service', ownerLevel:'Federal / USFWS', layerLabel:'Rustic / Primitive',
    website:'https://www.fws.gov/refuge/crab-orchard/visit-us',
    cost:'$12/night per FWS page; verify current fee before staying.',
    showers:'No showers listed for this primitive campground.',
    amenities:'8 primitive campsites; first-come, first-served; payment at campsites; refuge entrance/campground rules apply.',
    season:'April 1 through October 31 per FWS page.',
    description:'USFWS Crab Orchard NWR page confirms Devils Kitchen Lake Campground offers 8 primitive campsites at $12/night, open April 1 through October 31, first-come first-served. Coordinate supplied by Tod for the campground location.',
    reviewSummary:'v23.1.41 new Rustic / Primitive add from Tod-supplied exact coordinate with official USFWS camping proof.',
    locationPrecision:'Tod-supplied exact campground coordinate; official FWS page confirms campground identity but did not expose coordinate table.',
    lastChecked:'2026-06-25'
  });

  addUnique({
    id:'il-v23141-devils-kitchen-group-campground',
    name:'Devils Kitchen Group Campground',
    lat:37.642691415643284,
    lng:-89.10693260388003,
    stateCode:'IL', stateName:'Illinois',
    layer:'rustic', subtype:'group campground', rawCategory:'public', categoryLabel:'Rustic / Primitive', sourceFolder:'Illinois Devils Kitchen cleanup v23.1.41', owner:'U.S. Fish & Wildlife Service', ownerLevel:'Federal / USFWS', layerLabel:'Rustic / Primitive',
    website:'https://www.fws.gov/refuge/crab-orchard/visit-us',
    cost:'Reservation/fee handled through Recreation.gov or current FWS/refuge process; verify before staying.',
    showers:'No shower proof recovered.',
    amenities:'Group pavilion/group camping setting on Devils Kitchen Lake; reservations referenced by FWS; refuge camping limit and rules apply.',
    description:'USFWS Crab Orchard NWR page states Devils Kitchen Lake offers a Group Pavilion on a small peninsula with reservations through Recreation.gov, and lists campground maximum-stay rules in the same camping section. Coordinate supplied by Tod for the Devils Kitchen group campground/pavilion area.',
    reviewSummary:'v23.1.41 new Rustic / Primitive group-camp add from Tod-supplied exact coordinate with official USFWS camping/pavilion proof. Verify current reservation details.',
    locationPrecision:'Tod-supplied exact group campground/pavilion coordinate; official FWS page confirms group facility but did not expose coordinate table.',
    lastChecked:'2026-06-25'
  });

  window.CAMPING_STATE_DATA['IL'] = rows;
})();
