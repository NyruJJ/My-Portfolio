/* Persistent, page-wide animation control. */
(()=>{
  'use strict';
  const root=document.documentElement;
  const button=document.getElementById('motion-toggle');
  const label=document.getElementById('motion-word');
  const icon=document.getElementById('motion-icon-path');
  if(!button)return;
  let resumeTimer=0;

  const updateButton=()=>{
    const off=root.dataset.motion==='off';
    button.setAttribute('aria-pressed',String(!off));
    button.setAttribute('aria-label',off?'Animations are off. Turn animations on':'Animations are on. Turn animations off');
    button.title=off?'Turn animations on':'Turn animations off';
    if(label)label.textContent=off?'Animations Off':'Animations On';
    if(icon)icon.setAttribute('d',off?'M8 5v14l11-7z':'M8 6v12M16 6v12');
  };

  updateButton();
  button.addEventListener('click',()=>{
    const off=root.dataset.motion!=='off';
    root.dataset.motion=off?'off':'on';
    updateButton();
    if(resumeTimer)clearTimeout(resumeTimer);
    button.classList.remove('is-resuming');
    if(!off){
      void button.offsetWidth;
      button.classList.add('is-resuming');
      resumeTimer=window.setTimeout(()=>button.classList.remove('is-resuming'),1100);
    }
    try{localStorage.setItem('nj-portfolio-motion',off?'off':'on')}catch(e){}
    window.dispatchEvent(new CustomEvent('portfolio:motionchange',{detail:{off}}));
  });
})();
