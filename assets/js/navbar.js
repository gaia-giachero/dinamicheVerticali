document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const menu = document.querySelector(".menu");
  const dropdowns = document.querySelectorAll(".dropdown");

  if (!hamburger || !menu) return;

  // Apertura/chiusura menu mobile
  hamburger.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = menu.classList.toggle("menu-open");
    hamburger.classList.toggle("open", isOpen);
    hamburger.setAttribute("aria-expanded", isOpen);
  });

  // Apertura/chiusura di ogni dropdown (CERTIFICAZIONI, ALTRI CORSI)
  dropdowns.forEach((dropdown) => {
    const trigger = dropdown.querySelector(":scope > span");

    if (!trigger) return;

    trigger.addEventListener("click", (e) => {
      e.stopPropagation();

      const isAlreadyOpen = dropdown.classList.contains("open");

      // chiude eventuali altri dropdown aperti prima di aprire questo
      dropdowns.forEach((d) => d.classList.remove("open"));

      if (!isAlreadyOpen) {
        dropdown.classList.add("open");
      }
    });

    // evita che il click dentro il dropdown lo richiuda subito
    dropdown.addEventListener("click", (e) => e.stopPropagation());
  });

  // click fuori dal menu: chiude dropdown aperti
  document.addEventListener("click", () => {
    dropdowns.forEach((d) => d.classList.remove("open"));
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      menu.classList.remove("menu-open");
      hamburger.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
    }
  });
});
