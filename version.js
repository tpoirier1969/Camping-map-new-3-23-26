window.CAMPING_APP_VERSION = "v23.1.134";
window.CAMPING_APP_BUILD = "mi-mecosta-newaygo-8-campgrounds";
window.CAMPING_DATA_VERSION = "v23.1.134";
window.CAMPING_DATA_BUILD = "mi-mecosta-newaygo-8-campgrounds";
window.CAMPING_VERSION = "v23.1.134";
window.CAMPING_BUILD = {
  version: "v23.1.134",
  build: "mi-mecosta-newaygo-8-campgrounds",
  dataVersion: "v23.1.134",
  dataBuild: "mi-mecosta-newaygo-8-campgrounds",
  released: "2026-10-14",
  label: "Michigan batch: 8 new Mecosta/Newaygo campgrounds"
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
