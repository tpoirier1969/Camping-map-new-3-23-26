window.CAMPING_APP_VERSION = "v23.1.144";
window.CAMPING_APP_BUILD = "mi-newaygo-oak-poplar-dnr-correction";
window.CAMPING_DATA_VERSION = "v23.1.144";
window.CAMPING_DATA_BUILD = "mi-newaygo-oak-poplar-dnr-correction";
window.CAMPING_VERSION = "v23.1.144";
window.CAMPING_BUILD = {
  version: "v23.1.144",
  build: "mi-newaygo-oak-poplar-dnr-correction",
  dataVersion: "v23.1.144",
  dataBuild: "mi-newaygo-oak-poplar-dnr-correction",
  released: "2026-10-15",
  label: "Michigan Newaygo Oak and Poplar DNR record corrections"
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
