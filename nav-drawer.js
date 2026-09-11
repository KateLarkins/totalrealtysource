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
