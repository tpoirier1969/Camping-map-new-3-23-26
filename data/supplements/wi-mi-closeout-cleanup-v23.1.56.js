// Tod's Boondocking & Camping Maps — WI/MI/UP closeout cleanup v23.1.56
// Reconstructed compatibility file for the manifest-referenced v23.1.56 runtime corrections.
// The current package contained the v23.1.56 build notes and manifest references, but not this file.
// Scope from BUILD-NOTES-v23.1.56.txt: no new active records; four MI active records are corrected to Rustic / Primitive.
(function(){
  'use strict';
  const VERSION = 'v23.1.56';
  const FILE = 'data/supplements/wi-mi-closeout-cleanup-v23.1.56.js';
  const CORRECTIONS = {
    MI: {
      s269: 'East Lake Campsites — corrected to Rustic / Primitive from v23.1.56 WI/MI/UP closeout cleanup notes.',
      s1073: 'Swan Lake Campsites — corrected to Rustic / Primitive from v23.1.56 WI/MI/UP closeout cleanup notes.',
      s497: 'Lake Gogebic County Park — corrected to Rustic / Primitive because Modern proof was not met by available official/operator evidence.',
      s545: 'Little Girls Point County Park — corrected to Rustic / Primitive based on county rustic/vault-restroom proof.'
    }
  };
  function clean(v){return String(v == null ? '' : v).trim().toLowerCase();}
  function patchSite(site, reason){
    Object.assign(site, {
      layer: 'rustic',
      subtype: 'rustic / primitive',
      rawCategory: 'rustic / primitive',
      categoryLabel: 'Rustic / Primitive',
      layerLabel: 'Rustic / Primitive',
      facilityType: site.facilityType || 'Rustic / Primitive Campground',
      markerType: 'rustic-primitive-campground',
      showers: site.showers || 'No Modern shower/bathhouse proof in v23.1.56 closeout notes.',
      reviewSummary: reason,
      popupNote: (site.popupNote ? site.popupNote + ' ' : '') + 'v23.1.56 closeout cleanup: layer corrected to Rustic / Primitive; verify current amenities, fees, rules, and access before staying.',
      verificationStatus: site.verificationStatus || 'verified-legal-layer-corrected-v23.1.56',
      dataCorrectionFile: FILE,
      dataCorrectionVersion: VERSION,
      dataCorrectionDate: '2026-06-29'
    });
  }
  function applyAll(){
    window.CAMPING_STATE_DATA = window.CAMPING_STATE_DATA || {};
    Object.keys(CORRECTIONS).forEach(stateCode => {
      const list = window.CAMPING_STATE_DATA[stateCode];
      if(!Array.isArray(list))return;
      const rows = CORRECTIONS[stateCode];
      Object.keys(rows).forEach(id => {
        const site = list.find(s => clean(s && s.id) === clean(id));
        if(site)patchSite(site, rows[id]);
      });
    });
  }
  applyAll();
})();
