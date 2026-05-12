(function(){
  'use strict';
  const VERSION = 'v22.3.26';
  const $ = (sel, root=document) => root.querySelector(sel);
  const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));

  const ICONS = {
    tent:'<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M3 18.5 10.8 5h2.4L21 18.5h-3.1l-5.1-9.1-2.9 4.9 1.9 4.2H9.2l-1.5-3.2-1.7 3.2H3Zm6.8 0h4.5l-2.2-5-2.3 5Z"/></svg>',
    tree:'<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="m12 2 4 5h-2.1l3.6 4.5H15l3 3.8h-4.2V22h-3.6v-6.7H6l3-3.8H6.5L10.1 7H8L12 2Z"/></svg>',
    camper:'<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M4 8.5h10.6c.8 0 1.6.4 2.1 1l2.3 2.6H21a1 1 0 0 1 1 1v4.9h-1.7a2.6 2.6 0 0 1-5.1 0H9.8a2.6 2.6 0 0 1-5.1 0H3v-8.5a1 1 0 0 1 1-1Zm1.2 1.8v2.8H14v-2.8H5.2Zm11 3.1h3.2l-1.6-1.8a1.1 1.1 0 0 0-.8-.4h-.8v2.2ZM7.2 19a1.2 1.2 0 1 0 0-2.5 1.2 1.2 0 0 0 0 2.4Zm10.6 0a1.2 1.2 0 1 0 0-2.5 1.2 1.2 0 0 0 0 2.4Z"/></svg>',
    parking:'<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M6 3h7.4c3 0 5.1 2.1 5.1 5s-2.1 5.1-5.1 5.1H9.6V21H6V3Zm3.6 3.2v3.7h3.4c1.1 0 1.9-.7 1.9-1.9s-.8-1.8-1.9-1.8H9.6Z"/></svg>',
    info:'<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2.8A9.2 9.2 0 1 1 2.8 12 9.2 9.2 0 0 1 12 2.8Zm0 4a1.3 1.3 0 1 0 0 2.6 1.3 1.3 0 0 0 0-2.6Zm-1.7 5v1.8h1.1v3.6h-1.1V19h4.5v-1.8h-1.1v-5.4h-3.4Z"/></svg>',
    draft:'<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M4 17.5V20h2.5l8.6-8.6-2.5-2.5L4 17.5Zm12.4-9.9 1.5-1.5a1.2 1.2 0 0 1 1.7 0l.8.8a1.2 1.2 0 0 1 0 1.7l-1.5 1.5-2.5-2.5Z"/></svg>'
  };
  const iconForKey = {
    'federal-modern':['pin-federal-modern',ICONS.tent],
    'state-modern':['pin-state-modern',ICONS.tent],
    'local-modern':['pin-local-modern',ICONS.tent],
    'federal-rustic':['pin-federal-rustic',ICONS.tree],
    'state-rustic':['pin-state-rustic',ICONS.tree],
    'local-rustic':['pin-local-rustic',ICONS.tree],
    'private-modern':['pin-private-modern',ICONS.camper],
    'private-rustic':['pin-private-rustic',ICONS.camper],
    'boondocking':['pin-boondocking',ICONS.tree],
    'info':['pin-info',ICONS.info],
    'pending':['pin-draft',ICONS.draft]
  };
  const virtualLayers = [
    {label:'Modern campgrounds', keys:['federal-modern','state-modern','local-modern'], css:'pin-federal-modern', icon:ICONS.tent},
    {label:'Rustic campgrounds', keys:['federal-rustic','state-rustic','local-rustic'], css:'pin-federal-rustic', icon:ICONS.tree},
    {label:'Private modern', keys:['private-modern'], css:'pin-private-modern', icon:ICONS.camper},
    {label:'Private rustic', keys:['private-rustic'], css:'pin-private-rustic', icon:ICONS.camper},
    {label:'Boondocking / dispersed', keys:['boondocking'], css:'pin-boondocking', icon:ICONS.tree},
    {label:'Info / reference', keys:['info'], css:'pin-info', icon:ICONS.info},
    {label:'Needs Verification', keys:['pending'], css:'pin-draft', icon:ICONS.draft}
  ];

  function injectCss(){
    if($('#camping-ui-v22326-css')) return;
    const css = `
      :root{--ui-cream:#fbf8ef;--ui-cream-2:#f4efe2;--ui-line:#d8d4c7;--ui-deep:#183c25;--ui-green:#2f6f3c;--ui-green-2:#1f552e;}
      #sidebar{background:linear-gradient(180deg,var(--ui-cream),#f8f5ec);border-radius:18px;box-shadow:0 18px 48px rgba(18,29,23,.28);}
      .sidebar-scroll{padding:16px;background:linear-gradient(180deg,rgba(255,255,255,.36),rgba(255,255,255,0));}
      .panel-head{margin:-16px -16px 16px;padding:16px 16px 14px;background:linear-gradient(180deg,#fffdf6,#f5eddb);color:var(--ui-deep);border-bottom:1px solid var(--ui-line);align-items:center;}
      .panel-head h1{color:var(--ui-deep);font-size:1.48rem;line-height:.98;letter-spacing:.035em;text-transform:uppercase;font-weight:900;margin:0;}
      .panel-head p{color:#315841;margin:5px 0 0;}
      .state-badge{background:transparent!important;border:0!important;color:var(--ui-green-2)!important;padding:0!important;font-weight:800;}
      #closeSidebar{background:#f6f2e8;color:#173a24;border-color:#d4cebf;}
      .brand-wrap{display:flex;gap:12px;align-items:center;min-width:0;}
      .brand-icon{width:58px;height:58px;border-radius:18px;object-fit:cover;background:#fff;border:2px solid #1a3320;box-shadow:0 4px 12px rgba(0,0,0,.12);flex:0 0 auto;}
      .brand-text{min-width:0}.brand-subtitle{font-size:.9rem;line-height:1.05;text-transform:uppercase;letter-spacing:.08em;font-weight:900;color:#172f1d;margin:2px 0 0;}
      .brand-version{font-size:.86rem;color:#1f552e;font-weight:800;margin-top:8px;text-align:center;}
      .section{border-top:1px solid var(--ui-line);padding:14px 0 16px;}
      .section h2{display:flex;gap:8px;align-items:center;text-transform:uppercase;letter-spacing:.04em;font-size:.92rem;color:#173a24;}
      input[type=text],input[type=email],input[type=password],input[type=url],select,textarea{border-color:#d2cbbd;border-radius:12px;background:#fffdf9;}
      .primary{background:linear-gradient(180deg,var(--ui-green),var(--ui-green-2));border-color:var(--ui-green-2);}
      .secondary{background:#fffdf8;border-color:#d4cebf;color:#173a24;}
      .quick-filters button{font-weight:800;background:#fffdf8;border-color:#d4cebf;}
      .quick-filters button.active{background:linear-gradient(180deg,var(--ui-green),var(--ui-green-2));border-color:var(--ui-green-2);}
      .dropdown-btn{background:#fffdf8;border-color:#d4cebf;border-radius:14px;}
      .dropdown-panel{background:#fffdf8;border-color:#d4cebf;}
      .layer-toolbar{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:10px;}
      .layer-toolbar button{font-weight:900;border-radius:10px;min-height:38px;}
      .virtual-layer-list{display:grid;gap:8px;}
      .virtual-layer{display:flex;align-items:center;gap:10px;padding:9px 10px;border:1px solid #ded7ca;border-radius:12px;background:#fff;min-width:0;}
      .virtual-layer input{margin:0;flex:0 0 auto;}.virtual-layer .layer-title{font-weight:700;min-width:0;overflow:hidden;text-overflow:ellipsis;}
      .layer-icon,.section-icon{width:26px;height:26px;display:inline-flex;align-items:center;justify-content:center;border-radius:50%;border:2px solid var(--stroke);background:var(--fill);color:var(--icon);flex:0 0 26px;font-size:0;}
      .layer-icon svg,.section-icon svg{width:58%;height:58%;display:block;}
      .hidden-real-layer-list{display:none!important;}
      #stateSelectMeta,#dataStats:empty{display:none!important;}.basemap-note{display:none!important;}
      #mapReadout{display:none!important;}
      .check{min-width:0;}.check .meta{white-space:nowrap;flex:0 0 auto;}.check span:not(.meta){min-width:0;overflow:hidden;text-overflow:ellipsis;}
      .section-launch{display:grid;gap:8px;}.launch-btn{width:100%;display:flex;justify-content:space-between;align-items:center;text-align:left;font-weight:900;padding:12px 14px;border-radius:14px;}
      .modal-backdrop{position:absolute;inset:0;z-index:1800;background:rgba(13,20,16,.42);display:none;align-items:center;justify-content:center;padding:16px;}
      .modal-backdrop.open{display:flex;}.modal-card{width:min(660px,calc(100vw - 24px));max-height:calc(100vh - 32px);overflow:auto;background:var(--ui-cream);border:1px solid var(--ui-line);border-radius:20px;box-shadow:0 22px 70px rgba(0,0,0,.34);padding:16px;}
      .modal-head{display:flex;align-items:center;justify-content:space-between;gap:12px;margin:0 0 12px;}.modal-head h2{margin:0;font-size:1.25rem;color:#173a24;}.modal-close{border:1px solid #d4cebf;background:#fff;border-radius:12px;width:40px;height:40px;font-size:1.2rem;}
      .modal-card .section{border-top:0;padding:0}.modal-card .section>h2{display:none;}
      .filter-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px}.filter-grid label{display:grid;gap:5px;font-size:.86rem;color:#405246}.filter-note{font-size:.78rem;color:#6a6f67;margin-top:8px;}
      @media(max-width:700px){#sidebar{top:10px;left:10px;right:10px;bottom:10px;width:auto;border-radius:14px}.panel-head h1{font-size:1.28rem}.brand-icon{width:52px;height:52px;border-radius:16px}.modal-backdrop{align-items:flex-end;padding:8px}.modal-card{width:100%;max-height:88vh;border-radius:18px 18px 14px 14px}.filter-grid,.layer-toolbar{grid-template-columns:1fr}.check.small{align-items:flex-start}.check.small input{margin-top:3px}.check .meta{margin-left:0}}
    `;
    const style = document.createElement('style');
    style.id = 'camping-ui-v22326-css';
    style.textContent = css;
    document.head.appendChild(style);
  }

  function setVersion(){
    document.title = 'Camping Map ' + VERSION + ' sidebar redesign';
    const tag = $('#versionTag');
    if(tag) tag.textContent = VERSION;
  }

  function restyleHeader(){
    const headInner = $('.panel-head > div');
    if(!headInner || headInner.dataset.redesign === '1') return;
    headInner.dataset.redesign = '1';
    const h1 = $('h1', headInner);
    const status = $('#statusLine');
    const badge = $('.state-badge', headInner);
    if(h1) h1.innerHTML = 'Boondocking<br>Camping Map';
    const wrap = document.createElement('div');
    wrap.className = 'brand-wrap';
    const img = document.createElement('img');
    img.className = 'brand-icon';
    img.src = 'assets/icon-192.png';
    img.alt = 'Camping Map icon';
    const text = document.createElement('div');
    text.className = 'brand-text';
    const subtitle = document.createElement('div');
    subtitle.className = 'brand-subtitle';
    subtitle.textContent = 'and camping maps';
    headInner.insertBefore(wrap, headInner.firstChild);
    wrap.appendChild(img);
    wrap.appendChild(text);
    if(h1) text.appendChild(h1);
    text.appendChild(subtitle);
    if(badge){
      badge.classList.add('brand-version');
      text.appendChild(badge);
    }
    if(status){
      status.textContent = status.textContent || 'Loading map…';
      headInner.appendChild(status);
    }
  }

  function removeUserNotes(){
    const stateMeta = $('#stateSelectMeta');
    if(stateMeta){ stateMeta.textContent = ''; stateMeta.hidden = true; }
    $$('.mini-note').forEach(el => {
      const txt = (el.textContent || '').trim();
      if(txt === 'Recovery build uses the classic four-way basemap set.' || txt === 'Showing all enabled state files.'){
        el.textContent = '';
        el.classList.add('basemap-note');
      }
    });
  }

  function enhanceLayerMenu(){
    const panel = $('#layerMenuPanel');
    const realList = $('#layerList');
    if(!panel || !realList || panel.dataset.redesign === '1') return;
    panel.dataset.redesign = '1';
    realList.classList.add('hidden-real-layer-list');
    const toolbar = document.createElement('div');
    toolbar.className = 'layer-toolbar';
    const selectAll = document.createElement('button');
    selectAll.className = 'secondary';
    selectAll.type = 'button';
    selectAll.textContent = 'Select all';
    const clearAll = document.createElement('button');
    clearAll.className = 'secondary';
    clearAll.type = 'button';
    clearAll.textContent = 'Clear all';
    toolbar.append(selectAll, clearAll);
    const list = document.createElement('div');
    list.className = 'virtual-layer-list';
    panel.insertBefore(toolbar, panel.firstChild);
    panel.insertBefore(list, realList);

    const getReal = key => realList.querySelector('[data-layer-toggle="'+key+'"]');
    const setKey = (key, checked) => {
      const input = getReal(key);
      if(!input || input.checked === checked) return;
      input.checked = checked;
      input.dispatchEvent(new Event('change', {bubbles:true}));
    };
    const syncSummary = () => {
      const summary = $('#layerMenuSummary');
      const inputs = $$('[data-layer-toggle]', realList);
      const checked = inputs.filter(i=>i.checked).length;
      if(summary) summary.textContent = checked + ' of ' + inputs.length + ' on';
      list.querySelectorAll('.virtual-layer').forEach(row => {
        const keys = row.dataset.keys.split(',');
        const box = row.querySelector('input');
        const count = keys.filter(k => { const i=getReal(k); return i && i.checked; }).length;
        box.checked = count === keys.length;
        box.indeterminate = count > 0 && count < keys.length;
      });
    };
    virtualLayers.forEach(item => {
      const label = document.createElement('label');
      label.className = 'virtual-layer';
      label.dataset.keys = item.keys.join(',');
      const box = document.createElement('input');
      box.type = 'checkbox';
      const icon = document.createElement('span');
      icon.className = 'layer-icon ' + item.css;
      icon.innerHTML = item.icon;
      const title = document.createElement('span');
      title.className = 'layer-title';
      title.textContent = item.label;
      label.append(box, icon, title);
      box.addEventListener('change', () => { item.keys.forEach(k => setKey(k, box.checked)); syncSummary(); });
      list.appendChild(label);
    });
    selectAll.addEventListener('click', () => { $$('[data-layer-toggle]', realList).forEach(i => setKey(i.getAttribute('data-layer-toggle'), true)); syncSummary(); });
    clearAll.addEventListener('click', () => { $$('[data-layer-toggle]', realList).forEach(i => setKey(i.getAttribute('data-layer-toggle'), false)); syncSummary(); });
    realList.addEventListener('change', syncSummary);
    syncSummary();
  }

  function insertFilters(){
    if($('#filterSectionV22326')) return;
    const layersSection = $$('#sidebar .section').find(sec => /Camping layers/i.test(($('h2',sec)||{}).textContent||''));
    if(!layersSection) return;
    const sec = document.createElement('section');
    sec.id = 'filterSectionV22326';
    sec.className = 'section';
    sec.innerHTML = '<h2><span class="section-icon pin-boondocking">'+ICONS.info+'</span> Filters</h2>'+
      '<div class="filter-grid">'+
      '<label>Cost<select id="costFilterV22326"><option value="">Any cost</option><option value="free">Free</option><option value="20">$20 or less</option><option value="30">$30 or less</option></select></label>'+
      '<label>Showers<select id="showerFilterV22326"><option value="">Any</option><option value="yes">Has showers</option><option value="no">No showers / unknown</option></select></label>'+
      '<label>Access<select id="accessFilterV22326"><option value="">Any access</option><option value="2wd">2WD friendly</option><option value="hc">High clearance</option><option value="4wd">4WD noted</option></select></label>'+
      '<label>Season<select id="seasonFilterV22326"><option value="">Any season</option><option value="year">Year-round noted</option><option value="seasonal">Seasonal noted</option></select></label>'+
      '</div><div class="filter-note">Filter controls are staged for the next app-script pass; they do not change markers yet.</div>';
    layersSection.after(sec);
  }

  function createModal(title, section){
    const app = $('#app') || document.body;
    const backdrop = document.createElement('div');
    backdrop.className = 'modal-backdrop';
    backdrop.setAttribute('role','dialog');
    backdrop.setAttribute('aria-modal','true');
    const card = document.createElement('div');
    card.className = 'modal-card';
    const head = document.createElement('div');
    head.className = 'modal-head';
    const h = document.createElement('h2');
    h.textContent = title;
    const close = document.createElement('button');
    close.className = 'modal-close';
    close.type = 'button';
    close.setAttribute('aria-label','Close '+title);
    close.textContent = '×';
    head.append(h, close);
    card.append(head, section);
    backdrop.appendChild(card);
    app.appendChild(backdrop);
    const open = () => { backdrop.classList.add('open'); close.focus(); };
    const closeModal = () => backdrop.classList.remove('open');
    close.addEventListener('click', closeModal);
    backdrop.addEventListener('click', e => { if(e.target === backdrop) closeModal(); });
    document.addEventListener('keydown', e => { if(e.key === 'Escape') closeModal(); });
    return {open};
  }

  function moveSectionToModal(titleRegex, buttonText, hintText){
    const sidebarScroll = $('.sidebar-scroll');
    const section = $$('#sidebar .section').find(sec => titleRegex.test(($('h2',sec)||{}).textContent||''));
    if(!sidebarScroll || !section || section.dataset.modalized === '1') return;
    section.dataset.modalized = '1';
    const modal = createModal(buttonText.replace(/\s›$/,''), section);
    const launcher = document.createElement('section');
    launcher.className = 'section section-launch';
    const btn = document.createElement('button');
    btn.className = 'secondary launch-btn';
    btn.type = 'button';
    btn.innerHTML = '<span>'+buttonText+'</span><span aria-hidden="true">›</span>';
    launcher.appendChild(btn);
    if(hintText){
      const hint = document.createElement('div');
      hint.className = 'mini-note';
      hint.textContent = hintText;
      launcher.appendChild(hint);
    }
    const supabaseSection = $$('#sidebar .section').find(sec => /Supabase sync/i.test(($('h2',sec)||{}).textContent||''));
    if(supabaseSection && supabaseSection.nextSibling) sidebarScroll.insertBefore(launcher, supabaseSection.nextSibling);
    else sidebarScroll.appendChild(launcher);
    btn.addEventListener('click', modal.open);
  }

  function fixSupabaseRow(){
    const row = $('#showPendingLayer')?.closest('label');
    if(row) row.title = 'Show or hide Needs Verification sites on the map';
  }

  function enhance(){
    injectCss();
    setVersion();
    restyleHeader();
    removeUserNotes();
    enhanceLayerMenu();
    insertFilters();
    fixSupabaseRow();
    moveSectionToModal(/Add a site/i, 'Add a site', 'Drop a draft pin, then open this panel to enter details.');
    moveSectionToModal(/Manual site queue/i, 'Manual site queue', 'Review and copy queued manual entries.');
    const readout = $('#mapReadout');
    if(readout) readout.style.display = 'none';
  }

  if(document.readyState === 'complete') setTimeout(enhance, 80);
  else window.addEventListener('load', () => setTimeout(enhance, 80), {once:true});
})();
