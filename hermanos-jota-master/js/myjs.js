(function () {
  const navbar = document.querySelector(".custom-navbar");
  const collapse = document.querySelector(".navbar-collapse");
  if (!navbar) return;

  const isDesktop = () => window.matchMedia("(min-width: 768px)").matches;

  function applyNavbarState() {
    if (!isDesktop()) {
      navbar.classList.add("scrolled");
      navbar.classList.remove("transparent");
      return;
    }

    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
      navbar.classList.remove("transparent");
    } else {
      navbar.classList.add("transparent");
      navbar.classList.remove("scrolled");
    }
  }

  document.addEventListener("DOMContentLoaded", applyNavbarState);
  window.addEventListener("scroll", applyNavbarState, { passive: true });
  window.addEventListener("resize", applyNavbarState);

  // Cuando se abre el menú colapsado en móviles, fondo sólido sí o sí
  if (collapse) {
    collapse.addEventListener("show.bs.collapse", () => {
      navbar.classList.add("scrolled");
      navbar.classList.remove("transparent");
    });
    collapse.addEventListener("hide.bs.collapse", applyNavbarState);
  }
})();
