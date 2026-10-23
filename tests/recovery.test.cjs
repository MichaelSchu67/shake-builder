const assert=require('node:assert/strict'),{build,stages,sorted}=require('../recovery-core');
const products=require('../data/recovery-startpaket-0.3.json').products;
const base={stage:'R3',basis:'P4',proteinId:'master15-P012',proteinTarget:34,fruitId:'recovery29-F2',fruitAmount:100,oatsId:'master15-P011',oatsAmount:30,maltoId:'master15-P023',strengthMalto:0,waterMl:500,electrolytes:'E0',electrolyteId:'master15-P001',creatine:false,creatineId:'master15-P014',creatineTarget:3,pp:'PP0',ppAmount:0};
const r3=build(products,base);assert.deepEqual(r3.errors,[]);assert.equal(r3.powder,40);assert(Math.abs(r3.malto-(50-.56-9.8)/.95)<1e-10);assert(Math.abs(r3.totals.c-50)<1e-10);assert.equal(r3.totals.p,null,'unknown fruit protein must stay unknown');
for(const [stage,s] of Object.entries(stages)){
 const c={...base,stage,fruitAmount:s.fruit[1],waterMl:s.water[0],oatsAmount:s.oats?.[1]??30};const result=build(products,c);assert.deepEqual(result.errors,[],stage);if(s.carbs)assert(Math.abs(result.totals.c-s.carbs)<1e-9,stage);
}
const p2=build(products,{...base,basis:'P2',proteinId:'master15-P020'});assert(Math.abs(p2.powder-34/.812)<1e-10);
assert(build(products,{...base,proteinId:''}).errors.length);
const sparse=structuredClone(products);sparse.find(p=>p.id==='master15-P012').values.c=null;assert(build(sparse,base).errors.some(e=>e.includes('KH-Ziel nicht berechenbar')));
assert(build(products,{...base,fruitAmount:NaN}).errors.length);
assert(build(products,{...base,waterMl:0}).errors.length);
assert(build(products,{...base,stage:'R5',basis:'P3',waterMl:700,fruitAmount:50}).errors.length);
assert(build(products,{...base,pp:'PP1',fruitId:'recovery29-F4'}).errors.length);
assert.deepEqual(build(products,{...base,pp:'PP1'}).errors,[]);
assert(build(products,{...base,stage:'R6',pp:'PP1',fruitAmount:50,waterMl:400}).errors.length);
const e=build(products,{...base,stage:'R0',waterMl:400,electrolytes:'E2'});assert(e.ingredients.some(i=>i.productId==='master15-P001'&&i.amount===1));assert.deepEqual(e.errors,[]);
assert(build(products,{...base,electrolytes:'E2'}).errors.some(e=>e.includes('Kohlenhydrate fehlen')));
const cr=build(products,{...base,stage:'R0',waterMl:400,creatine:true,creatineTarget:5});assert.deepEqual(cr.errors,[]);assert(Math.abs(cr.ingredients.find(i=>i.productId==='master15-P014').amount-5*3.4/3)<1e-10);
const juice={id:'juice',name:'Saft',unit:'ml',values:{c:10,p:0,k:40,f:0,b:0}};
const pp=build([...products,juice],{...base,pp:'PP2',ppId:'juice',ppAmount:50});assert.deepEqual(pp.errors,[]);assert(Math.abs(pp.totals.c-50)<1e-9);assert(pp.malto<r3.malto);
assert(build([...products,juice],{...base,pp:'PP2',ppId:'juice',ppAmount:1000}).errors.some(e=>e.includes('überschreiten')));
const names=[{id:'1',name:'Zitrone'},{id:'2',name:'Äpfel'},{id:'3',name:'Banane'}],before=JSON.stringify(names);assert.deepEqual(sorted(names).map(p=>p.name),['Äpfel','Banane','Zitrone']);assert.equal(JSON.stringify(names),before);
const {validate,merge}=require('../import-core');const recipe={id:'test',name:'Recovery',ingredients:r3.ingredients,recovery:{version:'2.9',waterMl:500,notes:r3.notes,config:base}};validate({schema:1,products,recipes:[recipe]});const changed=structuredClone(recipe);changed.recovery.waterMl=550;assert.equal(merge({products,recipes:[recipe]},{schema:1,products,recipes:[changed]}).result.recipes.length,2);
console.log('Recoverytests bestanden: R0–R6, Pulver, KH-Ziele, fehlende Werte, E/CR/PP, Grenzen, Sortierung, Metadaten.');
