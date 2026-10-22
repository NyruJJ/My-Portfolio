/* v17 inner sections. Keeps Home, Projects, global chapter transitions unmodified. */
(()=>{
'use strict';
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const NS='http://www.w3.org/2000/svg';
const makeSVG=(tag,attrs={})=>{const el=document.createElementNS(NS,tag);Object.entries(attrs).forEach(([k,v])=>el.setAttribute(k,String(v)));return el};
const clamp=(n,min,max)=>Math.max(min,Math.min(max,n));

/* EXPERTISE: steady flow along all four paths, hover focus and near-field activation */
const expertise=document.getElementById('expertise');
const map=expertise?.querySelector('.expertise-network-panel');
if(expertise&&map){
 const cards=[...expertise.querySelectorAll('.expertise-card[data-skill]')];
 const nodes=[...map.querySelectorAll('.map-point[data-skill]')];
 const paths=[...map.querySelectorAll('.map-link[data-skill]')];
 const dots=[...map.querySelectorAll('.signal-dot[data-skill]')];
 const diagram=map.querySelector('.network-diagram');
 const status=map.querySelector('#network-status');
 const labels=['NETWORKS CONNECTED','SECURITY CONNECTED','DATA CONNECTED','DELIVERY CONNECTED'];
 let selected=-1, mapVisible=false, mapRAF=0, mapStart=performance.now();
 const isCurrent=()=>document.body.dataset.chapter==='expertise';
 const setActive=(idx)=>{
   if(selected===idx)return;
   selected=idx;
   map.classList.toggle('is-linked',idx>=0);
   cards.forEach((el,i)=>el.classList.toggle('is-linked',i===idx));
   nodes.forEach((el,i)=>el.classList.toggle('is-signal',i===idx));
   paths.forEach((el,i)=>el.classList.toggle('is-signal',i===idx));
   dots.forEach((el,i)=>el.classList.toggle('is-signal',i===idx));
   if(status)status.textContent=idx>=0?labels[idx]:'ALL SYSTEMS CONNECTED';
 };
 function animateMap(t){
   mapRAF=0;
   if(reduced||document.hidden||!mapVisible||!isCurrent())return;
   paths.forEach((p,i)=>{
     if(!dots[i])return;
     const length=p.getTotalLength();
     const ms=selected===i?1700:4700+i*500;
     const fraction=((t-mapStart+i*1150)%ms)/ms;
     const pt=p.getPointAtLength(length*fraction);
     dots[i].setAttribute('cx',pt.x.toFixed(1));dots[i].setAttribute('cy',pt.y.toFixed(1));
   });
   mapRAF=requestAnimationFrame(animateMap);
 }
 function ensureFlow(){if(mapRAF||reduced||!mapVisible||!isCurrent()||document.hidden)return;mapRAF=requestAnimationFrame(animateMap)}
 function pauseFlow(){if(mapRAF){cancelAnimationFrame(mapRAF);mapRAF=0}}
 if('IntersectionObserver'in window){new IntersectionObserver(entries=>{mapVisible=!!entries[0]?.isIntersecting;if(mapVisible)ensureFlow();else pauseFlow()},{threshold:.02}).observe(map)}else{mapVisible=true;ensureFlow()}
 window.addEventListener('portfolio:chapterchange',()=>{requestAnimationFrame(()=>{if(isCurrent())ensureFlow();else pauseFlow()})});
 document.addEventListener('visibilitychange',()=>{if(document.hidden)pauseFlow();else ensureFlow()});
 cards.forEach((card,i)=>{
   card.addEventListener('pointerenter',()=>setActive(i));
   card.addEventListener('focusin',()=>setActive(i));
   card.addEventListener('pointerleave',()=>{if(!map.matches(':hover'))setActive(-1)});
   card.addEventListener('focusout',e=>{if(!card.contains(e.relatedTarget)&&!map.contains(e.relatedTarget))setActive(-1)});
 });
 nodes.forEach((node,i)=>{
   node.addEventListener('pointerenter',()=>setActive(i));
   node.addEventListener('focus',()=>setActive(i));
   node.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();setActive(i)}});
 });
 // Route proximity in the schematic itself: even beside the thin lines.
 let scheduled=0, lastEvent=null;
 map.addEventListener('pointermove',e=>{
   if(e.pointerType==='touch'||!diagram)return;
   lastEvent={x:e.clientX,y:e.clientY,target:e.target};
   if(scheduled)return;
   scheduled=requestAnimationFrame(()=>{
     scheduled=0;
     const ev=lastEvent;
     if(!ev||ev.target.closest?.('.map-point'))return;
     const rect=diagram.getBoundingClientRect();
     if(!rect.width||!rect.height)return;
     const x=(ev.x-rect.left)*760/rect.width,y=(ev.y-rect.top)*390/rect.height;
     let best=Infinity,idx=-1;
     paths.forEach((path,i)=>{
       const total=path.getTotalLength();
       for(let k=0;k<=32;k++){
         const point=path.getPointAtLength(total*k/32);
         const d=Math.hypot((point.x-x)*rect.width/760,(point.y-y)*rect.height/390);
         if(d<best){best=d;idx=i}
       }
     });
     if(best<26)setActive(idx);
     else setActive(-1);
   });
 },{passive:true});
 map.addEventListener('pointerleave',()=>setActive(-1));
 expertise.addEventListener('focusout',e=>{if(!expertise.contains(e.relatedTarget))setActive(-1)});

 // Decorative neighborhood network, intentionally NOT a production topology.
 const bg=makeSVG('svg',{class:'ambient-proximity-graph',viewBox:'0 0 1440 900',preserveAspectRatio:'none','aria-hidden':'true'});
 const pointData=[];
 // Stable seeded positions leave breathing room behind main content.
 for(let row=0;row<6;row++)for(let col=0;col<11;col++){
   const n=row*11+col;
   const x=col*145-6+Math.sin(n*2.18)*32;
   const y=row*177+28+Math.cos(n*1.66)*38;
   pointData.push([x,y]);
 }
 const edgeData=[];
 const edgesGroup=makeSVG('g'),dotsGroup=makeSVG('g');
 for(let i=0;i<pointData.length;i++){
   const row=Math.floor(i/11),col=i%11;
   for(const j of [col<10?i+1:-1,row<5?i+11:-1,(row<5&&col<10&&(i%3===0))?i+12:-1]){
     if(j<0)continue;
     const [x1,y1]=pointData[i],[x2,y2]=pointData[j];
     const line=makeSVG('path',{d:`M${x1.toFixed(1)} ${y1.toFixed(1)}L${x2.toFixed(1)} ${y2.toFixed(1)}`,class:'ambient-edge'});
     edgesGroup.append(line);edgeData.push({i,j,el:line});
   }
 }
 const circles=pointData.map(([x,y])=>{
   const circle=makeSVG('circle',{cx:x.toFixed(1),cy:y.toFixed(1),r:1.9,class:'ambient-node'});
   dotsGroup.append(circle);return circle;
 });
 bg.append(edgesGroup,dotsGroup);
 expertise.insertBefore(bg,expertise.firstChild);
 const clearNear=()=>{circles.forEach(el=>el.classList.remove('is-near'));edgeData.forEach(x=>x.el.classList.remove('is-near'))};
 let proxPending=0,proxXY=null;
 expertise.addEventListener('pointermove',e=>{
   if(e.pointerType==='touch'||!isCurrent())return;
   const b=expertise.getBoundingClientRect();
   if(!b.width||!b.height)return;
   proxXY=[(e.clientX-b.left)*1440/b.width,(e.clientY-b.top)*900/b.height];
   if(proxPending)return;
   proxPending=requestAnimationFrame(()=>{
     proxPending=0;
     if(!proxXY)return;
     const scaleX=b.width/1440,scaleY=b.height/900;
     const near=[];
     pointData.forEach(([x,y],i)=>{
       const d=Math.hypot((x-proxXY[0])*scaleX,(y-proxXY[1])*scaleY);
       const on=d<120;
       circles[i].classList.toggle('is-near',on);
       near[i]=on;
     });
     edgeData.forEach(({i,j,el})=>el.classList.toggle('is-near',near[i]||near[j]));
   });
 },{passive:true});
 expertise.addEventListener('pointerleave',()=>{clearNear();setActive(-1)});
}

/* EXPERIENCE: full rail drawn between first and last role, each expander beside
   that rail, and only one case-study expanded at a time. */
const timeline=document.querySelector('#experience .timeline');
if(timeline){
 const jobs=[...timeline.querySelectorAll(':scope > .timeline-item')];
 const detailPanels=[...timeline.querySelectorAll(':scope > .timeline-item > details.operations-detail')];
 let pending=0,adjusting=false;
 const markerOffset=()=>innerWidth<=700?51:61;
 function redraw(){
   pending=0;
   if(document.body.dataset.chapter!=='experience')return;
   const bounds=timeline.getBoundingClientRect(),offset=markerOffset();
   const markers=jobs.map(item=>item.getBoundingClientRect().top-bounds.top+offset);
   const first=markers[0]||0,last=markers[markers.length-1]||first;
   const total=Math.max(1,last-first);
   timeline.style.setProperty('--career-start',`${first}px`);
   timeline.style.setProperty('--career-length',`${total}px`);
   const lastY=last+bounds.top;
   const atEnd=lastY<innerHeight*.78 || document.documentElement.scrollHeight-window.scrollY-innerHeight<20;
   const target=atEnd?total:clamp(innerHeight*.65-bounds.top-first,0,total);
   timeline.style.setProperty('--career-fill',`${target}px`);
   let chosen=0;markers.forEach((val,i)=>{if(bounds.top+val<innerHeight*.65)chosen=i});
   if(atEnd)chosen=jobs.length-1;
   jobs.forEach((job,i)=>job.classList.toggle('is-career-active',i===chosen));
 }
 const schedule=()=>{if(!pending)pending=requestAnimationFrame(redraw)};
 detailPanels.forEach(details=>details.addEventListener('toggle',()=>{
   if(details.open&&!adjusting){
     adjusting=true;
     detailPanels.forEach(other=>{if(other!==details&&other.open)other.open=false});
     adjusting=false;
   }
   requestAnimationFrame(()=>requestAnimationFrame(schedule));
 }));
 window.addEventListener('scroll',schedule,{passive:true});
 window.addEventListener('resize',schedule,{passive:true});
 window.addEventListener('portfolio:chapterchange',()=>requestAnimationFrame(()=>requestAnimationFrame(schedule)));
 if('ResizeObserver'in window)new ResizeObserver(schedule).observe(timeline);
 schedule();
}

/* EDUCATION: retain focused stage indication on top of the ambient progress scan. */
const journey=document.querySelector('#education .learning-journey');
if(journey){
 const stages=[...journey.querySelectorAll('.learning-step')];
 const segments=[...journey.querySelectorAll('.learning-segment')];
 const mark=index=>{
   stages.forEach((el,i)=>el.classList.toggle('is-glowing',i===index));
   segments.forEach((el,i)=>el.classList.toggle('is-glowing',index>=0&&i<index));
 };
 stages.forEach((stage,i)=>{stage.addEventListener('mouseenter',()=>mark(i));stage.addEventListener('focus',()=>mark(i))});
 journey.addEventListener('mouseleave',()=>mark(-1));
 journey.addEventListener('focusout',e=>{if(!journey.contains(e.relatedTarget))mark(-1)});
}

/* CONTACT: small decorative routes inside the panel react to the nearest part
   of the connection web. All actions below remain real accessible links. */
const contact=document.getElementById('contact');
const constellation=contact?.querySelector('.contact-constellation');
if(constellation){
 const svg=constellation.querySelector('svg');
 const coords=[[0,105],[110,40],[230,135],[390,70],[535,174],[680,65],[900,125],[0,195],[170,244],[335,167],[515,278],[730,191],[900,241],[435,210]];
 const pairs=[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[7,8],[8,9],[9,10],[10,11],[11,12],[1,8],[2,9],[3,13],[13,4],[4,11],[5,11],[8,13],[9,13]];
 svg.textContent='';
 const linkGroup=makeSVG('g');const nodeGroup=makeSVG('g');
 const graphLinks=pairs.map(([a,b])=>{const el=makeSVG('path',{class:'contact-graph-line',d:`M${coords[a][0]} ${coords[a][1]} L${coords[b][0]} ${coords[b][1]}`});linkGroup.append(el);return {a,b,el}});
 const graphNodes=coords.map(([x,y])=>{const el=makeSVG('circle',{class:'contact-graph-node',cx:x,cy:y,r:2.8});nodeGroup.append(el);return el});
 svg.append(linkGroup,nodeGroup);
 const surface=contact.querySelector('.contact-surface');
 let pending=0,xy=null;
 const reset=()=>{graphNodes.forEach(el=>el.classList.remove('is-near'));graphLinks.forEach(({el})=>el.classList.remove('is-near'))};
 surface.addEventListener('pointermove',e=>{
   if(e.pointerType==='touch')return;
   const b=svg.getBoundingClientRect();
   if(!b.width||!b.height)return;
   xy=[(e.clientX-b.left)*900/b.width,(e.clientY-b.top)*300/b.height,b.width,b.height];
   if(pending)return;
   pending=requestAnimationFrame(()=>{
     pending=0;if(!xy)return;
     const near=coords.map(([x,y],i)=>{
       const d=Math.hypot((x-xy[0])*xy[2]/900,(y-xy[1])*xy[3]/300);
       const yes=d<115;graphNodes[i].classList.toggle('is-near',yes);return yes;
     });
     graphLinks.forEach(({a,b,el})=>el.classList.toggle('is-near',near[a]||near[b]));
   });
 },{passive:true});
 surface.addEventListener('pointerleave',reset);
}
})();
