# Nyru J. Jackson — Portfolio 2.0 / Signal Deck v20.3 Light Review

## Light theme: Glacier / Ivory — contrast and Home visibility pass

This is a separate edition based on the approved **Signal Deck v19**. The sole design change is a new, professionally contrasted light-mode color treatment: rich cream, ice blue, dark silver, and deep slate.

### Changes

- **Home:** Cream-to-ice atmosphere, slate and blue headings, frosted-glass statistics band, and light Explorer. The grid, hero layout, portrait, and all animations are kept.
- **Projects:** Cream/ice card surfaces with dark-slate typography and framed technical screenshots. All project content, images, filters, and case studies are preserved.
- **Expertise:** Pale glacier background and ivory skill cards. The interactive schematic remains a dark-slate visual anchor, and the drifting constellation effects keep running.
- **Experience:** Cream-and-ice job panels, clearer slate text, readable hover states, and silver/blue markers. Timeline geometry, gaps around numbered markers, and both expandable panels are preserved.
- **Education:** Ivory pathway and credential cards, ice highlights, distinct not-yet-earned status, and adapted orbit lighting.
- **Contact:** Slate feature card against the cream canvas, ice-blue action treatment, and preserved wave/node motion.
- **Navigation and other UI:** Light-mode Explorer, chapter arrows, progress badge, popovers, and project modals with contrast-appropriate colors.

### v20.3 review changes

- Light-mode body, supporting, and small reading text use a near-black slate for stronger contrast on cream and ivory surfaces. Accented large headings and the dark Contact / Expertise feature panels keep their separate treatments.
- Home Matrix code is more visible against the light canvas.
- The Home cursor-reactive grid is more visible when hovered; the existing pointer interaction and animation remain unchanged.
- The chapter-transition sweep, chapter title, and progress indicator use ice / steel / slate colors in light mode, with dark text for clear reading. Transition timing and behavior are unchanged.
- Only the light-theme stylesheet changed. Layout, content, shared CSS, JavaScript, assets, and dark-mode rules were not edited.

### Dark-mode protection

All original v19 CSS, JavaScript, images, and content are **unchanged**. Only `index.html` is updated to add one extra stylesheet (`light-theme-v20.css`) and to label the edition v20. That new stylesheet uses only `:root[data-theme="light"]` scoped selectors and contains no dark-mode rules.

Dark mode remains the default for a first-time visitor unless a previously selected theme is saved in the browser. Toggle using the existing Light/Dark control.

### Run

Unzip and open `index.html` in Chrome or Firefox. The ZIP includes all original local assets and source files. For hosting, upload the *contents* of the directory to your static site's root.

### Validation

The original v20 README records Chromium checks for chapter navigation, Experience details, desktop dark-mode computed styles, and a 390px mobile viewport. The v20.3 changes were checked at source level: only `light-theme-v20.css` and this README differ from the uploaded v20 archive. The v20.2 CSS has not been rendered in a browser during this pass, so review its appearance before publishing.
