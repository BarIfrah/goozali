import { EMBEDS, FORMS, STRINGS, TAB_ORDER } from "./config.js";

if (!window.__GZL_INIT__) {
    window.__GZL_INIT__ = true;

    const $  = (s, r=document)=>r.querySelector(s);
    const $$ = (s, r=document)=>[...r.querySelectorAll(s)];

    function toEmbed(u){
        try{
            const x = new URL(u);
            if (x.hostname.includes("airtable.com")){
                const isA = x.pathname.startsWith("/shr") || x.pathname.startsWith("/app") || x.pathname.startsWith("/embed");
                if (isA && !x.pathname.startsWith("/embed")) x.pathname = "/embed" + x.pathname;
                if (!x.searchParams.has("viewControls") && /\/embed\/app[e]/.test(x.pathname)){
                    x.searchParams.set("viewControls","off");
                }
                return x.toString();
            }
        }catch{}
        return u;
    }

    // ---------- State ----------
    let lang = initLang();                // "he" | "en"
    let S    = STRINGS[lang];
    const registry = new Map();           // key -> {btn,panel}

    // ---------- Modal ----------
    const backdrop  = $("#gzl-backdrop");
    const modal     = backdrop.querySelector(".modal");
    const mframe    = $("#gzl-miframe");
    const mclose    = $("#gzl-close");
    const mfallback = $("#gzl-fallback");
    const mhtml     = $("#gzl-modal-html");

    function openForm(url, title){
        const src = toEmbed(url);
        mhtml.style.display = "none";
        mframe.style.display = "block";
        mfallback.style.display = "block";
        $("#gzlModalTitle").textContent = title || "Form";
        mframe.src = src;
        mfallback.href = src;
        mfallback.textContent = (S.open_in_new_tab || "Open in new tab");
        backdrop.style.display = "flex";
        requestAnimationFrame(()=> modal.classList.add("open"));
        backdrop.setAttribute("aria-hidden","false");
    }
    function openHtml(title, nodeFactory){
        mframe.src = "about:blank";
        mframe.style.display = "none";
        mfallback.style.display = "none";
        mhtml.innerHTML = "";
        const node = nodeFactory && nodeFactory();
        if (node) mhtml.appendChild(node);
        mhtml.style.display = "block";
        $("#gzlModalTitle").textContent = title || "";
        backdrop.style.display = "flex";
        requestAnimationFrame(()=> modal.classList.add("open"));
        backdrop.setAttribute("aria-hidden","false");
    }
    function closeForm(){
        modal.classList.remove("open");
        backdrop.setAttribute("aria-hidden","true");
        setTimeout(()=>{ backdrop.style.display="none"; mframe.src="about:blank"; },160);
    }
    backdrop.addEventListener("click",(e)=>{ if (e.target===backdrop) closeForm(); });
    mclose.addEventListener("click", closeForm);
    document.addEventListener("keydown",(e)=>{ if (e.key==="Escape" && backdrop.getAttribute("aria-hidden")==="false") closeForm(); });

    // עוגני מודאל (#headdjobopening / #helpout וכו') — לפי השפה הפעילה בלבד
    document.addEventListener("click",(e)=>{
        const a = e.target.closest('a[href^="#"]'); if (!a) return;
        const key = a.getAttribute("href").slice(1);
        const url = FORMS[lang]?.[key];
        if (url){
            e.preventDefault();
            openForm(url, a.textContent?.trim() || "Form");
        }
    });

    // לפתוח במודאל גם קישורי טפסים חיצוניים
    const FORM_HOSTS_RE = /(forms\.gle|docs\.google\.com\/forms|airtable\.com\/(sh|app)|typeform\.com)/i;
    document.addEventListener("click",(e)=>{
        const a = e.target.closest("a[href]"); if (!a) return;
        if (a.getAttribute("href")?.startsWith("#")) return;
        const url = a.href;
        if (FORM_HOSTS_RE.test(url)){
            e.preventDefault();
            openForm(url, a.textContent?.trim() || "Form");
        }
    });

    // ---------- Tabs ----------
    const tabbar = $("#gzl-tabbar");
    const panelsHost = $("#gzl-panels");

    function buildTabs(){
        tabbar.innerHTML = "";
        panelsHost.innerHTML = "";
        registry.clear();

        TAB_ORDER.forEach((key)=>{
            const btn = document.createElement("button");
            btn.className = "tab";
            btn.setAttribute("role","tab");
            btn.setAttribute("aria-selected","false");
            btn.dataset.key = key;
            btn.textContent = S.tabsTitles[key] || key;
            tabbar.appendChild(btn);

            const panel = document.createElement("section");
            panel.className = "panel";
            panel.id = `panel-${key}`;
            panel.dataset.key = key;
            panel.dataset.active = "false";
            panelsHost.appendChild(panel);

            registry.set(key, { btn, panel });
        });
    }

    function fillPanel(key){
        const entry = registry.get(key);
        if (!entry) return;
        const { panel } = entry;
        panel.innerHTML = "";

        // תיאור הכרטיסייה
        const d = S.tabsDesc[key];
        if (d){
            const p = document.createElement("p");
            p.className = "note";
            p.textContent = d;
            panel.appendChild(p);
        }

        // כפתורי פעולה (לפי מפתח הכרטיסייה)
        const ACTIONS_BY_TAB = {
            jobs:       [{ id: "text16", hash: "#headdjobopening" }],
            candidates: [{ id: "addcandidate-text", hash: "#addcandidate" }],
            companies:  [{ id: "addcompany-text", hash: "#addcompany" }],
            groups:     [{ id: "addlink-text", hash: "#addlink" }],
            helpers:    [{ id: "helpout-text", hash: "#helpout" }],
        };
        const acts = ACTIONS_BY_TAB[key] || [];
        if (acts.length){
            const wrap = document.createElement("div");
            wrap.className = "actions";
            acts.forEach(({id,hash})=>{
                const p = document.createElement("p"); if (id) p.id = id;
                const a = document.createElement("a");
                a.className = "action-btn";
                a.href = hash;
                a.textContent = (S.actions?.[id] || "Action");
                p.appendChild(a);
                wrap.appendChild(p);
            });
            panel.appendChild(wrap);
        }

        // ה־EMBEDS הקבועים (זה לא משתנה עם השפה)
        const views = (EMBEDS[key] || []).map(toEmbed);
        if (!views.length) return;

        if (views.length === 1){
            const iframe = document.createElement("iframe");
            iframe.className = "iframe";
            iframe.loading = "lazy";
            iframe.referrerPolicy = "no-referrer-when-downgrade";
            iframe.src = views[0];
            panel.appendChild(iframe);

            const note = document.createElement("p");
            note.className = "note";
            const a = document.createElement("a");
            a.textContent = (S.open_in_new_tab || "Open in new tab");
            a.href = iframe.src; a.target = "_blank"; a.rel="noopener";
            note.appendChild(a);
            panel.appendChild(note);
        } else {
            const bar = document.createElement("div"); bar.className="viewbar";
            const left = document.createElement("div"); left.className="left";
            const right = document.createElement("div"); right.className="right";
            bar.appendChild(left); bar.appendChild(right);

            const iframe = document.createElement("iframe");
            iframe.className="iframe";
            iframe.loading="lazy";
            iframe.referrerPolicy = "no-referrer-when-downgrade";

            function setView(i){
                iframe.src = views[i];
                left.querySelectorAll(".viewbtn").forEach((b,idx)=> b.setAttribute("aria-pressed", idx===i ? "true":"false"));
                openNew.href = iframe.src;
            }
            views.forEach((v,idx)=>{
                const b = document.createElement("button");
                b.type="button"; b.className="viewbtn";
                b.textContent = /drive\.google\.com/.test(v) ? `Video ${idx+1}` : `View ${idx+1}`;
                b.setAttribute("aria-pressed", idx===0 ? "true" : "false");
                b.addEventListener("click", ()=> setView(idx));
                left.appendChild(b);
            });

            const openNew = document.createElement("a");
            openNew.textContent = (S.open_in_new_tab || "Open in new tab");
            right.appendChild(openNew);

            panel.appendChild(bar);
            panel.appendChild(iframe);
            setView(0);
        }
    }

    function setActive(key){
        registry.forEach((entry,k)=>{
            const on = (k===key);
            entry.btn.setAttribute("aria-selected", on?"true":"false");
            entry.panel.dataset.active = on?"true":"false";
            if (on) fillPanel(k);
        });
        const u = new URL(location.href);
        if (key) u.hash = "tab="+key; else u.hash = "";
        history.replaceState(null,"",u.toString());
    }

    tabbar.addEventListener("click",(e)=>{
        const b = e.target.closest(".tab"); if (!b) return;
        setActive(b.dataset.key);
    });

    window.addEventListener("hashchange", ()=>{
        const m = /tab=([a-z]+)/i.exec(location.hash||"");
        const k = m ? m[1] : null;
        if (!k || registry.has(k)) setActive(k || null);
    });

    // ---------- Language ----------
    function applyLang(){
        S = STRINGS[lang];
        document.documentElement.setAttribute("lang", S.lang || "he");

        $("#gzl-hero h1").textContent = S.hero_h1;
        $("#gzl-hero p").textContent  = S.hero_p;

        const ctas = $$("#gzl-hero .cta a");
        ctas[0] && (ctas[0].textContent = S.cta_find);
        ctas[1] && (ctas[1].textContent = S.cta_notif);
        ctas[2] && (ctas[2].textContent = S.cta_cv);

        $("#gzl-lang").textContent = (lang==="he" ? "EN" : "HE");

        // בונים את הכרטיסיות מחדש עם התוויות/תיאורים בשפה — אבל האמבד נשאר אותו דבר
        tabbar.innerHTML = ""; panelsHost.innerHTML = ""; registry.clear();
        TAB_ORDER.forEach((key)=>{
            const btn = document.createElement("button");
            btn.className = "tab"; btn.setAttribute("role","tab"); btn.dataset.key = key;
            btn.textContent = S.tabsTitles[key] || key;
            btn.setAttribute("aria-selected","false");
            tabbar.appendChild(btn);

            const panel = document.createElement("section");
            panel.className = "panel"; panel.id = `panel-${key}`;
            panel.dataset.key = key; panel.dataset.active = "false";
            panelsHost.appendChild(panel);

            registry.set(key, { btn, panel });
        });

        // לעדכן טקסט fallback במודאל אם פתוח
        if (mfallback) mfallback.textContent = (S.open_in_new_tab || "Open in new tab");
    }

    function initLang(){
        const qs = new URLSearchParams(location.search);
        const lg = qs.get("lang");
        if (lg) return lg.toLowerCase().startsWith("en") ? "en" : "he";
        return localStorage.getItem("gzl_lang") || "he";
    }

    $("#gzl-lang")?.addEventListener("click", ()=>{
        const active = ([...registry.keys()].find(k => registry.get(k).panel.dataset.active==="true")) || TAB_ORDER[TAB_ORDER.length-1];
        lang = (lang==="he" ? "en" : "he");
        localStorage.setItem("gzl_lang", lang);
        applyLang();
        setActive(active); // משמרים את אותה כרטיסייה
    });

    // ---------- Init ----------
    applyLang();
    const start = (location.hash.match(/tab=([a-z]+)/i) || [])[1] || TAB_ORDER[TAB_ORDER.length-1];
    setActive(start);

    // CTA של נוטיפיקציות — כרגע מודאל טקסט פשוט (נוסיף רשימות טלגרם כשנרצה)
    $("#gzl-notif-cta")?.addEventListener("click",(e)=>{
        e.preventDefault();
        openHtml(S.cta_notif, ()=> {
            const d = document.createElement("div");
            d.innerHTML = `<p>${S.cta_notif}</p>`;
            return d;
        });
    });
}
