window.CAMPING_APP_VERSION = "v23.1.164";
window.CAMPING_APP_BUILD = "mi-alger-bay-furnace-usfs-rustic-correction";
window.CAMPING_DATA_VERSION = "v23.1.164";
window.CAMPING_DATA_BUILD = "mi-alger-bay-furnace-usfs-rustic-correction";
window.CAMPING_VERSION = "v23.1.164";
window.CAMPING_BUILD = {
  version: "v23.1.164",
  build: "mi-alger-bay-furnace-usfs-rustic-correction",
  dataVersion: "v23.1.164",
  dataBuild: "mi-alger-bay-furnace-usfs-rustic-correction",
  released: "2026-10-28",
  label: "Michigan Alger Bay Furnace operator rustic correction"
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
