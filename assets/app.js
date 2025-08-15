// לוגיקה בלבד. קישורים/טקסטים ב-config.js
import { TABS, EMBED_OVERRIDES, HASH_FORMS, HASH_FORMS_BY_LANG, STRINGS } from "./config.js";

if (window.__GZL_INIT__) {
    // מונע Init כפול אם הסקריפט נטען פעמיים
} else {
    window.__GZL_INIT__ = true;

    let CURRENT_STRINGS = STRINGS.he;

    /* ---------- Utils ---------- */
    const $  = (s, r=document)=>r.querySelector(s);
    const $$ = (s, r=document)=>[...r.querySelectorAll(s)];
    const normalizeEmbeds = (embeds)=> (embeds||[]).map(e=> typeof e==="string" ? ({label:"View",url:e}) : e);

    // המרה בטוחה ל-iframe: Airtable → /embed/… + כיבוי viewControls בטבלאות
    function toEmbed(u){
        try{
            const x = new URL(u);
            if (x.hostname.includes("airtable.com")){
                const isAirtablePath = x.pathname.startsWith("/shr") || x.pathname.startsWith("/app") || x.pathname.startsWith("/embed");
                if (isAirtablePath && !x.pathname.startsWith("/embed")){
                    x.pathname = "/embed" + x.pathname;
                }
                // לכבות viewControls רק בטבלאות (appe…); לא בטפסים
                if (!x.searchParams.has("viewControls") && /\/embed\/app[e]/.test(x.pathname)){
                    x.searchParams.set("viewControls","off");
                }
                return x.toString();
            }
            return u;
        }catch{ return u; }
    }

    /* ---------- Modal ---------- */
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

        // כותרת המודאל
        $("#gzlModalTitle").textContent = title || CURRENT_STRINGS?.notif_modal_title || "Form";

        // iframe + קישור חלופי
        mframe.src = src;
        mfallback.href = src;

        // >>> תרגום טקסט כפתור ה-fallback לפי שפה <<<
        mfallback.textContent = (CURRENT_STRINGS?.open_in_new_tab || "Open in new tab");

        backdrop.style.display = "flex";
        requestAnimationFrame(()=> modal.classList.add("open"));
        backdrop.setAttribute("aria-hidden","false");
    }
    function openHtml(title, nodesFactory){
        mframe.src = "about:blank";
        mframe.style.display = "none";
        mfallback.style.display = "none";
        mhtml.innerHTML = "";
        const node = nodesFactory && nodesFactory();
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

    // עוגני טפסים (#headdjobopening, #helpout וכו') — לפי שפה
    document.addEventListener("click",(e)=>{
        const a = e.target.closest('a[href^="#"]');
        if (!a) return;
        const key = a.getAttribute("href").slice(1);
        const lang = CURRENT_STRINGS?.lang || "he";
        const byLang = (HASH_FORMS_BY_LANG[lang] && HASH_FORMS_BY_LANG[lang][key]);
        const base   = HASH_FORMS[key];
        const url    = byLang || base;
        if (url){
            e.preventDefault();
            openForm(url, a.textContent?.trim() || "Form");
        }
    });

    // כל שאר הטפסים (Google/Airtable/Typeform) — לפתוח במודאל
    const FORM_HOSTS_RE = /(forms\.gle|docs\.google\.com\/forms|airtable\.com\/(sh|app)|typeform\.com)/i;
    document.addEventListener("click",(e)=>{
        const a = e.target.closest("a[href]");
        if (!a) return;
        const url = a.href;
        if (FORM_HOSTS_RE.test(url)){
            if (a.getAttribute("href")?.startsWith("#")) return; // כבר טופל לעיל
            e.preventDefault();
            openForm(url, a.textContent?.trim() || "Form");
        }
    });

    /* ---------- Tabs ---------- */
    const tabbar = $("#gzl-tabbar");
    const panelsHost = $("#gzl-panels");
    const registry = new Map();

    TABS.forEach((t)=>{
        const b = document.createElement("button");
        b.className = "tab"; b.setAttribute("role","tab"); b.setAttribute("aria-selected","false");
        b.dataset.key = t.key; b.textContent = t.title; tabbar.appendChild(b);

        const p = document.createElement("section");
        p.className = "panel"; p.id = `panel-${t.key}`; p.setAttribute("role","tabpanel");
        p.dataset.active = "false"; p.dataset.key = t.key; panelsHost.appendChild(p);

        registry.set(t.key, { btn:b, panel:p, tab:t });
    });

    function getEmbedsForTab(key, baseEmbeds){
        const lang = CURRENT_STRINGS?.lang || "he";
        const override = EMBED_OVERRIDES[lang]?.[key];
        return normalizeEmbeds(override || baseEmbeds || []);
    }

    function fillPanel(entry){
        const { panel, tab } = entry;
        const key = tab.key;
        panel.innerHTML = "";

        const ts = CURRENT_STRINGS?.tabs?.[key];
        const desc = (panel.dataset.l10nDesc || ts?.desc || tab.desc || "");
        if (desc){
            const p = document.createElement("p");
            p.className = "note"; p.textContent = desc; panel.appendChild(p);
        }

        // פעולות (כפתורי "להוסיף..." וכו') עם תרגום לפי שפה
        if (tab.actions && tab.actions.length){
            const wrap = document.createElement("div");
            wrap.className = "actions";
            tab.actions.forEach((act)=>{
                const par = document.createElement("p"); if (act.id) par.id = act.id;
                const a = document.createElement("a"); a.className = "action-btn";
                a.textContent = CURRENT_STRINGS?.actions?.[act.id] || act.label || "Action";
                if (act.hash) a.href = act.hash; else if (act.url) a.href = act.url;
                if (act.url && /^https?:/.test(act.url)) a.target = "_blank";
                par.appendChild(a); wrap.appendChild(par);
            });
            panel.appendChild(wrap);
        }

        const views = getEmbedsForTab(key, tab.embeds);
        if (!views.length) return;

        if (views.length === 1){
            const iframe = document.createElement("iframe");
            iframe.className = "iframe"; iframe.loading="lazy"; iframe.referrerPolicy="no-referrer-when-downgrade";
            iframe.src = toEmbed(views[0].url);
            panel.appendChild(iframe);

            const note = document.createElement("p");
            note.className = "note";
            const a = document.createElement("a");
            a.textContent = CURRENT_STRINGS?.open_in_new_tab || "Open in new tab";
            a.href = iframe.src; a.target = "_blank"; a.rel="noopener";
            note.appendChild(a); panel.appendChild(note);
        } else {
            // לדוגמת הווידאו — שני כפתורים "מוארים" כשהנוכחי מודגש
            const bar = document.createElement("div"); bar.className="viewbar";
            const left = document.createElement("div"); left.className="left";
            const right = document.createElement("div"); right.className="right";
            bar.appendChild(left); bar.appendChild(right);

            const iframe = document.createElement("iframe");
            iframe.className="iframe"; iframe.loading="lazy"; iframe.referrerPolicy="no-referrer-when-downgrade";

            function setView(i){
                iframe.src = toEmbed(views[i].url);
                left.querySelectorAll(".viewbtn").forEach((bb,idx)=> bb.setAttribute("aria-pressed", idx===i ? "true":"false"));
                openNew.href = iframe.src;
            }

            views.forEach((v,idx)=>{
                const btn = document.createElement("button");
                btn.type="button"; btn.className="viewbtn";
                btn.textContent = v.label || `View ${idx+1}`;
                btn.setAttribute("aria-pressed", idx===0 ? "true":"false");
                btn.addEventListener("click", ()=> setView(idx));
                left.appendChild(btn);
            });

            const openNew = document.createElement("a");
            openNew.textContent = CURRENT_STRINGS?.open_in_new_tab || "Open in new tab";
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
            if (on) fillPanel(entry);
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

    /* ---------- Language ---------- */

    function setLang(lang){
        const L = STRINGS[lang] || STRINGS.he;
        CURRENT_STRINGS = L;

        // משנים את שפת הדוק, לא את הכיוון (כדי שהלייאאוט לא "יקפוץ")
        document.documentElement.setAttribute("lang", L.lang);

        // גיבור
        $("#gzl-hero h1").textContent = L.hero_h1;
        $("#gzl-hero p").textContent  = L.hero_p;
        const ctas = $$("#gzl-hero .cta a");
        ctas[0] && (ctas[0].textContent = L.cta_find);
        ctas[1] && (ctas[1].textContent = L.cta_notif);
        ctas[2] && (ctas[2].textContent = L.cta_cv);

        // >>> לעדכן גם את כיתוב "פתח/י בטאב חדש" במודאל אם הוא פתוח <<<
        if (mfallback) mfallback.textContent = (L.open_in_new_tab || "Open in new tab");

        // טאבים: כותרות + תיאור + רענון הפאנל הפעיל כדי שייטען אמבד לשפה
        registry.forEach((entry,key)=>{
            const t = L.tabs[key];
            if (t) entry.btn.textContent = t.title;
            entry.panel.dataset.l10nDesc = t ? t.desc : "";
            if (entry.panel.dataset.active==="true") fillPanel(entry); // רענון הפאנל הנוכחי
        });

        // מתג שפה
        $("#gzl-lang").textContent = lang==="he" ? "EN" : "HE";
        localStorage.setItem("gzl_lang", lang);
    }

    function langInit(){
        const qs = new URLSearchParams(location.search);
        const lg = qs.get("lang");
        if (lg) return lg.toLowerCase().startsWith("en") ? "en" : "he";
        return localStorage.getItem("gzl_lang") || "he";
    }

    $("#gzl-lang")?.addEventListener("click", ()=>{
        const cur = document.documentElement.getAttribute("lang")==="en" ? "en" : "he";
        setLang(cur==="he" ? "en" : "he");
    });

    // כפתור הנוטיפיקציות (מודאל עם כל קבוצות הטלגרם)
    $("#gzl-notif-cta")?.addEventListener("click",(e)=>{
        e.preventDefault();
        const L = CURRENT_STRINGS;
        openHtml(L.notif_modal_title, ()=>{
            const wrap = document.createElement("div");
            (L.notif_sections||[]).forEach((sec)=>{
                const h = document.createElement("h4"); h.textContent = sec.title; wrap.appendChild(h);
                const chips = document.createElement("div"); chips.className = "chips";
                sec.items.forEach((it)=>{
                    const a = document.createElement("a"); a.href = it.url; a.target="_blank"; a.rel="noopener"; a.textContent = it.label;
                    chips.appendChild(a);
                });
                wrap.appendChild(chips);
            });
            return wrap;
        });
    });

    // Start
    setLang(langInit());
    const start = (location.hash.match(/tab=([a-z]+)/i) || [])[1];
    setActive(start && registry.has(start) ? start : "jobs");
}
