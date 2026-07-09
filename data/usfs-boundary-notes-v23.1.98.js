// Boondocking & Camping Maps USFS boundary overlay notes v23.1.98
// Clickable notes for USDA Forest Service administrative boundary reference overlay.
// Administrative boundaries are not campsite, ownership, vehicle-access, or camping-permission proof.
window.USFS_BOUNDARY_NOTES = Object.assign(window.USFS_BOUNDARY_NOTES || {}, {
  generic: {
    status: 'generic',
    sourceUrl: 'https://apps.fs.usda.gov/arcx/rest/services/EDW/EDW_ForestSystemBoundaries_01/MapServer/0',
    summary: 'This is a USDA Forest Service administrative boundary for orientation and planning. It is not campsite, ownership, vehicle-access, or camping-permission proof.',
    restrictions: [
      'This boundary may include private inholdings and other non-USFS lands.',
      'Do not assume dispersed camping is legal from the outline alone.'
    ]
  },
  'HURON MANISTEE NATIONAL FORESTS': {
    status: 'ready',
    sourceUrl: 'https://www.fs.usda.gov/r09/huron-manistee/recreation/camping-cabins',
    summary: 'Dispersed camping is generally allowed on Huron-Manistee National Forest lands unless posted closed, but this boundary is not ownership proof.',
    restrictions: [
      'Verify land status, road access, water setbacks, river-corridor rules, and current forest orders before camping.',
      'Special river corridors and designated sites may have permit, reservation, or area-specific rules.'
    ]
  },
  'CHEQUAMEGON NICOLET NATIONAL FOREST': {
    status: 'ready',
    sourceUrl: 'https://www.fs.usda.gov/r09/chequamegon-nicolet/recreation/camping-cabins',
    summary: 'Dispersed camping is broadly available on Chequamegon-Nicolet National Forest lands where current land status, distance rules, stay limits, MVUM access, and current orders allow it.',
    restrictions: [
      'Confirm current distance rules from roads, trails, developed campgrounds, and developed recreation sites.',
      'Verify stay limits, fire restrictions, MVUM/open-road access, and current forest orders.'
    ]
  },
  'SUPERIOR NATIONAL FOREST': {
    status: 'ready',
    sourceUrl: 'https://www.fs.usda.gov/r09/superior/recreation/camping-cabins',
    summary: 'Superior National Forest includes dispersed and backcountry camping opportunities, but BWCAW, closures, fire rules, stay limits, and access rules can change what is legal at a specific spot.',
    restrictions: [
      'BWCAW has separate permit rules and travel restrictions.',
      'Verify stay limits, fire restrictions, and current alerts before camping.'
    ]
  },
  'SHAWNEE NATIONAL FOREST': {
    status: 'ready',
    sourceUrl: 'https://www.fs.usda.gov/r09/shawnee/recreation/camping-cabins',
    summary: 'Primitive camping is generally available on Shawnee National Forest land outside developed areas, but this outline is not ownership proof.',
    restrictions: [
      'Verify private inholdings, distance rules, access, closures, and fire restrictions.',
      'Stay outside developed recreation areas and follow current Shawnee National Forest primitive camping rules.'
    ]
  },
  'DANIEL BOONE NATIONAL FOREST': {
    status: 'ready',
    sourceUrl: 'https://www.fs.usda.gov/r08/danielboone/recreation/camping-cabins',
    summary: 'Dispersed camping exists on Daniel Boone National Forest, but Red River Gorge and other special areas have extra rules.',
    restrictions: [
      'Verify land ownership, pass requirements, closures, and legal access before camping.',
      'Red River Gorge backcountry/vehicle rules may differ from broader forest rules.'
    ]
  },
  'MARK TWAIN NATIONAL FOREST': {
    status: 'ready',
    sourceUrl: 'https://www.fs.usda.gov/r09/marktwain/recreation/camping-cabins',
    summary: 'Mark Twain National Forest allows dispersed camping on forest land outside designated campgrounds, but exact spot legality still must be verified.',
    restrictions: [
      'Verify ownership, road access, distance rules, sanitation rules, closures, and fire restrictions.',
      'Expect no toilets, trash, potable water, or fire grates at dispersed sites.'
    ]
  },
  'HOOSIER NATIONAL FOREST': {
    status: 'ready',
    sourceUrl: 'https://www.fs.usda.gov/r09/hoosier/recreation/dispersed-camping',
    summary: 'Dispersed camping is broadly allowed on Hoosier National Forest lands away from developed areas, with access and setback restrictions.',
    restrictions: [
      'Use the 200-foot setback rules from trails, trailheads, roads, water, rock shelters, caves, and historic structures unless a designated site rule applies.',
      'Deam Wilderness and Monroe Lake shoreline areas can have special restrictions.'
    ]
  },
  'BLACK HILLS NATIONAL FOREST': {
    status: 'ready',
    sourceUrl: 'https://www.fs.usda.gov/r02/blackhills/recreation/dispersed-camping',
    summary: 'Black Hills National Forest dispersed camping depends heavily on MVUM-designated routes and areas.',
    restrictions: [
      'Verify the MVUM route symbol before motorized dispersed camping.',
      'Check stream setbacks, distance from developed recreation sites, stay limits, fire restrictions, and current postings.'
    ]
  },
  'CUSTER GALLATIN NATIONAL FOREST': {
    status: 'ready',
    sourceUrl: 'https://www.fs.usda.gov/r01/custergallatin/recreation/camping-cabins',
    summary: 'Custer Gallatin National Forest camping rules vary by district and area. Use MVUM, food-storage orders, and local closure/designated-site rules before relying on a dispersed spot.',
    restrictions: [
      'Check whether the area is designated-site-only or subject to route-distance restrictions.',
      'Verify bear/food-storage orders, current area orders, seasonal access, and fire restrictions.'
    ]
  },
  'FLATHEAD NATIONAL FOREST': {
    status: 'ready',
    sourceUrl: 'https://www.fs.usda.gov/r01/flathead/recreation/camping-cabins',
    summary: 'Flathead National Forest generally allows dispersed camping, but food-storage orders, stay limits, developed-site setbacks, MVUM access, and local closure orders control the actual spot.',
    restrictions: [
      'Verify food-storage orders and local closures before camping.',
      'Check developed recreation site setbacks, stay limits, MVUM access, and road conditions.'
    ]
  },
  'WHITE RIVER NATIONAL FOREST': {
    status: 'ready',
    sourceUrl: 'https://www.fs.usda.gov/r02/whiteriver/recreation/camping-cabins',
    summary: 'White River National Forest has dispersed camping, but many high-use areas have designated-site, stay-limit, waste, and access rules.',
    restrictions: [
      'Check the exact district/area before camping.',
      'Verify local orders, designated-site transitions, fire restrictions, human-waste rules, and MVUM access.'
    ]
  },
  'RIO GRANDE NATIONAL FOREST': {
    status: 'ready',
    sourceUrl: 'https://www.fs.usda.gov/r02/riogrande/recreation/dispersed-camping',
    summary: 'Rio Grande National Forest dispersed camping is undeveloped and access depends on MVUM/open routes, suitable existing sites, stay limits, closures, and fire restrictions.',
    restrictions: [
      'Use MVUM/open-route rules before driving to any dispersed site.',
      'Verify stay limits, fire restrictions, closures, and suitability of existing sites.'
    ]
  },
  'INYO NATIONAL FOREST': {
    status: 'ready',
    sourceUrl: 'https://www.fs.usda.gov/r05/inyo/recreation/camping-cabins',
    summary: 'Inyo National Forest dispersed camping requires checking current fire restrictions, campfire permit rules, no-camping maps, wilderness setbacks, and legal vehicle access.',
    restrictions: [
      'Check California campfire permit and fire restriction requirements.',
      'Verify designated/no-camping maps, wilderness setbacks, seasonal closures, and open-road access.'
    ]
  },
  'OUACHITA NATIONAL FOREST': {
    status: 'ready',
    sourceUrl: 'https://www.fs.usda.gov/r08/ouachita/recreation/camping-cabins',
    summary: 'Ouachita National Forest allows dispersed camping under specific stay and move rules, but the boundary is not site proof.',
    restrictions: [
      'Verify ownership, access, closures, fire rules, and the exact camping location.',
      'Follow current stay limits and move-distance rules.'
    ]
  },
  'OZARK ST FRANCIS NATIONAL FORESTS': {
    status: 'ready',
    sourceUrl: 'https://www.fs.usda.gov/r08/ozark-stfrancis/recreation/camping-cabins',
    summary: 'Ozark-St. Francis National Forest dispersed camping is allowed under stay, distance, private-land, MVUM, and fire-rule limits.',
    restrictions: [
      'Verify exact land status because private land exists inside broader forest boundaries.',
      'Check water/developed-site/trailhead setbacks, MVUM/open-route rules, stay limits, and fire restrictions.'
    ]
  }
});
(function(notes){
  function alias(from,to){ if(notes[to] && !notes[from]) notes[from]=notes[to]; }
  alias('HURON MANISTEE NATIONAL FOREST','HURON MANISTEE NATIONAL FORESTS');
  alias('CHEQUAMEGON NICOLET NF','CHEQUAMEGON NICOLET NATIONAL FOREST');
  alias('CHEQUAMEGON NICOLET','CHEQUAMEGON NICOLET NATIONAL FOREST');
  alias('SUPERIOR NF','SUPERIOR NATIONAL FOREST');
  alias('SHAWNEE NF','SHAWNEE NATIONAL FOREST');
  alias('DANIEL BOONE NF','DANIEL BOONE NATIONAL FOREST');
  alias('MARK TWAIN NF','MARK TWAIN NATIONAL FOREST');
  alias('HOOSIER NF','HOOSIER NATIONAL FOREST');
  alias('BLACK HILLS NF','BLACK HILLS NATIONAL FOREST');
  alias('CUSTER GALLATIN NF','CUSTER GALLATIN NATIONAL FOREST');
  alias('FLATHEAD NF','FLATHEAD NATIONAL FOREST');
  alias('WHITE RIVER NF','WHITE RIVER NATIONAL FOREST');
  alias('RIO GRANDE NF','RIO GRANDE NATIONAL FOREST');
  alias('INYO NF','INYO NATIONAL FOREST');
  alias('OUACHITA NF','OUACHITA NATIONAL FOREST');
  alias('OZARK ST FRANCIS NATIONAL FOREST','OZARK ST FRANCIS NATIONAL FORESTS');
  alias('OZARK SAINT FRANCIS NATIONAL FORESTS','OZARK ST FRANCIS NATIONAL FORESTS');
  alias('OZARK ST FRANCIS NF','OZARK ST FRANCIS NATIONAL FORESTS');
})(window.USFS_BOUNDARY_NOTES);
