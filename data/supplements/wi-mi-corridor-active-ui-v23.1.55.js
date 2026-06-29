// Tod's Boondocking & Camping Maps — WI/UP corridor active + UI support v23.1.55
// Adds selected official/approximate area records and applies worker-return corrections from WI/UP corridor workers.
(function(){
  'use strict';
  const VERSION = 'v23.1.55';
  const FILE = 'data/supplements/wi-mi-corridor-active-ui-v23.1.55.js';
  const ADDITIONS = [
  {
    "stateCode": "MI",
    "stateName": "Michigan",
    "auditBatch": "v23.1.55 WI/UP corridor workers + UI search fix",
    "lastChecked": "2026-06-29",
    "dataCorrectionFile": "data/supplements/wi-mi-corridor-active-ui-v23.1.55.js",
    "dataCorrectionVersion": "v23.1.55",
    "dataCorrectionDate": "2026-06-29",
    "legalityStatus": "Verified Legal",
    "verificationStatus": "verified-v23.1.55-worker2-official-source",
    "sourceFolder": "v23.1.55 Worker 2 MI UP East Corridor official source return",
    "cost": "USFS fee; verify current rate",
    "showers": "No showers documented",
    "id": "mi-v23155-camp-7-lake-campground",
    "name": "Camp 7 Lake Campground",
    "lat": 46.0592,
    "lng": -86.5488,
    "county": "Delta / Schoolcraft edge",
    "nearestTown": "Rapid River / Manistique corridor",
    "layer": "rustic",
    "subtype": "rustic / primitive",
    "categoryLabel": "Rustic / Primitive",
    "layerLabel": "Rustic / Primitive",
    "owner": "USDA Forest Service \u2014 Hiawatha National Forest",
    "ownerLevel": "Federal",
    "rawCategory": "official USFS rustic campground",
    "siteForm": "campground",
    "facilityType": "Rustic / Primitive",
    "markerType": "official-usfs-campground",
    "exactCampsiteLocation": false,
    "siteGeometryType": "Official campground marker, not individual campsite pin",
    "locationPrecision": "Official USFS latitude/longitude",
    "website": "https://www.fs.usda.gov/r09/hiawatha/recreation/camp-7-lake-campground",
    "sourceUrl": "https://www.fs.usda.gov/r09/hiawatha/recreation/camp-7-lake-campground",
    "sourceName": "USFS Camp 7 Lake Campground official page",
    "description": "Official Hiawatha National Forest rustic campground. USFS provides exact campground coordinates and lists camping, lake recreation, vault toilets, no potable water, fees and access details. Classified Rustic / Primitive because shower proof and modern-restroom proof are absent even though some electric hookup sites exist.",
    "amenities": "Vault toilets; no potable water; lake recreation; some electric hookup sites; verify current fees and service status.",
    "access": "Use official USFS directions and current road conditions before travel."
  },
  {
    "stateCode": "MI",
    "stateName": "Michigan",
    "auditBatch": "v23.1.55 WI/UP corridor workers + UI search fix",
    "lastChecked": "2026-06-29",
    "dataCorrectionFile": "data/supplements/wi-mi-corridor-active-ui-v23.1.55.js",
    "dataCorrectionVersion": "v23.1.55",
    "dataCorrectionDate": "2026-06-29",
    "legalityStatus": "Verified Legal",
    "verificationStatus": "verified-v23.1.55-area-rule-marker",
    "sourceFolder": "v23.1.55 Worker 3 MI Western UP official source return",
    "cost": "No fee noted by worker source; verify current rules",
    "showers": "No potable water / no developed campground services documented for area marker",
    "id": "mi-v23155-trap-hills-backpacking-area",
    "name": "Trap Hills Backpacking / Dispersed Area",
    "lat": 46.658854,
    "lng": -89.446034,
    "county": "Ontonagon / Ottawa National Forest",
    "nearestTown": "Bergland / Bruce Crossing area",
    "layer": "boat-backpack",
    "subtype": "approximate backpacking / dispersed area marker",
    "categoryLabel": "Boat / Backpack",
    "layerLabel": "Boat / Backpack",
    "owner": "USDA Forest Service \u2014 Ottawa National Forest",
    "ownerLevel": "Federal",
    "rawCategory": "official USFS backpacking/dispersed area marker",
    "siteForm": "area_rule_marker",
    "facilityType": "Approximate Area / Rule Marker",
    "markerType": "official-approximate-area-rule-marker",
    "exactCampsiteLocation": false,
    "siteGeometryType": "Approximate official area marker, not exact campsite or legal boundary",
    "locationPrecision": "Official USFS area coordinate; not an exact campsite",
    "website": "https://www.fs.usda.gov/r09/ottawa/recreation/trap-hills",
    "sourceUrl": "https://www.fs.usda.gov/r09/ottawa/recreation/trap-hills",
    "sourceName": "USFS Trap Hills official page",
    "description": "Approximate backpacking/dispersed area marker. This pin uses the official USFS Trap Hills area coordinate. It is not an exact campsite, access point, or legal boundary. Verify current ownership, access, postings, closures, MVUM/nonmotorized restrictions, fire restrictions, road/trail conditions, stay limits, water availability and local rules before staying.",
    "amenities": "Remote backpacking/dispersed area context; no potable water or developed campground services should be assumed.",
    "access": "Backpacking/North Country Trail and remote forest access context; much of the area is non-motorized. Verify current route legality."
  },
  {
    "stateCode": "MI",
    "stateName": "Michigan",
    "auditBatch": "v23.1.55 WI/UP corridor workers + UI search fix",
    "lastChecked": "2026-06-29",
    "dataCorrectionFile": "data/supplements/wi-mi-corridor-active-ui-v23.1.55.js",
    "dataCorrectionVersion": "v23.1.55",
    "dataCorrectionDate": "2026-06-29",
    "legalityStatus": "Verified Legal \u2014 Area/rule marker",
    "verificationStatus": "verified-v23.1.55-approximate-area-rule-marker",
    "sourceFolder": "v23.1.55 Worker 3/4 Ottawa NF rule-area return",
    "cost": "Dispersed camping generally no campground fee; verify current forest orders and special areas",
    "showers": "No developed services",
    "id": "mi-v23155-ottawa-nf-dispersed-rule-area",
    "name": "Ottawa National Forest Dispersed Camping Rule Area",
    "lat": 46.4503,
    "lng": -89.257,
    "county": "Gogebic / Ontonagon / Iron / Houghton / Baraga",
    "nearestTown": "Western Upper Peninsula / Ottawa NF",
    "layer": "boondocking",
    "subtype": "approximate dispersed camping rule area",
    "categoryLabel": "Boondocking / Dispersed",
    "layerLabel": "Boondocking / Dispersed",
    "owner": "USDA Forest Service \u2014 Ottawa National Forest",
    "ownerLevel": "Federal",
    "rawCategory": "official public-land dispersed camping rule area",
    "siteForm": "area_rule_marker",
    "facilityType": "Approximate Area / Rule Marker",
    "markerType": "official-approximate-area-rule-marker",
    "exactCampsiteLocation": false,
    "siteGeometryType": "Approximate area/rule marker, not exact campsite, access point, or legal boundary",
    "locationPrecision": "Approximate Ottawa NF area/rule marker; future GIS/MVUM/ownership extraction needed",
    "website": "https://www.fs.usda.gov/r09/ottawa/recreation/camping-cabins",
    "sourceUrl": "https://www.fs.usda.gov/r09/ottawa/recreation/camping-cabins",
    "sourceName": "USFS Ottawa National Forest camping and MVUM/geospatial sources",
    "description": "Approximate boondocking area marker. This marker references Ottawa National Forest dispersed-camping rule areas; it is not an exact campsite, access point, or legal boundary. Verify current National Forest ownership, MVUM route legality, postings, closures, developed-recreation buffers, wilderness/Sylvania rules, fire restrictions, road conditions, stay limits and local rules before staying.",
    "amenities": "No developed services. Self-contained dispersed camping only where current rules and access allow.",
    "access": "Use current Ottawa NF MVUM/open-road and ownership data before relying on any specific road or pull-off."
  },
  {
    "stateCode": "MI",
    "stateName": "Michigan",
    "auditBatch": "v23.1.55 WI/UP corridor workers + UI search fix",
    "lastChecked": "2026-06-29",
    "dataCorrectionFile": "data/supplements/wi-mi-corridor-active-ui-v23.1.55.js",
    "dataCorrectionVersion": "v23.1.55",
    "dataCorrectionDate": "2026-06-29",
    "legalityStatus": "Verified Legal \u2014 Area/rule marker",
    "verificationStatus": "verified-v23.1.55-approximate-area-rule-marker",
    "sourceFolder": "v23.1.55 Worker 2/3/4 Michigan DNR state forest dispersed rule return",
    "cost": "Free dispersed camping; registration card required by DNR rules",
    "showers": "No developed services",
    "id": "mi-v23155-up-state-forest-dispersed-rule-area",
    "name": "Michigan DNR UP State Forest Dispersed Camping Rule Area",
    "lat": 45.8492,
    "lng": -87.0306,
    "county": "Upper Peninsula state forest lands",
    "nearestTown": "Central Upper Peninsula reference marker",
    "layer": "boondocking",
    "subtype": "approximate state forest dispersed camping rule area",
    "categoryLabel": "Boondocking / Dispersed",
    "layerLabel": "Boondocking / Dispersed",
    "owner": "Michigan Department of Natural Resources",
    "ownerLevel": "State",
    "rawCategory": "official state forest dispersed camping rule area",
    "siteForm": "area_rule_marker",
    "facilityType": "Approximate Area / Rule Marker",
    "markerType": "official-approximate-area-rule-marker",
    "exactCampsiteLocation": false,
    "siteGeometryType": "Approximate area/rule marker, not exact campsite, access point, or legal boundary",
    "locationPrecision": "Approximate UP state forest rule marker; DNR GIS/one-mile campground exclusion extraction needed",
    "website": "https://www.michigan.gov/dnr/things-to-do/camping-and-lodging/backpack",
    "sourceUrl": "https://www.michigan.gov/dnr/things-to-do/camping-and-lodging/backpack",
    "sourceName": "Michigan DNR backpacking, hike-in and backcountry camping page",
    "description": "Approximate boondocking area marker. Michigan DNR supports dispersed camping on state forest land under rules, but this pin is not an exact campsite, access point, or legal boundary. Verify current state forest ownership, that the spot is more than one mile from a state forest campground, not in a state park/recreation area/state game area, not posted No Camping, and that registration-card, fire, road, access and local rules are satisfied before staying.",
    "amenities": "No developed services. Free dispersed camping only where current DNR rules and land status allow.",
    "access": "Use Michigan DNR state forest maps/roads and on-site postings before selecting a site."
  }
];
  const CORRECTIONS = {
  "MI": {
    "s49": {
      "layer": "rustic",
      "subtype": "rustic / primitive",
      "categoryLabel": "Rustic / Primitive",
      "layerLabel": "Rustic / Primitive",
      "facilityType": "Rustic / Primitive",
      "verificationStatus": "corrected-v23.1.55-worker2",
      "dataCorrectionNote": "Worker 2 layer correction: official USFS Bass Lake Campsites proof shows small primitive site/no potable water/no showers; not Modern.",
      "description": "Official Hiawatha National Forest primitive/rustic campsite area with restroom context; no potable water and no shower proof. Corrected to Rustic / Primitive in v23.1.55.",
      "showers": "No",
      "locationPrecision": "Official USFS coordinate retained."
    },
    "s1079": {
      "layer": "rustic",
      "subtype": "rustic / primitive",
      "categoryLabel": "Rustic / Primitive",
      "layerLabel": "Rustic / Primitive",
      "facilityType": "Rustic / Primitive",
      "verificationStatus": "corrected-v23.1.55-worker2",
      "dataCorrectionNote": "Worker 2 layer correction: official USFS Bear Lake Campsites proof shows primitive single-site/no potable water/no showers; not Modern.",
      "description": "Official Hiawatha National Forest primitive/rustic Bear Lake campsite area. Corrected to Rustic / Primitive in v23.1.55.",
      "showers": "No",
      "locationPrecision": "Official USFS coordinate retained."
    },
    "s889": {
      "layer": "rustic",
      "subtype": "rustic / primitive",
      "categoryLabel": "Rustic / Primitive",
      "layerLabel": "Rustic / Primitive",
      "facilityType": "Rustic / Primitive",
      "lat": 46.570096,
      "lng": -88.65636953,
      "verificationStatus": "corrected-v23.1.55-worker3",
      "dataCorrectionNote": "Worker 3 duplicate scan: existing Sturgeon River Campground kept and corrected to official USFS coordinate/layer; 9 sites, vault toilet, no potable water; not Modern.",
      "description": "Official Ottawa National Forest rustic campground. USFS lists 9 sites, fire rings, vault toilet, no potable water and official coordinates. Corrected to Rustic / Primitive and updated to official coordinate in v23.1.55.",
      "showers": "No",
      "amenities": "9 sites; fire rings; double vault toilet; no potable water; first-come/no reservations per worker source."
    },
    "s1035": {
      "lat": 46.23240559,
      "lng": -88.71756443,
      "verificationStatus": "corrected-v23.1.55-worker3",
      "dataCorrectionNote": "Worker 3 official USFS coordinate correction for Paint River Forks Campground.",
      "description": "Official Ottawa National Forest rustic riverbank campground at the forks of the Paint River. Official coordinate corrected in v23.1.55; vault toilet/no potable water context retained.",
      "locationPrecision": "Official USFS coordinate from Worker 3 source return."
    }
  },
  "WI": {
    "wi-florence-county-forest-camping-rule-area-needs-verification-v23082": {
      "layer": "boondocking",
      "subtype": "approximate county forest camping rule area",
      "categoryLabel": "Boondocking / Dispersed",
      "layerLabel": "Boondocking / Dispersed",
      "facilityType": "Approximate Area / Rule Marker",
      "markerType": "official-approximate-area-rule-marker",
      "exactCampsiteLocation": false,
      "siteGeometryType": "Approximate county forest rule marker, not exact campsite, access point, or legal boundary",
      "locationPrecision": "Approximate Florence County Forest camping rule marker; county forest geometry still needed",
      "verificationStatus": "verified-v23.1.55-area-rule-marker",
      "legalityStatus": "Verified Legal — Area/rule marker",
      "description": "Approximate boondocking area marker for Florence County Forest camping rules. This pin is not an exact campsite, access point, or legal boundary. Florence County sources support county forest overnight camping under county rules, but campers must verify current county forest ownership, road access, postings, closures, fire restrictions, stay limits, and local rules before staying.",
      "popupNote": "Approximate Area/rule marker only — not an exact campsite or legal boundary. Verify current Florence County Forest rules and eligible land before staying.",
      "dataCorrectionNote": "v23.1.55 promotes prior Needs Verification county-forest rule marker to active Boondocking / Dispersed area marker under the broader honest Area/rule pin standard. Geometry upgrade still needed."
    }
  }
};
  const REMOVALS = {
  "MI": {
    "s61": "Duplicate/unsafe separate boondocking row near official Bear Lake Campsites. Existing row used the Bear Lake Campsites official source but represented a separate dispersed campsite without separate proof; removed from active runtime and preserved in rejected memory."
  }
};
  function text(v){return String(v == null ? '' : v).trim();}
  function clean(v){return text(v).toLowerCase();}
  function exists(list, site){
    const id=clean(site.id);
    const lat=Number(site.lat), lng=Number(site.lng);
    const name=clean(site.name);
    return list.some(s => clean(s.id)===id || (Number.isFinite(lat)&&Number.isFinite(lng)&&Math.abs(Number(s.lat)-lat)<0.00003&&Math.abs(Number(s.lng)-lng)<0.00003) || (name&&clean(s.name)===name));
  }
  function applyCorrection(list,id,patch){
    const site=list.find(s=>clean(s.id)===clean(id));
    if(!site)return false;
    Object.assign(site,patch,{dataCorrectionFile:FILE,dataCorrectionVersion:VERSION,dataCorrectionDate:'2026-06-29'});
    return true;
  }
  function removeById(stateCode,list,id,reason){
    for(let i=list.length-1;i>=0;i--){
      if(clean(list[i].id)===clean(id)){
        const removed=Object.assign({},list[i],{dataCorrectionFile:FILE,dataCorrectionVersion:VERSION,dataCorrectionDate:'2026-06-29',removalReason:reason,finalDecision:'REJECT / DO NOT IMPORT AS SEPARATE ACTIVE ROW'});
        window.CAMPING_V23155_REMOVED = window.CAMPING_V23155_REMOVED || [];
        window.CAMPING_V23155_REMOVED.push(removed);
        list.splice(i,1);
      }
    }
  }
  window.CAMPING_STATE_DATA = window.CAMPING_STATE_DATA || {};
  Object.keys(CORRECTIONS).forEach(stateCode=>{
    const list=window.CAMPING_STATE_DATA[stateCode];
    if(!Array.isArray(list))return;
    Object.keys(CORRECTIONS[stateCode]||{}).forEach(id=>applyCorrection(list,id,CORRECTIONS[stateCode][id]));
  });
  Object.keys(REMOVALS).forEach(stateCode=>{
    const list=window.CAMPING_STATE_DATA[stateCode];
    if(!Array.isArray(list))return;
    Object.keys(REMOVALS[stateCode]||{}).forEach(id=>removeById(stateCode,list,id,REMOVALS[stateCode][id]));
  });
  ADDITIONS.forEach(site=>{
    const stateCode=String(site.stateCode||site.state||'').toUpperCase();
    if(!stateCode)return;
    const list=window.CAMPING_STATE_DATA[stateCode]=Array.isArray(window.CAMPING_STATE_DATA[stateCode])?window.CAMPING_STATE_DATA[stateCode]:[];
    if(!exists(list,site))list.push(site);
  });
})();
