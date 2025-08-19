
document.addEventListener("scroll", function() {
    const navbar = document.querySelector(".custom-navbar");
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
        navbar.classList.remove("transparent");
    } else {
        navbar.classList.add("transparent");
        navbar.classList.remove("scrolled");
    }
});