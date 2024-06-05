// JavaScript to automatically collapse navbar on smaller screens and toggle menu
window.addEventListener("resize", function() {
  const navbar = document.getElementById("myTopnav");
  const windowWidth = window.innerWidth;

  if (windowWidth <= 768) {
    navbar.classList.add("responsive", "collapsed"); // Add both responsive and collapsed classes
  } else {
    navbar.classList.remove("responsive", "collapsed"); // Remove both responsive and collapsed classes
  }
});

// Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon
function toggleMenu() {
  var x = document.getElementById("myTopnav");
  if (x.classList.contains("responsive")) {
    x.classList.remove("responsive");
  } else {
    x.classList.add("responsive");
  }
}
// share test


function shareOnFacebook(url) {
  FB.ui({
    method: 'share',
    href: url,
  }, function(response){
    // Optional: Callback function after sharing
    console.log('Shared on Facebook');
  });
}
// carousel 

function nextSlide() {
  const carouselInner = document.querySelector('.carousel-inner');
  const currentSlide = document.querySelector('.carousel-item.active');
  const nextSlide = currentSlide.nextElementSibling;

  if (nextSlide) {
    carouselInner.style.transform = `translateX(-${nextSlide.offsetLeft}px)`;
    currentSlide.classList.remove('active');
    nextSlide.classList.add('active');
  }
}

function prevSlide() {
  const carouselInner = document.querySelector('.carousel-inner');
  const currentSlide = document.querySelector('.carousel-item.active');
  const prevSlide = currentSlide.previousElementSibling;

  if (prevSlide) {
    carouselInner.style.transform = `translateX(-${prevSlide.offsetLeft}px)`;
    currentSlide.classList.remove('active');
    prevSlide.classList.add('active');
  }
}


// scroll test
document.addEventListener('DOMContentLoaded', function() {
  document.body.classList.add('fade-in');
});
// animations
document.addEventListener('DOMContentLoaded', function() {
  const elements = document.querySelectorAll('.smooth-fade-in, .slide-up, .scale-in, .fade-slide-in, .gentle-rotate');

  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              observer.unobserve(entry.target);
          }
      });
  }, {
      threshold: 0.1
  });

  elements.forEach(element => {
      observer.observe(element);
  });
});

// cards appear
// script.js
document.addEventListener('DOMContentLoaded', function() {
  const cards = document.querySelectorAll('.card-new');

  const slideInCards = () => {
      cards.forEach(card => {
          if (isElementInViewport(card)) {
              card.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
              card.style.opacity = 1;
              card.style.transform = 'translateY(0)';
          }
      });
  };

  const isElementInViewport = (el) => {
      const rect = el.getBoundingClientRect();
      return (
          rect.bottom >= 0 &&
          rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
      );
  };

  window.addEventListener('scroll', slideInCards);
  
  // Initially check for visible cards on page load
  slideInCards();
});

// about us expand btn
function toggleReadMore() {
  const desc = document.querySelector('.agent-description');
  const button = document.querySelector('.read-more-button');
  if (desc.classList.contains('collapsed')) {
      desc.classList.remove('collapsed');
      button.textContent = 'Read Less';
  } else {
      desc.classList.add('collapsed');
      button.textContent = 'Read More';
  }
}

function checkScreenSize() {
  const desc = document.querySelector('.agent-description');
  if (window.innerWidth > 600) {
      desc.classList.remove('collapsed');
  } else {
      desc.classList.add('collapsed');
  }
}

window.addEventListener('resize', checkScreenSize);
window.addEventListener('load', checkScreenSize);