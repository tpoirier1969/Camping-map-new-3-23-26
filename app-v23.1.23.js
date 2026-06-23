(function(){
  'use strict';
  if(window.CAMPING_LEGACY_APP_BRIDGE_LOADED) return;
  window.CAMPING_LEGACY_APP_BRIDGE_LOADED = true;
  var bust = String(Date.now());
  document.write('<script src="version.js?legacyBridge=' + bust + '"><\/script>');
  document.write('<script src="app.js?legacyBridge=' + bust + '"><\/script>');
})();
