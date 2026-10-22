/* Horizontal Chapters (v12)
   A chapter is one complete content section. Arrows change chapters sideways;
   vertical scrolling stays native *inside* the chapter, no snapping or wheel lock.
   Home -> Projects -> Expertise -> Experience -> Education -> Contact -> Home.
*/
(()=>{
  'use strict';
  const definitions = [
    {key:'home',label:'Home',el:document.querySelector('#main > .opening-screen'),hash:'#top'},
    {key:'work',label:'Projects',el:document.getElementById('work'),hash:'#work'},
    {key:'expertise',label:'Expertise',el:document.getElementById('expertise'),hash:'#expertise'},
    {key:'experience',label:'Experience',el:document.getElementById('experience'),hash:'#experience'},
    {key:'education',label:'Education',el:document.getElementById('education'),hash:'#education'},
    {key:'contact',label:'Contact',el:document.getElementById('contact'),hash:'#contact'}
  ];
  if(definitions.some(d=>!d.el))return;

  const prevButton=document.getElementById('chapter-prev');
  const nextButton=document.getElementById('chapter-next');
  const homeButton=document.getElementById('chapter-home');
  const labelPrev=document.getElementById('chapter-prev-label');
  const labelNext=document.getElementById('chapter-next-label');
  const position=document.getElementById('chapter-position');
  const footer=document.querySelector('body > .footer');
  const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
  const byKey=new Map(definitions.map((x,i)=>[x.key,i]));
  let activeIndex=0;
  let enteringTimer=null;
  let firstRender=true;
  let deckTimer=null;
  let deckLabelTimer=null;
  let isTransitioning=false;
  const deck=document.getElementById('chapter-deck-fx');
  const deckEyebrow=document.getElementById('deck-eyebrow');
  const deckName=document.getElementById('deck-name');
  const motionTime=820;

  function finishDeckTransition(){
    clearTimeout(deckTimer);
    for(const chapter of definitions){
      chapter.el.classList.remove('chapter-leaving','chapter-deck-out','chapter-deck-in','forward','reverse');
      chapter.el.style.removeProperty('top');
    }
    document.body.classList.remove('chapter-changing');
    isTransitioning=false;
  }


  function hashChapter(hash){
    if(hash && hash.startsWith('#project='))return byKey.get('work');
    const key=decodeURIComponent(hash.replace(/^#/,''));
    return byKey.has(key)?byKey.get(key):0;
  }

  function updateActive(index,direction=1,addToHistory=true){
    if(isTransitioning)return;
    const nextIndex=(index+definitions.length)%definitions.length;
    const current=definitions[nextIndex];
    const oldIndex=activeIndex;
    const hasChanged=oldIndex!==nextIndex;
    const shouldAnimate=!firstRender && hasChanged && !reduceMotion.matches;
    const outgoing=shouldAnimate?definitions[oldIndex].el:null;
    const oldScroll=shouldAnimate?window.scrollY:0;
    const isForward=direction>=0;
    clearTimeout(enteringTimer);

    // Freeze the departing chapter at the same visual scroll position so it
    // can recede while the arriving chapter starts at its own top.
    if(outgoing){
      outgoing.style.top=`${-oldScroll}px`;
      outgoing.classList.add('chapter-leaving','chapter-deck-out',isForward?'forward':'reverse');
      document.body.classList.add('chapter-changing');
      isTransitioning=true;
    }

    definitions.forEach((chapter,i)=>{
      chapter.el.classList.remove('chapter-arrive','chapter-arrive-reverse');
      chapter.el.classList.toggle('chapter-active',i===nextIndex);
      chapter.el.setAttribute('aria-hidden',String(i!==nextIndex));
      chapter.el.inert=i!==nextIndex;
    });
    activeIndex=nextIndex;
    document.body.dataset.chapter=current.key;
    definitions.forEach(d=>document.body.classList.toggle('chapter-'+d.key,current.key===d.key));
    document.body.classList.toggle('chapter-contact',current.key==='contact');
    if(footer){footer.inert=current.key!=='contact';footer.setAttribute('aria-hidden',String(current.key!=='contact'))}

    const prev=definitions[(nextIndex+definitions.length-1)%definitions.length].label;
    const upcoming=definitions[(nextIndex+1)%definitions.length].label;
    if(labelPrev)labelPrev.textContent=prev;
    if(labelNext)labelNext.textContent=upcoming;
    prevButton?.setAttribute('aria-label',`Previous chapter: ${prev}`);
    nextButton?.setAttribute('aria-label',`Next chapter: ${upcoming}`);
    if(position){
      position.innerHTML=`<span class="chapter-progress" aria-hidden="true">${definitions.map((_,i)=>`<i class="${i===nextIndex?'is-current':''}"></i>`).join('')}</span><span class="chapter-route-label">${String(nextIndex+1).padStart(2,'0')} / ${String(definitions.length).padStart(2,'0')} · ${current.label.toUpperCase()}</span>`;
      position.setAttribute('aria-label',`Chapter ${nextIndex+1} of ${definitions.length}: ${current.label}`);
    }
    window.scrollTo({top:0,left:0,behavior:'instant'});
    if(hasChanged){
      current.el.classList.remove('gallery-enter','gallery-past');
      current.el.classList.add('gallery-active');
    }

    if(shouldAnimate){
      current.el.classList.add('chapter-deck-in',isForward?'forward':'reverse');
      if(deckEyebrow)deckEyebrow.textContent=`CHAPTER ${String(nextIndex+1).padStart(2,'0')} / ${String(definitions.length).padStart(2,'0')}`;
      if(deckName)deckName.textContent=current.label.toUpperCase();
      clearTimeout(deckLabelTimer);
      deck?.classList.remove('is-playing','forward','reverse');
      void deck?.offsetWidth;
      deck?.classList.add('is-playing',isForward?'forward':'reverse');
      deckTimer=window.setTimeout(finishDeckTransition,motionTime+85);
      // The destination name is deliberately readable for longer than the
      // movement itself. It never blocks another chapter switch.
      deckLabelTimer=window.setTimeout(()=>{
        deck?.classList.remove('is-playing','forward','reverse');
      },1400);
    }

    if(addToHistory && window.location.hash!==current.hash){
      history.pushState({chapter:current.key},'',current.hash);
    }
    window.dispatchEvent(new CustomEvent('portfolio:chapterchange',{detail:{key:current.key,index:nextIndex}}));
    firstRender=false;
  }

  function navigate(key,addToHistory=true){
    if(!byKey.has(key))return;
    const index=byKey.get(key);
    if(index===activeIndex){
      window.scrollTo({top:0,behavior:'smooth'});
      return;
    }
    let delta=index-activeIndex;
    // The left arrow from Home wraps around to Contact and vice versa.
    if(delta===definitions.length-1)delta=-1;
    if(delta===1-definitions.length)delta=1;
    updateActive(index,delta<0?-1:1,addToHistory);
  }
  window.portfolioGoToChapter=navigate;

  prevButton?.addEventListener('click',()=>updateActive(activeIndex-1,-1));
  nextButton?.addEventListener('click',()=>updateActive(activeIndex+1,1));
  homeButton?.addEventListener('click',()=>navigate('home'));

  // Ordinary internal links also work. Never auto-close the Rune Explorer.
  document.addEventListener('click',event=>{
    const link=event.target.closest?.('a[href^="#"]');
    if(!link || event.defaultPrevented || event.button!==0 || event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
    const fragment=link.getAttribute('href');
    const key=fragment==='#top'?'home':fragment.slice(1);
    if(byKey.has(key)){
      event.preventDefault();
      navigate(key);
    }
  },true);

  // Back / forward buttons restore selected chapter.
  const restoreFromHash=()=>{
    const index=hashChapter(window.location.hash);
    if(index!==activeIndex)updateActive(index,index<activeIndex?-1:1,false);
  };
  window.addEventListener('popstate',restoreFromHash);
  window.addEventListener('hashchange',restoreFromHash);

  // Arrow keys are optional shortcuts; do not take over inputs, modals,
  // galleries, or editing controls.
  document.addEventListener('keydown',event=>{
    if(event.defaultPrevented||event.altKey||event.ctrlKey||event.metaKey||event.shiftKey)return;
    if(event.key!=='ArrowLeft'&&event.key!=='ArrowRight')return;
    const target=event.target;
    if(target?.closest?.('a,button,input,textarea,select,[contenteditable="true"],.modal-layer,.lightbox,[role="dialog"],.tt-gallery,.project-image'))return;
    if(document.getElementById('project-modal')?.hidden===false||document.getElementById('lightbox')?.hidden===false)return;
    event.preventDefault();
    updateActive(activeIndex+(event.key==='ArrowRight'?1:-1),event.key==='ArrowRight'?1:-1);
  });

  // Start chapter mode from a direct link when present.
  document.documentElement.classList.add('chapter-navigation-enabled');
  document.body.classList.add('chapter-nav-enabled');
  definitions.forEach(d=>d.el.classList.add('chapter-entry'));
  updateActive(hashChapter(window.location.hash),1,false);
})();
