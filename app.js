(function(){
'use strict';
const BUILD=window.CAMPING_BUILD||{};
const VERSION=BUILD.version||window.CAMPING_APP_VERSION||'dev';
const DATA_VERSION=BUILD.dataVersion||BUILD.dataBuild||window.CAMPING_DATA_VERSION||window.CAMPING_DATA_BUILD||VERSION;
window.CAMPING_RUNTIME_VERSION = VERSION;
window.CAMPING_RUNTIME_DATA_VERSION = DATA_VERSION;
function paintRuntimeVersion(){try{const vt=document.getElementById('appVersionText'); if(vt) vt.textContent=VERSION; const vb=document.getElementById('appVersionBadge'); if(vb) vb.textContent=VERSION; if(document) document.title='Boondocking & Camping Maps';}catch(_e){}}
const DEFAULT_STATE='MI';

/*
  ICON POLICY LOCK — approved by Tod.
  Do not change layer icon assignments, symbol meanings, or marker shape/color mappings
  unless Tod explicitly requests a new icon revision.
  Canonical icon mapping for this build:
  - Modern campgrounds: RV
  - Rustic / Primitive: Tent
  - Private campgrounds: Red stop-sign shape with white tent
  - Boondocking / Dispersed: Tree
  - Boat / Backpack: Backpacker along water
  - Overnight Parking: P
  - Rest Areas & Roadside Stops: reversed R
  - Needs Verification: Draft/Pencil
  - Info / Reference: Info circle
*/

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
const STORE={states:'campingMap.enabledStates.v22328',layers:'campingMap.layers.v22328',basemap:'campingMap.basemap.v22328',queue:'campingMap.draftQueue.v22328',filters:'campingMap.filters.v22328',pending:'campingMap.showPending.v22328',desktopMode:'campingMap.desktopMode.v23087',controlHome:'campingMap.controlHome.v23126',areaOutlines:'campingMap.areaOutlines.v23126',lastActive:'campingMap.lastActive.v23152'};
const SAVED_ROUTES_TABLE='boondocking_saved_routes';
const COMMUNITY_TABLES={
  profiles:'boondocking_map_profiles',
  favorites:'boondocking_map_site_favorites',
  comments:'boondocking_map_site_comments',
  corrections:'boondocking_map_site_corrections',
  adminFlags:'boondocking_map_site_admin_flags'
};
const ICONS={tent:'<svg viewBox=\"0 0 24 24\"><path fill=\"currentColor\" d=\"M3 18.5 10.8 5h2.4L21 18.5h-3.1l-5.1-9.1-2.9 4.9 1.9 4.2H9.2l-1.5-3.2-1.7 3.2H3Zm6.8 0h4.5l-2.2-5-2.3 5Z\"/></svg>',tree:'<svg viewBox=\"0 0 24 24\"><path fill=\"currentColor\" d=\"m12 2 4 5h-2.1l3.6 4.5H15l3 3.8h-4.2V22h-3.6v-6.7H6l3-3.8H6.5L10.1 7H8L12 2Z\"/></svg>',camper:'<svg viewBox=\"0 0 24 24\"><path fill=\"currentColor\" d=\"M4 8.5h10.6c.8 0 1.6.4 2.1 1l2.3 2.6H21a1 1 0 0 1 1 1v4.9h-1.7a2.6 2.6 0 0 1-5.1 0H9.8a2.6 2.6 0 0 1-5.1 0H3v-8.5a1 1 0 0 1 1-1Zm1.2 1.8v2.8H14v-2.8H5.2Zm11 3.1h3.2l-1.6-1.8a1.1 1.1 0 0 0-.8-.4h-.8v2.2ZM7.2 19a1.2 1.2 0 1 0 0-2.5 1.2 1.2 0 0 0 0 2.4Zm10.6 0a1.2 1.2 0 1 0 0-2.5 1.2 1.2 0 0 0 0 2.4Z\"/></svg>',stopTent:'<svg viewBox=\"0 0 24 24\"><path fill=\"currentColor\" d=\"M9 2.5h6l6.5 6.5v6L15 21.5H9L2.5 15V9L9 2.5Zm2 5.2-4 8h2.4l1-2h3.2l1 2H17l-4-8h-2Zm.9 4.2h.2l1 2h-2.2l1-2Z\"/></svg>',parking:'<svg viewBox=\"0 0 24 24\"><path fill=\"currentColor\" d=\"M6 3h7.4c3 0 5.1 2.1 5.1 5s-2.1 5.1-5.1 5.1H9.6V21H6V3Zm3.6 3.2v3.7h3.4c1.1 0 1.9-.7 1.9-1.9s-.8-1.8-1.9-1.8H9.6Z\"/></svg>',restR:'<svg viewBox=\"0 0 24 24\"><path fill=\"currentColor\" d=\"M6 3h7.2c3 0 5.1 1.9 5.1 4.8 0 2-1 3.5-2.8 4.3l3.3 5h-4.1L12 12.8H9.6V21H6V3Zm3.6 3v3.8h3c1.3 0 2.1-.7 2.1-1.9 0-1.2-.8-1.9-2.1-1.9h-3Z\"/></svg>',backpackerWater:'<svg viewBox=\"0 0 24 24\"><path fill=\"currentColor\" d=\"M10.2 3.3a1.7 1.7 0 1 1 0 3.4 1.7 1.7 0 0 1 0-3.4Zm1.7 4.2 2 1.1c.6.3 1 .9 1 1.5V12h-1.8v-1.3l-1.1-.6-.8 2.5 1.9 1.9v3.6h-1.8V15.3l-1.8-1.8-.8 2.4-1.6-.5 1.2-3.8.8-2.4c.3-1 1.2-1.7 2.3-1.7h.5Zm-4.7 3.7 1.5.7-1.4 2.9 1.6 1.6-1.3 1.2-2.4-2.4 2-4Zm9.4 3.3c1.1 0 2 .3 2.9.8l-.8 1.4c-.7-.3-1.3-.5-2.1-.5-1.2 0-1.8.5-2.6 1.1-.8.6-1.7 1.3-3.2 1.3-1.4 0-2.4-.6-3.2-1.3-.7-.5-1.4-1.1-2.6-1.1-.7 0-1.4.2-2 .5L2 16c.9-.5 1.8-.8 2.9-.8 1.7 0 2.7.7 3.5 1.4.7.5 1.2 1 2.3 1 .9 0 1.5-.4 2.2-1 .9-.8 2-1.6 3.7-1.6Zm.9 4c.7 0 1.4.2 2.1.5l-.8 1.4c-.4-.2-.8-.3-1.3-.3-.8 0-1.2.3-1.9.8-.7.5-1.6 1.1-3 1.1-1.3 0-2.2-.6-2.9-1-.6-.4-1-.7-1.8-.7-.5 0-.9.1-1.3.3l-.8-1.4c.7-.3 1.3-.5 2.1-.5 1.3 0 2.2.6 2.9 1 .6.4 1 .7 1.8.7.9 0 1.4-.3 2-.8.8-.5 1.7-1.1 2.9-1.1Z\"/></svg>',info:'<svg viewBox=\"0 0 24 24\"><path fill=\"currentColor\" d=\"M12 2.8A9.2 9.2 0 1 1 2.8 12 9.2 9.2 0 0 1 12 2.8Zm0 4a1.3 1.3 0 1 0 0 2.6 1.3 1.3 0 0 0 0-2.6Zm-1.7 5v1.8h1.1v3.6h-1.1V19h4.5v-1.8h-1.1v-5.4h-3.4Z\"/></svg>',draft:'<svg viewBox=\"0 0 24 24\"><path fill=\"currentColor\" d=\"M4 17.5V20h2.5l8.6-8.6-2.5-2.5L4 17.5Zm12.4-9.9 1.5-1.5a1.2 1.2 0 0 1 1.7 0l.8.8a1.2 1.2 0 0 1 0 1.7l-1.5 1.5-2.5-2.5Z\"/></svg>',navArrow:'<svg viewBox=\"0 0 28 28\"><circle cx=\"14\" cy=\"14\" r=\"11.5\" fill=\"#ffffff\"/><path fill=\"#1e78ff\" d=\"M14 3.8 20.8 21l-6.8-3.2L7.2 21 14 3.8Z\"/><circle cx=\"14\" cy=\"14\" r=\"11.5\" fill=\"none\" stroke=\"rgba(18,69,140,.22)\" stroke-width=\"1\"/></svg>',dot:'<svg viewBox=\"0 0 24 24\"><circle cx=\"12\" cy=\"12\" r=\"6\" fill=\"currentColor\"/></svg>'};
const LAYERS=[
 {key:'boondocking',label:'Boondocking / dispersed',css:'pin-boondocking',icon:ICONS.tree},
 {key:'rustic',label:'Rustic campgrounds',css:'pin-rustic',icon:ICONS.tent},
 {key:'modern',label:'Modern campgrounds',css:'pin-modern',icon:ICONS.camper},
 {key:'private',label:'Private campgrounds',css:'pin-private',icon:ICONS.stopTent},
 {key:'boat-backpack',label:'Boat / Backpack',css:'pin-boat-backpack',icon:ICONS.backpackerWater},
 {key:'pending',label:'Needs Verification',css:'pin-draft',icon:ICONS.draft},
 {key:'overnight-parking',label:'Overnight parking',css:'pin-parking',icon:ICONS.parking},
 {key:'rest-truck',label:'Rest Areas & Roadside Stops',css:'pin-rest',icon:ICONS.restR},
 {key:'info',label:'Info / reference',css:'pin-info',icon:ICONS.info}
];
const MAP_LAYER_KEYS=new Set(['modern','rustic','private','boondocking','boat-backpack','overnight-parking','rest-truck','pending']);
const LAYER_CONTROL_KEYS=new Set(['modern','rustic','private','boondocking','boat-backpack','overnight-parking','pending']);
const MAP_LAYERS=LAYERS.filter(l=>LAYER_CONTROL_KEYS.has(l.key));
const SMALL_EMPHASIS_LAYERS=new Set(['overnight-parking','rest-truck']);
function markerSizeForLayer(key){if(key==='boat-backpack')return 26;return SMALL_EMPHASIS_LAYERS.has(key)?22:24;}
function markerIconScaleForZoom(zoom){
  const z=Number(zoom);
  if(!Number.isFinite(z))return 1;
  if(z>=8.5)return 1;
  if(z>=7)return .5+((z-7)/1.5)*.5;
  if(z>=6)return (1/6)+((z-6))*(.5-(1/6));
  if(z>=4.5)return .125+((z-4.5)/1.5)*((1/6)-.125);
  return .125;
}
function currentMarkerIconScale(){return markerIconScaleForZoom(app&&app.map&&app.map.getZoom?app.map.getZoom():8.5);}
function currentMarkerClusterMode(){const z=app&&app.map&&app.map.getZoom?Number(app.map.getZoom()):8.5;return Number.isFinite(z)&&z<4.5;}
function scaledMarkerSizeForLayer(key){return Math.max(5,Math.round(markerSizeForLayer(key)*currentMarkerIconScale()));}
function markerScaleCacheKey(){return currentMarkerClusterMode()?'cluster':'icons';}
function updateMarkerZoomScale(){try{const scale=currentMarkerIconScale(); if(document&&document.documentElement)document.documentElement.style.setProperty('--camping-marker-zoom-scale', String(scale));}catch(_e){}}

const VIEWPORT_RENDER_STATE_THRESHOLD=2;
const VIEWPORT_RENDER_RECORD_THRESHOLD=600;
const VIEWPORT_RENDER_PADDING_RATIO=.85;
function routeSearchIsActive(){return !!(app&&app.routeSearch&&app.routeSearch.active&&app.routeSearch.coords&&app.routeSearch.coords.length);}
function shouldUseViewportRenderWindow(){
  if(!app||!app.map)return false;
  if(app.nearMeActive||routeSearchIsActive())return false;
  if(app.search&&app.search.active)return false;
  const stateCount=app.enabledStates&&app.enabledStates.size?app.enabledStates.size:0;
  const recordCount=Array.isArray(app.sites)?app.sites.length:0;
  return stateCount>=VIEWPORT_RENDER_STATE_THRESHOLD||recordCount>=VIEWPORT_RENDER_RECORD_THRESHOLD;
}
function makeViewportRenderBounds(){
  if(!(app&&app.map&&app.map.getBounds))return null;
  const b=app.map.getBounds();
  if(!b||!b.isValid||!b.isValid())return null;
  return b.pad?b.pad(VIEWPORT_RENDER_PADDING_RATIO):b;
}
function boundsEdges(bounds){
  if(!bounds)return null;
  const sw=bounds.getSouthWest&&bounds.getSouthWest();
  const ne=bounds.getNorthEast&&bounds.getNorthEast();
  if(!sw||!ne)return null;
  const south=Number(sw.lat),west=Number(sw.lng),north=Number(ne.lat),east=Number(ne.lng);
  if(![south,west,north,east].every(Number.isFinite))return null;
  return {south,west,north,east};
}
function boundsContainsLatLngNumeric(bounds,lat,lng){
  const e=boundsEdges(bounds);
  if(!e||!Number.isFinite(lat)||!Number.isFinite(lng))return false;
  const tol=.0000001;
  const latOk=lat>=e.south-tol&&lat<=e.north+tol;
  const lngOk=e.west<=e.east
    ? lng>=e.west-tol&&lng<=e.east+tol
    : (lng>=e.west-tol||lng<=e.east+tol);
  return latOk&&lngOk;
}
function renderWindowContainsView(renderBounds,viewBounds){
  if(!renderBounds||!viewBounds)return false;
  const sw=viewBounds.getSouthWest&&viewBounds.getSouthWest();
  const ne=viewBounds.getNorthEast&&viewBounds.getNorthEast();
  if(!sw||!ne)return false;
  return boundsContainsLatLngNumeric(renderBounds,Number(sw.lat),Number(sw.lng))&&boundsContainsLatLngNumeric(renderBounds,Number(ne.lat),Number(ne.lng));
}
function siteWithinViewportRenderWindow(site){
  if(!app.renderWindowMode||!app.renderWindowBounds)return true;
  const lat=Number(site&&site.lat),lng=Number(site&&site.lng);
  return boundsContainsLatLngNumeric(app.renderWindowBounds,lat,lng);
}
function renderWindowNeedsRefresh(){
  if(!shouldUseViewportRenderWindow())return false;
  if(!app.renderWindowBounds)return true;
  const view=app.map&&app.map.getBounds&&app.map.getBounds();
  if(!view||!view.isValid||!view.isValid())return false;
  return !renderWindowContainsView(app.renderWindowBounds,view);
}
function requestMarkerRenderIfNeeded(reason){
  if(!app.markerLayerCacheKey)return;
  const cacheChanged=app.markerLayerCacheKey!==markerCacheKey();
  const viewportChanged=renderWindowNeedsRefresh();
  if(!cacheChanged&&!viewportChanged)return;
  clearTimeout(requestMarkerRenderIfNeeded.timer);
  requestMarkerRenderIfNeeded.timer=setTimeout(()=>{
    if(!app.markerLayerCacheKey)return;
    const freshCacheChanged=app.markerLayerCacheKey!==markerCacheKey();
    const freshViewportChanged=renderWindowNeedsRefresh();
    if(!freshCacheChanged&&!freshViewportChanged)return;
    if(freshViewportChanged&&!freshCacheChanged&&app.renderWindowMode&&!currentMarkerClusterMode()){
      refreshMarkersForViewportWindow(false);
      return;
    }
    renderMarkers(false);
  },70);
}
function shouldAutoFitStateSelection(codes,options={}){
  if(options.forceFit)return true;
  if(app.nearMeActive||routeSearchIsActive())return true;
  const count=(codes||[]).length;
  return count===1;
}
function applyBasemapClass(key){
  const allowed=new Set(['osm','opentopo','topo','satellite']);
  const safe=allowed.has(String(key))?String(key):'topo';
  const classes=['basemap-osm','basemap-opentopo','basemap-topo','basemap-satellite'];
  if(document&&document.body){document.body.classList.remove(...classes);document.body.classList.add('basemap-'+safe);}
  return safe;
}
function currentBasemapKey(){
  const sel=$('basemapSelect');
  return applyBasemapClass((sel&&sel.value)||localStorage.getItem(STORE.basemap)||'topo');
}

const $=id=>document.getElementById(id); const $$=(sel,root=document)=>Array.from(root.querySelectorAll(sel));
window.CAMPING_STATE_DATA = window.CAMPING_STATE_DATA || {};
window.CAMPING_PENDING_SITES = window.CAMPING_PENDING_SITES || window.CAMPING_PENDING || [];
const app={map:null,markerLayer:null,markerGroups:{},markerIndex:{},markerLayerCacheKey:'',markerBaseCandidates:[],renderWindowBounds:null,renderWindowMode:false,userMarker:null,userAccuracyCircle:null,liveLocationWatchId:null,liveLocationStarted:false,liveLocationLoading:false,liveLocationLastLoadCenter:null,draftMarker:null,nearCenterMarker:null,baseLayers:{},sites:[],shownSites:[],stateData:{},enabledStates:new Set(),enabledLayers:new Set(),filters:{},search:{active:false,query:''},searchRevealMarker:null,draftPoint:null,draftQueue:[],supabase:null,session:null,communityFavorites:{},communityComments:{},communityCurrentSite:null,currentProfile:null,adminHiddenSites:{},adminFlagsAvailable:true,adminFlagsError:null,communityAvailable:true,communityError:null,communityUnavailableNotified:false,restRoadsideStats:null,localAreaCenter:null,nearMeActive:false,nearRadiusMiles:180,nearPickMode:false,loadSeq:0,restOnlyMode:false,routeSearch:{active:false,coords:[],basePoints:[],shapePoints:[],bufferMiles:25,layer:null,previousStates:null,distanceMiles:null,durationMinutes:null,pickMode:null},areaOutline:{layer:null,cache:{},registry:{},standalone:[],active:{},layers:{},labelMarkers:[],requestSeq:0,paused:false},savedRoutes:[],savedRoutesLoaded:false,savedRoutesError:null,miDynamicLoaded:{mdot:false,localTraveler:false,privateRv:false,overnight:false},renderSeq:0,renderDiagnostics:{last:null,warnings:[]}};
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
  // v23.1.29: canonical supplement layer values must win before keyword fallback.
  // v23.1.28 Montana exact build used layer:'rustic' with subtype:'rustic / primitive';
  // older logic treated those as Info/Reference and hid 58 valid markers.
  if(layer==='modern')return 'modern';
  if(layer==='rustic')return 'rustic';
  if(layer==='boondocking'||layer==='boondocking-dispersed'||layer==='dispersed')return 'boondocking';
  if(['boat-backpack','boat','boat-in','backpack','hike-in','walk-in','water-access','canoe','kayak'].includes(layer))return 'boat-backpack';
  if(layer==='info'||layer==='info-reference')return 'info';
  if(['state','federal','local'].includes(layer)&&subtype.includes('rustic'))return 'rustic';
  if(['state','federal','local'].includes(layer)&&subtype.includes('modern'))return 'modern';
  if(subtype.includes('rustic'))return 'rustic';
  if(subtype.includes('modern'))return 'modern';
  if(/rest|roadside|wayside|truck/.test(raw))return 'rest-truck';
  if(/overnight|parking|walmart|cracker|cabela|bass pro|municipal lot/.test(raw))return 'overnight-parking';
  // v23.0.40: boat/backpack access gets its own layer. Primitive alone is not enough; it can remain Rustic or Boondocking depending on the site.
  if(/boat[- ]?in|boat access|water[- ]access|canoe|kayak|backpack|hike[- ]?in|walk[- ]?in/.test(raw))return 'boat-backpack';
  if(/dispersed|boondock/.test(raw))return 'boondocking';
  if(/reference/.test(raw))return 'info';
  return 'info';
}
function layerDef(key){return LAYERS.find(l=>l.key===key)||LAYERS.find(l=>l.key==='info')||LAYERS[0];}function markerTypeNotice(site){const key=layerKey(site);const markerType=String(site.markerType||site.marker_type||'').toLowerCase().replace(/-/g,'_');const verification=(String(site.verificationStatus||'')+' '+String(site.validationStatus||'')+' '+String(site.status||'')+' '+String(site.layerLabel||'')+' '+String(site.categoryLabel||'')+' '+String(site.subtype||'')+' '+String(site.name||'')).toLowerCase();if(key==='pending'||site.pending||verification.includes('needs verification')||verification.includes('needs-verification'))return 'Needs Verification — not an import-ready legal camping marker.';if(markerType==='rule_area'||markerType==='rulearea')return 'Rule/permit information marker — not a campsite pin.';if(markerType==='system')return 'Camping system marker — not an individual campsite pin.';return '';}
function notify(msg,ms=3000){const el=$('statusBar');if(!el)return;el.textContent=msg;el.hidden=false;clearTimeout(notify.t);notify.t=setTimeout(()=>el.hidden=true,ms)}
function setLoading(on,msg){const el=$('mapLoading');if(!el)return;if(msg)el.textContent=msg;el.classList.toggle('hidden',!on);}
function setLocationStatus(msg){
  const ids=['locationStatus','locationStatusMobile'];
  ids.forEach(id=>{const el=$(id);if(el)el.textContent=msg||'';});
}
function requestLocationFromButton(nearMeMode=true){
  setLocationStatus('Getting your location for Nearby search…');
  startLiveLocation(true);
}
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
    else if(['boat','boat-in','backpack','hike-in','walk-in','water-access','canoe','kayak'].includes(key))migrated.add('boat-backpack');
    else if(key==='pending')migrated.add('pending');
  });
  if(migrated.size===0){
    LAYERS.filter(x=>x.key!=='pending'&&x.key!=='rest-truck'&&x.key!=='overnight-parking').forEach(x=>migrated.add(x.key));
  }
  return [...migrated];
}
function blankFilters(){return {maxCost:'',water:'',access:{twowd:false,hc:false,fw:false},chips:{showers:false},community:{is_favorite:false,want_to_visit:false,visited:false,loved:false}};}
function resetFiltersOnLoad(){app.filters=blankFilters();saveJson(STORE.filters,app.filters);}
function initState(){document.title='Boondocking & Camping Maps'; paintRuntimeVersion(); app.draftQueue=readJson(STORE.queue,[]); $('draftQueue').value=app.draftQueue.join('\n'); const storedStates=readJson(STORE.states,null); const states=Array.isArray(storedStates)?storedStates:[DEFAULT_STATE]; app.enabledStates=new Set(states); let layers=migrateLayerKeys(readJson(STORE.layers,MAP_LAYERS.filter(x=>x.key!=='pending').map(x=>x.key))); layers=layers.filter(key=>key!=='rest-truck'); app.enabledLayers=new Set(layers); saveJson(STORE.layers,layers); if(localStorage.getItem(STORE.pending)==='1')app.enabledLayers.add('pending'); resetFiltersOnLoad();}
function initMap(){app.map=L.map('map',{zoomControl:true,preferCanvas:true,zoomSnap:.25,zoomDelta:.25,wheelPxPerZoomLevel:80}).setView([44.9,-89.7],6); app.areaOutline.layer=L.layerGroup().addTo(app.map); app.markerLayer=L.layerGroup().addTo(app.map); app.routeSearch.layer=L.layerGroup().addTo(app.map); app.baseLayers={osm:L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'&copy; OpenStreetMap contributors'}),opentopo:L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',{maxZoom:17,attribution:'Map data &copy; OpenStreetMap contributors, SRTM | Map style &copy; OpenTopoMap'}),topo:L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',{maxZoom:19,attribution:'Tiles &copy; Esri'}),satellite:L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',{maxZoom:19,attribution:'Tiles &copy; Esri'})}; const key=applyBasemapClass(localStorage.getItem(STORE.basemap)||'topo'); (app.baseLayers[key]||app.baseLayers.topo).addTo(app.map); $('basemapSelect').value=key; updateMarkerZoomScale(); app.map.on('zoom zoomend',()=>{updateMarkerZoomScale();}); app.map.on('zoomend moveend',()=>{updateAreaOutlineLabelVisibility();syncLegendZoomControls();requestMarkerRenderIfNeeded('map move/zoom');});}
function retireLegacyLayerControls(){
  // v23.1.30+: layer controls live in the map legend. Remove stale cached layer home panels
  // so duplicate IDs do not steal handlers, but keep the v23.1.72 phone Layers shortcut.
  $$('[data-control-panel="layers"]').forEach(el=>el.remove());
  $$('[data-control-home="layers"]').forEach(el=>el.remove());
}
function buildControls(){retireLegacyLayerControls(); buildStateSelect(); buildLegend(); syncFilters(); bindEvents(); updatePendingMeta(); setNearMilesUI(app.nearRadiusMiles||DEFAULT_NEAR_RADIUS_MILES,false); syncRouteControls(); registerStandaloneAreaOutlines(); refreshAreaOutlineLayerForStateSelection(false); renderReferences(); updateAreaOutlinePanel();}
function buildStateSelect(){buildStateChecklist(); syncStateControls();}
function mappedStateEntries(){return manifestEntries().filter(s=>Number(s.count||0)>0 || s.file || (Array.isArray(s.files)&&s.files.length))}
function buildStateChecklist(){const box=$('stateChecklist'); if(!box)return; const rows=mappedStateEntries(); box.innerHTML=rows.map(s=>`<label class="state-check"><input type="checkbox" data-state-code="${esc(s.code)}"><span>${esc(s.name||s.code)}</span></label>`).join('');}
function selectedStateRecordEstimate(codes){
  const picked=new Set((codes||[]).map(c=>String(c||'').toUpperCase()).filter(Boolean));
  if(!picked.size)return 0;
  return manifestEntries().reduce((sum,row)=>picked.has(String(row.code||'').toUpperCase())?sum+Number(row.count||0):sum,0);
}
function formatRecordCount(n){return Number(n||0).toLocaleString();}
const PERFORMANCE_NOTE_RECORDS=1000;
const PERFORMANCE_CONFIRM_RECORDS=1000;
const PERFORMANCE_HEAVY_RECORDS=2500;
const STALE_RESTORED_SELECTION_MS=30*60*1000;
const LARGE_SELECTION_WARNING_COOLDOWN_MS=30*60*1000;
const LARGE_SELECTION_WARNING_SESSION_KEY='campingMap.largeSelectionWarning.lastShown.v23172';
function largeSelectionWarningLastShown(){try{const n=Number(sessionStorage.getItem(LARGE_SELECTION_WARNING_SESSION_KEY)||0);return Number.isFinite(n)?n:0;}catch(_e){return 0;}}
function largeSelectionWarningRecentlyShown(){const last=largeSelectionWarningLastShown();return !!last&&(Date.now()-last)<LARGE_SELECTION_WARNING_COOLDOWN_MS;}
function markLargeSelectionWarningShown(){try{sessionStorage.setItem(LARGE_SELECTION_WARNING_SESSION_KEY,String(Date.now()));}catch(_e){}}
function stateSelectionPerformanceText(codes){
  const count=selectedStateRecordEstimate(codes);
  if(count>=PERFORMANCE_HEAVY_RECORDS)return `Very large selection: about ${formatRecordCount(count)} records. Performance may be degraded; fewer states will be smoother.`;
  if(count>=PERFORMANCE_NOTE_RECORDS)return `Large selection: about ${formatRecordCount(count)} records. Performance may be degraded; you can keep going or select fewer states.`;
  return '';
}
function confirmLargeStateSelection(codes,options={}){
  const count=selectedStateRecordEstimate(codes);
  if(count<PERFORMANCE_CONFIRM_RECORDS)return true;
  if(!options.forceLargeSelectionWarning&&largeSelectionWarningRecentlyShown())return true;
  const stateCount=(codes||[]).length;
  const source=options.source==='select-all'?'Select All Map':(options.source==='restored'?'Your saved map settings':'This state selection');
  const severity=count>=PERFORMANCE_HEAVY_RECORDS?'very large':'large';
  const msg=`Large map selection

${source} would load about ${formatRecordCount(count)} map records across ${stateCount} state${stateCount===1?'':'s'}.

You can keep going, but performance may be degraded, especially on phones, older computers, or when zoomed out. For smoother browsing, select fewer states or zoom into a smaller area.

Continue loading this ${severity} selection?`;
  const ok=window.confirm(msg);
  if(ok)markLargeSelectionWarningShown();
  return ok;
}
function notifyLargeStateSelection(codes){
  const count=selectedStateRecordEstimate(codes);
  if(count>=PERFORMANCE_NOTE_RECORDS&&!largeSelectionWarningRecentlyShown()){markLargeSelectionWarningShown();notify(stateSelectionPerformanceText(codes),9000);}
}

function storedLastActiveTime(){try{const n=Number(localStorage.getItem(STORE.lastActive)||0);return Number.isFinite(n)?n:0;}catch(_e){return 0;}}
function markAppActivity(){
  const now=Date.now();
  if(markAppActivity.lastWrite&&now-markAppActivity.lastWrite<5000)return;
  markAppActivity.lastWrite=now;
  try{localStorage.setItem(STORE.lastActive,String(now));}catch(_e){}
}
function bindAppActivityTracking(){
  ['click','keydown','pointerdown','touchstart','wheel'].forEach(evt=>document.addEventListener(evt,markAppActivity,{passive:true}));
  window.addEventListener('beforeunload',markAppActivity);
  markAppActivity();
}
function confirmRestoredLargeStateSelection(){
  const codes=[...app.enabledStates];
  const count=selectedStateRecordEstimate(codes);
  if(count<PERFORMANCE_CONFIRM_RECORDS)return true;
  const last=storedLastActiveTime();
  const stale=!last || (Date.now()-last)>STALE_RESTORED_SELECTION_MS;
  if(!stale)return true;
  if(confirmLargeStateSelection(codes,{source:'restored'}))return true;
  const fallback=mappedStateEntries().some(s=>s.code===DEFAULT_STATE)?[DEFAULT_STATE]:[];
  app.enabledStates=new Set(fallback);
  saveJson(STORE.states,[...app.enabledStates]);
  return false;
}
function selectedStateSummary(){const n=app.enabledStates.size; const mapped=mappedStateEntries().length; if(app.nearMeActive){const codes=nearMeVisibleStateCodes(); if(!app.localAreaCenter)return 'Nearby: locating…'; if(codes.length===0)return `Nearby: ${nearRadiusMiles()} mi`; if(codes.length===1)return `Nearby: ${stateLabel(codes[0])}`; return `Nearby: ${codes.length} states in range`;} if(n===0)return 'No states selected'; if(n===1)return `${stateLabel([...app.enabledStates][0])} selected`; if(n===mapped)return `All ${mapped} mapped states`; return `${n} states selected`;}
function syncStateControls(){
  const activeUiStates=app.nearMeActive?new Set(nearMeVisibleStateCodes()):app.enabledStates;
  $$('[data-state-code]').forEach(cb=>{cb.checked=activeUiStates.has(cb.dataset.stateCode)});
  const summary=$('stateSelectionSummary'); if(summary)summary.textContent=selectedStateSummary();
  const note=$('stateSelectionNote');
  if(note){
    const n=app.enabledStates.size;
    if(app.nearMeActive){
      const codes=nearMeVisibleStateCodes(); const names=codes.map(stateLabel).join(', ');
      note.textContent=app.localAreaCenter?(codes.length?`Nearby search is active: showing sites within ${nearRadiusMiles()} miles. Visible result states: ${names}.`:`Nearby search is active: showing sites within ${nearRadiusMiles()} miles. No visible results are currently inside the radius.`):'Nearby search is getting your location…';
    }else{
      const codes=[...app.enabledStates];
      const count=selectedStateRecordEstimate(codes);
      const perf=stateSelectionPerformanceText(codes);
      if(n===0)note.textContent='No states selected. Choose one or more states to load map data.';
      else if(n===1)note.textContent=`${stateLabel(codes[0])} selected (${formatRecordCount(count)} listed records).`;
      else note.textContent=`${n} states selected (${formatRecordCount(count)} listed records). ${perf||'The map will stay on the current view and draw sites in/near the visible map window.'}`;
    }
  }
}
function stateLabel(code){const row=manifestEntries().find(s=>s.code===code); return row?(row.name||row.code):code}
function clearNearMeMode(){app.nearMeActive=false;app.nearPickMode=false;app.liveLocationLoading=false;app.liveLocationLastLoadCenter=null;if(app.liveLocationWatchId!=null&&navigator.geolocation){navigator.geolocation.clearWatch(app.liveLocationWatchId);app.liveLocationWatchId=null;}app.liveLocationStarted=false;}
async function setEnabledStates(codes,fit=true,options={}){
  const valid=new Set(mappedStateEntries().map(s=>s.code));
  const previous=new Set(app.enabledStates||[]);
  const picked=[...new Set((codes||[]).map(c=>String(c||'').toUpperCase()).filter(c=>valid.has(c)))];
  const addingStates=picked.some(c=>!previous.has(c));
  if(addingStates&&!options.skipPerformanceConfirm&&!confirmLargeStateSelection(picked,options)){syncStateControls();return;}
  clearNearMeMode();
  clearSearchMode(false);
  app.enabledStates=new Set(picked);
  saveJson(STORE.states,[...app.enabledStates]);
  syncStateControls();
  if(addingStates)notifyLargeStateSelection(picked);
  const outlinesWanted=areaOutlineLayerEnabled();
  pauseAreaOutlinesForStateChange(picked.length);
  const fitAfterLoad=!!fit&&shouldAutoFitStateSelection(picked,options);
  await loadEnabledStates(fitAfterLoad);
  if(fit&&!fitAfterLoad&&picked.length>1)notify('State selection loaded. The map stayed on the current view and will draw sites as you pan or zoom.',5500);
  if(outlinesWanted)refreshAreaOutlineLayerForStateSelection(false,{afterMarkers:true});
}
function buildLayerList(){const box=$('layerList'); if(box)box.innerHTML='';}
function legendCollapsedStored(){try{return localStorage.getItem('campingMap.legendCollapsed.v1')==='1'}catch(e){return false}}
function legendAreaOutlineOn(){try{return localStorage.getItem(STORE.areaOutlines)==='1'}catch(e){return false}}
function setLegendCollapsed(collapsed){const panel=$('mapLegendDesktop');if(!panel)return;panel.classList.toggle('collapsed',!!collapsed);const btn=$('legendToggleDesktop');if(btn){btn.setAttribute('aria-expanded',String(!collapsed));btn.setAttribute('aria-label',collapsed?'Expand map legend':'Shrink map legend')}try{localStorage.setItem('campingMap.legendCollapsed.v1',collapsed?'1':'0')}catch(e){}}
function toggleLegendCollapsed(){const panel=$('mapLegendDesktop');setLegendCollapsed(!(panel&&panel.classList.contains('collapsed')))}
function formatZoomLabel(value){
  const n=Number(value);
  if(!Number.isFinite(n))return '';
  if(Math.abs(n-Math.round(n))<.001)return String(Math.round(n));
  return n.toFixed(2).replace(/0+$/,'').replace(/\.$/,'');
}
function roundedZoomStep(value){
  const n=Number(value);
  if(!Number.isFinite(n))return 6;
  return Math.round(n/.25)*.25;
}
function legendZoomHtml(context){
  const zoom=(app.map&&Number.isFinite(app.map.getZoom&&app.map.getZoom()))?roundedZoomStep(app.map.getZoom()):6;
  return `<div class="legend-zoom-tools" data-legend-zoom-wrap="${esc(context||'desktop')}"><label>Map zoom <span data-legend-zoom-label>${formatZoomLabel(zoom)}</span><input data-legend-zoom="1" type="range" min="4" max="18" step="0.25" value="${zoom}" aria-label="Map zoom level"></label></div>`;
}
function syncLegendZoomControls(){
  if(!app.map)return;
  const z=roundedZoomStep(app.map.getZoom&&app.map.getZoom());
  if(!Number.isFinite(z))return;
  const min=Number.isFinite(app.map.getMinZoom&&app.map.getMinZoom())?app.map.getMinZoom():4;
  const max=Number.isFinite(app.map.getMaxZoom&&app.map.getMaxZoom())?Math.min(app.map.getMaxZoom(),18):18;
  $$('[data-legend-zoom]').forEach(input=>{input.step='0.25';input.min=String(min);input.max=String(max);if(Math.abs(Number(input.value)-z)>.01)input.value=String(z);});
  $$('[data-legend-zoom-label]').forEach(el=>{el.textContent=formatZoomLabel(z);});
}
function applyLegendZoom(value){
  if(!app.map)return;
  let z=roundedZoomStep(value);
  if(!Number.isFinite(z))return;
  const min=Number.isFinite(app.map.getMinZoom&&app.map.getMinZoom())?app.map.getMinZoom():4;
  const max=Number.isFinite(app.map.getMaxZoom&&app.map.getMaxZoom())?Math.min(app.map.getMaxZoom(),18):18;
  z=Math.max(min,Math.min(max,z));
  app.map.setZoom(z,{animate:false});
  syncLegendZoomControls();
}
function buildLegend(){
  const layerItems=MAP_LAYERS.map(l=>`<label class="legend-item legend-layer-toggle"><input type="checkbox" data-layer="${l.key}" ${app.enabledLayers.has(l.key)?'checked':''}><span class="layer-icon ${l.css}">${l.icon}</span><span>${esc(l.label)}</span></label>`).join('');
  const outlineOn=legendAreaOutlineOn();
  const areaItem=`<label class="legend-item legend-layer-toggle legend-outline-toggle"><input data-area-outline-toggle="1" type="checkbox" ${outlineOn?'checked':''}><span class="layer-icon pin-boondocking">${ICONS.tree}</span><span>Official Area Outlines</span></label>`;
  const desktopHtml=`<div class="legend-head"><div><h3>Map layers</h3></div><button id="legendToggleDesktop" class="legend-toggle" type="button" aria-expanded="true" aria-label="Shrink map legend"><span class="when-expanded">Shrink</span><span class="when-collapsed">Expand</span></button></div>${legendZoomHtml('desktop')}<div class="legend-grid legend-layer-grid">${layerItems}${areaItem}</div><div class="legend-tools"><button id="selectAllLayers" class="secondary" type="button">Select all</button><button id="clearAllLayers" class="secondary" type="button">Clear layers</button><button id="clearAreaOutlineBtn" class="secondary" type="button">Hide outlines</button></div><div class="filter-status render-integrity-status" data-render-integrity-status hidden></div><div id="restRoadsideStats" class="filter-status" hidden></div>`;
  const mobileHtml=`${legendZoomHtml('mobile')}<div class="legend-grid legend-layer-grid">${layerItems}${areaItem}</div><div class="legend-tools"><button id="selectAllLayersMobile" class="secondary" type="button">Select all</button><button id="clearAllLayersMobile" class="secondary" type="button">Clear layers</button></div><div class="filter-status render-integrity-status" data-render-integrity-status hidden></div>`;
  if($('mapLegendDesktop')){$('mapLegendDesktop').innerHTML=desktopHtml;$('legendToggleDesktop').onclick=toggleLegendCollapsed;setLegendCollapsed(legendCollapsedStored())}
  if($('mapLegendMobile'))$('mapLegendMobile').innerHTML=mobileHtml;
  syncLegendZoomControls();
}
function syncLayerControls(){const boxes=$$('input[data-layer]');boxes.forEach(cb=>{cb.checked=app.enabledLayers.has(cb.dataset.layer)});const pending=$('showPendingLayer');if(pending)pending.checked=app.enabledLayers.has('pending');updateAreaOutlineLayerControls();}
function applyLayerCheckboxChange(e){if(!e.target.dataset.layer)return;const key=e.target.dataset.layer;app.restOnlyMode=false;syncRestOnlyToggle();e.target.checked?app.enabledLayers.add(key):app.enabledLayers.delete(key);saveLayers();localStorage.setItem(STORE.pending,app.enabledLayers.has('pending')?'1':'0');updatePendingMeta();syncLayerControls();toggleMarkerLayer(key,e.target.checked)}

function selectedStateCodes(){return [...app.enabledStates].filter(Boolean);}
function sortStateCodes(codes){const order=new Map(manifestEntries().map((s,i)=>[s.code,i]));return [...new Set(codes.filter(Boolean).map(c=>String(c).toUpperCase()))].sort((a,b)=>(order.get(a)??9999)-(order.get(b)??9999)||a.localeCompare(b));}
function stateCodeForVisibleSite(site){
  const explicit=String(site.stateCode||site.state||'').toUpperCase();
  if(explicit)return explicit;
  const lat=Number(site.lat),lng=Number(site.lng);
  if(!Number.isFinite(lat)||!Number.isFinite(lng))return '';
  const hit=Object.entries(STATE_BOUNDS).find(([,b])=>pointInBounds(lat,lng,b));
  return hit?hit[0]:'';
}
function nearMeVisibleStateCodes(){
  if(!app.nearMeActive)return selectedStateCodes();
  const visible=app.shownSites.map(stateCodeForVisibleSite).filter(Boolean);
  return sortStateCodes(visible);
}
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
  if(codes.length!==1) return;
  const stateBounds=boundsForSelectedStates();
  const shownBounds=markerBoundsFromShownSites();
  const bounds=stateBounds.isValid()?stateBounds:shownBounds;
  if(!bounds.isValid()) return;
  const pad=window.matchMedia&&window.matchMedia('(max-width:700px)').matches?[22,22]:[42,42];
  app.map.fitBounds(bounds,{padding:pad,maxZoom:8,animate:false});
}
function fitCurrentPreferredView(){
  if(app.routeSearch&&app.routeSearch.active&&app.routeSearch.coords&&app.routeSearch.coords.length){
    fitRouteView();
    return;
  }
  if(app.nearMeActive&&app.localAreaCenter){
    fitNearMeRadius(app.localAreaCenter);
    return;
  }
  fitSelectedStateView();
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

const CONTROL_HOMES=['where','route','filters','options'];
function preferredControlHome(){
  let saved='';
  try{saved=localStorage.getItem(STORE.controlHome)||localStorage.getItem(STORE.desktopMode)||'';}catch(_e){}
  return CONTROL_HOMES.includes(saved)?saved:'where';
}
function setControlHome(home){
  const safe=CONTROL_HOMES.includes(home)?home:'where';
  $$('[data-control-panel]').forEach(panel=>{panel.hidden=panel.dataset.controlPanel!==safe;});
  $$('[data-control-home]').forEach(btn=>{
    const active=btn.dataset.controlHome===safe;
    btn.classList.toggle('active',active);
    btn.setAttribute('aria-pressed',active?'true':'false');
  });
  try{localStorage.setItem(STORE.controlHome,safe);localStorage.setItem(STORE.desktopMode,safe);}catch(_e){}
  if(safe==='options')renderReferences();
}
function bindControlHomeNav(){
  $$('[data-control-home]').forEach(btn=>{btn.onclick=()=>{showSidebarTab('main');setControlHome(btn.dataset.controlHome);};});
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


function parseLatLngText(text){
  const m=String(text||'').trim().match(/^\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\s*$/);
  if(!m)return null;
  const lat=Number(m[1]),lng=Number(m[2]);
  if(!Number.isFinite(lat)||!Number.isFinite(lng)||Math.abs(lat)>90||Math.abs(lng)>180)return null;
  return {lat,lng,label:`${lat.toFixed(5)}, ${lng.toFixed(5)}`};
}
async function fetchJsonWithTimeout(url,timeoutMs=20000){
  const ctrl=new AbortController();
  const timer=setTimeout(()=>ctrl.abort(),timeoutMs);
  try{
    const res=await fetch(url,{signal:ctrl.signal,headers:{'Accept':'application/json'}});
    if(!res.ok)throw new Error(`Request failed (${res.status})`);
    return await res.json();
  }finally{clearTimeout(timer)}
}
async function geocodeRoutePlace(text){
  const raw=String(text||'').trim();
  if(!raw)throw new Error('Add a start, stop, and destination before mapping a route.');
  const parsed=parseLatLngText(raw);
  if(parsed)return parsed;
  const url='https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=us&q='+encodeURIComponent(raw);
  const data=await fetchJsonWithTimeout(url,20000);
  const hit=Array.isArray(data)?data[0]:null;
  if(!hit)throw new Error(`Could not find “${raw}”. Try adding the state, or use coordinates.`);
  const lat=Number(hit.lat),lng=Number(hit.lon);
  if(!Number.isFinite(lat)||!Number.isFinite(lng))throw new Error(`No usable coordinates found for “${raw}”.`);
  return {lat,lng,label:hit.display_name||raw};
}
function routeStopInputs(){return $$('[data-route-stop]').map(i=>i.value.trim()).filter(Boolean);}
function routePlaceInputs(){return [$('routeStart')?.value.trim()||'',...routeStopInputs(),$('routeEnd')?.value.trim()||''].filter(Boolean);}
function addRouteStopInput(value=''){
  const box=$('routeStops');
  if(!box)return;
  const row=document.createElement('div');
  row.className='route-stop-row';
  row.innerHTML=`<input type="text" data-route-stop placeholder="Optional stop / waypoint" value="${esc(value)}"><button class="secondary" type="button" aria-label="Remove stop">Remove</button>`;
  row.querySelector('button').onclick=()=>row.remove();
  box.appendChild(row);
}
function latLngFieldValue(ll){return `${Number(ll.lat).toFixed(6)}, ${Number(ll.lng).toFixed(6)}`;}
function beginRouteMapPick(mode){
  app.routeSearch.pickMode=mode;
  app.nearPickMode=false;
  const label=mode==='start'?'route start':(mode==='end'?'route destination':'route stop');
  notify(`Click the map to set the ${label}.`);
}
function applyRouteMapPick(ll){
  const value=latLngFieldValue(ll);
  const mode=app.routeSearch.pickMode;
  if(mode==='start'&&$('routeStart'))$('routeStart').value=value;
  else if(mode==='end'&&$('routeEnd'))$('routeEnd').value=value;
  else if(mode==='stop')addRouteStopInput(value);
  app.routeSearch.pickMode=null;
  notify('Route point added from map click.');
  return true;
}
function handleMapPickClick(ll){
  if(app.nearPickMode){applyNearMapLocation(Number(ll.lat),Number(ll.lng));return true;}
  if(app.routeSearch&&app.routeSearch.pickMode)return applyRouteMapPick(ll);
  return false;
}
function normalizeRouteMiles(value){
  const n=Math.round(Number(value));
  if(!Number.isFinite(n))return 25;
  return Math.max(1,Math.min(150,n));
}
function setRouteMilesUI(value,applyFilter){
  const n=normalizeRouteMiles(value);
  app.routeSearch.bufferMiles=n;
  const slider=$('routeMiles');
  const number=$('routeMilesNumber');
  const label=$('routeMilesValue');
  if(slider&&String(slider.value)!==String(n))slider.value=String(n);
  if(number&&String(number.value)!==String(n))number.value=String(n);
  if(label)label.textContent=String(n);
  if(app.routeSearch.active&&applyFilter){renderMarkers(false);updateRouteStatus();}
  else updateRouteStatus();
}
function getSavedRoutes(){
  return Array.isArray(app.savedRoutes)?app.savedRoutes.filter(r=>r&&r.id&&r.name):[];
}
function savedRouteStatusText(){
  if(!app.supabase)return 'Cloud saved routes need Supabase config.';
  if(!app.session)return 'Sign in to load cloud saved routes.';
  if(app.savedRoutesError)return app.savedRoutesError;
  if(!app.savedRoutesLoaded)return 'Cloud saved routes not loaded yet.';
  const n=getSavedRoutes().length;
  return n?`${n} cloud saved route${n===1?'':'s'} loaded.`:'No cloud saved routes yet.';
}
function setSavedRouteStatus(text){
  const el=$('routeSavedStatus');
  if(el)el.textContent=text||savedRouteStatusText();
}
function routeFromCloudRow(row){
  const payload=(row&&row.payload&&typeof row.payload==='object')?row.payload:{};
  return Object.assign({},payload,{
    id:String(row.id||payload.id||''),
    name:String(row.name||payload.name||'Saved route'),
    savedAt:row.updated_at||row.created_at||payload.savedAt||''
  });
}
function renderSavedRoutes(){
  const sel=$('routeSavedSelect');
  if(!sel)return;
  const current=sel.value;
  const routes=getSavedRoutes().sort((a,b)=>String(b.savedAt||'').localeCompare(String(a.savedAt||'')));
  const first=app.session?'Cloud saved routes':'Sign in for cloud saved routes';
  sel.innerHTML=`<option value="">${esc(first)}</option>`+routes.map(r=>`<option value="${esc(r.id)}">${esc(r.name)}</option>`).join('');
  if(current&&routes.some(r=>r.id===current))sel.value=current;
  setSavedRouteStatus();
}
async function refreshSavedRoutes(showNotice=false){
  if(!app.supabase){app.savedRoutes=[];app.savedRoutesLoaded=false;app.savedRoutesError='Cloud saved routes need Supabase config.';renderSavedRoutes();return [];}
  if(!app.session){app.savedRoutes=[];app.savedRoutesLoaded=false;app.savedRoutesError=null;renderSavedRoutes();return [];}
  const sel=$('routeSavedSelect');
  if(sel)sel.disabled=true;
  setSavedRouteStatus('Loading cloud saved routes…');
  try{
    const {data,error}=await app.supabase
      .from(SAVED_ROUTES_TABLE)
      .select('id,name,payload,created_at,updated_at')
      .order('updated_at',{ascending:false})
      .limit(100);
    if(error)throw error;
    app.savedRoutes=(Array.isArray(data)?data:[]).map(routeFromCloudRow).filter(r=>r.id&&r.name);
    app.savedRoutesLoaded=true;
    app.savedRoutesError=null;
    renderSavedRoutes();
    if(showNotice)notify('Cloud saved routes refreshed.');
    return app.savedRoutes;
  }catch(err){
    console.error(err);
    app.savedRoutes=[];
    app.savedRoutesLoaded=false;
    app.savedRoutesError='Cloud saved routes unavailable. Run the saved-routes SQL setup if this is the first install.';
    renderSavedRoutes();
    if(showNotice)notify(app.savedRoutesError,6000);
    return [];
  }finally{
    if(sel)sel.disabled=false;
  }
}
function routeInputSnapshot(){
  return {start:$('routeStart')?.value.trim()||'',end:$('routeEnd')?.value.trim()||'',stops:routeStopInputs()};
}
function applyRouteInputSnapshot(route){
  if($('routeStart'))$('routeStart').value=route.start||'';
  if($('routeEnd'))$('routeEnd').value=route.end||'';
  const stopBox=$('routeStops');
  if(stopBox)stopBox.innerHTML='';
  (Array.isArray(route.stops)?route.stops:[]).forEach(v=>addRouteStopInput(v));
  setRouteMilesUI(route.bufferMiles||25,false);
}
function makeRouteSaveName(){
  const typed=$('routeSaveName')?.value.trim();
  if(typed)return typed.slice(0,90);
  const snap=routeInputSnapshot();
  const auto=[snap.start,...snap.stops,snap.end].filter(Boolean).join(' → ');
  return (auto||'Saved route').slice(0,90);
}
function currentRoutePayload(){
  const snap=routeInputSnapshot();
  return {
    start:snap.start,
    end:snap.end,
    stops:snap.stops,
    bufferMiles:normalizeRouteMiles(app.routeSearch.bufferMiles||25),
    basePoints:(app.routeSearch.basePoints||[]).map(p=>({lat:Number(p.lat),lng:Number(p.lng),label:p.label||''})).filter(p=>Number.isFinite(p.lat)&&Number.isFinite(p.lng)),
    shapePoints:(app.routeSearch.shapePoints||[]).map(p=>({lat:Number(p.lat),lng:Number(p.lng),seq:clampRouteSeq(p.seq)})).filter(p=>Number.isFinite(p.lat)&&Number.isFinite(p.lng)),
    savedByVersion:VERSION
  };
}
async function saveCurrentRoute(){
  if(!(app.routeSearch&&app.routeSearch.active)||(app.routeSearch.basePoints||[]).length<2){notify('Map a route before saving it.');return;}
  if(!app.supabase)return notify('Cloud saved routes need Supabase config. Local-only route saving has been disabled.',6000);
  if(!app.session)return notify('Sign in under Options before saving routes across devices.',6000);
  const name=makeRouteSaveName();
  const payload=currentRoutePayload();
  const routes=getSavedRoutes();
  const selectedId=$('routeSavedSelect')?.value||'';
  const selected=selectedId?routes.find(r=>r.id===selectedId):null;
  const existing=selected||routes.find(r=>String(r.name||'').toLowerCase()===name.toLowerCase());
  const btn=$('routeSaveBtn');
  if(btn)btn.disabled=true;
  setSavedRouteStatus(existing?'Updating selected cloud saved route…':'Saving route to cloud…');
  try{
    let result;
    if(existing&&existing.id){
      result=await app.supabase
        .from(SAVED_ROUTES_TABLE)
        .update({name,payload,updated_at:new Date().toISOString()})
        .eq('id',existing.id)
        .select('id,name,payload,created_at,updated_at')
        .single();
    }else{
      result=await app.supabase
        .from(SAVED_ROUTES_TABLE)
        .insert({name,payload})
        .select('id,name,payload,created_at,updated_at')
        .single();
    }
    if(result.error)throw result.error;
    await refreshSavedRoutes(false);
    const sel=$('routeSavedSelect');
    if(sel&&result.data&&result.data.id)sel.value=String(result.data.id);
    if($('routeSaveName'))$('routeSaveName').value=name;
    notify(`${existing?'Updated':'Saved'} cloud route: ${name}`);
  }catch(err){
    console.error(err);
    notify(err&&err.message?`Cloud route save failed: ${err.message}`:'Cloud route save failed. Run the saved-routes SQL setup if needed.',7000);
    setSavedRouteStatus();
  }finally{
    if(btn)btn.disabled=false;
  }
}

async function loadSavedRoute(){
  if(app.supabase&&app.session&&!app.savedRoutesLoaded)await refreshSavedRoutes(false);
  const id=$('routeSavedSelect')?.value;
  if(!id){notify('Choose a cloud saved route first.');return;}
  const saved=getSavedRoutes().find(r=>r.id===id);
  if(!saved){notify('Cloud saved route not found.');await refreshSavedRoutes(false);return;}
  if($('routeSaveName'))$('routeSaveName').value=saved.name||'';
  applyRouteInputSnapshot(saved);
  const base=(saved.basePoints||[]).map(p=>({lat:Number(p.lat),lng:Number(p.lng),label:p.label||''})).filter(p=>Number.isFinite(p.lat)&&Number.isFinite(p.lng));
  app.routeSearch.shapePoints=(saved.shapePoints||[]).map(p=>({lat:Number(p.lat),lng:Number(p.lng),seq:clampRouteSeq(p.seq)})).filter(p=>Number.isFinite(p.lat)&&Number.isFinite(p.lng));
  app.routeSearch.bufferMiles=normalizeRouteMiles(saved.bufferMiles||25);
  if(base.length<2){await runRouteSearch();return;}
  const btn=$('routeLoadBtn');
  if(btn)btn.disabled=true;
  setLoading(true,'Loading cloud saved route…');
  try{
    if(!app.routeSearch.active)app.routeSearch.previousStates=selectedStateCodes();
    app.routeSearch.active=true;
    app.routeSearch.basePoints=base;
    const route=await requestOsrmRoute(routePointsWithShapes());
    const coords=route.geometry.coordinates.map(c=>({lat:Number(c[1]),lng:Number(c[0])})).filter(p=>Number.isFinite(p.lat)&&Number.isFinite(p.lng));
    if(coords.length<2)throw new Error('The saved route geometry was empty.');
    app.routeSearch.coords=coords;
    app.routeSearch.distanceMiles=Number(route.distance)/1609.344;
    app.routeSearch.durationMinutes=Number(route.duration)/60;
    drawRouteLine();
    const routeStates=routeStatesForCoords(coords,app.routeSearch.bufferMiles);
    app.enabledStates=new Set(routeStates);
    saveJson(STORE.states,[...app.enabledStates]);
    syncStateControls();
    await loadEnabledStates(false);
    drawRouteLine();
    fitRouteView();
    updateRouteStatus();
    notify(`Loaded cloud route: ${saved.name}`);
  }catch(err){console.error(err);notify(err&&err.message?err.message:'Could not load cloud saved route.');}
  finally{setLoading(false);if(btn)btn.disabled=false;}
}
async function deleteSavedRoute(){
  if(!app.supabase)return notify('Cloud saved routes need Supabase config.',6000);
  if(!app.session)return notify('Sign in before deleting cloud saved routes.',6000);
  const id=$('routeSavedSelect')?.value;
  if(!id){notify('Choose a cloud saved route to delete.');return;}
  const route=getSavedRoutes().find(r=>r.id===id);
  const btn=$('routeDeleteBtn');
  if(btn)btn.disabled=true;
  setSavedRouteStatus('Deleting cloud saved route…');
  try{
    const {error}=await app.supabase.from(SAVED_ROUTES_TABLE).delete().eq('id',id);
    if(error)throw error;
    await refreshSavedRoutes(false);
    notify(route?`Deleted cloud route: ${route.name}`:'Cloud route deleted.');
  }catch(err){
    console.error(err);
    notify(err&&err.message?`Delete failed: ${err.message}`:'Could not delete cloud saved route.',7000);
    setSavedRouteStatus();
  }finally{
    if(btn)btn.disabled=false;
  }
}
function syncRouteControls(){
  setRouteMilesUI(app.routeSearch.bufferMiles||25,false);
  renderSavedRoutes();
}
function formatRouteDuration(minutes){
  const min=Number(minutes);
  if(!Number.isFinite(min)||min<=0)return 'unknown';
  const rounded=Math.max(1,Math.round(min));
  const h=Math.floor(rounded/60),m=rounded%60;
  if(h<=0)return `${m} min`;
  return `${h} hr ${m} min`;
}
function formatRouteMiles(miles){
  const mi=Number(miles);
  if(!Number.isFinite(mi)||mi<=0)return 'unknown miles';
  return `${Math.round(mi)} mi`;
}
function updateRouteStatus(){
  const el=$('routeStatus');
  const summary=$('routeSummary');
  if(!app.routeSearch.active){
    if(el)el.textContent='Route Search is off.';
    if(summary){summary.hidden=true;summary.innerHTML='';}
    return;
  }
  const miles=app.routeSearch.bufferMiles||25;
  const distText=formatRouteMiles(app.routeSearch.distanceMiles);
  const timeText=formatRouteDuration(app.routeSearch.durationMinutes);
  const shapes=(app.routeSearch.shapePoints||[]).length;
  const shown=Array.isArray(app.shownSites)?app.shownSites.length:0;
  const shapeText=shapes?` · ${shapes} route handle${shapes===1?'':'s'}`:'';
  if(el)el.textContent=`Route Search is on${shapeText}.`;
  if(summary){
    summary.hidden=false;
    summary.innerHTML=`<strong>Route summary</strong><span><b>Drive time:</b> ${esc(timeText)} estimated by OSRM</span><span><b>Distance:</b> ${esc(distText)}</span><span><b>Matching loaded sites:</b> ${shown}</span>`;
  }
}
function lngLatString(points){return points.map(p=>`${Number(p.lng).toFixed(6)},${Number(p.lat).toFixed(6)}`).join(';');}
async function requestOsrmRoute(points){
  if(points.length<2)throw new Error('A route needs at least a start and destination.');
  const url='https://router.project-osrm.org/route/v1/driving/'+lngLatString(points)+'?overview=full&geometries=geojson&steps=false&alternatives=false';
  const data=await fetchJsonWithTimeout(url,25000);
  const route=data&&Array.isArray(data.routes)?data.routes[0]:null;
  if(!route||!route.geometry||!Array.isArray(route.geometry.coordinates))throw new Error('OSRM did not return a usable route.');
  return route;
}
function routeHandleIcon(){
  return L.divIcon({className:'route-shape-handle',html:'<span title="Drag to reshape route">↕</span>',iconSize:[28,28],iconAnchor:[14,14]});
}
function clampRouteSeq(seq){return Math.max(.001,Math.min(.999,Number(seq)||.5));}
function distanceLatLngMiles(lat1,lng1,lat2,lng2){
  const mid=toRad((Number(lat1)+Number(lat2))/2);
  const dx=(Number(lng2)-Number(lng1))*69.172*Math.cos(mid);
  const dy=(Number(lat2)-Number(lat1))*69.0;
  return Math.hypot(dx,dy);
}
function routeMeasure(coords){
  const cumulative=[0];
  let total=0;
  for(let i=1;i<(coords||[]).length;i++){
    const a=coords[i-1],b=coords[i];
    const seg=distanceLatLngMiles(a.lat,a.lng,b.lat,b.lng);
    total+=Number.isFinite(seg)?seg:0;
    cumulative.push(total);
  }
  return {total,cumulative};
}
function pointAtRouteSequence(seq,coordsOverride){
  const coords=coordsOverride||app.routeSearch.coords||[];
  if(coords.length<2)return null;
  const measure=routeMeasure(coords);
  const total=measure.total;
  if(!Number.isFinite(total)||total<=0)return coords[Math.max(0,Math.min(coords.length-1,Math.round(clampRouteSeq(seq)*(coords.length-1))))];
  const target=clampRouteSeq(seq)*total;
  for(let i=1;i<coords.length;i++){
    const a=coords[i-1],b=coords[i];
    const before=measure.cumulative[i-1],after=measure.cumulative[i];
    if(target<=after||i===coords.length-1){
      const span=Math.max(.000001,after-before);
      const t=Math.max(0,Math.min(1,(target-before)/span));
      return {lat:a.lat+(b.lat-a.lat)*t,lng:a.lng+(b.lng-a.lng)*t,seq:clampRouteSeq(seq)};
    }
  }
  const last=coords[coords.length-1];
  return {lat:last.lat,lng:last.lng,seq:clampRouteSeq(seq)};
}
function segmentProjectionInfo(p,a,b){
  const lat0=toRad((p.lat+a.lat+b.lat)/3);
  const scaleX=69.172*Math.cos(lat0);
  const scaleY=69.0;
  const px=p.lng*scaleX,py=p.lat*scaleY;
  const ax=a.lng*scaleX,ay=a.lat*scaleY;
  const bx=b.lng*scaleX,by=b.lat*scaleY;
  const dx=bx-ax,dy=by-ay;
  if(dx===0&&dy===0)return {t:0,distance:Math.hypot(px-ax,py-ay)};
  const t=Math.max(0,Math.min(1,((px-ax)*dx+(py-ay)*dy)/(dx*dx+dy*dy)));
  return {t,distance:Math.hypot(px-(ax+t*dx),py-(ay+t*dy))};
}
function nearestRouteSequence(latlng){
  const coords=app.routeSearch.coords||[];
  if(coords.length<2)return .5;
  const p={lat:Number(latlng.lat),lng:Number(latlng.lng)};
  const measure=routeMeasure(coords);
  let best=Infinity,bestSeq=.5;
  for(let i=1;i<coords.length;i++){
    const a=coords[i-1],b=coords[i];
    const projection=segmentProjectionInfo(p,a,b);
    if(projection.distance<best){
      best=projection.distance;
      const before=measure.cumulative[i-1]||0;
      const seg=(measure.cumulative[i]||before)-before;
      bestSeq=measure.total>0?(before+(projection.t*seg))/measure.total:i/(coords.length-1);
    }
  }
  return clampRouteSeq(bestSeq);
}
function routePointsWithShapes(){
  const base=(app.routeSearch.basePoints||[]).filter(p=>Number.isFinite(Number(p.lat))&&Number.isFinite(Number(p.lng)));
  if(base.length<2)return [];
  const lastIndex=base.length-1;
  const interior=base.slice(1,-1).map((p,i)=>Object.assign({},p,{seq:(i+1)/lastIndex,kind:'manual-stop'}));
  const shapes=(app.routeSearch.shapePoints||[])
    .map(p=>Object.assign({},p,{seq:clampRouteSeq(p.seq),kind:'route-handle'}))
    .filter(p=>Number.isFinite(Number(p.lat))&&Number.isFinite(Number(p.lng)));
  const middle=interior.concat(shapes).sort((a,b)=>(Number(a.seq)||.5)-(Number(b.seq)||.5));
  return [base[0],...middle,base[lastIndex]];
}
function drawRouteLine(){
  if(app.routeSearch.layer)app.routeSearch.layer.clearLayers();
  const coords=app.routeSearch.coords||[];
  if(!coords.length||!app.routeSearch.layer)return;
  const line=L.polyline(coords.map(p=>[p.lat,p.lng]),{color:'#246ad4',weight:7,opacity:.82,lineCap:'round',lineJoin:'round',interactive:true});
  line.on('click',e=>addRouteShapePoint(e.latlng));
  app.routeSearch.layer.addLayer(line);
  (app.routeSearch.shapePoints||[]).forEach((pt,idx)=>{
    const marker=L.marker([pt.lat,pt.lng],{icon:routeHandleIcon(),draggable:true,keyboard:true,title:'Drag to reshape route'});
    marker.on('dragend',()=>{
      const ll=marker.getLatLng();
      app.routeSearch.shapePoints[idx].lat=ll.lat;
      app.routeSearch.shapePoints[idx].lng=ll.lng;
      rerouteWithShapePoints(true);
    });
    marker.on('click',e=>{if(e.originalEvent&&e.originalEvent.altKey){app.routeSearch.shapePoints.splice(idx,1);rerouteWithShapePoints(true);}});
    app.routeSearch.layer.addLayer(marker);
  });
}
function addRouteShapePoint(latlng){
  if(!(app.routeSearch&&app.routeSearch.active)){return;}
  app.routeSearch.shapePoints=app.routeSearch.shapePoints||[];
  app.routeSearch.shapePoints.push({lat:Number(latlng.lat),lng:Number(latlng.lng),seq:nearestRouteSequence(latlng)});
  drawRouteLine();
  notify('Route handle added. Drag it onto the road you want, then release to reroute. Add another handle farther along the road if you want the detour to last longer. Alt-click a handle to remove it.');
}
async function rerouteWithShapePoints(showNotice){
  const points=routePointsWithShapes();
  if(points.length<2)return;
  const keepCenter=app.map&&app.map.getCenter?app.map.getCenter():null;
  const keepZoom=app.map&&app.map.getZoom?app.map.getZoom():null;
  setLoading(true,'Re-routing…');
  try{
    const route=await requestOsrmRoute(points);
    const coords=route.geometry.coordinates.map(c=>({lat:Number(c[1]),lng:Number(c[0])})).filter(p=>Number.isFinite(p.lat)&&Number.isFinite(p.lng));
    if(coords.length<2)throw new Error('The reshaped route geometry was empty.');
    app.routeSearch.coords=coords;
    app.routeSearch.distanceMiles=Number(route.distance)/1609.344;
    app.routeSearch.durationMinutes=Number(route.duration)/60;
    drawRouteLine();
    renderMarkers(false);
    if(keepCenter&&Number.isFinite(keepZoom))app.map.setView(keepCenter,keepZoom,{animate:false});
    updateRouteStatus();
    if(showNotice)notify('Route reshaped. Add another handle if you need to hold the detour longer.');
  }catch(err){
    console.error(err);
    notify(err&&err.message?err.message:'Could not reshape route.');
    drawRouteLine();
  }finally{setLoading(false)}
}
function routeBounds(){
  const b=L.latLngBounds([]);
  (app.routeSearch.coords||[]).forEach(p=>b.extend([p.lat,p.lng]));
  return b;
}
function fitRouteView(){
  const b=routeBounds();
  if(b.isValid())app.map.fitBounds(b,{padding:[36,36],animate:false});
}
function routeStatesForCoords(coords,bufferMiles){
  const selected=selectedStateCodes();
  if(!coords||!coords.length)return selected.length?selected:[DEFAULT_STATE];
  const bufferLat=(Number(bufferMiles)||25)/69;
  const hits=[];
  for(const [code,b] of Object.entries(STATE_BOUNDS)){
    const midLat=(b[0][0]+b[1][0])/2;
    const bufferLng=(Number(bufferMiles)||25)/(Math.max(18,69*Math.cos(toRad(midLat))));
    const expanded=[[b[0][0]-bufferLat,b[0][1]-bufferLng],[b[1][0]+bufferLat,b[1][1]+bufferLng]];
    if(coords.some(p=>pointInBounds(p.lat,p.lng,expanded)))hits.push(code);
  }
  const mapped=new Set(mappedStateEntries().map(s=>s.code));
  const usable=sortStateCodes(hits.filter(c=>mapped.has(c)));
  return usable.length?usable:(selected.length?selected:[DEFAULT_STATE]);
}
function distancePointToSegmentMiles(p,a,b){
  const lat0=toRad((p.lat+a.lat+b.lat)/3);
  const scaleX=69.172*Math.cos(lat0);
  const scaleY=69.0;
  const px=p.lng*scaleX,py=p.lat*scaleY;
  const ax=a.lng*scaleX,ay=a.lat*scaleY;
  const bx=b.lng*scaleX,by=b.lat*scaleY;
  const dx=bx-ax,dy=by-ay;
  if(dx===0&&dy===0)return Math.hypot(px-ax,py-ay);
  const t=Math.max(0,Math.min(1,((px-ax)*dx+(py-ay)*dy)/(dx*dx+dy*dy)));
  return Math.hypot(px-(ax+t*dx),py-(ay+t*dy));
}
function routeDistanceMiles(lat,lng){
  const coords=app.routeSearch.coords||[];
  if(coords.length<2)return Infinity;
  const p={lat:Number(lat),lng:Number(lng)};
  if(!Number.isFinite(p.lat)||!Number.isFinite(p.lng))return Infinity;
  let best=Infinity;
  for(let i=1;i<coords.length;i++){
    const d=distancePointToSegmentMiles(p,coords[i-1],coords[i]);
    if(d<best)best=d;
  }
  return best;
}
function siteWithinRouteRange(site){
  if(!(app.routeSearch&&app.routeSearch.active))return true;
  const lat=Number(site.lat),lng=Number(site.lng);
  if(!Number.isFinite(lat)||!Number.isFinite(lng))return false;
  return routeDistanceMiles(lat,lng)<=Number(app.routeSearch.bufferMiles||25);
}
async function runRouteSearch(){
  const startText=$('routeStart')?.value.trim()||'';
  const endText=$('routeEnd')?.value.trim()||'';
  if(!startText||!endText){notify('Add a route start and destination first.');return;}
  const places=[startText,...routeStopInputs(),endText];
  const miles=normalizeRouteMiles($('routeMilesNumber')?.value||$('routeMiles')?.value||25);
  app.routeSearch.bufferMiles=miles;
  const btn=$('routeGoBtn');
  if(btn)btn.disabled=true;
  setLoading(true,'Mapping route…');
  try{
    const points=[];
    for(const place of places){points.push(await geocodeRoutePlace(place));}
    const route=await requestOsrmRoute(points);
    const coords=route.geometry.coordinates.map(c=>({lat:Number(c[1]),lng:Number(c[0])})).filter(p=>Number.isFinite(p.lat)&&Number.isFinite(p.lng));
    if(coords.length<2)throw new Error('The route geometry was empty.');
    if(!app.routeSearch.active)app.routeSearch.previousStates=selectedStateCodes();
    app.routeSearch.active=true;
    app.routeSearch.coords=coords;
    app.routeSearch.basePoints=points.map((p,i)=>Object.assign({},p,{seq:points.length>1?i/(points.length-1):0}));
    app.routeSearch.shapePoints=[];
    app.routeSearch.bufferMiles=miles;
    app.routeSearch.distanceMiles=Number(route.distance)/1609.344;
    app.routeSearch.durationMinutes=Number(route.duration)/60;
    drawRouteLine();
    const routeStates=routeStatesForCoords(coords,miles);
    app.enabledStates=new Set(routeStates);
    saveJson(STORE.states,[...app.enabledStates]);
    syncStateControls();
    await loadEnabledStates(false);
    drawRouteLine();
    fitRouteView();
    updateRouteStatus();
    notify(`Route Search on: ${app.shownSites.length} matching sites within ${miles} miles.`);
  }catch(err){
    console.error(err);
    notify(err&&err.message?err.message:'Route search failed.');
  }finally{
    setLoading(false);
    if(btn)btn.disabled=false;
  }
}
function clearRouteSearch(){
  const prev=Array.isArray(app.routeSearch.previousStates)?app.routeSearch.previousStates:null;
  app.routeSearch.active=false;
  app.routeSearch.coords=[];
  app.routeSearch.basePoints=[];
  app.routeSearch.shapePoints=[];
  app.routeSearch.distanceMiles=null;
  app.routeSearch.durationMinutes=null;
  app.routeSearch.previousStates=null;
  if(app.routeSearch.layer)app.routeSearch.layer.clearLayers();
  if(prev){app.enabledStates=new Set(prev);saveJson(STORE.states,[...app.enabledStates]);syncStateControls();loadEnabledStates(true);}else{renderMarkers(true);}
  updateRouteStatus();
  notify('Route Search cleared.');
}

function bindEvents(){
  bindSidebarTabs();
  bindControlHomeNav();
  const menuToggle=$('menuToggle');
  if(menuToggle)menuToggle.onclick=()=>{
    if($('sidebar').classList.contains('closed')){
      const home=preferredControlHome();
      if(isPhoneView())setMobileMode(home);else setDesktopMode(home);
    }else{
      if(isPhoneView()){setMobileMode('map');$('sidebar').classList.add('closed');}else{setDesktopMode('map');}
    }
    setTimeout(()=>app.map.invalidateSize(),220);
  };
  const closeSidebar=$('closeSidebar');
  if(closeSidebar)closeSidebar.onclick=()=>{if(isPhoneView()){setMobileMode('map');$('sidebar').classList.add('closed');}else{setDesktopMode('map');} setTimeout(()=>app.map.invalidateSize(),220)};
  const basemap=$('basemapSelect');
  if(basemap)basemap.onchange=e=>{const key=applyBasemapClass(e.target.value);Object.values(app.baseLayers).forEach(t=>app.map.removeLayer(t));(app.baseLayers[key]||app.baseLayers.topo).addTo(app.map);localStorage.setItem(STORE.basemap,key)};
  const stateMenuButton=$('stateMenuButton'); const stateMenuPanel=$('stateMenuPanel');
  if(stateMenuButton&&stateMenuPanel)stateMenuButton.onclick=()=>{const open=stateMenuPanel.hidden; stateMenuPanel.hidden=!open; stateMenuButton.setAttribute('aria-expanded',open?'true':'false')};
  document.addEventListener('click',e=>{if(stateMenuPanel&&stateMenuButton&&!stateMenuPanel.hidden&&$('stateSection')&&!$('stateSection').contains(e.target)){stateMenuPanel.hidden=true;stateMenuButton.setAttribute('aria-expanded','false')}});
  const allStatesBtn=$('selectAllStates'); if(allStatesBtn)allStatesBtn.onclick=()=>setEnabledStates(mappedStateEntries().map(s=>s.code),true,{source:'select-all'});
  const clearStatesBtn=$('clearStates'); if(clearStatesBtn)clearStatesBtn.onclick=()=>setEnabledStates([],true,{skipPerformanceConfirm:true});
  const stateChecklist=$('stateChecklist'); if(stateChecklist)stateChecklist.addEventListener('change',e=>{if(!e.target.dataset.stateCode)return; const codes=$$('[data-state-code]',stateChecklist).filter(cb=>cb.checked).map(cb=>cb.dataset.stateCode); setEnabledStates(codes,true,{source:'manual'})});
  const selectAllLayers=$('selectAllLayers'); if(selectAllLayers)selectAllLayers.onclick=()=>{app.restOnlyMode=false;syncRestOnlyToggle();setAllLayers(true)};
  const clearAllLayers=$('clearAllLayers'); if(clearAllLayers)clearAllLayers.onclick=()=>{app.restOnlyMode=false;syncRestOnlyToggle();setAllLayers(false)};
  const selectAllLayersMobile=$('selectAllLayersMobile'); if(selectAllLayersMobile)selectAllLayersMobile.onclick=()=>{app.restOnlyMode=false;syncRestOnlyToggle();setAllLayers(true)};
  const clearAllLayersMobile=$('clearAllLayersMobile'); if(clearAllLayersMobile)clearAllLayersMobile.onclick=()=>{app.restOnlyMode=false;syncRestOnlyToggle();setAllLayers(false)};
  const restOnlyToggle=$('restOnlyToggle'); if(restOnlyToggle)restOnlyToggle.onclick=toggleRestOnlyMode;
  $$('[data-area-outline-toggle]').forEach(areaToggle=>{areaToggle.onchange=e=>setAreaOutlineLayerEnabled(e.target.checked,false);});
  $$('[data-legend-zoom]').forEach(z=>{z.oninput=e=>applyLegendZoom(e.target.value);});
  const clearOutlineBtn=$('clearAreaOutlineBtn'); if(clearOutlineBtn)clearOutlineBtn.onclick=()=>setAreaOutlineLayerEnabled(false,false);
  const layerList=$('layerList'); if(layerList)layerList.addEventListener('change',applyLayerCheckboxChange);
  const desktopLegend=$('mapLegendDesktop'); if(desktopLegend)desktopLegend.addEventListener('change',applyLayerCheckboxChange);
  const showPending=$('showPendingLayer'); if(showPending)showPending.onchange=e=>{e.target.checked?app.enabledLayers.add('pending'):app.enabledLayers.delete('pending');localStorage.setItem(STORE.pending,e.target.checked?'1':'0');saveLayers();updatePendingMeta();syncLayerControls();toggleMarkerLayer('pending',e.target.checked)};
  const searchBtn=$('searchBtn'); if(searchBtn)searchBtn.onclick=runSearch;
  const searchInput=$('searchInput'); if(searchInput)searchInput.addEventListener('keydown',e=>{if(e.key==='Enter')runSearch()});
  const clearSearchBtn=$('clearSearchBtn'); if(clearSearchBtn)clearSearchBtn.onclick=()=>clearSearchMode(true);
  const nearMiles=$('nearMiles'); if(nearMiles)nearMiles.oninput=()=>setNearMilesUI(nearMiles.value,true);
  const nearMilesNumber=$('nearMilesNumber'); if(nearMilesNumber){nearMilesNumber.oninput=()=>setNearMilesUI(nearMilesNumber.value,true);nearMilesNumber.onchange=()=>setNearMilesUI(nearMilesNumber.value,true);}
  const pickNearLocationBtn=$('pickNearLocationBtn'); if(pickNearLocationBtn)pickNearLocationBtn.onclick=beginNearMapPick;
  const clearNearLocationBtn=$('clearNearLocationBtn'); if(clearNearLocationBtn)clearNearLocationBtn.onclick=clearNearbyMode;
  const routeGo=$('routeGoBtn'); if(routeGo)routeGo.onclick=runRouteSearch;
  const routeClear=$('routeClearBtn'); if(routeClear)routeClear.onclick=clearRouteSearch;
  const routeAdd=$('routeAddStopBtn'); if(routeAdd)routeAdd.onclick=()=>addRouteStopInput();
  const pickRouteStart=$('pickRouteStartBtn'); if(pickRouteStart)pickRouteStart.onclick=()=>beginRouteMapPick('start');
  const pickRouteStop=$('pickRouteStopBtn'); if(pickRouteStop)pickRouteStop.onclick=()=>beginRouteMapPick('stop');
  const pickRouteEnd=$('pickRouteEndBtn'); if(pickRouteEnd)pickRouteEnd.onclick=()=>beginRouteMapPick('end');
  const routeMiles=$('routeMiles'); if(routeMiles)routeMiles.oninput=()=>setRouteMilesUI(routeMiles.value,true);
  const routeMilesNumber=$('routeMilesNumber'); if(routeMilesNumber){routeMilesNumber.oninput=()=>setRouteMilesUI(routeMilesNumber.value,true);routeMilesNumber.onchange=()=>setRouteMilesUI(routeMilesNumber.value,true);}
  const routeSave=$('routeSaveBtn'); if(routeSave)routeSave.onclick=()=>saveCurrentRoute();
  const routeLoad=$('routeLoadBtn'); if(routeLoad)routeLoad.onclick=()=>loadSavedRoute();
  const routeSavedSelect=$('routeSavedSelect'); if(routeSavedSelect)routeSavedSelect.onchange=()=>{if(routeSavedSelect.value)loadSavedRoute();};
  const routeDelete=$('routeDeleteBtn'); if(routeDelete)routeDelete.onclick=()=>deleteSavedRoute();
  ['routeStart','routeEnd','routeSaveName'].forEach(id=>{$(id)?.addEventListener('keydown',e=>{if(e.key==='Enter'){if(id==='routeSaveName')saveCurrentRoute();else runRouteSearch();}})});
  const nearMeBtn=$('nearMeBtn'); if(nearMeBtn)nearMeBtn.onclick=nearMe;
  ['enableLocationBtn','enableLocationBtnMobile'].forEach(id=>{const b=$(id);if(b)b.onclick=()=>requestLocationFromButton(true)});
  const openAddSiteBtn=$('openAddSiteBtn'); if(openAddSiteBtn)openAddSiteBtn.onclick=()=>openModal('addSiteModal');
  const openQueueBtn=$('openQueueBtn'); if(openQueueBtn)openQueueBtn.onclick=()=>openModal('queueModal');
  $$('[data-close-modal]').forEach(b=>b.onclick=()=>closeModal(b.dataset.closeModal));
  $$('.modal-backdrop').forEach(m=>m.addEventListener('click',e=>{if(e.target===m)closeModal(m.id)}));
  $$('[data-mobile-action]').forEach(b=>b.onclick=()=>mobileAction(b.dataset.mobileAction));
  $$('[data-desktop-action]').forEach(b=>b.onclick=()=>desktopAction(b.dataset.desktopAction));
  if(!isPhoneView())setDesktopMode(preferredControlHome());
  else setControlHome(preferredControlHome());
  $$('[data-mobile-close]').forEach(b=>b.onclick=closeMobilePanel);
  const addMode=$('addMode'); if(addMode)addMode.onchange=()=>notify(addMode.checked?'Click the map to place a draft pin.':'Add mode off.');
  app.map.on('click',e=>{if(handleMapPickClick(e.latlng))return;if($('addMode')&&$('addMode').checked)setDraftPoint(e.latlng)});
  const appendDraftBtn=$('appendDraftBtn'); if(appendDraftBtn)appendDraftBtn.onclick=appendDraft;
  const clearDraftBtn=$('clearDraftBtn'); if(clearDraftBtn)clearDraftBtn.onclick=clearDraft;
  const copyQueueBtn=$('copyQueueBtn'); if(copyQueueBtn)copyQueueBtn.onclick=copyQueue;
  const clearQueueBtn=$('clearQueueBtn'); if(clearQueueBtn)clearQueueBtn.onclick=()=>{app.draftQueue=[];saveJson(STORE.queue,app.draftQueue);$('draftQueue').value='';notify('Queue cleared.')};
  const sendDraftSupabaseBtn=$('sendDraftSupabaseBtn'); if(sendDraftSupabaseBtn)sendDraftSupabaseBtn.onclick=sendDraftSupabase;
  const submitCorrectionBtn=$('submitCorrectionBtn'); if(submitCorrectionBtn)submitCorrectionBtn.onclick=submitCorrection;
  const sbAuthForm=$('sbAuthForm'); if(sbAuthForm)sbAuthForm.onsubmit=signIn;
  const createBtn=$('sbCreateAccountBtn'); if(createBtn)createBtn.onclick=createAccount;
  const passwordToggle=$('sbPasswordToggle'); if(passwordToggle)passwordToggle.onclick=togglePasswordVisibility;
  const adminMakeAdminBtn=$('adminMakeAdminBtn'); if(adminMakeAdminBtn)adminMakeAdminBtn.onclick=promoteAdminByEmail;
  const adminEmailInput=$('adminEmailInput'); if(adminEmailInput)adminEmailInput.addEventListener('keydown',e=>{if(e.key==='Enter')promoteAdminByEmail();});
  const sbSignOutBtn=$('sbSignOutBtn'); if(sbSignOutBtn)sbSignOutBtn.onclick=signOut;
  const costFilter=$('costFilter'); if(costFilter)costFilter.onchange=()=>setCostFilter(costFilter.value);
  $$('[data-water-filter]').forEach(cb=>cb.onchange=()=>setWaterFilter(cb.dataset.waterFilter,cb.checked));
  $$('[data-access-filter]').forEach(cb=>cb.onchange=()=>setAccessFilter(cb.dataset.accessFilter,cb.checked));
  $$('[data-filter-chip]').forEach(c=>c.onclick=()=>toggleQuickFilter(c.dataset.filterChip));
  $$('[data-community-filter]').forEach(c=>c.onclick=()=>toggleCommunityFilter(c.dataset.communityFilter));
  const clearFiltersBtn=$('clearFiltersBtn'); if(clearFiltersBtn)clearFiltersBtn.onclick=clearFilters;
  retireLegacyLayerControls();
}
function saveLayers(){app.enabledLayers=new Set([...app.enabledLayers].filter(k=>LAYER_CONTROL_KEYS.has(k)));saveJson(STORE.layers,[...app.enabledLayers]);$$('[data-layer]').forEach(i=>i.checked=app.enabledLayers.has(i.dataset.layer));}
function syncRestOnlyToggle(){const btn=$('restOnlyToggle'); if(btn){btn.classList.toggle('active',!!app.restOnlyMode); btn.textContent=app.restOnlyMode?'Exit rest stops':'Rest stops only'; btn.setAttribute('aria-pressed',app.restOnlyMode?'true':'false');}}
function toggleRestOnlyMode(){app.restOnlyMode=!app.restOnlyMode;syncRestOnlyToggle();if(app.restOnlyMode){loadEnabledStates(true).then(()=>notify('Showing only Rest Areas & Roadside Stops for selected states.'));}else{renderMarkers(true);notify('Rest-stop focus off. Restored selected layers.');}}
function setAllLayers(on){app.restOnlyMode=false;syncRestOnlyToggle();MAP_LAYERS.forEach(l=>on?app.enabledLayers.add(l.key):app.enabledLayers.delete(l.key));saveLayers();updatePendingMeta();syncLayerControls();renderMarkers(false)}
function updatePendingMeta(){const on=app.enabledLayers.has('pending');const p=$('showPendingLayer');if(p)p.checked=on;const m=$('pendingMeta');if(m)m.textContent=on?'on':'off';syncRestOnlyToggle()}
function normalizeFilters(){
  app.filters=app.filters||{};
  app.filters.chips=app.filters.chips||{};
  app.filters.maxCost=String(app.filters.maxCost||'');
  const oldWater=typeof app.filters.water==='string'?app.filters.water:'';
  if(!app.filters.water||typeof app.filters.water!=='object'||Array.isArray(app.filters.water))app.filters.water={lake:false,rivercreek:false};
  if(oldWater==='lake')app.filters.water.lake=true;
  if(oldWater==='rivercreek')app.filters.water.rivercreek=true;
  app.filters.water.lake=!!app.filters.water.lake;
  app.filters.water.rivercreek=!!app.filters.water.rivercreek;
  const oldAccess=typeof app.filters.access==='string'?app.filters.access:'';
  if(!app.filters.access||typeof app.filters.access!=='object'||Array.isArray(app.filters.access))app.filters.access={twowd:false,hc:false,fw:false};
  if(oldAccess==='2wd')app.filters.access.twowd=true;
  if(oldAccess==='hc')app.filters.access.hc=true;
  if(oldAccess==='4wd')app.filters.access.fw=true;
  app.filters.access.twowd=!!app.filters.access.twowd;
  app.filters.access.hc=!!app.filters.access.hc;
  app.filters.access.fw=!!app.filters.access.fw;
  app.filters.chips.showers=!!app.filters.chips.showers;
  if(!app.filters.community||typeof app.filters.community!=='object'||Array.isArray(app.filters.community))app.filters.community={is_favorite:false,want_to_visit:false,visited:false,loved:false};
  ['is_favorite','want_to_visit','visited','loved'].forEach(key=>{app.filters.community[key]=!!app.filters.community[key];});
  delete app.filters.chips.free;
  delete app.filters.chips.under20;
  delete app.filters.chips.twowd;
}
function isQuickFilterActive(key){
  normalizeFilters();
  if(key==='free')return app.filters.maxCost==='0';
  if(key==='under20')return app.filters.maxCost==='20';
  if(key==='twowd')return !!app.filters.access.twowd;
  if(key==='showers')return !!app.filters.chips.showers;
  return false;
}
const COMMUNITY_FILTER_DEFS=[
  {key:'is_favorite',label:'Favorited'},
  {key:'want_to_visit',label:'Want to visit'},
  {key:'visited',label:'Visited'},
  {key:'loved',label:'Loved'}
];
function communityFilterLabel(key){const row=COMMUNITY_FILTER_DEFS.find(x=>x.key===key);return row?row.label:key;}
function activeCommunityFilterKeys(){normalizeFilters();return COMMUNITY_FILTER_DEFS.map(x=>x.key).filter(key=>app.filters.community&&app.filters.community[key]);}
function communityFilterIsActive(){return activeCommunityFilterKeys().length>0;}
function syncCommunityFilterControls(){
  normalizeFilters();
  $$('[data-community-filter]').forEach(btn=>{
    const key=btn.dataset.communityFilter;
    const on=!!(app.filters.community&&app.filters.community[key]);
    btn.classList.toggle('active',on);
    btn.setAttribute('aria-pressed',on?'true':'false');
  });
}
function toggleCommunityFilter(key){
  normalizeFilters();
  if(!COMMUNITY_FILTER_DEFS.some(x=>x.key===key))return;
  app.filters.community[key]=!app.filters.community[key];
  applyFilterChange();
  if(app.filters.community[key]&&!app.session)notify('Sign in under Options to use saved-site filters.',6500);
}
function siteMatchesCommunityFilters(site){
  const keys=activeCommunityFilterKeys();
  if(!keys.length)return true;
  if(!signedInCommunity())return false;
  const state=favoriteState(siteStableId(site));
  return keys.some(key=>!!(state&&state[key]));
}
function syncFilters(){
  normalizeFilters();
  const cost=$('costFilter'); if(cost)cost.value=app.filters.maxCost||'';
  $$('[data-water-filter]').forEach(cb=>{cb.checked=!!app.filters.water[cb.dataset.waterFilter]});
  $$('[data-access-filter]').forEach(cb=>{cb.checked=!!app.filters.access[cb.dataset.accessFilter]});
  $$('[data-filter-chip]').forEach(c=>c.classList.toggle('active',isQuickFilterActive(c.dataset.filterChip)));
  syncCommunityFilterControls();
  updateFilterStatus();
}

function updateFilterStatus(){
  normalizeFilters();
  const parts=[];
  const maxCost=String(app.filters.maxCost||'');
  if(maxCost==='0')parts.push('Free only');
  else if(maxCost)parts.push(`$${maxCost} or less`);
  const water=app.filters.water||{};
  if(water.lake)parts.push('Lake / pond / flowage');
  if(water.rivercreek)parts.push('River / creek');
  const access=app.filters.access||{};
  if(access.twowd)parts.push('2WD friendly');
  if(access.hc)parts.push('High clearance');
  if(access.fw)parts.push('4WD noted');
  if(app.filters.chips&&app.filters.chips.showers)parts.push('Showers');
  const communityKeys=activeCommunityFilterKeys();
  if(communityKeys.length)parts.push('My saved sites: '+communityKeys.map(communityFilterLabel).join(' / ')+(app.session?'':' (sign in required)'));
  const el=$('filterStatus');
  if(el)el.textContent=parts.length?`Filters active: ${parts.join(' · ')}`:'No filters active.';
}

function saveFilters(){normalizeFilters();saveJson(STORE.filters,app.filters)}
function applyFilterChange(){syncFilters();saveFilters();renderMarkers(false)}
function setCostFilter(value){normalizeFilters();app.filters.maxCost=String(value||'');applyFilterChange()}
function setWaterFilter(key,on){normalizeFilters();if(app.filters.water&&key in app.filters.water)app.filters.water[key]=!!on;applyFilterChange()}
function setAccessFilter(key,on){normalizeFilters();if(app.filters.access&&key in app.filters.access)app.filters.access[key]=!!on;applyFilterChange()}
function toggleQuickFilter(key){
  normalizeFilters();
  const active=isQuickFilterActive(key);
  if(key==='free')app.filters.maxCost=active?'':'0';
  else if(key==='under20')app.filters.maxCost=active?'':'20';
  else if(key==='twowd')app.filters.access.twowd=!active;
  else if(key==='showers')app.filters.chips.showers=!active;
  applyFilterChange();
}
function clearFilters(){
  app.filters=blankFilters();
  applyFilterChange();
  notify('Filters cleared.');
}
function openModal(id){$(id)?.classList.add('open');$(id)?.setAttribute('aria-hidden','false')} function closeModal(id){$(id)?.classList.remove('open');$(id)?.setAttribute('aria-hidden','true')}
function isPhoneView(){return !!(window.matchMedia&&window.matchMedia('(max-width:700px)').matches)}
function closeMobilePanel(){mobileAction('map')}
function setMobileMode(mode){
  const safe=(mode==='map'||CONTROL_HOMES.includes(mode))?mode:'where';
  const body=document.body;
  ['map',...CONTROL_HOMES].forEach(m=>body.classList.toggle('mobile-mode-'+m,safe===m));
  body.classList.toggle('mobile-panel-active',safe!=='map');
  $$('[data-mobile-action]').forEach(b=>b.classList.toggle('active',b.dataset.mobileAction===safe));
  if(safe!=='map')setControlHome(safe);
}
function mobileAction(a){
  if(a==='map'){
    setMobileMode('map');
    $('sidebar').classList.add('closed');
    setTimeout(()=>app.map.invalidateSize(),220);
    return;
  }
  if(a==='layers'){
    showSidebarTab('main');
    setMobileMode('options');
    $('sidebar').classList.remove('closed');
    const panel=$('legendPanelMobile');
    if(panel)panel.open=true;
    setTimeout(()=>{
      $$('[data-mobile-action]').forEach(b=>b.classList.toggle('active',b.dataset.mobileAction==='layers'));
      $('mobileLegendSection')?.scrollIntoView({block:'start',behavior:'smooth'});
      app.map.invalidateSize();
    },120);
    return;
  }
  const home=CONTROL_HOMES.includes(a)?a:'where';
  showSidebarTab('main');
  setMobileMode(home);
  $('sidebar').classList.remove('closed');
  setTimeout(()=>app.map.invalidateSize(),220);
}
function setDesktopMode(mode){
  const safe=(mode==='map'||CONTROL_HOMES.includes(mode))?mode:'where';
  const body=document.body;
  ['map',...CONTROL_HOMES].forEach(m=>body.classList.toggle('desktop-mode-'+m,safe===m));
  body.classList.toggle('desktop-panel-active',safe!=='map');
  $$('[data-desktop-action]').forEach(b=>b.classList.toggle('active',b.dataset.desktopAction===safe));
  if(safe==='map')$('sidebar')?.classList.add('closed');
  else{
    $('sidebar')?.classList.remove('closed');
    setControlHome(safe);
  }
}
function desktopAction(a){
  if(a==='map'){
    setDesktopMode('map');
    setTimeout(()=>app.map.invalidateSize(),220);
    return;
  }
  const home=CONTROL_HOMES.includes(a)?a:'where';
  showSidebarTab('main');
  setDesktopMode(home);
  setTimeout(()=>app.map.invalidateSize(),220);
}


async function loadEnabledStates(fit){
  const loadId=++app.loadSeq;
  setLoading(true,'Loading map…');
  const states=[...app.enabledStates];
  const nextSites=[];
  if(states.length===0){
    if(loadId===app.loadSeq){app.sites=[];await renderMarkers(false);setLoading(false);syncStateControls();}
    return;
  }
  for(let i=0;i<states.length;i++){
    const code=states[i];
    setLoading(true,`Loading ${stateLabel(code)} (${i+1} of ${states.length})…`);
    await loadState(code);
    if(loadId!==app.loadSeq)return;
    nextSites.push(...(app.stateData[code]||[]));
    if(states.length>8)await new Promise(requestAnimationFrame);
  }
  nextSites.push(...getPendingSites().filter(s=>states.includes(String(s.stateCode||s.state||'').toUpperCase())));
  if(loadId!==app.loadSeq)return;
  app.sites=nextSites;
  syncStateControls();
  await renderMarkers(fit);
  if(loadId===app.loadSeq)setLoading(false);
}
function loadScriptOnce(src,attr,val){return new Promise(res=>{let done=false;const finish=()=>{if(done)return;done=true;res();};const existing=document.querySelector(`script[${attr}="${val}"]`);if(existing){if(existing.dataset.loaded==='1'||existing.dataset.failed==='1')return finish();existing.addEventListener('load',finish,{once:true});existing.addEventListener('error',finish,{once:true});setTimeout(finish,15000);return;}const s=document.createElement('script');const sep=String(src).includes('?')?'&':'?';s.src=src+sep+'data='+encodeURIComponent(DATA_VERSION||VERSION||Date.now());s.setAttribute(attr,val);const timer=setTimeout(()=>{s.dataset.failed='1';console.warn('Timed out loading data file',src);finish();},15000);s.onload=()=>{clearTimeout(timer);s.dataset.loaded='1';finish();};s.onerror=()=>{clearTimeout(timer);s.dataset.failed='1';console.warn('Failed to load data file',src);finish();};document.head.appendChild(s)})}

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
    await loadScriptOnce('data/mi-overnight-parking-v23.0.24.js','data-state-file','MI-overnight-parking-v23_0_24');
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
function shouldLoadMiRestRoadside(){return !!app.restOnlyMode;}
function shouldLoadMiLocalTravelerStops(){return !!app.restOnlyMode;}
function shouldLoadMiPrivateRvParks(){return app.enabledLayers.has('private');}
function shouldLoadMiOvernightParking(){return app.enabledLayers.has('overnight-parking');}
async function ensureMichiganDynamicSupplements(base){
  if(!base)return;
  if(shouldLoadMiRestRoadside()&&!app.miDynamicLoaded.mdot){
    const mdot=await loadMdotLiveRestRoadside('MI');
    mergeUniqueSites(base,mdot);
    app.miDynamicLoaded.mdot=true;
  }
  if(shouldLoadMiLocalTravelerStops()&&!app.miDynamicLoaded.localTraveler){
    const localStops=await loadMiLocalTravelerStops();
    mergeUniqueSites(base,localStops);
    app.miDynamicLoaded.localTraveler=true;
  }
  if(shouldLoadMiPrivateRvParks()&&!app.miDynamicLoaded.privateRv){
    const privateRvParks=await loadMiPrivateRvParks();
    mergeUniqueSites(base,privateRvParks);
    app.miDynamicLoaded.privateRv=true;
  }
  if(shouldLoadMiOvernightParking()&&!app.miDynamicLoaded.overnight){
    const overnightParking=await loadMiOvernightParking();
    mergeUniqueSites(base,overnightParking);
    app.miDynamicLoaded.overnight=true;
  }
}
async function loadState(code){
  code=String(code||'').toUpperCase();
  if(!app.stateData[code]){
    const row=manifestEntries().find(s=>s.code===code);
    const files=row?(Array.isArray(row.files)&&row.files.length?row.files:(row.file?[row.file]:[])):[];
    if(!files.length){app.stateData[code]=[];return Promise.resolve()}
    window.CAMPING_STATE_DATA=window.CAMPING_STATE_DATA||{};
    for(const file of files){await loadScriptOnce(file,'data-state-file',`${code}-${file.replace(/[^a-zA-Z0-9_-]/g,'_')}`)}
    app.stateData[code]=(window.CAMPING_STATE_DATA&&window.CAMPING_STATE_DATA[code])||[];
  }
  if(code==='MI')await ensureMichiganDynamicSupplements(app.stateData[code]);
}

function getPendingSites(){const raw=window.CAMPING_PENDING_SITES||window.CAMPING_PENDING||[];return Array.isArray(raw)?raw.map(s=>Object.assign({pending:true},s)):[]}
function markerIcon(site){const key=layerKey(site);const d=layerDef(key);const size=markerSizeForLayer(key);const anchor=Math.round(size/2);const pinStyle=`width:${size}px;height:${size}px;flex:0 0 ${size}px;`;return L.divIcon({className:'',html:`<span class="map-pin ${d.css}" style="${pinStyle}">${d.icon}</span>`,iconSize:[size,size],iconAnchor:[anchor,anchor],popupAnchor:[0,-anchor]})}

function markerClusterIcon(key,count){
  const d=layerDef(key);
  const n=Number(count)||0;
  const size=Math.max(20,Math.min(38,20+Math.round(Math.log(Math.max(2,n))*6)));
  const anchor=Math.round(size/2);
  return L.divIcon({className:'',html:`<span class="map-cluster ${d.css}" style="width:${size}px;height:${size}px;flex:0 0 ${size}px;"><span>${n>999?'999+':n}</span></span>`,iconSize:[size,size],iconAnchor:[anchor,anchor],popupAnchor:[0,-anchor]});
}
function buildMarkerClusters(candidates){
  const zoom=app.map&&app.map.getZoom?app.map.getZoom():4;
  const cell=72;
  const clusters=new Map();
  const markerErrors=[];
  (candidates||[]).forEach(site=>{
    try{
      const key=layerKey(site);
      if(!MAP_LAYER_KEYS.has(key))return;
      const lat=Number(site.lat),lng=Number(site.lng);
      if(!Number.isFinite(lat)||!Number.isFinite(lng)){markerErrors.push(`${site&&site.name||site&&site.id||'Unnamed site'}: invalid coordinates`);return;}
      const projected=app.map.project(L.latLng(lat,lng),zoom);
      const cx=Math.floor(projected.x/cell),cy=Math.floor(projected.y/cell);
      const clusterKey=`${key}|${cx}|${cy}`;
      if(!clusters.has(clusterKey))clusters.set(clusterKey,{key,sites:[],latSum:0,lngSum:0,bounds:[]});
      const cluster=clusters.get(clusterKey);
      cluster.sites.push(site);
      cluster.latSum+=lat;
      cluster.lngSum+=lng;
      cluster.bounds.push([lat,lng]);
    }catch(err){markerErrors.push(`${site&&site.name||site&&site.id||'Unnamed site'}: ${err&&err.message?err.message:String(err)}`);}
  });
  const rows=Array.from(clusters.values()).map(cluster=>Object.assign(cluster,{lat:cluster.latSum/cluster.sites.length,lng:cluster.lngSum/cluster.sites.length}));
  return {clusters:rows,markerErrors};
}
function markerClusterPopup(cluster){
  const key=cluster&&cluster.key;
  const def=layerDef(key);
  const sites=(cluster&&cluster.sites)||[];
  const shown=sites.slice(0,10).map(site=>`<li>${esc(site.name||'Unnamed site')} <span class="muted">${esc(site.stateName||site.stateCode||'')}</span></li>`).join('');
  const more=sites.length>10?`<div class="mini-note">+ ${sites.length-10} more in this low-zoom cluster.</div>`:'';
  return `<div><div class="popup-title">${sites.length} ${esc(def.label)} markers</div><div class="popup-notice">Markers are clustered below zoom 4.5 for speed and readability. Zoom in to see individual campsite pins.</div><ul class="cluster-site-list">${shown}</ul>${more}</div>`;
}
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

function areaOutlineCandidate(site){
  if(!site)return null;
  const raw=site.areaOutline||site.area_outline||site.areaOverlay||site.area_overlay||null;
  let outline=(raw&&typeof raw==='object')?Object.assign({},raw):null;
  const status=site.areaOutlineStatus||site.areaOverlayStatus||site.area_outline_status||site.area_overlay_status;
  if(!outline&&status)outline={status};
  if(!outline)return null;
  outline.status=String(outline.status||outline.outlineStatus||'available').toLowerCase().replace(/\s+/g,'_');
  outline.sourceName=outline.sourceName||outline.source||outline.officialSourceName||site.areaOutlineSourceName||site.areaOverlaySourceName||'Official source';
  outline.sourceUrl=outline.sourceUrl||outline.officialSourceUrl||outline.official_outline_source_url||site.areaOutlineSourceUrl||site.areaOverlaySourceUrl||'';
  outline.boundaryRepresents=outline.boundaryRepresents||outline.boundary_represents||site.boundaryRepresents||'Official context boundary';
  outline.caution=outline.caution||outline.cautionWording||outline.caution_wording||site.areaOutlineCaution||'Context outline only — not a legal campsite boundary.';
  outline.recommendedUse=outline.recommendedUse||outline.recommended_use||'context-only';
  outline.exactCampingBoundary=!!(outline.exactCampingBoundary||outline.exact_camping_boundary);
  return outline;
}
function areaOutlineHasFetchSource(outline){
  if(!outline)return false;
  if(outline.geojson||outline.featureCollection)return true;
  if(outline.geojsonUrl||outline.queryUrl||outline.url)return true;
  if(outline.layerUrl||outline.arcgisLayerUrl||outline.gisLayerUrl)return true;
  if(outline.serviceUrl&&outline.layerId!==undefined)return true;
  return false;
}
function areaOutlineIsAvailable(outline){
  if(!outline)return false;
  if(['needs_verification','not_available','not-yet-available','not_yet_available','none','missing'].includes(String(outline.status||'').toLowerCase()))return false;
  return areaOutlineHasFetchSource(outline);
}
function siteOutlineKey(site){
  const base=[site.id||site.slug||site.name||'site',site.stateCode||site.stateName||'',site.lat||'',site.lng||''].join('|');
  let hash=0;
  for(let i=0;i<base.length;i++){hash=((hash<<5)-hash)+base.charCodeAt(i);hash|=0;}
  return 'outline_'+Math.abs(hash);
}
function jsString(v){return String(v||'').replace(/\\/g,'\\\\').replace(/'/g,"\\'").replace(/\n/g,' ');}
function registerAreaOutlineSite(site){
  const outline=areaOutlineCandidate(site);
  if(!outline)return '';
  const key=siteOutlineKey(site);
  app.areaOutline.registry[key]=site;
  return key;
}
function areaOutlinePopup(site){
  const outline=areaOutlineCandidate(site);
  if(!outline)return '';
  const key=registerAreaOutlineSite(site);
  if(areaOutlineIsAvailable(outline)){
    return `<div class="popup-notice area-outline-notice"><strong>Official area outline available.</strong><br>This shows the general agency/planning area for context. It is not a campsite pin and it does not mean camping is legal everywhere inside the outline. Open it, then verify current rules, closures, road access, private inholdings, permits, and posted signs before camping.</div><div class="popup-actions"><button class="secondary" type="button" onclick="window.__campingApp&&window.__campingApp.showAreaOutlineByKey&&window.__campingApp.showAreaOutlineByKey('${jsString(key)}')">Show official area outline</button><button class="secondary" type="button" onclick="window.__campingApp&&window.__campingApp.clearAreaOutline&&window.__campingApp.clearAreaOutline()">Clear outline</button></div>`;
  }
  if(outline.status&&outline.status!=='available'){
    return `<div class="popup-notice area-outline-notice"><strong>Area outline not ready.</strong><br>This record has area/rule context, but the app does not yet have a clean official outline to draw.</div>`;
  }
  return '';
}
function addQueryParams(url,params){
  const u=new URL(url,window.location.href);
  Object.entries(params).forEach(([k,v])=>{if(!u.searchParams.has(k))u.searchParams.set(k,v);});
  return u.href;
}
function areaOutlineArcgisUrl(outline){
  let layer=outline.layerUrl||outline.arcgisLayerUrl||outline.gisLayerUrl||'';
  if(!layer&&outline.serviceUrl&&outline.layerId!==undefined){
    layer=String(outline.serviceUrl).replace(/\/+$/,'')+'/'+String(outline.layerId).replace(/^\/+/,'');
  }
  if(!layer)return '';
  let url=String(layer).replace(/\/+$/,'');
  if(!/\/query$/i.test(url))url+='/query';
  const where=outline.where||outline.filter||outline.query||outline.countyFilter||'1=1';
  return addQueryParams(url,{where,outFields:outline.outFields||'*',returnGeometry:'true',outSR:outline.outSR||4326,f:'geojson'});
}
function areaOutlineFetchUrl(outline){
  if(!outline)return '';
  if(outline.queryUrl)return String(outline.queryUrl);
  if(outline.geojsonUrl)return String(outline.geojsonUrl);
  if(outline.url)return String(outline.url);
  return areaOutlineArcgisUrl(outline);
}
function normalizeAreaGeoJson(data){
  if(!data)throw new Error('No outline data returned.');
  if(data.type==='FeatureCollection'||data.type==='Feature')return data;
  if(Array.isArray(data.features)&&data.features.length&&data.features[0].geometry)return {type:'FeatureCollection',features:data.features};
  throw new Error('Outline source did not return GeoJSON geometry.');
}
async function loadAreaOutlineGeoJson(outline){
  if(outline.geojson||outline.featureCollection)return normalizeAreaGeoJson(outline.geojson||outline.featureCollection);
  const url=areaOutlineFetchUrl(outline);
  if(!url)throw new Error('No fetchable official outline URL is attached to this record.');
  const cacheKey=url;
  if(app.areaOutline.cache[cacheKey])return app.areaOutline.cache[cacheKey];
  const data=await fetchJsonWithTimeout(url,30000);
  const geo=normalizeAreaGeoJson(data);
  app.areaOutline.cache[cacheKey]=geo;
  return geo;
}
function areaOutlineStyle(feature){
  const props=(feature&&feature.properties)||{};
  const owner=String(props.ownerclassification||props.OWNERCLASSIFICATION||'').toLowerCase();
  if(owner && !/usda\s+forest\s+service/.test(owner)){
    return {color:'#8a4f13',weight:2,opacity:.9,fillColor:'#d6a24a',fillOpacity:.24,dashArray:'4 4'};
  }
  if(/usda\s+forest\s+service/.test(owner)){
    return {color:'#285d42',weight:2,opacity:.92,fillColor:'#6fa27f',fillOpacity:.18,dashArray:null};
  }
  return {color:'#285d42',weight:3,opacity:.95,fillColor:'#7aa68f',fillOpacity:.12,dashArray:'8 5'};
}

function normalizeStandaloneAreaOutline(raw){
  if(!raw||typeof raw!=='object')return null;
  const outline=raw.areaOutline&&typeof raw.areaOutline==='object'?Object.assign({},raw.areaOutline):Object.assign({},raw);
  const id=String(raw.id||outline.id||siteOutlineKey({name:raw.name||outline.name||'outline',stateCode:raw.stateCode||outline.stateCode||''}));
  const name=raw.name||outline.name||'Official area outline';
  outline.id=id;
  outline.name=name;
  outline.status=String(outline.status||raw.status||'available').toLowerCase().replace(/\s+/g,'_');
  outline.stateCode=raw.stateCode||outline.stateCode||'';
  outline.category=raw.category||outline.category||'Official area outline';
  outline.sourceName=outline.sourceName||raw.sourceName||'Official source';
  outline.sourceUrl=outline.sourceUrl||raw.sourceUrl||'';
  outline.boundaryRepresents=outline.boundaryRepresents||raw.boundaryRepresents||'Official context boundary';
  outline.caution=outline.caution||raw.caution||'Context outline only — not a legal campsite boundary.';
  outline.exactCampingBoundary=!!(outline.exactCampingBoundary||raw.exactCampingBoundary);
  return {id,name,stateCode:outline.stateCode,category:outline.category,areaOutline:outline,outlineStandalone:true};
}
function standaloneAreaOutlineRecords(){
  const list=Array.isArray(window.CAMPING_AREA_OUTLINES)?window.CAMPING_AREA_OUTLINES:[];
  return list.map(normalizeStandaloneAreaOutline).filter(Boolean);
}
function outlineLayerKey(site){
  const outline=areaOutlineCandidate(site)||{};
  const raw=String(outline.campingLayer||outline.layerKey||outline.appLayer||site.campingLayer||site.layerKey||site.layer||'').toLowerCase();
  if(raw)return raw;
  const cat=String(site.category||outline.category||'').toLowerCase();
  if(cat.includes('boondocking')||cat.includes('dispersed'))return 'boondocking';
  return '';
}
function outlineStateMatches(site){
  const state=String(site.stateCode||site.state||'').toUpperCase();
  return !state||app.enabledStates.has(state);
}
function boondockingOutlineRecords(){
  const records=(app.areaOutline&&Array.isArray(app.areaOutline.standalone)?app.areaOutline.standalone:standaloneAreaOutlineRecords());
  return records.filter(site=>outlineLayerKey(site)==='boondocking'&&outlineStateMatches(site)&&areaOutlineIsAvailable(areaOutlineCandidate(site)));
}
async function showBoondockingAreaOutlines(){
  const records=boondockingOutlineRecords();
  if(!records.length){notify('No official boondocking rule-area outlines are available for the selected states.',6000);return;}
  setLoading(true,'Loading official boondocking outlines…');
  try{
    for(const site of records){
      await showAreaOutlineByKey(site.id,{fit:false});
    }
    updateAreaOutlinePanel();
    fitAreaOutline();
    notify(`Showing ${records.length} official boondocking rule-area outline${records.length===1?'':'s'}. Context only — not campsite pins.`,6500);
  }finally{
    setLoading(false);
  }
}
function registerStandaloneAreaOutlines(){
  if(!app.areaOutline)return [];
  const records=standaloneAreaOutlineRecords();
  app.areaOutline.standalone=records;
  records.forEach(site=>{app.areaOutline.registry[site.id]=site;});
  renderAreaOutlineList();
  return records;
}
function areaOutlineRecordsForSelectedStates(){
  return (app.areaOutline&&Array.isArray(app.areaOutline.standalone)?app.areaOutline.standalone:standaloneAreaOutlineRecords())
    .filter(site=>outlineStateMatches(site)&&areaOutlineIsAvailable(areaOutlineCandidate(site)))
    .sort((a,b)=>String(a.stateCode||'').localeCompare(String(b.stateCode||''))||String(a.name).localeCompare(String(b.name)));
}
function areaOutlineRecordsByState(records){
  const byState={};
  (records||[]).forEach(site=>{const code=String(site.stateCode||site.state||'Other').toUpperCase();(byState[code]||(byState[code]=[])).push(site);});
  return byState;
}
function areaOutlineLayerEnabled(){try{return localStorage.getItem(STORE.areaOutlines)==='1'}catch(_e){return false}}
function updateAreaOutlineLayerControls(){
  const on=areaOutlineLayerEnabled();
  $$('[data-area-outline-toggle]').forEach(toggle=>{toggle.checked=on});
  const meta=$('areaOutlineMeta'); if(meta)meta.textContent=on?'on':'off';
  const section=$('areaOutlineSection'); if(section)section.classList.toggle('area-outline-layer-on',on);
  const offBtn=$('clearAreaOutlineBtn'); if(offBtn)offBtn.disabled=!on;
}
function renderAreaOutlineList(){
  updateAreaOutlineLayerControls();
}
function clearAreaOutlineGraphics(){
  if(app.areaOutline&&app.areaOutline.layer)app.areaOutline.layer.clearLayers();
  if(app.areaOutline){app.areaOutline.active={};app.areaOutline.layers={};app.areaOutline.labelMarkers=[];}
  updateAreaOutlinePanel();
  renderAreaOutlineList();
  updateAreaOutlineLayerControls();
}
function pauseAreaOutlinesForStateChange(selectedCount){
  if(!app.areaOutline)return;
  app.areaOutline.requestSeq=(app.areaOutline.requestSeq||0)+1;
  clearAreaOutlineGraphics();
  if(areaOutlineLayerEnabled()&&selectedCount>3){
    app.areaOutline.paused=true;
    notify('Official Area Outlines paused for large multi-state selection. Narrow to 3 or fewer states to resume outlines.',6500);
  }else{
    app.areaOutline.paused=false;
  }
}
async function setAreaOutlineLayerEnabled(on,fit=true,opts={}){
  const silent=!!opts.silent;
  try{localStorage.setItem(STORE.areaOutlines,on?'1':'0')}catch(_e){}
  app.areaOutline.requestSeq=(app.areaOutline.requestSeq||0)+1;
  const requestId=app.areaOutline.requestSeq;
  if(!on){
    app.areaOutline.paused=false;
    clearAreaOutlineGraphics();
    if(!silent)notify('Official Area Outlines turned off.');
    return;
  }
  const records=areaOutlineRecordsForSelectedStates();
  clearAreaOutlineGraphics();
  if(!records.length){
    if(!silent)notify(app.enabledStates.size?'No official area outlines are available for the active state selection.':'Choose a state before turning on Official Area Outlines.',6000);
    return;
  }
  const hardCap=80;
  if(records.length>hardCap||app.enabledStates.size>3){
    app.areaOutline.paused=true;
    updateAreaOutlineLayerControls();
    if(!silent)notify(`Official Area Outlines paused because ${records.length} outlines are available. Narrow the state selection first.`,8000);
    return;
  }
  app.areaOutline.paused=false;
  setLoading(true,`Loading ${records.length} official outline${records.length===1?'':'s'}…`);
  try{
    let i=0;
    for(const site of records){
      if(requestId!==app.areaOutline.requestSeq)return;
      i++;
      setLoading(true,`Loading official outlines ${i} of ${records.length}…`);
      await showAreaOutlineByKey(site.id,{fit:false,silent:true,fromBatch:true});
    }
    if(requestId!==app.areaOutline.requestSeq)return;
    updateAreaOutlinePanel();
    if(fit&&app.enabledStates.size<=2)fitAreaOutline();
    if(!silent)notify(`Official Area Outlines on: showing ${records.length} outline${records.length===1?'':'s'}. Click an outline for details.`,6500);
  }finally{
    if(requestId===app.areaOutline.requestSeq)setLoading(false);
    updateAreaOutlineLayerControls();
    updateAreaOutlineLabelVisibility();
  }
}
function refreshAreaOutlineLayerForStateSelection(fit=false,opts={}){
  renderAreaOutlineList();
  if(areaOutlineLayerEnabled()){
    if(app.enabledStates.size>3){
      app.areaOutline.paused=true;
      if(!opts.afterMarkers)pauseAreaOutlinesForStateChange(app.enabledStates.size);
      return;
    }
    app.areaOutline.paused=false;
    setAreaOutlineLayerEnabled(true,fit,{silent:true});
  }
}

async function showSelectedAreaOutline(){
  const checkedStates=$$('#areaOutlineChecklist input[data-outline-state]:checked').map(i=>i.dataset.outlineState);
  const records=areaOutlineRecordsForSelectedStates();
  const byState=areaOutlineRecordsByState(records);
  if(checkedStates.length){
    for(const code of checkedStates){
      for(const site of (byState[code]||[]))await showAreaOutlineByKey(site.id,{fit:false});
    }
  }
  if(!activeAreaOutlineList().length){notify('Check one or more state area groups first.');return;}
  fitAreaOutline();
}
async function toggleAreaOutlineState(code,on){
  const records=areaOutlineRecordsByState(areaOutlineRecordsForSelectedStates())[String(code||'').toUpperCase()]||[];
  if(on){
    for(const site of records)await showAreaOutlineByKey(site.id,{fit:false});
    fitAreaOutline();
    return;
  }
  records.forEach(site=>hideAreaOutlineByKey(site.id));
  fitAreaOutline();
}
async function toggleAreaOutlineByKey(key,on){
  if(on)return showAreaOutlineByKey(key,{fit:false});
  hideAreaOutlineByKey(key);
}

function activeAreaOutlineList(){
  const active=app.areaOutline&&app.areaOutline.active?app.areaOutline.active:{};
  return Object.values(active);
}
function syncOutlineCheckboxes(){
  const box=$('areaOutlineChecklist');
  if(!box)return;
  const active=app.areaOutline&&app.areaOutline.active?app.areaOutline.active:{};
  const records=areaOutlineRecordsForSelectedStates();
  const byState=areaOutlineRecordsByState(records);
  $$('#areaOutlineChecklist input[data-outline-state]').forEach(input=>{
    const rows=byState[input.dataset.outlineState]||[];
    const activeCount=rows.filter(site=>active[site.id]).length;
    input.checked=!!rows.length&&activeCount===rows.length;
    input.indeterminate=activeCount>0&&activeCount<rows.length;
  });
}
function updateAreaOutlinePanel(){
  // v23.1.30: keep the legend stable. Rules/details belong in outline popups, not in the legend panel.
  syncOutlineCheckboxes();
}
function clearAreaOutline(){
  setAreaOutlineLayerEnabled(false,true);
}
function hideAreaOutlineByKey(key){
  if(!(app.areaOutline&&key))return;
  const layer=app.areaOutline.layers&&app.areaOutline.layers[key];
  if(layer&&app.areaOutline.layer)app.areaOutline.layer.removeLayer(layer);
  if(app.areaOutline.layers)delete app.areaOutline.layers[key];
  if(app.areaOutline.active)delete app.areaOutline.active[key];
  if(Array.isArray(app.areaOutline.labelMarkers))app.areaOutline.labelMarkers=app.areaOutline.labelMarkers.filter(m=>m._areaOutlineKey!==key);
  updateAreaOutlinePanel();
  renderAreaOutlineList();
}
function fitAreaOutline(){
  if(!(app.areaOutline&&app.areaOutline.layer))return;
  const b=app.areaOutline.layer.getBounds&&app.areaOutline.layer.getBounds();
  if(b&&b.isValid())app.map.fitBounds(b,{padding:[34,34],animate:false}); updateAreaOutlineLabelVisibility();
}

function friendlyAreaText(value,fallback){
  const raw=String(value||'').trim();
  if(!raw)return fallback||'';
  const low=raw.toLowerCase();
  if(low.includes('filtered to')||low.includes('ownership classification')||low.includes('inholding context')){
    return 'Public-land/agency boundary context for planning. The outline may include private inholdings, closed areas, water, roads, or other places where camping is not allowed.';
  }
  return raw
    .replace(/\bcontext for\b/ig,'Planning area for')
    .replace(/\binholding context only\b/ig,'private inholdings may exist inside the outline')
    .replace(/\bfiltered to\b/ig,'shown as')
    .trim();
}
function generalAreaRuleChecklist(site,outline){
  const sourceDetails=Array.isArray(outline.rulesDetails)?outline.rulesDetails.map(d=>String(d||'').trim()).filter(Boolean):[];
  const defaults=[
    'Confirm with the current managing agency map/page that overnight camping is allowed at the exact spot you plan to use.',
    'Check whether camping is dispersed, designated-site-only, reservation-only, permit-required, fee-based, or temporarily closed.',
    'Verify stay limits, seasonal closures, fire restrictions, campfire rules, food-storage rules, and whether local orders are in effect.',
    'Verify distance rules from water, trails, roads, developed recreation sites, private property, and posted closed areas.',
    'Use only roads and access routes that are legal for your vehicle; do not assume every road inside an outline is open or passable.',
    'Watch for private inholdings inside public-land boundaries. Do not camp on private land without permission.',
    'Pack out trash and follow Leave No Trace / local quiet-hour and sanitation rules.'
  ];
  const seen=new Set();
  return sourceDetails.concat(defaults).filter(item=>{const k=item.toLowerCase(); if(seen.has(k))return false; seen.add(k); return true;});
}
function areaRulesHtml(site,outline){
  const sourceUrl=outline.sourceUrl||areaOutlineFetchUrl(outline)||site.website||'';
  const boundary=friendlyAreaText(outline.boundaryRepresents,'General public-land/agency planning boundary.');
  const legal=friendlyAreaText(outline.officialCampingLegality||outline.rulesSummary||site.officialCampingLegality,'Camping may be allowed only where the current agency rules, maps, closures, permits, and posted signs allow it.');
  const caution=friendlyAreaText(outline.caution,'This outline is not a legal campsite boundary and may include places where camping is not allowed.');
  const source=friendlyAreaText(outline.sourceName,'Official/source boundary data');
  const rules=[
    ['What this outline means',boundary],
    ['Camping status',legal],
    ['Important limitation',caution],
    ['Source',source]
  ].filter(r=>r[1]);
  const verify=generalAreaRuleChecklist(site,outline);
  return `<div class="area-rules-popup"><div class="popup-title">${esc(site.name||outline.name||'Official area outline')}</div><div class="popup-notice"><strong>Area/rule marker — not a campsite pin.</strong><br>This outline helps you understand the planning area. It does not prove that every spot inside it is legal, accessible, public, or open for camping.</div><div class="popup-grid">${rules.map(r=>`<div class="popup-row"><strong>${esc(r[0])}</strong><span>${esc(r[1])}</span></div>`).join('')}</div><div class="area-rules-detail"><strong>Rules to verify before camping here</strong><ul>${verify.map(d=>`<li>${esc(d)}</li>`).join('')}</ul></div>${sourceUrl?`<div class="popup-actions"><a class="secondary" target="_blank" rel="noopener" href="${esc(sourceUrl)}">Official source</a></div>`:''}</div>`;
}
function areaOutlineLabelText(site,idx,total){
  let name=String(site.name||'Area outline').replace('Chequamegon-Nicolet National Forest','Cheq-Nicolet NF').replace('National Forest','NF').replace('County Forest','County Forest');
  if(total>1)name+=` ${idx+1}`;
  return name;
}
function ringSignedAreaXY(ring,lat0){
  if(!Array.isArray(ring)||ring.length<4)return 0;
  const cx=Math.cos(toRad(lat0||0));
  let sum=0;
  for(let i=0,j=ring.length-1;i<ring.length;j=i++){
    const xi=Number(ring[i][0])*69*cx, yi=Number(ring[i][1])*69;
    const xj=Number(ring[j][0])*69*cx, yj=Number(ring[j][1])*69;
    sum+=(xj*yi-xi*yj);
  }
  return sum/2;
}
function polygonLabelPoint(ring){
  if(!Array.isArray(ring)||!ring.length)return null;
  const pts=ring.map(p=>({lng:Number(p[0]),lat:Number(p[1])})).filter(p=>Number.isFinite(p.lat)&&Number.isFinite(p.lng));
  if(!pts.length)return null;
  let minLat=Infinity,maxLat=-Infinity,minLng=Infinity,maxLng=-Infinity;
  pts.forEach(p=>{minLat=Math.min(minLat,p.lat);maxLat=Math.max(maxLat,p.lat);minLng=Math.min(minLng,p.lng);maxLng=Math.max(maxLng,p.lng);});
  const lat0=(minLat+maxLat)/2, cx=Math.cos(toRad(lat0||0));
  let a=0,cxSum=0,cySum=0;
  for(let i=0,j=pts.length-1;i<pts.length;j=i++){
    const xi=pts[i].lng*69*cx, yi=pts[i].lat*69;
    const xj=pts[j].lng*69*cx, yj=pts[j].lat*69;
    const cross=xj*yi-xi*yj;
    a+=cross; cxSum+=(xj+xi)*cross; cySum+=(yj+yi)*cross;
  }
  a=a/2;
  let candidate=null;
  if(Math.abs(a)>0.000001){
    const x=cxSum/(6*a), y=cySum/(6*a);
    candidate={lat:y/69,lng:x/(69*cx)};
  }
  function inside(p){
    let c=false;
    for(let i=0,j=pts.length-1;i<pts.length;j=i++){
      const pi=pts[i],pj=pts[j];
      if(((pi.lat>p.lat)!==(pj.lat>p.lat))&&(p.lng<(pj.lng-pi.lng)*(p.lat-pi.lat)/(pj.lat-pi.lat)+pi.lng))c=!c;
    }
    return c;
  }
  if(candidate&&inside(candidate))return candidate;
  const center={lat:(minLat+maxLat)/2,lng:(minLng+maxLng)/2};
  if(inside(center))return center;
  let best=null,bestD=Infinity;
  for(let rows=5;rows<=13;rows+=4){
    for(let r=1;r<rows;r++){
      for(let c=1;c<rows;c++){
        const p={lat:minLat+(maxLat-minLat)*r/rows,lng:minLng+(maxLng-minLng)*c/rows};
        if(!inside(p))continue;
        const d=(p.lat-center.lat)**2+(p.lng-center.lng)**2;
        if(d<bestD){bestD=d;best=p;}
      }
    }
    if(best)return best;
  }
  return pts[Math.floor(pts.length/2)]||center;
}
function areaSqMilesForRing(ring){
  if(!Array.isArray(ring)||ring.length<4)return 0;
  let minLat=Infinity,maxLat=-Infinity;
  ring.forEach(p=>{const lat=Number(p[1]);if(Number.isFinite(lat)){minLat=Math.min(minLat,lat);maxLat=Math.max(maxLat,lat);}});
  return Math.abs(ringSignedAreaXY(ring,(minLat+maxLat)/2));
}
function polygonPartsFromGeoJson(data){
  const features=data&&data.type==='FeatureCollection'?data.features:(data&&data.type==='Feature'?[data]:[{type:'Feature',geometry:data}]);
  const parts=[];
  (features||[]).forEach(feature=>{
    const g=feature&&feature.geometry;
    if(!g)return;
    if(g.type==='Polygon'&&Array.isArray(g.coordinates)&&g.coordinates[0])parts.push(g.coordinates[0]);
    if(g.type==='MultiPolygon'&&Array.isArray(g.coordinates))g.coordinates.forEach(poly=>{if(poly&&poly[0])parts.push(poly[0]);});
  });
  return parts;
}
function ringLatLngBounds(ring){
  const pts=(Array.isArray(ring)?ring:[]).map(p=>[Number(p[1]),Number(p[0])]).filter(p=>Number.isFinite(p[0])&&Number.isFinite(p[1]));
  return pts.length?L.latLngBounds(pts):null;
}
function areaOutlineLabelShouldShow(bounds){
  if(!app.map||!bounds||!bounds.isValid||!bounds.isValid())return false;
  const zoom=app.map.getZoom&&app.map.getZoom();
  if(Number.isFinite(zoom)&&zoom<9)return false;
  const view=app.map.getBounds&&app.map.getBounds();
  if(!view||!view.isValid||!view.isValid()||!bounds.intersects(view))return false;
  const areaLat=Math.max(0.002,Math.abs(bounds.getNorth()-bounds.getSouth()));
  const areaLng=Math.max(0.002,Math.abs(bounds.getEast()-bounds.getWest()));
  const viewLat=Math.abs(view.getNorth()-view.getSouth());
  const viewLng=Math.abs(view.getEast()-view.getWest());
  return viewLat<=areaLat*1.15&&viewLng<=areaLng*1.15;
}
function visibleAreaOutlineLabelPoint(bounds){
  if(!app.map||!bounds||!bounds.isValid||!bounds.isValid())return null;
  const view=app.map.getBounds&&app.map.getBounds();
  if(!view||!view.isValid||!view.isValid()||!bounds.intersects(view))return null;
  const south=Math.max(bounds.getSouth(),view.getSouth());
  const north=Math.min(bounds.getNorth(),view.getNorth());
  const west=Math.max(bounds.getWest(),view.getWest());
  const east=Math.min(bounds.getEast(),view.getEast());
  if(!(north>south&&east>west))return null;
  return L.latLng((south+north)/2,(west+east)/2);
}
function updateAreaOutlineLabelVisibility(){
  const labels=app.areaOutline&&Array.isArray(app.areaOutline.labelMarkers)?app.areaOutline.labelMarkers:[];
  labels.forEach(marker=>{
    const el=marker.getElement&&marker.getElement();
    const show=areaOutlineLabelShouldShow(marker._areaOutlineLabelBounds);
    const pos=show?visibleAreaOutlineLabelPoint(marker._areaOutlineLabelBounds):null;
    if(show&&pos&&marker.setLatLng)marker.setLatLng(pos);
    if(el)el.classList.toggle('area-outline-label-hidden',!(show&&pos));
  });
}
function labelRingsForOutline(geo){
  const parts=polygonPartsFromGeoJson(geo).map(ring=>({ring,area:areaSqMilesForRing(ring),point:polygonLabelPoint(ring),bounds:ringLatLngBounds(ring)})).filter(p=>p.point&&p.area>0.05);
  if(!parts.length)return [];
  parts.sort((a,b)=>b.area-a.area);
  const max=parts[0].area;
  const kept=[];
  parts.forEach(p=>{
    if(kept.length>=3)return;
    if(p.area>=Math.max(12,max*0.18)||kept.length===0)kept.push(p);
  });
  return kept;
}
function addAreaOutlineLabels(key,site,outline,group,geo){
  const parts=labelRingsForOutline(geo);
  const total=parts.length||1;
  parts.forEach((part,idx)=>{
    const icon=L.divIcon({
      className:'',
      html:`<button class="area-outline-label" type="button">${esc(areaOutlineLabelText(site,idx,total))}</button>`,
      iconSize:null,
      iconAnchor:[0,0]
    });
    const marker=L.marker([part.point.lat,part.point.lng],{icon,interactive:true,keyboard:true,title:`Rules for ${site.name||'area outline'}`})
      .bindPopup(areaRulesHtml(site,outline),{maxWidth:390});
    marker._areaOutlineKey=key;
    marker._areaOutlineLabelBounds=part.bounds;
    marker.on('click',()=>marker.openPopup());
    marker.addTo(group);
    if(app.areaOutline&&Array.isArray(app.areaOutline.labelMarkers))app.areaOutline.labelMarkers.push(marker);
  });
}

async function showAreaOutlineByKey(key,opts={}){
  const site=app.areaOutline.registry[key];
  if(!site){notify('Area outline record not found for this popup. Reopen the marker and try again.',5000);return;}
  const outline=areaOutlineCandidate(site);
  if(!areaOutlineIsAvailable(outline)){notify('This record does not have an import-ready official outline source yet.',5000);return;}
  if(app.areaOutline.layers&&app.areaOutline.layers[key]){updateAreaOutlinePanel();renderAreaOutlineList();if(opts.fit!==false)fitAreaOutline();updateAreaOutlineLabelVisibility();return;}
  setLoading(true,'Loading official area outline…');
  try{
    const geo=await loadAreaOutlineGeoJson(outline);
    const group=L.geoJSON(geo,{style:areaOutlineStyle,pointToLayer:(feature,latlng)=>L.circleMarker(latlng,{radius:6,weight:2,opacity:.9,fillOpacity:.25})});
    addAreaOutlineLabels(key,site,outline,group,geo);
    group.addTo(app.areaOutline.layer);
    updateAreaOutlineLabelVisibility();
    app.areaOutline.layers[key]=group;
    app.areaOutline.active[key]={name:site.name||'Area outline',boundaryRepresents:outline.boundaryRepresents,caution:outline.caution,sourceUrl:outline.sourceUrl||areaOutlineFetchUrl(outline),officialCampingLegality:outline.officialCampingLegality||outline.rulesSummary||site.officialCampingLegality};
    updateAreaOutlinePanel();
    renderAreaOutlineList();
    if(opts.fit!==false)fitAreaOutline();
    updateAreaOutlineLabelVisibility();
    if(!opts.silent)notify('Official area outline shown. Context only — not a legal campsite boundary.',5500);
  }catch(err){
    console.error(err);
    notify(err&&err.message?err.message:'Could not load official area outline.',7000);
  }finally{if(!opts.fromBatch)setLoading(false)}
}
app.showAreaOutlineByKey=showAreaOutlineByKey;
app.hideAreaOutlineByKey=hideAreaOutlineByKey;
app.clearAreaOutline=clearAreaOutline;

function siteText(site){return Object.values(site||{}).filter(v=>typeof v==='string'||typeof v==='number').join(' ').toLowerCase()}
function siteWithinTextSearch(site){
  const search=app&&app.search?app.search:{};
  if(!search.active)return true;
  const raw=String(search.query||'').trim().toLowerCase();
  if(!raw)return true;
  const text=siteText(site);
  const terms=raw.split(/\s+/).filter(Boolean);
  return terms.every(term=>text.includes(term));
}
function clearSearchRevealMarker(){
  if(!app||!app.searchRevealMarker)return;
  try{
    if(app.map&&app.map.removeLayer)app.map.removeLayer(app.searchRevealMarker);
    else if(app.searchRevealMarker.remove)app.searchRevealMarker.remove();
  }catch(_e){}
  app.searchRevealMarker=null;
}
function clearSearchMode(refresh=true){
  if(app)app.search={active:false,query:''};
  clearSearchRevealMarker();
  const input=$('searchInput'); if(input)input.value='';
  const out=$('searchResults'); if(out)out.innerHTML='';
  if(refresh&&app&&app.map&&app.markerLayer)renderMarkers(false);
}
function searchResultHiddenByLayer(site){
  const key=layerKey(site);
  if(!MAP_LAYER_KEYS.has(key))return true;
  if(app.restOnlyMode)return key!=='rest-truck';
  return !app.enabledLayers.has(key);
}
function waterFilterText(site){
  return [
    site.waterfront,site.waterFront,site.waterfrontType,site.waterFrontType,site.shoreline,site.shore,
    site.water,site.waterSource,site.waterSources,site.waterbody,site.waterBody,site.waterBodyName,
    site.waterAccess,site.boatAccess,site.canoeAccess,site.kayakAccess,site.paddleAccess,
    site.setting,site.locationNotes,site.accessNotes,site.activities,site.amenities,site.description,site.summary,site.notes
  ]
    .filter(v=>v!==undefined&&v!==null&&String(v).trim())
    .map(v=>String(v).toLowerCase())
    .join(' ');
}
function waterTypeText(site){
  return [site.waterfrontType,site.waterFrontType,site.waterbody,site.waterBody,site.waterBodyName,site.water,site.waterSource,site.waterSources,site.description,site.summary,site.notes]
    .filter(v=>v!==undefined&&v!==null&&String(v).trim())
    .map(v=>String(v).toLowerCase())
    .join(' ');
}
function hasWaterfrontContext(text){
  if(!text)return false;
  if(/\b(no|not|without)\s+(?:lake|river|creek|stream|shore|waterfront|water access|waterfront access|boat access)\b/.test(text))return false;
  if(/\b(lakefront|riverfront|waterfront|shoreline|shore line|on the shore|on shore|beachfront|water's edge|waters edge)\b/.test(text))return true;
  if(/\b(on|along|at|beside|adjacent to|bordering|borders|bordered by|fronting|overlooking|overlooks|right on|located on|situated on|set on|banks? of|edge of)\b.{0,80}\b(lake|pond|reservoir|flowage|impoundment|river|creek|cr\.?|stream|brook|branch|fork|run|rapids|shore|beach)\b/.test(text))return true;
  if(/\b(lake|pond|reservoir|flowage|impoundment|river|creek|cr\.?|stream|brook|branch|fork|run|rapids)\b.{0,80}\b(shore|shoreline|bank|banks|beach|boat launch|boat landing|canoe landing|kayak launch|dock|pier|water access|water-access|paddle-in|canoe-in|boat-in|island campsite|island site)\b/.test(text))return true;
  if(/\b(boat[- ]?in|canoe[- ]?in|kayak[- ]?in|paddle[- ]?in|water[- ]access|boat launch|boat landing|canoe landing|kayak launch|dock|pier|island campsite|island site)\b/.test(text))return true;
  return false;
}
function siteMatchesWater(site){
  normalizeFilters();
  const water=app.filters.water||{};
  const wantLake=!!water.lake;
  const wantRiverCreek=!!water.rivercreek;
  if(!wantLake&&!wantRiverCreek)return true;
  const text=waterFilterText(site);
  if(!hasWaterfrontContext(text))return false;
  const typeText=waterTypeText(site)||text;
  const isLake=/\b(lake|pond|reservoir|flowage|impoundment)\b/.test(typeText);
  const isRiverCreek=/\b(river|creek|cr\.?|stream|brook|branch|fork|run|rapids)\b/.test(typeText);
  return (wantLake&&isLake)||(wantRiverCreek&&isRiverCreek);
}
function costFilterText(site){
  return [site.costDisplay,site.cost,site.fees,site.fee,site.price,site.rate,site.rates,site.siteFee,site.campingFee,site.reservationFee]
    .filter(v=>v!==undefined&&v!==null&&String(v).trim())
    .map(v=>String(v).toLowerCase())
    .join(' ');
}
function costExplicitlyFree(site){
  const text=costFilterText(site);
  const paidAmounts=[...text.matchAll(/\$\s*(\d+(?:\.\d+)?)/g)].map(m=>Number(m[1])).filter(n=>Number.isFinite(n)&&n>0);
  if(paidAmounts.length)return false;
  if(site.costIsFree===true)return true;
  if(!text)return false;
  if(/\bnot free\b|\bno free camping\b/.test(text))return false;
  return /\bfree\b|\bno fee\b|\bno charge\b|\$\s*0(?:\D|$)|\b0\s*(?:dollars?|usd)\b/.test(text);
}
function costDollarAmounts(site){
  const text=costFilterText(site);
  return [...text.matchAll(/\$\s*(\d+(?:\.\d+)?)/g)].map(m=>Number(m[1])).filter(Number.isFinite);
}
function sitePassesNonLayerFilters(site){
  const key=layerKey(site);
  if(key==='info')return false;
  if(!Number.isFinite(Number(site.lat))||!Number.isFinite(Number(site.lng)))return false;
  if(!siteVisibleToCurrentUser(site))return false;
  if(!siteWithinViewportRenderWindow(site))return false;
  if(!siteWithinNearMeRange(site))return false;
  if(!siteWithinRouteRange(site))return false;
  if(!siteWithinTextSearch(site))return false;
  if(!siteMatchesCommunityFilters(site))return false;
  if(!siteMatchesWater(site))return false;
  if(app.restOnlyMode)return key==='rest-truck';
  const text=siteText(site);
  const max=app.filters.maxCost||'';
  if(max){
    const isFree=costExplicitlyFree(site);
    if(max==='0'){
      if(!isFree)return false;
    }else{
      const nums=costDollarAmounts(site);
      if(!isFree&&(nums.length===0||Math.min(...nums)>Number(max)))return false;
    }
  }
  const access=app.filters.access||{};
  if(access.twowd&&!/2wd|passenger car|paved|gravel road|easy access/.test(text))return false;
  if(access.hc&&!/high clearance|rough road|two[- ]track/.test(text))return false;
  if(access.fw&&!/4wd|four[- ]wheel/.test(text))return false;
    if(app.filters.chips&&app.filters.chips.showers&&!(/showers?:\s*(yes|available)|\bshowers\b/.test(text)&&!/no showers|showers?:\s*no/.test(text)))return false;
  return true;
}
function siteMatches(site){
  const key=layerKey(site);
  if(!sitePassesNonLayerFilters(site))return false;
  if(app.restOnlyMode)return key==='rest-truck';
  return app.enabledLayers.has(key);
}
function markerCacheKey(){
  const siteKey=(app.sites||[]).map(s=>s.id||s.name||'').join('|');
  const communitySig=communityFilterIsActive()?Object.entries(app.communityFavorites||{}).filter(([,v])=>v&&(v.is_favorite||v.want_to_visit||v.visited||v.loved)).map(([id,v])=>`${id}:${v.is_favorite?'f':''}${v.want_to_visit?'w':''}${v.visited?'v':''}${v.loved?'l':''}`).sort().join('|'):'';
  return JSON.stringify({siteKey,filters:app.filters,communitySig,near:app.nearMeActive?[app.localAreaCenter,nearRadiusMiles()]:null,route:app.routeSearch&&app.routeSearch.active?[app.routeSearch.coords&&app.routeSearch.coords.length,app.routeSearch.bufferMiles,app.routeSearch.distanceMiles]:null,search:app.search,restOnly:app.restOnlyMode,markerScale:markerScaleCacheKey()});
}
function resetMarkerLayerGroups(){
  if(app.markerLayer)app.markerLayer.clearLayers();
  app.markerGroups={};
  app.markerIndex={};
  app.markerBaseCandidates=[];
  app.shownSites=[];
}
function enabledMapLayerKeys(){
  if(app.restOnlyMode)return ['rest-truck'];
  return [...app.enabledLayers].filter(k=>MAP_LAYER_KEYS.has(k));
}
function syncShownSitesFromMarkerBase(){
  const enabled=new Set(enabledMapLayerKeys());
  app.shownSites=(app.markerBaseCandidates||[]).filter(site=>enabled.has(layerKey(site)));
}
function syncEnabledMarkerGroups(){
  if(!app.markerLayer)return;
  app.markerLayer.clearLayers();
  enabledMapLayerKeys().forEach(key=>{if(app.markerGroups&&app.markerGroups[key])app.markerLayer.addLayer(app.markerGroups[key]);});
  syncShownSitesFromMarkerBase();
}
function countLayerGroupMarkers(group){
  if(!group||typeof group.getLayers!=='function')return 0;
  return group.getLayers().reduce((sum,layer)=>{
    if(layer&&typeof layer.getLatLng==='function')return sum+1;
    return sum+countLayerGroupMarkers(layer);
  },0);
}
function incrementLayerCount(counts,key){counts[key]=(counts[key]||0)+1;return counts;}
function layerCountText(counts,keys){
  return (keys||MAP_LAYERS.map(l=>l.key)).map(key=>{
    const n=counts&&counts[key]||0;
    return n?`${layerDef(key).label}: ${n}`:'';
  }).filter(Boolean).join(' · ');
}
function loadedSiteLayerDiagnostics(){
  const raw={},invalidCoords={},filteredOut={},drawable={};
  (app.sites||[]).forEach(site=>{
    const key=layerKey(site);
    incrementLayerCount(raw,key);
    const lat=Number(site&&site.lat),lng=Number(site&&site.lng);
    if(!Number.isFinite(lat)||!Number.isFinite(lng)){incrementLayerCount(invalidCoords,key);return;}
    if(!MAP_LAYER_KEYS.has(key))return;
    if(sitePassesNonLayerFilters(site))incrementLayerCount(drawable,key);
    else incrementLayerCount(filteredOut,key);
  });
  return {raw,invalidCoords,filteredOut,drawable};
}
function setRenderIntegrityStatus(message,isError=false){
  $$('[data-render-integrity-status]').forEach(el=>{
    el.hidden=!message;
    el.textContent=message||'';
    el.classList.toggle('render-error',!!isError);
  });
}
function visibleRenderExpectedCounts(expectedByLayer){
  const enabled=new Set(enabledMapLayerKeys());
  const out={};
  Object.keys(expectedByLayer||{}).forEach(key=>{if(enabled.has(key))out[key]=expectedByLayer[key];});
  return out;
}
function validateMarkerRender(expectedByLayer,markerErrors){
  const drawnByLayer={};
  MAP_LAYERS.forEach(l=>{drawnByLayer[l.key]=countLayerGroupMarkers(app.markerGroups&&app.markerGroups[l.key]);});
  const mismatches=[];
  MAP_LAYERS.forEach(l=>{
    const expected=expectedByLayer[l.key]||0;
    const drawn=drawnByLayer[l.key]||0;
    if(expected!==drawn)mismatches.push(`${l.label}: expected ${expected}, drew ${drawn}`);
  });
  const ok=mismatches.length===0&&(!markerErrors||markerErrors.length===0);
  return {ok,drawnByLayer,mismatches,markerErrors:markerErrors||[]};
}
function updateMarkerReadouts(total,prefix='Showing'){
  const countEl=$('layerSiteCount');
  if(countEl){
    const routeSuffix=(app.routeSearch&&app.routeSearch.active)?` within ${app.routeSearch.bufferMiles||25} mi of route`:'';
    const searchSuffix=(app.search&&app.search.active)?' matching search':'';
    const boOutlineCount=(app.enabledLayers&&app.enabledLayers.has('boondocking'))?boondockingOutlineRecords().length:0;
    const outlineSuffix=boOutlineCount?` + ${boOutlineCount} official boondocking rule-area outline${boOutlineCount===1?'':'s'} available`:'';
    const layerBits=app.renderDiagnostics&&app.renderDiagnostics.last&&app.renderDiagnostics.last.visibleExpectedByLayer?layerCountText(app.renderDiagnostics.last.visibleExpectedByLayer,enabledMapLayerKeys()):'';
    const layerSuffix=layerBits?` — ${layerBits}`:'';
    const clusterInfo=app.renderDiagnostics&&app.renderDiagnostics.last&&app.renderDiagnostics.last.clusterMode&&app.renderDiagnostics.last.clusterCount?` · clustered into ${app.renderDiagnostics.last.clusterCount} markers below zoom 4.5`:'';
    const windowSuffix=app.renderWindowMode?' in current map window':'';
    countEl.textContent=app.restOnlyMode?`Rest stops only: ${app.shownSites.length} of ${total} loaded sites${windowSuffix}${routeSuffix}${searchSuffix}${layerSuffix}${clusterInfo}`:`${prefix} ${app.shownSites.length} of ${total} loaded sites${windowSuffix}${routeSuffix}${searchSuffix}${layerSuffix}${outlineSuffix}${clusterInfo}`;
  }
  updateRouteStatus();
  updateRestRoadsideDiagnostics();
  updateFilterStatus();
  renderReferences();
}
function toggleMarkerLayer(key,on){
  if(app.markerLayerCacheKey!==markerCacheKey()){renderMarkers(false);return;}
  syncEnabledMarkerGroups();
  if(app.renderDiagnostics&&app.renderDiagnostics.last){app.renderDiagnostics.last.visibleExpectedByLayer=visibleRenderExpectedCounts(app.renderDiagnostics.last.expectedByLayer||{});}
  updateMarkerReadouts((app.markerBaseCandidates||[]).length,'Showing');
}

function markerCandidateSetForCurrentRenderWindow(){
  const layerDiagnostics=loadedSiteLayerDiagnostics();
  const candidates=[];
  const expectedByLayer={};
  (app.sites||[]).forEach(site=>{
    if(sitePassesNonLayerFilters(site)){
      const key=layerKey(site);
      if(MAP_LAYER_KEYS.has(key))incrementLayerCount(expectedByLayer,key);
      candidates.push(site);
    }
  });
  return {layerDiagnostics,candidates,expectedByLayer};
}
function addSingleSiteMarker(site,markerErrors,boundsOut){
  const key=layerKey(site);
  if(!MAP_LAYER_KEYS.has(key))return false;
  const lat=Number(site&&site.lat),lng=Number(site&&site.lng);
  if(!Number.isFinite(lat)||!Number.isFinite(lng)){
    if(markerErrors)markerErrors.push(`${site&&site.name||site&&site.id||'Unnamed site'}: invalid coordinates`);
    return false;
  }
  try{
    const marker=L.marker([lat,lng],{icon:markerIcon(site)}).bindPopup(popup(site));
    if(!app.markerGroups[key])app.markerGroups[key]=L.layerGroup();
    app.markerGroups[key].addLayer(marker);
    if(app.markerIndex)app.markerIndex[siteStableId(site)]={marker,site,layerKey:key};
    if(boundsOut)boundsOut.push([lat,lng]);
    return true;
  }catch(err){
    if(markerErrors)markerErrors.push(`${site&&site.name||site&&site.id||'Unnamed site'}: ${err&&err.message?err.message:String(err)}`);
    console.error('Marker render failed for site',site,err);
    return false;
  }
}
function removeSingleSiteMarker(site){
  const id=siteStableId(site);
  const entry=app.markerIndex&&app.markerIndex[id];
  if(!entry)return;
  const group=app.markerGroups&&app.markerGroups[entry.layerKey];
  if(group&&entry.marker)group.removeLayer(entry.marker);
  delete app.markerIndex[id];
}
function refreshMarkersForViewportWindow(fit=false){
  if(!shouldUseViewportRenderWindow()||currentMarkerClusterMode()){
    renderMarkers(fit);
    return;
  }
  const nextBounds=makeViewportRenderBounds();
  if(!nextBounds){renderMarkers(fit);return;}
  app.renderWindowMode=true;
  app.renderWindowBounds=nextBounds;
  const snapshot=markerCandidateSetForCurrentRenderWindow();
  const candidates=snapshot.candidates;
  const desiredIds=new Set(candidates.map(siteStableId));
  (app.markerBaseCandidates||[]).forEach(site=>{if(!desiredIds.has(siteStableId(site)))removeSingleSiteMarker(site);});
  const existingIds=new Set(Object.keys(app.markerIndex||{}));
  const markerErrors=[];
  candidates.forEach(site=>{const id=siteStableId(site); if(!existingIds.has(id)){addSingleSiteMarker(site,markerErrors,null); existingIds.add(id);}});
  app.markerBaseCandidates=candidates;
  syncEnabledMarkerGroups();
  const validation=validateMarkerRender(snapshot.expectedByLayer,markerErrors);
  app.renderDiagnostics.last=Object.assign(app.renderDiagnostics.last||{}, {loadedLayerCounts:snapshot.layerDiagnostics.raw,drawableByLayer:snapshot.layerDiagnostics.drawable,filteredOutByLayer:snapshot.layerDiagnostics.filteredOut,invalidCoordsByLayer:snapshot.layerDiagnostics.invalidCoords,expectedByLayer:snapshot.expectedByLayer,visibleExpectedByLayer:visibleRenderExpectedCounts(snapshot.expectedByLayer),drawnByLayer:validation.drawnByLayer,mismatches:validation.mismatches,markerErrors:validation.markerErrors,attempt:0,clusterMode:false,clusterCount:0,viewportIncremental:true});
  if(!validation.ok){
    const detail=validation.mismatches.concat(validation.markerErrors.slice(0,4)).join(' · ');
    const msg=`Map render warning after pan update: ${detail}`;
    setRenderIntegrityStatus(msg,true);
    notify(msg,9000);
  }else{
    const visible=visibleRenderExpectedCounts(snapshot.expectedByLayer);
    const visibleText=layerCountText(visible,enabledMapLayerKeys());
    setRenderIntegrityStatus(visibleText?`Render check OK: ${visibleText}`:'Render check OK.',false);
  }
  app.markerLayerCacheKey=markerCacheKey();
  updateMarkerReadouts(candidates.length,'Showing');
  if(fit)fitCurrentPreferredView();
}

async function renderMarkers(fit,attempt=0){
  updateMarkerZoomScale();
  const renderId=++app.renderSeq;
  resetMarkerLayerGroups();
  app.renderWindowMode=shouldUseViewportRenderWindow();
  app.renderWindowBounds=app.renderWindowMode?makeViewportRenderBounds():null;
  setRenderIntegrityStatus('',false);
  if(app.areaOutline){app.areaOutline.registry={}; (app.areaOutline.standalone||[]).forEach(site=>{app.areaOutline.registry[site.id]=site;});}
  const markerSnapshot=markerCandidateSetForCurrentRenderWindow();
  const layerDiagnostics=markerSnapshot.layerDiagnostics;
  const candidates=markerSnapshot.candidates;
  const expectedByLayer=markerSnapshot.expectedByLayer;
  app.markerBaseCandidates=candidates;
  const clusterMode=currentMarkerClusterMode();
  app.renderDiagnostics.last={loadedLayerCounts:layerDiagnostics.raw,drawableByLayer:layerDiagnostics.drawable,filteredOutByLayer:layerDiagnostics.filteredOut,invalidCoordsByLayer:layerDiagnostics.invalidCoords,expectedByLayer,visibleExpectedByLayer:visibleRenderExpectedCounts(expectedByLayer),drawnByLayer:{},mismatches:[],markerErrors:[],attempt,clusterMode,clusterCount:0};
  const total=candidates.length;
  syncShownSitesFromMarkerBase();
  updateMarkerReadouts(total,candidates.length>450?'Drawing':'Showing');
  const bounds=[];
  let markerErrors=[];
  if(clusterMode){
    const clustered=buildMarkerClusters(candidates);
    markerErrors=clustered.markerErrors||[];
    const drawnByLayer={};
    clustered.clusters.forEach(cluster=>{
      try{
        const key=cluster.key;
        if(!MAP_LAYER_KEYS.has(key))return;
        const lat=Number(cluster.lat),lng=Number(cluster.lng);
        if(!Number.isFinite(lat)||!Number.isFinite(lng))return;
        const marker=cluster.sites.length>1
          ? L.marker([lat,lng],{icon:markerClusterIcon(key,cluster.sites.length)}).bindPopup(markerClusterPopup(cluster))
          : L.marker([lat,lng],{icon:markerIcon(cluster.sites[0])}).bindPopup(popup(cluster.sites[0]));
        if(cluster.sites.length>1){
          marker.on('click',()=>{
            try{
              const b=L.latLngBounds(cluster.bounds);
              if(b.isValid())app.map.fitBounds(b,{padding:[28,28],maxZoom:7});
            }catch(_e){}
          });
        }
        if(!app.markerGroups[key])app.markerGroups[key]=L.layerGroup();
        app.markerGroups[key].addLayer(marker);
        drawnByLayer[key]=(drawnByLayer[key]||0)+cluster.sites.length;
        bounds.push([lat,lng]);
      }catch(err){markerErrors.push(`${cluster&&cluster.key||'Cluster'}: ${err&&err.message?err.message:String(err)}`);}
    });
    syncEnabledMarkerGroups();
    app.renderDiagnostics.last=Object.assign(app.renderDiagnostics.last||{},{drawnByLayer,mismatches:[],markerErrors,clusterMode:true,clusterCount:clustered.clusters.length,visibleExpectedByLayer:visibleRenderExpectedCounts(expectedByLayer),attempt});
    if(markerErrors.length){
      const msg=`Clustered map render warning: ${markerErrors.slice(0,4).join(' · ')}`;
      setRenderIntegrityStatus(msg,true);
      notify(msg,12000);
    }else{
      const visible=visibleRenderExpectedCounts(expectedByLayer);
      const visibleText=layerCountText(visible,enabledMapLayerKeys());
      setRenderIntegrityStatus(visibleText?`Render check OK: ${visibleText} · clustered into ${clustered.clusters.length} markers below zoom 4.5`:`Render check OK: clustered into ${clustered.clusters.length} markers below zoom 4.5.`,false);
    }
    app.markerLayerCacheKey=markerCacheKey();
    updateMarkerReadouts(total,'Showing');
    if(fit){fitCurrentPreferredView()}
    return;
  }
  const chunkSize=candidates.length>900?120:(candidates.length>450?180:candidates.length||1);
  for(let start=0;start<candidates.length;start+=chunkSize){
    if(renderId!==app.renderSeq){
      app.renderDiagnostics.warnings.push({type:'interrupted',message:'Marker render was interrupted by a newer map request.',time:new Date().toISOString()});
      return;
    }
    const end=Math.min(start+chunkSize,candidates.length);
    for(let i=start;i<end;i++){
      const site=candidates[i];
      try{
        const key=layerKey(site);
        if(!MAP_LAYER_KEYS.has(key))continue;
        const lat=Number(site.lat),lng=Number(site.lng);
        if(!Number.isFinite(lat)||!Number.isFinite(lng)){markerErrors.push(`${site&&site.name||site&&site.id||'Unnamed site'}: invalid coordinates`);continue;}
        addSingleSiteMarker(site,markerErrors,bounds);
      }catch(err){
        markerErrors.push(`${site&&site.name||site&&site.id||'Unnamed site'}: ${err&&err.message?err.message:String(err)}`);
        console.error('Marker render failed for site',site,err);
      }
    }
    syncEnabledMarkerGroups();
    updateMarkerReadouts(total,end<candidates.length?'Drawing':'Showing');
    if(candidates.length>450&&end<candidates.length){
      setLoading(true,`Drawing map markers ${end} of ${candidates.length}…`);
      await new Promise(requestAnimationFrame);
    }
  }
  if(renderId!==app.renderSeq){
    app.renderDiagnostics.warnings.push({type:'interrupted',message:'Marker render finished after a newer map request and was ignored.',time:new Date().toISOString()});
    return;
  }
  const validation=validateMarkerRender(expectedByLayer,markerErrors);
  app.renderDiagnostics.last=Object.assign(app.renderDiagnostics.last||{},{drawnByLayer:validation.drawnByLayer,mismatches:validation.mismatches,markerErrors:validation.markerErrors,visibleExpectedByLayer:visibleRenderExpectedCounts(expectedByLayer),attempt,clusterMode:false,clusterCount:0});
  if(!validation.ok){
    const detail=validation.mismatches.concat(validation.markerErrors.slice(0,4)).join(' · ');
    console.error('Marker render integrity failure',app.renderDiagnostics.last);
    if(attempt<1){
      setLoading(true,'Marker count mismatch detected. Redrawing once…');
      await new Promise(resolve=>setTimeout(resolve,60));
      return renderMarkers(fit,attempt+1);
    }
    const msg=`Map render warning: data expected ${Object.values(expectedByLayer).reduce((a,b)=>a+b,0)} drawable markers but drew ${Object.values(validation.drawnByLayer).reduce((a,b)=>a+b,0)}. ${detail}`;
    setRenderIntegrityStatus(msg,true);
    notify(msg,12000);
  }else{
    const visible=visibleRenderExpectedCounts(expectedByLayer);
    const visibleText=layerCountText(visible,enabledMapLayerKeys());
    setRenderIntegrityStatus(visibleText?`Render check OK: ${visibleText}`:'Render check OK.',false);
  }
  app.markerLayerCacheKey=markerCacheKey();
  if(candidates.length>450)setLoading(false);
  const statusEl=$('statusLine');
  if(statusEl && !statusEl.dataset.lockedNotice){statusEl.innerHTML='This app is still in active development. Errors may occur but should be corrected quickly. To report issues contact: <a href="mailto:tpoirier@nmu.edu">tpoirier@nmu.edu</a>'; statusEl.dataset.lockedNotice='1';}
  updateMarkerReadouts(total,'Showing');
  if(fit){fitCurrentPreferredView()}
}


function siteStableId(site){
  if(!site)return '';
  return String(site.id||site.siteId||site.slug||[site.stateCode||site.stateName||'',site.name||'',site.lat||'',site.lng||''].join('|')).trim();
}
function siteByStableId(id){
  const key=String(id||'');
  return (app.sites||[]).find(s=>siteStableId(s)===key)||null;
}
function domSafeId(value){return String(value||'').replace(/[^a-zA-Z0-9_-]/g,'_').slice(0,80)||'site';}
function signedInCommunity(){return !!(app.supabase&&app.session&&app.session.user&&app.session.user.id&&app.communityAvailable!==false);}
function favoriteState(siteId){return app.communityFavorites&&app.communityFavorites[siteId]?app.communityFavorites[siteId]:{};}
function supabaseErrorText(err){return String((err&&(err.message||err.details||err.hint||err.code))||err||'');}
function isMissingSupabaseTableError(err){
  const text=supabaseErrorText(err).toLowerCase();
  return text.includes('schema cache')||text.includes('could not find the table')||text.includes('relation')&&text.includes('does not exist')||text.includes('pgrst205')||text.includes('pgrst106');
}
function communityUnavailableMessage(){return app.communityError||'Community tools are unavailable because the Supabase community tables are not reachable. The map still works.';}
function markCommunityUnavailable(err){
  app.communityAvailable=false;
  app.communityError='Community tools are temporarily unavailable. Check that config.js uses the same Supabase schema as the installed boondocking_map_* tables.';
  console.warn('Community Supabase tables unavailable',err);
  updateAuthUi();
  if(!app.communityUnavailableNotified){
    app.communityUnavailableNotified=true;
    notify(communityUnavailableMessage(),7000);
  }
}
function communityActionLabel(state,key,label){return state&&state[key]?'✓ '+label:label;}
function communityActionButtonHtml(siteId,state,key,label){
  const active=!!(state&&state[key]);
  return `<button class="secondary community-action-btn${active?' active':''}" data-community-action="${esc(key)}" data-community-label="${esc(label)}" aria-pressed="${active?'true':'false'}" type="button" onclick="window.__campingApp.toggleSiteFavorite&&window.__campingApp.toggleSiteFavorite('${jsString(siteId)}','${jsString(key)}')">${esc(communityActionLabel(state,key,label))}</button>`;
}
function refreshCommunityButtons(siteId){
  const state=favoriteState(siteId);
  $$('[data-community-site]').forEach(panel=>{
    if(panel.dataset.communitySite!==String(siteId))return;
    $$('[data-community-action]',panel).forEach(btn=>{
      const key=btn.dataset.communityAction;
      const label=btn.dataset.communityLabel||communityFilterLabel(key);
      const active=!!(state&&state[key]);
      btn.classList.toggle('active',active);
      btn.setAttribute('aria-pressed',active?'true':'false');
      btn.textContent=communityActionLabel(state,key,label);
    });
  });
}
function siteSnapshot(site){
  if(!site)return {};
  return {
    site_id: siteStableId(site),
    site_name: site.name||'',
    state_code: site.stateCode||'',
    layer: layerDef(layerKey(site)).label||layerKey(site),
    latitude: Number.isFinite(Number(site.lat))?Number(site.lat):null,
    longitude: Number.isFinite(Number(site.lng))?Number(site.lng):null
  };
}
function communityHtml(site){
  const siteId=siteStableId(site);
  const safe=domSafeId(siteId);
  const signed=signedInCommunity();
  const fav=favoriteState(siteId);
  const comments=app.communityComments&&app.communityComments[siteId];
  const commentRows=Array.isArray(comments)?comments.slice(0,3).map(c=>`<div class="community-comment"><strong>${esc(c.display_name||c.user_email||'Camper')}</strong><span>${esc(c.comment_text||'')}</span></div>`).join(''):'';
  if(!signed){
    const msg=app.communityAvailable===false?communityUnavailableMessage():'Sign in under Options to favorite sites, comment, or send corrections to Tod.';
    return `<div class="community-panel"><div class="community-title">Community tools</div><div class="mini-note">${esc(msg)}</div></div>`;
  }
  const actionButtons=COMMUNITY_FILTER_DEFS.map(def=>communityActionButtonHtml(siteId,fav,def.key,def.label)).join('');
  return `<div class="community-panel" data-community-site="${esc(siteId)}"><div class="community-title">Community tools</div><div class="popup-actions community-actions">${actionButtons}</div><div class="community-comment-box"><textarea id="comment_${safe}" placeholder="Add a public comment for this site"></textarea><div class="popup-actions"><button class="secondary" type="button" onclick="window.__campingApp.submitSiteComment&&window.__campingApp.submitSiteComment('${jsString(siteId)}')">Post comment</button><button class="secondary" type="button" onclick="window.__campingApp.loadSiteComments&&window.__campingApp.loadSiteComments('${jsString(siteId)}',true)">Load comments</button></div><div id="comments_${safe}" class="community-comments">${commentRows||'<div class="mini-note">Comments load when requested.</div>'}</div></div><div class="popup-actions"><button class="primary" type="button" onclick="window.__campingApp.openCorrectionModal&&window.__campingApp.openCorrectionModal('${jsString(siteId)}')">Suggest a correction</button></div></div>`;
}
async function ensureCommunityProfile(){
  if(!signedInCommunity())return;
  const user=app.session.user;
  try{
    await app.supabase.from(COMMUNITY_TABLES.profiles).upsert({id:user.id,display_name:user.email||'Camper'},{onConflict:'id'});
  }catch(e){if(isMissingSupabaseTableError(e))markCommunityUnavailable(e);else console.warn('Profile upsert failed',e);}
}
async function refreshCommunityFavorites(options={}){
  if(!signedInCommunity()){app.communityFavorites={};syncFilters();return;}
  try{
    const {data,error}=await app.supabase.from(COMMUNITY_TABLES.favorites).select('*').eq('user_id',app.session.user.id);
    if(error)throw error;
    const map={};
    (data||[]).forEach(r=>{map[String(r.site_id)]={is_favorite:!!r.is_favorite,want_to_visit:!!r.want_to_visit,visited:!!r.visited,loved:!!r.loved,private_note:r.private_note||''};});
    app.communityFavorites=map;
    syncFilters();
    if(options.refreshMap&&communityFilterIsActive()&&app.map&&Array.isArray(app.sites)&&app.sites.length)renderMarkers(false);
  }catch(e){
    if(isMissingSupabaseTableError(e)){markCommunityUnavailable(e);return;}
    console.warn('Could not load favorites',e);
    notify('Could not load favorites. Check Supabase table/RLS setup.',6000);
  }
}
async function toggleSiteFavorite(siteId,field){
  if(!signedInCommunity())return notify('Sign in first.');
  if(!['is_favorite','want_to_visit','visited','loved'].includes(field))return;
  const site=siteByStableId(siteId);
  const current=favoriteState(siteId);
  const next=!current[field];
  const payload={user_id:app.session.user.id,site_id:String(siteId),...siteSnapshot(site),is_favorite:!!current.is_favorite,want_to_visit:!!current.want_to_visit,visited:!!current.visited,loved:!!current.loved};
  payload[field]=next;
  try{
    const {error}=await app.supabase.from(COMMUNITY_TABLES.favorites).upsert(payload,{onConflict:'user_id,site_id'});
    if(error)throw error;
    app.communityFavorites[String(siteId)]={...current,[field]:next};
    refreshCommunityButtons(String(siteId));
    syncFilters();
    if(communityFilterIsActive()&&app.map&&Array.isArray(app.sites)&&app.sites.length)renderMarkers(false);
    notify(next?'Saved.':'Updated.');
  }catch(e){
    console.error(e);
    if(isMissingSupabaseTableError(e)){markCommunityUnavailable(e);return;}
    notify(e&&e.message?e.message:'Could not update favorite.',7000);
  }
}
async function loadSiteComments(siteId,openToast=false){
  if(app.communityAvailable===false)return notify(communityUnavailableMessage(),6000);
  if(!app.supabase)return notify('Supabase config is not loaded.');
  const safe=domSafeId(siteId);
  const out=$('comments_'+safe);
  if(out)out.innerHTML='<div class="mini-note">Loading comments…</div>';
  try{
    const {data,error}=await app.supabase.from(COMMUNITY_TABLES.comments).select('comment_text,display_name,created_at').eq('site_id',String(siteId)).eq('status','visible').order('created_at',{ascending:false}).limit(20);
    if(error)throw error;
    app.communityComments[String(siteId)]=data||[];
    if(out)out.innerHTML=(data&&data.length)?data.map(c=>`<div class="community-comment"><strong>${esc(c.display_name||'Camper')}</strong><span>${esc(c.comment_text||'')}</span><em>${esc((c.created_at||'').slice(0,10))}</em></div>`).join(''):'<div class="mini-note">No comments yet.</div>';
    if(openToast)notify('Comments loaded.');
  }catch(e){
    console.error(e);
    if(isMissingSupabaseTableError(e)){markCommunityUnavailable(e);if(out)out.innerHTML=`<div class="mini-note">${esc(communityUnavailableMessage())}</div>`;return;}
    if(out)out.innerHTML='<div class="mini-note">Could not load comments.</div>';
    notify(e&&e.message?e.message:'Could not load comments.',7000);
  }
}
async function submitSiteComment(siteId){
  if(!signedInCommunity())return notify('Sign in first.');
  const safe=domSafeId(siteId);
  const box=$('comment_'+safe);
  const text=(box&&box.value||'').trim();
  if(text.length<3)return notify('Write a short comment first.');
  if(text.length>2000)return notify('Comment is too long. Keep it under 2,000 characters.');
  const site=siteByStableId(siteId);
  const payload={user_id:app.session.user.id,display_name:sessionEmail(),comment_text:text,status:'visible',...siteSnapshot(site)};
  try{
    const {error}=await app.supabase.from(COMMUNITY_TABLES.comments).insert(payload);
    if(error)throw error;
    if(box)box.value='';
    await loadSiteComments(siteId,false);
    notify('Comment posted.');
  }catch(e){
    console.error(e);
    if(isMissingSupabaseTableError(e)){markCommunityUnavailable(e);return;}
    notify(e&&e.message?e.message:'Could not post comment.',7000);
  }
}
function openCorrectionModal(siteId){
  if(app.communityAvailable===false)return notify(communityUnavailableMessage(),6000);
  if(!signedInCommunity())return notify('Sign in first.');
  const site=siteByStableId(siteId);
  app.communityCurrentSite=site;
  const snap=siteSnapshot(site);
  if($('correctionSiteLabel'))$('correctionSiteLabel').textContent=`${snap.site_name||'Selected site'} (${snap.site_id})`;
  if($('correctionType'))$('correctionType').value='other';
  if($('correctionMessage'))$('correctionMessage').value='';
  if($('correctionCoords'))$('correctionCoords').value='';
  openModal('correctionModal');
}
async function submitCorrection(){
  if(app.communityAvailable===false)return notify(communityUnavailableMessage(),6000);
  if(!signedInCommunity())return notify('Sign in first.');
  const site=app.communityCurrentSite;
  const snap=siteSnapshot(site);
  const type=($('correctionType')&&$('correctionType').value)||'other';
  const msg=($('correctionMessage')&&$('correctionMessage').value||'').trim();
  if(msg.length<5)return notify('Add a useful correction note first.');
  let lat=null,lng=null;
  const coord=($('correctionCoords')&&$('correctionCoords').value||'').trim();
  if(coord){const parsed=parseLatLngText(coord); if(!parsed)return notify('Correction coordinates need to be like 45.123, -87.456'); lat=parsed.lat; lng=parsed.lng;}
  const payload={user_id:app.session.user.id,...snap,correction_type:type,message:msg,suggested_latitude:lat,suggested_longitude:lng,status:'new'};
  try{
    const {error}=await app.supabase.from(COMMUNITY_TABLES.corrections).insert(payload);
    if(error)throw error;
    closeModal('correctionModal');
    notify('Correction sent to Tod.');
  }catch(e){
    console.error(e);
    if(isMissingSupabaseTableError(e)){markCommunityUnavailable(e);return;}
    notify(e&&e.message?e.message:'Could not submit correction.',7000);
  }
}

function popup(s){
  const siteLat=Number(s.lat),siteLng=Number(s.lng);
  const lat=siteLat.toFixed(6),lng=siteLng.toFixed(6);
  const userCenter=app.localAreaCenter;
  const hasUserLocation=Array.isArray(userCenter)&&Number.isFinite(Number(userCenter[0]))&&Number.isFinite(Number(userCenter[1]));
  const straightMiles=hasUserLocation?distanceMiles(Number(userCenter[0]),Number(userCenter[1]),siteLat,siteLng):null;
  const distanceText=Number.isFinite(straightMiles)?`${straightMiles<10?straightMiles.toFixed(1):Math.round(straightMiles)} mi straight-line`:'';
  const directionsUrl=hasUserLocation?`https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(Number(userCenter[0]).toFixed(6)+','+Number(userCenter[1]).toFixed(6))}&destination=${encodeURIComponent(lat+','+lng)}&travelmode=driving`:`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
  const links=[];
  if(s.website)links.push(`<a href="${esc(s.website)}" target="_blank" rel="noopener">Website</a>`);
  const sourceLink=restRoadsideSourceLink(s); if(sourceLink)links.push(sourceLink);
  const markerNotice=markerTypeNotice(s);
  const rows=[['Type',layerDef(layerKey(s)).label],['Distance from you',distanceText],['Traveler stop',isTravelerStop(s)?'Yes — useful for a short public pull-off/rest stop.':''],['Camping',isTravelerStop(s)?'Not implied. Use overnight-parking status and posted rules separately.':''],['Facility',s.facilityType],['Useful for',s.travelerUse],['Owner level',s.ownerLevel],['Current status',s.currentStatus],['Overnight parking',s.overnightParking],['Local likelihood',s.localParkingLikelihood],['Parking-policy note',s.parkingPolicyNotes],['Location evidence',s.locationEvidenceSummary],['Evidence confidence',s.evidenceConfidence],['Parking fit',s.parkingFit],['Season status',s.seasonStatus],['Season notes',s.seasonNotes],['Route',s.routeName],['Direction',s.routeDirection],['Mile marker',s.mileMarker],['Honoree',s.honoree],['Cost',s.costDisplay||s.cost],['Showers',s.showers],['Access',s.access],['Amenities',s.amenities],['Season',s.season],['Rating',s.rating],['Source',s.sourceName],['Location precision',s.locationPrecision],['Last checked',s.lastChecked]].filter(r=>r[1]);
  return `<div><div class="popup-title">${esc(s.name||'Unnamed site')}</div><div class="popup-meta">${esc(s.stateName||s.stateCode||'')} · ${lat}, ${lng}</div>${markerNotice?`<div class="popup-notice">${esc(markerNotice)}</div>`:''}${adminHiddenNotice(s)}${areaOutlinePopup(s)}<div class="popup-grid">${rows.map(r=>`<div class="popup-row"><strong>${esc(r[0])}</strong><span>${esc(r[1])}</span></div>`).join('')}</div>${s.description?`<div class="popup-copy">${esc(s.description)}</div>`:''}${links.length?`<div class="popup-actions">${links.join('')}</div>`:''}<div class="popup-actions"><button class="secondary" onclick="navigator.clipboard&&navigator.clipboard.writeText('${lat}, ${lng}')">Copy coordinates</button><a class="secondary" target="_blank" rel="noopener" href="${directionsUrl}">${hasUserLocation?'Driving directions':'Google Maps'}</a><a class="secondary" target="_blank" rel="noopener" href="https://maps.apple.com/?ll=${lat},${lng}&q=${encodeURIComponent(s.name||'Camping site')}">Apple Maps</a></div>${adminToolsHtml(s)}${communityHtml(s)}</div>`;
}

function showSearchResult(site){
  if(!site||!app.map)return;
  const lat=Number(site.lat),lng=Number(site.lng);
  if(!Number.isFinite(lat)||!Number.isFinite(lng))return;
  const key=layerKey(site);
  const hidden=searchResultHiddenByLayer(site);
  clearSearchRevealMarker();
  app.map.setView([lat,lng],13);
  if(hidden){
    const label=layerDef(key).label;
    const notice=`<div class="popup-notice">Search result from hidden layer: ${esc(label)}. This one marker is temporarily shown from search; turn on that layer to see the full layer.</div>`;
    app.searchRevealMarker=L.marker([lat,lng],{icon:markerIcon(site),zIndexOffset:4000}).addTo(app.map).bindPopup(notice+popup(site)).openPopup();
  }
}
function renderSearchResults(hits,q){
  const out=$('searchResults');
  if(!out)return;
  const shown=hits.slice(0,20);
  const placeButton=`<div class="mini-note"><button class="secondary" type="button" data-search-place="1">Use “${esc(q)}” as a map place / Nearby center</button></div>`;
  out.innerHTML=shown.length?shown.map((s,i)=>{const key=layerKey(s);const hidden=searchResultHiddenByLayer(s);return `<button class="search-result" type="button" data-result-index="${i}"><strong>${esc(s.name)}</strong><br><span class="muted">${esc(s.stateName||s.stateCode||'')} · ${esc(layerDef(key).label)}${hidden?' · Hidden layer currently off':''}</span>${hidden?'<br><span class="mini-note">Selecting this result temporarily reveals it.</span>':''}</button>`}).join('')+placeButton:`<div class="mini-note">No loaded sites matched “${esc(q)}”. Searching as a map place…</div>`;
  $$('.search-result',out).forEach(b=>b.onclick=()=>showSearchResult(shown[Number(b.dataset.resultIndex)]));
  const placeBtn=out.querySelector('[data-search-place]');
  if(placeBtn)placeBtn.onclick=()=>runPlaceSearch(q);
}
async function runPlaceSearch(raw){
  const q=String(raw||'').trim();
  const out=$('searchResults');
  if(!q)return;
  try{
    if(out)out.innerHTML=`<div class="mini-note">Finding map place “${esc(q)}”…</div>`;
    clearSearchRevealMarker();
    app.search={active:false,query:''};
    const place=await geocodeRoutePlace(q);
    await applyNearMapLocation(place.lat,place.lng,'Nearby search center: '+place.label);
    if(out)out.innerHTML=`<div class="mini-note">Nearby search centered on <strong>${esc(place.label)}</strong>. Adjust the mileage slider to show sites within your chosen distance.</div>`;
    notify(`Nearby search centered on ${place.label}. Adjust mileage to widen or narrow results.`,6500);
  }catch(err){
    if(out)out.innerHTML=`<div class="mini-note">No loaded sites matched “${esc(q)}”, and no map place was found. Try adding a state, national park, county, or coordinates.</div>`;
    notify(err&&err.message?err.message:'Place search failed.');
  }
}
async function runSearch(){
  const q=$('searchInput')?.value.trim()||'';
  const out=$('searchResults');
  if(out)out.innerHTML='';
  if(!q){clearSearchMode(true);return;}
  const coord=q.match(/^\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\s*$/);
  if(coord){
    clearSearchMode(false);
    await applyNearMapLocation(Number(coord[1]),Number(coord[2]),'Nearby search center: '+q);
    return;
  }
  app.search={active:true,query:q.toLowerCase()};
  const hits=app.sites.filter(s=>Number.isFinite(Number(s.lat))&&Number.isFinite(Number(s.lng))&&siteVisibleToCurrentUser(s)&&siteWithinTextSearch(s));
  renderSearchResults(hits,q);
  if(!hits.length){await runPlaceSearch(q);return;}
  await renderMarkers(true);
  notify(`Search active: found ${hits.length} loaded matching site${hits.length===1?'':'s'}. Use the map-place button to center Nearby search on “${q}” instead.`);
}

const DEFAULT_NEAR_RADIUS_MILES=180;
const LIVE_LOCATION_AUTO_START=false;
const LIVE_LOCATION_RELOAD_DISTANCE_MILES=25;
function normalizeNearMiles(value){const n=Math.round(Number(value));if(!Number.isFinite(n))return DEFAULT_NEAR_RADIUS_MILES;return Math.max(0,Math.min(350,n));}
function nearRadiusMiles(){return normalizeNearMiles(app.nearRadiusMiles||DEFAULT_NEAR_RADIUS_MILES);}
function nearRadiusMeters(){return Math.max(1,nearRadiusMiles()*1609.344);}
function setNearMilesUI(value,applyFilter){const n=normalizeNearMiles(value);app.nearRadiusMiles=n;const slider=$('nearMiles'),number=$('nearMilesNumber'),label=$('nearMilesValue');if(slider&&String(slider.value)!==String(n))slider.value=String(n);if(number&&String(number.value)!==String(n))number.value=String(n);if(label)label.textContent=String(n);if(app.nearMeActive&&app.localAreaCenter&&applyFilter){renderMarkers(true);fitNearMeRadius(app.localAreaCenter);syncStateControls();setLocationStatus(`Nearby search is active within ${n} miles.`);}}
function toRad(v){return Number(v)*Math.PI/180}
function distanceMiles(aLat,aLng,bLat,bLng){const R=3958.7613;const dLat=toRad(bLat-aLat),dLng=toRad(bLng-aLng);const x=Math.sin(dLat/2)**2+Math.cos(toRad(aLat))*Math.cos(toRad(bLat))*Math.sin(dLng/2)**2;return 2*R*Math.atan2(Math.sqrt(x),Math.sqrt(1-x))}
function pointInBounds(lat,lng,b){return lat>=b[0][0]&&lat<=b[1][0]&&lng>=b[0][1]&&lng<=b[1][1]}
function stateNearLocation(code,lat,lng,radiusMiles=nearRadiusMiles()){const b=STATE_BOUNDS[String(code).toUpperCase()];if(!b)return false;if(pointInBounds(lat,lng,b))return true;const closestLat=Math.max(b[0][0],Math.min(lat,b[1][0]));const closestLng=Math.max(b[0][1],Math.min(lng,b[1][1]));return distanceMiles(lat,lng,closestLat,closestLng)<=radiusMiles}
function mappedStatesNearLocation(lat,lng){const codes=mappedStateEntries().map(s=>s.code).filter(code=>stateNearLocation(code,lat,lng,nearRadiusMiles()));return codes.length?codes:[DEFAULT_STATE]}
function setNearCenterMarker(ll,label='Nearby center'){
  const latLng=L.latLng(ll[0],ll[1]);
  const icon=L.divIcon({className:'',html:`<span class="map-pin pin-boondocking">${ICONS.dot}</span>`,iconSize:[22,22],iconAnchor:[11,11],popupAnchor:[0,-10]});
  if(app.nearCenterMarker){app.nearCenterMarker.setLatLng(latLng);}else{app.nearCenterMarker=L.marker(latLng,{icon}).addTo(app.map).bindPopup(label);}
}
async function applyNearMapLocation(lat,lng,label='Nearby search center'){
  if(!Number.isFinite(lat)||!Number.isFinite(lng)){notify('That map spot does not have usable coordinates.');return;}
  app.nearPickMode=false;
  app.localAreaCenter=[lat,lng];
  app.nearMeActive=true;
  app.liveLocationLastLoadCenter=[lat,lng];
  setNearCenterMarker([lat,lng],label);
  const codes=mappedStatesNearLocation(lat,lng);
  app.enabledStates=new Set(codes);
  saveJson(STORE.states,[...app.enabledStates]);
  syncStateControls();
  setLoading(true,`Loading nearby map area (${nearRadiusMiles()} mi)…`);
  setLocationStatus(`Nearby search is active within ${nearRadiusMiles()} miles.`);
  try{await loadEnabledStates(false);fitNearMeRadius([lat,lng]);}
  finally{setLoading(false);}
}
function beginNearMapPick(){app.nearPickMode=true;app.routeSearch.pickMode=null;notify('Click the map center for Nearby search.');setLocationStatus('Click the map to choose a Nearby search center.');}
function clearNearbyMode(){clearNearMeMode();if(app.nearCenterMarker){app.nearCenterMarker.remove();app.nearCenterMarker=null;}if(app.userMarker){app.userMarker.remove();app.userMarker=null;}if(app.userAccuracyCircle){app.userAccuracyCircle.remove();app.userAccuracyCircle=null;}setLocationStatus('Nearby search is off.');syncStateControls();renderMarkers(true);notify('Nearby search cleared.');}
function showUserMarker(ll,accuracyMeters){
  const latLng=L.latLng(ll[0],ll[1]);
  const accuracy=Number(accuracyMeters);
  const radius=Number.isFinite(accuracy)&&accuracy>0?Math.max(accuracy,12):0;
  const icon=L.divIcon({className:'',html:`<span class="user-arrow-marker">${ICONS.navArrow}</span>`,iconSize:[28,28],iconAnchor:[14,14],popupAnchor:[0,-12]});
  if(app.userMarker){app.userMarker.setLatLng(latLng);}else{app.userMarker=L.marker(latLng,{icon}).addTo(app.map).bindPopup(`You are here — Nearby search is using your location and showing roughly ${nearRadiusMiles()} miles around you`);}
  if(radius){
    if(app.userAccuracyCircle){app.userAccuracyCircle.setLatLng(latLng).setRadius(radius);}else{app.userAccuracyCircle=L.circle(latLng,{radius,interactive:false,weight:1,opacity:.55,fillOpacity:.12}).addTo(app.map);}
  }
}
function fitNearMeRadius(ll){const circle=L.circle(ll,{radius:nearRadiusMeters()});app.map.fitBounds(circle.getBounds(),{padding:[28,28],animate:false})}
function centerOnLiveLocation(ll){if(!app.map)return;const z=app.map.getZoom();app.map.setView(ll,Math.max(z||0,11),{animate:true});}
function liveLocationNeedsReload(lat,lng){
  if(!app.liveLocationLastLoadCenter)return true;
  return distanceMiles(app.liveLocationLastLoadCenter[0],app.liveLocationLastLoadCenter[1],lat,lng)>=LIVE_LOCATION_RELOAD_DISTANCE_MILES;
}
function siteWithinNearMeRange(site){
  if(!app.nearMeActive||!app.localAreaCenter)return true;
  const lat=Number(site.lat),lng=Number(site.lng);
  if(!Number.isFinite(lat)||!Number.isFinite(lng))return false;
  return distanceMiles(app.localAreaCenter[0],app.localAreaCenter[1],lat,lng)<=nearRadiusMiles();
}
async function applyNearMeLocation(lat,lng,accuracyMeters,options={}){
  const ll=[lat,lng];
  app.localAreaCenter=ll;
  showUserMarker(ll,accuracyMeters);
  const useNearMe=!!options.nearMe;
  if(useNearMe){
    app.nearMeActive=true;
    const shouldReload=!!options.forceReload||liveLocationNeedsReload(lat,lng);
    if(shouldReload&&!app.liveLocationLoading){
      app.liveLocationLoading=true;
      app.liveLocationLastLoadCenter=ll;
      const codes=mappedStatesNearLocation(lat,lng);
      app.enabledStates=new Set(codes);
      saveJson(STORE.states,[...app.enabledStates]);
      syncStateControls();
      app.sites=[];
      app.shownSites=[];
      renderMarkers(false);
      setLoading(true,`Loading local map area (${nearRadiusMiles()} mi)…`);
      notify(`Nearby search: loading sites within ${nearRadiusMiles()} miles.`,3500);
      try{await loadEnabledStates(false);}finally{app.liveLocationLoading=false;setLoading(false);}
    }
    renderMarkers(false);
    syncStateControls();
    centerOnLiveLocation(ll);
    return;
  }
  renderMarkers(false);
  syncStateControls();
}
function startLiveLocation(force=false){
  if(!navigator.geolocation){setLocationStatus('Location is not available in this browser.');return notify('Location is not available in this browser.');}
  const manualNearMe=!!force;
  if(app.liveLocationStarted&&!manualNearMe)return;
  if(app.liveLocationWatchId!=null){navigator.geolocation.clearWatch(app.liveLocationWatchId);app.liveLocationWatchId=null;}
  app.liveLocationStarted=true;
  if(manualNearMe){
    app.nearMeActive=true;
    app.localAreaCenter=null;
    app.enabledStates=new Set();
    saveJson(STORE.states,[]);
    app.sites=[];
    app.shownSites=[];
    renderMarkers(false);
    syncStateControls();
    setLoading(true,'Getting your location for Nearby search…');
    setLocationStatus('Waiting for location permission…');
    notify('Getting your location for Nearby search…');
  }
  app.liveLocationWatchId=navigator.geolocation.watchPosition(pos=>{
    const c=pos.coords||{};
    applyNearMeLocation(c.latitude,c.longitude,c.accuracy,{nearMe:manualNearMe,forceReload:manualNearMe&&!app.liveLocationLastLoadCenter}).then(()=>setLocationStatus('Nearby search is active.')).catch(e=>{console.error(e);setLoading(false);setLocationStatus('Could not update your nearby location.');notify('Could not update your nearby location.')});
  },err=>{
    app.liveLocationStarted=false;
    app.liveLocationWatchId=null;
    setLoading(false);
    const msg=err&&err.code===1?'Location permission was denied. Allow location for this site to use Nearby search.':'Could not get your location. Check browser/site location permission.';
    setLocationStatus(msg);notify(msg,6000);
  },{enableHighAccuracy:true,timeout:15000,maximumAge:15000});
}
function nearMe(){requestLocationFromButton(true)}
function setDraftPoint(ll){app.draftPoint=ll;if(app.draftMarker)app.draftMarker.remove();app.draftMarker=L.marker(ll,{icon:L.divIcon({className:'',html:`<span class="map-pin pin-draft">${ICONS.draft}</span>`,iconSize:[24,24],iconAnchor:[12,12]})}).addTo(app.map);$('draftCoords').textContent=`Draft point: ${ll.lat.toFixed(6)}, ${ll.lng.toFixed(6)}`;openModal('addSiteModal')}
function clearDraft(){if(app.draftMarker)app.draftMarker.remove();app.draftMarker=null;app.draftPoint=null;$('draftCoords').textContent='No draft point selected.';['draftName','draftWebsite','draftNotes','draftCost','draftShowers','draftAccess','draftAmenities','draftTrailheads','draftSeason','draftReview','draftRating','draftExtraLinks'].forEach(id=>$(id).value='')}
function draftPayload(){const p=app.draftPoint;return {name:$('draftName').value.trim(),lat:p?p.lat:null,lng:p?p.lng:null,stateCode:$('draftState').value.trim().toUpperCase(),layer:$('draftCategory').value,website:$('draftWebsite').value.trim(),description:$('draftNotes').value.trim(),cost:$('draftCost').value.trim(),showers:$('draftShowers').value.trim(),access:$('draftAccess').value.trim(),amenities:$('draftAmenities').value.trim(),trailheads:$('draftTrailheads').value.trim(),season:$('draftSeason').value.trim(),reviewSummary:$('draftReview').value.trim(),rating:$('draftRating').value.trim(),extraLinks:$('draftExtraLinks').value.trim()}}
function appendDraft(){const d=draftPayload();if(!d.name)return notify('Add a site name first.');const line=JSON.stringify(d);app.draftQueue.push(line);saveJson(STORE.queue,app.draftQueue);$('draftQueue').value=app.draftQueue.join('\n');notify('Draft appended to queue.');openModal('queueModal')}
async function copyQueue(){try{await navigator.clipboard.writeText($('draftQueue').value);notify('Queue copied.')}catch{notify('Clipboard blocked; select and copy manually.')}}
function authEmail(){return $('sbEmail')?.value.trim()||'';}
function authPassword(){return $('sbPassword')?.value||'';}
function mirrorAuthFields(){}
function sessionEmail(){return app.session&&app.session.user?(app.session.user.email||'signed-in user'):'';}
function updateAuthUi(message){
  const status=$('supabaseStatus');
  if(status){
    if(message)status.textContent=message;
    else if(!app.supabase)status.textContent='Static fallback mode.';
    else if(app.session&&app.communityAvailable===false)status.textContent=`Signed in as ${sessionEmail()}. Community tools unavailable; check Supabase schema/table setup.`;
    else if(app.session)status.textContent=`Signed in as ${sessionEmail()}.`;
    else status.textContent='Supabase ready; not signed in.';
  }
  const signedIn=!!(app.supabase&&app.session);
  const routeStatus=$('routeAccountStatus');
  if(routeStatus){
    if(message)routeStatus.textContent=message;
    else if(!app.supabase)routeStatus.textContent='Cloud accounts need Supabase config.';
    else if(signedIn)routeStatus.textContent=`Signed in as ${sessionEmail()}.`;
    else routeStatus.textContent='Sign in under Options to save, update, load, or delete cloud routes.';
  }
  const accountAuthControls=$('accountAuthControls');
  const accountSignOut=$('sbSignOutBtn');
  if(accountAuthControls)accountAuthControls.hidden=signedIn;
  if(accountSignOut)accountSignOut.hidden=!signedIn;
  const save=$('routeSaveBtn'),load=$('routeLoadBtn'),del=$('routeDeleteBtn');
  if(save)save.disabled=!signedIn;
  if(load)load.disabled=!signedIn;
  if(del)del.disabled=!signedIn;
  renderSavedRoutes();
}
function validateAuthFields(){
  mirrorAuthFields();
  const email=authEmail(),password=authPassword();
  if(!email){notify('Enter an email address first.');return null;}
  if(!password||password.length<6){notify('Enter a password with at least 6 characters.');return null;}
  return {email,password};
}

function normalizeEmailAddress(value){return String(value||'').trim().toLowerCase();}
function primaryAdminEmail(){return 'tpoirier@nmu.edu';}
function sessionEmailNormalized(){return normalizeEmailAddress(app.session&&app.session.user&&app.session.user.email);}
function isAdminUser(){return !!(app.session&&((app.currentProfile&&app.currentProfile.role==='admin')||sessionEmailNormalized()===primaryAdminEmail()));}
function setAdminStatus(message){const el=$('adminStatus');if(el)el.textContent=message||'';}
function updateAdminUi(message){
  const admin=isAdminUser();
  const section=$('adminSection');
  if(section)section.hidden=!admin;
  const role=$('adminRoleStatus');
  if(role){
    if(!app.session)role.textContent='Admin mode is off — sign in first.';
    else if(admin)role.textContent=`Admin mode active for ${sessionEmail()}.`;
    else role.textContent='Signed in, but not an admin.';
  }
  if(message)setAdminStatus(message);
}
function togglePasswordVisibility(){
  const input=$('sbPassword'),btn=$('sbPasswordToggle');
  if(!input||!btn)return;
  const show=input.type==='password';
  input.type=show?'text':'password';
  btn.textContent=show?'🙈':'👁';
  btn.setAttribute('aria-label',show?'Hide password':'Show password');
  btn.setAttribute('aria-pressed',show?'true':'false');
  input.focus();
}
async function refreshCurrentProfile(){
  app.currentProfile=null;
  if(!app.supabase||!app.session){updateAdminUi();return null;}
  try{
    const {data,error}=await app.supabase.from(COMMUNITY_TABLES.profiles).select('id,display_name,role').eq('id',app.session.user.id).maybeSingle();
    if(error)throw error;
    app.currentProfile=data||{id:app.session.user.id,display_name:sessionEmail(),role:sessionEmailNormalized()===primaryAdminEmail()?'admin':'user'};
  }catch(e){
    if(isMissingSupabaseTableError(e))markCommunityUnavailable(e);else console.warn('Could not load admin profile',e);
    app.currentProfile={id:app.session.user.id,display_name:sessionEmail(),role:sessionEmailNormalized()===primaryAdminEmail()?'admin':'user'};
  }
  updateAdminUi();
  return app.currentProfile;
}
async function promoteAdminByEmail(){
  if(!app.supabase||!app.session)return notify('Sign in first.');
  if(!isAdminUser())return notify('Admin mode is required.');
  const input=$('adminEmailInput');
  const email=normalizeEmailAddress(input&&input.value);
  if(!email)return notify('Enter the email address to elevate.');
  const btn=$('adminMakeAdminBtn');
  if(btn)btn.disabled=true;
  setAdminStatus('Updating role…');
  try{
    const {data,error}=await app.supabase.rpc('boondocking_map_set_user_role_by_email',{target_email:email,target_role:'admin'});
    if(error)throw error;
    const msg=(data&&data.message)||`${email} was marked as admin.`;
    setAdminStatus(msg);
    notify(msg,7000);
  }catch(e){
    console.error(e);
    const msg=e&&e.message?e.message:'Could not update admin role. Run the current Supabase SQL migration if the admin RPC is missing.';
    setAdminStatus(msg);
    notify(msg,9000);
  }finally{if(btn)btn.disabled=false;}
}
function siteVisibleToCurrentUser(site){return !siteIsAdminHidden(site)||isAdminUser();}
function siteIsAdminHidden(siteOrId){const id=typeof siteOrId==='string'?siteOrId:siteStableId(siteOrId);return !!(id&&app.adminHiddenSites&&app.adminHiddenSites[String(id)]);}
function adminHiddenSiteRow(siteOrId){const id=typeof siteOrId==='string'?siteOrId:siteStableId(siteOrId);return id&&app.adminHiddenSites?app.adminHiddenSites[String(id)]||null:null;}
function adminHiddenNotice(site){if(!isAdminUser()||!siteIsAdminHidden(site))return '';return '<div class="popup-notice">Admin hidden — this site is hidden from normal map users.</div>';}
function refreshAdminSiteButtons(siteId){
  const hidden=siteIsAdminHidden(siteId);
  $$('[data-admin-hide-site]').forEach(btn=>{
    if(btn.dataset.adminHideSite!==String(siteId))return;
    btn.classList.toggle('active',hidden);
    btn.setAttribute('aria-pressed',hidden?'true':'false');
    btn.textContent=hidden?'Unhide from normal users':'Hide from normal users';
  });
}
function adminToolsHtml(site){
  if(!isAdminUser())return '';
  const siteId=siteStableId(site);
  const hidden=siteIsAdminHidden(siteId);
  return `<div class="community-panel admin-panel" data-admin-site="${esc(siteId)}"><div class="community-title">Admin tools</div><div class="mini-note">Admin-only controls. Hidden sites remain visible to admins but are suppressed for normal map users.</div><div class="popup-actions"><button class="secondary admin-hide-btn${hidden?' active':''}" data-admin-hide-site="${esc(siteId)}" aria-pressed="${hidden?'true':'false'}" type="button" onclick="window.__campingApp.toggleAdminHiddenSite&&window.__campingApp.toggleAdminHiddenSite('${jsString(siteId)}')">${hidden?'Unhide from normal users':'Hide from normal users'}</button></div></div>`;
}
async function loadAdminHiddenSites(options={}){
  if(!app.supabase){app.adminHiddenSites={};return {};}
  try{
    const {data,error}=await app.supabase.from(COMMUNITY_TABLES.adminFlags).select('site_id,site_name,state_code,layer,latitude,longitude,hidden_admin_only,hidden_reason,updated_at').eq('hidden_admin_only',true);
    if(error)throw error;
    const map={};
    (data||[]).forEach(row=>{if(row&&row.site_id)map[String(row.site_id)]=row;});
    app.adminHiddenSites=map;
    app.adminFlagsAvailable=true;
    app.adminFlagsError=null;
    if(options.refreshMap&&app.map&&Array.isArray(app.sites)&&app.sites.length)renderMarkers(false);
    return map;
  }catch(e){
    app.adminHiddenSites={};
    app.adminFlagsAvailable=false;
    app.adminFlagsError=e&&e.message?e.message:'Admin hidden-site table unavailable.';
    if(isMissingSupabaseTableError(e))console.warn('Admin flags table unavailable. Run the current Supabase SQL migration for admin hidden-site controls.',e);else console.warn('Could not load admin hidden-site flags',e);
    updateAdminUi();
    return {};
  }
}
async function toggleAdminHiddenSite(siteId){
  if(!app.supabase||!app.session)return notify('Sign in first.');
  if(!isAdminUser())return notify('Admin mode is required.');
  const site=siteByStableId(siteId);
  if(!site)return notify('Could not find that site record.');
  const next=!siteIsAdminHidden(siteId);
  const payload={...siteSnapshot(site),hidden_admin_only:next,hidden_reason:next?'Hidden from normal map users by admin UI':'',hidden_by:app.session.user.id,hidden_at:next?new Date().toISOString():null};
  try{
    const {error}=await app.supabase.from(COMMUNITY_TABLES.adminFlags).upsert(payload,{onConflict:'site_id'});
    if(error)throw error;
    if(next)app.adminHiddenSites[String(siteId)]={...payload,site_id:String(siteId)};else delete app.adminHiddenSites[String(siteId)];
    refreshAdminSiteButtons(String(siteId));
    renderMarkers(false);
    notify(next?'Site hidden from normal users.':'Site unhidden for normal users.',6500);
  }catch(e){
    console.error(e);
    const msg=e&&e.message?e.message:'Could not update hidden-site status. Run the current Supabase SQL migration if this is the first admin install.';
    notify(msg,9000);
  }
}
async function initSupabase(){
  const cfg=window.CAMPING_SUPABASE_CONFIG;
  if(!cfg||!window.supabase){updateAuthUi('Static fallback mode.');return}
  const dbSchema=String(cfg.schema||'public').trim()||'public';
  app.communityAvailable=true;
  app.communityError=null;
  app.communityUnavailableNotified=false;
  app.supabase=window.supabase.createClient(cfg.url,cfg.anonKey,{db:{schema:dbSchema}});
  app.supabase.auth.onAuthStateChange((_event,session)=>{app.session=session||null;updateAuthUi();if(app.session){ensureCommunityProfile();refreshCurrentProfile();refreshSavedRoutes(false);refreshCommunityFavorites({refreshMap:true});loadAdminHiddenSites({refreshMap:true});}else{app.currentProfile=null;app.savedRoutes=[];app.savedRoutesLoaded=false;app.savedRoutesError=null;app.communityFavorites={};app.communityComments={};syncFilters();updateAdminUi();renderSavedRoutes();loadAdminHiddenSites({refreshMap:true});if(communityFilterIsActive()&&app.map&&Array.isArray(app.sites)&&app.sites.length)renderMarkers(false);}});
  const {data}=await app.supabase.auth.getSession();
  app.session=data.session||null;
  updateAuthUi();
  await loadAdminHiddenSites({refreshMap:true});
  if(app.session){await ensureCommunityProfile();await refreshCurrentProfile();await refreshSavedRoutes(false);await refreshCommunityFavorites({refreshMap:true});}else updateAdminUi();
}
async function createAccount(){
  if(!app.supabase)return notify('Supabase config is not loaded.');
  const creds=validateAuthFields();
  if(!creds)return;
  const btn=$('sbCreateAccountBtn');
  if(btn)btn.disabled=true;
  updateAuthUi('Creating account…');
  try{
    const {data,error}=await app.supabase.auth.signUp({email:creds.email,password:creds.password});
    if(error)throw error;
    if(data&&data.session){
      app.session=data.session;
      updateAuthUi();
      await ensureCommunityProfile();
      await refreshCurrentProfile();
      await refreshSavedRoutes(false);
      await refreshCommunityFavorites();
      notify('Account created and signed in. Cloud saved routes and community tools are ready.');
    }else{
      updateAuthUi('Account created. Check email to confirm, then sign in.');
      notify('Account created. If email confirmation is enabled in Supabase, confirm the email before signing in.',7000);
    }
  }catch(err){console.error(err);updateAuthUi();notify(err&&err.message?err.message:'Could not create account.',7000);}
  finally{if(btn)btn.disabled=false;}
}
async function signIn(e){
  if(e)e.preventDefault();
  if(!app.supabase)return notify('Supabase config is not loaded.');
  const creds=validateAuthFields();
  if(!creds)return;
  const btn=$('sbSignInBtn');
  if(btn)btn.disabled=true;
  updateAuthUi('Signing in…');
  try{
    const {error}=await app.supabase.auth.signInWithPassword(creds);
    if(error)throw error;
    app.session=(await app.supabase.auth.getSession()).data.session;
    updateAuthUi();
    await ensureCommunityProfile();
    await refreshCurrentProfile();
    await refreshSavedRoutes(false);
    await refreshCommunityFavorites({refreshMap:true});
    await loadAdminHiddenSites({refreshMap:true});
    notify('Signed in.');
  }catch(err){console.error(err);updateAuthUi();notify(err&&err.message?err.message:'Sign in failed.',7000);}
  finally{if(btn)btn.disabled=false;}
}
async function signOut(){
  if(!app.supabase)return;
  await app.supabase.auth.signOut();
  app.session=null;
  app.currentProfile=null;
  app.savedRoutes=[];
  app.savedRoutesLoaded=false;
  app.savedRoutesError=null;
  app.communityFavorites={};
  app.communityComments={};
  syncFilters();
  updateAuthUi('Signed out.');
  updateAdminUi();
  await loadAdminHiddenSites({refreshMap:true});
  if(communityFilterIsActive()&&app.map&&Array.isArray(app.sites)&&app.sites.length)renderMarkers(false);
}
async function sendDraftSupabase(){const d=draftPayload();if(!d.name)return notify('Add a site name first.');if(!app.supabase||!app.session)return notify('Sign in to Supabase first, or use the manual queue.');notify('Supabase insert is not enabled in this integrated rebuild yet; added to manual queue instead.',5000);appendDraft()}

function versionParts(v){return String(v||'').replace(/^v/i,'').split('.').map(n=>parseInt(n,10)||0)}
function isNewerVersion(remote,current){const a=versionParts(remote),b=versionParts(current);for(let i=0;i<Math.max(a.length,b.length);i++){const x=a[i]||0,y=b[i]||0;if(x>y)return true;if(x<y)return false;}return false}
function cacheBustedReload(){
  try{localStorage.setItem('campingMap.lastManualRefresh',String(Date.now()))}catch(_e){}
  const entry=window.CAMPING_APP_ENTRY || new URL('index.html', window.location.href).href;
  const url=new URL(entry, window.location.href);
  url.search='?refresh='+Date.now();
  url.hash='';
  window.location.replace(url.href);
}
function showUpdateNotice(remoteVersion){
  if(!$('updateGate')){
    const gate=document.createElement('div');
    gate.id='updateGate';
    gate.className='update-gate';
    gate.innerHTML=`<div class="update-gate-card" role="dialog" aria-modal="true" aria-label="Update required"><h2>Update required</h2><p>This browser is running <strong>${esc(VERSION)}</strong>, but the live app is <strong>${esc(remoteVersion)}</strong>.</p><p>Reload latest uses a cache-busted refresh so the browser stops using stale map files.</p><div class="update-gate-actions"><button id="updateGateReload" class="primary" type="button">Reload latest</button></div></div>`;
    document.body.appendChild(gate);
  }
  const gateReload=$('updateGateReload'); if(gateReload)gateReload.onclick=cacheBustedReload;
}

function extractBuildVersionFromVersionJs(text){
  const m=String(text||'').match(/\bversion\s*:\s*['"]([^'"]+)['"]/);
  return m?m[1]:'';
}
async function checkForAppUpdate(){
  try{
    const res=await fetch('version.js?ts='+Date.now(),{cache:'no-store'});
    if(!res.ok)return;
    const remote=extractBuildVersionFromVersionJs(await res.text());
    if(remote&&isNewerVersion(remote,VERSION))showUpdateNotice(remote);
  }catch(_e){}
}

app.toggleSiteFavorite=toggleSiteFavorite;
app.loadSiteComments=loadSiteComments;
app.submitSiteComment=submitSiteComment;
app.openCorrectionModal=openCorrectionModal;
app.submitCorrection=submitCorrection;
app.toggleAdminHiddenSite=toggleAdminHiddenSite;
app.promoteAdminByEmail=promoteAdminByEmail;
app.refreshCommunityFavorites=refreshCommunityFavorites;

function startupStatus(msg){
  try{window.CAMPING_STARTUP_STAGE=msg||'';}catch(_e){}
  try{setLoading(true,msg||'Loading map…');}catch(_e){
    try{const el=document.getElementById('mapLoading'); if(el){el.classList.remove('hidden'); if(msg)el.textContent=msg;}}catch(__e){}
  }
}
function startupFail(error,stage){
  const where=stage||window.CAMPING_STARTUP_STAGE||'startup';
  const detail=(error&&error.message)?error.message:String(error||'Unknown error');
  const msg=`Map startup failed during ${where}: ${detail}`;
  try{console.error(msg,error);}catch(_e){}
  try{
    const el=document.getElementById('mapLoading');
    if(el){
      el.classList.remove('hidden');
      el.textContent=msg+' — refresh once. If it repeats, open the browser console and send the error.';
      el.style.background='rgba(255,248,230,.96)';
      el.style.color='#5b2200';
      el.style.pointerEvents='auto';
      el.style.padding='24px';
      el.style.textAlign='center';
      el.style.lineHeight='1.45';
    }
  }catch(_e){}
  try{notify(msg,12000);}catch(_e){}
  try{if(window.CAMPING_STARTUP_FAIL)window.CAMPING_STARTUP_FAIL(msg,error);}catch(_e){}
}
function requireDom(id){const el=$(id); if(!el)throw new Error(`Missing required DOM element #${id}`); return el;}
function requireLeaflet(){if(!window.L||!L.map||!L.layerGroup||!L.tileLayer)throw new Error('Leaflet did not load. Check the network/CDN or provide a local Leaflet fallback.');}
function boot(){
  if(boot.started)return;
  boot.started=true;
  let stage='startup';
  try{
    window.CAMPING_BOOT_STARTED=true;
    stage='checking page elements'; startupStatus('Checking app shell…'); requireDom('map'); requireDom('mapLoading');
    stage='checking map library'; startupStatus('Checking map library…'); requireLeaflet();
    stage='restoring settings'; startupStatus('Restoring settings…'); initState();
    stage='checking restored selection'; startupStatus('Checking restored map selection…'); confirmRestoredLargeStateSelection();
    stage='starting map'; startupStatus('Starting map…'); initMap();
    stage='building controls'; startupStatus('Building controls…'); buildControls(); bindAppActivityTracking();
    try{Promise.resolve(initSupabase()).catch(()=>{});}catch(_supabaseError){}
    stage='loading states'; startupStatus('Loading states…');
    Promise.resolve(loadEnabledStates(true)).then(()=>{window.CAMPING_BOOT_OK=true;}).catch(e=>startupFail(e,'loading states'));
    checkForAppUpdate();
  }catch(e){startupFail(e,stage);}
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
try{
  paintRuntimeVersion();
  window.addEventListener('load', function(){ paintRuntimeVersion(); setTimeout(paintRuntimeVersion, 250); });
}catch(_e){}

})();
