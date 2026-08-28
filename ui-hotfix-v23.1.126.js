(function(){
'use strict';
if(window.__campingUiHotfixV231126)return;
window.__campingUiHotfixV231126=true;

const RUNNING_VERSION=(window.CAMPING_BUILD&&window.CAMPING_BUILD.version)||window.CAMPING_APP_VERSION||'';
const CHECK_INTERVAL_MS=5*60*1000;
let lastCheck=0;
let latestVersion=RUNNING_VERSION;

function wireMobileLayerLegend(){
  const mobile=document.getElementById('mapLegendMobile');
  if(!mobile||mobile.dataset.layerHotfixBound==='1')return false;
  mobile.dataset.layerHotfixBound='1';
  mobile.addEventListener('change',function(event){
    const target=event.target;
    if(!target||!target.dataset||!target.dataset.layer)return;
    const key=target.dataset.layer;
    const desktop=document.querySelector('#mapLegendDesktop input[data-layer="'+CSS.escape(key)+'"]');
    if(!desktop)return;
    desktop.checked=target.checked;
    desktop.dispatchEvent(new Event('change',{bubbles:true}));
  });
  return true;
}

function ensureUpdateUi(){
  const section=document.getElementById('appVersionSection');
  if(!section)return null;
  let wrap=document.getElementById('appUpdateControls');
  if(wrap)return wrap;
  wrap=document.createElement('div');
  wrap.id='appUpdateControls';
  wrap.className='field-grid';
  wrap.style.marginTop='10px';
  wrap.innerHTML='<div id="appUpdateStatus" class="mini-note">Checking for a newer version…</div><button id="appUpdateBtn" class="secondary" type="button">Check for update</button>';
  section.appendChild(wrap);
  const btn=document.getElementById('appUpdateBtn');
  if(btn)btn.addEventListener('click',function(){
    if(latestVersion&&latestVersion!==RUNNING_VERSION){
      reloadLatest();
    }else{
      checkForUpdate(true);
    }
  });
  return wrap;
}

function setUpdateUi(message,updateAvailable){
  ensureUpdateUi();
  const status=document.getElementById('appUpdateStatus');
  const btn=document.getElementById('appUpdateBtn');
  if(status)status.textContent=message;
  if(btn){
    if(updateAvailable){
      btn.textContent='Reload latest version'+(latestVersion?' ('+latestVersion+')':'');
      btn.classList.add('primary');
      btn.classList.remove('secondary');
    }else{
      btn.textContent='Check for update';
      btn.classList.remove('primary');
      btn.classList.add('secondary');
    }
  }
}

function parsePublishedVersion(text){
  const match=String(text||'').match(/CAMPING_APP_VERSION\s*=\s*["']([^"']+)["']/);
  return match?match[1]:'';
}

async function checkForUpdate(force){
  const now=Date.now();
  if(!force&&now-lastCheck<CHECK_INTERVAL_MS)return;
  lastCheck=now;
  ensureUpdateUi();
  try{
    const response=await fetch('version.js?updateProbe='+now,{cache:'no-store',headers:{'Cache-Control':'no-cache'}});
    if(!response.ok)throw new Error('HTTP '+response.status);
    const text=await response.text();
    const published=parsePublishedVersion(text);
    if(!published)throw new Error('Version flag not found');
    latestVersion=published;
    if(RUNNING_VERSION&&published!==RUNNING_VERSION){
      setUpdateUi('A newer map build is available. Reload to '+published+'.',true);
    }else{
      setUpdateUi('Running the latest published version'+(RUNNING_VERSION?': '+RUNNING_VERSION:'')+'.',false);
    }
  }catch(error){
    setUpdateUi('Could not check for an update. The map can still be used normally.',false);
    try{console.warn('Camping Map version check failed',error);}catch(_e){}
  }
}

function reloadLatest(){
  try{
    const entry=window.CAMPING_APP_ENTRY||new URL('index.html',document.baseURI).href;
    const url=new URL(entry,window.location.href);
    url.searchParams.set('reload',String(Date.now()));
    window.location.replace(url.href);
  }catch(_e){
    window.location.reload();
  }
}

function bootHotfix(){
  ensureUpdateUi();
  if(!wireMobileLayerLegend()){
    let tries=0;
    const timer=setInterval(function(){
      tries+=1;
      if(wireMobileLayerLegend()||tries>=40)clearInterval(timer);
    },250);
  }
  setTimeout(function(){checkForUpdate(true);},1200);
  window.addEventListener('focus',function(){checkForUpdate(false);});
  document.addEventListener('visibilitychange',function(){if(!document.hidden)checkForUpdate(false);});
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bootHotfix,{once:true});
else bootHotfix();
})();
