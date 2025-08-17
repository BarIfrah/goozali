(function(){
  const btn=document.getElementById("gzl-lang");
  const html=document.documentElement;
  const brandText=document.getElementById("brand-text");
  const cvHero=document.getElementById("cv-hero-btn");

  function getLang(){ return localStorage.getItem("gzl_lang")||"he"; }
  function setLang(lang){
    window.currentLang=lang; localStorage.setItem("gzl_lang",lang);
    applyLang();
    window.dispatchEvent(new CustomEvent("gzl:langchange",{detail:{lang}}));
  }

  function applyLang(){
    const lang=window.currentLang||"he";
    html.lang=lang; html.dir=(lang==="he"?"rtl":"ltr");
    document.documentElement.style.setProperty("--tab-dir",(lang==="he"?"rtl":"ltr"));
    btn.textContent=(lang==="he"?"English":"עברית");
    brandText.textContent=(lang==="he"?"גוזלי":"Goozali");

    // Hero CV button
    const cvUrl=(lang==="he"?"https://www.tech-cv.com/?lang=he":"https://www.tech-cv.com/?lang=en");
    if(cvHero) cvHero.href=cvUrl;

    // Apply i18n text
    document.querySelectorAll("[data-i18n]").forEach(el=>{
      const key=el.getAttribute("data-i18n");
      const [s,k]=key.split(".");
      const val=window.I18N?.[lang]?.[s]?.[k];
      if(val) el.textContent=val;
    });

    // Rebuild tabs (labels stay consistent per language)
    window.Tabs?.rebuild();
    const active=(new URL(location.href)).hash.match(/tab=([^&]+)/)?.[1] || (window.TAB_ORDER?.[0]);
    if(active) window.Tabs?.setActive(active);

    // Bring Them Home Now ticker (re-inject on lang change to avoid disappearance)
    const b=document.getElementById("bthn");
    if(b){
      b.setAttribute("lang",lang==="he"?"he":"en");
      // Clear any previous script shadow
      const scripts=[...b.querySelectorAll("script")];
      scripts.forEach(s=>s.remove());
      // Fresh script
      const s=document.createElement("script");
      s.type="text/javascript";
      s.src="https://bringthemhomenow.net/1.3.0/hostages-ticker.js";
      s.setAttribute("integrity","sha384-MmP7bD5QEJWvJccg9c0lDnn3LjjqQWDiRCxRV+NU8hij15icuwb29Jfw1TqJwuSv");
      s.setAttribute("crossorigin","anonymous");
      b.appendChild(s);
    }
  }

  window.i18n={getLang,setLang,applyLang};
  btn?.addEventListener("click",()=>{ const next=(getLang()==="he"?"en":"he"); setLang(next); });
})();
