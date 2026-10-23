'use strict';
(function(root){
const item=(productId,name,min,max=min,optional=false,explanation='')=>({productId,name,min,max,optional,explanation});
const preSource='Pre-Workout-Master-Matrix.docx · Titel im Dokument: Pre-Workout-Master-Matrix 1.4';
const bikeSource='Bike-to-Work-Matrix 1.4.docx';
const carb=(min,max=min)=>item('master15-P024','AlpenPower Cluster Dextrin / HBCD',min,max);
const minaid=n=>item('master15-P003','MINAID Salty Raw',n);
const cit=(min,max=min)=>item('workout-citrullin','Citrullin (Produkt noch zu belegen)',min,max,true,'In der Endfassung der Quelle optional. Produktzusammensetzung noch offen; Citrullin und Citrullin-Malat nicht gleichsetzen.');
const arg=(min,max=min)=>item('workout-arginin','Vorhandenes Arginin (Produkt noch zu belegen)',min,max,true,'Quelle nennt Pulvermenge; genaue Produktidentität fehlt.');
const bulk=()=>item('workout-bulk-plus','Bulk Plus',null,null,false,'Quelle: ½ Herstellerportion. Grammgewicht einer ganzen Portion fehlt; hier die belegte Grammmenge für ½ Portion eintragen. Nicht mit Bulk Elektrolytpulver P001 gleichsetzen.');
const templates=[
 {id:'pre-easy',name:'PRE-SWIM LOCKER',group:'Pre-Workout',source:preSource,water:[400,500],items:[carb(0,15),item('master15-P003','MINAID Salty Raw',0,.45)],notes:['Quelle Abschnitt 15: 0–15 g HBCD und 0–0,45 g MINAID; die untere Grenze ist als Auswahl voreingestellt.']},
 {id:'pre-sensitive',name:'PRE-SWIM SENSITIVE',group:'Pre-Workout',source:preSource,water:[500,500],items:[carb(15),minaid(.45)],notes:['Ohne Citrullin und Arginin. Nitrat ist laut Quelle ein separates optionales Modul.']},
 {id:'pre-standard',name:'PRE-SWIM STANDARD 1.4',group:'Pre-Workout',source:preSource,water:[500,500],items:[carb(20),minaid(.9),cit(6)],notes:['Quelle: Drink 45–60 Minuten vorher. Separates Nitratmodul 2–3 Stunden vorher; kein Nitratprodukt im Drink ergänzt.']},
 {id:'pre-hard',name:'PRE-SWIM HARD',group:'Pre-Workout',source:preSource,water:[500,600],items:[carb(30),minaid(.9),cit(6)],notes:['Quelle nennt separat 400–500 mg Nitrat, 2–3 Stunden vorher. Ohne deklarierten Nitratgehalt wird keine Produktmenge errechnet.']},
 {id:'pre-strength',name:'PRE-STRENGTH STANDARD',group:'Pre-Workout',source:preSource,water:[500,500],items:[carb(25),bulk(),cit(6,8),arg(2,3)],notes:['Citrullin/Arginin sind gemäß Endfassung optionale Zusätze. Bulk-Plus-Menge muss vor dem Speichern in Gramm belegt werden.']},
 {id:'pre-volume',name:'PRE-STRENGTH VOLUME',group:'Pre-Workout',source:preSource,water:[500,600],items:[carb(30,35),bulk(),cit(8),arg(2,3)],notes:['Mengenbereich 30–35 g HBCD. Bulk-Plus-Menge muss vor dem Speichern in Gramm belegt werden.']},
 {id:'pre-arginin',name:'ARGININ PRE-WORKOUT',group:'Pre-Workout',source:preSource,water:[500,500],items:[carb(20,25),{...arg(3,4),optional:false},minaid(.9)],notes:['MINAID-Variante aus Abschnitt 11. Alternative ½ Portion Bulk Plus wird nicht als grammgleicher Ersatz verwendet.']}
];
const base=[item('master15-P009','Alnatura Rote-Bete-Direktsaft',250),item('workout-ja-quark','ja! Magerquark',100),item('master15-P013','vom Achterhof Bio Protein Mix Rote Beeren',15),item('workout-salz','Salz',.5)];
const variants=[
 ['banana','Classic Banana',[item('banana','Banane',50)],[100,150]],
 ['blueberry','Blueberry Beet',[item('banana','Banane',25),item('workout-heidelbeere','Heidelbeeren',50)],[100,150]],
 ['cherry','Cherry Beet',[item('recovery29-F2','Sauerkirschen',75)],[100,150]],
 ['strawberry','Strawberry Light',[item('recovery29-F5','Erdbeeren',100)],[100,150]],
 ['pineapple','Pineapple Fresh',[item('workout-ananas','Ananas',75)],[150,200]],
 ['mango','Mango Beet',[item('recovery29-F4','Mango',60)],[100,150]],
 ['watermelon','Watermelon Fresh',[item('workout-wassermelone','Wassermelone',125)],[50,100]]
];
for(const [id,name,fruit,water] of variants)templates.push({id:'bike-'+id,name:'BIKE – '+name,group:'Bike-to-Work',source:bikeSource,water,items:[...base,...fruit,item('master15-P023','Bulk Maltodextrin – optionales Performance-Modul',10,20,true)],notes:['Quelle: Pre-Ride-Shake etwa 30 Minuten vor 17 km Radfahrt. Inulin, Baobab und Samen gehören hier nicht zur festen Basis.','Die Quelle nennt geschätzte Gesamtnährwerte, aber keine vollständigen Produktwerte. Diese Schätzungen werden nicht als berechnete Ergebnisse verwendet.',...(id==='mango'?['Quelle nennt 40–50 g Mango als zusätzliche Testvariante; hier ist das Standardrezept mit 60 g hinterlegt.']:[])]});
function defaults(template){return {waterMl:template.water[0],amounts:template.items.map(i=>i.min),enabled:template.items.map(i=>!i.optional)};}
function build(products,t,c){
 const errors=[],ingredients=[],notes=[...t.notes,'Quelle: '+t.source,'Bei Mengenbereichen wurde die gewählte Menge gespeichert; Wasser wird separat angegeben.'];
 if(typeof c.waterMl!=='number'||!Number.isFinite(c.waterMl)||c.waterMl<t.water[0]||c.waterMl>t.water[1])errors.push('Wasser: '+t.water.join('–')+' ml auswählen.');
 t.items.forEach((item,index)=>{
  if(item.optional&&!c.enabled[index])return;
  const n=c.amounts[index];
  if(typeof n!=='number'||!Number.isFinite(n)||n<0||(item.min!==null&&(n<item.min||n>item.max))||(item.min===null&&(n<=0||n>10000))){errors.push(item.name+': '+(item.min===null?'belegte Grammmenge fehlt.':item.min+'–'+item.max+' g/ml auswählen.'));return;}
  if(n===0)return;
  const p=products.find(p=>p.id===item.productId);if(!p){errors.push(item.name+': Produkt fehlt. Bitte das Startpaket über Vorschau importieren.');return;}
  ingredients.push({productId:p.id,amount:n});
  if(item.explanation)notes.push(item.explanation);
 });
 const totals={};for(const key of ['k','p','c','f','b']){let sum=0,known=true;for(const i of ingredients){const v=products.find(p=>p.id===i.productId)?.values[key];if(typeof v!=='number'||!Number.isFinite(v))known=false;else sum+=v*i.amount/100;}totals[key]=known?sum:null;}
 const missing=ingredients.filter(i=>['k','p','c','f','b'].some(k=>typeof products.find(p=>p.id===i.productId)?.values[k]!=='number')).map(i=>products.find(p=>p.id===i.productId).name);
 return {ingredients,errors,notes,totals,missing,waterMl:c.waterMl};
}
root.Workout={templates,defaults,build};if(typeof module!=='undefined')module.exports=root.Workout;
})(globalThis);
