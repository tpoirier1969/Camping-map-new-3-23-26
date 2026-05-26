// Camping Map live hotfix shim for v23.0.75
// 2026-05-24: Prevent automatic live location from forcing Near Me mode on mobile.
// The full manifest is loaded from the rolling manifest file below.
(function(){
  'use strict';
  if(window.__campingNearMeEscapeHotfixV23077)return;
  window.__campingNearMeEscapeHotfixV23077=true;
  const nativeSetTimeout=window.setTimeout.bind(window);
  window.setTimeout=function(fn,delay,...args){
    try{
      if(delay===650 && typeof fn==='function' && String(fn).includes('startLiveLocation(false)')){
        console.info('Camping Map hotfix: blocked automatic Near Me live-location start.');
        startPassiveLiveLocationWatcher();
        return nativeSetTimeout(function(){},0);
      }
    }catch(_e){}
    return nativeSetTimeout(fn,delay,...args);
  };
  function startPassiveLiveLocationWatcher(){
    if(!navigator.geolocation || window.__campingPassiveLocationWatchId!=null)return;
    window.__campingPassiveLocationWatchId=navigator.geolocation.watchPosition(function(pos){
      try{updatePassiveUserLocation(pos.coords||{});}catch(e){console.warn('Camping Map passive location hotfix failed',e);}
    },function(err){
      console.warn('Camping Map passive location unavailable',err);
    },{enableHighAccuracy:true,timeout:15000,maximumAge:15000});
  }
  function updatePassiveUserLocation(coords){
    const app=window.__campingApp;
    if(!app||!app.map||!window.L)return;
    const lat=Number(coords.latitude),lng=Number(coords.longitude);
    if(!Number.isFinite(lat)||!Number.isFinite(lng))return;
    const ll=[lat,lng];
    app.localAreaCenter=ll;
    const latLng=L.latLng(lat,lng);
    const icon=L.divIcon({className:'',html:'<span class="user-arrow-marker"><svg viewBox="0 0 28 28"><circle cx="14" cy="14" r="11.5" fill="#ffffff"/><path fill="#1e78ff" d="M14 3.8 20.8 21l-6.8-3.2L7.2 21 14 3.8Z"/><circle cx="14" cy="14" r="11.5" fill="none" stroke="rgba(18,69,140,.22)" stroke-width="1"/></svg></span>',iconSize:[28,28],iconAnchor:[14,14],popupAnchor:[0,-12]});
    if(app.userMarker){app.userMarker.setLatLng(latLng);app.userMarker.setIcon(icon);}else{app.userMarker=L.marker(latLng,{icon}).addTo(app.map).bindPopup('You are here — live location is active.');}
    const accuracy=Number(coords.accuracy);
    const radius=Number.isFinite(accuracy)&&accuracy>0?Math.max(accuracy,12):0;
    if(radius){
      if(app.userAccuracyCircle){app.userAccuracyCircle.setLatLng(latLng).setRadius(radius);}else{app.userAccuracyCircle=L.circle(latLng,{radius,interactive:false,weight:1,opacity:.55,fillOpacity:.12,color:'#2e6fd8',fillColor:'#5aa1ff'}).addTo(app.map);}
    }
  }
})();
document.write('<script src="data/states-manifest.js"><\/script>');
