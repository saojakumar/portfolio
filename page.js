var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-content");
function opentab(tabname){
    for(tablink of tablinks){
        tablink.classList.remove("active-link");
    }
    for(tabcontent of tabcontents){
        tabcontent.classList.remove("active-tab");
    }
    event.currentTarget.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab");
}

/*-------------open-close-----------*/
document.addEventListener("DOMContentLoaded", function () {
    const btn  = document.getElementById("see-more");
    const list = document.getElementById("more-projects");

    btn.addEventListener("click", function (e) {
      e.preventDefault();
      const willShow = list.hasAttribute("hidden");
      if (willShow) {
        list.removeAttribute("hidden");
        btn.textContent = "See Less";
        btn.setAttribute("aria-expanded", "true");
      } else {
        list.setAttribute("hidden", "");
        btn.textContent = "See More";
        btn.setAttribute("aria-expanded", "false");
      }
    });
  });