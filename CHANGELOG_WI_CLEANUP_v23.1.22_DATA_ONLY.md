# Wisconsin cleanup/correction data revision

Package name: `WI_cleanup_corrections_data_fixed_files.zip`

Baseline source: repo-live via GitHub connector, default branch `main`.

Important note: this is a data/manifest fixed-files package only. It does not update `app-v23.1.21.js`, `index.html`, or `version.json`, so it does not claim a visible app-version bump. The app remains `v23.1.21` while the manifest/supplement correction file is labeled `v23.1.22` for data-audit traceability.

## Changed files

- `data/states-manifest-v23.1.18.js`
- `data/supplements/wi-cleanup-corrections-v23.1.22.js`

## Intentionally not changed

- `app-v23.1.21.js`
- `index.html`
- `version.json`
- `config.js`
- `data/states/WI.js`

## Changelog

- Adds `data/supplements/wi-cleanup-corrections-v23.1.22.js` to the Wisconsin manifest load chain.
- Updates Wisconsin manifest count from `610` to `595`.
- Removes stale active Black Lake baseline duplicate `s94` when it is the old Black Lake Recreation Area row.
- Keeps/enriches the official Black Lake CNF row `wi-cnf-black-lake-recreation-area-v23117` with official USFS coordinate `45.98399, -90.93476`.
- Enriches Bear Lake Recreation Area `s59` with official USFS source/status/coordinate `45.513166, -88.530101`.
- Enriches Lost Lake Recreation Area `s566` with official USFS source/status/coordinate `45.883571, -88.558474`.
- Tightens county forest rule-area wording for Marinette, Florence, Price, and Rusk without adding new pins.
- Preserves rejected/non-add decisions for Lake Three, North Twin, Mineral Lake, Sevenmile, Kathryn Lake, and Lost Lake Cabins by not importing them.
- Does not include external-access blocked items such as Big Falls, Florence horse trailheads, Black River East Fork/Pigeon Creek/backpack rule area, NHAL 88 stopover sites, or NHAL backcountry rule area.

## Expected count behavior

Worker 1 found the active Wisconsin runtime count was `596` after duplicate guards, while the manifest reported `610`. This package removes the stale Black Lake active duplicate, so expected Wisconsin active count after this data cleanup is `595`.

## QA performed here

- `node --check` passed for `data/states-manifest-v23.1.18.js`.
- `node --check` passed for `data/supplements/wi-cleanup-corrections-v23.1.22.js`.
- Confirmed no `config.js` change is included.
- Confirmed no new campsite pins are added by the cleanup supplement.

## Remaining blockers

A full visible app-version bump would require a complete app file replacement. The repo connector allowed safe file inspection and packaging of these data files, but the working container could not clone GitHub directly. To avoid split version identity, this package intentionally does not change app/index/version identity.
