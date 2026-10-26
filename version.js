window.CAMPING_APP_VERSION = "v23.1.150";
window.CAMPING_APP_BUILD = "mi-mecosta-martiny-hide-away-private";
window.CAMPING_DATA_VERSION = "v23.1.150";
window.CAMPING_DATA_BUILD = "mi-mecosta-martiny-hide-away-private";
window.CAMPING_VERSION = "v23.1.150";
window.CAMPING_BUILD = {
  version: "v23.1.150",
  build: "mi-mecosta-martiny-hide-away-private",
  dataVersion: "v23.1.150",
  dataBuild: "mi-mecosta-martiny-hide-away-private",
  released: "2026-10-26",
  label: "Michigan Mecosta Martiny Lakes Hide-Away campground integration"
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
