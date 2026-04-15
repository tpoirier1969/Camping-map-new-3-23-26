
(function(){
  const VERSION='v22.3.12';
  const DEFAULT_STATE_CODE='MI';
  

const ALL_STATES=[{"code":"AL","name":"Alabama"},{"code":"AK","name":"Alaska"},{"code":"AZ","name":"Arizona"},{"code":"AR","name":"Arkansas"},{"code":"CA","name":"California"},{"code":"CO","name":"Colorado"},{"code":"CT","name":"Connecticut"},{"code":"DE","name":"Delaware"},{"code":"FL","name":"Florida"},{"code":"GA","name":"Georgia"},{"code":"HI","name":"Hawaii"},{"code":"ID","name":"Idaho"},{"code":"IL","name":"Illinois"},{"code":"IN","name":"Indiana"},{"code":"IA","name":"Iowa"},{"code":"KS","name":"Kansas"},{"code":"KY","name":"Kentucky"},{"code":"LA","name":"Louisiana"},{"code":"ME","name":"Maine"},{"code":"MD","name":"Maryland"},{"code":"MA","name":"Massachusetts"},{"code":"MI","name":"Michigan"},{"code":"MN","name":"Minnesota"},{"code":"MS","name":"Mississippi"},{"code":"MO","name":"Missouri"},{"code":"MT","name":"Montana"},{"code":"NE","name":"Nebraska"},{"code":"NV","name":"Nevada"},{"code":"NH","name":"New Hampshire"},{"code":"NJ","name":"New Jersey"},{"code":"NM","name":"New Mexico"},{"code":"NY","name":"New York"},{"code":"NC","name":"North Carolina"},{"code":"ND","name":"North Dakota"},{"code":"OH","name":"Ohio"},{"code":"OK","name":"Oklahoma"},{"code":"OR","name":"Oregon"},{"code":"PA","name":"Pennsylvania"},{"code":"RI","name":"Rhode Island"},{"code":"SC","name":"South Carolina"},{"code":"SD","name":"South Dakota"},{"code":"TN","name":"Tennessee"},{"code":"TX","name":"Texas"},{"code":"UT","name":"Utah"},{"code":"VT","name":"Vermont"},{"code":"VA","name":"Virginia"},{"code":"WA","name":"Washington"},{"code":"WV","name":"West Virginia"},{"code":"WI","name":"Wisconsin"},{"code":"WY","name":"Wyoming"}];
  function normalizeManifestInput(raw){
    const states = Array.isArray(raw?.states) ? raw.states.slice() : Object.values(raw||{});
    const byCode = new Map(states.filter(Boolean).map(s=>[String(s.code||'').toUpperCase(), {code:String(s.code||'').toUpperCase(), name:s.name||'', file:s.file||'', count:Number(s.count||0)}]));
    return {states: ALL_STATES.map(s=>{ const hit=byCode.get(s.code)||{}; return {code:s.code, name:s.name, file:hit.file||'', count:Number(hit.count||0)}; })};
  }
  const staticManifest=normalizeManifestInput(window.CAMPING_STATES_MANIFEST||window.CAMPING_MANIFEST||{states:[]});
  window.CAMPING_STATE_DATA=window.CAMPING_STATE_DATA||{};
  const STORAGE_KEYS={
    enabledStates:'campingMap.enabledStates.v2234',
    enabledLayers:'campingMap.enabledLayers.v2234',
    basemap:'campingMap.basemap.v2234',
    draftQueue:'campingMap.draftQueue.v2234',
    showPending:'campingMap.showPending.v2234'
  };
  const layerDefs=[
    {key:'federal-modern',label:'Federal · Modern',css:'pin-federal-modern'},
    {key:'federal-rustic',label:'Federal · Rustic',css:'pin-federal-rustic'},
    {key:'state-modern',label:'State · Modern',css:'pin-state-modern'},
    {key:'state-rustic',label:'State · Rustic',css:'pin-state-rustic'},
    {key:'local-modern',label:'Local · Modern',css:'pin-local-modern'},
    {key:'local-rustic',label:'Local · Rustic',css:'pin-local-rustic'},
    {key:'private-modern',label:'Private · Modern',css:'pin-private-modern'},
    {key:'private-rustic',label:'Private · Rustic',css:'pin-private-rustic'},
    {key:'boondocking',label:'Boondocking / dispersed',css:'pin-boondocking'},
    {key:'info',label:'Info / reference',css:'pin-info'},
    {key:'pending',label:'Needs Verification',css:'pin-draft'}
  ];
  const groupKeys={
    rustic:['federal-rustic','state-rustic','local-rustic','private-rustic','boondocking'],
    modern:['federal-modern','state-modern','local-modern','private-modern']
  };

  const app={
    map:null, markerGroup:null, locateMarker:null, draftMarker:null,
    baseLayerDefs:{}, activeBaseLayers:[],
    enabledLayers:new Set(loadStoredArray(STORAGE_KEYS.enabledLayers, layerDefs.filter(d=>d.key!=='pending').map(d=>d.key))),
    enabledStates:new Set(),
    statePromises:{}, loadedStates:new Set(),
    allSelectedSites:[], visibleSites:[], didInitialFit:false,
    basemapKey:localStorage.getItem(STORAGE_KEYS.basemap)||'topo',
    draftQueue:loadStoredArray(STORAGE_KEYS.draftQueue,[]), draftPoint:null,
    lastRenderInfo:{markers:0,multiplier:1,zoom:0,grid:0},
    manifest:staticManifest,
    dataMode:'static',
    supabase:null, supabaseSession:null, supabaseSitesVerified:[], supabaseSitesPending:[], localPendingSites:[], localPendingLoaded:false, syncBusy:false
  };
  if(localStorage.getItem(STORAGE_KEYS.showPending)==='1') app.enabledLayers.add('pending');
  app.enabledStates = normalizeEnabledStates(loadStoredArray(STORAGE_KEYS.enabledStates,[DEFAULT_STATE_CODE]));
  window.__campingApp = app;

  const els={
    version:gid('versionTag'), menuToggle:gid('menuToggle'), sidebar:gid('sidebar'), closeSidebar:gid('closeSidebar'),
    statusLine:gid('statusLine'), stateSelect:gid('stateSelect'), stateSelectMeta:gid('stateSelectMeta'), layerList:gid('layerList'), mapLegendDesktop:gid('mapLegendDesktop'), mapLegendMobile:gid('mapLegendMobile'),
    layerQuickFilters:gid('layerQuickFilters'), layerMenuSummary:gid('layerMenuSummary'), layerMenuButton:gid('layerMenuButton'), layerMenuPanel:gid('layerMenuPanel'),
    basemapSelect:gid('basemapSelect'), searchInput:gid('searchInput'), searchBtn:gid('searchBtn'), searchResults:gid('searchResults'),
    dataStats:gid('dataStats'), statusBar:gid('statusBar'), mapLoading:gid('mapLoading'), mapReadout:gid('mapReadout'),
    addMode:gid('addMode'), draftCoords:gid('draftCoords'), draftName:gid('draftName'), draftState:gid('draftState'), draftCategory:gid('draftCategory'),
    draftWebsite:gid('draftWebsite'), draftNotes:gid('draftNotes'), draftCost:gid('draftCost'), draftShowers:gid('draftShowers'), draftAccess:gid('draftAccess'), draftAmenities:gid('draftAmenities'), draftTrailheads:gid('draftTrailheads'), draftSeason:gid('draftSeason'), draftReview:gid('draftReview'), draftRating:gid('draftRating'), draftExtraLinks:gid('draftExtraLinks'), appendDraftBtn:gid('appendDraftBtn'), clearDraftBtn:gid('clearDraftBtn'),
    draftQueue:gid('draftQueue'), copyQueueBtn:gid('copyQueueBtn'), clearQueueBtn:gid('clearQueueBtn'),
    supabaseStatus:gid('supabaseStatus'), sbAuthForm:gid('sbAuthForm'), sbEmail:gid('sbEmail'), sbPassword:gid('sbPassword'), sbSignInBtn:gid('sbSignInBtn'), sbSignOutBtn:gid('sbSignOutBtn'),
    sendDraftSupabaseBtn:gid('sendDraftSupabaseBtn'), showPendingLayer:gid('showPendingLayer'), pendingMeta:gid('pendingMeta')
  };

  els.version.textContent=VERSION;
  els.draftQueue.value=app.draftQueue.join('\n');
  els.basemapSelect.value=app.basemapKey;
  els.showPendingLayer.checked=app.enabledLayers.has('pending');

  function gid(id){return document.getElementById(id)}
  function loadStoredArray(key,fallback){try{const raw=localStorage.getItem(key); if(!raw) return fallback.slice(); const parsed=JSON.parse(raw); return Array.isArray(parsed)?parsed:fallback.slice()}catch{return fallback.slice()}}
  function saveSet(key,setObj){localStorage.setItem(key,JSON.stringify(Array.from(setObj)))}
  function currentManifest(){return app.manifest||{states:[]}}
  function normalizeEnabledStates(arr){const valid=new Set((currentManifest().states||[]).map(s=>s.code)); const picked=(Array.isArray(arr)?arr:[]).filter(code=>valid.has(code)); if(picked.length===1) return new Set(picked); if(picked.length===valid.size && valid.size) return new Set(picked); if(valid.has(DEFAULT_STATE_CODE)) return new Set([DEFAULT_STATE_CODE]); const first=(currentManifest().states||[])[0]; return new Set(first?[first.code]:[])}
  function ensureEnabledStatesValid(){app.enabledStates=normalizeEnabledStates(Array.from(app.enabledStates)); saveSet(STORAGE_KEYS.enabledStates, app.enabledStates)}
  function escapeHtml(str){return String(str||'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}
  const DETAIL_HEADER='[Camping Map Details]';
  const DETAIL_FIELDS=[
    ['access','Access'],['amenities','Amenities'],['trailheads','Trailheads / nearby'],['season','Season / closures'],['reviewSummary','Review summary'],['rating','Rating'],['extraLinks','Extra links'],['imageLinks','Image links']
  ];
  const DETAIL_LABEL_TO_KEY=new Map(DETAIL_FIELDS.map(([key,label])=>[label.toLowerCase(),key]));
  function textValue(value){return String(value==null?'':value).trim()}
  function isUsefulText(value){return !!textValue(value)}
  function safeExternalUrl(value){const raw=textValue(value); if(!raw) return ''; try{const url=new URL(raw); return /^https?:$/.test(url.protocol)?url.href:'';}catch{return ''}}
  function prettyHostLabel(url){try{const u=new URL(url); return u.hostname.replace(/^www\./,'');}catch{return 'link'}}
  function splitStructuredDetails(raw){
    const text=String(raw||'').replace(/\r/g,'').trim();
    if(!text) return {body:'',fields:{}};
    const idx=text.indexOf(DETAIL_HEADER);
    if(idx===-1) return {body:text,fields:{}};
    const body=text.slice(0,idx).trim();
    const block=text.slice(idx+DETAIL_HEADER.length).trim();
    const fields={};
    let current='';
    block.split(/\n+/).forEach(line=>{
      const match=line.match(/^([^:]+):\s*(.*)$/);
      if(match){
        const key=DETAIL_LABEL_TO_KEY.get(match[1].trim().toLowerCase())||'';
        current=key;
        if(key) fields[key]=match[2].trim();
      } else if(current && line.trim()) {
        fields[current]=`${fields[current]} ${line.trim()}`.trim();
      }
    });
    return {body,fields};
  }
  function buildStructuredDetails(fields){
    const lines=[];
    DETAIL_FIELDS.forEach(([key,label])=>{const value=textValue(fields[key]); if(value) lines.push(`${label}: ${value}`);});
    return lines.length?`${DETAIL_HEADER}\n${lines.join('\n')}`:'';
  }
  function normalizeReviewNotes(value){
    const raw=textValue(value);
    if(!raw) return '';
    if(/^Draft added from map UI\.?$/i.test(raw)) return '';
    if(/^Verified from map popup\.?$/i.test(raw)) return '';
    return raw;
  }
  function parseLinkEntries(value){
    const raw=String(value||'').replace(/\r/g,'').trim();
    if(!raw) return [];
    const out=[];
    raw.split(/\n+/).forEach(line=>{
      const entry=line.trim();
      if(!entry) return;
      let label=''; let url='';
      let match=entry.match(/^(.*?)\s*(?:\|\||\||::)\s*(https?:\/\/\S+)$/i);
      if(match){ label=match[1].trim(); url=match[2].trim(); }
      else {
        const urlMatch=entry.match(/https?:\/\/\S+/i);
        if(urlMatch){ url=urlMatch[0].trim(); label=entry.replace(urlMatch[0],'').replace(/^[-–—:|\s]+|[-–—:|\s]+$/g,'').trim(); }
      }
      const safe=safeExternalUrl(url||entry);
      if(safe) out.push({label:label||prettyHostLabel(safe), url:safe});
    });
    return out;
  }
  function uniqueLinks(entries){const seen=new Set(); const out=[]; entries.forEach(item=>{if(!item||!item.url) return; const key=item.url.toLowerCase(); if(seen.has(key)) return; seen.add(key); out.push(item);}); return out;}
  function siteDetailBundle(site){
    const parsed=splitStructuredDetails(site.description||'');
    const fields={...parsed.fields};
    ['access','amenities','trailheads','season','reviewSummary','rating','extraLinks','imageLinks'].forEach(key=>{ if(isUsefulText(site[key])) fields[key]=textValue(site[key]); });
    const reviewSummary=textValue(fields.reviewSummary||normalizeReviewNotes(site.reviewNotes));
    const extraLinks=uniqueLinks([
      ...parseLinkEntries(fields.extraLinks),
      ...parseLinkEntries(site.extraLinks),
      ...parseLinkEntries(site.sourceLinks)
    ]);
    const imageLinks=uniqueLinks([
      ...parseLinkEntries(fields.imageLinks),
      ...parseLinkEntries(site.imageLinks)
    ]);
    return {
      description:parsed.body,
      access:textValue(fields.access),
      amenities:textValue(fields.amenities),
      trailheads:textValue(fields.trailheads),
      season:textValue(fields.season),
      reviewSummary,
      rating:textValue(fields.rating),
      extraLinks,
      imageLinks
    };
  }
  function clearDraftFields(){
    ['draftName','draftWebsite','draftNotes','draftCost','draftShowers','draftAccess','draftAmenities','draftTrailheads','draftSeason','draftReview','draftRating','draftExtraLinks'].forEach(key=>{ if(els[key]) els[key].value=''; });
  }
  function buildDraftStructuredDescription(){
    const summary=textValue(els.draftNotes.value);
    const structured=buildStructuredDetails({
      access:els.draftAccess.value,
      amenities:els.draftAmenities.value,
      trailheads:els.draftTrailheads.value,
      season:els.draftSeason.value,
      reviewSummary:els.draftReview.value,
      rating:els.draftRating.value,
      extraLinks:els.draftExtraLinks.value,
      imageLinks:''
    });
    return [summary, structured].filter(Boolean).join('\n\n');
  }
  function notify(msg,timeout=3200){els.statusBar.textContent=msg; els.statusBar.hidden=false; clearTimeout(notify._t); notify._t=setTimeout(()=>els.statusBar.hidden=true,timeout)}
  function failBoot(message){try{els.statusLine.textContent=message||'Map failed to start.'; els.mapLoading.classList.add('hidden'); notify(message||'Map failed to start.',5000)}catch(e){console.error(e)}}
  window.addEventListener('error',()=>failBoot('Map startup hit a script error.'));
  window.addEventListener('unhandledrejection',()=>failBoot('Map startup hit a loading error.'));

  const svg={
    tent:'<svg viewBox="0 0 24 24"><path fill="currentColor" d="M3 18.5 10.8 5h2.4L21 18.5h-3.1l-5.1-9.1-2.9 4.9 1.9 4.2H9.2l-1.5-3.2-1.7 3.2H3Zm6.8 0h4.5l-2.2-5-2.3 5Z"/></svg>',
    tree:'<svg viewBox="0 0 24 24"><path fill="currentColor" d="m12 2 4 5h-2.1l3.6 4.5H15l3 3.8h-4.2V22h-3.6v-6.7H6l3-3.8H6.5L10.1 7H8L12 2Z"/></svg>',
    camper:'<svg viewBox="0 0 24 24"><path fill="currentColor" d="M4 8.5h10.6c.8 0 1.6.4 2.1 1l2.3 2.6H21a1 1 0 0 1 1 1v4.9h-1.7a2.6 2.6 0 0 1-5.1 0H9.8a2.6 2.6 0 0 1-5.1 0H3v-8.5a1 1 0 0 1 1-1Zm1.2 1.8v2.8H14v-2.8H5.2Zm11 3.1h3.2l-1.6-1.8a1.1 1.1 0 0 0-.8-.4h-.8v2.2ZM7.2 19a1.2 1.2 0 1 0 0-2.5 1.2 1.2 0 0 0 0 2.4Zm10.6 0a1.2 1.2 0 1 0 0-2.5 1.2 1.2 0 0 0 0 2.4Z"/></svg>',
    info:'<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 2.8A9.2 9.2 0 1 1 2.8 12 9.2 9.2 0 0 1 12 2.8Zm0 4a1.3 1.3 0 1 0 0 2.6 1.3 1.3 0 0 0 0-2.6Zm-1.7 5v1.8h1.1v3.6h-1.1V19h4.5v-1.8h-1.1v-5.4h-3.4Z"/></svg>',
    draft:'<svg viewBox="0 0 24 24"><path fill="currentColor" d="M4 17.5V20h2.5l8.6-8.6-2.5-2.5L4 17.5Zm12.4-9.9 1.5-1.5a1.2 1.2 0 0 1 1.7 0l.8.8a1.2 1.2 0 0 1 0 1.7l-1.5 1.5-2.5-2.5Z"/></svg>'
  };

  function legendEntries(){return [
    {css:'pin-federal-modern', label:'Federal modern', icon:svg.tent},
    {css:'pin-federal-rustic', label:'Federal rustic', icon:svg.tent},
    {css:'pin-state-modern', label:'State modern', icon:svg.tent},
    {css:'pin-state-rustic', label:'State rustic', icon:svg.tent},
    {css:'pin-local-modern', label:'Local modern', icon:svg.camper},
    {css:'pin-local-rustic', label:'Local rustic', icon:svg.camper},
    {css:'pin-private-modern', label:'Private modern', icon:svg.camper},
    {css:'pin-private-rustic', label:'Private rustic', icon:svg.camper},
    {css:'pin-boondocking', label:'Boondocking / dispersed', icon:svg.tree},
    {css:'pin-info', label:'Info / reference', icon:svg.info},
    {css:'pin-draft', label:'Needs verification', icon:svg.draft}
  ]}
  function legendGridMarkup(){return `<div class="legend-grid">${legendEntries().map(item=>`<div class="legend-item"><span class="map-pin legend-pin ${item.css}">${item.icon}</span><span>${escapeHtml(item.label)}</span></div>`).join('')}</div><div class="legend-note">Symbols and colors match the map pins.</div>`}
  function renderLegends(){
    if(els.mapLegendDesktop) els.mapLegendDesktop.innerHTML=`<h3>Map legend</h3>${legendGridMarkup()}`;
    if(els.mapLegendMobile) els.mapLegendMobile.innerHTML=legendGridMarkup();
  }
  function mountDesktopLegend(){
    if(els.mapLegendDesktop && app.map){
      const mapEl=app.map.getContainer();
      if(els.mapLegendDesktop.parentElement!==mapEl) mapEl.appendChild(els.mapLegendDesktop);
    }
  }

  
function stateNameForCode(code){const row=(currentManifest().states||[]).find(s=>s.code===code); return row?row.name:code}
function buildManifestFromSites(sites){
  const counts=new Map();
  (sites||[]).forEach(site=>{const code=String(site.stateCode||site.state_code||'').toUpperCase(); if(!code) return; counts.set(code,(counts.get(code)||0)+1)});
  return normalizeManifestInput({states:ALL_STATES.map(s=>({code:s.code,name:s.name,file:counts.get(s.code)?`data/states/${s.code}.js`:'',count:counts.get(s.code)||0}))});
}
function applyManifest(man){app.manifest=normalizeManifestInput(man&&man.states?man:staticManifest); ensureEnabledStatesValid(); buildStateSelect(); syncStateSelect();}
function buildStateSelect(){
  const sorted=(currentManifest().states||[]).slice().sort((a,b)=>a.name.localeCompare(b.name));
  els.stateSelect.innerHTML=['<option value="__ALL__">All mapped states</option>', ...sorted.map(s=>`<option value="${s.code}">${escapeHtml(s.name)} (${s.count||0})</option>`)].join('')
}
function syncStateSelect(){
  const total=(currentManifest().states||[]).length;
  const populated=(currentManifest().states||[]).filter(s=>(s.count||0)>0).length;
  const size=app.enabledStates.size;
  if(size===1){
    const only=Array.from(app.enabledStates)[0];
    els.stateSelect.value=only;
    const state=(currentManifest().states||[]).find(s=>s.code===only);
    const count=state?(state.count||0):0;
    els.stateSelectMeta.textContent=state?`${state.name} selected · ${count} mapped site${count===1?'':'s'}.`:'One state dataset is active.';
    return;
  }
  els.stateSelect.value='__ALL__';
  els.stateSelectMeta.textContent=`All ${total} states listed · ${populated} currently have mapped data. Michigan is the default startup view.`;
}
function buildLayerControls(){els.layerList.innerHTML=layerDefs.map(def=>`<label class="check small"><input type="checkbox" data-layer-toggle="${def.key}" ${app.enabledLayers.has(def.key)?'checked':''}><span class="legend-dot ${def.css}"></span><span>${escapeHtml(def.label)}</span></label>`).join(''); els.layerList.querySelectorAll('[data-layer-toggle]').forEach(i=>i.addEventListener('change',()=>{const k=i.getAttribute('data-layer-toggle'); i.checked?app.enabledLayers.add(k):app.enabledLayers.delete(k); if(k==='pending'){localStorage.setItem(STORAGE_KEYS.showPending, app.enabledLayers.has('pending')?'1':'0'); els.showPendingLayer.checked=app.enabledLayers.has('pending'); updatePendingMeta();} saveSet(STORAGE_KEYS.enabledLayers,app.enabledLayers); syncQuickFilterButtons(); queueRender(false);})); syncQuickFilterButtons(); updatePendingMeta();}
  function updateLayerMenuSummary(){els.layerMenuSummary.textContent=`${app.enabledLayers.size} of ${layerDefs.length} on`}
  function syncQuickFilterButtons(){els.layerQuickFilters.querySelectorAll('[data-layer-toggle-group]').forEach(btn=>{const name=btn.getAttribute('data-layer-toggle-group'); const keys=groupKeys[name]||[]; const allOn=keys.length && keys.every(k=>app.enabledLayers.has(k)); const anyOn=keys.some(k=>app.enabledLayers.has(k)); btn.classList.toggle('active',!!allOn); btn.classList.toggle('partial',!allOn&&anyOn)}); updateLayerMenuSummary();}
  function toggleLayerGroup(name){const keys=groupKeys[name]; if(!keys) return; const allOn=keys.every(k=>app.enabledLayers.has(k)); keys.forEach(k=>{if(allOn) app.enabledLayers.delete(k); else app.enabledLayers.add(k)}); saveSet(STORAGE_KEYS.enabledLayers,app.enabledLayers); els.layerList.querySelectorAll('[data-layer-toggle]').forEach(i=>i.checked=app.enabledLayers.has(i.getAttribute('data-layer-toggle'))); syncQuickFilterButtons(); queueRender(false)}

  function makeTile(url,opts){return L.tileLayer(url,opts)}
  function initMap(){app.map=L.map('map',{zoomControl:true,preferCanvas:true}).setView([44.9,-89.7],6); app.baseLayerDefs={
      osm:[makeTile('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'&copy; OpenStreetMap contributors'})],
      opentopo:[makeTile('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',{maxZoom:20,maxNativeZoom:17,attribution:'&copy; OpenTopoMap, OpenStreetMap contributors'})],
      topo:[makeTile('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',{maxZoom:19,attribution:'Tiles &copy; Esri'})],
      satellite:[makeTile('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',{maxZoom:19,attribution:'Tiles &copy; Esri'})]
    };
    setBasemap(app.basemapKey); app.markerGroup=L.layerGroup().addTo(app.map); app.map.on('click',e=>{if(els.addMode.checked) setDraftPoint(e.latlng.lat,e.latlng.lng)});
    app.map.on('popupopen',handlePopupOpen);
    mountDesktopLegend();
  }
  function clearBaseLayers(){app.activeBaseLayers.forEach(layer=>{if(app.map.hasLayer(layer)) app.map.removeLayer(layer)}); app.activeBaseLayers=[]}
  function setBasemap(key){const chosen=app.baseLayerDefs[key]?key:'topo'; app.basemapKey=chosen; clearBaseLayers(); app.baseLayerDefs[chosen].forEach(layer=>{layer.addTo(app.map); app.activeBaseLayers.push(layer)}); els.basemapSelect.value=chosen; localStorage.setItem(STORAGE_KEYS.basemap,chosen)}

  function stateFileFor(code){const item=(currentManifest().states||[]).find(s=>s.code===code); return (item && item.count>0 && item.file)?item.file:null}
  function staticVersionedStatePath(src){return src + (src.includes('?')?'&':'?') + 'v=' + encodeURIComponent(VERSION)}
  function loadState(code){if(window.CAMPING_STATE_DATA[code]){app.loadedStates.add(code); return Promise.resolve(window.CAMPING_STATE_DATA[code])} if(app.statePromises[code]) return app.statePromises[code]; const src=stateFileFor(code); if(!src){ app.loadedStates.add(code); window.CAMPING_STATE_DATA[code]=window.CAMPING_STATE_DATA[code]||[]; return Promise.resolve(window.CAMPING_STATE_DATA[code]); } app.statePromises[code]=new Promise((resolve,reject)=>{const script=document.createElement('script'); script.src=staticVersionedStatePath(src); script.async=true; script.onload=()=>{app.loadedStates.add(code); resolve(window.CAMPING_STATE_DATA[code]||[])}; script.onerror=()=>reject(new Error('Could not load '+src)); document.head.appendChild(script)}); return app.statePromises[code]}

  function loadLocalPending(){
    if(app.localPendingLoaded) return Promise.resolve(app.localPendingSites);
    if(Array.isArray(window.CAMPING_PENDING_DATA)){ app.localPendingSites=window.CAMPING_PENDING_DATA; app.localPendingLoaded=true; return Promise.resolve(app.localPendingSites); }
    if(app.localPendingPromise) return app.localPendingPromise;
    app.localPendingPromise=new Promise((resolve)=>{
      const script=document.createElement('script');
      script.src='data/pending-sites-v22.3.3.js?v=22.3.5';
      script.async=true;
      script.onload=()=>{ app.localPendingSites=Array.isArray(window.CAMPING_PENDING_DATA)?window.CAMPING_PENDING_DATA:[]; app.localPendingLoaded=true; resolve(app.localPendingSites); };
      script.onerror=()=>{ app.localPendingSites=[]; app.localPendingLoaded=true; resolve(app.localPendingSites); };
      document.head.appendChild(script);
    });
    return app.localPendingPromise;
  }

  function supabaseConfigured(){return !!(window.CAMPING_SUPABASE_CONFIG && window.supabase && typeof window.supabase.createClient==='function')}
  function getSupabaseClient(){
    if(app.supabase) return app.supabase;
    if(!supabaseConfigured()) return null;
    const cfg=window.CAMPING_SUPABASE_CONFIG;
    app.supabase=window.supabase.createClient(cfg.url,cfg.anonKey,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});
    return app.supabase;
  }
  function schemaClient(){const client=getSupabaseClient(); if(!client) return null; const schema=(window.CAMPING_SUPABASE_CONFIG&&window.CAMPING_SUPABASE_CONFIG.schema)||'camping'; return typeof client.schema==='function' ? client.schema(schema) : client; }
  function updateSupabaseUi(){
    const configured=supabaseConfigured();
    const signed=!!app.supabaseSession;
    if(!configured){ els.supabaseStatus.textContent='Static fallback mode. Sign-in is unavailable until root-level config.js provides a Supabase URL and anon key.'; }
    else if(!signed){ els.supabaseStatus.textContent='Supabase configured. Enter email and password to load verified + pending tables.'; }
    else { els.supabaseStatus.textContent=`Supabase live. Signed in as ${app.supabaseSession.user.email||'user'}.`; }
    els.sbSignInBtn.disabled=app.syncBusy;
    els.sbSignOutBtn.disabled=!configured || !signed || app.syncBusy;
    els.sendDraftSupabaseBtn.disabled=!signed || app.syncBusy;
    updatePendingMeta();
  }
  function updatePendingMeta(){
    const on=app.enabledLayers.has('pending');
    const count=app.supabaseSession ? (app.supabaseSitesPending||[]).length : (app.localPendingSites||[]).length;
    els.pendingMeta.textContent=app.supabaseSession ? `${on?'on':'off'} · ${count} pending` : `${on?'on':'off'} · ${count} local`;
  }
  async function initSupabase(){
    if(!supabaseConfigured()){ updateSupabaseUi(); return; }
    const client=getSupabaseClient();
    try{
      const {data:{session}}=await client.auth.getSession();
      app.supabaseSession=session;
      updateSupabaseUi();
      if(session){ app.dataMode='supabase'; await loadSupabaseData(true); }
      client.auth.onAuthStateChange(async (_event,session)=>{
        app.supabaseSession=session;
        updateSupabaseUi();
        if(session){ app.dataMode='supabase'; await loadSupabaseData(true); }
        else { app.dataMode='static'; app.supabaseSitesVerified=[]; app.supabaseSitesPending=[]; applyManifest(staticManifest); await refreshData(); }
      });
    } catch(err){ console.error(err); notify('Supabase session check failed. Falling back to local data.',4000); }
  }
  async function signInSupabase(ev){
    if(ev && typeof ev.preventDefault==='function') ev.preventDefault();
    if(app.syncBusy) return;
    const client=getSupabaseClient(); if(!client){ notify('Sign-in is unavailable: config.js is missing or invalid. Add the root-level config.js with your Supabase URL and anon key.',5000); updateSupabaseUi(); return; }
    const email=els.sbEmail.value.trim(); const password=els.sbPassword.value;
    if(!email || !password){ notify('Enter your email and password.'); return; }
    app.syncBusy=true; updateSupabaseUi();
    try{
      const {error}=await client.auth.signInWithPassword({email,password});
      if(error) throw error;
      notify('Signed in. Loading Supabase data…');
    } catch(err){ console.error(err); notify('Sign-in failed: '+(err.message||'Unknown error'),5000); }
    finally{ app.syncBusy=false; updateSupabaseUi(); }
  }
  async function signOutSupabase(){
    const client=getSupabaseClient(); if(!client) return;
    app.syncBusy=true; updateSupabaseUi();
    try{ await client.auth.signOut(); notify('Signed out. Static fallback restored.'); }
    catch(err){ console.error(err); notify('Sign-out failed.',4000); }
    finally{ app.syncBusy=false; updateSupabaseUi(); }
  }
  function mapDbVerified(row){ return { id:row.id, legacyId:row.legacy_id||'', name:row.name, lat:Number(row.lat), lng:Number(row.lng), stateCode:row.stateCode, stateName:row.stateName, layer:row.layer, subtype:row.subtype||'unknown', siteForm:row.siteForm||'campsite', description:row.description||'', website:row.website||'', rawCategory:row.rawCategory||'', categoryLabel:row.categoryLabel||'', sourceFolder:row.sourceFolder||'', owner:row.owner||'', layerLabel:row.layerLabel||'', cost:row.cost||'', costCheckedYear:row.costCheckedYear||row.costYear||'', showers:row.showers||'', access:row.access||'', amenities:row.amenities||'', trailheads:row.trailheads||'', season:row.season||row.seasonNotes||'', reviewSummary:row.reviewSummary||'', rating:row.rating||'', extraLinks:row.extraLinks||row.sourceLinks||'', imageLinks:row.imageLinks||'', verificationStatus:row.verificationStatus||'verified', confidence:row.confidence||0, sourceCount:row.sourceCount||0, pending:false }; }
  function mapDbPending(row){ const subtype=(row.proposedSubtype||'unknown'); return { id:row.id, legacyId:row.legacy_id||'', name:row.name, lat:Number(row.lat), lng:Number(row.lng), stateCode:row.stateCode, stateName:row.stateName, layer:row.proposedLayer||'info', subtype, siteForm:row.proposedSiteForm||'campsite', description:row.description||'', website:row.website||'', owner:'', layerLabel:'Needs verification', cost:row.cost||'', costCheckedYear:row.costCheckedYear||row.costYear||'', showers:row.showers||'', access:row.access||'', amenities:row.amenities||'', trailheads:row.trailheads||'', season:row.season||row.seasonNotes||'', reviewSummary:row.reviewSummary||'', rating:row.rating||'', extraLinks:row.extraLinks||row.sourceLinks||'', imageLinks:row.imageLinks||'', reviewFlags:Array.isArray(row.reviewFlags)?row.reviewFlags:[], reviewNotes:row.reviewNotes||'', verificationStatus:'pending', confidence:row.confidence||50, sourceCount:row.sourceCount||0, pending:true }; }
  async function loadSupabaseData(applyFit){
    if(!app.supabaseSession){ return; }
    const db=schemaClient(); if(!db){ return; }
    els.mapLoading.classList.remove('hidden');
    els.statusLine.textContent='Loading Supabase data…';
    try{
      const [{data:verified,error:verr},{data:pending,error:perr}] = await Promise.all([
        db.from('verified_sites_v').select('*').order('stateCode',{ascending:true}).order('name',{ascending:true}),
        db.from('pending_sites_v').select('*').order('stateCode',{ascending:true}).order('name',{ascending:true})
      ]);
      if(verr) throw verr;
      if(perr) throw perr;
      app.supabaseSitesVerified=(verified||[]).map(mapDbVerified);
      app.supabaseSitesPending=(pending||[]).map(mapDbPending);
      const supabaseAll = app.supabaseSitesVerified.concat(app.supabaseSitesPending);
      if(!supabaseAll.length && (staticManifest.states||[]).some(s=>Number(s.count||0)>0)) {
        notify('Supabase returned no campsite rows. Falling back to local state files.',5000);
        app.dataMode='static';
        app.supabaseSitesVerified=[]; app.supabaseSitesPending=[]; applyManifest(staticManifest);
        await refreshData(applyFit!==false);
        updatePendingMeta();
        return;
      }
      applyManifest(buildManifestFromSites(supabaseAll));
      app.dataMode='supabase';
      await refreshData(applyFit!==false);
      updatePendingMeta();
    } catch(err){
      console.error(err);
      notify('Supabase load failed. Falling back to local state files.',5000);
      app.dataMode='static';
      app.supabaseSitesVerified=[]; app.supabaseSitesPending=[]; applyManifest(staticManifest);
      await refreshData(applyFit!==false);
    } finally {
      els.mapLoading.classList.add('hidden');
    }
  }

  async function refreshData(shouldFit){
    const selected=Array.from(app.enabledStates);
    syncStateSelect();
    if(!selected.length){ app.allSelectedSites=[]; queueRender(false); return; }
    els.mapLoading.classList.remove('hidden');
    try{
      if(app.dataMode==='supabase' && app.supabaseSession){
        const set=new Set(selected);
        const verified=app.supabaseSitesVerified.filter(s=>set.has(s.stateCode));
        const pending=app.supabaseSitesPending.filter(s=>set.has(s.stateCode));
        app.allSelectedSites=verified.concat(pending);
        els.statusLine.textContent=`Supabase: ${verified.length} verified + ${pending.length} pending loaded.`;
      } else {
        els.statusLine.textContent='Loading state files…';
        await Promise.all(selected.map(loadState));
        await loadLocalPending();
        const localVerified=selected.flatMap(code=>window.CAMPING_STATE_DATA[code]||[]);
        const localPending=(app.localPendingSites||[]).filter(site=>selected.includes(site.stateCode));
        app.allSelectedSites=localVerified.concat(localPending);
        els.statusLine.textContent=`Local files: ${localVerified.length} verified + ${localPending.length} pending across ${selected.length} state file${selected.length===1?'':'s'}.`;
        updatePendingMeta();
      }
      queueRender(!!shouldFit && !app.didInitialFit);
    } catch(err){
      console.error(err);
      els.statusLine.textContent='A data source failed to load.';
      notify('A data source failed to load. Trying local state files again may help.',5000);
      if(app.dataMode==='supabase') {
        app.dataMode='static';
        app.supabaseSitesVerified=[];
        app.supabaseSitesPending=[];
        applyManifest(staticManifest);
      }
    } finally {
      els.mapLoading.classList.add('hidden');
    }
  }

  function markerClass(site){
    if(site.verificationStatus==='pending') return 'pin-draft';
    if(site.layer==='boondocking') return 'pin-boondocking';
    if(site.layer==='info') return 'pin-info';
    const key=`${site.layer}-${site.subtype}`;
    const map={
      'federal-modern':'pin-federal-modern','federal-rustic':'pin-federal-rustic','state-modern':'pin-state-modern','state-rustic':'pin-state-rustic',
      'local-modern':'pin-local-modern','local-rustic':'pin-local-rustic','private-modern':'pin-private-modern','private-rustic':'pin-private-rustic'
    };
    return map[key]||'pin-info';
  }
  function iconFor(site){
    if(site.verificationStatus==='pending') return svg.draft;
    if(site.layer==='boondocking') return svg.tree;
    if(site.layer==='info') return svg.info;
    if(site.layer==='private' || site.layer==='local') return svg.camper;
    return svg.tent;
  }
  function passesLayerFilter(site){
    if(site.verificationStatus==='pending') return app.enabledLayers.has('pending');
    if(site.layer==='boondocking') return app.enabledLayers.has('boondocking');
    if(site.layer==='info') return app.enabledLayers.has('info');
    const key=`${site.layer}-${site.subtype}`;
    return app.enabledLayers.has(key);
  }
  function subtypeLabel(site){
    if(site.verificationStatus==='pending') return 'Needs verification';
    if(site.layer==='boondocking') return 'Boondocking';
    if(site.layer==='info') return 'Info / reference';
    return `${site.layer.charAt(0).toUpperCase()+site.layer.slice(1)} ${site.subtype.charAt(0).toUpperCase()+site.subtype.slice(1)}`;
  }
  function formatCostDisplay(site){
    if(!site || site.layer==='boondocking') return '';
    const raw=textValue(site.cost);
    if(!isUsefulText(raw)) return '';
    const year=site.costCheckedYear||site.costYear||'';
    if(year && !/\(20\d{2}\)/.test(raw)) return `${raw} (${year})`;
    return raw;
  }

  function layerOptionsMarkup(selectedLayer){
    const opts=['federal','state','local','private','boondocking','info'];
    return opts.map(v=>`<option value="${v}" ${selectedLayer===v?'selected':''}>${v.charAt(0).toUpperCase()+v.slice(1)}</option>`).join('');
  }
  function subtypeOptionsMarkup(selectedSubtype){
    const opts=['modern','rustic','unknown'];
    return opts.map(v=>`<option value="${v}" ${selectedSubtype===v?'selected':''}>${v.charAt(0).toUpperCase()+v.slice(1)}</option>`).join('');
  }
  function siteFormOptionsMarkup(selected){
    const opts=['campsite','cabin','yurt','mixed','other'];
    return opts.map(v=>`<option value="${v}" ${selected===v?'selected':''}>${v.charAt(0).toUpperCase()+v.slice(1)}</option>`).join('');
  }
  function popupHtml(site){
    const nav=`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(site.lat+','+site.lng)}`;
    const details=siteDetailBundle(site);
    const rows=[];
    const sections=[];
    const pushRow=(label,value)=>{if(isUsefulText(value)) rows.push(`<div class="popup-row"><strong>${escapeHtml(label)}:</strong><span>${escapeHtml(value)}</span></div>`);};
    pushRow('Owner', site.owner);
    pushRow('Cost', formatCostDisplay(site));
    pushRow('Showers', site.showers);
    pushRow('Access', details.access);
    pushRow('Amenities', details.amenities);
    pushRow('Trailheads / nearby', details.trailheads);
    pushRow('Season / closures', details.season);
    pushRow('Rating', details.rating);
    if(site.sourceCount) pushRow('Sources', site.sourceCount);
    if(site.confidence!=null) pushRow('Confidence', site.confidence);
    if(rows.length) sections.push(`<div class="popup-grid">${rows.join('')}</div>`);
    if(details.reviewSummary) sections.push(`<div class="popup-section"><strong>Review summary</strong><div class="popup-copy">${escapeHtml(details.reviewSummary)}</div></div>`);
    if(details.description) sections.push(`<div class="popup-section"><strong>Description</strong><div class="popup-copy">${escapeHtml(details.description)}</div></div>`);
    if(site.reviewNotes && normalizeReviewNotes(site.reviewNotes) && normalizeReviewNotes(site.reviewNotes)!==details.reviewSummary){sections.push(`<div class="popup-section"><strong>Review notes</strong><div class="popup-copy">${escapeHtml(normalizeReviewNotes(site.reviewNotes))}</div></div>`);}    
    if(details.extraLinks.length){sections.push(`<div class="popup-section"><strong>Extra links</strong><div class="popup-links">${details.extraLinks.map(link=>`<a href="${escapeHtml(link.url)}" target="_blank" rel="noopener">${escapeHtml(link.label)}</a>`).join('')}</div></div>`);}    
    if(details.imageLinks.length){sections.push(`<div class="popup-section"><strong>Image links</strong><div class="popup-links">${details.imageLinks.map((link,idx)=>`<a href="${escapeHtml(link.url)}" target="_blank" rel="noopener">${escapeHtml(link.label||('image '+(idx+1)))}</a>`).join('')}</div></div>`);}    
    let verify='';
    if(site.verificationStatus==='pending'){
      verify = `<div style="margin-top:10px;padding-top:10px;border-top:1px solid #ddd;">
        <div class="mini-note" style="margin-bottom:8px;">Needs Verification workflow</div>
        <div class="row" style="margin-bottom:8px;"><select data-promote-layer="${site.id}">${layerOptionsMarkup(site.layer)}</select><select data-promote-subtype="${site.id}">${subtypeOptionsMarkup(site.subtype||'unknown')}</select></div>
        <div class="row" style="margin-bottom:8px;"><select data-promote-form="${site.id}">${siteFormOptionsMarkup(site.siteForm||'campsite')}</select></div>
        <label class="check small"><input type="checkbox" data-verify-site="${site.id}" ${!app.supabaseSession?'disabled':''}><span>Verified — move to permanent data</span></label>
        ${!app.supabaseSession?'<div class="mini-note" style="margin-top:6px;">Sign in to promote pending rows.</div>':''}
      </div>`;
    }
    return `<div class="popup-title">${escapeHtml(site.name)}</div><div class="popup-meta">${escapeHtml(site.stateName)} · ${escapeHtml(subtypeLabel(site))}</div>${sections.join('')}<div class="popup-actions"><a href="${nav}" target="_blank" rel="noopener">Navigate</a>${site.website?` <a href="${escapeHtml(site.website)}" target="_blank" rel="noopener">Website</a>`:''}</div>${verify}`;
  }
  function clusterPixelSizeForZoom(zoom){if(zoom<=3) return 170; if(zoom<=4) return 145; if(zoom<=5) return 120; if(zoom<=6) return 100; if(zoom<=7) return 82; if(zoom<=8) return 62; if(zoom<=9) return 46; if(zoom<=10) return 34; return 0}
  function aggregateSitesForZoom(sites, zoom){const gridPx=clusterPixelSizeForZoom(zoom); if(!gridPx || !app.map){return {items:sites.map(site=>({kind:'site',site})),gridPx:0};} const buckets=new Map(); sites.forEach(site=>{const p=app.map.project(L.latLng(site.lat,site.lng), zoom); const key=`${Math.floor(p.x/gridPx)}:${Math.floor(p.y/gridPx)}`; if(!buckets.has(key)) buckets.set(key,[]); buckets.get(key).push(site)}); const items=[]; buckets.forEach(bucket=>{if(bucket.length===1){items.push({kind:'site',site:bucket[0]}); return;} const lat=bucket.reduce((s,x)=>s+x.lat,0)/bucket.length; const lng=bucket.reduce((s,x)=>s+x.lng,0)/bucket.length; items.push({kind:'cluster',lat,lng,count:bucket.length,sites:bucket})}); items.sort((a,b)=>(a.kind==='cluster'?0:1)-(b.kind==='cluster'?0:1)); return {items,gridPx}}
  function siteMarkerSizeForZoom(zoom){return zoom>=11?30:24}
  function clusterMarkerSize(base, zoom){return zoom>=11?Math.round(base*1.25):base}
  function countVisibleByFamily(){const out={federal:0,state:0,local:0,private:0,boondocking:0,info:0,pending:0}; app.visibleSites.forEach(site=>{if(site.verificationStatus==='pending') out.pending+=1; else if(out[site.layer]!==undefined) out[site.layer]+=1;}); return out}
  function updateMapReadout(markerCount, zoom, multiplier){const main=els.mapReadout.querySelector('.readout-main'); const mini=els.mapReadout.querySelector('.readout-mini'); if(main) main.textContent=`Zoom ${zoom} · Cluster x${multiplier.toFixed(1)} · Markers ${markerCount}/${app.visibleSites.length}`; const byLayer=countVisibleByFamily(); if(mini) mini.textContent=`${app.dataMode==='supabase'?'Supabase':'Local'} · Loaded ${app.allSelectedSites.length} · Federal ${byLayer.federal} · State ${byLayer.state} · Local ${byLayer.local} · Private ${byLayer.private} · Boondocking ${byLayer.boondocking} · Pending ${byLayer.pending}`;}
  function queueRender(shouldFit){ if(app.renderFrame) cancelAnimationFrame(app.renderFrame); app.renderFrame=requestAnimationFrame(()=>{ app.renderFrame=null; try{ renderVisibleSites(shouldFit); } catch(err){ console.error(err); els.mapLoading.classList.add('hidden'); notify('Layer redraw hit a snag. The map recovered, but the current layer mix may be too weird.',5000); } }); }
  function renderVisibleSites(shouldFit){if(!app.map || !app.markerGroup) return; app.map.closePopup(); app.visibleSites=app.allSelectedSites.filter(passesLayerFilter); app.markerGroup.clearLayers(); const bounds=[]; const zoom=app.map.getZoom(); const agg=aggregateSitesForZoom(app.visibleSites,zoom); const rendered=agg.items; const siteSize=siteMarkerSizeForZoom(zoom); rendered.forEach(item=>{if(item.kind==='site'){const site=item.site; const icon=L.divIcon({className:'',html:`<div class="map-pin ${markerClass(site)}" style="width:${siteSize}px;height:${siteSize}px;">${iconFor(site)}</div>`,iconSize:[siteSize,siteSize],iconAnchor:[siteSize/2,siteSize/2],popupAnchor:[0,-12]}); const marker=L.marker([site.lat,site.lng],{icon,keyboard:false}); marker.bindPopup(popupHtml(site),{maxWidth:420}); marker._campSite=site; marker.addTo(app.markerGroup); bounds.push([site.lat,site.lng]);} else {const base=item.count>=40?40:item.count>=16?36:32; const size=clusterMarkerSize(base,zoom); const icon=L.divIcon({className:'',html:`<div class="map-pin pin-info" style="width:${size}px;height:${size}px;font-weight:700;">${item.count}</div>`,iconSize:[size,size],iconAnchor:[size/2,size/2]}); const marker=L.marker([item.lat,item.lng],{icon,keyboard:false}); marker.on('click',()=>{const clusterBounds=L.latLngBounds(item.sites.map(site=>[site.lat,site.lng])); if(clusterBounds.isValid()){app.map.fitBounds(clusterBounds.pad(0.30),{padding:[40,40],maxZoom:Math.min(app.map.getZoom()+2,12)});} else {app.map.setView([item.lat,item.lng],Math.min(app.map.getZoom()+2,12));}}); marker.bindPopup(`<div class="popup-title">${item.count} sites in this area</div><div class="popup-meta">Click the marker to break the cluster apart.</div>`,{maxWidth:240}); marker.addTo(app.markerGroup); bounds.push([item.lat,item.lng]);}}); if(shouldFit && bounds.length){app.map.fitBounds(bounds,{padding:[32,32]}); app.didInitialFit=true;} const markerCount=rendered.length||0; const multiplier=markerCount?app.visibleSites.length/markerCount:1; app.lastRenderInfo={markers:markerCount,multiplier,zoom,grid:agg.gridPx}; updateMapReadout(markerCount,zoom,multiplier); const stateLabel=`${app.enabledStates.size} state${app.enabledStates.size===1?'':'s'}`; if(!app.enabledLayers.size){ els.statusLine.textContent='No camping layers are enabled. Turn one back on.'; } else if(!app.visibleSites.length){ els.statusLine.textContent=`0 camping opportunities visible in ${stateLabel}.`; } else { els.statusLine.textContent=`${app.visibleSites.length} camping opportunit${app.visibleSites.length===1?'y':'ies'} in ${stateLabel} showing.`; } els.dataStats.textContent=''; els.mapLoading.classList.add('hidden'); }

  async function searchPlaces(){const q=els.searchInput.value.trim(); if(!q) return; els.searchResults.innerHTML='<div class="muted">Searching…</div>'; try{const res=await fetch('https://nominatim.openstreetmap.org/search?format=jsonv2&limit=5&q='+encodeURIComponent(q),{headers:{Accept:'application/json'}}); const data=await res.json(); if(!Array.isArray(data)||!data.length){els.searchResults.innerHTML='<div class="muted">No results found.</div>'; return;} els.searchResults.innerHTML=data.map((item,idx)=>`<div class="search-result"><div><strong>${escapeHtml(item.display_name)}</strong></div><button class="secondary" data-search-index="${idx}">Go there</button></div>`).join(''); els.searchResults.querySelectorAll('[data-search-index]').forEach(btn=>btn.addEventListener('click',()=>{const item=data[Number(btn.getAttribute('data-search-index'))]; const lat=Number(item.lat),lng=Number(item.lon); app.map.setView([lat,lng],11); if(app.locateMarker) app.map.removeLayer(app.locateMarker); app.locateMarker=L.circleMarker([lat,lng],{radius:8,color:'#d44516',weight:2,fillColor:'#ffd7c9',fillOpacity:.95}).addTo(app.map)}))}catch(err){console.error(err); els.searchResults.innerHTML='<div class="muted">Search failed. Try again in a moment.</div>'}}
  function setDraftPoint(lat,lng){app.draftPoint={lat:+lat.toFixed(6),lng:+lng.toFixed(6)}; els.draftCoords.textContent=`${app.draftPoint.lat}, ${app.draftPoint.lng}`; if(app.draftMarker) app.map.removeLayer(app.draftMarker); const icon=L.divIcon({className:'',html:`<div class="map-pin pin-draft">${svg.draft}</div>`,iconSize:[24,24],iconAnchor:[12,12]}); app.draftMarker=L.marker([lat,lng],{icon}).addTo(app.map)}
  function clearDraftPoint(){app.draftPoint=null; els.draftCoords.textContent='No draft point selected.'; if(app.draftMarker){app.map.removeLayer(app.draftMarker); app.draftMarker=null}}
  function appendDraftRecord(){if(!app.draftPoint){notify('Drop a draft pin on the map first.'); return;} const rec={name:els.draftName.value.trim()||'Untitled site',category:els.draftCategory.value,state:els.draftState.value.trim().toUpperCase()||'',lat:app.draftPoint.lat,lng:app.draftPoint.lng,website:els.draftWebsite.value.trim(),notes:els.draftNotes.value.trim()}; app.draftQueue.push(JSON.stringify(rec)); localStorage.setItem(STORAGE_KEYS.draftQueue,JSON.stringify(app.draftQueue)); els.draftQueue.value=app.draftQueue.join('\n'); notify('Draft appended to queue.');}
  function parseDraftCategory(value){if(value==='boondocking') return {layer:'boondocking', subtype:'unknown'}; if(value==='info') return {layer:'info', subtype:'unknown'}; const parts=String(value||'').split('-'); return {layer:parts[0]||'info', subtype:parts[1]||'unknown'};}
  async function sendDraftToSupabase(){
    if(!app.supabaseSession){ notify('Sign in first to send drafts to Needs Verification.'); return; }
    if(!app.draftPoint){ notify('Drop a draft pin on the map first.'); return; }
    const db=schemaClient(); if(!db){ notify('Supabase is not configured.'); return; }
    const stateCode=(els.draftState.value.trim().toUpperCase()||'');
    if(!stateCode){ notify('Enter a state code for the draft.'); return; }
    const parsed=parseDraftCategory(els.draftCategory.value);
    app.syncBusy=true; updateSupabaseUi();
    try{
      const user=app.supabaseSession.user;
      const payload={
        legacy_id:'pending-'+Date.now(),
        name:els.draftName.value.trim()||'Untitled site',
        lat:app.draftPoint.lat,
        lng:app.draftPoint.lng,
        state_code:stateCode,
        state_name:stateNameForCode(stateCode),
        layer_code:parsed.layer,
        subtype_code:parsed.subtype,
        site_form_code:'campsite',
        verification_status:'pending',
        confidence:50,
        review_notes:els.draftReview.value.trim()||els.draftNotes.value.trim()||'Draft added from map UI.',
        description:buildDraftStructuredDescription(),
        primary_url:els.draftWebsite.value.trim(),
        raw_category:'', category_label:'Needs verification', source_folder:'', owner_name:'', layer_label:'Needs verification', cost:els.draftCost.value.trim(), showers:els.draftShowers.value.trim(), is_active:true,
        created_by:user.id
      };
      const {error}=await db.from('sites').insert(payload);
      if(error) throw error;
      notify('Draft sent to Needs Verification.');
      clearDraftPoint();
      clearDraftFields();
      app.enabledLayers.add('pending'); localStorage.setItem(STORAGE_KEYS.showPending,'1');
      await loadSupabaseData(false);
      buildLayerControls();
    } catch(err){ console.error(err); notify('Pending insert failed: '+(err.message||'Unknown error'),5000); }
    finally { app.syncBusy=false; updateSupabaseUi(); }
  }
  async function promotePendingSite(siteId,popupEl){
    if(!app.supabaseSession){ notify('Sign in first to verify pending rows.'); return; }
    const db=schemaClient(); if(!db) return;
    const layerSel=popupEl.querySelector(`[data-promote-layer="${siteId}"]`);
    const subtypeSel=popupEl.querySelector(`[data-promote-subtype="${siteId}"]`);
    const formSel=popupEl.querySelector(`[data-promote-form="${siteId}"]`);
    app.syncBusy=true; updateSupabaseUi();
    try{
      const {error}=await db.rpc('promote_site',{
        p_site_id:siteId,
        p_layer_code:layerSel?layerSel.value:null,
        p_subtype_code:subtypeSel?subtypeSel.value:null,
        p_site_form_code:formSel?formSel.value:null,
        p_status:'verified',
        p_confidence:100,
        p_notes:'Verified from map popup.'
      });
      if(error) throw error;
      notify('Pending site promoted to permanent data.');
      await loadSupabaseData(false);
      if(app.map) app.map.closePopup();
    } catch(err){ console.error(err); notify('Promotion failed: '+(err.message||'Unknown error'),5000); }
    finally { app.syncBusy=false; updateSupabaseUi(); }
  }
  function handlePopupOpen(e){const popupEl=e.popup && e.popup.getElement(); if(!popupEl) return; popupEl.querySelectorAll('[data-verify-site]').forEach(box=>{box.addEventListener('change',async ev=>{if(!ev.target.checked) return; await promotePendingSite(ev.target.getAttribute('data-verify-site'), popupEl);});});}

  function bindEvents(){
    els.menuToggle.addEventListener('click',()=>els.sidebar.classList.toggle('closed'));
    els.closeSidebar.addEventListener('click',()=>els.sidebar.classList.add('closed'));
    els.basemapSelect.addEventListener('change',()=>setBasemap(els.basemapSelect.value));
    els.searchBtn.addEventListener('click',searchPlaces);
    els.searchInput.addEventListener('keydown',e=>{if(e.key==='Enter') searchPlaces()});
    els.stateSelect.addEventListener('change',async e=>{const value=e.target.value; app.enabledStates = value==='__ALL__' ? new Set((currentManifest().states||[]).map(s=>s.code)) : new Set([value]); saveSet(STORAGE_KEYS.enabledStates,app.enabledStates); await refreshData(false)});
    els.layerMenuButton.addEventListener('click',e=>{e.stopPropagation(); const opening=els.layerMenuPanel.hidden; els.layerMenuPanel.hidden=!opening; els.layerMenuButton.setAttribute('aria-expanded',String(opening));});
    document.addEventListener('click',e=>{if(!els.layerMenuPanel.hidden && !els.layerMenuPanel.contains(e.target) && !els.layerMenuButton.contains(e.target)){els.layerMenuPanel.hidden=true; els.layerMenuButton.setAttribute('aria-expanded','false');}});
    els.layerQuickFilters.querySelectorAll('[data-layer-toggle-group]').forEach(btn=>btn.addEventListener('click',()=>toggleLayerGroup(btn.getAttribute('data-layer-toggle-group'))));
    els.appendDraftBtn.addEventListener('click',appendDraftRecord);
    els.sendDraftSupabaseBtn.addEventListener('click',sendDraftToSupabase);
    els.clearDraftBtn.addEventListener('click',()=>{clearDraftPoint(); clearDraftFields();});
    els.copyQueueBtn.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(els.draftQueue.value); notify('Queue copied to clipboard.')}catch{notify('Clipboard copy failed.',3200)}});
    els.clearQueueBtn.addEventListener('click',()=>{app.draftQueue=[]; localStorage.setItem(STORAGE_KEYS.draftQueue,JSON.stringify(app.draftQueue)); els.draftQueue.value=''; notify('Queue cleared.')});
    els.sbAuthForm.addEventListener('submit',signInSupabase);
    els.sbSignOutBtn.addEventListener('click',signOutSupabase);
    els.showPendingLayer.addEventListener('change',()=>{if(els.showPendingLayer.checked) app.enabledLayers.add('pending'); else app.enabledLayers.delete('pending'); localStorage.setItem(STORAGE_KEYS.showPending, app.enabledLayers.has('pending')?'1':'0'); saveSet(STORAGE_KEYS.enabledLayers, app.enabledLayers); buildLayerControls(); queueRender(false);});
    app.map.on('zoomend',()=>queueRender(false));
  }

  renderLegends();
  initMap();
  applyManifest(staticManifest);
  buildLayerControls();
  bindEvents();
  updateSupabaseUi();
  refreshData(true);
  initSupabase();
})();
