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

// filter
// ------------------------------
// Main Filter Function
// ------------------------------
function filterProperties() {
  const addressVal = document.getElementById("searchAddress").value.toLowerCase();
  const agentVal = document.getElementById("filterAgent").value.toLowerCase();
  const priceRange = document.getElementById("priceRange").value;
  const bedVal = parseInt(document.getElementById("filterBeds").value) || 0;
  const bathVal = parseInt(document.getElementById("filterBaths").value) || 0;
  const needsGarage = document.getElementById("hasGarage").checked;
  const needsPool = document.getElementById("hasPool").checked;

  // Determine min/max price
  let minPrice = 0;
  let maxPrice = Infinity;

  if (priceRange.includes("-")) {
    const parts = priceRange.split("-");
    minPrice = parseInt(parts[0].replace(/\D/g, '')) || 0;
    maxPrice = parseInt(parts[1].replace(/\D/g, '')) || Infinity;
  } else if (priceRange.includes("+")) {
    minPrice = parseInt(priceRange) || 1000000;
    maxPrice = Infinity;
  }

  const listings = document.querySelectorAll(".property-widget");

  listings.forEach(listing => {
    // Safe element queries
    const address = listing.querySelector("h3")?.innerText.toLowerCase() || "";
    const agent = listing.querySelector(".location")?.innerText.toLowerCase() || "";
    const priceText = listing.querySelector(".price")?.innerText || "0";
    const price = parseInt(priceText.replace(/\D/g, '')) || 0;

    // Beds/Baths (ignore 0 or N/A)
    const bedText = listing.querySelector(".bedrooms")?.innerText || "0";
    const beds = parseInt(bedText) || 0;
    const bathText = listing.querySelector(".bathrooms")?.innerText || "0";
    const baths = parseInt(bathText) || 0;

    // Pool
    const poolText = listing.querySelector(".pool")?.innerText.toLowerCase() || "";
    const hasPool = poolText.includes("yes");

    // Garage
    const garageText = listing.querySelector(".garage")?.innerText.toLowerCase() || "";
    let hasGarage = false;
    if (garageText.includes("yes") || garageText.includes("garage")) {
      hasGarage = true;
    } else {
      const match = garageText.match(/\d+/);
      hasGarage = match ? parseInt(match[0]) > 0 : false;
    }

    // Matching logic
    const matchesAddress = address.includes(addressVal);
    const matchesAgent = agent.includes(agentVal);
    const matchesPrice = price >= minPrice && price <= maxPrice;

    // Beds/Baths filtering: ignore if listing is 0 or user selected 0
    const matchesBeds = bedVal === 0 || beds === 0 || beds >= bedVal;
    const matchesBaths = bathVal === 0 || baths === 0 || baths >= bathVal;

    // Pool/Garage filtering
    const matchesPool = !needsPool || hasPool;
    const matchesGarage = !needsGarage || hasGarage;

    // Show/hide listing
    listing.style.display = (matchesAddress && matchesAgent && matchesPrice && matchesBeds && matchesBaths && matchesGarage && matchesPool) ? "" : "none";
  });
}

// ------------------------------
// Clear all filters
// ------------------------------
function clearFilters() {
  const elements = ["searchAddress", "filterAgent", "priceRange", "filterBeds", "filterBaths"];
  elements.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = "";
  });

  const checkboxes = ["hasGarage", "hasPool"];
  checkboxes.forEach(id => {
    const cb = document.getElementById(id);
    if (cb) cb.checked = false;
  });

  // Refresh listings immediately
  filterProperties();
}

// ------------------------------
// Auto-filter on dropdown or checkbox change
// ------------------------------
document.querySelectorAll("#filterSidebar select, #filterSidebar input[type='checkbox']").forEach(el => {
  el.addEventListener("change", filterProperties);
});
