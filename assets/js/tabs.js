(function(){
  // Build a11y-compliant tabbar + panels and keep registry for switching
  const tabbar=document.getElementById("gzl-tabbar");
  const panels=document.getElementById("gzl-panels");
  const registry=new Map();

  function t(key){ // i18n helper for tab label
    const [section,prop]=(window.TABS[key].labelKey||"").split(".");
    const lang=window.currentLang||"he";
    return (window.I18N?.[lang]?.[section]?.[prop])||key;
  }

  function buildOne(key){
    const tab=document.createElement("button");
    tab.className="tab"; tab.setAttribute("role","tab");
    tab.id="tab-"+key; tab.setAttribute("aria-controls","panel-"+key);
    tab.textContent=t(key);

    const panel=document.createElement("section");
    panel.className="panel"; panel.setAttribute("role","tabpanel");
    panel.id="panel-"+key; panel.setAttribute("aria-labelledby","tab-"+key);
    panel.dataset.key=key;

    // Actions (Add form) – button above the table
    const actions=document.createElement("div");
    actions.className="actions";
    const addKey=window.TABS[key].addFormKey;
    if(addKey){
      const addBtn=document.createElement("button"); addBtn.className="action-btn"; addBtn.type="button";
      const lang=window.currentLang||"he";
      addBtn.textContent=(window.I18N?.[lang]?.actions?.add)+" "+t(key);
      addBtn.addEventListener("click",()=>{
        const url=window.FORMS?.[window.currentLang||'he']?.[addKey];
        if(url){ window.Modal.openIframe({title:addBtn.textContent,url}); }
      });
      actions.appendChild(addBtn);
      panel.appendChild(actions);
    }

    // The Airtable iframe
    const iframe=document.createElement("iframe");
    iframe.className="iframe"; iframe.loading="lazy"; iframe.referrerPolicy="no-referrer-when-downgrade";
    iframe.src=window.TABS[key].url;
    panel.appendChild(iframe);

    // Tiny “Open in new tab” note under the embed
    const note=document.createElement("div"); note.className="note";
    const a=document.createElement("a"); a.href=window.TABS[key].url; a.target="_blank"; a.rel="noopener";
    a.textContent=(window.I18N?.[window.currentLang||'he']?.actions?.openNew)||"Open in a new tab";
    note.appendChild(a);
    panel.appendChild(note);

    // Register and attach
    registry.set(key,{tabEl:tab,panel});
    tabbar.appendChild(tab);
    panels.appendChild(panel);

    // Event
    tab.addEventListener("click",()=>setActive(key));
  }

  function clear(){ tabbar.innerHTML=""; panels.innerHTML=""; registry.clear(); }
  function rebuild(){ clear(); (window.TAB_ORDER||[]).forEach(buildOne); }

  function setActive(key){
    registry.forEach(({tabEl,panel},k)=>{
      const on = (k===key);
      tabEl.setAttribute("aria-selected", on?"true":"false");
      panel.dataset.active = on?"true":"false";
      panel.style.display = on?"block":"none";
    });
    const url=new URL(location.href); url.hash="#tab="+encodeURIComponent(key);
    history.replaceState(null,"",url.toString());
  }

  window.Tabs={rebuild,setActive,registry};
})();
