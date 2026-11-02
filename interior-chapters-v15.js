/* Lightweight, interaction-driven enhancements for v15 interior chapters.
   No new wheel listeners, scroll locking, or changes to project card behavior. */
(()=>{
  'use strict';

  // The existing diagram is an illustrative skills overview, not a real network.
  const network=document.querySelector('#expertise .expertise-network-panel');
  const cards=[...document.querySelectorAll('#expertise .expertise-card')];
  const nodes=[...document.querySelectorAll('#expertise .diagram-node.small')];
  const routes=[...document.querySelectorAll('#expertise .diagram-lines path')];
  if(network && nodes.length>=4 && routes.length>=4){
    let active=-1;
    const illuminate=index=>{
      if(active===index)return;
      active=index;
      network.classList.toggle('is-linked',index>=0);
      cards.forEach((card,i)=>card.classList.toggle('is-linked',i===index));
      nodes.forEach((node,i)=>node.classList.toggle('is-signal',index===i));
      routes.forEach((path,i)=>path.classList.toggle('is-signal',index===i));
    };
    cards.forEach((card,index)=>{
      card.addEventListener('pointerenter',()=>illuminate(index));
      card.addEventListener('pointerleave',()=>illuminate(-1));
    });
    network.addEventListener('pointerleave',()=>illuminate(-1));
  }

  // Career rail follows the currently read job, including while existing
  // expandable operations details are open and change the section height.
  const timeline=document.querySelector('#experience .timeline');
  if(timeline){
    const jobs=[...timeline.querySelectorAll(':scope > .timeline-item')];
    let frame=0;
    function refresh(){
      frame=0;
      if(document.body.dataset.chapter!=='experience')return;
      const rect=timeline.getBoundingClientRect();
      const travel=Math.max(1,rect.height-64);
      const position=Math.max(0,Math.min(travel,window.innerHeight*.42-rect.top-32));
      timeline.style.setProperty('--career-progress',String(position/travel));
      timeline.style.setProperty('--career-progress-height',`${position}px`);
      let closest=null,distance=Infinity;
      for(const job of jobs){
        const bounds=job.getBoundingClientRect();
        const dist=Math.abs(bounds.top-window.innerHeight*.28);
        if(bounds.bottom<75)continue;
        if(dist<distance){closest=job;distance=dist}
      }
      jobs.forEach(job=>job.classList.toggle('is-career-active',job===closest));
    }
    const schedule=()=>{if(!frame)frame=requestAnimationFrame(refresh)};
    window.addEventListener('scroll',schedule,{passive:true});
    window.addEventListener('resize',schedule,{passive:true});
    window.addEventListener('portfolio:chapterchange',schedule);
    timeline.querySelectorAll('details').forEach(d=>d.addEventListener('toggle',()=>{
      requestAnimationFrame(schedule);
    }));
    refresh();
  }
})();
