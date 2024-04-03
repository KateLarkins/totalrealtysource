window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
      navbar.classList.add('navbar-scrolled');
    } else {
      navbar.classList.remove('navbar-scrolled');
    }
  });

  // JavaScript for Navbar Collapse Toggle
document.addEventListener('DOMContentLoaded', function () {
  const navbarInner = document.querySelector('.navbar-inner');
  const navbarNav = document.querySelector('.navbar-nav');
  const navbarBars = document.querySelector('.fa-bars');

  navbarBars.addEventListener('click', function () {
    navbarInner.classList.toggle('collapsed');
    navbarNav.classList.toggle('collapsed');
  });

  // Close navbar if a nav link is clicked
  const navbarLinks = document.querySelectorAll('.navbar-nav li a');
  navbarLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      navbarInner.classList.add('collapsed');
      navbarNav.classList.add('collapsed');
    });
  });
});
