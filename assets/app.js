/**
 * Goozali Frontend — Static, mobile-first, no backend needed
 * Tabs via hash (#tab=<key>), lazy iframes for embeds, forms open in modal
 */

// ====== CONFIG ======
const TABS = [
  {
    key: "jobs",
    title: "משרות פתוחות - היי טק",
    desc: "מאגר משרות עדכני עם סינון לפי תחום/אזור",
    embeds: [
      "https://airtable.com/shrQBuWjXd0YgPqV6"
    ],
  },
  {
    key: "candidates",
    title: "רשימת מחפשי עבודה - היי טק",
    desc: "מועמדים שמחפשים את האתגר הבא",
    embeds: [
      "https://airtable.com/shrAOxwTNWPActhkG"
    ],
  },
  {
    key: "companies",
    title: "רשימת חברות היי טק וסטארטאפים בארץ",
    desc: "חברות שמגייסות + דפי קריירה",
    embeds: [
      // הדבק/י כאן קישור share (Airtable/Google) אם קיים ציבורית
    ],
  },
  {
    key: "salary",
    title: "טווחי שכר",
    desc: "טווחי שכר משותפים מהקהילה",
    embeds: [
      // הדבק/י כאן קישור share (Airtable/Google) אם קיים ציבורית
    ],
  },
  {
    key: "groups",
    title: "קהילות, קבוצות ולוחות דרושים",
    desc: "הצטרפות לקבוצות טלגרם לפי תחום/אזור",
    embeds: [ ],
    telegram: [
      "https://t.me/hitechjobsjunior",
      "https://t.me/hitechjobsJerusalem",
      "https://t.me/+YAPhl9UVzodhODBk",
      "https://t.me/+xAIG_AuF_yY0Yjhk",
      "https://t.me/hitechjobsisrael",
      "https://t.me/hitechjobsdatascience",
      "https://t.me/hitechjobsdata",
      "https://t.me/+CwDWQuAZC_owODc0",
      "https://t.me/+5nK1fQiqLO1iZDI0",
      "https://t.me/+qm6-8JjvLP1jNTM0",
      "https://t.me/hitechjobsQA",
      "https://t.me/+4CQf4ZSW2G1lMmZk",
      "https://t.me/hitechjobshardware",
      "https://t.me/+QRH1Im0COLdkOGE0",
      "https://t.me/+HWGyk6VEScc1Y2E0",
      "https://t.me/hitechjobsales",
      "https://t.me/+GCaUjq-Fkuw2OGY8",
      "https://t.me/+qZBZ8YNwfPMxODI0",
      "https://t.me/+s_qhgZ45yDZiNGY0",
      "https://t.me/+Q0phrVEqMpo3ODg8",
      "https://t.me/hitechjobsproduct",
      "https://t.me/+nKYMWNw8IR04ODU0",
      "https://t.me/hitechjobsmarketing",
      "https://t.me/+CSl_I8hQADIwYzA8",
      "https://t.me/+u9NEOqtvK7A0OWU0",
      "https://t.me/+e8hWNiEWn5NmZDU0",
      "https://t.me/+k1pq84oBHe45Yjg0",
      "https://t.me/+UJj1drtpFmcwMTE0"
    ]
  },
  {
    key: "help",
    title: "איך לחפש משרות ביעילות",
    desc: "מדריך, סרטוני הסבר וקישורים חשובים",
    embeds: [
      "https://drive.google.com/file/d/1_RVB1tScAW9fLUgiEHU9NfzyTUjMDHaU/view?usp=sharing",
      "https://drive.google.com/file/d/1BuywRrBQLB4h7__d6KLnWtvtY3Bud3Ex/view?usp=sharing"
    ],
  },
];

const FORM_HOSTS_RE = /(forms\.gle|docs\.google\.com\/forms|airtable\.com\/(sh|app)|typeform\.com)/i;

function toEmbed(url) {
  try {
    const u = new URL(url);
    if (u.hostname.includes("airtable.com")) {
      if (u.pathname.startsWith("/embed/")) return url;
      if (u.pathname.startsWith("/shr")) {
        u.pathname = "/embed" + u.pathname;
        return u.toString();
      }
    }
    return url;
  } catch { return url; }
}

// ====== BUILD UI ======
const tabbar = document.getElementById("gzl-tabbar");
const panelsHost = document.getElementById("gzl-panels");
const registry = new Map();

TABS.forEach(t => {
  const btn = document.createElement("button");
  btn.className = "tab";
  btn.setAttribute("role", "tab");
  btn.setAttribute("aria-selected", "false");
  btn.dataset.key = t.key;
  btn.textContent = t.title;
  tabbar.appendChild(btn);

  const panel = document.createElement("section");
  panel.className = "panel";
  panel.id = `panel-${t.key}`;
  panel.setAttribute("role", "tabpanel");
  panel.dataset.active = "false";
  panel.dataset.loaded = "false";
  panelsHost.appendChild(panel);

  registry.set(t.key, { btn, panel, tab: t });
});

function fillPanel(entry) {
  const { panel, tab } = entry;
  if (panel.dataset.loaded === "true") return;
  if (tab.desc) {
    const p = document.createElement("p");
    p.className = "note";
    p.textContent = tab.desc;
    panel.appendChild(p);
  }
  if (tab.telegram && tab.telegram.length) {
    const chips = document.createElement("div");
    tab.telegram.forEach(u => {
      const a = document.createElement("a");
      a.href = u; a.target = "_blank"; a.rel = "noopener";
      a.className = "chip"; a.textContent = u.replace(/^https?:\/\/(www\.)?t\.me\//, "");
      chips.appendChild(a);
    });
    panel.appendChild(chips);
  }
  (tab.embeds || []).forEach(url => {
    const wrap = document.createElement("div"); wrap.style.marginBottom = "12px";
    const iframe = document.createElement("iframe");
    iframe.className = "iframe"; iframe.loading = "lazy"; iframe.referrerPolicy = "no-referrer-when-downgrade";
    iframe.src = toEmbed(url); wrap.appendChild(iframe);
    const note = document.createElement("p"); note.className = "note";
    note.innerHTML = `אם האמבד לא נטען, <a href="${iframe.src}" target="_blank" rel="noopener">פתח/י בטאב חדש</a>.`;
    wrap.appendChild(note); panel.appendChild(wrap);
  });
  panel.dataset.loaded = "true";
}

function setActive(key) {
  registry.forEach((entry, k) => {
    const on = k === key;
    entry.btn.setAttribute("aria-selected", on ? "true" : "false");
    entry.panel.dataset.active = on ? "true" : "false";
    if (on) fillPanel(entry);
  });
  const u = new URL(location.href);
  if (key) u.hash = "tab=" + key; else u.hash = "";
  history.replaceState(null, "", u.toString());
}

tabbar.addEventListener("click", e => {
  const b = e.target.closest(".tab"); if (!b) return; setActive(b.dataset.key);
});

function hashKey(){ const m=/tab=([a-z]+)/i.exec(location.hash||""); return m?m[1]:null; }
window.addEventListener("hashchange", () => {
  const k = hashKey(); if (!k || registry.has(k)) setActive(k || null);
});

// Modal for forms
const backdrop = document.getElementById("gzl-backdrop");
const modal = backdrop.querySelector(".modal");
const mframe = document.getElementById("gzl-miframe");
const mclose = document.getElementById("gzl-close");
const mfallback = document.getElementById("gzl-fallback");

function openForm(url, title) {
  document.getElementById("gzlModalTitle").textContent = title || "טופס";
  mframe.src = url; mfallback.href = url;
  backdrop.style.display = "flex";
  requestAnimationFrame(() => modal.classList.add("open"));
  backdrop.setAttribute("aria-hidden","false");
}
function closeForm() {
  modal.classList.remove("open");
  backdrop.setAttribute("aria-hidden","true");
  setTimeout(() => { backdrop.style.display = "none"; mframe.src = "about:blank"; }, 160);
}
backdrop.addEventListener("click", e => { if (e.target === backdrop) closeForm(); });
mclose.addEventListener("click", closeForm);
document.addEventListener("keydown", e => { if (e.key === "Escape" && backdrop.getAttribute("aria-hidden")==="false") closeForm(); });

document.addEventListener("click", e => {
  const a = e.target.closest("a[href]"); if (!a) return;
  const url = a.href;
  if (FORM_HOSTS_RE.test(url)) {
    e.preventDefault();
    openForm(url, a.textContent?.trim() || "טופס");
  }
});

// Start
const start = hashKey();
if (start && registry.has(start)) setActive(start); else setActive(null);
