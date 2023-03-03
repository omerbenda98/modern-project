let flightsArr;
let carouselDiv;
let showIdx;
let animationStarted;

const initialFlightCarousel = (flightsArrFromHomePage) => {
  carouselDiv = document.getElementById("home-page-flights-carousel");
  initializeBtns();
  updateFlightCarousel(flightsArrFromHomePage);
};

const updateFlightCarousel = (flightsArrFromHomePage) => {
  showIdx = 0;
  animationStarted = 0;
  flightsArr = flightsArrFromHomePage;
  createCarousel();
};

const initializeBtns = () => {
  document.getElementById("back-carusel-btn").addEventListener("click", () => {
    if (animationStarted !== 0) {
      return;
    }
    animationStarted = 2;
    let prevIdx = showIdx - 1;
    if (prevIdx < 0) {
      prevIdx = flightsArr.length - 1;
    }
    let imgToHide = document.querySelector(
      `.img-container > img:nth-child(${showIdx + 1})`
    );
    imgToHide.classList.add("fade-out");
    const hideImgAnim = () => {
      imgToHide.removeEventListener("animationend", hideImgAnim);
      imgToHide.classList.add("opacity-0");
      imgToHide.classList.remove("fade-out");
      animationStarted--;
    };
    imgToHide.addEventListener("animationend", hideImgAnim);
    let imgToShow = document.querySelector(
      `.img-container > img:nth-child(${prevIdx + 1})`
    );
    imgToShow.classList.remove("opacity-0");
    imgToShow.classList.add("fade-in");
    imgToShow.addEventListener(
      "animationend",
      () => {
        imgToShow.classList.remove("fade-in");
        animationStarted--;
      },
      { once: true }
    );

    showIdx = prevIdx;
  });
  document.getElementById("next-carusel-btn").addEventListener("click", () => {
    if (animationStarted !== 0) {
      return;
    }
    animationStarted = 2;
    let nextIdx = showIdx + 1;
    if (nextIdx >= flightsArr.length) {
      nextIdx = 0;
    }
    let imgToHide = document.querySelector(
      `.img-container > img:nth-child(${showIdx + 1})`
    );
    imgToHide.classList.add("fade-out");
    const hideImgAnim = () => {
      imgToHide.removeEventListener("animationend", hideImgAnim);
      imgToHide.classList.add("opacity-0");
      imgToHide.classList.remove("fade-out");
      animationStarted--;
    };
    imgToHide.addEventListener("animationend", hideImgAnim);
    let imgToShow = document.querySelector(
      `.img-container > img:nth-child(${nextIdx + 1})`
    );
    imgToShow.classList.remove("opacity-0");
    imgToShow.classList.add("fade-in");
    imgToShow.addEventListener(
      "animationend",
      () => {
        imgToShow.classList.remove("fade-in");
        animationStarted--;
      },
      { once: true }
    );

    showIdx = nextIdx;
  });
};

const createItem = (destination, img) => {
  return `
      <img src="${img}" alt="${destination}" class="opacity-0" />
  `;
};

const createCarousel = () => {
  let innerStr = "";
  for (let flight of flightsArr) {
    innerStr += createItem(flight.destination, flight.imgUrl);
  }
  carouselDiv.innerHTML = innerStr;

  document
    .querySelector(".img-container > img:nth-child(1)")
    .classList.remove("opacity-0");
};

export { initialFlightCarousel, updateFlightCarousel };
