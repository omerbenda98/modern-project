let selectedProperty;
const seeMoreImg = document.getElementById("list-see-more-img");
const seeMoreName = document.getElementById("list-see-more-name");
const seeMoreDescription = document.getElementById("list-see-more-description");
const seeMorePrice = document.getElementById("list-see-more-price");

const seeMoreContainer = document.getElementById("list-see-more-container");

const initSeeMore = (selectedPropertyFromHomePage) => {
  /*
    set data from selectedProperty to html
    */
  if (selectedPropertyFromHomePage) {
    selectedProperty = selectedPropertyFromHomePage;
  } else {
    return;
  }
  seeMoreImg.src = selectedProperty.imgUrl;
  seeMoreName.innerText = selectedProperty.name;
  seeMoreDescription.innerText = selectedProperty.description;
  seeMorePrice.innerText = selectedProperty.price;

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
