(function(){
  const backdrop=document.getElementById("modal-backdrop");
  const modalEl=backdrop.querySelector(".modal");
  const closeBtn=document.getElementById("gzl-close");
  const titleEl=document.getElementById("gzlModalTitle");
  const htmlBox=document.getElementById("gzl-modal-html");
  const iframeEl=document.getElementById("gzl-miframe");
  const fallback=document.getElementById("gzl-fallback");

  function openHtml({title, html}){
    titleEl.textContent=title||"";
    htmlBox.style.display="block";
    htmlBox.innerHTML=html; // already wrapped by caller
    iframeEl.style.display="none";
    iframeEl.src="about:blank";
    fallback.style.display="none";
    show();
  }

  function openIframe({title, url}){
    titleEl.textContent=title||"";
    htmlBox.style.display="none";
    htmlBox.innerHTML="";
    iframeEl.style.display="block";
    iframeEl.src=url||"about:blank";
    const txt=(window.I18N?.[window.currentLang||'he']?.actions?.openNew)||"Open in a new tab";
    if(url){ fallback.href=url; fallback.textContent=txt; fallback.style.display="inline"; }
    else{ fallback.style.display="none"; }
    show();
  }

  function show(){
    backdrop.style.display="flex";
    requestAnimationFrame(()=>modalEl.classList.add("open"));
  }

  function close(){
    modalEl.classList.remove("open");
    setTimeout(()=>{
      backdrop.style.display="none";
      iframeEl.src="about:blank";
      htmlBox.innerHTML="";
    },120);
  }

  backdrop.addEventListener("click",(e)=>{ if(e.target===backdrop) close(); });
  closeBtn.addEventListener("click", close);
  window.addEventListener("keydown",(e)=>{ if(e.key==="Escape") close(); });

  window.Modal={openHtml,openIframe,close};
})();
