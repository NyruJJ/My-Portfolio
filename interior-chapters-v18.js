(()=>{
'use strict';
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const NS='http://www.w3.org/2000/svg';
const makeSVG=(tag,attrs={})=>{const el=document.createElementNS(NS,tag);for(const [k,v] of Object.entries(attrs))el.setAttribute(k,String(v));return el};
const rand=(min,max)=>Math.random()*(max-min)+min;

/* =========================
   EXPERTISE ambient travelers
   ========================= */
const expertise=document.getElementById('expertise');
if(expertise){
  const bg=expertise.querySelector('.ambient-proximity-graph');
  if(bg && !bg.dataset.v18Enhanced){
    bg.dataset.v18Enhanced='true';
    const edgeEls=[...bg.querySelectorAll('.ambient-edge')];
    const travelers=[];
    const group=makeSVG('g',{'aria-hidden':'true'});
    bg.appendChild(group);
    for(let i=0;i<12;i++){
      const edge=edgeEls[Math.floor(Math.random()*edgeEls.length)];
      if(!edge) break;
      const dot=makeSVG('circle',{class:`ambient-traveler${i<3?' is-strong':''}`,r:i<3?2.2:1.5,cx:'0',cy:'0'});
      group.appendChild(dot);
      travelers.push({
        dot,
        edge,
        len:edge.getTotalLength(),
        start:performance.now()-rand(0,6000),
        dur:rand(3400,7600)
      });
    }
    let visible=true, raf=0;
    const currentChapter=()=>document.body.dataset.chapter==='expertise';
    if('IntersectionObserver' in window){
      new IntersectionObserver(entries=>{visible=!!entries[0]?.isIntersecting;if(visible) kick();},{threshold:.02}).observe(expertise);
    }
    function resetTraveler(t){
      const edge=edgeEls[Math.floor(Math.random()*edgeEls.length)];
      if(!edge)return;
      t.edge=edge; t.len=edge.getTotalLength(); t.start=performance.now(); t.dur=rand(3600,8400);
    }
    function tick(now){
      raf=0;
      if(reduced || document.hidden || !visible || !currentChapter()) return;
      for(const t of travelers){
        let p=(now-t.start)/t.dur;
        if(p>=1){ resetTraveler(t); p=0; }
        const point=t.edge.getPointAtLength(t.len*p);
        t.dot.setAttribute('cx',point.x.toFixed(1));
        t.dot.setAttribute('cy',point.y.toFixed(1));
      }
      raf=requestAnimationFrame(tick);
    }
    function kick(){ if(!raf && !reduced && !document.hidden && visible && currentChapter()) raf=requestAnimationFrame(tick); }
    document.addEventListener('visibilitychange',()=>{ if(!document.hidden) kick(); });
    window.addEventListener('portfolio:chapterchange',()=>requestAnimationFrame(kick));
    kick();
  }
}

/* =========================
   CONTACT hex network + travelers
   ========================= */
const contact=document.getElementById('contact');
if(contact){
  const constellation=contact.querySelector('.contact-constellation');
  const surface=contact.querySelector('.contact-surface');
  const svg=constellation?.querySelector('svg');
  if(svg && !svg.dataset.v18Hex){
    svg.dataset.v18Hex='true';
    svg.textContent='';
    const width=900, height=300;
    const coords=[];
    const cols=8, rows=4;
    const xStep=108, yStep=62, xStart=78, yStart=54;
    for(let row=0; row<rows; row++){
      const offset=row%2 ? xStep/2 : 0;
      for(let col=0; col<cols; col++){
        const x=xStart+offset+col*xStep;
        const y=yStart+row*yStep;
        if(x<860) coords.push([x,y]);
      }
    }
    const pairs=[];
    const threshold=114;
    for(let i=0;i<coords.length;i++){
      for(let j=i+1;j<coords.length;j++){
        const dx=coords[j][0]-coords[i][0], dy=coords[j][1]-coords[i][1];
        const d=Math.hypot(dx,dy);
        if(d>20 && d<threshold && Math.abs(dy) < yStep+8) pairs.push([i,j]);
      }
    }
    const linkGroup=makeSVG('g');
    const nodeGroup=makeSVG('g');
    const travelerGroup=makeSVG('g');
    const graphLinks=pairs.map(([a,b])=>{
      const el=makeSVG('path',{class:'contact-graph-line',d:`M${coords[a][0]} ${coords[a][1]} L${coords[b][0]} ${coords[b][1]}`});
      linkGroup.appendChild(el);
      return {a,b,el,len:el.getTotalLength()};
    });
    const graphNodes=coords.map(([x,y])=>{
      const el=makeSVG('circle',{class:'contact-graph-node',cx:x,cy:y,r:2.2});
      nodeGroup.appendChild(el);
      return el;
    });
    const travelers=[];
    for(let i=0;i<9;i++){
      const link=graphLinks[Math.floor(Math.random()*graphLinks.length)];
      const dot=makeSVG('circle',{class:'contact-traveler',r:i<3?2.1:1.5,cx:'0',cy:'0'});
      travelerGroup.appendChild(dot);
      travelers.push({dot,link,start:performance.now()-rand(0,7000),dur:rand(2600,6200)});
    }
    svg.append(linkGroup, travelerGroup, nodeGroup);

    let hoverRAF=0, pointer=null;
    const resetHover=()=>{
      graphNodes.forEach(n=>n.classList.remove('is-near'));
      graphLinks.forEach(l=>l.el.classList.remove('is-near'));
    };
    surface?.addEventListener('pointermove',e=>{
      if(e.pointerType==='touch') return;
      const box=svg.getBoundingClientRect();
      if(!box.width||!box.height) return;
      pointer=[(e.clientX-box.left)*width/box.width,(e.clientY-box.top)*height/box.height,box.width,box.height];
      if(hoverRAF) return;
      hoverRAF=requestAnimationFrame(()=>{
        hoverRAF=0;
        if(!pointer) return;
        const near=coords.map(([x,y],i)=>{
          const d=Math.hypot((x-pointer[0])*pointer[2]/width,(y-pointer[1])*pointer[3]/height);
          const on=d<96;
          graphNodes[i].classList.toggle('is-near',on);
          return on;
        });
        graphLinks.forEach(({a,b,el})=>el.classList.toggle('is-near',near[a]||near[b]));
      });
    },{passive:true});
    surface?.addEventListener('pointerleave',resetHover);

    let visible=true, raf=0;
    const currentChapter=()=>document.body.dataset.chapter==='contact';
    if('IntersectionObserver' in window){
      new IntersectionObserver(entries=>{visible=!!entries[0]?.isIntersecting;if(visible) kick();},{threshold:.02}).observe(contact);
    }
    function resetTraveler(t){
      t.link=graphLinks[Math.floor(Math.random()*graphLinks.length)];
      t.start=performance.now();
      t.dur=rand(2800,6600);
    }
    function animate(now){
      raf=0;
      if(reduced || document.hidden || !visible || !currentChapter()) return;
      for(const t of travelers){
        let p=(now-t.start)/t.dur;
        if(p>=1){ resetTraveler(t); p=0; }
        const point=t.link.el.getPointAtLength(t.link.len*p);
        t.dot.setAttribute('cx',point.x.toFixed(1));
        t.dot.setAttribute('cy',point.y.toFixed(1));
      }
      raf=requestAnimationFrame(animate);
    }
    function kick(){ if(!raf && !reduced && !document.hidden && visible && currentChapter()) raf=requestAnimationFrame(animate); }
    document.addEventListener('visibilitychange',()=>{ if(!document.hidden) kick(); });
    window.addEventListener('portfolio:chapterchange',()=>requestAnimationFrame(kick));
    kick();
  }
}
})();
