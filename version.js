window.CAMPING_APP_VERSION = "v23.1.133";
window.CAMPING_APP_BUILD = "mi-newaygo-runtime-repair-bluegill";
window.CAMPING_DATA_VERSION = "v23.1.133";
window.CAMPING_DATA_BUILD = "mi-newaygo-runtime-repair-bluegill";
window.CAMPING_VERSION = "v23.1.133";
window.CAMPING_BUILD = {
  version: "v23.1.133",
  build: "mi-newaygo-runtime-repair-bluegill",
  dataVersion: "v23.1.133",
  dataBuild: "mi-newaygo-runtime-repair-bluegill",
  released: "2026-10-14",
  label: "Michigan runtime loading repaired; Bluegill campground added; misplaced Hungerford group held"
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
