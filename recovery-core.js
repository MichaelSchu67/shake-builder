'use strict';
(function(root){
const stages={R0:{name:'Basic',water:[400,500],fruit:[100,100]},R1:{name:'Balance',water:[450,600],fruit:[100,100],oats:[25,30]},R2:{name:'Strength',water:[450,600],fruit:[100,100],oats:[25,25]},R3:{name:'Performance',water:[500,600],fruit:[100,100],carbs:50},R4:{name:'Endurance',water:[600,750],fruit:[100,100],carbs:70},R5:{name:'Rapid',water:[700,800],fruit:[0,50],carbs:85},R6:{name:'Late',water:[400,500],fruit:[0,50],carbs:25}};
const sorted=items=>[...items].sort((a,b)=>a.name.localeCompare(b.name,'de',{sensitivity:'base',numeric:true})||a.id.localeCompare(b.id));
function build(products,c){
 const stage=stages[c.stage];if(!stage)throw Error('Recovery-Stufe fehlt.');
 const ingredients=[],errors=[],notes=[];
 const get=(id,label)=>{const p=products.find(p=>p.id===id);if(!p||p.unit!=='g'){errors.push(label+': Produkt mit Einheit g auswählen.');return null;}return p;};
 const quantity=(v,label,min=0,max=10000)=>{if(typeof v!=='number'||!Number.isFinite(v)||v<min||v>max){errors.push(label+': gültige Menge zwischen '+min+' und '+max+' eingeben.');return false;}return true;};
 const add=(p,n)=>{if(p&&n>0&&Number.isFinite(n)){const found=ingredients.find(i=>i.productId===p.id);if(found)found.amount+=n;else ingredients.push({productId:p.id,amount:n});}};
 if(!['P1','P2','P3','P4'].includes(c.basis))errors.push('Proteinbasis fehlt.');
 if(['R5','R6'].includes(c.stage)&&!['P1','P4'].includes(c.basis))errors.push('Rapid/Late sieht P1 oder P4 vor.');
 const protein=get(c.proteinId,'Proteinbasis');let powder=0;
 const proteinValue=protein?.values?.p;
 if(typeof proteinValue!=='number'||!Number.isFinite(proteinValue)||proteinValue<=0)errors.push('Proteingehalt der Proteinbasis fehlt.');
 else if(c.basis==='P4'){
  powder=40;const total=proteinValue*.4;notes.push('40 g Clear Whey liefern '+total.toFixed(2)+' g Protein aus dem Pulver.');
  if(total<33||total>35)notes.push('Hinweis: Dieses Produkt erreicht mit 40 g nicht den Matrixbereich 33–35 g Protein.');
 }else if(quantity(c.proteinTarget,'Proteinziel',33,35))powder=c.proteinTarget*100/proteinValue;
 add(protein,powder);
 if(quantity(c.fruitAmount,'Fruchtmenge',...stage.fruit)&&c.fruitAmount>0)add(get(c.fruitId,'Frucht'),c.fruitAmount);
 if(stage.oats&&quantity(c.oatsAmount,'Hafermenge',...stage.oats))add(get(c.oatsId,'Haferpulver'),c.oatsAmount);
 if(!quantity(c.waterMl,'Wasser',...stage.water))notes.push('Wassermenge gemäß gewählter Matrixstufe einstellen.');
 if(!['E0','E1','E2','E3'].includes(c.electrolytes))errors.push('Elektrolytmodul auswählen.');
 if(c.electrolytes!=='E0'){
  const e=get(c.electrolyteId,'Elektrolyte'),dose={E1:.5,E2:1,E3:1.25}[c.electrolytes];
  if(e?.source?.productRow!==2||!e?.id.startsWith('master15-P001'))errors.push('E1–E3 sind nur für Bulk Elektrolytpulver aus der Master-Datenbank hinterlegt.');
  else{add(e,dose);notes.push(c.electrolytes+': '+dose+' g Bulk, rechnerisch '+(dose*517).toFixed(1)+' mg Natrium laut Quelle.');}
 }
 if(c.creatine){
  const cr=get(c.creatineId,'Kreatin');
  if(cr?.source?.productRow!==15||!cr?.id.startsWith('master15-P014'))errors.push('Kreatin-Umrechnung ist nur für AlpenPower Pur Creatin hinterlegt.');
  else if(quantity(c.creatineTarget,'Kreatinmenge',3,5)){const dose=c.creatineTarget*3.4/3;add(cr,dose);notes.push('Kreatin: '+dose.toFixed(2)+' g Pulver für '+c.creatineTarget+' g Kreatin laut Quelle.');}
 }
 if(!['PP0','PP1','PP2','PP3'].includes(c.pp))errors.push('Polyphenolmodul auswählen.');
 if(c.pp==='PP1'){
  const fruit=products.find(p=>p.id===c.fruitId);
  if(c.fruitAmount!==100||!fruit||!/sauerkirsch|wildheidelbeer/i.test(fruit.name))errors.push('PP1 erfordert 100 g Sauerkirsche oder Wildheidelbeere als gewählte Frucht.');
  notes.push('PP1: die gewählte Frucht zählt bereits zur Rezeptmenge.');
 }
 if(c.pp==='PP2'||c.pp==='PP3'){
  const p=products.find(p=>p.id===c.ppId);
  if(!p)errors.push('Polyphenolzusatz: Produkt auswählen.');
  if(quantity(c.ppAmount,'Polyphenolzusatz',.01,10000))add(p,c.ppAmount);
  notes.push('Polyphenolzusatz: individuell gewählte Produktmenge; Matrix nennt keine feste Dosierung.');
 }
 // Unknown carbohydrate content in any active ingredient must block target calculations.
 let knownCarbs=0,unknown=[];
 for(const i of ingredients){const p=products.find(p=>p.id===i.productId),v=p?.values?.c;if(typeof v!=='number'||!Number.isFinite(v))unknown.push(p?.name||i.productId);else knownCarbs+=v*i.amount/100;}
 let malto=0;
 if(stage.carbs){
  if(unknown.length)errors.push('KH-Ziel nicht berechenbar: Kohlenhydrate fehlen für '+unknown.join(', ')+'.');
  else if(knownCarbs>stage.carbs+1e-9)errors.push('Zutaten überschreiten das KH-Ziel bereits. Mengen oder Produkte anpassen.');
  else if(stage.carbs-knownCarbs>1e-9){const p=get(c.maltoId,'Maltodextrin'),v=p?.values?.c;if(typeof v!=='number'||v<=0||!Number.isFinite(v))errors.push('Kohlenhydratgehalt von Maltodextrin fehlt.');else{malto=(stage.carbs-knownCarbs)*100/v;add(p,malto);}}
 }else if(c.stage==='R2'&&quantity(c.strengthMalto,'Maltodextrin',0,15)&&c.strengthMalto>0){malto=c.strengthMalto;add(get(c.maltoId,'Maltodextrin'),malto);}
 const totals={};for(const key of ['k','p','c','f','b']){let sum=0,known=true;for(const i of ingredients){const v=products.find(p=>p.id===i.productId)?.values?.[key];if(typeof v!=='number'||!Number.isFinite(v))known=false;else sum+=v*i.amount/100;}totals[key]=known?sum:null;}
 notes.push('Quelle: Recovery-Master-Matrix 2.9. Produktwerte gemäß gewählten Datensätzen; fehlende Werte bleiben unbekannt. Wasser wird separat gespeichert.');
 return {ingredients,errors:[...new Set(errors)],notes,totals,malto,powder,waterMl:c.waterMl,target:stage.carbs??null,name:c.stage+' – '+stage.name+' · '+(protein?.name||'Proteinbasis')};
}
root.Recovery={stages,sorted,build};if(typeof module!=='undefined')module.exports=root.Recovery;
})(globalThis);
