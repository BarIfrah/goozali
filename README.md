# Goozali Frontend (Static)

דף נחיתה + כרטיסיות (Tabs) שמציגות אמבדים (Airtable/Google וכו') בתוך iframes (טעינה עצלה), וטפסים נפתחים במודאל.
מוכן לפתיחה מקומית, ללא שרת/דיפלוי.

## שימוש
- פתחו את `index.html` בדפדפן או דרך WebStorm (Open in Browser).
- ערכו את `assets/app.js` → מערך `TABS` (אל תשנו את ה-`key`ים: jobs/candidates/companies/salary/groups/help).
- Airtable `shr...` מומר אוטומטית ל-`/embed/shr...`.

## מבנה קבוע (חוזה אינטגרציה)
ראו `integration-contract.json` לעוגני DOM ומפתחות ניווט.
