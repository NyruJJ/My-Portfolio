/* Signal Deck v19. Keeps Home, Projects, Contact, navigation and story popouts intact. */
(()=>{
'use strict';
const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const clamp=(v,min,max)=>Math.max(min,Math.min(max,v));

/* EXPERTISE — several real-world inspired constellation silhouettes.
   Unselected stars drift as individuals; on proximity, the nearest group assembles
   into a recognisable shape. Only that constellation's connections brighten. */
const exp=document.getElementById('expertise');
if(exp){
 const canvas=document.createElement('canvas');
 canvas.className='constellation-field'; canvas.setAttribute('aria-hidden','true');
 exp.prepend(canvas);
 const ctx=canvas.getContext('2d',{alpha:true});
 const models=[
  {name:'ORION',x:.11,y:.26,scale:1.2,stars:[[-35,-47],[39,-41],[-28,42],[33,50],[-19,-4],[1,-1],[20,3]],edges:[[0,4],[1,6],[4,5],[5,6],[4,2],[6,3],[0,1]]},
  {name:'URSA MAJOR',x:.85,y:.18,scale:1.15,stars:[[-50,-27],[-27,-23],[-2,-9],[20,-1],[50,9],[41,34],[12,30]],edges:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,3]]},
  {name:'CASSIOPEIA',x:.89,y:.67,scale:1.08,stars:[[-48,4],[-24,-26],[0,4],[21,-29],[47,5]],edges:[[0,1],[1,2],[2,3],[3,4]]},
  {name:'CYGNUS',x:.11,y:.75,scale:1.1,stars:[[-45,-2],[-18,-1],[8,-1],[47,0],[8,-44],[8,43]],edges:[[0,1],[1,2],[2,3],[4,2],[2,5]]},
  {name:'LYRA',x:.59,y:.79,scale:.95,stars:[[-15,-37],[-21,-7],[18,-11],[18,25],[-15,25]],edges:[[0,1],[1,2],[2,3],[3,4],[4,1]]},
  {name:'LEO',x:.52,y:.14,scale:1.0,stars:[[-39,-27],[-16,-41],[6,-33],[20,-5],[53,27],[3,32],[-27,22]],edges:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,0]]}
 ];
 let w=1,h=1,dpr=1,nearIndex=-1,visible=true,frame=0,last=0;
 let px=-9999,py=-9999;
 const rand=(n)=>{const v=Math.sin(n*103.17+45.91)*10291.184;return v-Math.floor(v)};
 const freeStars=Array.from({length:64},(_,i)=>({
  x:.015+rand(i*7+101)*.97,
  y:.02+rand(i*17+114)*.94,
  radius:.35+rand(i*23+200)*.7,
  brightness:.12+rand(i*29+249)*.21,
  phase:rand(i*19+320)*Math.PI*2,
  speed:.00009+rand(i*31+380)*.00016
 }));
 const constellations=models.map((model,gi)=>({
  ...model,
  active:0,
  particles:model.stars.map((star,i)=>({
    seed:gi*15+i,
    offsetX:(rand(gi*38+i*5)-.5)*125,
    offsetY:(rand(gi*35+i*9)-.5)*106,
    phase:rand(gi*51+i*7)*Math.PI*2,
    rx:12+rand(gi*51+i*2)*18,
    ry:11+rand(gi*76+i*7)*16,
    rate: .00012 + rand(gi*37+i*19)*.00012,
    size: .8+rand(gi*13+i*53)*1.20
  }))
 }));
 function measure(){
  const b=exp.getBoundingClientRect();w=Math.max(1,b.width);h=Math.max(1,b.height);
  dpr=Math.min(window.devicePixelRatio||1,2);
  canvas.width=Math.ceil(w*dpr); canvas.height=Math.ceil(h*dpr);
  canvas.style.width=w+'px';canvas.style.height=h+'px';
  ctx.setTransform(dpr,0,0,dpr,0,0);
 }
 const center=(g,t)=>({x:g.x*w+Math.sin(t*.00007+g.y*14)*18,y:g.y*h+Math.cos(t*.00008+g.x*17)*12});
 function positions(g,t){
  const c=center(g,t);
  return g.particles.map((p,i)=>{
    const target=g.stars[i];
    const idleX=c.x+p.offsetX+Math.sin(t*p.rate+p.phase)*p.rx;
    const idleY=c.y+p.offsetY+Math.cos(t*(p.rate*.89)+p.phase)*p.ry;
    const snapX=c.x+target[0]*g.scale;
    const snapY=c.y+target[1]*g.scale;
    return {x:idleX+(snapX-idleX)*g.active,y:idleY+(snapY-idleY)*g.active,r:p.size};
  });
 }
 function render(t){
  frame=0;
  if(!visible||document.hidden||document.body.dataset.chapter!=='expertise')return;
  last=t;ctx.clearRect(0,0,w,h);
  ctx.shadowBlur=0;
  for(const star of freeStars){
    const sx=star.x*w+Math.sin(t*star.speed+star.phase)*13;
    const sy=star.y*h+Math.cos(t*star.speed*.73+star.phase)*10;
    ctx.fillStyle=`rgba(102,214,208,${star.brightness*(.82+.18*Math.sin(t*.0011+star.phase))})`;
    ctx.beginPath();ctx.arc(sx,sy,star.radius,0,Math.PI*2);ctx.fill();
  }
  let best=-1,bestD=1e6;
  const groupPos=constellations.map(g=>positions(g,t));
  if(px>0&&py>0){
   groupPos.forEach((pts,i)=>{const c=center(constellations[i],t);let d=Math.hypot(px-c.x,py-c.y);
    for(const p of pts)d=Math.min(d,Math.hypot(px-p.x,py-p.y)*1.55);
    if(d<bestD){bestD=d;best=i;}
   });
  }
  nearIndex=bestD<Math.min(195,Math.max(125,w*.145))?best:-1;
  constellations.forEach((g,gi)=>{
   const target=gi===nearIndex?1:0;
   g.active+=reduceMotion?(target-g.active):(target-g.active)*.075;
   const pts=positions(g,t);
   const lit=g.active;
   ctx.lineWidth=.75;
   for(const [a,b] of g.edges){
    const pa=pts[a],pb=pts[b];
    ctx.strokeStyle=`rgba(89,231,214,${.013+lit*.43})`;
    ctx.shadowColor='rgba(85,248,220,.55)';ctx.shadowBlur=lit*8;
    ctx.beginPath();ctx.moveTo(pa.x,pa.y);ctx.lineTo(pb.x,pb.y);ctx.stroke();
   }
   ctx.shadowBlur=0;
   pts.forEach((p,i)=>{
    const strength=.27+lit*.73;
    ctx.fillStyle=`rgba(116,240,231,${strength})`;
    ctx.shadowBlur=2.5+lit*11;ctx.shadowColor='rgba(100,255,232,.85)';
    ctx.beginPath();ctx.arc(p.x,p.y,p.r+lit*.35,0,Math.PI*2);ctx.fill();
   });
   ctx.shadowBlur=0;
   if(lit>.30){const c=center(g,t);
    ctx.fillStyle=`rgba(120,236,223,${lit*.56})`;
    ctx.font='700 9px DM Sans, sans-serif';ctx.letterSpacing='1.8px';
    ctx.fillText(g.name,c.x-43,c.y+g.scale*78);
   }
  });
  if(!reduceMotion)frame=requestAnimationFrame(render);
 }
 const restart=()=>{if(!frame&&!document.hidden&&visible&&document.body.dataset.chapter==='expertise')frame=requestAnimationFrame(render)};
 exp.addEventListener('pointermove',e=>{if(e.pointerType==='touch')return;const b=exp.getBoundingClientRect();px=e.clientX-b.left;py=e.clientY-b.top;if(reduceMotion)render(performance.now());},{passive:true});
 exp.addEventListener('pointerleave',()=>{px=-9999;py=-9999;if(reduceMotion)render(performance.now())});
 if('ResizeObserver'in window)new ResizeObserver(()=>{measure();if(reduceMotion)render(performance.now())}).observe(exp);
 else window.addEventListener('resize',measure);
 if('IntersectionObserver'in window)new IntersectionObserver(es=>{visible=!!es[0]?.isIntersecting;if(visible)restart()},{threshold:.01}).observe(exp);
 document.addEventListener('visibilitychange',restart);
 window.addEventListener('portfolio:chapterchange',()=>requestAnimationFrame(restart));
 measure();restart();
}

/* EXPERIENCE — draw a track as separate physical segments between markers.
   There is no element behind the numbered circles. Expanded cards don't cross it. */
const track=document.querySelector('#experience .timeline');
if(track){
 const items=[...track.querySelectorAll(':scope > .timeline-item')];
 const layer=document.createElement('div');layer.className='career-segment-layer';layer.setAttribute('aria-hidden','true');
 track.prepend(layer);
 const segments=[];
 for(let i=0;i<items.length-1;i++){
  const seg=document.createElement('div');seg.className='career-segment';
  const fill=document.createElement('span');seg.append(fill);layer.append(seg);segments.push({seg,fill});
 }
 let request=0;
 function update(){
  request=0;
  const box=track.getBoundingClientRect();
  const marks=items.map(el=>{
   const pseudo=getComputedStyle(el,'::before');const eb=el.getBoundingClientRect();
   const left=parseFloat(pseudo.left)||0,top=parseFloat(pseudo.top)||0;
   const diameter=parseFloat(pseudo.width)||34;
   return {x:eb.left-box.left+left+diameter/2,y:eb.top-box.top+top+diameter/2,r:diameter/2};
  });
  const readY=window.innerHeight*.62-box.top;
  const atEnd=document.documentElement.scrollHeight - window.scrollY - window.innerHeight<35;
  segments.forEach(({seg,fill},i)=>{
   const a=marks[i],b=marks[i+1];
   const start=a.y+a.r+3,end=b.y-b.r-3;
   const len=Math.max(0,end-start);
   seg.style.left=(a.x-1)+'px';seg.style.top=start+'px';seg.style.height=len+'px';
   const fraction=atEnd?1:clamp((readY-start)/Math.max(1,len),0,1);
   fill.style.height=(fraction*100).toFixed(2)+'%';
  });
 }
 const schedule=()=>{if(!request)request=requestAnimationFrame(update)};
 if('ResizeObserver'in window)new ResizeObserver(schedule).observe(track);
 items.forEach(item=>item.querySelector('details')?.addEventListener('toggle',()=>requestAnimationFrame(schedule)));
 window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule,{passive:true});
 window.addEventListener('portfolio:chapterchange',()=>requestAnimationFrame(schedule));
 schedule();
}

/* EDUCATION — layered rotating instrument. Its rings react to cursor proximity. */
const education=document.getElementById('education');
if(education){
 const orbit=document.createElement('div');orbit.className='academic-orbit';orbit.setAttribute('aria-hidden','true');
 const radial=document.createElement('div');radial.className='orbit-radial';orbit.append(radial);
 const rings=[];
 for(let i=0;i<4;i++){
  const ring=document.createElement('div');ring.className='orbit-shell '+['orbit-one','orbit-two','orbit-three','orbit-four'][i];orbit.append(ring);rings.push(ring);
 }
 const core=document.createElement('div');core.className='orbit-core';orbit.append(core);
 education.prepend(orbit);
 let pending=0,pos=null;
 education.addEventListener('pointermove',e=>{
  if(e.pointerType==='touch')return;
  const b=orbit.getBoundingClientRect();
  pos={x:e.clientX-b.left-b.width/2,y:e.clientY-b.top-b.height/2,size:b.width};
  if(pending)return;
  pending=requestAnimationFrame(()=>{
   pending=0;const d=Math.hypot(pos.x,pos.y),r=pos.size/2;
   const fractions=[.84,.62,.40,.20];
   rings.forEach((el,i)=>el.classList.toggle('is-lit',Math.abs(d-r*fractions[i])<30));
  });
 },{passive:true});
 education.addEventListener('pointerleave',()=>rings.forEach(el=>el.classList.remove('is-lit')));
}
})();
