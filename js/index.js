window.onscroll = function() {navScroll()};

var nav = document.getElementById("nav");
var sticky = nav.offsetTop;

function navScroll() {
  if (window.pageYOffset >= sticky) {
    nav.classList.add("sticky")
  } else {
    nav.classList.remove("sticky");
  }
}