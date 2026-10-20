/* TurboGarage — общий скрипт */
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const LS={get:(k,d)=>{try{return JSON.parse(localStorage.getItem(k))??d}catch{return d}},set:(k,v)=>localStorage.setItem(k,JSON.stringify(v))};
const pages=[['index.html','Главная'],['about.html','О нас'],['blog.html','Блог'],['contact.html','Контакты']];
const here=location.pathname.split('/').pop()||'index.html';

// Единые header/footer для всех страниц
$('#site-header').innerHTML=`<div class="wrap bar"><a class="logo" href="index.html"><img src="img/logo.svg" alt="">TurboGarage</a>
<nav id="nav">${pages.map(([h,t])=>`<a href="${h}" class="${h===here?'active':''}">${t}</a>`).join('')}</nav>
<div class="tools"><button class="ib" id="theme" aria-label="Сменить тему"></button><button class="ib" id="burger" aria-label="Меню">☰</button></div></div>`;
$('#site-footer').innerHTML=`<div class="wrap"><span>© ${new Date().getFullYear()} TurboGarage — автосервис в Москве</span><span>Пн–Сб 8:00–20:00 · +7 (495) 123-45-67</span></div>`;

// Тема (localStorage №1)
const setTheme=t=>{document.documentElement.dataset.theme=t;LS.set('theme',t);$('#theme').textContent=t==='dark'?'☀️':'🌙'};
setTheme(LS.get('theme',matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'));
$('#theme').onclick=()=>setTheme(document.documentElement.dataset.theme==='dark'?'light':'dark');
$('#burger').onclick=()=>$('#nav').classList.toggle('open');

// Заголовок по словам
$$('.title').forEach(t=>{let i=0;t.innerHTML=t.textContent.trim().split(' ').map(w=>`<span style="--i:${i++}">${w}</span>`).join(' ')});
// Появление при скролле
const io=new IntersectionObserver(e=>e.forEach(x=>x.isIntersecting&&(x.target.classList.add('in'),io.unobserve(x.target))),{threshold:.15});
$$('.rv').forEach(el=>io.observe(el));
// Счётчики
const co=new IntersectionObserver(e=>e.forEach(x=>{if(!x.isIntersecting)return;const el=x.target,n=+el.dataset.n,t0=performance.now();
 (function f(t){const p=Math.min((t-t0)/1600,1);el.textContent=Math.round(n*(1-Math.pow(1-p,3)));p<1&&requestAnimationFrame(f)})(t0);co.unobserve(el)}));
$$('[data-n]').forEach(el=>co.observe(el));
// Свет за курсором
const hero=$('.hero');hero&&hero.addEventListener('pointermove',e=>{const r=hero.getBoundingClientRect();hero.style.setProperty('--mx',e.clientX-r.left+'px');hero.style.setProperty('--my',e.clientY-r.top+'px')});
const toast=m=>{let t=$('.toast')||document.body.appendChild(Object.assign(document.createElement('div'),{className:'toast'}));t.textContent=m;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),3000)};

// Калькулятор (запоминает выбор — localStorage №2)
const calc=$('#calc');if(calc){const out=$('#total'),f=()=>{const v=Math.round(+$('#svc').value*+$('#cls').value+$$('.opt:checked',calc).reduce((a,o)=>a+ +o.value,0));
 out.textContent=v.toLocaleString('ru-RU')+' ₽';out.classList.add('bump');setTimeout(()=>out.classList.remove('bump'),200);LS.set('calc',[$('#svc').selectedIndex,$('#cls').selectedIndex])};
 const [a,b]=LS.get('calc',[0,0]);$('#svc').selectedIndex=a;$('#cls').selectedIndex=b;calc.oninput=f;f()}

// Лайки (localStorage №3) и поиск по блогу
const likes=LS.get('likes',{});
$$('.like').forEach(b=>{const id=b.dataset.id,draw=()=>{b.classList.toggle('on',!!likes[id]);b.textContent=likes[id]?'❤️ Нравится':'🤍 Нравится'};draw();b.onclick=()=>{likes[id]=!likes[id];LS.set('likes',likes);draw()}});
const q=$('#search');q&&q.addEventListener('input',()=>$$('.post').forEach(p=>p.parentElement.style.display=p.textContent.toLowerCase().includes(q.value.toLowerCase())?'':'none'));

// Форма записи (localStorage №4)
const form=$('#book');if(form){const renderB=()=>{const l=LS.get('bookings',[]);$('#bl').innerHTML=l.length?l.slice(-3).reverse().map(b=>`<li>${b.name} — ${b.date||'без даты'}</li>`).join(''):'<li class="mute">Пока нет заявок — запишитесь первым.</li>'};
 form.onsubmit=e=>{e.preventDefault();const l=LS.get('bookings',[]);l.push(Object.fromEntries(new FormData(form)));LS.set('bookings',l);form.reset();renderB();toast('Заявка принята! Перезвоним в течение часа 🔧')};renderB()}
