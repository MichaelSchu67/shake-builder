'use strict';
let recoveryResult=null;
const recoveryIds=['recoveryStage','recoveryBasis','recoveryProtein','recoveryProteinTarget','recoveryFruit','recoveryFruitAmount','recoveryOats','recoveryOatsAmount','recoveryMalto','recoveryStrengthMalto','recoveryWater','recoveryE','recoveryElectrolyte','recoveryCR','recoveryCreatine','recoveryCreatineTarget','recoveryPP','recoveryPPProduct','recoveryPPAmount'];
function recoveryOptions(id,products,preferred){const select=$(id),old=select.value;option(select,products,old);const empty=el('option','Bitte Produkt wählen');empty.value='';select.prepend(empty);select.value=products.some(p=>p.id===old)?old:products.some(p=>p.id===preferred)?preferred:'';}
function renderRecovery(){
 const mass=Recovery.sorted(db.products.filter(p=>p.unit==='g'));
 for(const [id,pref] of [['recoveryProtein','master15-P012'],['recoveryFruit','recovery29-F2'],['recoveryOats','master15-P011'],['recoveryMalto','master15-P023'],['recoveryElectrolyte','master15-P001'],['recoveryCreatine','master15-P014']])recoveryOptions(id,mass,pref);
 recoveryOptions('recoveryPPProduct',Recovery.sorted(db.products));updateRecovery();
}
function recoveryConfig(){const num=id=>$(id).value.trim()===''?NaN:Number($(id).value);return {stage:$('recoveryStage').value,basis:$('recoveryBasis').value,proteinId:$('recoveryProtein').value,proteinTarget:num('recoveryProteinTarget'),fruitId:$('recoveryFruit').value,fruitAmount:num('recoveryFruitAmount'),oatsId:$('recoveryOats').value,oatsAmount:num('recoveryOatsAmount'),maltoId:$('recoveryMalto').value,strengthMalto:num('recoveryStrengthMalto'),waterMl:num('recoveryWater'),electrolytes:$('recoveryE').value,electrolyteId:$('recoveryElectrolyte').value,creatine:$('recoveryCR').checked,creatineId:$('recoveryCreatine').value,creatineTarget:num('recoveryCreatineTarget'),pp:$('recoveryPP').value,ppId:$('recoveryPPProduct').value,ppAmount:num('recoveryPPAmount')};}
function updateRecovery(){
 const c=recoveryConfig(),s=Recovery.stages[c.stage];if(!s)return;
 $('recoveryGuidance').textContent='Matrix: '+s.fruit.join('–')+' g Frucht · '+s.water.join('–')+' ml Wasser'+(s.carbs?' · '+s.carbs+' g Gesamt-KH':'')+(s.oats?' · '+s.oats.join('–')+' g Hafer':'')+'. P1/P2/P3: 33–35 g Protein aus Pulver; P4: 40 g Clear Whey.';
 $('oatsFields').hidden=!s.oats;$('strengthFields').hidden=c.stage!=='R2';$('maltoFields').hidden=!s.carbs&&c.stage!=='R2';$('electrolyteFields').hidden=c.electrolytes==='E0';$('creatineFields').hidden=!c.creatine;$('ppFields').hidden=!['PP2','PP3'].includes(c.pp);
 const p=db.products.find(p=>p.id===c.ppId);$('ppUnit').textContent=p?'Menge ('+p.unit+')':'Menge (g/ml des gewählten Produkts)';
 recoveryResult=Recovery.build(db.products,c);const result=$('recoveryResult');result.replaceChildren();
 for(const error of recoveryResult.errors)result.append(el('p',error,'warning'));
 for(const i of recoveryResult.ingredients){const p=db.products.find(p=>p.id===i.productId);result.append(el('div',(p?.name||'?')+': '+fmt(i.amount,2)+' '+p.unit,'entry'));}
 result.append(el('p','Wasser: '+(Number.isFinite(c.waterMl)?fmt(c.waterMl,0):'—')+' ml'));
 result.append(el('p','Protein: '+(recoveryResult.totals.p===null?'unbekannt':fmt(recoveryResult.totals.p,2)+' g')+' · Kohlenhydrate: '+(recoveryResult.totals.c===null?'unbekannt':fmt(recoveryResult.totals.c,2)+' g')));
 for(const note of recoveryResult.notes)result.append(el('p',note,'muted'));
 $('saveRecovery').disabled=storageBlocked||recoveryResult.errors.length>0;
}
function stageDefaults(){const s=Recovery.stages[$('recoveryStage').value];$('recoveryWater').value=s.water[0];$('recoveryFruitAmount').value=s.fruit[1];if(s.oats)$('recoveryOatsAmount').value=s.oats[1];updateRecovery();}
for(const id of recoveryIds)$(id).addEventListener('input',updateRecovery);
$('recoveryStage').addEventListener('change',stageDefaults);
$('recoveryBasis').addEventListener('change',()=>{const id={P1:'',P2:'master15-P020',P3:'master15-P013',P4:'master15-P012'}[$('recoveryBasis').value];$('recoveryProtein').value=db.products.some(p=>p.id===id)?id:'';updateRecovery();});
$('saveRecovery').onclick=()=>{
 updateRecovery();if(storageBlocked||recoveryResult.errors.length)return;
 const r={id:uid(),name:($('recoveryName').value.trim()||recoveryResult.name).slice(0,500),ingredients:structuredClone(recoveryResult.ingredients),recovery:{version:'2.9',waterMl:recoveryResult.waterMl,config:recoveryConfig(),notes:recoveryResult.notes}};
 db.recipes.push(r);if(!save())return;rid=r.id;renderRecipe();alert('Recovery-Rezept gespeichert. Du findest es unter Rezepte.');
};
$('loadMasterPackage').onclick=async()=>{clearPreview();try{const response=await fetch('./data/recovery-startpaket-0.3.json');if(!response.ok)throw Error('Datenpaket nicht verfügbar');preview(await response.json());document.querySelector('[data-tab="backup"]').click();}catch(e){alert(e.message);}};
renderRecovery();
