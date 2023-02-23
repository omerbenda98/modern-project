// import {
//   clearEventListeners,
//   createBtnEventListener,
//   getIdFromClick,
// } from "./PropertiesList.js";

let flightsArr;
let galleryDiv;
let isAdmin;
let deleteFlight;
let showPopup;
let seeMore;
//this function will transfer data from homepage to this page
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
  /*
    this function will get data from homepage and create new gallery.
    if the gallery already exists it will remove the old one and
    create new one
  */
  flightsArr = flightsArrFromHomePage;
  createGallery();
};

const createCard = (destination, description, price, img, id) => {
  const adminBtns = `  <button type="button" class="btn btn-warning" id="flightGalleryEditBtn-${id}">
    <i class="bi bi-pen-fill"></i> Edit
  </button>
  <button type="button" class="btn btn-danger" id="flightGalleryDeleteBtn-${id}">
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
        ${isAdmin ? adminBtns : ""}
      </div>
    </div>
  </div>
  `;
};

const getIdFromClick = (ev) => {
  let idFromId = ev.target.id.split("-");
  // split the id to array
  if (!ev.target.id) {
    /*
        if press on icon then there is no id
        then we need to take the id of the parent which is btn
      */
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
  //get all old btns
  let btnsBefore = document.querySelectorAll(`[id^='${idKeyword}-']`);
  //remove old events
  for (let btn of btnsBefore) {
    btn.removeEventListener("click", handleFunction);
  }
};
const createGallery = () => {
  let innerStr = "";

  //clear event listeners for delete btns
  clearEventListeners("flightGalleryDeleteBtn", handleDeleteBtnClick);
  //clear event listeners for edit btns
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
  // add event listeners for delete btns
  createBtnEventListener("flightGalleryDeleteBtn", handleDeleteBtnClick);
  // add event listeners for edit btns
  createBtnEventListener("flightGalleryEditBtn", handleEditBtnClick);
  createBtnEventListener("gallerySeeMoreBtn", handleShowMoreBtnClick);
};
//Creates event listener for the delete buttons
const createBtnEventListener = (idKeyword, handleFunction) => {
  let btns = document.querySelectorAll(`[id^='${idKeyword}-']`);

  //add events to new btns
  for (let btn of btns) {
    btn.addEventListener("click", handleFunction);
  }
};

export { initialFlightGallery, updateFlightGallery };
