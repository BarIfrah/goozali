// 1) הטבלאות — קבועות לכל שפה
export const EMBEDS = {
    jobs: [
        "https://airtable.com/embed/appwewqLk7iUY4azc/shrQBuWjXd0YgPqV6?backgroundColor=cyan&viewControls=on",
    ],
    candidates: [
        "https://airtable.com/embed/app5sYJyDgcRbJWYU/shr97tl6luEk4Ca9R?backgroundColor=green&viewControls=on",
    ],
    companies: [
        "https://airtable.com/embed/app7OQjqEzTtCRq7u/shrNtlFxOG2ag1kyB/tblBQjp5Aw6O172VY?viewControls=on",
    ],
    salary: [
        "https://airtable.com/embed/appbj4LvHBRCdL9g0/shrcsQUoXDtZo2sCs/tblu59uMIbSviV6By?viewControls=on",
    ],
    groups: [
        "https://airtable.com/embed/appeRRSAgnVegTIke/shrAOxwTNWPActhkG/tblG5PNUXzDqsRKxx?viewControls=on",
    ],
    helpers: [
        // תמיד טבלה (Grid) — לא טופס
        "https://airtable.com/embed/appQbwA4PAIsbGeIA/shr3VNQ2cfq7l78m1/tblGw8hXilG5tbLns?viewControls=on",
    ],
    help: [
        "https://drive.google.com/file/d/1_RVB1tScAW9fLUgiEHU9NfzyTUjMDHaU/view?usp=sharing",
        "https://drive.google.com/file/d/1BuywRrBQLB4h7__d6KLnWtvtY3Bud3Ex/view?usp=sharing",
    ],
};

// 2) הטפסים — לפי שפה (אם יש לך קישורים אנגליים גם ל־addcompany/… נכניס כאן)
export const FORMS = {
    he: {
        headdjobopening: "https://airtable.com/embed/shrhpo5jJMDQ6X8N6?backgroundColor=cyan",
        addcandidate:    "https://airtable.com/embed/app5sYJyDgcRbJWYU/shrwNZfUuCDh5r8uc?backgroundColor=green",
        addcompany:      "https://airtable.com/embed/app7OQjqEzTtCRq7u/shrl9rEgpW8FysqSo?backgroundColor=purple",
        addlink:         "https://airtable.com/embed/appeRRSAgnVegTIke/shrqYaTjpsiZ3R5Zv?backgroundColor=cyan",
        helpout:         "https://airtable.com/embed/appQbwA4PAIsbGeIA/pagDaZTpRN953CEhC/form",
    },
    en: {
        headdjobopening: "https://airtable.com/embed/appwewqLk7iUY4azc/shrVJ0Ia4sR1UZkkX?backgroundColor=cyan",
        addcandidate:    "https://airtable.com/embed/app5sYJyDgcRbJWYU/shrRl6JFQGzZtgMyo?backgroundColor=green",
        addcompany:      "https://airtable.com/embed/app7OQjqEzTtCRq7u/shr3k4MXLv5UYipVm?backgroundColor=purple",
        addlink:         "https://airtable.com/embed/appeRRSAgnVegTIke/shrC7lCY0dAPEdPIr?backgroundColor=cyan",
        helpout:         "https://airtable.com/embed/appQbwA4PAIsbGeIA/pag1M4VTMQOcStiWy/form",
    },
};

// 3) תרגומים
export const STRINGS = {
    he: {
        lang: "he",
        hero_h1: "הבית של רשימות ההייטק השימושיות—בממשק נקי ונוח",
        hero_p: "משרות, חברות, טווחי שכר והקהילות—הכל מפה.",
        cta_find: "מצא/י משרה",
        cta_notif: "קבל/י נוטיפיקציות",
        cta_cv: "צור/י קו״ח ב-tech-cv",
        open_in_new_tab: "פתח בטאב חדש",
        tabsTitles: {
            help: "איך לחפש משרות ביעילות",
            helpers: "הייטקיסטים מקסימים עוזרים למילואימניקים ומחפשי עבודה",
            groups: "קהילות, קבוצות ולוחות דרושים",
            salary: "טווחי שכר",
            companies: "רשימת חברות הייטק וסטארטאפים בארץ",
            candidates: "רשימת מחפשי עבודה - היי טק",
            jobs: "משרות פתוחות - היי טק",
        },
        tabsDesc: {
            jobs: "מאגר משרות עדכני עם סינון לפי תחום/אזור",
            candidates: "מועמדים שמחפשים את האתגר הבא",
            companies: "חברות שמגייסות + דפי קריירה",
            salary: "טווחי שכר משותפים מהקהילה",
            groups: "הצטרפות לקבוצות טלגרם לפי תחום/אזור",
            helpers: "מתנדבים שמציעים חונכות, סימולציות ריאיון, עזרה בקו״ח ועוד.",
            help: "מדריך, סרטוני הסבר וקישורים חשובים",
        },
        actions: {
            "text16": "להוסיף משרה חדשה",
            "addcandidate-text": "הרשמה",
            "addcompany-text": "להוסיף חברה",
            "addlink-text": "להוסיף קישור חדש",
            "helpout-text": "להציע עזרה",
        },
    },

    en: {
        lang: "en",
        hero_h1: "The home of practical tech lists — clean and easy",
        hero_p: "Jobs, companies, salary ranges and communities — all in one place.",
        cta_find: "Find a job",
        cta_notif: "Get notifications",
        cta_cv: "Create a resume on tech-cv",
        open_in_new_tab: "Open in new tab",
        tabsTitles: {
            help: "How to Job Search Efficiently",
            helpers: "Helping Miluimnikim",
            groups: "Communities, Groups & Job Boards",
            salary: "Salary Ranges",
            companies: "Israeli Tech Companies & Startups",
            candidates: "Job Seekers — Tech",
            jobs: "Open Tech Jobs",
        },
        tabsDesc: {
            jobs: "Fresh jobs with filters by domain/region",
            candidates: "Candidates looking for their next challenge",
            companies: "Hiring companies + career pages",
            salary: "Crowdsourced ranges from the community",
            groups: "Join Telegram groups by domain/region",
            helpers: "Volunteers offering mentoring, mock interviews, CV help & more",
            help: "Guide, videos and important links",
        },
        actions: {
            "text16": "Add Job Opening",
            "addcandidate-text": "Register",
            "addcompany-text": "Add Company",
            "addlink-text": "Add Link",
            "helpout-text": "Offer Help",
        },
    },
};

// סדר קבוע של הכרטיסיות (כדי שלא יזוזו בשינוי שפה)
export const TAB_ORDER = ["help","helpers","groups","salary","companies","candidates","jobs"];
