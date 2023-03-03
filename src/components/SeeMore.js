let selectedFlight;
const seeMoreImg = document.getElementById("list-see-more-img");
const seeMoreDestination = document.getElementById("list-see-more-destination");
const seeMoreDescription = document.getElementById("list-see-more-description");
const seeMorePrice = document.getElementById("list-see-more-price");

const seeMoreContainer = document.getElementById("list-see-more-container");

const initSeeMore = (selectedFlightFromHomePage) => {
  if (selectedFlightFromHomePage) {
    selectedFlight = selectedFlightFromHomePage;
  } else {
    return;
  }
  seeMoreImg.src = selectedFlight.imgUrl;
  seeMoreDestination.innerText = selectedFlight.destination;
  seeMoreDescription.innerText = selectedFlight.description;
  seeMorePrice.innerText = selectedFlight.price;

  seeMore();
};

const seeMore = () => {
  seeMoreContainer.classList.remove("d-none");
};

const hideSeeMore = () => {
  seeMoreContainer.classList.add("d-none");
};

window.addEventListener("load", () => {
  seeMoreContainer.addEventListener("click", (ev) => {
    if (
      ev.target.id !== "list-see-more-container" &&
      ev.target.id !== "list-see-more-back-btn" &&
      ev.target.id !== "list-see-more-back-btn-icon"
    ) {
      return;
    }
    hideSeeMore();
  });
  document.getElementById("see-more-back-btn").addEventListener("click", () => {
    hideSeeMore();
  });
});

export { initSeeMore, seeMore, hideSeeMore };
