const buttons = document.querySelectorAll(".rounded-btn");
const cards = document.querySelectorAll(".card");
const fixdiv = document.querySelector(".fixdiv");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const index = Array.from(cards).indexOf(entry.target);

        const cardBackgroundColor = window.getComputedStyle(
          entry.target.querySelector(".card-body")
        ).backgroundColor;

        buttons.forEach((btn, i) => {
          if (i === index) {
            btn.classList.add("active");
            btn.style.backgroundColor = cardBackgroundColor;
            btn.style.color = "white";
          } else {
            btn.classList.remove("active");
            btn.style.backgroundColor = "#363636";
            btn.style.color = "white";
          }
        });
      }
    });
  },
  {
    threshold: [0.25, 0.5, 0.75],
    rootMargin: "0px 0px -50% 0px",
  }
);

cards.forEach((card) => {
  observer.observe(card);
});

const lastCardObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        fixdiv.style.position = "relative";
      } else {
        fixdiv.style.position = "sticky";
      }
    });
  },
  {
    threshold: 1,
  }
);

lastCardObserver.observe(cards[cards.length - 1]);

const firstCardObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        fixdiv.style.position = "sticky";
      }
    });
  },
  {
    threshold: 0,
  }
);

firstCardObserver.observe(cards[0]);
window.addEventListener("scroll", function () {
  const cards = document.querySelectorAll(".card");

  cards.forEach((card, index) => {
    // Skip the last card as there's no card after it to trigger the effect
    if (index === cards.length - 1) return;

    // Get the next card
    const nextCard = cards[index + 1];
    // Get the position of the next card relative to the viewport
    const nextCardRect = nextCard.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();

    // If the next card comes into view, apply the effect to the current card
    if (nextCardRect.top <= window.innerHeight / 1) {
      card.style.transform = "scale(0.8)";
      card.style.filter = "blur(5px)";
    } else {
      // Reset the effect if the next card is not in view
      card.style.transform = "scale(1)";
      card.style.filter = "blur(0px)";
    }
  });
});
