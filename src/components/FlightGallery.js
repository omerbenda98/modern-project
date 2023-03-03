let flightsArr;
let galleryDiv;
let isAdmin;
let deleteFlight;
let showPopup;
let seeMore;

const initialFlightGallery = (
  flightsArrFromHomePage,
  isAdminParam,
  deleteFlightFromHomePage,
  showPopupFromHomePage,
  seeMoreFromHomePage
) => {
  galleryDiv = document.getElementById("home-page-flight-gallery");
  isAdmin = isAdminParam;
  deleteFlight = deleteFlightFromHomePage;
  showPopup = showPopupFromHomePage;
  seeMore = seeMoreFromHomePage;
  updateFlightGallery(flightsArrFromHomePage);
};

const updateFlightGallery = (flightsArrFromHomePage) => {
  flightsArr = flightsArrFromHomePage;
  createGallery();
};

const createCard = (destination, description, price, img, id) => {
  const adminBtns = `  <button type="button" class="btn btn-warning m-3" id="flightGalleryEditBtn-${id}">
    <i class="bi bi-pen-fill"></i> Edit
  </button>
  <button type="button" class="btn btn-danger m-3" id="flightGalleryDeleteBtn-${id}">
    <i class="bi bi-x-circle-fill"></i> Delete
  </button>
  `;
  return `
  <div class="col">
    <div class="card">
      <img
        src="${img}"
        class="card-img-top"
        alt="${destination}"
      />
      <div class="card-body">
        <h5 class="card-title">${destination}</h5>
        <p class="card-text">
          ${description}
        </p>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">${price}</li>
      </ul>
      <div class="card-body">
   <button type="button" class="btn btn-success" id="gallerySeeMoreBtn-${id}">
          See More<i class="bi bi-arrow-right m-2"></i>
        </button>
         <button type="button" class="btn btn-primary" id="addToFavoritebtn-${id}">
          Add to favorites<i class="bi bi-arrow-right m-2"></i>
        </button>

        ${isAdmin ? adminBtns : ""}
      </div>
    </div>
  </div>
  `;
};

const getIdFromClick = (ev) => {
  let idFromId = ev.target.id.split("-");

  if (!ev.target.id) {
    idFromId = ev.target.parentElement.id.split("-");
  }
  return idFromId[1];
};

const handleDeleteBtnClick = (ev) => {
  deleteFlight(getIdFromClick(ev));
};

const handleEditBtnClick = (ev) => {
  showPopup(getIdFromClick(ev));
};
const handleShowMoreBtnClick = (ev) => {
  seeMore(getIdFromClick(ev));
};

const clearEventListeners = (idKeyword, handleFunction) => {
  let btnsBefore = document.querySelectorAll(`[id^='${idKeyword}-']`);

  for (let btn of btnsBefore) {
    btn.removeEventListener("click", handleFunction);
  }
};
const createGallery = () => {
  let innerStr = "";

  clearEventListeners("flightGalleryDeleteBtn", handleDeleteBtnClick);
  clearEventListeners("flightGalleryEditBtn", handleEditBtnClick);
  clearEventListeners("gallerySeeMoreBtn", handleShowMoreBtnClick);

  for (let flight of flightsArr) {
    innerStr += createCard(
      flight.destination,
      flight.description,
      flight.price,
      flight.imgUrl,
      flight.id
    );
  }
  galleryDiv.innerHTML = innerStr;

  createBtnEventListener("flightGalleryDeleteBtn", handleDeleteBtnClick);
  createBtnEventListener("flightGalleryEditBtn", handleEditBtnClick);
  createBtnEventListener("gallerySeeMoreBtn", handleShowMoreBtnClick);
};
//Creates event listener for the buttons
const createBtnEventListener = (idKeyword, handleFunction) => {
  let btns = document.querySelectorAll(`[id^='${idKeyword}-']`);

  //add events to new btns
  for (let btn of btns) {
    btn.addEventListener("click", handleFunction);
  }
};

export { initialFlightGallery, updateFlightGallery };
