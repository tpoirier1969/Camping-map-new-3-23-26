(function(){
'use strict';
const VERSION='v23.1.14';
const PRIOR_APP='app-v23.1.10.js';
/*
  v23.1.14 app wrapper.
  Loads the v23.1.10 production app, patches its internal VERSION constant to v23.1.14,
  then executes it. This keeps the production app intact while moving the visible build tag forward.
*/
fetch(PRIOR_APP + '?v=' + encodeURIComponent(VERSION), {cache:'no-store'})
  .then(function(response){
    if(!response.ok){ throw new Error('Failed to load ' + PRIOR_APP + ': ' + response.status); }
    return response.text();
  })
  .then(function(source){
    var patched = source.replace(/const\s+VERSION\s*=\s*['"]v23\.1\.10['"]\s*;/, "const VERSION='v23.1.14';");
    var script = document.createElement('script');
    script.text = patched;
    document.head.appendChild(script);
  })
  .catch(function(error){
    console.error('v23.1.14 loader failed', error);
    var target = document.getElementById('statusBar') || document.getElementById('mapLoading');
    if(target){
      target.hidden = false;
      target.textContent = 'Map app loader failed. Confirm app-v23.1.10.js and app-v23.1.14.js are deployed.';
    }
  });
})();
