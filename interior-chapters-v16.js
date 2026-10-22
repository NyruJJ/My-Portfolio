/* Interior chapters v16: skill topology, real career rail, study pathway.
   No wheel hijacking, no global scroll locks, no changes to Projects logic. */
(()=>{
  'use strict';
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Expertise: focus/hover any skill card OR the corresponding network node.
  const expertise=document.getElementById('expertise');
  const network=expertise?.querySelector('.expertise-network-panel');
  if(network){
    const cards=[...expertise.querySelectorAll('.expertise-card[data-skill]')];
    const points=[...network.querySelectorAll('.map-point[data-skill]')];
    const paths=[...network.querySelectorAll('.map-link[data-skill]')];
    const dots=[...network.querySelectorAll('.signal-dot[data-skill]')];
    const status=network.querySelector('#network-status');
    let active=-1;
    let animation=0;
    const labels=['NETWORKS CONNECTED','SECURITY CONNECTED','DATA CONNECTED','DELIVERY CONNECTED'];
    function activate(index){
      cancelAnimationFrame(animation);
      active=index;
      network.classList.toggle('is-linked',index>=0);
      cards.forEach((x,i)=>x.classList.toggle('is-linked',i===index));
      points.forEach((x,i)=>x.classList.toggle('is-signal',i===index));
      paths.forEach((x,i)=>x.classList.toggle('is-signal',i===index));
      dots.forEach((x,i)=>x.classList.toggle('is-signal',i===index));
      if(status) status.textContent=index>=0?labels[index]:'ALL SYSTEMS CONNECTED';
      if(index<0 || reduced)return;
      const path=paths[index],dot=dots[index];
      if(!path||!dot)return;
      const length=path.getTotalLength();
      const started=performance.now();
      function frame(now){
        if(active!==index)return;
        const progress=Math.min(1,(now-started)/950);
        const point=path.getPointAtLength(length*progress);
        dot.setAttribute('cx',String(point.x));
        dot.setAttribute('cy',String(point.y));
        if(progress<1)animation=requestAnimationFrame(frame);
      }
      animation=requestAnimationFrame(frame);
    }
    cards.forEach((card,i)=>{
      card.addEventListener('pointerenter',()=>activate(i));
      card.addEventListener('focusin',()=>activate(i));
      card.addEventListener('pointerleave',()=>{if(!network.matches(':hover'))activate(-1)});
      card.addEventListener('focusout',e=>{if(!card.contains(e.relatedTarget) && !network.contains(e.relatedTarget))activate(-1)});
    });
    points.forEach((point,i)=>{
      point.addEventListener('pointerenter',()=>activate(i));
      point.addEventListener('focus',()=>activate(i));
      point.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();activate(i)}});
    });
    expertise.addEventListener('pointerleave',()=>activate(-1));
    expertise.addEventListener('focusout',e=>{if(!expertise.contains(e.relatedTarget))activate(-1)});
  }

  // 2. Experience: progress between exact first and last timeline dots, including
  //    dynamically expanded Nestor/Terratek details.
  const timeline=document.querySelector('#experience .timeline');
  if(timeline){
    const jobs=[...timeline.querySelectorAll(':scope > .timeline-item')];
    let frame=0;
    function update(){
      frame=0;
      if(document.body.dataset.chapter!=='experience')return;
      const tl=timeline.getBoundingClientRect();
      const markers=jobs.map(job=>job.getBoundingClientRect().top-tl.top+(innerWidth<=700?51:80));
      const first=markers[0],last=markers[markers.length-1],length=Math.max(1,last-first);
      timeline.style.setProperty('--career-start',`${first}px`);
      timeline.style.setProperty('--career-length',`${length}px`);
      const lastOnScreen=jobs[jobs.length-1].getBoundingClientRect().top+(innerWidth<=700?51:80);
      const remaining=Math.max(0,document.documentElement.scrollHeight-(window.scrollY+innerHeight));
      const hasReachedLast=lastOnScreen<innerHeight*.76 || remaining<=18;
      const target=hasReachedLast?length:Math.max(0,Math.min(length,innerHeight*.67-tl.top-first));
      timeline.style.setProperty('--career-fill',`${target}px`);
      let current=0;
      markers.forEach((offset,i)=>{if(tl.top+offset<innerHeight*.68)current=i});
      if(hasReachedLast)current=jobs.length-1;
      jobs.forEach((job,i)=>job.classList.toggle('is-career-active',i===current));
    }
    const schedule=()=>{if(!frame)frame=requestAnimationFrame(update)};
    window.addEventListener('scroll',schedule,{passive:true});
    window.addEventListener('resize',schedule,{passive:true});
    window.addEventListener('portfolio:chapterchange',()=>requestAnimationFrame(()=>requestAnimationFrame(schedule)));
    timeline.querySelectorAll('details').forEach(d=>d.addEventListener('toggle',()=>requestAnimationFrame(schedule)));
    if(typeof ResizeObserver!=='undefined')new ResizeObserver(schedule).observe(timeline);
    schedule();
  }

  // 3. Education: hover/focus one of the stage cards to trace the academic path.
  const journey=document.querySelector('#education .learning-journey');
  if(journey){
    const stages=[...journey.querySelectorAll('.learning-step')];
    const segments=[...journey.querySelectorAll('.learning-segment')];
    function highlight(index){
      stages.forEach((stage,i)=>stage.classList.toggle('is-glowing',i===index));
      segments.forEach((segment,i)=>segment.classList.toggle('is-glowing',index>=0&&i<index));
    }
    stages.forEach((stage,i)=>{
      stage.addEventListener('mouseenter',()=>highlight(i));
      stage.addEventListener('focus',()=>highlight(i));
    });
    journey.addEventListener('mouseleave',()=>highlight(-1));
    journey.addEventListener('focusout',e=>{if(!journey.contains(e.relatedTarget))highlight(-1)});
  }
})();
