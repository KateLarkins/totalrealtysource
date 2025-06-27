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
      var propertyPrice = parseFloat(
        propertyWidget.querySelector('.price').childNodes[0].textContent.replace(/\D/g, '')
    );
    

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
      return propertyPrice > 500000; // Fix: This ensures prices over 500,000 are included
  } else {
      return true; // No price filter selected, show all properties
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


// type

// New navbar

function toggleMenu() {
  var navLinks = document.getElementById("navLinks");
  if (navLinks.classList.contains("show")) {
    navLinks.classList.remove("show");
  } else {
    navLinks.classList.add("show");
  }
}

function toggleOtherLinks() {
  var otherLinks = document.getElementById("otherLinks");
  if (otherLinks.style.display === "block") {
    otherLinks.style.display = "none";
  } else {
    otherLinks.style.display = "block";
  }
}

// 
function filterProperties() {
  try {
    // ✅ Helpers
    function extractFirstInt(text) {
      const match = text?.match(/\d+/);
      return match ? parseInt(match[0]) : 0;
    }

    function extractFirstFloat(text) {
      const match = text?.match(/\d+(\.\d+)?/);
      return match ? parseFloat(match[0]) : 0;
    }

    function hasFeature(text, mustHave) {
      if (!mustHave) return true;
      if (!text) return false;
      text = text.toLowerCase().trim();
      return text !== '' && !text.includes('no') && !text.includes('none');
    }

    function filterPrice(propertyPrice, priceFilter) {
      if (priceFilter === '<100000') return propertyPrice < 100000;
      if (priceFilter === '100000-500000') return propertyPrice >= 100000 && propertyPrice <= 500000;
      if (priceFilter === '>500000') return propertyPrice > 500000;
      return true;
    }

    // 🔍 Inputs
    const addressInput = document.getElementById('addressInput')?.value.toLowerCase() || '';
    const priceFilter = document.getElementById('price')?.value || '';
    const agentFilter = document.getElementById('agent')?.value.toLowerCase() || '';

    const mustHavePool = document.getElementById('filterPool')?.checked;
    const mustHaveGarage = document.getElementById('filterGarage')?.checked;
    const minBeds = parseInt(document.getElementById('filterBeds')?.value) || 0;
    const minBaths = parseFloat(document.getElementById('filterBaths')?.value) || 0;
    const sqftOver2000 = document.getElementById('filterLargeSqft')?.checked;
    const sqftUnder2000 = document.getElementById('filterSmallSqft')?.checked;
    const builtAfter2000 = document.getElementById('filterAfter2000')?.checked;
    const builtBefore2000 = document.getElementById('filterBefore2000')?.checked;
    const minAcreage = parseFloat(document.getElementById('filterAcreage')?.value) || 0;
    const mustHaveBasement = document.getElementById('filterBasement')?.checked;

    // ✅ Only target cards, not modals
    const propertyWidgets = document.querySelectorAll('.property-widget');

    for (let i = 0; i < propertyWidgets.length; i++) {
      const widget = propertyWidgets[i];

      // 🏡 Basic content
      const address = widget.querySelector('.property-details h3')?.textContent.toLowerCase() || '';
      const priceText = widget.querySelector('.price')?.textContent || '';
      const price = parseFloat(priceText.replace(/[^\d]/g, '')) || 0;
      const agentText = widget.querySelector('.location')?.textContent.toLowerCase() || '';

      // 📊 Detail spans
      const bedText = widget.querySelector('.bedrooms')?.textContent || '';
      const bathText = widget.querySelector('.bathrooms')?.textContent || '';
      const sqftText = widget.querySelector('.sqft')?.textContent.replace(/,/g, '') || '';
      const yearText = widget.querySelector('.year-built')?.textContent || '';
      const lotText = widget.querySelector('.lot')?.textContent || '';
      const poolText = widget.querySelector('.pool')?.textContent || '';
      const garageText = widget.querySelector('.garage')?.textContent || '';
      const basementText = widget.querySelector('.basement')?.textContent || '';

      // 🧮 Cleaned values
      const beds = extractFirstInt(bedText);
      const baths = extractFirstFloat(bathText);
      const sqft = extractFirstInt(sqftText);
      const year = parseInt(yearText) || 0;
      const lot = extractFirstFloat(lotText);

      // ✅ Matching checks
      const addressMatch = address.includes(addressInput);
      const priceMatch = filterPrice(price, priceFilter);
      const agentMatch = agentText.includes(agentFilter);
      const bedMatch = beds >= minBeds;
      const bathMatch = baths >= minBaths;
      const sqftMatch = (!sqftOver2000 || sqft >= 2000) && (!sqftUnder2000 || sqft < 2000);
      const yearMatch = (!builtAfter2000 || year >= 2000) && (!builtBefore2000 || year < 2000);
      const lotMatch = lot >= minAcreage;
      const poolMatch = hasFeature(poolText, mustHavePool);
      const garageMatch = hasFeature(garageText, mustHaveGarage);
      const basementMatch = hasFeature(basementText, mustHaveBasement);

      const shouldShow = (
        addressMatch &&
        priceMatch &&
        agentMatch &&
        bedMatch &&
        bathMatch &&
        sqftMatch &&
        yearMatch &&
        lotMatch &&
        poolMatch &&
        garageMatch &&
        basementMatch
      );

      widget.style.display = shouldShow ? 'block' : 'none';
    }

    updateShowingResults(); // your UI result updater

  } catch (error) {
    console.error("Error in filterProperties:", error);
  }
}






function toggleFeatureFilters() {
  var box = document.getElementById('featureFilterBox');
  if (!box) return; // safety check
  if (box.style.display === 'none' || box.style.display === '') {
    box.style.display = 'block';
  } else {
    box.style.display = 'none';
  }
}
