window.CAMPING_APP_VERSION = "v23.1.142";
window.CAMPING_APP_BUILD = "mi-mecosta-grays-riverside-operator-proof";
window.CAMPING_DATA_VERSION = "v23.1.142";
window.CAMPING_DATA_BUILD = "mi-mecosta-grays-riverside-operator-proof";
window.CAMPING_VERSION = "v23.1.142";
window.CAMPING_BUILD = {
  version: "v23.1.142",
  build: "mi-mecosta-grays-riverside-operator-proof",
  dataVersion: "v23.1.142",
  dataBuild: "mi-mecosta-grays-riverside-operator-proof",
  released: "2026-10-15",
  label: "Michigan Mecosta Grays Riverside verified campground"
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
