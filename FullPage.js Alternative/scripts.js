document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll(".page");
  const numSections = sections.length;
  let currentSection = 0;
  let isScrolling = false;

  function goToSection(index) {
    if (index >= 0 && index < numSections && !isScrolling) {
      isScrolling = true;
      const targetScroll = index * window.innerHeight;
      window.scrollTo({
        top: targetScroll,
        behavior: "smooth",
      });
      setTimeout(() => {
        isScrolling = false;
        currentSection = index;
        updateActiveDot();
        updateURLHash();
      }, 800); // Adjust timing to match smooth scroll duration
    }
  }

  function scrollToNextSection() {
    goToSection(currentSection + 1);
  }

  function scrollToPrevSection() {
    goToSection(currentSection - 1);
  }

  function updateURLHash() {
    const sectionId = sections[currentSection].id;
    window.location.hash = sectionId;
  }

  function getSectionFromHash() {
    const hash = window.location.hash.slice(1);
    const section = document.getElementById(hash);
    if (section) {
      const index = Array.from(sections).indexOf(section);
      goToSection(index);
    }
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      scrollToNextSection();
    } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      scrollToPrevSection();
    }
  });

  document.addEventListener("wheel", function (event) {
    if (event.deltaY > 0) {
      scrollToNextSection();
    } else {
      scrollToPrevSection();
    }
  });

  function createNavigationDots() {
    const navigation = document.createElement("div");
    navigation.classList.add("navigation");

    for (let i = 0; i < numSections; i++) {
      const dot = document.createElement("span");
      dot.classList.add("dot");
      dot.dataset.index = i;
      dot.addEventListener("click", function () {
        const index = parseInt(this.dataset.index);
        goToSection(index);
      });
      navigation.appendChild(dot);
    }

    document.body.appendChild(navigation);
    updateActiveDot();
  }

  createNavigationDots();

  function updateActiveDot() {
    const dots = document.querySelectorAll(".dot");
    dots.forEach((dot, index) => {
      if (index === currentSection) {
        dot.classList.add("active");
      } else {
        dot.classList.remove("active");
      }
    });
  }

  function updateActiveSection() {
    const scrollPosition = window.scrollY;
    const index = Math.floor(scrollPosition / window.innerHeight);
    if (index !== currentSection) {
      currentSection = index;
      updateActiveDot();
    }
  }

  window.addEventListener("scroll", updateActiveSection);
  window.addEventListener("resize", updateActiveSection);

  getSectionFromHash();
});
