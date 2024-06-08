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

// search bar// Function to toggle the menu for mobile view
function toggleMenu() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// Function to filter properties based on search criteria
function filterProperties() {
  var inputAddress, inputPrice, inputAgent, filter, propertyContainer, properties, property, i;
  inputAddress = document.getElementById("addressInput").value.toUpperCase();
  inputPrice = document.getElementById("priceInput").value.toUpperCase();
  inputAgent = document.getElementById("agentInput").value.toUpperCase();
  filter = inputAddress + inputPrice + inputAgent;
  propertyContainer = document.getElementsByClassName("property-container")[0];
  properties = propertyContainer.getElementsByClassName("property-widget");

  // Loop through all properties and hide those that do not match the search criteria
  for (i = 0; i < properties.length; i++) {
    property = properties[i];
    if (property) {
      var address = property.querySelector(".property-details h3").textContent.toUpperCase();
      var price = property.querySelector(".property-details .price").textContent.toUpperCase();
      var agent = property.querySelector(".property-details .location a").textContent.toUpperCase();
      if (address.indexOf(inputAddress) > -1 && price.indexOf(inputPrice) > -1 && agent.indexOf(inputAgent) > -1) {
        property.style.display = "";
      } else {
        property.style.display = "none";
      }
    }
  }

  // Display the number of results and the "Showing Results" section
  var count = 0;
  for (i = 0; i < properties.length; i++) {
    if (properties[i].style.display !== "none") {
      count++;
    }
  }
  var showingResults = document.getElementById("showingResults");
  if (count > 0) {
    showingResults.innerHTML = "Showing " + count + " result(s).";
    showingResults.style.display = "";
  } else {
    showingResults.style.display = "none";
  }
}
