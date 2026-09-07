const menuButton = document.querySelector(".menu-button");
const mainNav = document.querySelector(".main-nav");

menuButton?.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index * 55, 280)}ms`;
  revealObserver.observe(element);
});
