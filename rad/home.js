/* راد مدرن — حرکت‌های صفحه اصلی */
(function(){
  var d=document, reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ظاهر شدن تدریجی هنگام اسکرول (با تأخیر پله‌ای بین کارت‌های هم‌ردیف) */
  var items=d.querySelectorAll('.sec-title,.services .svc,.feat,.tech,.why-visual,.cta .wrap,.sc-head,.sc-screen');
  items.forEach(function(el){
    el.classList.add('reveal');
    el.style.setProperty('--i',Array.prototype.indexOf.call(el.parentNode.children,el));
  });
  if(reduce||!('IntersectionObserver' in window)){
    items.forEach(function(el){el.classList.add('is-in')});
  }else{
    var io=new IntersectionObserver(function(list){
      list.forEach(function(e){
        if(e.isIntersecting){e.target.classList.add('is-in');io.unobserve(e.target);}
      });
    },{threshold:.15,rootMargin:'0px 0px -40px 0px'});
    items.forEach(function(el){io.observe(el)});
  }

  /* نمونه‌کار: کارت عریض (دسکتاپ) و کارت‌های باریک (موبایل)؛ کلیک جای آن‌ها را عوض می‌کند */
  var sc=d.querySelector('.showcase');
  if(sc){
    var its=[].slice.call(sc.querySelectorAll('.sc-item')),dots=[].slice.call(sc.querySelectorAll('.sc-dots button')),
        nameEl=sc.querySelector('#scActiveName')||sc.querySelector('.sc-active-name'),cur=0,t;
    function set(i){
      if(i===cur)return; cur=i;
      its.forEach(function(el,k){var on=k===i;el.classList.toggle('is-active',on);el.setAttribute('aria-expanded',on);if(dots[k])dots[k].classList.toggle('is-on',on);});
      sc.classList.add('is-swap');clearTimeout(t);
      t=setTimeout(function(){
        if(nameEl) nameEl.textContent=its[i].dataset.name||'';
        sc.classList.remove('is-swap');
      },reduce?0:200);
    }
    its.forEach(function(el,k){
      el.addEventListener('click',function(e){if(!e.target.closest('a'))set(k);});
      el.addEventListener('keydown',function(e){if((e.key==='Enter'||e.key===' ')&&e.target===el){e.preventDefault();set(k);}});
    });
    dots.forEach(function(b,k){b.addEventListener('click',function(){set(k);});});
    var swapBtn=sc.querySelector('.sc-swap');
    if(swapBtn) swapBtn.addEventListener('click',function(){set((cur+1)%its.length);});
  }

  /* مودال خدمات */
  var modal=d.getElementById('svcModal');
  if(modal){
    var titleEl=d.getElementById('svcModalTitle');
    var descEl=d.getElementById('svcModalDesc');
    var lastFocus=null;
    function openModal(btn){
      lastFocus=btn;
      titleEl.textContent=btn.getAttribute('data-title')||'';
      descEl.textContent=btn.getAttribute('data-desc')||'';
      modal.hidden=false;
      // force reflow then animate
      void modal.offsetWidth;
      modal.classList.add('is-open');
      d.body.classList.add('svc-modal-open');
      var closeBtn=modal.querySelector('.svc-modal-close');
      if(closeBtn) closeBtn.focus();
    }
    function closeModal(){
      modal.classList.remove('is-open');
      d.body.classList.remove('svc-modal-open');
      setTimeout(function(){
        if(!modal.classList.contains('is-open')) modal.hidden=true;
      },300);
      if(lastFocus) lastFocus.focus();
    }
    d.querySelectorAll('.services .svc').forEach(function(btn){
      btn.addEventListener('click',function(){openModal(btn);});
    });
    modal.querySelectorAll('[data-close]').forEach(function(el){
      el.addEventListener('click',closeModal);
    });
    d.addEventListener('keydown',function(e){
      if(e.key==='Escape'&&modal.classList.contains('is-open')) closeModal();
    });
  }
})();