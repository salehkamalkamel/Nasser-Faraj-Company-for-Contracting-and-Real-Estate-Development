window.addEventListener("DOMContentLoaded", () => {
  const heroImage = document.querySelector(".hero__image");
  const faqList = document.querySelectorAll(".faq__card");
  const headerMenuOpen = document.querySelector(".header__menu-toggle");
  const headerMenuClose = document.querySelector(".header__dropdown-close");
  const headerMenu = document.querySelector(".header__dropdown");
  const partnersCarousel = document.querySelector(".partners__carousel");
  const progressBar = document.querySelector(".progress-bar");
  const scrollToTopBtn = document.querySelector(".back-to-top-btn");
  const checkbox = document.querySelector(".checkbox");
  // const conatctUsForm = document.querySelector(".contact-us__form-container");
  const termsCheckboxInput = document.querySelector(
    "#Agree-to-the-terms-and-conditions"
  );
  const animatedNumbers = document.querySelectorAll(
    ".achievements__card-number"
  );
  const animatedNumbersSection = document.querySelector(".achievements");
  if (heroImage) {
    heroImage.addEventListener("mousemove", (event) => {
      rotateElement(event, heroImage);
    });

    heroImage.addEventListener("mouseleave", () => {
      setTimeout(() => {
        heroImage.style.setProperty("--rotate-x", "0deg");
        heroImage.style.setProperty("--rotate-y", "0deg");
      }, 100);
    });
  }

  if (headerMenuOpen && headerMenu && headerMenuClose) {
    headerMenuOpen.addEventListener("click", () => {
      headerMenu.classList.add("open");
      const headerMenuLinks = headerMenu.querySelectorAll("a");
      headerMenuLinks.forEach((ele) =>
        ele.addEventListener("click", () => headerMenu.classList.remove("open"))
      );
    });

    headerMenuClose.addEventListener("click", () => {
      headerMenu.classList.remove("open");
    });
  }

  if (faqList.length > 0) {
    faqList.forEach((faq) => {
      faq.addEventListener("click", () => {
        faq.classList.toggle("open");
      });
    });
  }

  if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener("click", () =>
      document.documentElement.scroll({ top: 0, behavior: "smooth" })
    );
  }

  if (checkbox) {
    checkbox.addEventListener("click", () => {
      checkbox.classList.toggle("checked");
      if (checkbox.classList.contains("checked")) {
        termsCheckboxInput.setAttribute("checked", true);
      } else {
        termsCheckboxInput.setAttribute("checked", false);
      }
    });
  }

  // if (conatctUsForm) {
  //   conatctUsForm.addEventListener("submit", (e) => {
  //     e.preventDefault();
  //     console.log(e);
  //   });
  // }

  if (partnersCarousel) {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      addAnimation();
    }

    function addAnimation() {
      partnersCarousel.setAttribute("data-animated", true);
      const scrollerInner = partnersCarousel.querySelector(
        ".partners__carousel-list"
      );
      const scrollerInnerContent = Array.from(scrollerInner.children);
      scrollerInnerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        duplicatedItem.setAttribute("aria-hidden", true);
        scrollerInner.appendChild(duplicatedItem);
      });
    }
  }

  if (progressBar) {
    let height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    window.addEventListener("scroll", () => {
      const percentage = (document.documentElement.scrollTop / height) * 100;

      progressBar.style.width = `${percentage}%`;

      if (percentage > 10) {
        if (scrollToTopBtn) scrollToTopBtn.style.display = "flex";
      } else {
        if (scrollToTopBtn) scrollToTopBtn.style.display = "none";
      }
    });
  }

  // if (animatedNumbers && animatedNumbersSection) {
  //   let started = false;

  //   window.addEventListener("scroll", () => {
  //     if (window.scrollY >= animatedNumbersSection.offsetTop) {
  //       if (!started) {
  //         animatedNumbers.forEach((num) => {
  //           startCount(num);
  //         });
  //       }
  //       started = true;
  //     }
  //   });
  //   function startCount(el) {
  //     let goal = el.dataset.goal;
  //     let count = setInterval(() => {
  //       el.textContent++;
  //       if (el.textContent == goal) {
  //         clearInterval(count);
  //       }
  //     }, 2000 / goal);
  //   }
  // }

  if (animatedNumbers && animatedNumbersSection) {
    let started = false;

    window.addEventListener("scroll", () => {
      const sectionTop = animatedNumbersSection.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (sectionTop <= windowHeight && !started) {
        animatedNumbers.forEach((num) => startCount(num));
        started = true;
      }
    });

    function startCount(el) {
      let goal = el.dataset.goal;
      let countInterval = 10 / goal;
      let count = setInterval(() => {
        el.textContent++;
        if (el.textContent == goal) {
          clearInterval(count);
        }
      }, countInterval);
    }
  }

  function rotateElement(event, element) {
    const x = event.clientX;
    const y = event.clientY;

    const centerX = element.offsetLeft + element.clientWidth / 2;
    const centerY = element.offsetTop + element.clientHeight / 2;

    const offsetX = ((x - centerX) / centerX) * 45;
    const offsetY = ((y - centerY) / centerY) * 45;

    element.style.setProperty("--rotate-x", `${-offsetY}deg`);
    element.style.setProperty("--rotate-y", `${offsetX}deg`);
  }
});
