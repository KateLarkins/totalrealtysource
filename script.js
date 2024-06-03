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
