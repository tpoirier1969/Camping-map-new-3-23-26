window.CAMPING_STATES_MANIFEST = {
  "AL": {
    "code": "AL",
    "name": "Alabama",
    "file": "data/states/AL.js",
    "count": 2
  },
  "AR": {
    "code": "AR",
    "name": "Arkansas",
    "file": "data/states/AR.js",
    "count": 93,
    "files": [
      "data/states/AR.js",
      "data/supplements/modern-audit-cleanup-v23.1.21.js",
      "data/supplements/ar-tn-weakstate-rescue-v23.1.74.js",
      "data/supplements/ar-tn-cleanup-coordinate-rescue-v23.1.75.js"
    ],
    "dynamicSources": [
      "v23.1.21: Modern criteria audit cleanup supplement applied; moves proven non-Modern rows out of Modern and sends unproven rows to Needs Verification.",
      "v23.1.74: Arkansas/Tennessee weak-state rescue adds source-backed Buffalo/Ozark/Ouachita/USACE/USFS/NPS/TWRA campground and camping-area records; coordinate-blocked LBL/TVA/USACE/state-park/WMA/refuge systems remain in data/leads.js/data/rejected.js; UI cleanup removes public layer counts and fixes one-line state checkbox rows.",
      "v23.1.75: AR/TN cleanup coordinate-rescue adds exact-coordinate USACE/USFS/NPS/TRGT campground and primitive-site records; applies Erbie and Tennessee layer/model corrections; blocked GIS/RIDB/MVUM/state-park/refuge/private targets remain in data/leads.js/data/rejected.js instead of fake dots."
    ]
  },
  "AZ": {
    "code": "AZ",
    "name": "Arizona",
    "file": "data/states/AZ.js",
    "count": 10,
    "files": [
      "data/states/AZ.js",
      "data/supplements/modern-audit-cleanup-v23.1.21.js"
    ],
    "dynamicSources": [
      "v23.1.21: Modern criteria audit cleanup supplement applied; moves proven non-Modern rows out of Modern and sends unproven rows to Needs Verification."
    ]
  },
  "CA": {
    "code": "CA",
    "name": "California",
    "file": "data/states/CA.js",
    "count": 9,
    "files": [
      "data/states/CA.js",
      "data/supplements/modern-audit-cleanup-v23.1.21.js"
    ],
    "dynamicSources": [
      "v23.1.21: Modern criteria audit cleanup supplement applied; moves proven non-Modern rows out of Modern and sends unproven rows to Needs Verification."
    ]
  },
  "CO": {
    "code": "CO",
    "name": "Colorado",
    "file": "data/states/CO.js",
    "count": 37,
    "files": [
      "data/states/CO.js",
      "data/supplements/modern-audit-cleanup-v23.1.21.js"
    ],
    "dynamicSources": [
      "v23.1.21: Modern criteria audit cleanup supplement applied; moves proven non-Modern rows out of Modern and sends unproven rows to Needs Verification."
    ]
  },
  "DE": {
    "code": "DE",
    "name": "Delaware",
    "file": "data/states/DE.js",
    "count": 1
  },
  "FL": {
    "code": "FL",
    "name": "Florida",
    "file": "data/states/FL.js",
    "count": 1
  },
  "IA": {
    "code": "IA",
    "name": "Iowa",
    "file": "data/states/IA.js",
    "count": 108,
    "files": [
      "data/states/IA.js",
      "data/supplements/ia-bulldog-first-pass-v23.1.63.js",
      "data/supplements/ia-area-closeout-v23.1.64.js"
    ],
    "dynamicSources": [
      "v23.1.63: Iowa Bulldog first-pass build adds 57 active records from Workers 1–3 and appends durable Iowa leads/rejects; also applies 3 existing-record source/layer corrections.",
      "v23.1.64: Iowa area-closeout adds 35 active campground/camping-area records from the closeout workers; preserves USACE/state-forest/component rows as leads when exact coordinates were still blocked."
    ]
  },
  "IL": {
    "code": "IL",
    "name": "Illinois",
    "file": "data/states/IL.js",
    "count": 192,
    "files": [
      "data/states/IL.js",
      "data/supplements/il-bulldog-first-pass-v23.1.65.js",
      "data/supplements/oh-il-next-closeout-v23.1.66.js"
    ],
    "dynamicSources": [
      "v23.1.46: Illinois runtime data consolidated into data/states/IL.js. Active v23.1.41 Illinois cleanup supplement corrections/additions are now integrated into the owning state file. No Illinois supplement file is required for runtime loading after this cleanup. Final Illinois count remains 103.",
      "v23.1.65: Illinois Bulldog first-pass build adds 73 net active records from Workers 5–8 after duplicate QA, including USACE, county/forest-preserve, municipal, private/operator, and Shawnee NF records. Existing Illinois correction candidates and unresolved component rows remain in leads for the next research round.",
      "v23.1.66: OH/IL next-round closeout adds 16 net active records/camping-area markers and applies source-backed corrections where needed. Non-modern/component rows without honest coordinates remain in data/leads.js for GIS/official map extraction."
    ]
  },
  "IN": {
    "code": "IN",
    "name": "Indiana",
    "file": "data/states/IN.js",
    "count": 60,
    "files": [
      "data/states/IN.js",
      "data/supplements/in-ne-public-discovery-first-pass-v23.1.68.js",
      "data/supplements/in-ne-coordinate-rescue-closeout-v23.1.69.js"
    ],
    "dynamicSources": [
      "v23.1.68: IN/NE revised public-discovery first pass adds 38 active records/corrections for Indiana; coordinate-blocked discovered opportunities are preserved in data/leads.js for address/map/GIS/reservation rescue. Workers used public-discovery coverage controls and non-modern priority.",
      "v23.1.69: IN/NE coordinate-rescue closeout integrates accepted Indiana DNR/private/operator rows, adds Nebraska NGPC/NRD/USACE/city/private coordinate-rescue rows, and applies WMA/Niobrara/Lake McConaughy source/layer corrections. Coordinate-blocked components remain in data/leads.js."
    ]
  },
  "KS": {
    "code": "KS",
    "name": "Kansas",
    "file": "data/states/KS.js",
    "count": 56,
    "files": [
      "data/states/KS.js"
    ],
    "dynamicSources": [
      "v23.1.77: Kansas weak-state worker integration replaces two bad legacy Kansas rows with 38 source-backed active campground/camping-area records from Workers 5–8; blocked component systems remain in data/leads.js and official contradiction traps remain in data/rejected.js.",
      "v23.1.78: Kansas Worker 1/3 integration adds 18 active KDWP state-park and city/county/local-lake campground/camping-area records; Worker 2 Council Grove active rows were already present and de-duped. Additional KS leads/rejected guardrails and TN Worker 4 closure guardrails are integrated into data/leads.js and data/rejected.js; no new supplement files created."
    ]
  },
  "KY": {
    "code": "KY",
    "name": "Kentucky",
    "file": "data/states/KY.js",
    "count": 81,
    "files": [
      "data/states/KY.js",
      "data/supplements/mt-oh-ky-weakstate-rescue-v23.1.71.js",
      "data/supplements/mo-ky-oh-mt-coordinate-component-rescue-v23.1.73.js"
    ],
    "dynamicSources": [
      "v23.1.49: Kentucky runtime data consolidated into data/states/KY.js. Active v23.1.38 Kentucky State Parks coordinate-rescue supplement additions are now integrated into the owning state file. No Kentucky supplement file is required for runtime loading after this cleanup. Final Kentucky count remains 57.",
      "v23.1.36: Kentucky quick official exact batch 1 adds 51 records from official/operator proof returns: 19 Modern, 20 Rustic / Primitive, 8 Boat / Backpack, 2 Boondocking / Dispersed, and 2 Private Campgrounds. LBL, USACE/Recreation.gov, rest-area GIS, and coordinate-lacking leads are intentionally held for follow-up extraction.",
      "v23.1.38: Kentucky State Parks coordinate rescue added 6 official Modern Campgrounds from ReserveAmerica/Kentucky State Parks exact campground coordinates; these records are now folded into data/states/KY.js.",
      "v23.1.39: Kentucky area-outline context rescue adds two official fetchable area outline records: Daniel Boone NF administrative boundary context and Clifty Wilderness backcountry/wilderness context. No campsite-count changes; LBL ZIP/GIS, NPS corridor geometry, USACE facility geometry, and KYTC rest-area point extraction remain held for external GIS/API extraction.",
      "v23.1.71: MT/OH/KY weak-state rescue first wave adds accepted source-backed campground/camping-area rows and preserves coordinate-blocked USACE/ODNR/LBL/KDFWR/DBNF/private/operator/component opportunities as leads, not fake dots.",
      "v23.1.73: MO/KY/OH/MT coordinate/component rescue promotes safe Recreation.gov/USACE/KDFWR/ODNR/FWP/LBL-backed coordinates and area markers; coordinate-blocked GIS/RIDB/MDC/LBL/CMR/Fort Peck components remain in data/leads.js with no fake pins."
    ]
  },
  "LA": {
    "code": "LA",
    "name": "Louisiana",
    "file": "data/states/LA.js",
    "count": 3,
    "files": [
      "data/states/LA.js",
      "data/supplements/modern-audit-cleanup-v23.1.21.js"
    ],
    "dynamicSources": [
      "v23.1.21: Modern criteria audit cleanup supplement applied; moves proven non-Modern rows out of Modern and sends unproven rows to Needs Verification."
    ]
  },
  "ME": {
    "code": "ME",
    "name": "Maine",
    "file": "data/states/ME.js",
    "count": 6
  },
  "MI": {
    "code": "MI",
    "name": "Michigan",
    "file": "data/states/MI.js",
    "count": 663,
    "files": [
      "data/states/MI.js",
      "data/states/MI2.js",
      "data/supplements/mi-exact-rustic-primitive-v23.0.84.js",
      "data/supplements/modern-audit-cleanup-v23.1.21.js",
      "data/supplements/wi-mi-corridor-active-ui-v23.1.55.js",
      "data/supplements/wi-mi-closeout-cleanup-v23.1.56.js"
    ],
    "dynamicSources": [
      "v23.1.21: Modern criteria audit cleanup supplement applied; moves proven non-Modern rows out of Modern and sends unproven rows to Needs Verification.",
      "v23.1.55: WI/UP corridor worker reconciliation adds Camp 7 Lake Campground, Trap Hills Backpacking/Dispersed Area, Ottawa NF dispersed rule area marker, and Michigan DNR UP State Forest dispersed rule area marker; removes duplicate Bear Lake Dispersed row; corrects Bass Lake, Bear Lake, Sturgeon River, and Paint River Forks layer/coordinate details; net MI count +3.",
      "v23.1.56: WI/MI/UP combined closeout cleanup adds no new area pins; applies Worker 1/2 closeout QA corrections and memory updates. MI corrections move East Lake Campsites, Swan Lake Campsites, Lake Gogebic County Park, and Little Girls Point County Park to Rustic / Primitive where Modern proof is not met; adds closeout lead/rejected memory for official GPS extraction and the bad legacy Paint River Forks coordinate."
    ]
  },
  "MN": {
    "code": "MN",
    "name": "Minnesota",
    "file": "data/states/MN.js",
    "count": 321,
    "files": [
      "data/states/MN.js",
      "data/supplements/mn-finish-gap-cleanup-v23.1.57.js",
      "data/supplements/mn-western-closeout-v23.1.58.js",
      "data/supplements/mn-bulldog-missed-campgrounds-v23.1.60.js",
      "data/supplements/mn-worker23-super-audit-v23.1.61.js"
    ],
    "dynamicSources": [
      "v23.1.45: Minnesota runtime data consolidated into data/states/MN.js. Active Minnesota supplement data from v23.1.15 and v23.1.43, plus the 59 accepted v23.1.44 Minnesota large-add records, are now integrated into the owning state file. No Minnesota supplement files were required for runtime loading after that cleanup. Final Minnesota count was 148.",
      "v23.1.57: Minnesota geography-finish cleanup applies Workers 1–6 returns. Adds 12 clean official map-derived Metro/Southeast active campground/camping-system records; corrects Blue Mounds main campground, Lake Shetek Prairie Campground, Rice Creek, Riverway, and Jay Cooke legacy layer/QA rows; converts most western/southwest candidates without honest coordinates into durable leads instead of fake active pins.",
      "v23.1.58: Minnesota western closeout adds 30 supervisor-tightened active records from Worker 3, 5, and 6 returns.",
      "v23.1.60: Minnesota Bulldog missed-campground rescue adds 116 active records from 8 geography-locked Bulldog worker returns plus supervisor/user coordinate rescue. Uses the Bulldog address/map-coordinate standard and does not add fake centroids. Remaining unresolved rows remain in the worker-return backlog for later lead/rejected ledger integration.",
      "v23.1.61: Minnesota Worker 2/3 supervisor audit adds 16 additional active records after personal coordinate/source rescue from Bulldog Worker 2 and Worker 3 returns. Promotes source-proven state park, municipal, and private campground rows that were previously over-held as leads."
    ]
  },
  "MO": {
    "code": "MO",
    "name": "Missouri",
    "file": "data/states/MO.js",
    "count": 62,
    "files": [
      "data/states/MO.js",
      "data/supplements/sd-nd-mo-weakstate-rescue-v23.1.70.js",
      "data/supplements/mo-ky-oh-mt-coordinate-component-rescue-v23.1.73.js"
    ],
    "dynamicSources": [
      "v23.1.70: SD/ND/MO weak-state rescue first wave adds accepted official/operator campground and float-camp rows, preserves coordinate-blocked USACE/MDC/state-park/private/component opportunities as leads, and adds reject-memory guardrails for no-camping/day-use/proxy traps.",
      "v23.1.73: MO/KY/OH/MT coordinate/component rescue promotes safe Recreation.gov/USACE/KDFWR/ODNR/FWP/LBL-backed coordinates and area markers; coordinate-blocked GIS/RIDB/MDC/LBL/CMR/Fort Peck components remain in data/leads.js with no fake pins."
    ]
  },
  "MS": {
    "code": "MS",
    "name": "Mississippi",
    "file": "data/states/MS.js",
    "count": 4,
    "files": [
      "data/states/MS.js",
      "data/supplements/modern-audit-cleanup-v23.1.21.js"
    ],
    "dynamicSources": [
      "v23.1.21: Modern criteria audit cleanup supplement applied; moves proven non-Modern rows out of Modern and sends unproven rows to Needs Verification."
    ]
  },
  "MT": {
    "code": "MT",
    "name": "Montana",
    "file": "data/states/MT.js",
    "count": 219,
    "files": [
      "data/states/MT.js",
      "data/supplements/modern-audit-cleanup-v23.1.21.js",
      "data/supplements/mt-exact-build-batch1-v23.1.28.js",
      "data/supplements/mt-delta-exact-batch2-v23.1.35.js",
      "data/supplements/mt-historical-backfill-active-areas-v23.1.54.js",
      "data/supplements/mt-oh-ky-weakstate-rescue-v23.1.71.js",
      "data/supplements/mo-ky-oh-mt-coordinate-component-rescue-v23.1.73.js"
    ],
    "dynamicSources": [
      "v23.1.21: Modern criteria audit cleanup supplement applied; moves proven non-Modern rows out of Modern and sends unproven rows to Needs Verification.",
      "v23.1.28: Montana exact official-source build batch 1 adds 70 high-confidence campground/site records from the six-worker Montana proof pass; broad area/rule candidates and blocked extraction leads held for follow-up extraction passes.",
      "v23.1.35: Montana delta exact official-source batch 2 adds 95 records from worker proof/QA returns: 41 Rustic / Primitive and 54 Boat / Backpack. Smith River boat camps use official Montana FWP field-GPS coordinates; blocked Fort Peck/USACE, broad area/rule, and coordinate-lacking leads remain held out.",
      "v23.1.54: Historical leads/rejected backfill active checkpoint adds 9 Montana records via supplement: James Kipp Campground, Downstream Campground, West End Tent and Trailer Campground, and 6 approximate official Area/rule markers for Upper Missouri River Breaks, CMR NWR, UL Bend Wilderness, Chalk Buttes, Long Pines, and Ekalaka Hills. Area/rule markers are not exact campsites or legal boundaries.",
      "v23.1.71: MT/OH/KY weak-state rescue first wave adds accepted source-backed campground/camping-area rows and preserves coordinate-blocked USACE/ODNR/LBL/KDFWR/DBNF/private/operator/component opportunities as leads, not fake dots.",
      "v23.1.73: MO/KY/OH/MT coordinate/component rescue promotes safe Recreation.gov/USACE/KDFWR/ODNR/FWP/LBL-backed coordinates and area markers; coordinate-blocked GIS/RIDB/MDC/LBL/CMR/Fort Peck components remain in data/leads.js with no fake pins."
    ]
  },
  "ND": {
    "code": "ND",
    "name": "North Dakota",
    "file": "data/states/ND.js",
    "count": 64,
    "files": [
      "data/states/ND.js",
      "data/supplements/sd-nd-mo-weakstate-rescue-v23.1.70.js"
    ],
    "dynamicSources": [
      "v23.1.53: North Dakota final first-pass cleanup adds 24 records directly into data/states/ND.js: 13 official/operator campground or recreation-area records, 3 community-supported boondocking records, and 8 approximate Area/rule pins for national grasslands, NDGF WMA regions, and the Sheyenne River Water Trail corridor. Adds data/leads.js and data/rejected.js as project-memory files; no ND supplement file is created.",
      "v23.1.52: North Dakota first expansion cleanup folds 25 accepted supervisor-reconciled official/operator records directly into data/states/ND.js, updates Lindenwood to a source-backed Modern Campgrounds row, moves the broad Theodore Roosevelt NP legacy row to Info / Reference, and moves vague Campsite #2 to Needs Verification. No ND supplement file is created.",
      "v23.1.70: SD/ND/MO weak-state rescue first wave adds accepted official/operator campground and float-camp rows, preserves coordinate-blocked USACE/MDC/state-park/private/component opportunities as leads, and adds reject-memory guardrails for no-camping/day-use/proxy traps."
    ]
  },
  "NE": {
    "code": "NE",
    "name": "Nebraska",
    "file": "data/states/NE.js",
    "count": 84,
    "files": [
      "data/states/NE.js",
      "data/supplements/modern-audit-cleanup-v23.1.21.js",
      "data/supplements/in-ne-public-discovery-first-pass-v23.1.68.js",
      "data/supplements/in-ne-coordinate-rescue-closeout-v23.1.69.js"
    ],
    "dynamicSources": [
      "v23.1.21: Modern criteria audit cleanup supplement applied; moves proven non-Modern rows out of Modern and sends unproven rows to Needs Verification.",
      "v23.1.68: IN/NE revised public-discovery first pass adds 25 active records/corrections for Nebraska; coordinate-blocked discovered opportunities are preserved in data/leads.js for address/map/GIS/reservation rescue. Workers used public-discovery coverage controls and non-modern priority.",
      "v23.1.69: IN/NE coordinate-rescue closeout integrates accepted Nebraska NGPC/NRD/USACE/city/private rows and source/layer corrections; coordinate-blocked components, MVUM/WMA geometry, and unstable coordinates remain in data/leads.js."
    ]
  },
  "NH": {
    "code": "NH",
    "name": "New Hampshire",
    "file": "data/states/NH.js",
    "count": 1
  },
  "OH": {
    "code": "OH",
    "name": "Ohio",
    "file": "data/states/OH.js",
    "count": 108,
    "files": [
      "data/states/OH.js",
      "data/supplements/oh-bulldog-first-pass-v23.1.65.js",
      "data/supplements/oh-il-next-closeout-v23.1.66.js",
      "data/supplements/mt-oh-ky-weakstate-rescue-v23.1.71.js",
      "data/supplements/mo-ky-oh-mt-coordinate-component-rescue-v23.1.73.js"
    ],
    "dynamicSources": [
      "v23.1.65: Ohio Bulldog first-pass build adds 49 active records from Workers 1–4 and appends durable Ohio leads/rejects. Lead-heavy ODNR/state-park/component rows remain held for official map/GIS/reservation coordinate rescue instead of fake pins.",
      "v23.1.66: OH/IL next-round closeout adds 41 net active records/camping-area markers and applies source-backed corrections where needed. Non-modern/component rows without honest coordinates remain in data/leads.js for GIS/official map extraction.",
      "v23.1.71: MT/OH/KY weak-state rescue first wave adds accepted source-backed campground/camping-area rows and preserves coordinate-blocked USACE/ODNR/LBL/KDFWR/DBNF/private/operator/component opportunities as leads, not fake dots.",
      "v23.1.73: MO/KY/OH/MT coordinate/component rescue promotes safe Recreation.gov/USACE/KDFWR/ODNR/FWP/LBL-backed coordinates and area markers; coordinate-blocked GIS/RIDB/MDC/LBL/CMR/Fort Peck components remain in data/leads.js with no fake pins."
    ]
  },
  "PA": {
    "code": "PA",
    "name": "Pennsylvania",
    "file": "data/states/PA.js",
    "count": 139,
    "files": [
      "data/states/PA.js",
      "data/supplements/pa-area-closeout-v23.1.64.js"
    ],
    "dynamicSources": [
      "v23.1.62: Pennsylvania Bulldog first-pass build adds 108 active records from Workers 4–8 and appends durable PA leads/rejects from the worker ledger.",
      "v23.1.64: Pennsylvania area-closeout adds 31 active campground/area records from water/backpack, state-park component, and private/county/operator rescue; preserves DCNR state-forest ArcGIS extraction as leads, not fake forest centroids."
    ]
  },
  "SD": {
    "code": "SD",
    "name": "South Dakota",
    "file": "data/states/SD.js",
    "count": 114,
    "files": [
      "data/states/SD.js",
      "data/supplements/sd-nd-mo-weakstate-rescue-v23.1.70.js"
    ],
    "dynamicSources": [
      "v23.1.50: South Dakota expansion cleanup folds the active SD modern-audit effect into data/states/SD.js, removes the vague Dude Ranch stop-over row already removed at runtime by v23.1.21, updates three legacy rows with official proof, and adds 84 official-source / official-map-derived South Dakota records directly to the owning state file. No SD supplement file is required for runtime loading after this build.",
      "v23.1.51: South Dakota final deeper-dig merge adds 11 more official/operator/MVUM-supported records directly to data/states/SD.js: 4 Boondocking / Dispersed area markers, 1 Rustic primitive shoreline cluster, and 6 municipal/public campground records. Count increases from 91 to 102. No new supplement file is created.",
      "v23.1.70: SD/ND/MO weak-state rescue first wave adds accepted official/operator campground and float-camp rows, preserves coordinate-blocked USACE/MDC/state-park/private/component opportunities as leads, and adds reject-memory guardrails for no-camping/day-use/proxy traps."
    ]
  },
  "TN": {
    "code": "TN",
    "name": "Tennessee",
    "file": "data/states/TN.js",
    "count": 65,
    "files": [
      "data/states/TN.js",
      "data/supplements/ar-tn-weakstate-rescue-v23.1.74.js",
      "data/supplements/ar-tn-cleanup-coordinate-rescue-v23.1.75.js"
    ],
    "dynamicSources": [
      "v23.1.74: Arkansas/Tennessee weak-state rescue adds source-backed Buffalo/Ozark/Ouachita/USACE/USFS/NPS/TWRA campground and camping-area records; coordinate-blocked LBL/TVA/USACE/state-park/WMA/refuge systems remain in data/leads.js/data/rejected.js; UI cleanup removes public layer counts and fixes one-line state checkbox rows.",
      "v23.1.75: AR/TN cleanup coordinate-rescue adds exact-coordinate USACE/USFS/NPS/TRGT campground and primitive-site records; applies Erbie and Tennessee layer/model corrections; blocked GIS/RIDB/MVUM/state-park/refuge/private targets remain in data/leads.js/data/rejected.js instead of fake dots."
    ]
  },
  "TX": {
    "code": "TX",
    "name": "Texas",
    "file": "data/states/TX.js",
    "count": 1
  },
  "UT": {
    "code": "UT",
    "name": "Utah",
    "file": "data/states/UT.js",
    "count": 5,
    "files": [
      "data/states/UT.js",
      "data/supplements/modern-audit-cleanup-v23.1.21.js"
    ],
    "dynamicSources": [
      "v23.1.21: Modern criteria audit cleanup supplement applied; moves proven non-Modern rows out of Modern and sends unproven rows to Needs Verification."
    ]
  },
  "WI": {
    "code": "WI",
    "name": "Wisconsin",
    "file": "data/states/WI.js",
    "count": 621,
    "files": [
      "data/states/WI.js",
      "data/supplements/wi-mi-corridor-active-ui-v23.1.55.js",
      "data/supplements/wi-mi-closeout-cleanup-v23.1.56.js"
    ],
    "dynamicSources": [
      "v23.1.48: Wisconsin consolidation cleanup folds all active Wisconsin runtime supplements through v23.1.24 into data/states/WI.js. Final loaded Wisconsin count remains 621; historical supplement files are retired from active manifest loading.",
      "v23.1.55: WI/UP corridor worker reconciliation promotes/updates Florence County Forest camping rule marker to active Boondocking / Dispersed while retaining existing Oconto/Marinette/CNF area markers; no net WI count change. Adds supporting lead/rejected memory for Perch Lake, Marinette park coordinate rescue, CNF/MVUM geometry, and wrong-feature traps.",
      "v23.1.56: WI/MI/UP combined closeout cleanup adds no new area pins; applies Worker 1/2 closeout QA corrections and memory updates. MI corrections move East Lake Campsites, Swan Lake Campsites, Lake Gogebic County Park, and Little Girls Point County Park to Rustic / Primitive where Modern proof is not met; adds closeout lead/rejected memory for official GPS extraction and the bad legacy Paint River Forks coordinate."
    ]
  },
  "WY": {
    "code": "WY",
    "name": "Wyoming",
    "file": "data/states/WY.js",
    "count": 17,
    "files": [
      "data/states/WY.js",
      "data/supplements/modern-audit-cleanup-v23.1.21.js"
    ],
    "dynamicSources": [
      "v23.1.21: Modern criteria audit cleanup supplement applied; moves proven non-Modern rows out of Modern and sends unproven rows to Needs Verification."
    ]
  }
};
