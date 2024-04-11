// Function to check if an element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Function to reveal elements when they enter viewport
function revealElements() {
  const elements = document.querySelectorAll('.reveal');
  elements.forEach(element => {
      if (isInViewport(element)) {
          element.classList.add('visible');
      }
  });
}

// Event listener for scroll event
window.addEventListener('scroll', revealElements);

// Initially reveal elements in viewport
revealElements();

document.addEventListener("DOMContentLoaded", function() {
  var menuToggle = document.getElementById("menu-toggle");
  var navbarNav = document.querySelector(".navbar-nav");

  menuToggle.addEventListener("click", function() {
    navbarNav.classList.toggle("show");
  });
});
