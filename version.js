window.CAMPING_APP_VERSION = "v23.1.129";
window.CAMPING_APP_BUILD = "mi-dnr-state-park-campground-components";
window.CAMPING_DATA_VERSION = "v23.1.129";
window.CAMPING_DATA_BUILD = "mi-dnr-state-park-campground-components";
window.CAMPING_VERSION = "v23.1.129";
window.CAMPING_BUILD = {
  version: "v23.1.129",
  build: "mi-dnr-state-park-campground-components",
  dataVersion: "v23.1.129",
  dataBuild: "mi-dnr-state-park-campground-components",
  released: "2026-10-14",
  label: "Michigan missing DNR state park campground components and Algonac layer cleanup"
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
