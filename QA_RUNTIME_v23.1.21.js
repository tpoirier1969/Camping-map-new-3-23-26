const fs=require('fs');
const path=require('path');
const vm=require('vm');
const root='/mnt/data/build_good_v23121/src/Camping-map-new-3-23-26-main';
const pkg='/mnt/data/v23.1.21-modern-audit-cleanup1-FULL-FIXED-FILES';
global.window=global;
global.document={ getElementById(){ return { textContent:'', }; }, title:'' };
window.CAMPING_STATE_DATA={};
function runFile(file){
  let p = file.startsWith('data/supplements/modern-audit-cleanup') ? path.join(pkg,file) : path.join(root,file);
  if(file==='data/states-manifest-v23.1.18.js') p=path.join(pkg,file);
  if(!fs.existsSync(p)) throw new Error('Missing '+file+' at '+p);
  const code=fs.readFileSync(p,'utf8');
  vm.runInThisContext(code,{filename:file});
}
runFile('data/states-manifest-v23.1.18.js');
const manifest=window.CAMPING_STATES_MANIFEST;
const affected=Object.entries(manifest).filter(([code,row])=>JSON.stringify(row).includes('modern-audit-cleanup-v23.1.21.js')).map(([code])=>code);
for(const code of affected){
  const row=manifest[code];
  const files=(Array.isArray(row.files)&&row.files.length)?row.files:(row.file?[row.file]:[]);
  for(const file of files) runFile(file);
}
function find(code,id){return (window.CAMPING_STATE_DATA[code]||[]).find(s=>String(s.id)===id)}
const checks=[
  ['AR','s226','pending'],
  ['AR','s221','modern'],
  ['AZ','s756','boondocking'],
  ['AZ','s213','boat-backpack'],
  ['CA','s271','info'],
  ['CO','s711','pending'],
  ['MI','s49','federal'], // still federal but subtype rustic -> layerKey rustic
  ['MI','s298','state'],
  ['NE','s15','pending'],
  ['UT','s856','pending'],
  ['WY','s36','state']
];
const report=[];
for(const [code,id,expect] of checks){
  const s=find(code,id);
  report.push({code,id,found:!!s,layer:s&&s.layer,subtype:s&&s.subtype,category:s&&s.categoryLabel,expect});
}
const removed=window.CAMPING_MODERN_AUDIT_REMOVED||[];
report.push({removedCount:removed.length,removed:removed.map(s=>`${s.stateCode||s.state}:${s.id}:${s.name}`).sort()});
const totals={};
for(const code of affected){
  const list=window.CAMPING_STATE_DATA[code]||[];
  totals[code]={total:list.length, byLayer:{}};
  for(const s of list){ totals[code].byLayer[s.layer]=(totals[code].byLayer[s.layer]||0)+1; }
}
console.log(JSON.stringify({affected, report, totals},null,2));
