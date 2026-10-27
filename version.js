window.CAMPING_APP_VERSION = "v23.1.156";
window.CAMPING_APP_BUILD = "mi-alger-hovey-lake-duplicate-correction";
window.CAMPING_DATA_VERSION = "v23.1.156";
window.CAMPING_DATA_BUILD = "mi-alger-hovey-lake-duplicate-correction";
window.CAMPING_VERSION = "v23.1.156";
window.CAMPING_BUILD = {
  version: "v23.1.156",
  build: "mi-alger-hovey-lake-duplicate-correction",
  dataVersion: "v23.1.156",
  dataBuild: "mi-alger-hovey-lake-duplicate-correction",
  released: "2026-10-27",
  label: "Michigan Alger Hovey Lake USFS duplicate and data correction"
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
