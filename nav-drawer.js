document.addEventListener('pointerdown', function dismissOpenNavigation(event) {
  const drawer = document.getElementById('navDrawer');
  if (!drawer?.classList.contains('open')) return;
  if (drawer.contains(event.target) || event.target.closest('.mobile-arrow')) return;
  drawer.classList.remove('open');
});

document.addEventListener('keydown', function dismissNavigationWithEscape(event) {
  if (event.key === 'Escape') document.getElementById('navDrawer')?.classList.remove('open');
});

// Keep the For Sale menu consistent on every page, including pages that still
// carry older inline navigation markup.
document.querySelectorAll('.dropdown-container .dropdown').forEach(menu => {
  const existingAll = Array.from(menu.querySelectorAll('a')).find(link =>
    link.getAttribute('href') === 'forsale.html' || /all listings/i.test(link.textContent)
  );
  if (existingAll) {
    existingAll.textContent = 'All Listings for Sale';
    existingAll.setAttribute('href', 'forsale.html');
    menu.prepend(existingAll);
  } else {
    const link = document.createElement('a');
    link.href = 'forsale.html';
    link.className = 'dropdown-item';
    link.textContent = 'All Listings for Sale';
    menu.prepend(link);
  }
});

document.querySelectorAll('.drawer-dropdown .drawer-submenu').forEach(menu => {
  const existingAll = Array.from(menu.querySelectorAll('a')).find(link =>
    link.getAttribute('href') === 'forsale.html' || /all listings/i.test(link.textContent)
  );
  if (existingAll) {
    existingAll.textContent = 'All Listings for Sale';
    existingAll.setAttribute('href', 'forsale.html');
    menu.prepend(existingAll);
  } else {
    const link = document.createElement('a');
    link.href = 'forsale.html';
    link.className = 'drawer-link';
    link.textContent = 'All Listings for Sale';
    menu.prepend(link);
  }
});

// Closed drawers and collapsed submenus must not remain keyboard or screen-reader targets.
(() => {
  const drawer = document.getElementById('navDrawer');
  if (!drawer) return;
  const toggle = document.querySelector('.mobile-arrow');
  toggle?.setAttribute('aria-label', 'Open navigation');
  toggle?.setAttribute('aria-controls', 'navDrawer');
  const syncDrawer = () => {
    const open = drawer.classList.contains('open');
    drawer.inert = !open;
    drawer.setAttribute('aria-hidden', String(!open));
    toggle?.setAttribute('aria-expanded', String(open));
    toggle?.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    drawer.querySelectorAll('.drawer-dropdown').forEach(group => {
      const expanded = group.classList.contains('open');
      group.querySelector(':scope > .drawer-link')?.setAttribute('aria-expanded', String(expanded));
      const menu = group.querySelector('.drawer-submenu');
      if (menu) { menu.inert = !expanded; menu.setAttribute('aria-hidden', String(!expanded)); }
    });
  };
  new MutationObserver(syncDrawer).observe(drawer, {attributes:true, attributeFilter:['class'], subtree:true});
  syncDrawer();
  drawer.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    drawer.classList.remove('open');
    toggle?.focus();
  });
})();

// Decorative icons are not additional controls, and each visible close icon needs a keyboard action.
document.querySelectorAll('i.fa').forEach(icon => icon.setAttribute('aria-hidden', 'true'));
document.querySelectorAll('.custom-modal .close').forEach(close => {
  close.setAttribute('role', 'button');
  close.setAttribute('tabindex', '0');
  close.setAttribute('aria-label', 'Close property details');
  close.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); close.click(); }
  });
});
