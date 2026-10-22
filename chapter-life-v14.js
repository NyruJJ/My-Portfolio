/* Small scroll responses for the *interior* chapters. Never changes scroll
   position, intercepts the wheel, or hides content during chapter transitions. */
(()=>{
  'use strict';
  const motionOK = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const sections = ['work','expertise','experience','education','contact'];
  const byId = Object.fromEntries(sections.map(k=>[k,document.getElementById(k)]));
  const track = document.createElement('span');
  track.className = 'chapter-reading-track';
  track.setAttribute('aria-hidden','true');
  document.body.appendChild(track);

  let frame=0;
  const progress=()=>{
    frame=0;
    if(!motionOK)return;
    const section=byId[document.body.dataset.chapter];
    if(!section){track.style.setProperty('--chapter-read',0);return;}
    const max=Math.max(1,document.documentElement.scrollHeight-innerHeight);
    const amount=Math.max(0,Math.min(1,scrollY/max));
    track.style.setProperty('--chapter-read',String(amount));
  };
  const schedule=()=>{if(!frame)frame=requestAnimationFrame(progress)};
  window.addEventListener('scroll',schedule,{passive:true});
  window.addEventListener('resize',schedule,{passive:true});
  window.addEventListener('portfolio:chapterchange',()=>requestAnimationFrame(schedule));
  schedule();

  if(!motionOK||!('IntersectionObserver' in window))return;
  const observer = new IntersectionObserver(entries=>{
    for(const entry of entries){
      if(entry.isIntersecting){
        entry.target.classList.add('life-visible');
        observer.unobserve(entry.target);
      }
    }
  }, {rootMargin:'0px 0px -40px 0px',threshold:.07});

  const selections=[
    '#work .project-group-divider',
    '#expertise .expertise-symbol',
    '#experience .job-tags',
    '#education .credential',
    '#education .pathway-note',
    '#contact .cta-buttons'
  ];
  function register(){
    selections.forEach(selector=>{
      document.querySelectorAll(selector).forEach((element,i)=>{
        if(element.dataset.lifeBound)return;
        element.dataset.lifeBound='true';
        element.classList.add('chapter-life-reveal');
        element.style.setProperty('--life-delay',`${Math.min(i%4,3)*60}ms`);
        observer.observe(element);
      });
    });
  }
  register();
  const projectGrid=document.getElementById('projects-grid');
  if(projectGrid){
    new MutationObserver(register).observe(projectGrid,{childList:true,subtree:false});
  }
  const revealVisible=()=>{
    // Elements already in the viewport should never await additional scrolling
    // merely because another chapter was previously display:none.
    const active=document.querySelector('#main>.chapter-active');
    if(!active)return;
    active.querySelectorAll('.chapter-life-reveal:not(.life-visible)').forEach(el=>{
      const rect=el.getBoundingClientRect();
      if(rect.top<innerHeight-28&&rect.bottom>0){
        el.classList.add('life-visible');
        observer.unobserve(el);
      }
    });
  };
  window.addEventListener('portfolio:chapterchange',()=>requestAnimationFrame(revealVisible));
  requestAnimationFrame(revealVisible);
})();
