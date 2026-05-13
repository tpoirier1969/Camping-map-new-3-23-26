// Michigan Rest Areas & Roadside Stops data part v23.0.8
// Clean app-loader version: appends records to window.CAMPING_STATE_DATA.MI when loaded as an explicit state data part.
(function(){
  'use strict';
  var rawRecords = [
  {
    "id": "mi-mdot-wc-clare",
    "name": "Clare Welcome Center",
    "lat": 43.85109,
    "lng": -84.77519,
    "facilityType": "Welcome Center",
    "address": "9599 US-127 (MM 161), Clare, MI 48617",
    "overnightParking": "Unknown",
    "seasonStatus": "Year-round",
    "seasonNotes": "MDOT lists 7 days/week, 8 a.m.-4:30 p.m. EST; restrooms open 24 hours. Closed federal holidays October-April.",
    "amenities": "Travel information, brochures, restrooms, picnic/visitor amenities; MDOT page notes Welcome Center amenities may include walking paths, dog exercise areas, picnic tables, grills, drinking fountains, and play areas.",
    "sourceUrl": "https://www.michigan.gov/mdot/travel/tourists/welcome-centers",
    "locationPrecision": "OSM/rest-area-level starter coordinate; verify against MDOT ArcGIS before final production."
  },
  {
    "id": "mi-mdot-wc-coldwater",
    "name": "Coldwater Welcome Center",
    "lat": 41.8729,
    "lng": -84.9994,
    "facilityType": "Welcome Center",
    "address": "Northbound I-69 (MM 6), Coldwater, MI 49036",
    "overnightParking": "Unknown",
    "seasonStatus": "Year-round",
    "seasonNotes": "MDOT lists 7 days/week, 8 a.m.-4:30 p.m. EST; restrooms open 24 hours. Closed federal holidays October-April.",
    "amenities": "Travel information, brochures, restrooms, picnic/visitor amenities.",
    "sourceUrl": "https://www.michigan.gov/mdot/travel/tourists/welcome-centers",
    "locationPrecision": "Address/interchange-level starter coordinate; verify exact lot against MDOT ArcGIS."
  },
  {
    "id": "mi-mdot-wc-detroit",
    "name": "Detroit Welcome Center",
    "lat": 42.3207,
    "lng": -83.078,
    "facilityType": "Welcome Center",
    "address": "2835 Bagley St. Ste. 100, Detroit, MI 48216",
    "overnightParking": "Not allowed",
    "seasonStatus": "Year-round",
    "seasonNotes": "MDOT lists Mon-Fri year-round, 8:30 a.m.-5 p.m. EST; restrooms open during center hours. Urban visitor center; not a rest-area overnight stop.",
    "amenities": "Urban travel information center, brochures, visitor assistance, restrooms during center hours.",
    "sourceUrl": "https://www.michigan.gov/mdot/travel/tourists/welcome-centers",
    "locationPrecision": "Address-level starter coordinate."
  },
  {
    "id": "mi-mdot-wc-dundee",
    "name": "Dundee Welcome Center",
    "lat": 41.9558,
    "lng": -83.6717,
    "facilityType": "Welcome Center",
    "address": "8001 Covert Rd./NB US-23 (MM 8), Dundee, MI 48131",
    "overnightParking": "Unknown",
    "seasonStatus": "Year-round",
    "seasonNotes": "MDOT lists 7 days/week, 8 a.m.-4:30 p.m. EST; restrooms open 24 hours. Closed federal holidays October-April.",
    "amenities": "Travel information, brochures, restrooms, picnic/visitor amenities.",
    "sourceUrl": "https://www.michigan.gov/mdot/travel/tourists/welcome-centers",
    "locationPrecision": "Address/interchange-level starter coordinate; verify exact lot against MDOT ArcGIS."
  },
  {
    "id": "mi-mdot-wc-iron-mountain",
    "name": "Iron Mountain Welcome Center",
    "lat": 45.8147,
    "lng": -88.0648,
    "facilityType": "Welcome Center",
    "address": "618 S. Stephenson Ave., Iron Mountain, MI 49801",
    "overnightParking": "Not allowed",
    "seasonStatus": "Year-round",
    "seasonNotes": "MDOT lists 7 days/week, 8 a.m.-4:30 p.m. CST; restrooms open during center hours. City-center style facility, not an overnight parking lot.",
    "amenities": "Travel information, brochures, restrooms during center hours, visitor assistance.",
    "sourceUrl": "https://www.michigan.gov/mdot/travel/tourists/welcome-centers",
    "locationPrecision": "Address-level starter coordinate."
  },
  {
    "id": "mi-mdot-wc-ironwood",
    "name": "Ironwood Welcome Center",
    "lat": 46.4536,
    "lng": -90.1719,
    "facilityType": "Welcome Center",
    "address": "801 W. Cloverland Dr., Ironwood, MI 49938",
    "overnightParking": "Unknown",
    "seasonStatus": "Year-round",
    "seasonNotes": "MDOT lists 7 days/week, 8 a.m.-4:30 p.m. CST; restrooms open 24 hours. Closed federal holidays October-April.",
    "amenities": "Travel information, brochures, restrooms, visitor assistance.",
    "sourceUrl": "https://www.michigan.gov/mdot/travel/tourists/welcome-centers",
    "locationPrecision": "Address-level starter coordinate."
  },
  {
    "id": "mi-mdot-wc-mackinaw-city",
    "name": "Mackinaw City Welcome Center",
    "lat": 45.7705,
    "lng": -84.7271,
    "facilityType": "Welcome Center",
    "address": "710 S. Nicolet St., Mackinaw City, MI 49701",
    "overnightParking": "Unknown",
    "seasonStatus": "Year-round",
    "seasonNotes": "MDOT lists May-Oct Mon-Sat and Nov-Apr Tue-Sat; restrooms open 24 hours. Closed federal holidays October-April.",
    "amenities": "Travel information, brochures, restrooms, visitor assistance, nearby bridge/travel services.",
    "sourceUrl": "https://www.michigan.gov/mdot/travel/tourists/welcome-centers",
    "locationPrecision": "Address-level starter coordinate."
  },
  {
    "id": "mi-mdot-wc-marquette",
    "name": "Marquette Welcome Center",
    "lat": 46.504333,
    "lng": -87.361883,
    "facilityType": "Welcome Center",
    "address": "2201 US-41 South, Marquette, MI 49855",
    "overnightParking": "Unknown",
    "seasonStatus": "Year-round",
    "seasonNotes": "MDOT lists 7 days/week, 8 a.m.-4:30 p.m. EST; restrooms open 24 hours. Closed federal holidays October-April.",
    "amenities": "Travel information, brochures, restrooms, visitor assistance, Iron Ore Heritage Trail access nearby.",
    "sourceUrl": "https://www.michigan.gov/mdot/travel/tourists/welcome-centers",
    "locationPrecision": "Historical-marker/address-level starter coordinate near Welcome Center parking area."
  },
  {
    "id": "mi-mdot-wc-menominee",
    "name": "Menominee Welcome Center",
    "lat": 45.1092,
    "lng": -87.6144,
    "facilityType": "Welcome Center",
    "address": "1343 10th Ave., Menominee, MI 49858",
    "overnightParking": "Not allowed",
    "seasonStatus": "Year-round",
    "seasonNotes": "MDOT lists May-Oct 7 days/week and Nov-Apr Mon-Sat; restrooms open during center hours. City-center style facility, not an overnight parking lot.",
    "amenities": "Travel information, brochures, restrooms during center hours, visitor assistance.",
    "sourceUrl": "https://www.michigan.gov/mdot/travel/tourists/welcome-centers",
    "locationPrecision": "Address-level starter coordinate."
  },
  {
    "id": "mi-mdot-wc-monroe",
    "name": "Monroe Welcome Center",
    "lat": 41.9394,
    "lng": -83.3972,
    "facilityType": "Welcome Center",
    "address": "Northbound I-75 (MM 10), Monroe, MI 48161",
    "overnightParking": "Unknown",
    "seasonStatus": "Year-round",
    "seasonNotes": "MDOT lists 7 days/week, 8 a.m.-4:30 p.m. EST; restrooms open 24 hours. Closed federal holidays October-April.",
    "amenities": "Travel information, brochures, restrooms, visitor assistance, freeway rest stop services.",
    "sourceUrl": "https://www.michigan.gov/mdot/travel/tourists/welcome-centers",
    "locationPrecision": "Interstate/mile-marker-level starter coordinate; verify exact lot against MDOT ArcGIS."
  },
  {
    "id": "mi-mdot-wc-new-buffalo",
    "name": "New Buffalo Welcome Center",
    "lat": 41.7908,
    "lng": -86.7435,
    "facilityType": "Welcome Center",
    "address": "11630 Wilson Rd., New Buffalo, MI 49117",
    "overnightParking": "Unknown",
    "seasonStatus": "Year-round",
    "seasonNotes": "MDOT lists 7 days/week, 8:30 a.m.-5 p.m. EST; restrooms open 24 hours. Closed federal holidays October-April.",
    "amenities": "Travel information, brochures, restrooms, visitor assistance, picnic/visitor amenities.",
    "sourceUrl": "https://www.michigan.gov/mdot/travel/tourists/welcome-centers",
    "locationPrecision": "Address-level starter coordinate."
  },
  {
    "id": "mi-mdot-wc-port-huron",
    "name": "Port Huron Welcome Center",
    "lat": 42.9962,
    "lng": -82.4671,
    "facilityType": "Welcome Center",
    "address": "3600 I-94 West, Port Huron, MI 48060",
    "overnightParking": "Unknown",
    "seasonStatus": "Year-round",
    "seasonNotes": "MDOT lists May-Oct 7 days/week and Nov-Apr Mon-Fri; restrooms open 24 hours. Closed federal holidays October-April.",
    "amenities": "Travel information, brochures, restrooms, visitor assistance, freeway travel services.",
    "sourceUrl": "https://www.michigan.gov/mdot/travel/tourists/welcome-centers",
    "locationPrecision": "Address/interstate-level starter coordinate; verify exact lot against MDOT ArcGIS."
  },
  {
    "id": "mi-mdot-wc-sault-ste-marie",
    "name": "Sault Ste. Marie Welcome Center",
    "lat": 46.501,
    "lng": -84.3563,
    "facilityType": "Welcome Center",
    "address": "943 Portage Ave. W, Sault Ste. Marie, MI 49783",
    "overnightParking": "Unknown",
    "seasonStatus": "Year-round",
    "seasonNotes": "MDOT lists Memorial Day-Oct Mon-Sat and Nov-Memorial Day Mon-Fri; restrooms open 24 hours. Closed federal holidays October-April.",
    "amenities": "Travel information, brochures, restrooms, visitor assistance.",
    "sourceUrl": "https://www.michigan.gov/mdot/travel/tourists/welcome-centers",
    "locationPrecision": "Address-level starter coordinate."
  },
  {
    "id": "mi-mdot-wc-st-ignace",
    "name": "St. Ignace Welcome Center",
    "lat": 45.864,
    "lng": -84.7227,
    "facilityType": "Welcome Center",
    "address": "I-75 N Mackinac Bridge Plaza, St. Ignace, MI 49781",
    "overnightParking": "Unknown",
    "seasonStatus": "Year-round",
    "seasonNotes": "MDOT lists Tue-Sat, 8 a.m.-4:30 p.m. EST; restrooms open 23 hours, closed 7-8 a.m. daily for cleaning. Closed federal holidays October-April.",
    "amenities": "Travel information, brochures, visitor assistance, bridge-plaza services, restrooms with daily cleaning closure.",
    "sourceUrl": "https://www.michigan.gov/mdot/travel/tourists/welcome-centers",
    "locationPrecision": "Bridge-plaza-level starter coordinate; verify exact lot against MDOT ArcGIS."
  },
  {
    "id": "mi-mdot-rest-grand-ledge-i96",
    "name": "Grand Ledge Rest Area",
    "lat": 42.755,
    "lng": -84.764,
    "facilityType": "Rest Area",
    "address": "I-96, Clinton County / Grand Ledge area",
    "overnightParking": "Unknown",
    "seasonStatus": "Year-round",
    "seasonNotes": "MDOT rest-area page says Michigan rest areas are open 24/7; verify posted parking limits on site.",
    "amenities": "Restrooms, picnic areas, pet zones, paved parking, and drinking water are standard MDOT rest-area amenities.",
    "sourceUrl": "https://www.michigan.gov/mdot/travel/tourists/rest-areas",
    "locationPrecision": "Official page example location; coordinate is approximate starter pin pending MDOT ArcGIS extraction."
  },
  {
    "id": "mi-mdot-scenic-arcadia-bluffs-m22",
    "name": "Arcadia Bluffs Roadside Park",
    "lat": 44.503,
    "lng": -86.236,
    "facilityType": "Scenic Turnout",
    "address": "M-22, Benzie County / Arcadia area",
    "overnightParking": "Unknown",
    "seasonStatus": "Seasonal",
    "seasonNotes": "MDOT roadside/scenic-view page uses Arcadia Bluffs Roadside Park as an example; roadside parks are generally seasonal, and exact open status should be checked on the MDOT map.",
    "amenities": "Scenic roadside stop / viewpoint; verify restrooms, water, and picnic amenities before relying on them.",
    "sourceUrl": "https://www.michigan.gov/mdot/travel/tourists/roadside-parks",
    "locationPrecision": "Approximate starter pin for Arcadia Bluffs/M-22 area pending MDOT ArcGIS extraction."
  },
  {
    "id": "mi-mdot-rp-au-train-m28",
    "name": "Au Train Roadside Park",
    "lat": 46.4315,
    "lng": -86.8436,
    "facilityType": "Roadside Park",
    "address": "M-28, Alger County",
    "overnightParking": "Unknown",
    "seasonStatus": "Temporarily closed",
    "seasonNotes": "MDOT April 21, 2026 release listed this roadside park as closed until later in May due to snow. Verify current status before relying on the stop.",
    "amenities": "Roadside park / picnic stop; drinking water may not be available immediately after seasonal reopening. Verify current amenities on MDOT map.",
    "sourceUrl": "https://www.michigan.gov/mdot/news-outreach/pressreleases/2026/04/21/most-mdot-roadside-parks-reopening-april-28",
    "locationPrecision": "Approximate starter coordinate based on named highway/county; verify against MDOT ArcGIS before final production."
  },
  {
    "id": "mi-mdot-rp-deer-lake-m28",
    "name": "Deer Lake Roadside Park",
    "lat": 46.378,
    "lng": -86.72,
    "facilityType": "Roadside Park",
    "address": "M-28, Alger County",
    "overnightParking": "Unknown",
    "seasonStatus": "Temporarily closed",
    "seasonNotes": "MDOT April 21, 2026 release listed this roadside park as closed until later in May due to snow. Verify current status before relying on the stop.",
    "amenities": "Roadside park / picnic stop; drinking water may not be available immediately after seasonal reopening. Verify current amenities on MDOT map.",
    "sourceUrl": "https://www.michigan.gov/mdot/news-outreach/pressreleases/2026/04/21/most-mdot-roadside-parks-reopening-april-28",
    "locationPrecision": "Approximate starter coordinate based on named highway/county; verify against MDOT ArcGIS before final production."
  },
  {
    "id": "mi-mdot-rp-grand-island-m28",
    "name": "Grand Island Roadside Park",
    "lat": 46.444,
    "lng": -86.623,
    "facilityType": "Roadside Park",
    "address": "M-28, Alger County",
    "overnightParking": "Unknown",
    "seasonStatus": "Temporarily closed",
    "seasonNotes": "MDOT April 21, 2026 release listed this roadside park as closed until later in May due to snow. Verify current status before relying on the stop.",
    "amenities": "Roadside park / picnic stop; drinking water may not be available immediately after seasonal reopening. Verify current amenities on MDOT map.",
    "sourceUrl": "https://www.michigan.gov/mdot/news-outreach/pressreleases/2026/04/21/most-mdot-roadside-parks-reopening-april-28",
    "locationPrecision": "Approximate starter coordinate based on named highway/county; verify against MDOT ArcGIS before final production."
  },
  {
    "id": "mi-mdot-rp-kiva-us41",
    "name": "Kiva Roadside Park",
    "lat": 46.276,
    "lng": -87.088,
    "facilityType": "Roadside Park",
    "address": "US-41, Alger County",
    "overnightParking": "Unknown",
    "seasonStatus": "Temporarily closed",
    "seasonNotes": "MDOT April 21, 2026 release listed this roadside park as closed until later in May due to snow. Verify current status before relying on the stop.",
    "amenities": "Roadside park / picnic stop; drinking water may not be available immediately after seasonal reopening. Verify current amenities on MDOT map.",
    "sourceUrl": "https://www.michigan.gov/mdot/news-outreach/pressreleases/2026/04/21/most-mdot-roadside-parks-reopening-april-28",
    "locationPrecision": "Approximate starter coordinate based on named highway/county; verify against MDOT ArcGIS before final production."
  },
  {
    "id": "mi-mdot-rp-scott-falls-m28",
    "name": "Scott Falls Roadside Park",
    "lat": 46.438,
    "lng": -86.615,
    "facilityType": "Roadside Park",
    "address": "M-28, Alger County",
    "overnightParking": "Unknown",
    "seasonStatus": "Temporarily closed",
    "seasonNotes": "MDOT April 21, 2026 release listed this roadside park as closed until later in May due to snow. Verify current status before relying on the stop.",
    "amenities": "Roadside park / picnic stop; drinking water may not be available immediately after seasonal reopening. Verify current amenities on MDOT map.",
    "sourceUrl": "https://www.michigan.gov/mdot/news-outreach/pressreleases/2026/04/21/most-mdot-roadside-parks-reopening-april-28",
    "locationPrecision": "Approximate starter coordinate based on named highway/county; verify against MDOT ArcGIS before final production."
  },
  {
    "id": "mi-mdot-rp-tioga-creek-us41-m28",
    "name": "Tioga Creek Roadside Park",
    "lat": 46.55,
    "lng": -88.03,
    "facilityType": "Roadside Park",
    "address": "US-41/M-28, Baraga County",
    "overnightParking": "Unknown",
    "seasonStatus": "Temporarily closed",
    "seasonNotes": "MDOT April 21, 2026 release listed this roadside park as closed until later in May due to snow. Verify current status before relying on the stop.",
    "amenities": "Roadside park / picnic stop; drinking water may not be available immediately after seasonal reopening. Verify current amenities on MDOT map.",
    "sourceUrl": "https://www.michigan.gov/mdot/news-outreach/pressreleases/2026/04/21/most-mdot-roadside-parks-reopening-april-28",
    "locationPrecision": "Approximate starter coordinate based on named highway/county; verify against MDOT ArcGIS before final production."
  },
  {
    "id": "mi-mdot-rp-canyon-falls-us41",
    "name": "Canyon Falls Roadside Park",
    "lat": 46.649,
    "lng": -88.476,
    "facilityType": "Roadside Park",
    "address": "US-41, Baraga County",
    "overnightParking": "Unknown",
    "seasonStatus": "Temporarily closed",
    "seasonNotes": "MDOT April 21, 2026 release listed this roadside park as closed until later in May due to snow. Verify current status before relying on the stop.",
    "amenities": "Roadside park / picnic stop; drinking water may not be available immediately after seasonal reopening. Verify current amenities on MDOT map.",
    "sourceUrl": "https://www.michigan.gov/mdot/news-outreach/pressreleases/2026/04/21/most-mdot-roadside-parks-reopening-april-28",
    "locationPrecision": "Approximate starter coordinate based on named highway/county; verify against MDOT ArcGIS before final production."
  },
  {
    "id": "mi-mdot-rp-memorial-airport-us41",
    "name": "Memorial Airport Roadside Park",
    "lat": 47.168,
    "lng": -88.489,
    "facilityType": "Roadside Park",
    "address": "US-41, Houghton County",
    "overnightParking": "Unknown",
    "seasonStatus": "Temporarily closed",
    "seasonNotes": "MDOT April 21, 2026 release listed this roadside park as closed until later in May due to snow. Verify current status before relying on the stop.",
    "amenities": "Roadside park / picnic stop; drinking water may not be available immediately after seasonal reopening. Verify current amenities on MDOT map.",
    "sourceUrl": "https://www.michigan.gov/mdot/news-outreach/pressreleases/2026/04/21/most-mdot-roadside-parks-reopening-april-28",
    "locationPrecision": "Approximate starter coordinate based on named highway/county; verify against MDOT ArcGIS before final production."
  },
  {
    "id": "mi-mdot-rp-red-cedar-m43",
    "name": "Red Cedar Roadside Park",
    "lat": 42.692,
    "lng": -84.377,
    "facilityType": "Roadside Park",
    "address": "M-43, Ingham County",
    "overnightParking": "Unknown",
    "seasonStatus": "Temporarily closed",
    "seasonNotes": "MDOT April 21, 2026 release listed this roadside park as closed until later in May for construction. Verify current status before relying on the stop.",
    "amenities": "Roadside park / picnic stop; drinking water may not be available immediately after seasonal reopening. Verify current amenities on MDOT map.",
    "sourceUrl": "https://www.michigan.gov/mdot/news-outreach/pressreleases/2026/04/21/most-mdot-roadside-parks-reopening-april-28",
    "locationPrecision": "Approximate starter coordinate based on named highway/county; verify against MDOT ArcGIS before final production."
  },
  {
    "id": "mi-mdot-rp-baldwin-us10",
    "name": "Baldwin Roadside Park",
    "lat": 43.901,
    "lng": -85.866,
    "facilityType": "Roadside Park",
    "address": "US-10, Lake County",
    "overnightParking": "Unknown",
    "seasonStatus": "Seasonal",
    "seasonNotes": "MDOT April 21, 2026 release listed this roadside park as closed until May 11 for construction. Verify current status before relying on the stop.",
    "amenities": "Roadside park / picnic stop; drinking water may not be available immediately after seasonal reopening. Verify current amenities on MDOT map.",
    "sourceUrl": "https://www.michigan.gov/mdot/news-outreach/pressreleases/2026/04/21/most-mdot-roadside-parks-reopening-april-28",
    "locationPrecision": "Approximate starter coordinate based on named highway/county; verify against MDOT ArcGIS before final production."
  },
  {
    "id": "mi-mdot-rp-chase-us10",
    "name": "Chase Roadside Park",
    "lat": 43.884,
    "lng": -85.637,
    "facilityType": "Roadside Park",
    "address": "US-10, Lake County",
    "overnightParking": "Unknown",
    "seasonStatus": "Seasonal",
    "seasonNotes": "MDOT April 21, 2026 release listed this roadside park as closed until May 11 for construction. Verify current status before relying on the stop.",
    "amenities": "Roadside park / picnic stop; drinking water may not be available immediately after seasonal reopening. Verify current amenities on MDOT map.",
    "sourceUrl": "https://www.michigan.gov/mdot/news-outreach/pressreleases/2026/04/21/most-mdot-roadside-parks-reopening-april-28",
    "locationPrecision": "Approximate starter coordinate based on named highway/county; verify against MDOT ArcGIS before final production."
  },
  {
    "id": "mi-mdot-rp-cut-river-bridge-us2",
    "name": "Cut River Bridge Roadside Park",
    "lat": 46.046,
    "lng": -85.338,
    "facilityType": "Roadside Park",
    "address": "US-2, Mackinac County",
    "overnightParking": "Unknown",
    "seasonStatus": "Temporarily closed",
    "seasonNotes": "MDOT April 21, 2026 release listed this roadside park as closed until later in May due to snow. Verify current status before relying on the stop.",
    "amenities": "Roadside park / picnic stop; drinking water may not be available immediately after seasonal reopening. Verify current amenities on MDOT map.",
    "sourceUrl": "https://www.michigan.gov/mdot/news-outreach/pressreleases/2026/04/21/most-mdot-roadside-parks-reopening-april-28",
    "locationPrecision": "Approximate starter coordinate based on named highway/county; verify against MDOT ArcGIS before final production."
  }
];
  function copy(obj){
    var out={};
    Object.keys(obj||{}).forEach(function(k){ out[k]=obj[k]; });
    out.stateCode = out.stateCode || 'MI';
    out.stateName = out.stateName || 'Michigan';
    out.layer = out.layer || 'rest-truck';
    out.subtype = out.subtype || 'roadside-stop';
    out.siteForm = out.siteForm || 'traveler-facility';
    out.owner = out.owner || 'Michigan Department of Transportation';
    out.layerLabel = out.layerLabel || 'Rest Areas & Roadside Stops';
    out.cost = out.cost || 'Free traveler facility; not a campground.';
    out.costDisplay = out.costDisplay || 'Free traveler facility; not a campground.';
    out.costIsFree = true;
    out.access = out.access || 'Paved highway-access traveler facility; 2WD accessible. This is not a campground and overnight parking status must be checked separately.';
    out.showers = out.showers || 'No';
    out.website = out.website || out.sourceUrl || '';
    out.lastChecked = out.lastChecked || '2026-05-13';
    out.reviewSummary = out.reviewSummary || 'MDOT traveler facility reference. Not a campground. Overnight parking status is tracked separately from camping legality.';
    return out;
  }
  var records = rawRecords.map(copy).filter(function(record){
    return Number.isFinite(Number(record.lat)) && Number.isFinite(Number(record.lng));
  });
  window.CAMPING_STATIC_SITE_SUPPLEMENTS = window.CAMPING_STATIC_SITE_SUPPLEMENTS || {};
  window.CAMPING_STATIC_SITE_SUPPLEMENTS.MI_REST_ROADSIDE_V2308 = records;
  window.CAMPING_MI_REST_ROADSIDE_SUPPLEMENT = records;
  window.CAMPING_STATE_DATA = window.CAMPING_STATE_DATA || {};
  var stateRecords = window.CAMPING_STATE_DATA.MI = window.CAMPING_STATE_DATA.MI || [];
  var existingIds = new Set(stateRecords.map(function(site){ return site && site.id; }));
  records.forEach(function(record){
    if(record && !existingIds.has(record.id)){
      stateRecords.push(record);
      existingIds.add(record.id);
    }
  });
})();
