window.CAMPING_APP_VERSION = "v23.1.132";
window.CAMPING_APP_BUILD = "mi-newaygo-usfs-five-bluegill-one";
window.CAMPING_DATA_VERSION = "v23.1.132";
window.CAMPING_DATA_BUILD = "mi-newaygo-usfs-five-bluegill-one";
window.CAMPING_VERSION = "v23.1.132";
window.CAMPING_BUILD = {
  version: "v23.1.132",
  build: "mi-newaygo-usfs-five-bluegill-one",
  dataVersion: "v23.1.132",
  dataBuild: "mi-newaygo-usfs-five-bluegill-one",
  released: "2026-10-14",
  label: "Michigan five Newaygo USFS rustic campgrounds and Bluegill Lake private campground"
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
