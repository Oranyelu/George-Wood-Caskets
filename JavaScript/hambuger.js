/* Toggle between adding and removing the "responsive" class to the navbar when the user clicks on the hamburger menu */
function myFunction(x) {
    x.classList.toggle("change");
    var elements = document.getElementsByClassName("hambuger_span")[0].getElementsByTagName("a");
    for (var i = 0; i < elements.length; i++) {
      if (elements[i].style.display === "block") {
        elements[i].style.display = "none";
      } else {
        elements[i].style.display = "block";
      }
    }
  }