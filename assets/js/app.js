(function(){
  // Build notifications modal HTML (chips) based on NOTIF_GROUPS per language
  function notifHtml(){
    const lang=window.currentLang||"he";
    const g=window.NOTIF_GROUPS?.[lang]||{};
    const section = (title,items)=>{
      if(!items||!items.length) return "";
      const chips = items.map(i=>`<a href="${i.url}" target="_blank" rel="noopener">${i.name}</a>`).join("");
      return `<h4>${title}</h4><div class="chips">${chips}</div>`;
    };
    if(lang==="he"){
      return `<div class="notif-groups">
        ${section("משרות ג׳וניור", g.junior)}
        ${section("לפי אזור גיאוגרפי", g.areas)}
        ${section("לפי תחום", g.domains)}
      </div>`;
    }else{
      return `<div class="notif-groups">
        ${section("Junior", g.junior)}
        ${section("By Area", g.areas)}
        ${section("By Domain", g.domains)}
      </div>`;
    }
  }

  function init(){
    // Language init
    window.currentLang=window.i18n?.getLang?.()||"he";
    window.i18n?.applyLang?.();

    // Tabs init + hash
    window.Tabs?.rebuild();
    const found=(new URL(location.href)).hash.match(/tab=([^&]+)/)?.[1];
    const initial=found||(window.TAB_ORDER?.[0]);
    if(initial) window.Tabs?.setActive(initial);

    // Notifications CTA => open HTML modal version with chips
    document.getElementById("gzl-notif-cta")?.addEventListener("click",(e)=>{
      e.preventDefault();
      window.Modal.openHtml({
        title: (window.currentLang==="he" ? "קבלו נוטיפיקציה כשמתגלה משרה חדשה" : "Get notified when new jobs appear"),
        html: notifHtml()
      });
    });

    // If language changes while modal is open, re-render content
    window.addEventListener("gzl:langchange",()=>{
      const backdrop=document.getElementById("modal-backdrop");
      if(backdrop && backdrop.style.display==="flex"){
        const body=document.getElementById("gzl-modal-html");
        if(body && body.style.display==="block"){
          window.Modal.openHtml({
            title: (window.currentLang==="he" ? "קבלו נוטיפיקציה כשמתגלה משרה חדשה" : "Get notified when new jobs appear"),
            html: notifHtml()
          });
        }
      }
    });
  }

  if(document.readyState==="loading"){ document.addEventListener("DOMContentLoaded",init); }
  else { init(); }
})();
