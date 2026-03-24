Camping Map v21.1.0

This rebuild restores the agreed layer model:
- Federal campgrounds: modern / rustic
- State campgrounds: modern / rustic
- Local campgrounds: modern / rustic
- Private campgrounds: modern / rustic
- Boondocking / dispersed: rustic only
- Broad dispersed opportunity areas: outline layer scaffold restored

Data organization:
- One JS data file per state under data/states/
- Select all / Deselect all controls for state visibility

Targeted data cleanup applied in this rebuild:
- L'Anse Township park duplicate merged down to one local campground entry
- Van Riper duplicates collapsed to the official campground entry

Note:
- The inherited source file for opportunity-area polygons contained zero features, so the layer is present but currently empty until verified outlines are added.
