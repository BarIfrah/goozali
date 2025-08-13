// Single-run guard
if (window.__GZL_INIT__) { /* already inited */ }
else { window.__GZL_INIT__ = true;

/** Goozali Frontend — static, mobile-first. Tabs via hash; lazy iframes; forms open in a modal. */

/* ----- CONFIG ----- */
const TABS = [
  {
    key: "jobs",
    title: "משרות פתוחות - היי טק",
    desc: "מאגר משרות עדכני עם סינון לפי תחום/אזור",
    embeds: [{ label: "Grid", url: "https://airtable.com/embed/appwewqLk7iUY4azc/shrQBuWjXd0YgPqV6?backgroundColor=cyan&viewControls=on" }],
    actions: [{ id: "text16", label: "להוסיף משרה חדשה+", hash: "#headdjobopening" }]
  },
  {
    key: "candidates",
    title: "רשימת מחפשי עבודה - היי טק",
    desc: "מועמדים שמחפשים את האתגר הבא",
    embeds: [{ label: "Grid", url: "https://airtable.com/embed/app5sYJyDgcRbJWYU/shr97tl6luEk4Ca9R?backgroundColor=green&viewControls=on" }],
    actions: [{ id: "addcandidate-text", label: "הרשמה+", hash: "#addcandidate" }]
  },
  {
    key: "companies",
    title: "רשימת חברות הייטק וסטארטאפים בארץ",
    desc: "חברות שמגייסות + דפי קריירה",
    embeds: [{ label: "Grid", url: "https://airtable.com/embed/app7OQjqEzTtCRq7u/shrNtlFxOG2ag1kyB/tblBQjp5Aw6O172VY?viewControls=on" }],
    actions: [{ id: "addcompany-text", label: "להוסיף חברה+", hash: "#addcompany" }]
  },
  {
    key: "salary",
    title: "טווחי שכר",
    desc: "טווחי שכר משותפים מהקהילה",
    embeds: [{ label: "Grid", url: "https://airtable.com/embed/appbj4LvHBRCdL9g0/shrcsQUoXDtZo2sCs/tblu59uMIbSviV6By?viewControls=on" }]
  },
  {
    key: "groups",
    title: "קהילות, קבוצות ולוחות דרושים",
    desc: "הצטרפות לקבוצות טלגרם לפי תחום/אזור",
    embeds: [{ label: "Grid", url: "https://airtable.com/embed/appeRRSAgnVegTIke/shrAOxwTNWPActhkG/tblG5PNUXzDqsRKxx?viewControls=on" }],
    actions: [{ id: "addlink-text", label: "להוסיף קישור חדש+", hash: "#addlink" }],
    telegram: [
      "https://t.me/hitechjobsjunior","https://t.me/hitechjobsJerusalem","https://t.me/+YAPhl9UVzodhODBk","https://t.me/+xAIG_AuF_yY0Yjhk",
      "https://t.me/hitechjobsisrael","https://t.me/hitechjobsdatascience","https://t.me/hitechjobsdata","https://t.me/+CwDWQuAZC_owODc0",
      "https://t.me/+5nK1fQiqLO1iZDI0","https://t.me/+qm6-8JjvLP1jNTM0","https://t.me/hitechjobsQA","https://t.me/+4CQf4ZSW2G1lMmZk",
      "https://t.me/hitechjobshardware","https://t.me/+QRH1Im0COLdkOGE0","https://t.me/+HWGyk6VEScc1Y2E0","https://t.me/hitechjobsales",
      "https://t.me/+GCaUjq-Fkuw2OGY8","https://t.me/+qZBZ8YNwfPMxODI0","https://t.me/+s_qhgZ45yDZiNGY0","https://t.me/+Q0phrVEqMpo3ODg8",
      "https://t.me/hitechjobsproduct","https://t.me/+nKYMWNw8IR04ODU0","https://t.me/hitechjobsmarketing","https://t.me/+CSl_I8hQADIwYzA8",
      "https://t.me/+u9NEOqtvK7A0OWU0","https://t.me/+e8hWNiEWn5NmZDU0","https://t.me/+k1pq84oBHe45Yjg0","https://t.me/+UJj1drtpFmcwMTE0"
    ]
  },
  {
    key: "help",
    title: "איך לחפש משרות ביעילות",
    desc: "מדריך, סרטוני הסבר וקישורים חשובים",
    embeds: [
      { label: "Video 1", url: "https://drive.google.com/file/d/1_RVB1tScAW9fLUgiEHU9NfzyTUjMDHaU/view?usp=sharing" },
      { label: "Video 2", url: "https://drive.google.com/file/d/1BuywRrBQLB4h7__d6KLnWtvtY3Bud3Ex/view?usp=sharing" }
    ],
    actions: [{ id: "helpout-text", label: "להציע עזרה+", hash: "#helpout" }]
  },
];

/* Friendly labels for Telegram */
const TELEGRAM_LABELS = {
  hitechjobsisrael: "הייטק ישראל — כללי",
  hitechjobsjunior: "ג׳וניור",
  hitechjobsJerusalem: "ירושלים",
  hitechjobsdatascience: "Data Science",
  hitechjobsdata: "Data / Analytics",
  hitechjobsQA: "QA / בדיקות",
  hitechjobshardware: "Hardware",
  hitechjobsales: "Sales",
  hitechjobsproduct: "Product",
  hitechjobsmarketing: "Marketing",
};
function labelFromTelegramUrl(url){
  try{
    const u = new URL(url);
    const slug = u.pathname.replace(/^\//,"");
    if (!slug) return "קבוצת טלגרם";
    if (slug.startsWith("+")) return "הצטרפות לקבוצה";
    return TELEGRAM_LABELS[slug] || slug;
  }catch{return "קבוצת טלגרם";}
}

function normalizeEmbeds(embeds){
  return (embeds||[]).map(e => typeof e === "string" ? ({label:"Grid", url: e}) : e);
}

function toEmbed(url){
  try{
    const u = new URL(url);
    if(u.hostname.includes("airtable.com")){
      if(u.pathname.startsWith("/shr")){ u.pathname = "/embed"+u.pathname; }
      if(!u.searchParams.has("viewControls")) u.searchParams.set("viewControls","off");
      return u.toString();
    }
    return url;
  }catch{ return url; }
}

/* Forms mapping (hash -> URL) */
const HASH_FORMS = {
  headdjobopening: "https://airtable.com/embed/shrhpo5jJMDQ6X8N6?backgroundColor=cyan",
  addcandidate:    "https://airtable.com/embed/app5sYJyDgcRbJWYU/shrwNZfUuCDh5r8uc?backgroundColor=green",
  helpout:         "https://airtable.com/appQbwA4PAIsbGeIA/pagDaZTpRN953CEhC/form",
  addcompany:      "https://airtable.com/embed/app7OQjqEzTtCRq7u/shrl9rEgpW8FysqSo?backgroundColor=purple",
  addlink:         "https://airtable.com/embed/appeRRSAgnVegTIke/shrqYaTjpsiZ3R5Zv?backgroundColor=cyan"
};

/* Intercept legacy hash links and open modal */
document.addEventListener("click",(e)=>{
  const a=e.target.closest('a[href^="#"]'); if(!a) return;
  const key=a.getAttribute("href").slice(1);
  if (HASH_FORMS[key]) {
    e.preventDefault();
    e.stopPropagation();
    if (e.stopImmediatePropagation) e.stopImmediatePropagation();
    openForm(HASH_FORMS[key], a.textContent?.trim() || "Form");
  }
});

/* Build tabs + panels */
const tabbar=document.getElementById('gzl-tabbar');
const panelsHost=document.getElementById('gzl-panels');
const registry=new Map();
TABS.forEach(t=>{
  const b=document.createElement('button'); b.className='tab'; b.setAttribute('role','tab'); b.setAttribute('aria-selected','false'); b.dataset.key=t.key; b.textContent=t.title; tabbar.appendChild(b);
  const p=document.createElement('section'); p.className='panel'; p.id=`panel-${t.key}`; p.setAttribute('role','tabpanel'); p.dataset.active='false'; panelsHost.appendChild(p);
  registry.set(t.key,{btn:b,panel:p,tab:t});
});

function fillPanel(entry){
  const {panel, tab} = entry;
  panel.innerHTML = ""; // clean slate

  if(tab.desc){
    const p=document.createElement('p'); p.className='note'; p.textContent=tab.desc; panel.appendChild(p);
  }

  // Actions (centered buttons)
  if (tab.actions && tab.actions.length) {
    const actionsWrap = document.createElement('div');
    actionsWrap.className = 'actions';
    tab.actions.forEach(act => {
      const par = document.createElement('p');
      if (act.id) par.id = act.id;
      const a = document.createElement('a');
      const label = (act.label || '').replace(/\+\s*$/, '');
      a.textContent = label || 'פעולה';
      if (act.hash) a.setAttribute('href', act.hash);
      else if (act.url) a.setAttribute('href', act.url);
      if (act.url && /https?:/.test(act.url)) a.setAttribute('target','_blank');
      a.className = 'action-btn';
      par.appendChild(a);
      actionsWrap.appendChild(par);
    });
    panel.appendChild(actionsWrap);
  }

  // Telegram chips
  if(tab.telegram && tab.telegram.length){
    const chips=document.createElement('div');
    tab.telegram.forEach(item=>{
      const url=typeof item==='string'? item : item.url;
      const label=typeof item==='string'? labelFromTelegramUrl(url) : (item.label || labelFromTelegramUrl(item.url));
      const a=document.createElement('a'); a.href=url; a.target='_blank'; a.rel='noopener'; a.className='chip'; a.textContent=label; chips.appendChild(a);
    });
    panel.appendChild(chips);
  }

  // Embeds
  const views=normalizeEmbeds(tab.embeds);
  if(views.length){
    const bar=document.createElement('div'); bar.className='viewbar';
    const left=document.createElement('div'); left.className='left';
    const right=document.createElement('div'); right.className='right';
    bar.appendChild(left); bar.appendChild(right);

    const iframe=document.createElement('iframe'); iframe.className='iframe'; iframe.loading='lazy'; iframe.referrerPolicy='no-referrer-when-downgrade';

    function setView(i){
      iframe.src = toEmbed(views[i].url);
      left.querySelectorAll('.viewbtn').forEach((bb,idx)=>bb.setAttribute('aria-pressed', idx===i? 'true':'false'));
      open.href = iframe.src;
    }

    views.forEach((v,idx)=>{
      const btn=document.createElement('button');
      btn.type='button'; btn.className='viewbtn';
      btn.textContent=v.label || ('View '+(idx+1));
      btn.setAttribute('aria-pressed', idx===0?'true':'false');
      btn.addEventListener('click',()=>setView(idx));
      left.appendChild(btn);
    });

    const open=document.createElement('a'); open.textContent='פתח בטאב חדש'; right.appendChild(open);

    panel.appendChild(bar);
    panel.appendChild(iframe);
    setView(0);
  }
}

function setActive(key){
  registry.forEach((e,k)=>{
    const on = k===key;
    e.btn.setAttribute('aria-selected', on ? 'true' : 'false');
    e.panel.dataset.active = on ? 'true' : 'false';
    if (on) fillPanel(e);
  });
  const u=new URL(location.href);
  if(key) u.hash='tab='+key; else u.hash='';
  history.replaceState(null,'',u.toString());
}

tabbar.addEventListener('click',e=>{ const b=e.target.closest('.tab'); if(!b) return; setActive(b.dataset.key); });

function hashKey(){ const m=/tab=([a-z]+)/i.exec(location.hash||''); return m?m[1]:null; }
window.addEventListener('hashchange', () => {
  const h = location.hash || '';
  if (h.startsWith('#tab=')) {
    const k = h.slice(5);
    if (!k || registry.has(k)) setActive(k || null);
  }
});

/* Modal forms */
const backdrop=document.getElementById('gzl-backdrop'); const modal=backdrop.querySelector('.modal'); const mframe=document.getElementById('gzl-miframe'); const mclose=document.getElementById('gzl-close'); const mfallback=document.getElementById('gzl-fallback');
function openForm(url,title){ document.getElementById('gzlModalTitle').textContent=title||'Form'; mframe.src=url; mfallback.href=url; backdrop.style.display='flex'; requestAnimationFrame(()=>modal.classList.add('open')); backdrop.setAttribute('aria-hidden','false'); }
function closeForm(){ modal.classList.remove('open'); backdrop.setAttribute('aria-hidden','true'); setTimeout(()=>{ backdrop.style.display='none'; mframe.src='about:blank'; },160); }
backdrop.addEventListener('click',e=>{ if(e.target===backdrop) closeForm(); }); mclose.addEventListener('click',closeForm);
document.addEventListener('keydown', e => { if (e.key === 'Escape' && backdrop.getAttribute('aria-hidden')==='false') closeForm(); });

// Intercept direct external forms (open in modal)
const FORM_HOSTS_RE = /(forms\.gle|docs\.google\.com\/forms|airtable\.com\/(sh|app)|typeform\.com)/i;
document.addEventListener("click", e => {
  const a = e.target.closest("a[href]"); if (!a) return;
  const url = a.href;
  if (FORM_HOSTS_RE.test(url)) {
    if (a.getAttribute('href')?.startsWith('#')) return;
    e.preventDefault();
    openForm(url, a.textContent?.trim() || "טופס");
  }
});

// Notifications CTA
document.getElementById('gzl-notif-cta')?.addEventListener('click', (e)=>{
  e.preventDefault(); setActive('groups'); document.getElementById('panel-groups')?.scrollIntoView({behavior:'smooth', block:'start'});
});

// Start
const start = hashKey(); if (start && registry.has(start)) setActive(start); else setActive('jobs');

/* END INIT GUARD */
}
