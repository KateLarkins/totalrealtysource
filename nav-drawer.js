document.addEventListener('pointerdown', function dismissOpenNavigation(event) {
  const drawer = document.getElementById('navDrawer');
  if (!drawer?.classList.contains('open')) return;
  if (drawer.contains(event.target) || event.target.closest('.mobile-arrow')) return;
  drawer.classList.remove('open');
});

document.addEventListener('keydown', function dismissNavigationWithEscape(event) {
  if (event.key === 'Escape') document.getElementById('navDrawer')?.classList.remove('open');
});
