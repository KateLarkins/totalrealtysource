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
  const addressVal = document.getElementById("searchAddress").value.toLowerCase();
  const agentVal = document.getElementById("filterAgent").value.toLowerCase();
  const priceRange = document.getElementById("priceRange").value;
  const bedVal = parseInt(document.getElementById("filterBeds").value) || 0;
  const bathVal = parseInt(document.getElementById("filterBaths").value) || 0;
  const needsGarage = document.getElementById("hasGarage").checked;
  const needsPool = document.getElementById("hasPool").checked;

  let minPrice = 0, maxPrice = Infinity;
  if (priceRange.includes("-")) {
    const parts = priceRange.split("-");
    minPrice = parseInt(parts[0].replace(/\D/g, '')) || 0;
    maxPrice = parseInt(parts[1].replace(/\D/g, '')) || Infinity;
  }

  const listings = document.querySelectorAll(".property-widget");

  listings.forEach(listing => {
    const address = listing.querySelector("h3")?.innerText.toLowerCase() || "";
    const agent = listing.querySelector(".location a")?.innerText.toLowerCase() || "";

    const priceText = listing.querySelector(".price")?.innerText.replace(/\D/g, '') || "0";
    const price = parseInt(priceText);

    const beds = parseInt(listing.querySelector(".bedrooms")?.innerText || "0");
    const baths = parseInt(listing.querySelector(".bathrooms")?.innerText || "0");

    const garageText = listing.querySelector(".garage")?.innerText.toLowerCase() || "";
    const poolText = listing.querySelector(".pool")?.innerText.toLowerCase() || "";

    const hasGarage = garageText.includes("garage") && !garageText.includes("no garage");
    const hasPool = poolText.includes("pool") && !poolText.includes("no");

    const matchesAddress = address.includes(addressVal);
    const matchesAgent = agent.includes(agentVal);
    const matchesPrice = price >= minPrice && price <= maxPrice;
    const matchesBeds = beds >= bedVal;
    const matchesBaths = baths >= bathVal;
    const matchesGarage = !needsGarage || hasGarage;
    const matchesPool = !needsPool || hasPool;

    if (matchesAddress && matchesAgent && matchesPrice && matchesBeds && matchesBaths && matchesGarage && matchesPool) {
      listing.style.display = "";
    } else {
      listing.style.display = "none";
    }
  });
}
function getAllAddresses() {
  const modals = document.querySelectorAll(".property-modal");
  const addresses = [];

  modals.forEach(modal => {
    const address = modal.querySelector("h3")?.innerText?.trim();
    if (address && !addresses.includes(address)) {
      addresses.push(address);
    }
  });

  return addresses;
}

function showSuggestions() {
  const input = document.getElementById("searchAddress");
  const query = input.value.toLowerCase();
  const suggestionsBox = document.getElementById("suggestionsBox");

  suggestionsBox.innerHTML = "";
  if (!query) {
    suggestionsBox.style.display = "none";
    return;
  }

  const allAddresses = getAllAddresses();
  const filtered = allAddresses.filter(addr => addr.toLowerCase().includes(query));

  if (filtered.length === 0) {
    suggestionsBox.style.display = "none";
    return;
  }

  filtered.forEach(address => {
    const div = document.createElement("div");
    div.textContent = address;
    div.style.padding = "8px";
    div.style.cursor = "pointer";
    div.addEventListener("click", () => {
      input.value = address;
      suggestionsBox.style.display = "none";
      filterProperties(); // optional: trigger filter immediately
    });
    suggestionsBox.appendChild(div);
  });

  suggestionsBox.style.display = "block";
}

// Optional: hide suggestions on Enter or Esc
function handleKey(event) {
  const box = document.getElementById("suggestionsBox");
  if (event.key === "Enter" || event.key === "Escape") {
    box.style.display = "none";
  }
}

// Optional: hide suggestions when clicking outside
document.addEventListener("click", (e) => {
  if (!document.getElementById("searchAddress").contains(e.target) &&
      !document.getElementById("suggestionsBox").contains(e.target)) {
    document.getElementById("suggestionsBox").style.display = "none";
  }
});
function clearFilters() {
  document.getElementById("searchAddress").value = "";
  document.getElementById("filterAgent").value = "";
  document.getElementById("priceRange").value = "";
  document.getElementById("filterBeds").value = "";
  document.getElementById("filterBaths").value = "";
  document.getElementById("hasGarage").checked = false;
  document.getElementById("hasPool").checked = false;

  document.getElementById("suggestionsBox").style.display = "none"; // hide suggestions if visible

  filterProperties();
}
function parseBaths(text) {
  // Extract numeric part from string like "4 (3 Full, 1 Half)" or "3.5"
  const match = text.match(/[\d\.]+/);
  return match ? parseFloat(match[0]) : 0;
}

function filterProperties() {
  const bedsFilter = document.getElementById('filterBeds').value;
  const bathsFilter = document.getElementById('filterBaths').value;

  const properties = document.querySelectorAll('.property-widget');
  let countVisible = 0;

  properties.forEach(prop => {
    // Find the modal ID from the button inside the property widget
    const modalBtn = prop.querySelector('button[onclick^="openModal"]');
    if (!modalBtn) {
      prop.style.display = 'none';
      return;
    }

    // Extract modal ID from button onclick attribute: e.g. openModal('stanworthModal')
    const onclickAttr = modalBtn.getAttribute('onclick');
    const modalIdMatch = onclickAttr.match(/openModal\('(.+?)'\)/);
    if (!modalIdMatch) {
      prop.style.display = 'none';
      return;
    }
    const modalId = modalIdMatch[1];
    const modal = document.getElementById(modalId);
    if (!modal) {
      prop.style.display = 'none';
      return;
    }

    // Find bedrooms and bathrooms spans inside the modal
    const bedroomsSpan = modal.querySelector('.bedrooms');
    const bathroomsSpan = modal.querySelector('.bathrooms');

    // Parse bedrooms and bathrooms count
    const beds = bedroomsSpan ? parseInt(bedroomsSpan.textContent.trim()) || 0 : 0;
    const baths = bathroomsSpan ? parseBaths(bathroomsSpan.textContent.trim()) : 0;

    let show = true;

    if (bedsFilter) {
      if (beds < parseInt(bedsFilter)) show = false;
    }

    if (bathsFilter) {
      if (baths < parseFloat(bathsFilter)) show = false;
    }

    if (show) {
      prop.style.display = 'block';
      countVisible++;
    } else {
      prop.style.display = 'none';
    }
  });

  const resultsMessage = document.getElementById('resultsMessage');
  if (resultsMessage) {
    resultsMessage.textContent = `Showing ${countVisible} result${countVisible !== 1 ? 's' : ''}`;
  }
}
function parseBaths(text) {
  // Extract numeric part from string like "4 (3 Full, 1 Half)" or "3.5"
  const match = text.match(/[\d\.]+/);
  return match ? parseFloat(match[0]) : 0;
}

function filterProperties() {
  const bedsFilter = document.getElementById('filterBeds').value;
  const bathsFilter = document.getElementById('filterBaths').value;

  const properties = document.querySelectorAll('.property-widget');
  let countVisible = 0;

  properties.forEach(prop => {
    // Find the modal ID from the button inside the property widget
    const modalBtn = prop.querySelector('button[onclick^="openModal"]');
    if (!modalBtn) {
      prop.style.display = 'none';
      return;
    }

    // Extract modal ID from button onclick attribute: e.g. openModal('stanworthModal')
    const onclickAttr = modalBtn.getAttribute('onclick');
    const modalIdMatch = onclickAttr.match(/openModal\('(.+?)'\)/);
    if (!modalIdMatch) {
      prop.style.display = 'none';
      return;
    }
    const modalId = modalIdMatch[1];
    const modal = document.getElementById(modalId);
    if (!modal) {
      prop.style.display = 'none';
      return;
    }

    // Find bedrooms and bathrooms spans inside the modal
    const bedroomsSpan = modal.querySelector('.bedrooms');
    const bathroomsSpan = modal.querySelector('.bathrooms');

    // Parse bedrooms and bathrooms count
    const beds = bedroomsSpan ? parseInt(bedroomsSpan.textContent.trim()) || 0 : 0;
    const baths = bathroomsSpan ? parseBaths(bathroomsSpan.textContent.trim()) : 0;

    let show = true;

    if (bedsFilter) {
      if (beds < parseInt(bedsFilter)) show = false;
    }

    if (bathsFilter) {
      if (baths < parseFloat(bathsFilter)) show = false;
    }

    if (show) {
      prop.style.display = 'block';
      countVisible++;
    } else {
      prop.style.display = 'none';
    }
  });

  const resultsMessage = document.getElementById('resultsMessage');
  if (resultsMessage) {
    resultsMessage.textContent = `Showing ${countVisible} result${countVisible !== 1 ? 's' : ''}`;
  }
}
