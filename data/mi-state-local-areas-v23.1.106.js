(function(){
  'use strict';
  const existing=Array.isArray(window.CAMPING_AREA_OUTLINES)?window.CAMPING_AREA_OUTLINES:[];
  const records=[
  {
    "id": "mi-dnr-state-forest-land-v231106",
    "name": "Michigan State Forest Land",
    "stateCode": "MI",
    "category": "State forest dispersed-camping reference area",
    "campingLayer": "boondocking",
    "opportunityKind": "official-state-forest-land-overlay",
    "status": "available",
    "type": "arcgis-portal-discovery-viewport",
    "viewportManaged": true,
    "minZoom": 6,
    "tileDegrees": 2.5,
    "tileCacheLimit": 12,
    "maxAllowableOffset": 0.0018,
    "portalUrl": "https://midnr.maps.arcgis.com",
    "appItemId": "2c8a3ec72f3449258678c2a1c5de7e1f",
    "layerNameHints": [
      "state forest land",
      "state forest lands",
      "state forest ownership",
      "state owned forest land",
      "state-owned forest land",
      "dnr managed lands",
      "dnr land ownership",
      "state land ownership"
    ],
    "fallbackSearchTerms": [
      "state forest land",
      "state land ownership",
      "dnr managed lands",
      "surface ownership"
    ],
    "layerNameRejects": [
      "project boundary",
      "campground",
      "state park",
      "recreation area",
      "game area",
      "wildlife",
      "trail",
      "roads",
      "mineral"
    ],
    "minimumLayerScore": 70,
    "sourceName": "Michigan DNR — Map of state forests and campgrounds",
    "sourceUrl": "https://midnr.maps.arcgis.com/apps/webappviewer/index.html?id=2c8a3ec72f3449258678c2a1c5de7e1f",
    "rulesSourceUrl": "https://www.michigan.gov/dnr/things-to-do/camping-and-lodging/backpack",
    "boundaryRepresents": "Official Michigan DNR state-forest-land geometry resolved from the DNR state forest map and loaded only for the visible Michigan map area.",
    "exactCampingBoundary": false,
    "officialCampingLegality": "Michigan permits dispersed camping on qualifying state forest land when the location is more than one mile from a state forest campground, is not posted No Camping, and is not inside a state park, recreation area, state forest campground, or state game area. A camping registration card is required.",
    "caution": "State forest land reference only — not a campsite and not blanket permission to camp. Verify current DNR ownership, the one-mile campground separation, excluded land types, roads, closures, postings, fire restrictions, access, and registration-card requirements before staying.",
    "recommendedUse": "context-only",
    "rulesSummary": "Dispersed camping may be allowed on qualifying Michigan state forest land under DNR rules; the exact spot must still pass ownership, exclusion, distance, access, closure, and posting checks.",
    "rulesDetails": [
      "Camp more than one mile from a state forest campground.",
      "Do not use this overlay for state parks, recreation areas, state forest campgrounds, or state game areas.",
      "Do not camp where the land is posted No Camping.",
      "Post the required Michigan DNR camping registration card at the site.",
      "Confirm current ownership and legal vehicle access; the overlay does not prove a road is public, open, or passable."
    ],
    "style": {
      "color": "#365f45",
      "weight": 1.5,
      "opacity": 0.82,
      "fillColor": "#6c9276",
      "fillOpacity": 0.08,
      "dashArray": "7 5"
    },
    "suppressLabels": true
  },
  {
    "id": "mi-craig-lake-backcountry-area-v231106",
    "name": "Craig Lake State Park backcountry area",
    "stateCode": "MI",
    "category": "State park designated-backcountry context",
    "campingLayer": "boat-backpack",
    "opportunityKind": "official-designated-backcountry-area-outline",
    "status": "available",
    "type": "arcgis-portal-discovery-query",
    "portalUrl": "https://www.arcgis.com",
    "appItemId": "65fb1a70f0794cbfa25e0e0a250f9caf",
    "layerNameHints": [
      "project boundaries",
      "state park project boundaries",
      "park and recreation area boundaries",
      "state park boundaries"
    ],
    "layerNameRejects": [
      "forest project",
      "game area",
      "wildlife area"
    ],
    "targetNames": [
      "Craig Lake"
    ],
    "queryEnvelope": [
      -88.35,
      46.42,
      -87.92,
      46.72
    ],
    "sourceName": "Michigan DNR project boundaries and backcountry camping guidance",
    "sourceUrl": "https://experience.arcgis.com/experience/65fb1a70f0794cbfa25e0e0a250f9caf",
    "rulesSourceUrl": "https://www.michigan.gov/dnr/things-to-do/camping-and-lodging/backpack",
    "coverageStatus": "incomplete",
    "coverageNote": "Current map has a Craig Lake system/cluster marker and trailhead record, but not the designated backcountry campsites as individual site points.",
    "boundaryRepresents": "Official DNR park project-boundary context for Craig Lake State Park. Project boundaries can include private parcels and are not campsite boundaries.",
    "exactCampingBoundary": false,
    "officialCampingLegality": "Craig Lake backcountry camping is limited to official designated/reservable sites. This area is shown because the individual designated sites are not yet fully mapped as separate points.",
    "caution": "Designated-site system only — not open dispersed camping. The outline may include private land or noncamping portions. Use only official designated sites and verify reservations, access type, current closures, fire rules, and park instructions.",
    "recommendedUse": "context-until-sites-complete",
    "rulesDetails": [
      "Use official designated or reservable backcountry campsites only.",
      "Do not treat the park/project boundary as permission to camp anywhere inside it.",
      "Remove or suppress this area after the designated campsite set is completely mapped as individual points."
    ],
    "style": {
      "color": "#55724e",
      "weight": 2,
      "opacity": 0.9,
      "fillColor": "#91a887",
      "fillOpacity": 0.09,
      "dashArray": "6 4"
    }
  },
  {
    "id": "mi-porkies-backcountry-area-v231106",
    "name": "Porcupine Mountains Wilderness State Park backcountry area",
    "stateCode": "MI",
    "category": "State park designated-backcountry context",
    "campingLayer": "boat-backpack",
    "opportunityKind": "official-designated-backcountry-area-outline",
    "status": "available",
    "type": "arcgis-portal-discovery-query",
    "portalUrl": "https://www.arcgis.com",
    "appItemId": "65fb1a70f0794cbfa25e0e0a250f9caf",
    "layerNameHints": [
      "project boundaries",
      "state park project boundaries",
      "park and recreation area boundaries",
      "state park boundaries"
    ],
    "layerNameRejects": [
      "forest project",
      "game area",
      "wildlife area"
    ],
    "targetNames": [
      "Porcupine Mountains",
      "Porcupine Mtns",
      "Porcupine Mtn",
      "Porkies"
    ],
    "queryEnvelope": [
      -90.12,
      46.55,
      -89.2,
      47.08
    ],
    "queryAllInEnvelope": true,
    "allowSingleFeatureFallback": true,
    "sourceName": "Michigan DNR project boundaries and backcountry camping guidance",
    "sourceUrl": "https://experience.arcgis.com/experience/65fb1a70f0794cbfa25e0e0a250f9caf",
    "rulesSourceUrl": "https://www.michigan.gov/dnr/things-to-do/camping-and-lodging/backpack",
    "coverageStatus": "incomplete",
    "coverageNote": "Current map has developed Porcupine Mountains campground records but not a complete individual backcountry campsite set.",
    "boundaryRepresents": "Official DNR park project-boundary context for Porcupine Mountains Wilderness State Park. Project boundaries can include private parcels and are not campsite boundaries.",
    "exactCampingBoundary": false,
    "officialCampingLegality": "Backcountry camping is limited to official designated/reservable sites and facilities. This area is shown because the individual backcountry site system is not yet fully mapped.",
    "caution": "Designated-site system only — not open dispersed camping. Verify reservations, permits, access, bear/food-storage rules, current closures, fire restrictions, and official site locations.",
    "recommendedUse": "context-until-sites-complete",
    "rulesDetails": [
      "Use official designated/reservable backcountry campsites, cabins, or yurts only as current park rules allow.",
      "Do not treat the park/project boundary as permission to camp anywhere inside it.",
      "Suppress this area after the designated backcountry system is completely represented by individual map records."
    ],
    "style": {
      "color": "#55724e",
      "weight": 2,
      "opacity": 0.9,
      "fillColor": "#91a887",
      "fillOpacity": 0.09,
      "dashArray": "6 4"
    }
  },
  {
    "id": "mi-tahquamenon-backcountry-area-v231106",
    "name": "Tahquamenon Falls State Park backcountry area",
    "stateCode": "MI",
    "category": "State park designated-backcountry context",
    "campingLayer": "boat-backpack",
    "opportunityKind": "official-designated-backcountry-area-outline",
    "status": "available",
    "type": "arcgis-portal-discovery-query",
    "portalUrl": "https://www.arcgis.com",
    "appItemId": "65fb1a70f0794cbfa25e0e0a250f9caf",
    "layerNameHints": [
      "project boundaries",
      "state park project boundaries",
      "park and recreation area boundaries",
      "state park boundaries"
    ],
    "layerNameRejects": [
      "forest project",
      "game area",
      "wildlife area"
    ],
    "targetNames": [
      "Tahquamenon Falls"
    ],
    "queryEnvelope": [
      -85.55,
      46.43,
      -84.92,
      46.74
    ],
    "sourceName": "Michigan DNR project boundaries and backcountry camping guidance",
    "sourceUrl": "https://experience.arcgis.com/experience/65fb1a70f0794cbfa25e0e0a250f9caf",
    "rulesSourceUrl": "https://www.michigan.gov/dnr/things-to-do/camping-and-lodging/backpack",
    "coverageStatus": "incomplete",
    "coverageNote": "Current map has developed Tahquamenon campground records but not the designated backcountry campsites as a complete individual set.",
    "boundaryRepresents": "Official DNR park project-boundary context for Tahquamenon Falls State Park. Project boundaries can include private parcels and are not campsite boundaries.",
    "exactCampingBoundary": false,
    "officialCampingLegality": "Backcountry camping is limited to official designated/reservable sites. This area is shown because the individual designated backcountry sites are not yet fully mapped.",
    "caution": "Designated-site system only — not open dispersed camping. Verify official site locations, reservations, trail access, closures, fire rules, and current park instructions.",
    "recommendedUse": "context-until-sites-complete",
    "rulesDetails": [
      "Use only official designated/reservable backcountry sites.",
      "Do not treat the park/project boundary as permission to camp anywhere inside it.",
      "Suppress this area after the designated backcountry campsite set is completely mapped."
    ],
    "style": {
      "color": "#55724e",
      "weight": 2,
      "opacity": 0.9,
      "fillColor": "#91a887",
      "fillOpacity": 0.09,
      "dashArray": "6 4"
    }
  },
  {
    "id": "mi-wilderness-state-park-backcountry-area-v231106",
    "name": "Wilderness State Park backcountry area",
    "stateCode": "MI",
    "category": "State park designated-backcountry context",
    "campingLayer": "boat-backpack",
    "opportunityKind": "official-designated-backcountry-area-outline",
    "status": "available",
    "type": "arcgis-portal-discovery-query",
    "portalUrl": "https://www.arcgis.com",
    "appItemId": "65fb1a70f0794cbfa25e0e0a250f9caf",
    "layerNameHints": [
      "project boundaries",
      "state park project boundaries",
      "park and recreation area boundaries",
      "state park boundaries"
    ],
    "layerNameRejects": [
      "forest project",
      "game area",
      "wildlife area"
    ],
    "targetNames": [
      "Wilderness State Park",
      "Wilderness"
    ],
    "queryEnvelope": [
      -85.18,
      45.62,
      -84.7,
      45.9
    ],
    "sourceName": "Michigan DNR project boundaries and backcountry camping guidance",
    "sourceUrl": "https://experience.arcgis.com/experience/65fb1a70f0794cbfa25e0e0a250f9caf",
    "rulesSourceUrl": "https://www.michigan.gov/dnr/things-to-do/camping-and-lodging/backpack",
    "coverageStatus": "incomplete",
    "coverageNote": "Current map has developed Wilderness State Park campground records but not a complete set of individual designated backcountry campsite points.",
    "boundaryRepresents": "Official DNR park project-boundary context for Wilderness State Park. Project boundaries can include private parcels and are not campsite boundaries.",
    "exactCampingBoundary": false,
    "officialCampingLegality": "Backcountry camping is limited to official designated/reservable sites. This area is shown because the individual designated backcountry sites are not yet fully mapped.",
    "caution": "Designated-site system only — not open dispersed camping. Verify official site locations, reservations, access, current closures, fire rules, and park instructions.",
    "recommendedUse": "context-until-sites-complete",
    "rulesDetails": [
      "Use only official designated/reservable backcountry sites.",
      "Do not treat the park/project boundary as permission to camp anywhere inside it.",
      "Suppress this area after the designated backcountry campsite set is completely mapped."
    ],
    "style": {
      "color": "#55724e",
      "weight": 2,
      "opacity": 0.9,
      "fillColor": "#91a887",
      "fillOpacity": 0.09,
      "dashArray": "6 4"
    }
  }
];
  window.CAMPING_AREA_OUTLINES=existing.concat(records);
  window.MI_BACKCOUNTRY_AREA_COVERAGE_V231106={
    craigLake:{status:'incomplete',individualSitePoints:0,representation:'system/cluster marker only'},
    porcupineMountains:{status:'incomplete',individualSitePoints:0,representation:'developed campground records only'},
    tahquamenonFalls:{status:'incomplete',individualSitePoints:0,representation:'developed campground records only'},
    wildernessStatePark:{status:'incomplete',individualSitePoints:0,representation:'developed campground records only'}
  };
})();
