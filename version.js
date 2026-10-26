window.CAMPING_APP_VERSION = "v23.1.149";
window.CAMPING_APP_BUILD = "mi-newaygo-muskegon-river-modern";
window.CAMPING_DATA_VERSION = "v23.1.149";
window.CAMPING_DATA_BUILD = "mi-newaygo-muskegon-river-modern";
window.CAMPING_VERSION = "v23.1.149";
window.CAMPING_BUILD = {
  version: "v23.1.149",
  build: "mi-newaygo-muskegon-river-modern",
  dataVersion: "v23.1.149",
  dataBuild: "mi-newaygo-muskegon-river-modern",
  released: "2026-10-26",
  label: "Michigan Newaygo Muskegon River Campground integration"
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
