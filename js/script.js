document.addEventListener("DOMContentLoaded", () => {
  const openNavBtn = document.getElementById("openNavBtn");
  const closeNavBtn = document.getElementById("closeNavBtn");
  const navbarMenu = document.getElementById("navbar__menu");
  const body = document.querySelector("body");
  const mainContent = document.querySelector("main");
  const maxWidth = 1110;

  openNavBtn.addEventListener("click", () => toggleMenu(true));
  closeNavBtn.addEventListener("click", () => toggleMenu(false));

  // Hide menu visibility after transition ends if it's not active
  navbarMenu.addEventListener("transitionend", () => {
    if (!navbarMenu.classList.contains("active")) {
      navbarMenu.style.visibility = "hidden";
    }
  });

  // Adjust menu visibility on window resize
  window.addEventListener("resize", adjustMenuVisibility);

  // Initial check to set visibility based on window width
  adjustMenuVisibility();

  // Function to open or close the menu
  function toggleMenu(open) {
    if (window.innerWidth < maxWidth) {
      // Only apply on mobile
      if (open) {
        navbarMenu.style.visibility = "visible";
        navbarMenu.classList.add("active");
        navbarMenu.classList.remove("closed");
        body.classList.add("no-scroll");
        closeNavBtn.focus();

        // Prevent main content interaction and hide from screen readers
        mainContent.setAttribute("inert", "");
        mainContent.setAttribute("aria-hidden", "true");

        // Add class to show ::before pseudo-element after the menu opens
        setTimeout(() => navbarMenu.classList.add("before-visible"), 500);
      } else {
        navbarMenu.classList.remove("before-visible"); // Hide ::before immediately before closing the menu
        navbarMenu.classList.remove("active");
        navbarMenu.classList.add("closed");
        body.classList.remove("no-scroll");
        openNavBtn.focus();

        mainContent.removeAttribute("aria-hidden");
        mainContent.removeAttribute("inert");

        // Allow time for the menu to transition out smoothly before hiding
        setTimeout(() => (navbarMenu.style.visibility = "hidden"), 500);
      }
    }
  }

  // Function to adjust the menu visibility based on window width
  function adjustMenuVisibility() {
    if (window.innerWidth >= maxWidth) {
      // Desktop view
      navbarMenu.style.visibility = "visible";
      navbarMenu.classList.add("active");
      navbarMenu.classList.remove("closed");
    } else {
      // Mobile view
      navbarMenu.classList.remove("active", "before-visible");
      navbarMenu.classList.add("closed");
      navbarMenu.style.visibility = "hidden";
    }
  }
});
