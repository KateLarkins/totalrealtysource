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
function toggleText(id) {
  const description = document.getElementById(id);
  const hiddenText = description.querySelector('.hidden-text');
  const expandLink = description.querySelector('.expand-link');

  if (hiddenText.style.display === 'none' || hiddenText.style.display === '') {
    hiddenText.style.display = 'inline';
    expandLink.textContent = ' Read Less';
  } else {
    hiddenText.style.display = 'none';
    expandLink.textContent = '...Read More';
  }
}

// spinny test

document.addEventListener("DOMContentLoaded", function() {
  // Hide the content and show the loader
  document.querySelector(".content").style.display = "none";
  document.querySelector(".loader-container").style.display = "flex";

  // Start spinning the house icon
  document.querySelector(".house-icon").classList.add("spin");

  // Simulate loading time (replace this with your actual loading code)
  setTimeout(function() {
    // Show the content and hide the loader after loading
    document.querySelector(".content").style.display = "block";
    document.querySelector(".loader-container").style.display = "none";

    // Stop spinning the house icon
    document.querySelector(".house-icon").classList.remove("spin");
  }, 2000); // Change 2000 to your desired loading time in milliseconds
});

// search bar// Function to toggle the menu for mobile view// Function to filter properties based on address, price range, and agent
function filterProperties() {
  // Get input values
  var addressInput = document.getElementById('addressInput').value.toLowerCase();
  var priceFilter = document.getElementById('price').value;
  var agentFilter = document.getElementById('agent').value.toLowerCase();

  // Get all property widgets
  var propertyWidgets = document.getElementsByClassName('property-widget');

  // Loop through property widgets
  for (var i = 0; i < propertyWidgets.length; i++) {
      var propertyWidget = propertyWidgets[i];
      var propertyAddress = propertyWidget.querySelector('.property-details h3').textContent.toLowerCase();
      var propertyPrice = parseFloat(propertyWidget.querySelector('.price').textContent.replace(/\D/g, ''));

      // Check if property matches filters
      var addressMatch = propertyAddress.includes(addressInput);
      var priceMatch = filterPrice(propertyPrice, priceFilter);
      var agentMatch = propertyWidget.querySelector('.location').textContent.toLowerCase().includes(agentFilter);

      // Show or hide property based on filter matches
      if (addressMatch && priceMatch && agentMatch) {
          propertyWidget.style.display = 'block';
      } else {
          propertyWidget.style.display = 'none';
      }
  }

  // Update showing results info
  updateShowingResults();
}

// Function to filter properties based on price range
// Function to filter properties based on price range
function filterPrice(propertyPrice, priceFilter) {
  if (priceFilter === '<100000') {
      return propertyPrice < 100000;
  } else if (priceFilter === '100000-500000') {
      return propertyPrice >= 100000 && propertyPrice <= 500000;
  } else if (priceFilter === '>500000') {
      return propertyPrice > 500000;
  } else {
      return true; // No price filter selected, return true to show all properties
  }
}


// Function to update showing results info
function updateShowingResults() {
  var visibleProperties = document.querySelectorAll('.property-widget[style="display: block;"]').length;
  var totalProperties = document.getElementsByClassName('property-widget').length;
  var showingResults = document.getElementById('showingResults');

  showingResults.innerHTML = "Showing " + visibleProperties + " out of " + totalProperties + " results.";
  showingResults.style.display = 'block';
}

// Function to clear all filters
function clearFilters() {
  document.getElementById('addressInput').value = '';
  document.getElementById('price').value = '';
  document.getElementById('agent').value = '';
  filterProperties(); // Reapply filters to show all properties
}

// Add event listeners
document.getElementById('clearPriceFilter').addEventListener('click', clearFilters);
document.getElementById('clearAgentFilter').addEventListener('click', clearFilters);
