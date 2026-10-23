'use strict';
(function(root){
const keys=['k','p','c','f','b','ca','mg','pot','fe','zn','iod','b12','d','vc','ala'];
function validate(d, legacy=false){
 if(!d || (d.schema!==1 && !(legacy && d.schema===undefined))) throw Error('Schema 1 erforderlich.');
 if(!Array.isArray(d.products)||!Array.isArray(d.recipes)||d.products.length>5000||d.recipes.length>5000) throw Error('Ungültige Listen oder zu viele Einträge.');
 const ids=new Set(), rids=new Set();
 const text=x=>typeof x==='string'&&x.trim().length>0&&x.length<=500;
 for(const p of d.products){
  if(!p||!text(p.id)||!text(p.name)||ids.has(p.id)||!['g','ml'].includes(p.unit)||!p.values||Array.isArray(p.values)||typeof p.values!=='object')throw Error('Ungültiges Produkt oder doppelte Produkt-ID.');
  ids.add(p.id);
  for(const [k,v] of Object.entries(p.values))if(!keys.includes(k)||(v!==null&&(typeof v!=='number'||!Number.isFinite(v)||v<0)))throw Error('Ungültiger Nährwert: '+k);
 }
 for(const r of d.recipes){
  if(!r||!text(r.id)||!text(r.name)||rids.has(r.id)||!Array.isArray(r.ingredients)||r.ingredients.length>500)throw Error('Ungültiges Rezept oder doppelte Rezept-ID.');
  rids.add(r.id);
  for(const i of r.ingredients)if(!i||!ids.has(i.productId)||typeof i.amount!=='number'||!Number.isFinite(i.amount)||i.amount<0)throw Error('Fehlender Produktverweis oder ungültige Menge in '+r.name);
  if(r.recovery!==undefined){const m=r.recovery;if(!m||m.version!=='2.9'||typeof m.waterMl!=='number'||!Number.isFinite(m.waterMl)||m.waterMl<0||m.waterMl>10000||!Array.isArray(m.notes)||m.notes.length>100||!m.notes.every(n=>typeof n==='string'&&n.length<=5000))throw Error('Ungültige Recovery-Rezeptnotizen.');}
 }
 return d;
}
const productBody=p=>JSON.stringify([p.name,p.unit,keys.map(k=>p.values[k]??null)]);
const recipeBody=r=>JSON.stringify([r.name,r.ingredients,r.recovery??null]);
function merge(existing,incoming){
 validate(incoming); validate({...existing,schema:1});
 const result=structuredClone(existing), mapping=new Map(), rows=[];
 function insert(items,item,body,type){
  const same=items.find(x=>x.id===item.id);
  if(same&&body(same)===body(item)){rows.push({type,name:item.name,action:'identisch – übersprungen',id:item.id});return same.id;}
  let id=item.id;
  if(same){let n=1;while(items.some(x=>x.id===id)|| (type==='Produkt'?incoming.products:incoming.recipes).some(x=>x.id===id)){id=item.id+'-import-'+n++;}}
  // A repeated import reuses an identical previous conflict copy.
  const previous=items.find(x=>x.id.startsWith(item.id+'-import-')&&body(x)===body(item));
  if(previous){rows.push({type,name:item.name,action:'bereits importiert – übersprungen',id:previous.id});return previous.id;}
  items.push({...structuredClone(item),id});rows.push({type,name:item.name,action:same?'ID-Konflikt – als Kopie ergänzen':'ergänzen',id});return id;
 }
 for(const p of incoming.products)mapping.set(p.id,insert(result.products,p,productBody,'Produkt'));
 for(const r of incoming.recipes){const copy=structuredClone(r);copy.ingredients=copy.ingredients.map(i=>({...i,productId:mapping.get(i.productId)}));insert(result.recipes,copy,recipeBody,'Rezept');}
 validate({...result,schema:1});return {result,rows};
}
root.ShakeImport={validate,merge};
if(typeof module!=='undefined')module.exports=root.ShakeImport;
})(globalThis);
