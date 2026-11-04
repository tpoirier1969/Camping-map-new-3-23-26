window.CAMPING_APP_VERSION = "v23.1.170";
window.CAMPING_APP_BUILD = "mi-alger-h13-ewing-hovey-source-audit";
window.CAMPING_DATA_VERSION = "v23.1.170";
window.CAMPING_DATA_BUILD = "mi-alger-h13-ewing-hovey-source-audit";
window.CAMPING_VERSION = "v23.1.170";
window.CAMPING_BUILD = {
  version: "v23.1.170",
  build: "mi-alger-h13-ewing-hovey-source-audit",
  dataVersion: "v23.1.170",
  dataBuild: "mi-alger-h13-ewing-hovey-source-audit",
  released: "2026-11-04",
  label: "Alger H-13 Ewing hike-in and Hovey exact-pin source QA"
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
