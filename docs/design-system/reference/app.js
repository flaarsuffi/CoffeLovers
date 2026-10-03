/* Interações locais: navegação, receita, conteúdo e seleção de grãos. */
(()=>{
  const root=document.getElementById('coffee-next');
  const $=s=>root.querySelector(s);
  const {
    methods, grains, grainDetails, arabicaInfo
  }
  = window.CoffeeLoversData;
  let selectedDetail='Bourbon';
  let intensity='equilibrado';
  let validWater=350;
  const design={
    appearance:'system',device:'responsive',radius:20
  }
  ;
  function designRender(){
    root.dataset.look=design.appearance;
    root.dataset.device=design.device;
    root.style.setProperty('--cl-radius',design.radius+'px');
  }
  function page(name){
    root.querySelectorAll('[data-screen]').forEach(e=>e.hidden=e.dataset.screen!==name);
    const active=name==='grao-detalhe'?'graos':name;
    root.querySelectorAll('.cl-nav [data-page]').forEach(e=>{
      if(e.dataset.page===active)e.setAttribute('aria-current','page');
      else e.removeAttribute('aria-current');
    }
    );
  }
  function openGrain(name){
    const grain=grains.find(g=>g.name===name)||arabicaInfo;
    const info=grainDetails[name];
    selectedDetail=name;
    $('#cl-detail-crumb').textContent=name;
    $('#cl-detail-name').textContent=name;
    $('#cl-detail-kind').textContent=name==='Arábica'?'Conheça a espécie':'Conheça a variedade';
    $('#cl-detail-lead').textContent=grain.profile;
    $('#cl-detail-flavors').replaceChildren();
    grain.notes.split(' · ').forEach(note=>{
      const chip=document.createElement('span');
      chip.textContent=note;
      $('#cl-detail-flavors').append(chip);
    }
    );
    $('#cl-detail-sensory').textContent=info.sensory;
    $('#cl-detail-history').textContent=info.history;
    $('#cl-detail-source').href=info.source;
    $('#cl-detail-source').textContent=info.publisher;
    $('#cl-detail-taste').textContent=info.taste;
    $('#cl-detail-cultivation').textContent=info.cultivation;
    $('#cl-detail-brew').textContent=info.brew;
    $('#cl-detail-pairing').textContent=info.pairing;
    $('#cl-detail-prepare span').textContent='Preparar com '+name;
    $('#cl-detail-methods').replaceChildren();
    info.methods.forEach(key=>{
      const button=document.createElement('button');
      button.type='button';
      const label=document.createElement('span');
      label.textContent=methods[key].name;
      const meta=document.createElement('small');
      meta.textContent=methods[key].time+' →';
      button.append(label,meta);
      button.addEventListener('click',()=>{
        $('#cl-grain').value=name;
        $('#cl-method').value=key;
        update(true);
        page('preparar');
      }
      );
      $('#cl-detail-methods').append(button);
    }
    );
    page('grao-detalhe');
  }
  function drawSteps(){
    const m=methods[$('#cl-method').value];
    $('#cl-guide-title').textContent='Prepare seu '+m.name;
    $('#cl-steps').replaceChildren();
    m.steps.forEach(([title,desc])=>{
      const li=document.createElement('li');
      const strong=document.createElement('strong');
      strong.textContent=title;
      li.append(strong,document.createTextNode(desc));
      $('#cl-steps').append(li);
    }
    );
  }
  function update(announce=false){
    const m=methods[$('#cl-method').value];
    const moka=$('#cl-method').value==='moka';
    $('#cl-normal-controls').hidden=moka;
    $('#cl-moka-controls').hidden=!moka;
    $('#cl-numeric-result').hidden=moka;
    $('#cl-moka-result').hidden=!moka;
    $('#cl-result-method').textContent=m.name;
    const ratio=m.ratio+(intensity==='leve'?1:intensity==='intenso'?-1:0);
    const amount=moka?'':(validWater/ratio).toLocaleString('pt-BR',{
      minimumFractionDigits:1,maximumFractionDigits:1
    }
    );
    $('#cl-coffee').textContent=amount;
    $('#cl-result-water').textContent=validWater.toLocaleString('pt-BR');
    $('#cl-ratio').textContent='1:'+ratio;
    $('#cl-grind').textContent=m.grind;
    $('#cl-time').textContent=m.time;
    const grain=$('#cl-grain').value;
    $('#cl-result-grain').textContent=(grain==='Não sei meu grão'?'Receita base':grain)+' · '+({
      leve:'mais leve',equilibrado:'equilibrada',intenso:'mais intensa'
    }
    [intensity]);
    root.querySelectorAll('[data-intensity]').forEach(e=>e.setAttribute('aria-pressed',String(e.dataset.intensity===intensity)));
    drawSteps();
    if(announce)$('#cl-announcement').textContent=moka?'Receita para Moka: use a capacidade da sua cafeteira.':'Receita atualizada: '+amount+' gramas de café para '+validWater+' mililitros de água. Método '+m.name+'.';
  }
  root.querySelectorAll('[data-page]').forEach(b=>b.addEventListener('click',()=>page(b.dataset.page)));
  $('#cl-method').addEventListener('change',()=>update(true));
  $('#cl-grain').addEventListener('change',()=>update(true));
  root.querySelectorAll('[data-intensity]').forEach(b=>b.addEventListener('click',()=>{
    intensity=b.dataset.intensity;
    update(true);
  }
  ));
  $('#cl-water').addEventListener('input',()=>{
    const n=Number($('#cl-water').value);
    const ok=$('#cl-water').value!==''&&Number.isInteger(n)&&n>=100&&n<=1000;
    $('#cl-water-error').hidden=ok;
    $('#cl-water').setAttribute('aria-invalid',String(!ok));
    if(ok){
      validWater=n;
      $('#cl-slider').value=String(n);
      update(false);
    }
  }
  );
  $('#cl-water').addEventListener('change',()=>{
    if($('#cl-water').getAttribute('aria-invalid')!=='true')update(true);
  }
  );
  $('#cl-slider').addEventListener('input',()=>{
    validWater=Number($('#cl-slider').value);
    $('#cl-water').value=String(validWater);
    $('#cl-water-error').hidden=true;
    $('#cl-water').setAttribute('aria-invalid','false');
    update(false);
  }
  );
  $('#cl-slider').addEventListener('change',()=>update(true));
  $('#cl-guide-button').addEventListener('click',()=>{
    const open=$('#cl-guide').hidden;
    $('#cl-guide').hidden=!open;
    $('#cl-guide-button').setAttribute('aria-expanded',String(open));
    $('#cl-guide-button span').textContent=open?'Ocultar passo a passo':'Ver como preparar';
  }
  );
  $('#cl-guide-close').addEventListener('click',()=>{
    $('#cl-guide').hidden=true;
    $('#cl-guide-button').setAttribute('aria-expanded','false');
    $('#cl-guide-button span').textContent='Ver como preparar';
  }
  );
  Object.entries(methods).forEach(([key,m])=>{
    const card=document.createElement('article');
    card.className='cl-catalog-card';
    card.innerHTML='<div class="cl-card-head"><i data-lucide="'+m.icon+'" aria-hidden="true"></i><span class="cl-tag">'+m.level+'</span></div><h2>'+m.name+'</h2><p>'+m.desc+'</p><div class="cl-card-meta">'+m.time+' · '+m.grind+'</div><button class="cl-card-action" type="button">Preparar com '+m.name+'</button>';
    card.querySelector('button').addEventListener('click',()=>{
      $('#cl-method').value=key;
      update(true);
      page('preparar');
    }
    );
    $('#cl-method-catalog').append(card);
  }
  );
  grains.forEach(g=>{
    const card=document.createElement('article');
    card.className='cl-catalog-card';
    card.innerHTML='<div class="cl-card-head"><i data-lucide="bean" aria-hidden="true"></i><span class="cl-tag">Variedade</span></div><h2>'+g.name+'</h2><p>'+g.profile+'<br>'+g.notes+'</p><div class="cl-card-meta">'+g.body+'</div><button class="cl-card-action" type="button">Conhecer '+g.name+' →</button>';
    card.querySelector('button').addEventListener('click',()=>openGrain(g.name));
    $('#cl-grain-catalog').append(card);
  }
  );
  $('#cl-detail-prepare').addEventListener('click',()=>{
    $('#cl-grain').value=selectedDetail;
    update(true);
    page('preparar');
  }
  );
  $('#cl-arabica-info').addEventListener('click',()=>openGrain('Arábica'));
  designRender();
  update();
  page('preparar');
  if(globalThis.lucide)lucide.createIcons({
    attrs:{
      width:18,height:18
    }
  }
  );
}
)();
