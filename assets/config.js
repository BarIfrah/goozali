// === Tabs (ברירת מחדל: עברית) ===
export const TABS = [
    {
        key: "jobs",
        title: "משרות פתוחות - היי טק",
        desc: "מאגר משרות עדכני עם סינון לפי תחום/אזור",
        embeds: [
            { label: "Grid", url: "https://airtable.com/embed/appwewqLk7iUY4azc/shrQBuWjXd0YgPqV6?backgroundColor=cyan&viewControls=on" },
        ],
        actions: [{ id: "text16", label: "להוסיף משרה חדשה", hash: "#headdjobopening" }],
    },
    {
        key: "candidates",
        title: "רשימת מחפשי עבודה - היי טק",
        desc: "מועמדים שמחפשים את האתגר הבא",
        embeds: [
            { label: "Grid", url: "https://airtable.com/embed/app5sYJyDgcRbJWYU/shr97tl6luEk4Ca9R?backgroundColor=green&viewControls=on" },
        ],
        actions: [{ id: "addcandidate-text", label: "הרשמה", hash: "#addcandidate" }],
    },
    {
        key: "companies",
        title: "רשימת חברות הייטק וסטארטאפים בארץ",
        desc: "חברות שמגייסות + דפי קריירה",
        embeds: [
            { label: "Grid", url: "https://airtable.com/embed/app7OQjqEzTtCRq7u/shrNtlFxOG2ag1kyB/tblBQjp5Aw6O172VY?viewControls=on" },
        ],
        actions: [{ id: "addcompany-text", label: "להוסיף חברה", hash: "#addcompany" }],
    },
    {
        key: "salary",
        title: "טווחי שכר",
        desc: "טווחי שכר משותפים מהקהילה",
        embeds: [
            { label: "Grid", url: "https://airtable.com/embed/appbj4LvHBRCdL9g0/shrcsQUoXDtZo2sCs/tblu59uMIbSviV6By?viewControls=on" },
        ],
    },
    {
        key: "groups",
        title: "קהילות, קבוצות ולוחות דרושים",
        desc: "הצטרפות לקבוצות טלגרם לפי תחום/אזור",
        embeds: [
            { label: "Grid", url: "https://airtable.com/embed/appeRRSAgnVegTIke/shrAOxwTNWPActhkG/tblG5PNUXzDqsRKxx?viewControls=on" },
        ],
        actions: [{ id: "addlink-text", label: "להוסיף קישור חדש", hash: "#addlink" }],
    },
    {
        key: "helpers",
        title: "הייטקיסטים מקסימים עוזרים למילואימניקים ומחפשי עבודה",
        desc: "מתנדבים מהקהילה שמציעים חונכות, סימולציות ריאיון, עזרה בקו״ח ועוד.",
        embeds: [
            { label: "Grid", url: "https://airtable.com/embed/appQbwA4PAIsbGeIA/shr3VNQ2cfq7l78m1/tblGw8hXilG5tbLns?viewControls=on" },
        ],
        actions: [{ id: "helpout-text", label: "להציע עזרה", hash: "#helpout" }],
    },
    {
        key: "help",
        title: "איך לחפש משרות ביעילות",
        desc: "מדריך, סרטוני הסבר וקישורים חשובים",
        embeds: [
            { label: "Video 1", url: "https://drive.google.com/file/d/1_RVB1tScAW9fLUgiEHU9NfzyTUjMDHaU/view?usp=sharing" },
            { label: "Video 2", url: "https://drive.google.com/file/d/1BuywRrBQLB4h7__d6KLnWtvtY3Bud3Ex/view?usp=sharing" },
        ],
    },
];

// === אמבדים באנגלית (כשהשפה EN נטען מכאן) ===
export const EMBED_OVERRIDES = {
    en: {
        jobs:       [{ label: "Grid", url: "https://airtable.com/embed/appwewqLk7iUY4azc/shrVJ0Ia4sR1UZkkX?backgroundColor=cyan" }],
        candidates: [{ label: "Grid", url: "https://airtable.com/embed/app5sYJyDgcRbJWYU/shrRl6JFQGzZtgMyo?backgroundColor=green" }],
        companies:  [{ label: "Grid", url: "https://airtable.com/embed/app7OQjqEzTtCRq7u/shr3k4MXLv5UYipVm?backgroundColor=purple" }],
        groups:     [{ label: "Grid", url: "https://airtable.com/embed/appeRRSAgnVegTIke/shrC7lCY0dAPEdPIr?backgroundColor=cyan" }],
        // באנגלית ביקשת שה-helpers יציג את הטופס עצמו
        helpers:    [{ label: "Form", url: "https://airtable.com/embed/appQbwA4PAIsbGeIA/pag1M4VTMQOcStiWy/form" }],
    }
};

// === טפסים (עברית ברירת מחדל) ===
export const HASH_FORMS = {
    headdjobopening: "https://airtable.com/embed/shrhpo5jJMDQ6X8N6?backgroundColor=cyan",
    addcandidate:    "https://airtable.com/embed/app5sYJyDgcRbJWYU/shrwNZfUuCDh5r8uc?backgroundColor=green",
    addcompany:      "https://airtable.com/embed/app7OQjqEzTtCRq7u/shrl9rEgpW8FysqSo?backgroundColor=purple",
    helpout:         "https://airtable.com/embed/appQbwA4PAIsbGeIA/pagDaZTpRN953CEhC/form",
    addlink:         "https://airtable.com/embed/appeRRSAgnVegTIke/shrqYaTjpsiZ3R5Zv?backgroundColor=cyan",
};

// === טפסים לפי שפה (כעת יש לנו לינק אנגלי ל-helpout) ===
export const HASH_FORMS_BY_LANG = {
    en: {
        helpout: "https://airtable.com/embed/appQbwA4PAIsbGeIA/pag1M4VTMQOcStiWy/form",
    },
    he: { ...HASH_FORMS },
};

// === טקסטים + קבוצות טלגרם במודאל הנוטיפיקציות ===
export const STRINGS = {
    he: {
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
            helpers:{ title: "הייטקיסטים מקסימים עוזרים למילואימניקים ומחפשי עבודה", desc: "מתנדבים מהקהילה שמציעים חונכות, סימולציות ריאיון, עזרה בקו״ח ועוד." },
            help: { title: "איך לחפש משרות ביעילות", desc: "מדריך, סרטוני הסבר וקישורים חשובים" },
        },
        actions: {
            "text16": "להוסיף משרה חדשה",
            "addcandidate-text": "הרשמה",
            "addcompany-text": "להוסיף חברה",
            "addlink-text": "להוסיף קישור חדש",
            "helpout-text": "להציע עזרה",
        },
        open_in_new_tab: "פתח בטאב חדש",
        notif_modal_title: "קבל/י נוטיפיקציות",
        notif_sections: [
            {
                title: "לקבל נוטיפקציה למשרות ג׳וניור (0 שנות ניסיון תעסוקתי):",
                items: [{ label: "משרות ג׳וניור ללא ניסיון קודם", url: "https://t.me/hitechjobsjunior" }]
            },
            {
                title: "לקבל נוטיפקציה למשרות לפי אזור גאוגרפי:",
                items: [
                    { label: "משרות היי טק בירושלים והסביבה", url: "https://t.me/hitechjobsJerusalem" },
                    { label: "משרות היי טק בצפון הארץ",     url: "https://t.me/+YAPhl9UVzodhODBk" },
                    { label: "משרות היי טק בדרום הארץ",     url: "https://t.me/+xAIG_AuF_yY0Yjhk" },
                ]
            },
            {
                title: "לקבל נוטיפקציה למשרות לפי תחום:",
                items: [
                    { label: "משרות הנדסת תוכנה",                   url: "https://t.me/hitechjobsisrael" },
                    { label: "משרות AI דאטה סיינס, ML ואלגו",      url: "https://t.me/hitechjobsdatascience" },
                    { label: "משרות דאטה אנליסט",                  url: "https://t.me/hitechjobsdata" },
                    { label: "משרות Frontend פיתוח פרונטאנד",      url: "https://t.me/+CwDWQuAZC_owODc0" },
                    { label: "משרות פיתוח Mobile Dev מובייל",      url: "https://t.me/+5nK1fQiqLO1iZDI0" },
                    { label: "משרות DevOps דבאופס",                url: "https://t.me/+qm6-8JjvLP1jNTM0" },
                    { label: "משרות QA בהיי טק",                   url: "https://t.me/hitechjobsQA" },
                    { label: "משרות Low Level, Firmware ואמבדד",   url: "https://t.me/+4CQf4ZSW2G1lMmZk" },
                    { label: "משרות Hardware הנדסת חומרה",         url: "https://t.me/hitechjobshardware" },
                    { label: "משרות Mechanical Eng הנדסת מערכות",  url: "https://t.me/+QRH1Im0COLdkOGE0" },
                    { label: "משרות System Eng הנדסת מכונות",      url: "https://t.me/+HWGyk6VEScc1Y2E0" },
                    { label: "משרות מכירות בהיי טק",               url: "https://t.me/hitechjobsales" },
                    { label: "משרות Customer Success",             url: "https://t.me/+GCaUjq-Fkuw2OGY8" },
                    { label: "משרות Cyber סייבר",                  url: "https://t.me/+qZBZ8YNwfPMxODI0" },
                    { label: "משרות IT וסיסטם",                    url: "https://t.me/+s_qhgZ45yDZiNGY0" },
                    { label: "משרות UI/UX ועיצוב",                 url: "https://t.me/+Q0phrVEqMpo3ODg8" },
                    { label: "משרות ניהול מוצר",                   url: "https://t.me/hitechjobsproduct" },
                    { label: "משרות Operations אופרציות",          url: "https://t.me/+nKYMWNw8IR04ODU0" },
                    { label: "משרות שיווק בהיי טק",                url: "https://t.me/hitechjobsmarketing" },
                    { label: "משרות HR וגיוס",                     url: "https://t.me/+CQFAUrZZ65UxYjFk" },
                    { label: "משרות Project Mgmt",                 url: "https://t.me/+CSl_I8hQADIwYzA8" },
                    { label: "משרות Finance",                       url: "https://t.me/+u9NEOqtvK7A0OWU0" },
                    { label: "משרות C-Level",                       url: "https://t.me/+e8hWNiEWn5NmZDU0" },
                    { label: "משרות BizDev",                        url: "https://t.me/+k1pq84oBHe45Yjg0" },
                    { label: "משרות Compliance & Legal",            url: "https://t.me/+UJj1drtpFmcwMTE0" },
                ]
            }
        ],
    },

    en: {
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
            helpers:{ title: "Helping Miluimnikim", desc: "Volunteers offering mentoring, mock interviews, CV help & more" },
            help: { title: "How to Job Search Efficiently", desc: "Guide, videos and important links" },
        },
        actions: {
            "text16": "Add Job Opening",
            "addcandidate-text": "Register",
            "addcompany-text": "Add Company",
            "addlink-text": "Add Link",
            "helpout-text": "Offer Help",
        },
        open_in_new_tab: "Open in new tab",
        notif_modal_title: "Get job notifications",
        notif_sections: [
            {
                title: "Junior (0 years experience):",
                items: [{ label: "Junior roles — no experience", url: "https://t.me/hitechjobsjunior" }]
            },
            {
                title: "By region:",
                items: [
                    { label: "Jerusalem & area",  url: "https://t.me/hitechjobsJerusalem" },
                    { label: "Northern Israel",   url: "https://t.me/+YAPhl9UVzodhODBk" },
                    { label: "Southern Israel",   url: "https://t.me/+xAIG_AuF_yY0Yjhk" },
                ]
            },
            {
                title: "By domain:",
                items: [
                    { label: "Software Engineering",            url: "https://t.me/hitechjobsisrael" },
                    { label: "AI / Data Science / ML / Algo",   url: "https://t.me/hitechjobsdatascience" },
                    { label: "Data Analyst",                    url: "https://t.me/hitechjobsdata" },
                    { label: "Frontend",                        url: "https://t.me/+CwDWQuAZC_owODc0" },
                    { label: "Mobile Development",              url: "https://t.me/+5nK1fQiqLO1iZDI0" },
                    { label: "DevOps",                          url: "https://t.me/+qm6-8JjvLP1jNTM0" },
                    { label: "QA / Testing",                    url: "https://t.me/hitechjobsQA" },
                    { label: "Low-level / Firmware / Embedded", url: "https://t.me/+4CQf4ZSW2G1lMmZk" },
                    { label: "Hardware Engineering",            url: "https://t.me/hitechjobshardware" },
                    { label: "Mechanical Engineering",          url: "https://t.me/+QRH1Im0COLdkOGE0" },
                    { label: "System Engineering",              url: "https://t.me/+HWGyk6VEScc1Y2E0" },
                    { label: "Sales",                           url: "https://t.me/hitechjobsales" },
                    { label: "Customer Success",                url: "https://t.me/+GCaUjq-Fkuw2OGY8" },
                    { label: "Cyber / Security",                url: "https://t.me/+qZBZ8YNwfPMxODI0" },
                    { label: "IT / SysAdmin",                   url: "https://t.me/+s_qhgZ45yDZiNGY0" },
                    { label: "UI/UX & Design",                  url: "https://t.me/+Q0phrVEqMpo3ODg8" },
                    { label: "Product Management",              url: "https://t.me/hitechjobsproduct" },
                    { label: "Operations",                      url: "https://t.me/+nKYMWNw8IR04ODU0" },
                    { label: "Marketing",                       url: "https://t.me/hitechjobsmarketing" },
                    { label: "HR & Recruiting",                 url: "https://t.me/+CQFAUrZZ65UxYjFk" },
                    { label: "Project Management",              url: "https://t.me/+CSl_I8hQADIwYzA8" },
                    { label: "Finance",                         url: "https://t.me/+u9NEOqtvK7A0OWU0" },
                    { label: "C-Level",                         url: "https://t.me/+e8hWNiEWn5NmZDU0" },
                    { label: "Business Development",            url: "https://t.me/+k1pq84oBHe45Yjg0" },
                    { label: "Compliance & Legal",              url: "https://t.me/+UJj1drtpFmcwMTE0" },
                ]
            }
        ],
    },
};
