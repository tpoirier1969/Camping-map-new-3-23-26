window.CAMPING_APP_VERSION = "v23.1.128";
window.CAMPING_APP_BUILD = "mi-county-rescue-and-pending-layer";
window.CAMPING_DATA_VERSION = "v23.1.128";
window.CAMPING_DATA_BUILD = "mi-county-rescue-and-pending-layer";
window.CAMPING_VERSION = "v23.1.128";
window.CAMPING_BUILD = {
  version: "v23.1.128",
  build: "mi-county-rescue-and-pending-layer",
  dataVersion: "v23.1.128",
  dataBuild: "mi-county-rescue-and-pending-layer",
  released: "2026-10-14",
  label: "Michigan county campground rescue and Needs Verification layer repair"
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
