(function(){
'use strict';
const VERSION='v23.0.21';
const DEFAULT_STATE='MI';

const STATE_BOUNDS={
  AL:[[30.14,-88.47],[35.01,-84.89]], AK:[[51.21,-179.15],[71.39,-129.98]], AZ:[[31.33,-114.82],[37.00,-109.05]], AR:[[33.00,-94.62],[36.50,-89.64]], CA:[[32.53,-124.48],[42.01,-114.13]],
  CO:[[36.99,-109.06],[41.00,-102.04]], CT:[[40.98,-73.73],[42.05,-71.79]], DE:[[38.45,-75.79],[39.84,-75.05]], FL:[[24.40,-87.63],[31.00,-80.03]], GA:[[30.36,-85.61],[35.00,-80.84]],
  HI:[[18.91,-160.25],[22.24,-154.80]], ID:[[42.00,-117.24],[49.00,-111.04]], IL:[[36.97,-91.51],[42.51,-87.50]], IN:[[37.77,-88.10],[41.76,-84.78]], IA:[[40.37,-96.64],[43.50,-90.14]],
  KS:[[36.99,-102.05],[40.00,-94.59]], KY:[[36.50,-89.57],[39.15,-81.96]], LA:[[28.92,-94.04],[33.02,-88.82]], ME:[[42.96,-71.08],[47.46,-66.95]], MD:[[37.89,-79.49],[39.72,-75.05]],
  MA:[[41.24,-73.51],[42.89,-69.93]], MI:[[41.69,-90.42],[48.31,-82.12]], MN:[[43.50,-97.24],[49.38,-89.49]], MS:[[30.17,-91.66],[35.01,-88.10]], MO:[[35.99,-95.77],[40.61,-89.10]],
  MT:[[44.36,-116.05],[49.00,-104.04]], NE:[[39.99,-104.05],[43.00,-95.31]], NV:[[35.00,-120.01],[42.00,-114.04]], NH:[[42.70,-72.56],[45.31,-70.61]], NJ:[[38.93,-75.56],[41.36,-73.89]],
  NM:[[31.33,-109.05],[37.00,-103.00]], NY:[[40.48,-79.76],[45.02,-71.85]], NC:[[33.84,-84.32],[36.59,-75.46]], ND:[[45.94,-104.05],[49.00,-96.55]], OH:[[38.40,-84.82],[41.98,-80.52]],
  OK:[[33.62,-103.00],[37.00,-94.43]], OR:[[42.00,-124.57],[46.30,-116.46]], PA:[[39.72,-80.52],[42.27,-74.69]], RI:[[41.15,-71.89],[42.02,-71.12]], SC:[[32.03,-83.35],[35.22,-78.54]],
  SD:[[42.48,-104.06],[45.95,-96.44]], TN:[[34.98,-90.31],[36.68,-81.65]], TX:[[25.84,-106.65],[36.50,-93.51]], UT:[[36.99,-114.05],[42.00,-109.04]], VT:[[42.73,-73.44],[45.02,-71.50]],
  VA:[[36.54,-83.68],[39.47,-75.24]], WA:[[45.54,-124.85],[49.00,-116.91]], WV:[[37.20,-82.64],[40.64,-77.72]], WI:[[42.49,-92.89],[47.31,-86.25]], WY:[[40.99,-111.06],[45.01,-104.05]]
};
const STORE={states:'campingMap.enabledStates.v22328',layers:'campingMap.layers.v22328',basemap:'campingMap.basemap.v22328',queue:'campingMap.draftQueue.v22328',filters:'campingMap.filters.v22328',pending:'campingMap.showPending.v22328'};
const ICONS={tent:'<svg viewBox="0 0 24 24"><path fill="currentColor" d="M3 18.5 10.8 5h2.4L21 18.5h-3.1l-5.1-9.1-2.9 4.9 1.9 4.2H9.2l-1.5-3.2-1.7 3.2H3Zm6.8 0h4.5l-2.2-5-2.3 5Z"/></svg>',tree:'<svg viewBox="0 0 24 24"><path fill="currentColor" d="m12 2 4 5h-2.1l3.6 4.5H15l3 3.8h-4.2V22h-3.6v-6.7H6l3-3.8H6.5L10.1 7H8L12 2Z"/></svg>',camper:'<svg viewBox="0 0 24 24"><path fill="currentColor" d="M4 8.5h10.6c.8 0 1.6.4 2.1 1l2.3 2.6H21a1 1 0 0 1 1 1v4.9h-1.7a2.6 2.6 0 0 1-5.1 0H9.8a2.6 2.6 0 0 1-5.1 0H3v-8.5a1 1 0 0 1 1-1Zm1.2 1.8v2.8H14v-2.8H5.2Zm11 3.1h3.2l-1.6-1.8a1.1 1.1 0 0 0-.8-.4h-.8v2.2ZM7.2 19a1.2 1.2 0 1 0 0-2.5 1.2 1.2 0 0 0 0 2.4Zm10.6 0a1.2 1.2 0 1 0 0-2.5 1.2 1.2 0 0 0 0 2.4Z"/></svg>',parking:'<svg viewBox="0 0 24 24"><path fill="currentColor" d="M6 3h7.4c3 0 5.1 2.1 5.1 5s-2.1 5.1-5.1 5.1H9.6V21H6V3Zm3.6 3.2v3.7h3.4c1.1 0 1.9-.7 1.9-1.9s-.8-1.8-1.9-1.8H9.6Z"/></svg>',info:'<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 2.8A9.2 9.2 0 1 1 2.8 12 9.2 9.2 0 0 1 12 2.8Zm0 4a1.3 1.3 0 1 0 0 2.6 1.3 1.3 0 0 0 0-2.6Zm-1.7 5v1.8h1.1v3.6h-1.1V19h4.5v-1.8h-1.1v-5.4h-3.4Z"/></svg>',draft:'<svg viewBox="0 0 24 24"><path fill="currentColor" d="M4 17.5V20h2.5l8.6-8.6-2.5-2.5L4 17.5Zm12.4-9.9 1.5-1.5a1.2 1.2 0 0 1 1.7 0l.8.8a1.2 1.2 0 0 1 0 1.7l-1.5 1.5-2.5-2.5Z"/></svg>',dot:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="6" fill="currentColor"/></svg>'};
const LAYERS=[
 {key:'modern',label:'Modern campgrounds',css:'pin-modern',icon:ICONS.tent},
 {key:'rustic',label:'Rustic campgrounds',css:'pin-rustic',icon:ICONS.tree},
 {key:'private',label:'Private campgrounds',css:'pin-private',icon:ICONS.camper},
 {key:'boondocking',label:'Boondocking / dispersed',css:'pin-boondocking',icon:ICONS.tree},
 {key:'overnight-parking',label:'Overnight parking',css:'pin-parking',icon:ICONS.parking},
 {key:'rest-truck',label:'Rest Areas & Roadside Stops',css:'pin-rest',icon:ICONS.parking},
 {key:'info',label:'Info / reference',css:'pin-info',icon:ICONS.info},
 {key:'pending',label:'Needs Verification',css:'pin-draft',icon:ICONS.draft}
];
const MAP_LAYER_KEYS=new Set(['modern','rustic','private','boondocking','overnight-parking','rest-truck','pending']);
const MAP_LAYERS=LAYERS.filter(l=>MAP_LAYER_KEYS.has(l.key));
const SMALL_EMPHASIS_LAYERS=new Set(['overnight-parking','rest-truck']);
function markerSizeForLayer(key){return SMALL_EMPHASIS_LAYERS.has(key)?22:24;}
const $=id=>document.getElementById(id); const $$=(sel,root=document)=>Array.from(root.querySelectorAll(sel));
window.CAMPING_STATE_DATA = window.CAMPING_STATE_DATA || {};
window.CAMPING_PENDING_SITES = window.CAMPING_PENDING_SITES || window.CAMPING_PENDING || [];
const app={map:null,markerLayer:null,userMarker:null,draftMarker:null,baseLayers:{},sites:[],shownSites:[],stateData:{},enabledStates:new Set(),enabledLayers:new Set(),filters:{},draftPoint:null,draftQueue:[],supabase:null,session:null,restRoadsideStats:null};
window.__campingApp=app;
function esc(v){return String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));}
function readJson(key,fb){try{return JSON.parse(localStorage.getItem(key)||'null')??fb}catch{return fb}}
function saveJson(key,val){try{localStorage.setItem(key,JSON.stringify(val))}catch(_e){}}
function manifestEntries(){const m=window.CAMPING_STATES_MANIFEST||{};return (Array.isArray(m.states)?m.states:Object.values(m)).filter(Boolean).sort((a,b)=>String(a.name||a.code).localeCompare(String(b.name||b.code)));}
function layerKey(site){
  let layer=String(site.layer||site.proposedLayer||'').toLowerCase();
  let subtype=String(site.subtype||site.proposedSubtype||'').toLowerCase();
  let form=String(site.siteForm||site.proposedSiteForm||'').toLowerCase();
  let raw=(layer+' '+subtype+' '+form+' '+(site.layerLabel||'')+' '+(site.categoryLabel||'')+' '+(site.rawCategory||'')).toLowerCase();
  if(site.pending||site.verificationStatus==='pending')return 'pending';
  // v23.0.20: explicit layer assignments win before keyword guessing.
  // This prevents casino-owned RV parks/campgrounds from being misclassified as Overnight Parking.
  if(layer==='overnight-parking')return 'overnight-parking';
  if(layer==='rest-truck'||layer==='rest-roadside'||layer==='roadside-stop')return 'rest-truck';
  if(layer==='private')return 'private';
  if(layer==='boondocking')return 'boondocking';
  if(layer==='info')return 'info';
  if(['state','federal','local'].includes(layer)&&subtype==='rustic')return 'rustic';
  if(['state','federal','local'].includes(layer)&&subtype==='modern')return 'modern';
  if(subtype==='rustic')return 'rustic';
  if(subtype==='modern')return 'modern';
  if(/rest|roadside|wayside|truck/.test(raw))return 'rest-truck';
  if(/overnight|parking|walmart|cracker|cabela|bass pro|municipal lot/.test(raw))return 'overnight-parking';
  if(/dispersed|boondock/.test(raw))return 'boondocking';
  if(/reference/.test(raw))return 'info';
  return 'info';
}
function layerDef(key){return LAYERS.find(l=>l.key===key)||LAYERS[6];}
function notify(msg,ms=3000){const el=$('statusBar');if(!el)return;el.textContent=msg;el.hidden=false;clearTimeout(notify.t);notify.t=setTimeout(()=>el.hidden=true,ms)}
function setLoading(on,msg){const el=$('mapLoading');if(!el)return;if(msg)el.textContent=msg;el.classList.toggle('hidden',!on);}
function migrateLayerKeys(rawLayers){
  const valid=new Set(MAP_LAYERS.map(l=>l.key));
  const migrated=new Set();
  (Array.isArray(rawLayers)?rawLayers:[]).forEach(key=>{
    key=String(key||'').toLowerCase();
    if(valid.has(key)){migrated.add(key);return;}
    if(['federal-modern','state-modern','local-modern'].includes(key))migrated.add('modern');
    else if(['federal-rustic','state-rustic','local-rustic'].includes(key))migrated.add('rustic');
    else if(['private-modern','private-rustic'].includes(key))migrated.add('private');
    else if(key==='boondocking')migrated.add('boondocking');
    else if(key==='pending')migrated.add('pending');
  });
  if(migrated.size===0){
    LAYERS.filter(x=>x.key!=='pending'&&x.key!=='rest-truck'&&x.key!=='overnight-parking').forEach(x=>migrated.add(x.key));
  }
  return [...migrated];
}
function initState(){document.title='Boondocking & Camping Maps '+VERSION; const vt=$('versionTag'); if(vt)vt.textContent=VERSION; app.draftQueue=readJson(STORE.queue,[]); $('draftQueue').value=app.draftQueue.join('\n'); const storedStates=readJson(STORE.states,null); const states=Array.isArray(storedStates)?storedStates:[DEFAULT_STATE]; app.enabledStates=new Set(states); let layers=migrateLayerKeys(readJson(STORE.layers,MAP_LAYERS.filter(x=>x.key!=='pending').map(x=>x.key))); try{if(localStorage.getItem('campingMap.layerMigration.v2309.mdotLiveRestRoadside')!=='1'){if(!layers.includes('rest-truck'))layers.push('rest-truck');localStorage.setItem('campingMap.layerMigration.v2309.mdotLiveRestRoadside','1')}}catch(_e){if(!layers.includes('rest-truck'))layers.push('rest-truck')} app.enabledLayers=new Set(layers); saveJson(STORE.layers,layers); if(localStorage.getItem(STORE.pending)==='1')app.enabledLayers.add('pending'); app.filters=readJson(STORE.filters,{maxCost:'',access:'',chips:{}});}
function initMap(){app.map=L.map('map',{zoomControl:true,preferCanvas:true}).setView([44.9,-89.7],6); app.markerLayer=L.layerGroup().addTo(app.map); app.baseLayers={osm:L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'&copy; OpenStreetMap contributors'}),opentopo:L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',{maxZoom:17,attribution:'Map data &copy; OpenStreetMap contributors, SRTM | Map style &copy; OpenTopoMap'}),topo:L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',{maxZoom:19,attribution:'Tiles &copy; Esri'}),satellite:L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',{maxZoom:19,attribution:'Tiles &copy; Esri'})}; const key=localStorage.getItem(STORE.basemap)||'topo'; (app.baseLayers[key]||app.baseLayers.topo).addTo(app.map); $('basemapSelect').value=key;}
function buildControls(){buildStateSelect(); buildLayerList(); buildLegend(); syncFilters(); bindEvents(); updatePendingMeta();}
function buildStateSelect(){buildStateChecklist(); syncStateControls();}
function mappedStateEntries(){return manifestEntries().filter(s=>Number(s.count||0)>0 || s.file || (Array.isArray(s.files)&&s.files.length))}
function buildStateChecklist(){const box=$('stateChecklist'); if(!box)return; const rows=mappedStateEntries(); box.innerHTML=rows.map(s=>`<label class="state-check"><input type="checkbox" data-state-code="${esc(s.code)}"><span>${esc(s.name||s.code)}</span><em class="state-count-pill">${Number(s.count||0)}</em></label>`).join('');}
function selectedStateSummary(){const n=app.enabledStates.size; const mapped=mappedStateEntries().length; if(n===0)return 'No states selected'; if(n===1)return `${stateLabel([...app.enabledStates][0])} selected`; if(n===mapped)return `All ${mapped} mapped states`; return `${n} states selected`;}
function syncStateControls(){$$('[data-state-code]').forEach(cb=>{cb.checked=app.enabledStates.has(cb.dataset.stateCode)}); const summary=$('stateSelectionSummary'); if(summary)summary.textContent=selectedStateSummary(); const note=$('stateSelectionNote'); if(note){const n=app.enabledStates.size; note.textContent=n===0?'No states selected. Choose one or more states to load map data.':(n===1?`${stateLabel([...app.enabledStates][0])} selected.`:`${n} states selected. The map will zoom to the combined selected area.`);}}
function stateLabel(code){const row=manifestEntries().find(s=>s.code===code); return row?(row.name||row.code):code}
function setEnabledStates(codes,fit=true){const valid=new Set(mappedStateEntries().map(s=>s.code)); const picked=(codes||[]).filter(c=>valid.has(c)); app.enabledStates=new Set(picked); saveJson(STORE.states,[...app.enabledStates]); syncStateControls(); loadEnabledStates(fit)}
function buildLayerList(){const box=$('layerList'); box.innerHTML=MAP_LAYERS.map(l=>`<label class="check layer-row"><input type="checkbox" data-layer="${l.key}" ${app.enabledLayers.has(l.key)?'checked':''}><span class="layer-icon ${l.css}">${l.icon}</span><span class="layer-title">${esc(l.label)}</span></label>`).join('');}
function buildLegend(){const html='<h3>Map legend</h3><div class="legend-grid">'+MAP_LAYERS.map(l=>`<div class="legend-item"><span class="layer-icon ${l.css}">${l.icon}</span><span>${esc(l.label)}</span></div>`).join('')+'</div>'; if($('mapLegendDesktop'))$('mapLegendDesktop').innerHTML=html; if($('mapLegendMobile'))$('mapLegendMobile').innerHTML=html;}

function selectedStateCodes(){return [...app.enabledStates].filter(Boolean);}
function markerBoundsFromShownSites(){
  const bounds=L.latLngBounds([]);
  app.shownSites.forEach(site=>{
    const lat=Number(site.lat),lng=Number(site.lng);
    if(Number.isFinite(lat)&&Number.isFinite(lng)) bounds.extend([lat,lng]);
  });
  return bounds;
}
function boundsForSelectedStates(){
  const bounds=L.latLngBounds([]);
  selectedStateCodes().forEach(code=>{
    const b=STATE_BOUNDS[String(code).toUpperCase()];
    if(b) bounds.extend(b);
  });
  return bounds;
}
function fitSelectedStateView(){
  if(!app.map) return;
  const codes=selectedStateCodes();
  const stateBounds=boundsForSelectedStates();
  const shownBounds=markerBoundsFromShownSites();
  const useStateBounds=stateBounds.isValid();
  const bounds=useStateBounds?stateBounds:shownBounds;
  if(!bounds.isValid()) return;
  const pad=window.matchMedia&&window.matchMedia('(max-width:700px)').matches?[22,22]:[42,42];
  const maxZoom=codes.length<=1?8:6;
  app.map.fitBounds(bounds,{padding:pad,maxZoom,animate:false});
}


function bindSidebarTabs(){
  $$('[data-sidebar-tab]').forEach(btn=>{
    btn.onclick=()=>showSidebarTab(btn.dataset.sidebarTab);
  });
}
function showSidebarTab(tab){
  const main=$('mainTabPanel'), ref=$('referenceTabPanel');
  const mainBtn=$('mainTabButton'), refBtn=$('referenceTabButton');
  const isRef=tab==='reference';
  if(main)main.hidden=isRef;
  if(ref)ref.hidden=!isRef;
  if(mainBtn)mainBtn.classList.toggle('active',!isRef);
  if(refBtn)refBtn.classList.toggle('active',isRef);
  if(isRef)renderReferences();
}
function referenceItemHtml(site){
  const url=site.website||site.costSourceUrl||'';
  const desc=site.description||site.reviewSummary||site.notes||site.access||'';
  const name=site.name||site.title||'Reference item';
  return `<div class="reference-item"><strong>${esc(name)}</strong>${desc?`<p>${esc(desc)}</p>`:''}${url?`<a href="${esc(url)}" target="_blank" rel="noopener">Open reference</a>`:''}</div>`;
}
function renderReferences(){
  const target=$('referenceContent');
  if(!target)return;
  const refs=(app.sites||[]).filter(s=>layerKey(s)==='info');
  const national=refs.filter(s=>{const c=String(s.stateCode||s.state||'').toUpperCase(); return !c||['US','USA','NATIONAL','ALL'].includes(c);});
  const byState=new Map();
  refs.filter(s=>!national.includes(s)).forEach(s=>{const label=s.stateName||stateLabel(s.stateCode)||s.stateCode||'Other'; if(!byState.has(label))byState.set(label,[]); byState.get(label).push(s);});
  const sections=[];
  sections.push(`<div class="reference-section"><h3>Traveler stop inclusion rule</h3><div class="reference-note"><strong>Include:</strong> rest areas, welcome centers, roadside parks, scenic turnouts, waysides, beach/river access with useful parking, public boat launches with safe pause value, waterfront pocket parks, and trailhead/day-use parking that works for a traveler break.<br><br><strong>Exclude:</strong> playground-only parks, sports fields, school fields, campgrounds already listed elsewhere, ordinary neighborhood parks with no traveler-stop value, and special-use facilities where a stranger stopping briefly would feel out of place.<br><br><strong>Overnight note:</strong> this layer tracks traveler usefulness and overnight-parking status separately. It does not imply camping is allowed.</div></div>`);
  sections.push(`<div class="reference-section"><h3>National information</h3>${national.length?`<div class="reference-list">${national.map(referenceItemHtml).join('')}</div>`:'<div class="reference-note">No national reference items are loaded for the current selection.</div>'}</div>`);
  [...byState.entries()].sort((a,b)=>a[0].localeCompare(b[0])).forEach(([state,items])=>{sections.push(`<div class="reference-section"><h3>${esc(state)}</h3><div class="reference-list">${items.map(referenceItemHtml).join('')}</div></div>`)});
  if(refs.length===0)sections.push('<div class="reference-section"><h3>State-by-state information</h3><div class="reference-note">No information/reference records are loaded for the selected states.</div></div>');
  target.innerHTML=sections.join('');
}

function bindEvents(){ bindSidebarTabs(); $('menuToggle').onclick=()=>{$('sidebar').classList.toggle('closed'); setTimeout(()=>app.map.invalidateSize(),220)}; $('closeSidebar').onclick=()=>{$('sidebar').classList.add('closed'); setTimeout(()=>app.map.invalidateSize(),220)}; $('basemapSelect').onchange=e=>{Object.values(app.baseLayers).forEach(t=>app.map.removeLayer(t));(app.baseLayers[e.target.value]||app.baseLayers.topo).addTo(app.map);localStorage.setItem(STORE.basemap,e.target.value)}; const stateMenuButton=$('stateMenuButton'); const stateMenuPanel=$('stateMenuPanel'); if(stateMenuButton&&stateMenuPanel)stateMenuButton.onclick=()=>{const open=stateMenuPanel.hidden; stateMenuPanel.hidden=!open; stateMenuButton.setAttribute('aria-expanded',open?'true':'false')}; document.addEventListener('click',e=>{if(stateMenuPanel&&stateMenuButton&&!stateMenuPanel.hidden&&!$('stateSection').contains(e.target)){stateMenuPanel.hidden=true;stateMenuButton.setAttribute('aria-expanded','false')}}); const allStatesBtn=$('selectAllStates'); if(allStatesBtn)allStatesBtn.onclick=()=>setEnabledStates(mappedStateEntries().map(s=>s.code),true); const clearStatesBtn=$('clearStates'); if(clearStatesBtn)clearStatesBtn.onclick=()=>setEnabledStates([],true); const stateChecklist=$('stateChecklist'); if(stateChecklist)stateChecklist.addEventListener('change',e=>{if(!e.target.dataset.stateCode)return; const codes=$$('[data-state-code]').filter(cb=>cb.checked).map(cb=>cb.dataset.stateCode); setEnabledStates(codes,true)}); $('selectAllLayers').onclick=()=>setAllLayers(true); $('clearAllLayers').onclick=()=>setAllLayers(false); $('layerList').addEventListener('change',e=>{if(!e.target.dataset.layer)return; e.target.checked?app.enabledLayers.add(e.target.dataset.layer):app.enabledLayers.delete(e.target.dataset.layer); saveLayers(); renderMarkers(false)}); $('showPendingLayer').onchange=e=>{e.target.checked?app.enabledLayers.add('pending'):app.enabledLayers.delete('pending');localStorage.setItem(STORE.pending,e.target.checked?'1':'0');saveLayers();updatePendingMeta();renderMarkers(false)}; $('searchBtn').onclick=runSearch; $('searchInput').addEventListener('keydown',e=>{if(e.key==='Enter')runSearch()}); $('nearMeBtn').onclick=nearMe; $('openAddSiteBtn').onclick=()=>openModal('addSiteModal'); $('openQueueBtn').onclick=()=>openModal('queueModal'); $$('[data-close-modal]').forEach(b=>b.onclick=()=>closeModal(b.dataset.closeModal)); $$('.modal-backdrop').forEach(m=>m.addEventListener('click',e=>{if(e.target===m)closeModal(m.id)})); $$('[data-mobile-action]').forEach(b=>b.onclick=()=>mobileAction(b.dataset.mobileAction)); $('addMode').onchange=()=>notify($('addMode').checked?'Click the map to place a draft pin.':'Add mode off.'); app.map.on('click',e=>{if($('addMode').checked)setDraftPoint(e.latlng)}); $('appendDraftBtn').onclick=appendDraft; $('clearDraftBtn').onclick=clearDraft; $('copyQueueBtn').onclick=copyQueue; $('clearQueueBtn').onclick=()=>{app.draftQueue=[];saveJson(STORE.queue,app.draftQueue);$('draftQueue').value='';notify('Queue cleared.')}; $('sendDraftSupabaseBtn').onclick=sendDraftSupabase; $('sbAuthForm').onsubmit=signIn; $('sbSignOutBtn').onclick=signOut; $('costFilter').onchange=()=>setCostFilter($('costFilter').value); $('accessFilter').onchange=()=>setAccessFilter($('accessFilter').value); $$('[data-filter-chip]').forEach(c=>c.onclick=()=>toggleQuickFilter(c.dataset.filterChip)); const clearFiltersBtn=$('clearFiltersBtn'); if(clearFiltersBtn)clearFiltersBtn.onclick=clearFilters;}
function saveLayers(){app.enabledLayers=new Set([...app.enabledLayers].filter(k=>MAP_LAYER_KEYS.has(k)));saveJson(STORE.layers,[...app.enabledLayers]);$$('[data-layer]').forEach(i=>i.checked=app.enabledLayers.has(i.dataset.layer));}
function setAllLayers(on){MAP_LAYERS.forEach(l=>on?app.enabledLayers.add(l.key):app.enabledLayers.delete(l.key)); saveLayers(); $('showPendingLayer').checked=app.enabledLayers.has('pending');renderMarkers(false)}
function updatePendingMeta(){const on=app.enabledLayers.has('pending');$('showPendingLayer').checked=on;$('pendingMeta').textContent=on?'on':'off'}
function normalizeFilters(){
  app.filters=app.filters||{};
  app.filters.chips=app.filters.chips||{};
  app.filters.maxCost=String(app.filters.maxCost||'');
  app.filters.access=String(app.filters.access||'');
  app.filters.chips.showers=!!app.filters.chips.showers;
  delete app.filters.chips.free;
  delete app.filters.chips.under20;
  delete app.filters.chips.twowd;
}
function isQuickFilterActive(key){
  normalizeFilters();
  if(key==='free')return app.filters.maxCost==='0';
  if(key==='under20')return app.filters.maxCost==='20';
  if(key==='twowd')return app.filters.access==='2wd';
  if(key==='showers')return !!app.filters.chips.showers;
  return false;
}
function syncFilters(){
  normalizeFilters();
  $('costFilter').value=app.filters.maxCost||'';
  $('accessFilter').value=app.filters.access||'';
  $$('[data-filter-chip]').forEach(c=>c.classList.toggle('active',isQuickFilterActive(c.dataset.filterChip)));
}
function saveFilters(){normalizeFilters();saveJson(STORE.filters,app.filters)}
function applyFilterChange(){syncFilters();saveFilters();renderMarkers(false)}
function setCostFilter(value){normalizeFilters();app.filters.maxCost=String(value||'');applyFilterChange()}
function setAccessFilter(value){normalizeFilters();app.filters.access=String(value||'');applyFilterChange()}
function toggleQuickFilter(key){
  normalizeFilters();
  const active=isQuickFilterActive(key);
  if(key==='free')app.filters.maxCost=active?'':'0';
  else if(key==='under20')app.filters.maxCost=active?'':'20';
  else if(key==='twowd')app.filters.access=active?'':'2wd';
  else if(key==='showers')app.filters.chips.showers=!active;
  applyFilterChange();
}
function clearFilters(){
  normalizeFilters();
  app.filters.maxCost='';
  app.filters.access='';
  app.filters.chips.showers=false;
  applyFilterChange();
  notify('Filters cleared.');
}
function openModal(id){$(id)?.classList.add('open');$(id)?.setAttribute('aria-hidden','false')} function closeModal(id){$(id)?.classList.remove('open');$(id)?.setAttribute('aria-hidden','true')}
function mobileAction(a){if(a==='add')return openModal('addSiteModal'); $('sidebar').classList.remove('closed'); setTimeout(()=>{const id={layers:'layersSection',filters:'filterSection',search:'searchSection'}[a]; $(id)?.scrollIntoView({block:'start',behavior:'smooth'});},80)}
async function loadEnabledStates(fit){setLoading(true,'Loading map…'); const states=[...app.enabledStates]; app.sites=[]; if(states.length===0){renderMarkers(false); setLoading(false); return;} for(const code of states){await loadState(code); app.sites.push(...(app.stateData[code]||[]));} if(app.enabledLayers.has('pending')) app.sites.push(...getPendingSites().filter(s=>app.enabledStates.has(String(s.stateCode||s.state||'').toUpperCase()))); renderMarkers(fit); setLoading(false);}
function loadScriptOnce(src,attr,val){return new Promise(res=>{const existing=document.querySelector(`script[${attr}="${val}"]`); if(existing)return res(); const s=document.createElement('script');s.src=src;s.setAttribute(attr,val);s.onload=()=>res();s.onerror=()=>{console.warn('Failed to load data file',src);res()};document.head.appendChild(s)})}

const MDOT_LIVE_REST_ROADSIDE={
  enabled:true,
  lastChecked:'2026-05-13',
  restAreas:{
    label:'MDOT rest areas / welcome centers',
    officialPage:'https://www.michigan.gov/mdot/travel/tourists/rest-areas',
    serviceUrl:'https://gisagomdot.state.mi.us/arcgis/rest/services/MDOT/MdotRestAreaPublic/FeatureServer/0/query'
  },
  roadsideParks:{
    label:'MDOT roadside parks / scenic views',
    officialPage:'https://www.michigan.gov/mdot/travel/tourists/roadside-parks',
    serviceUrl:'https://gisagomdot.state.mi.us/arcgis/rest/services/MDOT/MdotRoadsideParkPublic/FeatureServer/0/query'
  },
  fallbackFile:'data/mi-rest-roadside-v23.0.8.js'
};
function arcgisQueryUrl(serviceUrl){
  const params=new URLSearchParams({where:'1=1',outFields:'*',returnGeometry:'true',outSR:'4326',f:'json',resultRecordCount:'2000'});
  return serviceUrl+'?'+params.toString();
}
function cleanSlug(value){
  return String(value||'site').toLowerCase().replace(/&/g,' and ').replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'').slice(0,70)||'site';
}
function boolField(value){
  if(value===1||value===true)return 'Yes';
  if(value===0||value===false)return 'No';
  if(value==null||value==='')return '';
  return String(value);
}
function normalizedLng(x){
  let lng=Number(x);
  if(Number.isFinite(lng)&&lng>0&&lng>=82&&lng<=91)lng=-lng;
  return lng;
}
function normalizedLat(y){return Number(y);}
function validMichiganPoint(lat,lng){return Number.isFinite(lat)&&Number.isFinite(lng)&&lat>=41.5&&lat<=48.5&&lng>=-91.5&&lng<=-82.0;}
function currentStatusToSeason(status,facilityType){
  status=String(status||'').toLowerCase();
  if(status.includes('closed for season'))return 'Seasonal';
  if(status.includes('closed'))return 'Temporarily closed';
  if(facilityType==='Roadside Park'||facilityType==='Scenic Turnout')return 'Seasonal';
  return 'Year-round';
}
function travelerUseForFacility(facilityType){
  if(facilityType==='Welcome Center')return 'Bathroom break; snack stop; stretch stop; dog walk; trip information; map/check-in stop';
  if(facilityType==='Rest Area')return 'Bathroom break; snack stop; stretch stop; dog walk; map/check-in stop';
  if(facilityType==='Scenic Turnout')return 'Scenic stop; stretch stop; map/check-in stop; short photo/view stop';
  if(facilityType==='Roadside Park')return 'Snack stop; stretch stop; picnic stop; dog walk; short break';
  if(/boat|water/i.test(facilityType||''))return 'Water access; stretch stop; snack stop when parking/restroom conditions are suitable';
  return 'Traveler stop; verify posted rules and amenities';
}
function restRoadsideSourceLink(site){
  const url=site&&site.sourceUrl;
  return url?`<a href="${esc(url)}" target="_blank" rel="noopener">Source data</a>`:'';
}
function arcgisAttrs(feature){return (feature&&feature.attributes)||{};}
function arcgisGeom(feature){return (feature&&feature.geometry)||{};}
function mapMdotRestAreaFeature(feature){
  const a=arcgisAttrs(feature), g=arcgisGeom(feature);
  const lat=normalizedLat(g.y), lng=normalizedLng(g.x);
  if(!validMichiganPoint(lat,lng))return null;
  const name=String(a.FacilityName||'MDOT Rest Area').trim();
  const fn=String(a.FacilityFunction||'');
  const facilityType=/welcome/i.test(fn+' '+name)?'Welcome Center':'Rest Area';
  const status=String(a.Status||'Open');
  const route=[a.RouteName,a.RouteDirection].filter(Boolean).join(' ');
  const details=[];
  if(a.FamilyRestrooms)details.push('family restrooms: '+a.FamilyRestrooms);
  if(a.DogRun)details.push('dog run: '+a.DogRun);
  if(boolField(a.OutsideWaterFaucet))details.push('outside water faucet: '+boolField(a.OutsideWaterFaucet));
  if(boolField(a.WalkingPath))details.push('walking path: '+boolField(a.WalkingPath));
  if(boolField(a.Playground))details.push('playground: '+boolField(a.Playground));
  if(boolField(a.Geocache))details.push('geocache: '+boolField(a.Geocache));
  return {
    id:'mi-mdot-live-rest-'+cleanSlug(name+'-'+(a.RouteName||'')+'-'+(a.RouteDirection||'')+'-'+(a.MileMarker||a.OBJECTID||'')),
    sourceId:a.GlobalID||a.OBJECTID||'',
    name:name,
    lat:lat,
    lng:lng,
    stateCode:'MI',
    stateName:'Michigan',
    layer:'rest-truck',
    subtype:facilityType==='Welcome Center'?'welcome-center':'rest-area',
    siteForm:'traveler-facility',
    facilityType:facilityType,
    owner:'Michigan Department of Transportation',
    ownerLevel:'State/MDOT',
    layerLabel:'Rest Areas & Roadside Stops',
    travelerUse:travelerUseForFacility(facilityType),
    currentStatus:status,
    overnightParking:'Unknown',
    seasonStatus:currentStatusToSeason(status,facilityType),
    seasonNotes:(a.ClosureDetails?String(a.ClosureDetails):'MDOT official GIS status: '+status+'. Verify posted signs and current MDOT status before relying on an overnight stop.'),
    routeName:a.RouteName||'',
    routeDirection:a.RouteDirection||'',
    mileMarker:a.MileMarker||'',
    honoree:a.Honoree||'',
    website:MDOT_LIVE_REST_ROADSIDE.restAreas.officialPage,
    sourceUrl:MDOT_LIVE_REST_ROADSIDE.restAreas.serviceUrl,
    sourceName:MDOT_LIVE_REST_ROADSIDE.restAreas.label,
    lastChecked:MDOT_LIVE_REST_ROADSIDE.lastChecked,
    cost:'Free traveler facility; not a campground.',
    costDisplay:'Free traveler facility; not a campground.',
    costIsFree:true,
    showers:'No',
    access:'Paved state-highway traveler facility; 2WD accessible. This is not a campground.',
    amenities:details.length?details.join('; '):'Restrooms, paved parking, picnic/pet amenities, and traveler services as posted by MDOT.',
    description:'Official MDOT GIS point for a '+facilityType.toLowerCase()+'. This app tracks overnight parking status separately and does not imply camping is allowed.',
    reviewSummary:'Official MDOT live GIS record. Verify posted rules before overnight use.',
    locationPrecision:'Official MDOT GIS point'
  };
}
function mapMdotRoadsideParkFeature(feature){
  const a=arcgisAttrs(feature), g=arcgisGeom(feature);
  const lat=normalizedLat(g.y), lng=normalizedLng(g.x);
  if(!validMichiganPoint(lat,lng))return null;
  const name=String(a.Name||'MDOT Roadside Park').trim();
  const status=String(a.Status||'Open');
  const isScenic=/scenic|view|overlook|turnout|bluffs/i.test(name);
  const facilityType=isScenic?'Scenic Turnout':'Roadside Park';
  return {
    id:'mi-mdot-live-roadside-'+cleanSlug(name+'-'+(a.OBJECTID||'')),
    sourceId:a.GlobalId||a.OBJECTID||'',
    name:name,
    lat:lat,
    lng:lng,
    stateCode:'MI',
    stateName:'Michigan',
    layer:'rest-truck',
    subtype:isScenic?'scenic-turnout':'roadside-park',
    siteForm:'traveler-facility',
    facilityType:facilityType,
    owner:'Michigan Department of Transportation',
    ownerLevel:'State/MDOT',
    layerLabel:'Rest Areas & Roadside Stops',
    travelerUse:travelerUseForFacility(facilityType),
    currentStatus:status,
    overnightParking:'Unknown',
    seasonStatus:currentStatusToSeason(status,facilityType),
    seasonNotes:(a.ClosureDetails?String(a.ClosureDetails):'MDOT official GIS status: '+status+'. Many roadside parks are seasonal; verify posted signs and current MDOT status.'),
    honoree:a.HonoreeName||'',
    website:MDOT_LIVE_REST_ROADSIDE.roadsideParks.officialPage,
    sourceUrl:MDOT_LIVE_REST_ROADSIDE.roadsideParks.serviceUrl,
    sourceName:MDOT_LIVE_REST_ROADSIDE.roadsideParks.label,
    lastChecked:MDOT_LIVE_REST_ROADSIDE.lastChecked,
    cost:'Free traveler facility; not a campground.',
    costDisplay:'Free traveler facility; not a campground.',
    costIsFree:true,
    showers:'No',
    access:'State-highway roadside facility; generally 2WD accessible when open. This is not a campground.',
    amenities:'Roadside park or scenic-view stop; amenities vary by site and season.',
    description:'Official MDOT GIS point for a '+facilityType.toLowerCase()+'. This app tracks overnight parking status separately and does not imply camping is allowed.',
    reviewSummary:'Official MDOT live GIS record. Verify posted rules before overnight use.',
    locationPrecision:'Official MDOT GIS point'
  };
}
async function fetchArcgisFeatures(source,mapFn){
  const response=await fetch(arcgisQueryUrl(source.serviceUrl),{cache:'no-store'});
  if(!response.ok)throw new Error(source.label+' request failed: '+response.status);
  const data=await response.json();
  if(data.error)throw new Error(source.label+' error: '+(data.error.message||'ArcGIS error'));
  return (Array.isArray(data.features)?data.features:[]).map(mapFn).filter(Boolean);
}
function mergeUniqueSites(base,extra){
  const ids=new Set(base.map(function(site){return site&&site.id;}));
  const keys=new Set(base.map(function(site){return [String(site&&site.name||'').toLowerCase(),Number(site&&site.lat||0).toFixed(4),Number(site&&site.lng||0).toFixed(4)].join('|');}));
  (extra||[]).forEach(function(site){
    const key=[String(site&&site.name||'').toLowerCase(),Number(site&&site.lat||0).toFixed(4),Number(site&&site.lng||0).toFixed(4)].join('|');
    if(site&&!ids.has(site.id)&&!keys.has(key)){base.push(site);ids.add(site.id);keys.add(key);}
  });
  return base;
}
async function loadMdotLiveRestRoadside(code){
  if(code!=='MI'||!MDOT_LIVE_REST_ROADSIDE.enabled)return [];
  try{
    const results=await Promise.all([
      fetchArcgisFeatures(MDOT_LIVE_REST_ROADSIDE.restAreas,mapMdotRestAreaFeature),
      fetchArcgisFeatures(MDOT_LIVE_REST_ROADSIDE.roadsideParks,mapMdotRoadsideParkFeature)
    ]);
    const combined=[].concat(results[0],results[1]);
    app.restRoadsideStats={source:'MDOT live',fallback:false,restWelcome:results[0].length,roadsideScenic:results[1].length,total:combined.length,lastChecked:MDOT_LIVE_REST_ROADSIDE.lastChecked};
    window.CAMPING_MDOT_LIVE_REST_ROADSIDE_COUNT=combined.length;
    return combined;
  }catch(err){
    console.warn('MDOT live rest/roadside load failed; using static fallback if available.',err);
    try{
      await loadScriptOnce(MDOT_LIVE_REST_ROADSIDE.fallbackFile,'data-state-file','MI-mdot-rest-roadside-static-fallback');
      const fallbackItems=(window.CAMPING_MI_REST_ROADSIDE_SUPPLEMENT||[]);
      app.restRoadsideStats={source:'static fallback',fallback:true,restWelcome:0,roadsideScenic:fallbackItems.length,total:fallbackItems.length,lastChecked:MDOT_LIVE_REST_ROADSIDE.lastChecked};
      return fallbackItems.map(function(site){
        const out=Object.assign({},site);
        out.reviewSummary=(out.reviewSummary||'')+' Static fallback shown because MDOT live GIS did not load.';
        out.sourceName=out.sourceName||'Static fallback, verify against MDOT GIS';
        return out;
      });
    }catch(fallbackErr){
      console.warn('MDOT static fallback also failed.',fallbackErr);
      return [];
    }
  }
}
async function loadMiLocalTravelerStops(){
  try{
    await loadScriptOnce('data/mi-local-traveler-stops-v23.0.17.js','data-state-file','MI-local-traveler-stops-v23_0_17');
    const items=window.CAMPING_MI_LOCAL_TRAVELER_STOPS||[];
    return Array.isArray(items)?items:[];
  }catch(err){
    console.warn('Michigan local traveler stops supplement failed to load.',err);
    return [];
  }
}
async function loadMiOvernightParking(){
  try{
    await loadScriptOnce('data/mi-overnight-parking-v23.0.21.js','data-state-file','MI-overnight-parking-v23_0_21');
    const items=window.CAMPING_MI_OVERNIGHT_PARKING||[];
    return Array.isArray(items)?items:[];
  }catch(err){
    console.warn('Michigan overnight parking supplement failed to load.',err);
    return [];
  }
}
async function loadMiPrivateRvParks(){
  try{
    await loadScriptOnce('data/mi-private-rv-parks-v23.0.21.js','data-state-file','MI-private-rv-parks-v23_0_21');
    const items=window.CAMPING_MI_PRIVATE_RV_PARKS||[];
    return Array.isArray(items)?items:[];
  }catch(err){
    console.warn('Michigan private RV park supplement failed to load.',err);
    return [];
  }
}
async function loadState(code){if(app.stateData[code])return Promise.resolve(); const row=manifestEntries().find(s=>s.code===code); const files=row?(Array.isArray(row.files)&&row.files.length?row.files:(row.file?[row.file]:[])):[]; if(!files.length){app.stateData[code]=[];return Promise.resolve()} window.CAMPING_STATE_DATA=window.CAMPING_STATE_DATA||{}; for(const file of files){await loadScriptOnce(file,'data-state-file',`${code}-${file.replace(/[^a-zA-Z0-9_-]/g,'_')}`)} const base=(window.CAMPING_STATE_DATA&&window.CAMPING_STATE_DATA[code])||[]; if(code==='MI'){const mdot=await loadMdotLiveRestRoadside(code); mergeUniqueSites(base,mdot); const localStops=await loadMiLocalTravelerStops(); mergeUniqueSites(base,localStops); const privateRvParks=await loadMiPrivateRvParks(); mergeUniqueSites(base,privateRvParks); const overnightParking=await loadMiOvernightParking(); mergeUniqueSites(base,overnightParking);} app.stateData[code]=base;}

function getPendingSites(){const raw=window.CAMPING_PENDING_SITES||window.CAMPING_PENDING||[];return Array.isArray(raw)?raw.map(s=>Object.assign({pending:true},s)):[]}
function markerIcon(site){const key=layerKey(site);const d=layerDef(key);const size=markerSizeForLayer(key);const anchor=Math.round(size/2);return L.divIcon({className:'',html:`<span class="map-pin ${d.css}">${d.icon}</span>`,iconSize:[size,size],iconAnchor:[anchor,anchor],popupAnchor:[0,-anchor]})}
function isTravelerStop(site){return layerKey(site)==='rest-truck'}
function restRoadsideDiagnosticText(){
  const st=app.restRoadsideStats;
  if(!(st&&app.enabledStates.has('MI')))return '';
  const pieces=[`Roadside stops source: ${st.source}`,`${st.total} loaded`];
  pieces.push(st.fallback?'fallback used':'fallback not used');
  if(st.restWelcome!=null)pieces.push(`${st.restWelcome} rest/welcome · ${st.roadsideScenic} roadside/scenic`);
  if(st.lastChecked)pieces.push(`checked ${st.lastChecked}`);
  return pieces.join(' · ');
}
function updateRestRoadsideDiagnostics(){
  const text=restRoadsideDiagnosticText();
  ['dataStats','restRoadsideStats'].forEach(id=>{
    const el=$(id);
    if(!el)return;
    el.textContent=text;
    el.hidden=!text;
  });
}
function siteText(site){return Object.values(site||{}).filter(v=>typeof v==='string'||typeof v==='number').join(' ').toLowerCase()}
function siteMatches(site){const key=layerKey(site); if(key==='info')return false; if(!app.enabledLayers.has(key))return false; const text=siteText(site); const max=app.filters.maxCost||''; if(max){if(max==='0'){if(!(site.costIsFree||/\bfree\b|no fee|\$0/.test(text)))return false}else{const nums=[...text.matchAll(/\$\s*(\d+(?:\.\d+)?)/g)].map(m=>Number(m[1])); if(!site.costIsFree&&!/\bfree\b|no fee|\$0/.test(text)&&(nums.length===0||Math.min(...nums)>Number(max)))return false}} if(app.filters.access){if(app.filters.access==='2wd'&&!/2wd|passenger car|paved|gravel road|easy access/.test(text))return false; if(app.filters.access==='hc'&&!/high clearance|rough road|two[- ]track/.test(text))return false; if(app.filters.access==='4wd'&&!/4wd|four[- ]wheel/.test(text))return false} if(app.filters.chips&&app.filters.chips.showers&&!(/showers?:\s*(yes|available)|\bshowers\b/.test(text)&&!/no showers|showers?:\s*no/.test(text)))return false; return true}
function renderMarkers(fit){app.markerLayer.clearLayers(); const bounds=[]; app.shownSites=[]; app.sites.forEach(site=>{if(!Number.isFinite(Number(site.lat))||!Number.isFinite(Number(site.lng))||!siteMatches(site))return; const m=L.marker([Number(site.lat),Number(site.lng)],{icon:markerIcon(site)}).bindPopup(popup(site)); app.markerLayer.addLayer(m); bounds.push([Number(site.lat),Number(site.lng)]); app.shownSites.push(site)}); const total=app.sites.filter(s=>layerKey(s)!=='info'&&Number.isFinite(Number(s.lat))&&Number.isFinite(Number(s.lng))).length; const countEl=$('layerSiteCount'); if(countEl) countEl.textContent=`Showing ${app.shownSites.length} of ${total} loaded sites`; const statusEl=$('statusLine'); if(statusEl && !statusEl.dataset.lockedNotice){statusEl.innerHTML='This app is still in active development. Errors may occur but should be corrected quickly. To report issues contact: <a href="mailto:tpoirier@nmu.edu">tpoirier@nmu.edu</a>'; statusEl.dataset.lockedNotice='1';} updateRestRoadsideDiagnostics(); updateFilterStatus(); renderReferences(); if(fit){fitSelectedStateView()}}
function popup(s){const lat=Number(s.lat).toFixed(6),lng=Number(s.lng).toFixed(6);const links=[];if(s.website)links.push(`<a href="${esc(s.website)}" target="_blank" rel="noopener">Website</a>`); const sourceLink=restRoadsideSourceLink(s); if(sourceLink)links.push(sourceLink);const rows=[['Type',layerDef(layerKey(s)).label],['Traveler stop',isTravelerStop(s)?'Yes — useful for a short public pull-off/rest stop.':''],['Camping',isTravelerStop(s)?'Not implied. Use overnight-parking status and posted rules separately.':''],['Facility',s.facilityType],['Useful for',s.travelerUse],['Owner level',s.ownerLevel],['Current status',s.currentStatus],['Overnight parking',s.overnightParking],['Season status',s.seasonStatus],['Season notes',s.seasonNotes],['Route',s.routeName],['Direction',s.routeDirection],['Mile marker',s.mileMarker],['Honoree',s.honoree],['Cost',s.costDisplay||s.cost],['Showers',s.showers],['Access',s.access],['Amenities',s.amenities],['Season',s.season],['Rating',s.rating],['Source',s.sourceName],['Location precision',s.locationPrecision],['Last checked',s.lastChecked]].filter(r=>r[1]);return `<div><div class="popup-title">${esc(s.name||'Unnamed site')}</div><div class="popup-meta">${esc(s.stateName||s.stateCode||'')} · ${lat}, ${lng}</div><div class="popup-grid">${rows.map(r=>`<div class="popup-row"><strong>${esc(r[0])}</strong><span>${esc(r[1])}</span></div>`).join('')}</div>${s.description?`<div class="popup-copy">${esc(s.description)}</div>`:''}${links.length?`<div class="popup-actions">${links.join('')}</div>`:''}<div class="popup-actions"><button class="secondary" onclick="navigator.clipboard&&navigator.clipboard.writeText('${lat}, ${lng}')">Copy coordinates</button><a class="secondary" target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query=${lat},${lng}">Google Maps</a><a class="secondary" target="_blank" rel="noopener" href="https://maps.apple.com/?ll=${lat},${lng}&q=${encodeURIComponent(s.name||'Camping site')}">Apple Maps</a></div></div>`}
function updateFilterStatus(){let parts=[];if(app.filters.maxCost==='0')parts.push('Free');else if(app.filters.maxCost)parts.push('≤ $'+app.filters.maxCost);if(app.filters.access)parts.push(app.filters.access.toUpperCase());if(app.filters.chips&&app.filters.chips.showers)parts.push('Showers');$('filterStatus').textContent=parts.length?`Filters active: ${parts.join(' · ')}`:'No filters active.'}
function runSearch(){const q=$('searchInput').value.trim();const out=$('searchResults');out.innerHTML='';if(!q)return;const coord=q.match(/^\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\s*$/);if(coord){app.map.setView([Number(coord[1]),Number(coord[2])],13);return}const hits=app.sites.filter(s=>siteText(s).includes(q.toLowerCase())).slice(0,12);out.innerHTML=hits.length?hits.map(s=>`<button class="search-result" type="button" data-lat="${s.lat}" data-lng="${s.lng}"><strong>${esc(s.name)}</strong><br><span class="muted">${esc(s.stateName||s.stateCode||'')} · ${esc(layerDef(layerKey(s)).label)}</span></button>`).join(''):'<div class="mini-note">No loaded matching sites.</div>';$$('.search-result',out).forEach(b=>b.onclick=()=>app.map.setView([Number(b.dataset.lat),Number(b.dataset.lng)],13))}
function nearMe(){if(!navigator.geolocation)return notify('Location is not available in this browser.');navigator.geolocation.getCurrentPosition(pos=>{const ll=[pos.coords.latitude,pos.coords.longitude];app.map.setView(ll,12);if(app.userMarker)app.userMarker.remove();app.userMarker=L.marker(ll,{icon:L.divIcon({className:'',html:`<span class="map-pin pin-user">${ICONS.dot}</span>`,iconSize:[24,24],iconAnchor:[12,12]})}).addTo(app.map).bindPopup('You are here').openPopup()},()=>notify('Could not get your location.'))}
function setDraftPoint(ll){app.draftPoint=ll;if(app.draftMarker)app.draftMarker.remove();app.draftMarker=L.marker(ll,{icon:L.divIcon({className:'',html:`<span class="map-pin pin-draft">${ICONS.draft}</span>`,iconSize:[24,24],iconAnchor:[12,12]})}).addTo(app.map);$('draftCoords').textContent=`Draft point: ${ll.lat.toFixed(6)}, ${ll.lng.toFixed(6)}`;openModal('addSiteModal')}
function clearDraft(){if(app.draftMarker)app.draftMarker.remove();app.draftMarker=null;app.draftPoint=null;$('draftCoords').textContent='No draft point selected.';['draftName','draftWebsite','draftNotes','draftCost','draftShowers','draftAccess','draftAmenities','draftTrailheads','draftSeason','draftReview','draftRating','draftExtraLinks'].forEach(id=>$(id).value='')}
function draftPayload(){const p=app.draftPoint;return {name:$('draftName').value.trim(),lat:p?p.lat:null,lng:p?p.lng:null,stateCode:$('draftState').value.trim().toUpperCase(),layer:$('draftCategory').value,website:$('draftWebsite').value.trim(),description:$('draftNotes').value.trim(),cost:$('draftCost').value.trim(),showers:$('draftShowers').value.trim(),access:$('draftAccess').value.trim(),amenities:$('draftAmenities').value.trim(),trailheads:$('draftTrailheads').value.trim(),season:$('draftSeason').value.trim(),reviewSummary:$('draftReview').value.trim(),rating:$('draftRating').value.trim(),extraLinks:$('draftExtraLinks').value.trim()}}
function appendDraft(){const d=draftPayload();if(!d.name)return notify('Add a site name first.');const line=JSON.stringify(d);app.draftQueue.push(line);saveJson(STORE.queue,app.draftQueue);$('draftQueue').value=app.draftQueue.join('\n');notify('Draft appended to queue.');openModal('queueModal')}
async function copyQueue(){try{await navigator.clipboard.writeText($('draftQueue').value);notify('Queue copied.')}catch{notify('Clipboard blocked; select and copy manually.')}}
async function initSupabase(){const cfg=window.CAMPING_SUPABASE_CONFIG;if(!cfg||!window.supabase){$('supabaseStatus').textContent='Static fallback mode.';return}app.supabase=window.supabase.createClient(cfg.url,cfg.anonKey,{db:{schema:cfg.schema||'public'}});const {data}=await app.supabase.auth.getSession();app.session=data.session||null;$('supabaseStatus').textContent=app.session?'Signed in.':'Supabase ready; not signed in.'}
async function signIn(e){e.preventDefault();if(!app.supabase)return notify('Supabase config is not loaded.');const email=$('sbEmail').value.trim(),password=$('sbPassword').value;const {error}=await app.supabase.auth.signInWithPassword({email,password});if(error)return notify(error.message,5000);app.session=(await app.supabase.auth.getSession()).data.session;$('supabaseStatus').textContent='Signed in.'}
async function signOut(){if(!app.supabase)return;await app.supabase.auth.signOut();app.session=null;$('supabaseStatus').textContent='Signed out.'}
async function sendDraftSupabase(){const d=draftPayload();if(!d.name)return notify('Add a site name first.');if(!app.supabase||!app.session)return notify('Sign in to Supabase first, or use the manual queue.');notify('Supabase insert is not enabled in this integrated rebuild yet; added to manual queue instead.',5000);appendDraft()}
function boot(){initState();initMap();buildControls();initSupabase().catch(()=>{});loadEnabledStates(true).catch(e=>{console.error(e);setLoading(false);notify('Map load failed.');});}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
