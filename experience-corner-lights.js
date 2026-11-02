/* Let each corner spotlight follow and expand toward a nearby pointer. */
(()=>{
  'use strict';
  const layer=document.querySelector('.experience-corner-lights');
  if(!layer)return;
  const spots=[...layer.querySelectorAll('.experience-corner-spot')];
  if(!spots.length)return;

  const state=new Map(spots.map(spot=>[spot,{x:0,y:0}]));
  const clamp=(value,min,max)=>Math.min(max,Math.max(min,value));
  const clear=()=>spots.forEach(spot=>{
    spot.style.setProperty('--pointer-x','0px');
    spot.style.setProperty('--pointer-y','0px');
    spot.style.setProperty('--pointer-scale','1');
    spot.style.setProperty('--pointer-brightness','1');
    state.set(spot,{x:0,y:0});
  });
  const update=event=>{
    if(event.pointerType==='touch'||
      !document.body.classList.contains('chapter-experience')||
      getComputedStyle(layer).display==='none'){
      clear();
      return;
    }
    spots.forEach(spot=>{
      const rect=spot.getBoundingClientRect();
      const previous=state.get(spot);
      const centerX=rect.left+rect.width/2-previous.x;
      const centerY=rect.top+rect.height/2-previous.y;
      const dx=event.clientX-centerX;
      const dy=event.clientY-centerY;
      const radius=Math.min(rect.width,rect.height)*.58;
      const strength=Math.max(0,1-Math.hypot(dx,dy)/radius);
      const shiftX=clamp(dx*.28,-130,130)*strength;
      const shiftY=clamp(dy*.28,-130,130)*strength;
      spot.style.setProperty('--pointer-x',`${shiftX}px`);
      spot.style.setProperty('--pointer-y',`${shiftY}px`);
      spot.style.setProperty('--pointer-scale',`${1+strength*.20}`);
      spot.style.setProperty('--pointer-brightness',`${1+strength*.50}`);
      state.set(spot,{x:shiftX,y:shiftY});
    });
  };

  window.addEventListener('pointermove',update,{passive:true});
  window.addEventListener('blur',clear);
  window.addEventListener('portfolio:chapterchange',clear);
  window.addEventListener('resize',clear,{passive:true});
  document.addEventListener('mouseleave',clear);
})();
