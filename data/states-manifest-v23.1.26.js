(function(){
  'use strict';
  if(window.CAMPING_LEGACY_MANIFEST_BRIDGE_LOADED) return;
  window.CAMPING_LEGACY_MANIFEST_BRIDGE_LOADED = true;
  document.write('<script src="data/states-manifest.js?legacyBridge=' + Date.now() + '"><\/script>');
})();
