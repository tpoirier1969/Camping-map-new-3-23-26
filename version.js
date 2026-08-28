window.CAMPING_APP_VERSION = "v23.1.126";
window.CAMPING_APP_BUILD = "mobile-layer-toggle-and-version-refresh";
window.CAMPING_DATA_VERSION = "v23.1.126";
window.CAMPING_DATA_BUILD = "mobile-layer-toggle-and-version-refresh";
window.CAMPING_VERSION = "v23.1.126";
window.CAMPING_BUILD = {
  version: "v23.1.126",
  build: "mobile-layer-toggle-and-version-refresh",
  dataVersion: "v23.1.126",
  dataBuild: "mobile-layer-toggle-and-version-refresh",
  released: "2026-08-27",
  label: "Mobile layer-toggle repair and automatic version refresh check"
};
window.APP_VERSION = window.CAMPING_APP_VERSION;
window.DATA_BUILD = window.CAMPING_DATA_BUILD;
(function(){
  try{
    var s=document.createElement('script');
    s.src='ui-hotfix-v23.1.126.js?build='+encodeURIComponent(window.CAMPING_APP_VERSION)+'&ts='+Date.now();
    s.async=true;
    document.head.appendChild(s);
  }catch(_e){}
})();
