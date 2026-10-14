window.CAMPING_APP_VERSION = "v23.1.131";
window.CAMPING_APP_BUILD = "mi-river-park-three-identities";
window.CAMPING_DATA_VERSION = "v23.1.131";
window.CAMPING_DATA_BUILD = "mi-river-park-three-identities";
window.CAMPING_VERSION = "v23.1.131";
window.CAMPING_BUILD = {
  version: "v23.1.131",
  build: "mi-river-park-three-identities",
  dataVersion: "v23.1.131",
  dataBuild: "mi-river-park-three-identities",
  released: "2026-10-14",
  label: "Michigan three distinct River Park campgrounds identity correction"
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
