const assert=require('node:assert/strict');
const {templates,defaults,build}=require('../workout-core'),{validate,merge}=require('../import-core');
const pack=require('../data/pre-bike-startpaket-0.4.json'),original=require('../data/original-backup.json');
assert.equal(templates.length,14);assert.equal(pack.recipes.length,12);validate(pack);
const old=JSON.stringify(original),combined=merge(original,pack).result;assert.equal(JSON.stringify(original),old);assert.deepEqual(combined.products.slice(0,14),original.products);assert.deepEqual(merge(combined,pack).result,combined);
for(const t of templates){const result=build(pack.products,t,defaults(t));if(['pre-strength','pre-volume'].includes(t.id))assert(result.errors.some(e=>e.includes('Grammmenge fehlt')));else assert.deepEqual(result.errors,[],t.id);}
const banana=templates.find(t=>t.id==='bike-banana'),b=build(pack.products,banana,defaults(banana));
assert.equal(b.ingredients.find(i=>i.productId==='master15-P009').amount,250);assert.equal(b.ingredients.find(i=>i.productId==='workout-ja-quark').amount,100);assert.equal(b.ingredients.find(i=>i.productId==='master15-P013').amount,15);assert.equal(b.ingredients.find(i=>i.productId==='banana').amount,50);assert.equal(b.totals.k,null);assert(!b.ingredients.some(i=>i.productId==='master15-P023'));
const c=defaults(banana);c.enabled[c.enabled.length-1]=true;c.amounts[c.amounts.length-1]=20;assert.equal(build(pack.products,banana,c).ingredients.find(i=>i.productId==='master15-P023').amount,20);
const strength=templates.find(t=>t.id==='pre-strength'),sc=defaults(strength);sc.amounts[1]=1;assert.deepEqual(build(pack.products,strength,sc).errors,[]);assert(!build(pack.products,strength,sc).ingredients.some(i=>i.productId==='master15-P001'));
const invalid=defaults(banana);invalid.amounts[0]=NaN;assert(build(pack.products,banana,invalid).errors.length);invalid.amounts[0]=250;invalid.waterMl=0;assert(build(pack.products,banana,invalid).errors.length);
const sensitive=templates.find(t=>t.id==='pre-sensitive');assert.equal(build(pack.products,sensitive,defaults(sensitive)).ingredients.find(i=>i.productId==='master15-P003').amount,.45);
const noProduct=pack.products.filter(p=>p.id!=='master15-P009');assert(build(noProduct,banana,defaults(banana)).errors.some(e=>e.includes('Produkt fehlt')));
const changed=structuredClone(pack);changed.recipes[0].matrix.waterMl+=1;assert.equal(merge(pack,changed).result.recipes.length,pack.recipes.length+1);
const corrupt=structuredClone(pack);corrupt.recipes[0].matrix.notes={};assert.throws(()=>validate(corrupt));
console.log('Pre-/Bike-Tests bestanden: 14 Originalvorlagen, 12 Startrezepte, Mengen, fehlende Portionen, unbekannte Werte, Import und Wiederholung.');
