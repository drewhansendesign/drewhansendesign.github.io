// Shared behavior for the rebuilt case studies: sideways scrollers, the
// full-size viewer and the sticky chapter bar.
// Sideways scrollers: arrow buttons page through, mouse drag pans, and the
// buttons dim at either end. Touch keeps native scrolling.
for (const root of document.querySelectorAll<HTMLElement>('[data-scroller]')) {
  const track = root.querySelector<HTMLElement>('.scroller-track')!;
  const [back, fwd] = root.querySelectorAll<HTMLButtonElement>('.scroller-btns button');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const update = () => {
    const max = track.scrollWidth - track.clientWidth - 2;
    back.disabled = track.scrollLeft <= 2;
    fwd.disabled = track.scrollLeft >= max;
  };
  for (const b of [back, fwd]) {
    b.addEventListener('click', () => {
      track.scrollBy({ left: Number(b.dataset.dir) * track.clientWidth * 0.75, behavior: reduce ? 'auto' : 'smooth' });
    });
  }
  let startX = 0;
  let startLeft = 0;
  let moved = false;
  track.addEventListener('pointerdown', (e) => {
    if (e.pointerType !== 'mouse' || e.button !== 0) return;
    startX = e.clientX;
    startLeft = track.scrollLeft;
    moved = false;
    track.setPointerCapture(e.pointerId);
    track.classList.add('dragging');
  });
  track.addEventListener('pointermove', (e) => {
    if (!track.classList.contains('dragging')) return;
    const dx = e.clientX - startX;
    if (Math.abs(dx) > 4) moved = true;
    track.scrollLeft = startLeft - dx;
  });
  const end = () => track.classList.remove('dragging');
  track.addEventListener('pointerup', end);
  track.addEventListener('pointercancel', end);
  // A drag shouldn't also count as a click on whatever was under the pointer
  track.addEventListener('click', (e) => {
    if (moved) {
      e.preventDefault();
      e.stopPropagation();
      moved = false;
    }
  }, true);
  track.addEventListener('scroll', update, { passive: true });
  addEventListener('resize', update);
  update();
}

// Full-size viewer for the journey map, wireframes and IA: opens fitted to
// the screen; click (or the Zoom button) shows it at full size, where it can
// be dragged or scrolled. A native dialog handles focus, Esc and the backdrop.
const dialog = document.querySelector<HTMLDialogElement>('.viewer');
if (dialog) {
  const data = JSON.parse(document.getElementById('viewer-data')!.textContent || '{}');
  const stage = dialog.querySelector<HTMLElement>('.viewer-stage')!;
  // The image element is made here rather than shipped empty in the markup
  const img = document.createElement('img');
  img.draggable = false;
  img.decoding = 'async';
  stage.append(img);
  // Report mode: several pages stacked, read top to bottom
  const report = document.createElement('div');
  report.className = 'viewer-report';
  report.hidden = true;
  stage.append(report);
  const hint = dialog.querySelector<HTMLElement>('.viewer-hint')!;
  const imageHint = hint.textContent;
  const zoomBtn = dialog.querySelector<HTMLButtonElement>('.viewer-zoom')!;
  const title = dialog.querySelector<HTMLElement>('.viewer-title')!;
  const setZoom = (on: boolean, at?: { x: number; y: number }) => {
    const before = img.getBoundingClientRect();
    dialog.classList.toggle('zoomed', on);
    zoomBtn.setAttribute('aria-pressed', String(on));
    zoomBtn.textContent = on ? 'Fit to screen' : 'Zoom in';
    if (on && at) {
      // Keep the clicked spot under the pointer
      const fx = (at.x - before.left) / before.width;
      const fy = (at.y - before.top) / before.height;
      stage.scrollLeft = fx * img.offsetWidth - (at.x - stage.getBoundingClientRect().left);
      stage.scrollTop = fy * img.offsetHeight - (at.y - stage.getBoundingClientRect().top);
    }
  };
  // Each open gets a number, so a slow image from an earlier open can't
  // reveal itself over a newer one
  let openId = 0;
  for (const btn of document.querySelectorAll<HTMLButtonElement>('[data-view]')) {
    btn.addEventListener('click', () => {
      const v = data[btn.dataset.view!];
      if (!v) return;
      const id = ++openId;
      // Hide the stage until the new artwork has decoded, with a loader in
      // its place, so the previous one never flashes up first
      stage.classList.add('loading');
      title.textContent = v.title;
      setZoom(false);
      const isReport = Array.isArray(v.pages);
      dialog.classList.toggle('report', isReport);
      img.hidden = isReport;
      report.hidden = !isReport;
      zoomBtn.hidden = isReport;
      if (isReport) {
        report.replaceChildren(
          ...v.pages.map((pg: { src: string; w: number; h: number }, i: number) => {
            const el = document.createElement('img');
            el.src = pg.src;
            el.width = pg.w;
            el.height = pg.h;
            el.alt = `${v.title}, page ${i + 1} of ${v.pages.length}`;
            el.loading = i < 2 ? 'eager' : 'lazy';
            el.decoding = 'async';
            return el;
          })
        );
        hint.textContent = 'Scroll to read, and press Esc to close.';
      } else {
        img.removeAttribute('src');
        img.src = v.src;
        img.alt = v.alt;
        img.width = v.w;
        img.height = v.h;
        hint.textContent = imageHint;
      }
      stage.setAttribute('aria-label', isReport ? `${v.title}, scrollable` : `${v.title}, scrollable when zoomed`);
      dialog.showModal();
      stage.scrollTop = 0;
      const first = isReport ? report.querySelector('img') : img;
      (first ? first.decode() : Promise.resolve())
        .catch(() => {})
        .then(() => {
          if (id === openId) stage.classList.remove('loading');
        });
    });
  }
  zoomBtn.addEventListener('click', () => setZoom(!dialog.classList.contains('zoomed')));
  dialog.querySelector('.viewer-close')!.addEventListener('click', () => dialog.close());
  // A click on the backdrop (the dialog itself, outside the panel) closes it
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) dialog.close();
  });
  let sx = 0, sy = 0, sl = 0, st = 0, moved = false, down = false;
  stage.addEventListener('pointerdown', (e) => {
    if (e.pointerType !== 'mouse' || e.button !== 0) return;
    down = true;
    moved = false;
    sx = e.clientX; sy = e.clientY; sl = stage.scrollLeft; st = stage.scrollTop;
    if (dialog.classList.contains('zoomed')) stage.setPointerCapture(e.pointerId);
  });
  stage.addEventListener('pointermove', (e) => {
    if (!down || !dialog.classList.contains('zoomed')) return;
    const dx = e.clientX - sx, dy = e.clientY - sy;
    if (Math.abs(dx) + Math.abs(dy) > 4) {
      moved = true;
      stage.classList.add('dragging');
    }
    stage.scrollLeft = sl - dx;
    stage.scrollTop = st - dy;
  });
  stage.addEventListener('pointerup', (e) => {
    down = false;
    stage.classList.remove('dragging');
    if (!moved && e.target === img) setZoom(!dialog.classList.contains('zoomed'), { x: e.clientX, y: e.clientY });
  });
  stage.addEventListener('pointercancel', () => {
    down = false;
    stage.classList.remove('dragging');
  });
  // Touch and keyboard: tapping the image toggles zoom too
  img.addEventListener('click', (e) => {
    if ((e as PointerEvent).pointerType === 'mouse') return;
    setZoom(!dialog.classList.contains('zoomed'), { x: e.clientX, y: e.clientY });
  });
}

// Highlight the chapter being read in the sticky chapter bar
const links = [...document.querySelectorAll<HTMLAnchorElement>('.chapters ol a')];
const byId = new Map(links.map((a) => [a.hash.slice(1), a]));
const io = new IntersectionObserver(
  (entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      links.forEach((a) => a.removeAttribute('aria-current'));
      const current = byId.get(e.target.id);
      if (!current) continue;
      current.setAttribute('aria-current', 'location');
      // On narrow screens the bar scrolls sideways: bring the current chapter
      // into view without moving the page
      const bar = current.closest('ol')!;
      if (bar.scrollWidth > bar.clientWidth) {
        bar.scrollTo({ left: current.offsetLeft - bar.offsetLeft - 8, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
      }
    }
  },
  { rootMargin: '-45% 0px -50% 0px' }
);
for (const id of byId.keys()) {
  const el = document.getElementById(id);
  if (el) io.observe(el);
}

// On narrow screens, fade whichever end of the chapter bar has more chapters
// past it, so it's clear the bar scrolls
const bar = document.querySelector<HTMLElement>('.chapters ol');
if (bar) {
  const edges = () => {
    const max = bar.scrollWidth - bar.clientWidth;
    bar.classList.toggle('more-left', bar.scrollLeft > 2);
    bar.classList.toggle('more-right', bar.scrollLeft < max - 2);
  };
  bar.addEventListener('scroll', edges, { passive: true });
  addEventListener('resize', edges);
  edges();
}
