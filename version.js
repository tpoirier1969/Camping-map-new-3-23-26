window.CAMPING_APP_VERSION = "v23.1.130";
window.CAMPING_APP_BUILD = "mi-tinyfish-menomb-isabella-lead-reconciliation";
window.CAMPING_DATA_VERSION = "v23.1.130";
window.CAMPING_DATA_BUILD = "mi-tinyfish-menomb-isabella-lead-reconciliation";
window.CAMPING_VERSION = "v23.1.130";
window.CAMPING_BUILD = {
  version: "v23.1.130",
  build: "mi-tinyfish-menomb-isabella-lead-reconciliation",
  dataVersion: "v23.1.130",
  dataBuild: "mi-tinyfish-menomb-isabella-lead-reconciliation",
  released: "2026-10-14",
  label: "Michigan TinyFish ledger verification and Fox Park reject reversal"
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
