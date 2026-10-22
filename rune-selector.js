/* Rune Explorer v8 — discrete, event-triggered switching.
   Explorer's open state is independent of the visitor's scroll position.
   The presentation switches once per scroll gesture (not gradually across
   an arbitrary scroll distance), so it cannot be left half-transformed.
*/
(() => {
  const home = document.getElementById('primary-nav');
  const side = document.getElementById('compact-nav');
  const toggle = document.getElementById('menu-toggle');
  const label = document.getElementById('explorer-trigger-label');
  const sublabel = document.getElementById('explorer-trigger-sub');
  if (!home || !side || !toggle) return;

  const panels = [home, side];
  const tiles = panels.flatMap(panel => Array.from(panel.querySelectorAll('.rune-tile')));
  const detailTitle = document.getElementById('rune-detail-title');
  const detailDesc = document.getElementById('rune-detail-desc');
  let open = true;
  let mode = window.scrollY > 10 ? 'side' : 'home';
  let scrollFrame = 0;
  let previousScrollY = window.scrollY;
  let activeHref = ''; // The chapter controls own the persistent selection.

  function render() {
    document.body.classList.toggle('rune-mode-home', mode === 'home');
    document.body.classList.toggle('rune-mode-side', mode === 'side');
    document.body.classList.toggle('rune-is-open', open);
    document.body.classList.toggle('rune-is-closed', !open);
    panels.forEach(panel => panel.classList.toggle('open', open));
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close explorer' : 'Open explorer');
    if (label) label.textContent = open ? 'Close' : 'Open';
    if (sublabel) sublabel.textContent = 'Explorer';
    // Hidden panel is not available to keyboards or screen readers.
    home.inert = !open || mode !== 'home';
    side.inert = !open || mode !== 'side';
    home.setAttribute('aria-hidden', String(!open || mode !== 'home'));
    side.setAttribute('aria-hidden', String(!open || mode !== 'side'));
  }

  function setMode(next) {
    if (next !== mode) {
      mode = next;
      render();
    }
  }

  function setOpen(next) {
    open = Boolean(next);
    render();
  }
  window.setExplorerOpen = setOpen;

  function preview(tile) {
    const hoverHref = tile?.getAttribute('href') || '';
    const shownHref = hoverHref || activeHref;
    tiles.forEach(t => {
      const href = t.getAttribute('href');
      t.classList.toggle('is-preview', Boolean(hoverHref && href === hoverHref));
      t.classList.toggle('is-current', Boolean(activeHref && href === activeHref));
      if (activeHref && href === activeHref) t.setAttribute('aria-current', 'page');
      else t.removeAttribute('aria-current');
    });
    const shownTile = tiles.find(t => t.getAttribute('href') === shownHref);
    if (detailTitle) detailTitle.textContent = shownTile?.dataset.label || 'Choose your path';
    if (detailDesc) detailDesc.textContent = shownTile?.dataset.detail || 'Select a rune to explore the portfolio.';
  }

  function syncChapter(key) {
    activeHref = key && key !== 'home' ? `#${key}` : '';
    preview(null); // Arrow navigation always clears stale hover previews.
  }

  tiles.forEach(tile => {
    tile.addEventListener('pointerenter', () => preview(tile));
    tile.addEventListener('focus', () => preview(tile));
    tile.addEventListener('click', () => {
      // A chapter change will set the persistent active tile. Do not close Explorer.
      preview(null);
    });
  });
  panels.forEach(panel => {
    panel.addEventListener('pointerleave', () => preview(null));
    panel.addEventListener('focusout', event => {
      if (!panel.contains(event.relatedTarget)) preview(null);
    });
  });
  panels.forEach(panel => panel.querySelector('.rune-close')?.addEventListener('click', () => {
    setOpen(false);
    toggle.focus();
  }));

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && open) { setOpen(false); toggle.focus(); }
    if (!document.body.classList.contains('chapter-nav-enabled') && ['PageDown', 'ArrowDown', ' ', 'End'].includes(e.key) && !e.altKey && !e.ctrlKey && !e.metaKey) {
      if (!e.target.closest('input, textarea, select, [contenteditable="true"]')) setMode('side');
    }
    if (!document.body.classList.contains('chapter-nav-enabled') && e.key === 'Home' && !e.altKey && !e.ctrlKey && !e.metaKey) {
      // Returning to the top should restore the large palette when the browser scrolls.
      requestAnimationFrame(() => { if (window.scrollY < 6) setMode('home'); });
    }
  });

  // A single downward wheel gesture changes the display immediately, rather
  // than tying visibility to how far the page has scrolled.
  window.addEventListener('wheel', e => {
    if (document.body.classList.contains('chapter-nav-enabled')) return;
    if (Math.abs(e.deltaY) < 1) return;
    if (e.deltaY > 0 && mode === 'home') setMode('side');
    if (e.deltaY < 0 && mode === 'side' && window.scrollY <= 6) setMode('home');
  }, {passive:true});

  let lastTouchY = null;
  window.addEventListener('touchstart', e => { lastTouchY = e.touches[0]?.clientY ?? null; }, {passive:true});
  window.addEventListener('touchmove', e => {
    if (document.body.classList.contains('chapter-nav-enabled')) return;
    const y = e.touches[0]?.clientY;
    if (typeof y !== 'number' || lastTouchY === null) return;
    if (lastTouchY - y > 10 && mode === 'home') { setMode('side'); lastTouchY = y; }
    if (y - lastTouchY > 10 && window.scrollY <= 6 && mode === 'side') { setMode('home'); lastTouchY = y; }
  }, {passive:true});
  window.addEventListener('touchend', () => { lastTouchY = null; }, {passive:true});

  window.addEventListener('scroll', () => {
    if (document.body.classList.contains('chapter-nav-enabled')) return;
    if (scrollFrame) return;
    scrollFrame = requestAnimationFrame(() => {
      scrollFrame = 0;
      const y = window.scrollY;
      if (y <= 4 && y < previousScrollY) setMode('home');
      else if (y > 10) setMode('side');
      previousScrollY = y;
    });
  }, {passive:true});

  window.addEventListener('portfolio:chapterchange', event => {
    setMode(event.detail.key === 'home' ? 'home' : 'side');
    syncChapter(event.detail.key);
  });

  // Position the side panel directly under the Explorer button on resize.
  function placeSide() {
    const r = toggle.getBoundingClientRect();
    const width = 151;
    const x = Math.min(Math.max(r.right - width, 12), Math.max(12, innerWidth - width - 12));
    side.style.left = `${x}px`;
    side.style.right = 'auto';
    side.style.top = `${r.bottom + 8}px`;
  }
  window.addEventListener('resize', placeSide, {passive:true});
  placeSide();
  render();
  syncChapter(document.body.dataset.chapter || 'home');
})();
