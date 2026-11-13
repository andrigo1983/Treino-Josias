'use strict';
const moves = {
 hip:['Círculos de quadril','Standing_Hip_Circles','Em pé, faça círculos pequenos e controlados nos dois sentidos.'],
 arm:['Círculos de ombro','Arm_Circles','Abra os braços e amplie os círculos aos poucos, nos dois sentidos.'],
 walk:['Caminhada inclinada','Walking_Treadmill','Comece com 5 km/h e 1–3% de inclinação. Aproxime-se de 6 km/h se conseguir conversar.'],
 leg:['Leg press','Leg_Press','Mantenha os calcanhares e a pelve apoiados. Ajuste o banco à sua altura.'],
 chin:['Barra fixa supinada','Chin-Up','Palmas para você. Use máquina assistida ou elástico para completar a faixa sem balanço.'],
 bench:['Supino reto com halteres','Dumbbell_Bench_Press','Deixe os pés firmes e os punhos alinhados sobre os cotovelos.'],
 lateral:['Elevação lateral com halteres','Side_Lateral_Raise','Eleve os braços até perto da altura dos ombros, sem impulso.'],
 curl:['Rosca alternada','Dumbbell_Alternate_Bicep_Curl','Mantenha os cotovelos perto do corpo. Conte as repetições de cada lado.'],
 plank:['Prancha frontal','Plank','Apoie os antebraços e respire mantendo quadril e tronco alinhados.'],
 squat:['Agachamento livre','Bodyweight_Squat','Desça mantendo todo o pé apoiado. Comece com peso corporal.'],
 row:['Remada baixa na polia','Seated_Cable_Rows','Puxe em direção às costelas mantendo o tronco estável.'],
 flex:['Flexora sentada','Seated_Leg_Curl','Alinhe o eixo da máquina ao joelho e controle a volta.'],
 incline:['Supino inclinado com halteres','Incline_Dumbbell_Press','Use inclinação moderada e apoie os pés.'],
 tri:['Tríceps na polia','Triceps_Pushdown','Estenda os cotovelos mantendo os braços junto ao tronco.'],
 add:['Cadeira adutora','Thigh_Adductor','Aproxime as coxas controlando a volta.'],
 abd:['Cadeira abdutora','Thigh_Abductor','Afaste as coxas mantendo a pelve apoiada.'],
 push:['Flexão de braços','Pushups','Mantenha o corpo alinhado. Eleve as mãos num banco firme para facilitar.'],
 hammer:['Rosca martelo','Alternate_Hammer_Curl','Mantenha as palmas voltadas para dentro. Conte cada lado.'],
 dip:['Paralelas para peito','Dips_-_Chest_Version','Incline levemente o tronco. Use assistência se necessário.'],
 fly:['Crucifixo reto','Dumbbell_Flyes','Cotovelos levemente flexionados e amplitude confortável.'],
 wide:['Barra pronada com apoio','Pullups','Foto da barra livre. Para a adaptação, mantenha os pés em suporte firme e dose a ajuda.'],
 cable:['Abdução de quadril na polia','Side_Leg_Raises','Foto do movimento sem cabo. Na polia baixa, use tornozeleira na perna mais distante e afaste a perna sem inclinar o tronco.']
};
const days=['Segunda','Quarta','Sexta'];
const plans=[
 [['leg',3,'10–15'],['bench',3,'8–12'],['chin',3,'6–8'],['flex',2,'10–15'],['lateral',3,'12–15'],['curl',2,'10–12'],['plank',3,'20–40 s']],
 [['squat',3,'10–15'],['row',3,'8–12'],['incline',3,'8–12'],['flex',3,'10–15'],['tri',3,'10–15'],['abd',2,'12–15']],
 [['leg',3,'10–15'],['chin',2,'6–8'],['push',3,'8–15'],['flex',2,'10–15'],['lateral',3,'12–15'],['hammer',2,'10–12'],['add',2,'12–15']]
];
const root=document.querySelector('#app'), prefix='josias.v1.';
let date=new Date().toLocaleDateString('sv-SE'),day=({1:0,2:1,3:1,4:2,5:2})[new Date().getDay()]??0;
const key=()=>prefix+date+'.'+day;
const read=()=>JSON.parse(localStorage.getItem(key())||'{"sets":{},"done":false}');
function photo(id){const [name,img,tip]=moves[id];return '<img class="demo" loading="lazy" src="img/'+img+'.webp" alt="'+name+'"><p>'+tip+'</p>'}
const warm=[['hip','6 voltas por sentido'],['arm','8 voltas por sentido'],['walk','10 minutos']];
function panel(id,meta,body=''){return '<details><summary>'+moves[id][0]+'<small>'+meta+'</small></summary>'+photo(id)+body+'</details>'}
function save(obj){try{localStorage.setItem(key(),JSON.stringify(obj));return true}catch{alert('Falha ao salvar no aparelho. Verifique o espaço e as permissões do navegador.');return false}}
function training(){
 const data=read();
 root.innerHTML='<div class="eyebrow">Programa de força • 20h em diante</div><h1>Diário de treino</h1><div class="tools"><label>Sessão<select id="day">'+days.map((d,i)=>'<option '+(i===day?'selected':'')+'>'+d+'</option>').join('')+'</select></label><label>Data<input id="date" type="date" value="'+date+'"></label></div><h2>Mobilidade e aquecimento</h2>'+warm.map(([id,m])=>panel(id,m)).join('')+'<p>Antes do primeiro exercício pesado, faça 1–2 séries leves de aproximação.</p><h2>Treino de '+days[day].toLowerCase()+'</h2><p>Abra cada exercício para ver a execução e registrar as séries. Nos halteres, informe kg por mão. Na barra assistida, informe os kg de assistência.</p>'+plans[day].map(([id,n,target])=>{
 const rest=['leg','bench','chin','row','incline','push','squat'].includes(id)?'2 min':'60–90 s';
 let rows='<div class="row"><small>Série</small><small>'+(id==='chin'?'Ajuda (kg)':'Carga (kg)')+'</small><small>'+(id==='plank'?'Segundos':'Repetições')+'</small></div>';
 for(let i=0;i<n;i++){rows+='<div class="row"><b>'+String(i+1).padStart(2,'0')+'</b>'+['kg','rep'].map(f=>{const k=id+'_'+i+'_'+f;return '<input type="number" aria-label="'+moves[id][0]+' série '+(i+1)+' '+(f==='kg'?'kg':id==='plank'?'segundos':'repetições')+'" min="0" step="'+(f==='kg'?'0.1':'1')+'" data-k="'+k+'" value="'+(Number.isFinite(data.sets[k])?data.sets[k]:'')+'">'}).join('')+'</div>'}
 return panel(id,n+' × '+target+' · descanso '+rest,rows)
 }).join('')+'<button class="primary" id="finish">'+(data.done?'Reabrir sessão':'Concluir sessão')+'</button><p id="status" role="status">'+(data.done?'Sessão concluída.':'Os registros são salvos neste aparelho.')+'</p>';
 document.querySelector('#day').onchange=e=>{day=e.target.selectedIndex;training()};document.querySelector('#date').onchange=e=>{if(e.target.value)date=e.target.value;training()};
 root.querySelectorAll('[data-k]').forEach(input=>{input.disabled=data.done;input.oninput=()=>{if(!input.validity.valid)return;const d=read();if(input.value==='')delete d.sets[input.dataset.k];else d.sets[input.dataset.k]=input.valueAsNumber;if(save(d))document.querySelector('#status').textContent='Registro salvo neste aparelho.'}});
 document.querySelector('#finish').onclick=()=>{const d=read();if(!d.done&&!Object.keys(d.sets).some(k=>k.endsWith('_rep')&&d.sets[k]>0)){document.querySelector('#status').textContent='Registre ao menos uma série antes de concluir.';return}d.done=!d.done;if(save(d))training()}
}
function history(){const keys=Object.keys(localStorage).filter(k=>k.startsWith(prefix)).sort().reverse();root.innerHTML='<h1>Histórico</h1><p>Abra uma sessão para consultar cargas e repetições.</p>';for(const k of keys){const [when,idx]=k.slice(prefix.length).split('.');const d=JSON.parse(localStorage.getItem(k));const b=document.createElement('button');b.textContent=when.split('-').reverse().join('/')+' · '+days[idx]+' · '+(d.done?'Concluído':'Em andamento');b.onclick=()=>{day=Number(idx);date=when;page('Treino')};const card=document.createElement('article');card.append(b);root.append(card)}if(!keys.length)root.innerHTML+='<article>Seu primeiro registro aparecerá aqui.</article>'}
function guide(){root.innerHTML='<h1>Guia do programa</h1><article><h2>Como progredir</h2><p>Escolha uma carga que permita terminar com cerca de duas repetições de reserva. Quando atingir o topo da faixa em todas as séries com boa técnica em duas sessões, aumente o menor incremento disponível. Na barra assistida, reduza a ajuda. Na prancha, avance até 40 segundos.</p><p>Se também praticar Muay Thai, observe a recuperação das pernas após as aulas. Nos dias de fadiga, mantenha a carga.</p></article><h2>Variações da proposta original</h2><p>São alternativas para substituir exercícios da sessão, sem somar séries.</p>'+[['dip','Alternativa à flexão'],['fly','Alternativa de isolamento de peito'],['wide','Alternativa à barra supinada'],['cable','Alternativa à cadeira abdutora'],['push','Flexão negativa: desça em 3 segundos e apoie os joelhos para voltar. A foto mostra a flexão convencional.'],['squat','Agachamento com pausa: sustente a posição por 2 segundos antes de subir. A foto mostra a posição.'],['row','A remada em máquina articulada pode substituir a remada baixa. A foto ilustra a versão na polia.']].map(([id,m])=>panel(id,m)).join('')+'<p>Fotos de execução: <a href="https://github.com/yuhonas/free-exercise-db">Free Exercise DB</a>.</p>'}
function page(name){document.querySelectorAll('nav button').forEach(b=>b.classList.toggle('active',b.dataset.page===name));({Treino:training,Histórico:history,Guia:guide})[name]();window.scrollTo(0,0)}
document.querySelectorAll('nav button').forEach(b=>b.onclick=()=>page(b.dataset.page));page('Treino');
if('serviceWorker' in navigator)navigator.serviceWorker.register('./sw.js').catch(console.error);
