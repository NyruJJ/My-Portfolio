/* Gallery transitions: observes section visibility; never captures wheel/touch scrolling. */
(()=>{'use strict';
 const media=window.matchMedia('(prefers-reduced-motion: reduce)');
 if(media.matches||!('IntersectionObserver' in window))return;
 const parts=['#expertise','#work','#experience','#education','#contact'].map(sel=>document.querySelector(sel)).filter(Boolean);
 parts.forEach(el=>{el.classList.add('gallery-panel','gallery-enter')});
 const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{
   const el=e.target;
   if(e.isIntersecting){el.classList.remove('gallery-enter','gallery-past');el.classList.add('gallery-active')}
   else if(el.classList.contains('gallery-active')&&e.boundingClientRect.bottom<90){el.classList.remove('gallery-active');el.classList.add('gallery-past')}
 })},{rootMargin:'0px 0px -5% 0px',threshold:.04});
 parts.forEach(el=>obs.observe(el));
 // Keep sections visible if motion preference changes.
 media.addEventListener?.('change', e=>{if(e.matches){obs.disconnect();parts.forEach(el=>el.classList.remove('gallery-enter','gallery-past'))}});
})();
