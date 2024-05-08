document.getElementById('listingForm').addEventListener('submit', function(event) {
  event.preventDefault();

  var formData = new FormData();
  formData.append('address', document.getElementById('address').value);
  formData.append('price', document.getElementById('price').value);
  formData.append('bedrooms', document.getElementById('bedrooms').value);
  formData.append('bathrooms', document.getElementById('bathrooms').value);
  formData.append('image', document.getElementById('image').files[0]);

  fetch('create_listing.php', {
      method: 'POST',
      body: formData
  })
  .then(response => response.json())
  .then(data => {
      document.getElementById('response').innerText = data.message;
  })
  .catch(error => {
      console.error('Error:', error);
  });
});

// JavaScript to automatically collapse navbar on smaller screens
window.addEventListener("resize", function() {
  const navbar = document.getElementById("myTopnav"); // Updated to target "myTopnav" instead of "navbar-menu"
  const windowWidth = window.innerWidth;

  if (windowWidth <= 768) {
    navbar.classList.add("collapsed");
  } else {
    navbar.classList.remove("collapsed");
  }
});

/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function toggleMenu() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// JavaScript to automatically collapse navbar on smaller screens
window.addEventListener("resize", function() {
  const navbar = document.getElementById("myTopnav");
  const windowWidth = window.innerWidth;

  if (windowWidth <= 768) {
    navbar.classList.add("responsive"); // Add the responsive class
  } else {
    navbar.classList.remove("responsive"); // Remove the responsive class
  }
});
