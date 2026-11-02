/* Signal Deck v19. Keeps Home, Projects, Contact, navigation and story popouts intact. */
(()=>{
'use strict';
const motionOff=()=>document.documentElement.dataset.motion==='off';
const clamp=(v,min,max)=>Math.max(min,Math.min(max,v));

/* EXPERTISE — freely drifting light particles with pointer-near glow. */
const exp=document.getElementById('expertise');
if(exp){
 const canvas=document.createElement('canvas');
 canvas.className='constellation-field';canvas.setAttribute('aria-hidden','true');
 exp.prepend(canvas);
 const ctx=canvas.getContext('2d',{alpha:true});
 let w=1,h=1,dpr=1,visible=true,frame=0,last=0;
 let px=-9999,py=-9999;
 const rand=(n)=>{const v=Math.sin(n*103.17+45.91)*10291.184;return v-Math.floor(v)};
 // Both themes share the same dense, freely drifting field and pointer response.
 const darkStars=Array.from({length:148},(_,i)=>({
  x:.012+rand(i*11+701)*.976,
  y:.018+rand(i*19+814)*.964,
  radius:.55+rand(i*29+900)*.95,
  brightness:.24+rand(i*31+949)*.26,
  phase:rand(i*23+1020)*Math.PI*2,
  speed:.00018+rand(i*37+1080)*.00022,
  driftX:17+rand(i*43+1200)*16,
  driftY:9+rand(i*47+1250)*11
 }));
 function measure(){
  const b=exp.getBoundingClientRect();w=Math.max(1,b.width);h=Math.max(1,b.height);
  dpr=Math.min(window.devicePixelRatio||1,2);
  canvas.width=Math.ceil(w*dpr);canvas.height=Math.ceil(h*dpr);
  canvas.style.width=w+'px';canvas.style.height=h+'px';
  ctx.setTransform(dpr,0,0,dpr,0,0);
 }
 function render(t){
  frame=0;
  if(!visible||document.hidden||document.body.dataset.chapter!=='expertise')return;
  last=t;ctx.clearRect(0,0,w,h);ctx.shadowBlur=0;
  const isLight=document.documentElement.dataset.theme==='light';
  const particleColor=isLight?'40,82,108':'102,214,208';
  for(const star of darkStars){
   const sx=star.x*w+Math.sin(t*star.speed+star.phase)*star.driftX+Math.sin(t*star.speed*.53+star.phase*1.7)*star.driftX*.28;
   const sy=star.y*h+Math.cos(t*star.speed*.76+star.phase)*star.driftY+Math.sin(t*star.speed*.61+star.phase*.8)*star.driftY*.25;
   const distance=px>-9000&&py>-9000?Math.hypot(px-sx,py-sy):Infinity;
   const hover=Math.max(0,1-distance/140);
   const radius=isLight?star.radius*1.5+.2:star.radius;
   if(hover>.01){
    ctx.fillStyle=`rgba(${particleColor},${hover*hover*(isLight ? .16 : .11)})`;
    ctx.beginPath();ctx.arc(sx,sy,radius*(isLight ? 3.1+hover : 2.6+hover),0,Math.PI*2);ctx.fill();
   }
   const pulse=Math.sin(t*.0012+star.phase);
   const opacity=isLight?Math.min(.72,.22+star.brightness*.86+.03*pulse+hover*.15):Math.min(.78,star.brightness*(.84+.16*pulse)+hover*.16);
   ctx.fillStyle=`rgba(${particleColor},${opacity})`;
   ctx.beginPath();ctx.arc(sx,sy,radius+hover*(isLight ? .55 : .4),0,Math.PI*2);ctx.fill();
  }
  if(!motionOff())frame=requestAnimationFrame(render);
 }
 const restart=()=>{if(!motionOff()&&!frame&&!document.hidden&&visible&&document.body.dataset.chapter==='expertise')frame=requestAnimationFrame(render)};
 exp.addEventListener('pointermove',e=>{if(e.pointerType==='touch')return;const b=exp.getBoundingClientRect();px=e.clientX-b.left;py=e.clientY-b.top;if(motionOff())render(last||performance.now());},{passive:true});
 exp.addEventListener('pointerleave',()=>{px=-9999;py=-9999;if(motionOff())render(last||performance.now())});
 if('ResizeObserver'in window)new ResizeObserver(()=>{measure();if(motionOff())render(performance.now())}).observe(exp);
 else window.addEventListener('resize',measure);
 if('IntersectionObserver'in window)new IntersectionObserver(es=>{visible=!!es[0]?.isIntersecting;if(visible){if(motionOff())render(performance.now());else restart()}},{threshold:.01}).observe(exp);
 document.addEventListener('visibilitychange',restart);
 window.addEventListener('portfolio:chapterchange',()=>requestAnimationFrame(()=>{if(motionOff())render(performance.now());else restart()}));
 window.addEventListener('portfolio:motionchange',event=>{
  if(event.detail?.off){if(frame)cancelAnimationFrame(frame);frame=0;if(visible&&!document.hidden&&document.body.dataset.chapter==='expertise')render(performance.now());}
  else restart();
 });
 new MutationObserver(()=>{
  if(motionOff())render(performance.now());
  else restart();
 }).observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});
 measure();if(motionOff())render(performance.now());else restart();
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
