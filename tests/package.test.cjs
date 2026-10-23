const fs=require('fs'),assert=require('node:assert/strict'),vm=require('vm');
for(const f of ['app.js','import-core.js','recovery-core.js','recovery-ui.js','sw.js'])new vm.Script(fs.readFileSync(f,'utf8'));
const html=fs.readFileSync('index.html','utf8'),ids=[...html.matchAll(/id="([^"]+)"/g)].map(m=>m[1]);
assert.equal(ids.length,new Set(ids).size);
for(const m of html.matchAll(/(?:src|href)="([^"]+)"/g))if(!m[1].startsWith('http'))assert(fs.existsSync(m[1]),m[1]);
const context={self:{addEventListener(){}},location:{origin:'http://localhost'}};vm.createContext(context);vm.runInContext(fs.readFileSync('sw.js','utf8')+';globalThis.files=FILES',context);
for(const file of context.files)assert(fs.existsSync(file),file);
console.log('Syntax, eindeutige Felder, Dateiverweise und Offline-Dateiliste geprüft.');
