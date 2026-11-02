/* Opening-screen grid illumination. No networking, storage, or external requests. */
(() => {
  'use strict';
  const opening = document.querySelector('.opening-screen');
  const overlay = opening?.querySelector('.edge-grid-reactive');
  if (!opening || !overlay || !window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 961px)').matches) return;
  let raf = 0;
  let x = 0;
  let y = 0;
  let isInside = false;
  const update = () => {
    raf = 0;
    if (document.documentElement.dataset.motion === 'off') return;
    overlay.style.setProperty('--light-x', `${x}px`);
    overlay.style.setProperty('--light-y', `${y}px`);
    const strength = document.documentElement.dataset.theme === 'light' ? '1' : '.76';
    overlay.style.setProperty('--light-strength', isInside ? strength : '0');
  };
  opening.addEventListener('pointermove', event => {
    if (document.documentElement.dataset.motion === 'off') return;
    const bounds = opening.getBoundingClientRect();
    x = event.clientX - bounds.left;
    y = event.clientY - bounds.top;
    // Illuminate nearby grid lines anywhere on the opening screen.
    isInside = true;
    if (!raf) raf = requestAnimationFrame(update);
  }, {passive:true});
  opening.addEventListener('pointerleave', () => {
    isInside = false;
    overlay.style.setProperty('--light-strength', '0');
  });
})();
