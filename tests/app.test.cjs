const fs=require('fs'),vm=require('vm'),assert=require('node:assert/strict');
const original=require('../data/original-backup.json');
const key='sporternaehrung-shake-builder-v01';
function session(raw){
 const elements=new Map(),data=new Map(raw===undefined?[]:[[key,raw]]),alerts=[];
 const make=()=>({value:'',dataset:{},files:[],children:[],classList:{toggle(){}},append(...c){this.children.push(...c);},prepend(...c){this.children.unshift(...c);},replaceChildren(...c){this.children=c;},addEventListener(){},setAttribute(){},querySelectorAll(){return [];},click(){}});
 const get=id=>{if(!elements.has(id))elements.set(id,make());return elements.get(id);};
 let fail=null;
 const context={structuredClone,console,Blob,URL,setTimeout(){},alert:x=>alerts.push(x),confirm:()=>true,prompt(){},navigator:{},location:{protocol:'https:',origin:'https://example.org'},window:{addEventListener(){}},document:{getElementById:get,createElement:make,querySelectorAll:()=>[]},localStorage:{getItem:k=>data.get(k)??null,setItem(k,v){if(k===fail)throw Error('quota');data.set(k,v);}}};
 vm.createContext(context);vm.runInContext(fs.readFileSync('import-core.js','utf8'),context);vm.runInContext(fs.readFileSync('recovery-core.js','utf8'),context);vm.runInContext(fs.readFileSync('app.js','utf8'),context);
 return {context,get,data,alerts,fail:k=>fail=k,run:s=>vm.runInContext(s,context)};
}
const local=structuredClone(original);local.products[0].values.k=99;
const raw=JSON.stringify(local),s=session(raw);
s.run('preview('+JSON.stringify(original)+')');
assert.equal(s.data.get(key),raw,'preview must not write');
s.fail(key+'-pre-import');s.get('applyImport').onclick();assert.equal(s.data.get(key),raw,'failed backup must abort');
s.fail(key);s.get('applyImport').onclick();assert.equal(s.data.get(key),raw,'failed commit must preserve data');
s.fail(null);s.get('applyImport').onclick();assert.equal(JSON.parse(s.data.get(key)).products.length,15);assert.equal(JSON.parse(s.data.get(key+'-pre-import')).products[0].values.k,99);
const changed=session(raw);changed.run('preview('+JSON.stringify(original)+')');changed.data.set(key,JSON.stringify(original));changed.get('applyImport').onclick();assert.equal(changed.data.get(key),JSON.stringify(original));
const corrupt=session('{broken');corrupt.run('save()');assert.equal(corrupt.data.get(key),'{broken');
console.log('App-Ablauftests bestanden: Vorschau, Backupfehler, Speicherfehler, Übernahme, veraltete Vorschau, beschädigter Speicher.');

module.exports={session};
