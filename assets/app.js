// Keep globals minimal
if (window.__GZL_INIT__) {
    // prevent double init if the script is injected twice
} else {
    window.__GZL_INIT__ = true;

    /* ---------- CONFIG ---------- */
    const TABS = [
        {
            key: "jobs",
            title: "משרות פתוחות - היי טק",
            desc: "מאגר משרות עדכני עם סינון לפי תחום/אזור",
            embeds: [
                {
                    label: "Grid",
                    url: "https://airtable.com/embed/appwewqLk7iUY4azc/shrQBuWjXd0YgPqV6?backgroundColor=cyan&viewControls=on",
                },
            ],
            actions: [{ id: "text16", label: "להוסיף משרה חדשה", hash: "#headdjobopening" }],
        },
        {
            key: "candidates",
            title: "רשימת מחפשי עבודה - היי טק",
            desc: "מועמדים שמחפשים את האתגר הבא",
            embeds: [
                {
                    label: "Grid",
                    url: "https://airtable.com/embed/app5sYJyDgcRbJWYU/shr97tl6luEk4Ca9R?backgroundColor=green&viewControls=on",
                },
            ],
            actions: [{ id: "addcandidate-text", label: "הרשמה", hash: "#addcandidate" }],
        },
        {
            key: "companies",
            title: "רשימת חברות הייטק וסטארטאפים בארץ",
            desc: "חברות שמגייסות + דפי קריירה",
            embeds: [
                {
                    label: "Grid",
                    url: "https://airtable.com/embed/app7OQjqEzTtCRq7u/shrNtlFxOG2ag1kyB/tblBQjp5Aw6O172VY?viewControls=on",
                },
            ],
            actions: [{ id: "addcompany-text", label: "להוסיף חברה", hash: "#addcompany" }],
        },
        {
            key: "salary",
            title: "טווחי שכר",
            desc: "טווחי שכר משותפים מהקהילה",
            embeds: [
                {
                    label: "Grid",
                    url: "https://airtable.com/embed/appbj4LvHBRCdL9g0/shrcsQUoXDtZo2sCs/tblu59uMIbSviV6By?viewControls=on",
                },
            ],
        },
        {
            key: "groups",
            title: "קהילות, קבוצות ולוחות דרושים",
            desc: "הצטרפות לקבוצות טלגרם לפי תחום/אזור",
            embeds: [
                {
                    label: "Grid",
                    url: "https://airtable.com/embed/appeRRSAgnVegTIke/shrAOxwTNWPActhkG/tblG5PNUXzDqsRKxx?viewControls=on",
                },
            ],
            actions: [{ id: "addlink-text", label: "להוסיף קישור חדש", hash: "#addlink" }],
        },
        {
            key: "helpers",
            title: "הייטקיסטים מקסימים עוזרים למילואימניקים ומחפשי עבודה",
            desc: "מתנדבים מהקהילה שמציעים חונכות, סימולציות ריאיון, עזרה בקו״ח ועוד.",
            embeds: [
                {
                    label: "Grid",
                    url: "https://airtable.com/embed/appQbwA4PAIsbGeIA/shr3VNQ2cfq7l78m1/tblGw8hXilG5tbLns?viewControls=on",
                },
            ],
            actions: [{ id: "helpout-text", label: "להציע עזרה", hash: "#helpout" }],
        },
        {
            key: "help",
            title: "איך לחפש משרות ביעילות",
            desc: "מדריך, סרטוני הסבר וקישורים חשובים",
            embeds: [
                {
                    label: "Video 1",
                    url: "https://drive.google.com/file/d/1_RVB1tScAW9fLUgiEHU9NfzyTUjMDHaU/view?usp=sharing",
                },
                {
                    label: "Video 2",
                    url: "https://drive.google.com/file/d/1BuywRrBQLB4h7__d6KLnWtvtY3Bud3Ex/view?usp=sharing",
                },
            ],
        },
    ];

    const HASH_FORMS = {
        headdjobopening: "https://airtable.com/embed/shrhpo5jJMDQ6X8N6?backgroundColor=cyan",
        addcandidate: "https://airtable.com/embed/app5sYJyDgcRbJWYU/shrwNZfUuCDh5r8uc?backgroundColor=green",
        addcompany: "https://airtable.com/embed/app7OQjqEzTtCRq7u/shrl9rEgpW8FysqSo?backgroundColor=purple",
        helpout: "https://airtable.com/appQbwA4PAIsbGeIA/pagDaZTpRN953CEhC/form",
        addlink: "https://airtable.com/embed/appeRRSAgnVegTIke/shrqYaTjpsiZ3R5Zv?backgroundColor=cyan",
    };

    /* ---------- UTIL ---------- */
    const $ = (sel, root = document) => root.querySelector(sel);
    const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
    const normalizeEmbeds = (embeds) => (embeds || []).map((e) => (typeof e === "string" ? { label: "Grid", url: e } : e));
    function toEmbed(u) {
        try {
            const x = new URL(u);
            if (x.hostname.includes("airtable.com")) {
                if (x.pathname.startsWith("/shr")) x.pathname = "/embed" + x.pathname;
                if (!x.searchParams.has("viewControls")) x.searchParams.set("viewControls", "off");
                return x.toString();
            }
            return u;
        } catch {
            return u;
        }
    }

    /* ---------- MODAL ---------- */
    const backdrop = $("#gzl-backdrop");
    const modal = backdrop.querySelector(".modal");
    const mframe = $("#gzl-miframe");
    const mclose = $("#gzl-close");
    const mfallback = $("#gzl-fallback");
    const mhtml = $("#gzl-modal-html");

    function openForm(url, title) {
        mhtml.style.display = "none";
        mframe.style.display = "block";
        mfallback.style.display = "block";
        $("#gzlModalTitle").textContent = title || "טופס";
        mframe.src = url;
        mfallback.href = url;
        backdrop.style.display = "flex";
        requestAnimationFrame(() => modal.classList.add("open"));
        backdrop.setAttribute("aria-hidden", "false");
    }
    function openHtml(title, nodesFactory) {
        mframe.src = "about:blank";
        mframe.style.display = "none";
        mfallback.style.display = "none";
        mhtml.innerHTML = "";
        const node = nodesFactory && nodesFactory();
        if (node) mhtml.appendChild(node);
        mhtml.style.display = "block";
        $("#gzlModalTitle").textContent = title || "";
        backdrop.style.display = "flex";
        requestAnimationFrame(() => modal.classList.add("open"));
        backdrop.setAttribute("aria-hidden", "false");
    }
    function closeForm() {
        modal.classList.remove("open");
        backdrop.setAttribute("aria-hidden", "true");
        setTimeout(() => {
            backdrop.style.display = "none";
            mframe.src = "about:blank";
        }, 160);
    }
    backdrop.addEventListener("click", (e) => { if (e.target === backdrop) closeForm(); });
    mclose.addEventListener("click", closeForm);
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && backdrop.getAttribute("aria-hidden") === "false") closeForm(); });

    // Intercept anchors that map to our form hashes
    document.addEventListener("click", (e) => {
        const a = e.target.closest('a[href^="#"]');
        if (!a) return;
        const key = a.getAttribute("href").slice(1);
        if (HASH_FORMS[key]) {
            e.preventDefault();
            openForm(HASH_FORMS[key], a.textContent?.trim() || "טופס");
        }
    });

    // Intercept external forms (Typeform/Airtable/Google Forms) into the modal
    const FORM_HOSTS_RE = /(forms\.gle|docs\.google\.com\/forms|airtable\.com\/(sh|app)|typeform\.com)/i;
    document.addEventListener("click", (e) => {
        const a = e.target.closest("a[href]");
        if (!a) return;
        const url = a.href;
        if (FORM_HOSTS_RE.test(url)) {
            if (a.getAttribute("href")?.startsWith("#")) return;
            e.preventDefault();
            openForm(url, a.textContent?.trim() || "טופס");
        }
    });

    /* ---------- BUILD TABS ---------- */
    const tabbar = $("#gzl-tabbar");
    const panelsHost = $("#gzl-panels");
    const registry = new Map();

    TABS.forEach((t) => {
        const b = document.createElement("button");
        b.className = "tab";
        b.setAttribute("role", "tab");
        b.setAttribute("aria-selected", "false");
        b.dataset.key = t.key;
        b.textContent = t.title;
        tabbar.appendChild(b);

        const p = document.createElement("section");
        p.className = "panel";
        p.id = `panel-${t.key}`;
        p.setAttribute("role", "tabpanel");
        p.dataset.active = "false";
        panelsHost.appendChild(p);

        registry.set(t.key, { btn: b, panel: p, tab: t });
    });

    function fillPanel(entry) {
        const { panel, tab } = entry;
        panel.innerHTML = "";

        const d = panel.dataset.l10nDesc || tab.desc;
        if (d) {
            const p = document.createElement("p");
            p.className = "note";
            p.textContent = d;
            panel.appendChild(p);
        }

        if (tab.actions && tab.actions.length) {
            const wrap = document.createElement("div");
            wrap.className = "actions";
            tab.actions.forEach((act) => {
                const par = document.createElement("p");
                if (act.id) par.id = act.id;
                const a = document.createElement("a");
                a.className = "action-btn";
                a.textContent = act.label || "פעולה";
                if (act.hash) a.href = act.hash;
                else if (act.url) a.href = act.url;
                if (act.url && /^https?:/.test(act.url)) a.target = "_blank";
                par.appendChild(a);
                wrap.appendChild(par);
            });
            panel.appendChild(wrap);
        }

        const views = normalizeEmbeds(tab.embeds);
        if (views.length) {
            const bar = document.createElement("div");
            bar.className = "viewbar";
            const left = document.createElement("div");
            left.className = "left";
            const right = document.createElement("div");
            right.className = "right";
            bar.appendChild(left);
            bar.appendChild(right);

            const iframe = document.createElement("iframe");
            iframe.className = "iframe";
            iframe.loading = "lazy";
            iframe.referrerPolicy = "no-referrer-when-downgrade";

            function setView(i) {
                iframe.src = toEmbed(views[i].url);
                left.querySelectorAll(".viewbtn").forEach((bb, idx) => bb.setAttribute("aria-pressed", idx === i ? "true" : "false"));
                openNew.href = iframe.src;
            }

            views.forEach((v, idx) => {
                const btn = document.createElement("button");
                btn.type = "button";
                btn.className = "viewbtn";
                btn.textContent = v.label || "View " + (idx + 1);
                btn.setAttribute("aria-pressed", idx === 0 ? "true" : "false");
                btn.addEventListener("click", () => setView(idx));
                left.appendChild(btn);
            });

            const openNew = document.createElement("a");
            openNew.textContent = "פתח בטאב חדש";
            right.appendChild(openNew);

            panel.appendChild(bar);
            panel.appendChild(iframe);
            setView(0);
        }
    }

    function setActive(key) {
        registry.forEach((entry, k) => {
            const on = k === key;
            entry.btn.setAttribute("aria-selected", on ? "true" : "false");
            entry.panel.dataset.active = on ? "true" : "false";
            if (on) fillPanel(entry);
        });
        const u = new URL(location.href);
        if (key) u.hash = "tab=" + key;
        else u.hash = "";
        history.replaceState(null, "", u.toString());
    }

    tabbar.addEventListener("click", (e) => {
        const b = e.target.closest(".tab");
        if (!b) return;
        setActive(b.dataset.key);
    });

    // Handle hash-based navigation (tab=xxx)
    window.addEventListener("hashchange", () => {
        const m = /tab=([a-z]+)/i.exec(location.hash || "");
        const k = m ? m[1] : null;
        if (!k || registry.has(k)) setActive(k || null);
    });

    /* ---------- I18N ---------- */
    const STRINGS = {
        he: {
            dir: "rtl",
            lang: "he",
            hero_h1: "הבית של רשימות ההייטק השימושיות—בממשק נקי ונוח",
            hero_p: "משרות, חברות, טווחי שכר והקהילות—הכל מפה.",
            cta_find: "מצא/י משרה",
            cta_notif: "קבל/י נוטיפיקציות",
            cta_cv: "צור/י קו״ח ב-tech-cv",
            tabs: {
                jobs: { title: "משרות פתוחות - היי טק", desc: "מאגר משרות עדכני עם סינון לפי תחום/אזור" },
                candidates: { title: "רשימת מחפשי עבודה - היי טק", desc: "מועמדים שמחפשים את האתגר הבא" },
                companies: { title: "רשימת חברות הייטק וסטארטאפים בארץ", desc: "חברות שמגייסות + דפי קריירה" },
                salary: { title: "טווחי שכר", desc: "טווחי שכר משותפים מהקהילה" },
                groups: { title: "קהילות, קבוצות ולוחות דרושים", desc: "הצטרפות לקבוצות טלגרם לפי תחום/אזור" },
                helpers: {
                    title: "הייטקיסטים מקסימים עוזרים למילואימניקים ומחפשי עבודה",
                    desc: "מתנדבים מהקהילה שמציעים חונכות, סימולציות ריאיון, עזרה בקו״ח ועוד.",
                },
                help: { title: "איך לחפש משרות ביעילות", desc: "מדריך, סרטוני הסבר וקישורים חשובים" },
            },
        },
        en: {
            dir: "ltr",
            lang: "en",
            hero_h1: "The home of practical tech lists — clean and easy",
            hero_p: "Jobs, companies, salary ranges and communities — all in one place.",
            cta_find: "Find a job",
            cta_notif: "Get notifications",
            cta_cv: "Create a resume on tech-cv",
            tabs: {
                jobs: { title: "Open Tech Jobs", desc: "Fresh jobs with filters by domain/region" },
                candidates: { title: "Job Seekers — Tech", desc: "Candidates looking for their next challenge" },
                companies: { title: "Israeli Tech Companies & Startups", desc: "Hiring companies + career pages" },
                salary: { title: "Salary Ranges", desc: "Crowdsourced ranges from the community" },
                groups: { title: "Communities, Groups & Job Boards", desc: "Join Telegram groups by domain/region" },
                helpers: {
                    title: "Awesome Tech Folks Helping Reservists & Job Seekers",
                    desc: "Volunteers offering mentoring, mock interviews, CV help & more",
                },
                help: { title: "How to Job Search Efficiently", desc: "Guide, videos and important links" },
            },
        },
    };

    function setLang(lang) {
        const L = STRINGS[lang] || STRINGS.he;
        document.documentElement.setAttribute("dir", L.dir);
        document.documentElement.setAttribute("lang", L.lang);
        $("#gzl-hero h1").textContent = L.hero_h1;
        $("#gzl-hero p").textContent = L.hero_p;
        const ctas = $$("#gzl-hero .cta a");
        if (ctas[0]) ctas[0].textContent = L.cta_find;
        if (ctas[1]) ctas[1].textContent = L.cta_notif;
        if (ctas[2]) ctas[2].textContent = L.cta_cv;

        registry.forEach((entry, key) => {
            const t = L.tabs[key];
            if (t) entry.btn.textContent = t.title;
            entry.panel.dataset.l10nDesc = t ? t.desc : "";
            if (entry.panel.dataset.active === "true") fillPanel(entry);
        });

        localStorage.setItem("gzl_lang", lang);
        $("#gzl-lang").textContent = lang === "he" ? "EN" : "HE";
    }

    function langInit() {
        const qs = new URLSearchParams(location.search);
        const lg = qs.get("lang");
        if (lg) return lg.toLowerCase().startsWith("en") ? "en" : "he";
        const ls = localStorage.getItem("gzl_lang");
        return ls || "he";
    }

    // Toggle language
    $("#gzl-lang")?.addEventListener("click", () => {
        const cur = document.documentElement.getAttribute("lang") === "en" ? "en" : "he";
        setLang(cur === "he" ? "en" : "he");
    });

    /* ---------- NOTIFICATIONS MODAL ---------- */
    const NOTIF_SECTIONS_HE = [
        { title: "לקבל נוטיפקציה למשרות ג׳וניור (0 שנות ניסיון תעסוקתי):", items: [
                { label: "משרות ג׳וניור ללא ניסיון קודם", url: "https://t.me/hitechjobsjunior" }
            ]},
        { title: "לקבל נוטיפקציה למשרות לפי אזור גאוגרפי:", items: [
                { label: "משרות היי טק בירושלים והסביבה", url: "https://t.me/hitechjobsJerusalem" },
                { label: "משרות היי טק בצפון הארץ", url: "https://t.me/+YAPhl9UVzodhODBk" },
                { label: "משרות היי טק בדרום הארץ", url: "https://t.me/+xAIG_AuF_yY0Yjhk" }
            ]},
        { title: "לקבל נוטיפקציה למשרות לפי תחום:", items: [
                { label: "משרות הנדסת תוכנה", url: "https://t.me/hitechjobsisrael" },
                { label: "משרות AI דאטה סיינס, ML ואלגו", url: "https://t.me/hitechjobsdatascience" },
                { label: "משרות דאטה אנליסט", url: "https://t.me/hitechjobsdata" },
                { label: "משרות Frontend פיתוח פרונטאנד", url: "https://t.me/+CwDWQuAZC_owODc0" },
                { label: "משרות פיתוח Mobile Dev מובייל", url: "https://t.me/+5nK1fQiqLO1iZDI0" },
                { label: "משרות DevOps דבאופס", url: "https://t.me/+qm6-8JjvLP1jNTM0" },
                { label: "משרות QA בהיי טק", url: "https://t.me/hitechjobsQA" },
                { label: "משרות Low Level, Firmware ואמבדד", url: "https://t.me/+4CQf4ZSW2G1lMmZk" },
                { label: "משרות Hardware הנדסת חומרה", url: "https://t.me/hitechjobshardware" },
                { label: "משרות Mechanical Eng הנדסת מערכות", url: "https://t.me/+QRH1Im0COLdkOGE0" },
                { label: "משרות System Eng הנדסת מכונות", url: "https://t.me/+HWGyk6VEScc1Y2E0" },
                { label: "משרות מכירות בהיי טק", url: "https://t.me/hitechjobsales" },
                { label: "משרות הצלחת לקוחות Customer Success", url: "https://t.me/+GCaUjq-Fkuw2OGY8" },
                { label: "משרות Cyber סייבר", url: "https://t.me/+qZBZ8YNwfPMxODI0" },
                { label: "משרות IT וסיסטם", url: "https://t.me/+s_qhgZ45yDZiNGY0" },
                { label: "משרות UI/UX ועיצוב", url: "https://t.me/+Q0phrVEqMpo3ODg8" },
                { label: "משרות ניהול מוצר", url: "https://t.me/hitechjobsproduct" },
                { label: "משרות Operations אופרציות", url: "https://t.me/+nKYMWNw8IR04ODU0" },
                { label: "משרות שיווק בהיי טק", url: "https://t.me/hitechjobsmarketing" },
                { label: "משרות HR וגיוס", url: "https://t.me/+CQFAUrZZ65UxYjFk" },
                { label: "משרות Project Mgmt ניהול פרוייקטים", url: "https://t.me/+CSl_I8hQADIwYzA8" },
                { label: "משרות Finance כספים בהיי טק", url: "https://t.me/+u9NEOqtvK7A0OWU0" },
                { label: "משרות C-Level בהיי טק", url: "https://t.me/+e8hWNiEWn5NmZDU0" },
                { label: "משרות BizDev פיתוח עסקי בהיי טק", url: "https://t.me/+k1pq84oBHe45Yjg0" },
                { label: "משרות קומפליינס ו Legal ליגל בהיי טק", url: "https://t.me/+UJj1drtpFmcwMTE0" },
            ]},
    ];
    const NOTIF_SECTIONS_EN = [
        { title: "Junior (0 years experience):", items: [
                { label: "Junior roles — no experience", url: "https://t.me/hitechjobsjunior" }
            ]},
        { title: "By region:", items: [
                { label: "Jerusalem & area", url: "https://t.me/hitechjobsJerusalem" },
                { label: "Northern Israel", url: "https://t.me/+YAPhl9UVzodhODBk" },
                { label: "Southern Israel", url: "https://t.me/+xAIG_AuF_yY0Yjhk" },
            ]},
        { title: "By domain:", items: [
                { label: "Software Engineering", url: "https://t.me/hitechjobsisrael" },
                { label: "AI / Data Science / ML / Algo", url: "https://t.me/hitechjobsdatascience" },
                { label: "Data Analyst", url: "https://t.me/hitechjobsdata" },
                { label: "Frontend", url: "https://t.me/+CwDWQuAZC_owODc0" },
                { label: "Mobile Development", url: "https://t.me/+5nK1fQiqLO1iZDI0" },
                { label: "DevOps", url: "https://t.me/+qm6-8JjvLP1jNTM0" },
                { label: "QA / Testing", url: "https://t.me/hitechjobsQA" },
                { label: "Low-level / Firmware / Embedded", url: "https://t.me/+4CQf4ZSW2G1lMmZk" },
                { label: "Hardware Engineering", url: "https://t.me/hitechjobshardware" },
                { label: "Mechanical Engineering", url: "https://t.me/+QRH1Im0COLdkOGE0" },
                { label: "System Engineering", url: "https://t.me/+HWGyk6VEScc1Y2E0" },
                { label: "Sales", url: "https://t.me/hitechjobsales" },
                { label: "Customer Success", url: "https://t.me/+GCaUjq-Fkuw2OGY8" },
                { label: "Cyber / Security", url: "https://t.me/+qZBZ8YNwfPMxODI0" },
                { label: "IT / SysAdmin", url: "https://t.me/+s_qhgZ45yDZiNGY0" },
                { label: "UI/UX & Design", url: "https://t.me/+Q0phrVEqMpo3ODg8" },
                { label: "Product Management", url: "https://t.me/hitechjobsproduct" },
                { label: "Operations", url: "https://t.me/+nKYMWNw8IR04ODU0" },
                { label: "Marketing", url: "https://t.me/hitechjobsmarketing" },
                { label: "HR & Recruiting", url: "https://t.me/+CQFAUrZZ65UxYjFk" },
                { label: "Project Management", url: "https://t.me/+CSl_I8hQADIwYzA8" },
                { label: "Finance", url: "https://t.me/+u9NEOqtvK7A0OWU0" },
                { label: "C-Level", url: "https://t.me/+e8hWNiEWn5NmZDU0" },
                { label: "Business Development", url: "https://t.me/+k1pq84oBHe45Yjg0" },
                { label: "Compliance & Legal", url: "https://t.me/+UJj1drtpFmcwMTE0" },
            ]},
    ];

    // Open notifications modal (button in hero)
    $("#gzl-notif-cta")?.addEventListener("click", (e) => {
        e.preventDefault();
        const lang = document.documentElement.getAttribute("lang") === "en" ? "en" : "he";
        const sections = lang === "en" ? NOTIF_SECTIONS_EN : NOTIF_SECTIONS_HE;
        openHtml(lang === "en" ? "Get job notifications" : "קבל/י נוטיפיקציות", () => {
            const wrap = document.createElement("div");
            sections.forEach((sec) => {
                const h = document.createElement("h4");
                h.textContent = sec.title;
                wrap.appendChild(h);
                const chips = document.createElement("div");
                chips.className = "chips";
                sec.items.forEach((it) => {
                    const a = document.createElement("a");
                    a.href = it.url;
                    a.target = "_blank";
                    a.rel = "noopener";
                    a.textContent = it.label;
                    chips.appendChild(a);
                });
                wrap.appendChild(chips);
            });
            return wrap;
        });
    });

    /* ---------- START ---------- */
    // initial language
    setLang(langInit());
    // initial tab (hash -> tab=xxx) or default to jobs
    const start = (location.hash.match(/tab=([a-z]+)/i) || [])[1];
    setActive(start && registry.has(start) ? start : "jobs");
}
