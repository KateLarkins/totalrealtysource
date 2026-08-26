(function () {
  'use strict';
  document.documentElement.dataset.mobileCritical = 'ready';
  window.toggleNavDrawer = function () { document.getElementById('navDrawer')?.classList.toggle('open'); };
  window.closeNavDrawer = function () { document.getElementById('navDrawer')?.classList.remove('open'); };

  const mobileScreen = window.matchMedia('(max-width: 800px)');
  let viewer, image, count, previous, next, close, stage;
  let photos = [], photoIndex = 0, priorOverflow = '', priorFocus = null;
  let touchStartX = 0, touchStartY = 0;

  function ensureViewer() {
    if (viewer) return;
    viewer = document.createElement('div');
    viewer.className = 'mobile-photo-viewer';
    viewer.setAttribute('role', 'dialog');
    viewer.setAttribute('aria-modal', 'true');
    viewer.setAttribute('aria-label', 'Listing photos');
    viewer.innerHTML = '<div class="mobile-photo-viewer__top"><button class="mobile-photo-viewer__close" type="button"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>Close</button><p class="mobile-photo-viewer__count" aria-live="polite"></p></div><div class="mobile-photo-viewer__stage"><button class="mobile-photo-viewer__arrow mobile-photo-viewer__arrow--previous" type="button" aria-label="Previous photo"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg></button><img class="mobile-photo-viewer__image" alt=""><button class="mobile-photo-viewer__arrow mobile-photo-viewer__arrow--next" type="button" aria-label="Next photo"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg></button></div><p class="mobile-photo-viewer__help">Swipe left or right to view photos</p>';
    document.body.appendChild(viewer);
    image = viewer.querySelector('.mobile-photo-viewer__image');
    count = viewer.querySelector('.mobile-photo-viewer__count');
    previous = viewer.querySelector('.mobile-photo-viewer__arrow--previous');
    next = viewer.querySelector('.mobile-photo-viewer__arrow--next');
    close = viewer.querySelector('.mobile-photo-viewer__close');
    stage = viewer.querySelector('.mobile-photo-viewer__stage');
    previous.addEventListener('click', function () { movePhoto(-1); });
    next.addEventListener('click', function () { movePhoto(1); });
    close.addEventListener('click', closeViewer);
    viewer.addEventListener('click', function (event) { if (event.target === viewer) closeViewer(); });
    stage.addEventListener('touchstart', function (event) {
      if (event.touches.length !== 1) return;
      touchStartX = event.touches[0].clientX; touchStartY = event.touches[0].clientY;
    }, { passive: true });
    stage.addEventListener('touchend', function (event) {
      if (event.changedTouches.length !== 1) return;
      const deltaX = event.changedTouches[0].clientX - touchStartX;
      const deltaY = event.changedTouches[0].clientY - touchStartY;
      if (Math.abs(deltaX) >= 45 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2) movePhoto(deltaX < 0 ? 1 : -1);
    }, { passive: true });
  }

  function renderPhoto() {
    const photo = photos[photoIndex];
    if (!photo) return;
    image.src = photo.dataset.fullSrc || photo.currentSrc || photo.src;
    image.alt = photo.alt || 'Listing photo';
    count.textContent = (photoIndex + 1) + ' of ' + photos.length;
    previous.hidden = next.hidden = photos.length < 2;
  }
  function movePhoto(direction) {
    if (photos.length < 2) return;
    photoIndex = (photoIndex + direction + photos.length) % photos.length;
    renderPhoto();
  }
  function openViewer(clickedPhoto) {
    ensureViewer();
    const carousel = clickedPhoto.closest('.carousel');
    photos = Array.from(carousel?.querySelectorAll('.slide') || []).filter(function (photo) { return photo.src; });
    if (!photos.length) return;
    photoIndex = Math.max(0, photos.indexOf(clickedPhoto));
    priorOverflow = document.body.style.overflow;
    priorFocus = document.activeElement;
    document.body.style.overflow = 'hidden';
    viewer.classList.add('is-open');
    renderPhoto();
    close.focus({ preventScroll: true });
  }
  function closeViewer() {
    if (!viewer?.classList.contains('is-open')) return;
    viewer.classList.remove('is-open');
    image.removeAttribute('src');
    document.body.style.overflow = priorOverflow;
    priorFocus?.focus?.({ preventScroll: true });
  }

  document.addEventListener('click', function (event) {
    const carousel = event.target.closest?.('.custom-modal .carousel');
    if (!carousel || event.target.closest?.('button') || !mobileScreen.matches) return;
    const clickedPhoto = event.target.closest?.('.slide') ||
      Array.from(carousel.querySelectorAll('.slide')).find(function (photo) { return getComputedStyle(photo).display !== 'none'; });
    if (!clickedPhoto) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    openViewer(clickedPhoto);
  }, true);
  document.addEventListener('keydown', function (event) {
    if (!viewer?.classList.contains('is-open')) return;
    if (event.key === 'Escape') closeViewer();
    if (event.key === 'ArrowLeft') movePhoto(-1);
    if (event.key === 'ArrowRight') movePhoto(1);
  });
  mobileScreen.addEventListener('change', function (event) { if (!event.matches) closeViewer(); });
  window.__trsMobileViewerReady = true;
  document.documentElement.dataset.mobileCritical = 'listeners-ready';
}());
