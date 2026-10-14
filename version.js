window.CAMPING_APP_VERSION = "v23.1.127";
window.CAMPING_APP_BUILD = "mi-official-campground-gis-integration";
window.CAMPING_DATA_VERSION = "v23.1.127";
window.CAMPING_DATA_BUILD = "mi-official-campground-gis-integration";
window.CAMPING_VERSION = "v23.1.127";
window.CAMPING_BUILD = {
  version: "v23.1.127",
  build: "mi-official-campground-gis-integration",
  dataVersion: "v23.1.127",
  dataBuild: "mi-official-campground-gis-integration",
  released: "2026-10-14",
  label: "Michigan official campground additions and Forest Lake closure"
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
