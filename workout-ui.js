'use strict';
let workoutTemplate=null,workoutControls=[];
function renderWorkout(){
 const previous=$('workoutSelect').value;option($('workoutSelect'),Workout.templates,previous||'bike-banana');
 workoutTemplate=Workout.templates.find(t=>t.id===$('workoutSelect').value)||Workout.templates[0];
 const t=workoutTemplate,c=Workout.defaults(t);$('workoutWater').value=c.waterMl;$('workoutWater').min=t.water[0];$('workoutWater').max=t.water[1];
 $('workoutSource').textContent=t.source+' · Wasser: '+t.water.join('–')+' ml. Mengenbereiche starten mit der unteren Quellangabe; optional markierte Zusätze sind ausgeschaltet.';
 const rows=$('workoutIngredients');rows.replaceChildren();workoutControls=[];
 t.items.forEach((item,index)=>{
  const p=db.products.find(p=>p.id===item.productId),row=el('div',undefined,'entry');
  const check=el('input');check.type='checkbox';check.checked=c.enabled[index];check.disabled=!item.optional;
  const label=el('label');label.append(check,document.createTextNode(' '+item.name+(item.optional?' (optional)':'')));
  const input=el('input');input.type='number';input.step='any';input.min=item.min??.01;input.max=item.max??10000;input.value=c.amounts[index]??'';input.setAttribute('aria-label','Menge '+item.name);
  const unit=p?.unit||(item.productId==='master15-P009'?'ml':'g');
  row.append(label,el('p',item.min===null?'½ Herstellerportion laut Quelle – Grammmenge noch offen.':item.min+'–'+item.max+' '+unit+' laut Quelle','muted'),input);
  if(!p)row.append(el('p','Produkt noch nicht importiert.','warning'));
  if(item.explanation)row.append(el('p',item.explanation,'muted'));
  check.addEventListener('change',updateWorkout);input.addEventListener('input',updateWorkout);rows.append(row);workoutControls.push({check,input});
 });updateWorkout();
}
function workoutConfig(){return {waterMl:$('workoutWater').value.trim()===''?NaN:Number($('workoutWater').value),amounts:workoutControls.map(c=>c.input.value.toString().trim()===''?NaN:Number(c.input.value)),enabled:workoutControls.map(c=>c.check.checked)};}
function updateWorkout(){
 if(!workoutTemplate)return;const r=Workout.build(db.products,workoutTemplate,workoutConfig()),box=$('workoutResult');box.replaceChildren();
 for(const e of r.errors)box.append(el('p',e,'warning'));
 if(r.missing.length)box.append(el('p','Rezept speicherbar, Nährwerte unvollständig: '+r.missing.join(', ')+'. Fehlende Angaben bleiben unbekannt.','warning'));
 for(const n of r.notes)box.append(el('p',n,'muted'));
 box.append(el('p',specs.slice(0,5).map(([key,name,unit])=>name+': '+(r.totals[key]===null?'unbekannt':fmt(r.totals[key],2)+' '+unit)).join(' · ')));
 $('saveWorkout').disabled=storageBlocked||r.errors.length>0;return r;
}
$('workoutSelect').onchange=renderWorkout;$('workoutWater').addEventListener('input',updateWorkout);
$('saveWorkout').onclick=()=>{const r=updateWorkout();if(storageBlocked||!r||r.errors.length)return;
 const recipe={id:uid(),name:($('workoutName').value.trim()||workoutTemplate.name).slice(0,500),ingredients:r.ingredients,matrix:{templateId:workoutTemplate.id,source:workoutTemplate.source,waterMl:r.waterMl,notes:r.notes}};
 db.recipes.push(recipe);if(!save())return;rid=recipe.id;renderRecipe();alert('Shake gespeichert. Du findest ihn unter Rezepte.');
};
$('loadWorkoutPackage').onclick=async()=>{clearPreview();try{const r=await fetch('./data/pre-bike-startpaket-0.4.json');if(!r.ok)throw Error('Startpaket nicht verfügbar');preview(await r.json());document.querySelector('[data-tab="backup"]').click();}catch(e){alert(e.message);}};
renderWorkout();
