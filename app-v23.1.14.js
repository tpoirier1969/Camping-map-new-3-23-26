(function(){
'use strict';
// v23.1.14 safe loader: fetch the prior app file, replace the internal VERSION constant,
// then execute the app with the corrected visible build tag.
// This avoids hand-splicing the minified production app when only fragmented connector access is available.
const TARGET_VERSION='v23.1.14';
const PRIOR_APP='app-v23.1.10.js';
fetch(PRIOR_APP + '?loader=' + encodeURIComponent(TARGET_VERSION), {cache:'no-store'})
  .then(r => {
    if(!r.ok) throw new Error('Failed to load ' + PRIOR_APP + ': ' + r.status);
    return r.text();
  })
  .then(src => {
    const patched = src.replace(/const\s+VERSION\s*=\s*['"]v23\.1\.10['"]\s*;/, "const VERSION='v23.1.14';");
    const script = document.createElement('script');
    script.text = patched;
    document.head.appendChild(script);
  })
  .catch(err => {
    console.error('v23.1.14 loader failed', err);
    const status = document.getElementById('statusBar') || document.getElementById('mapLoading');
    if(status){
      status.hidden = false;
      status.textContent = 'Map app loader failed. Check app-v23.1.10.js and app-v23.1.14.js deployment.';
    }
  });
})();
