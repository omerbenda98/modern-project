let flightsArr;
let listDiv;
let isAdmin;
let deleteFlight;
let showPopup;
let seeMore;
let addFavorite;
//this function will transfer data from homepage to this page
const initialFlightList = (
  flightsArrFromHomePage,
  isAdminParam,
  deleteFlightFromHomePage,
  showPopupFromHomePage,
  seeMoreFromHomePage,
  addFavoriteFromHomePage
) => {
  listDiv = document.getElementById("home-page-flight-list");
  isAdmin = isAdminParam;
  deleteFlight = deleteFlightFromHomePage;
  showPopup = showPopupFromHomePage;
  seeMore = seeMoreFromHomePage;
  addFavorite = addFavoriteFromHomePage;
  updateFlightList(flightsArrFromHomePage);
};

const updateFlightList = (flightsArrFromHomePage) => {
  /*
    this function will get data from homepage and create new list.
    if the list already exists it will remove the old one and
    create new one
  */
  flightsArr = flightsArrFromHomePage;
  createList();
};

const createItem = (destination, description, price, img, id) => {
  const adminBtns = `
  <button type="button" class="btn btn-warning w-100" id="flightListEditBtn-${id}">
    <i class="bi bi-pen-fill"></i> Edit
  </button>
  <button type="button" class="btn btn-danger w-100" id="flightListDeleteBtn-${id}">
    <i class="bi bi-x-circle-fill"></i> Delete
  </button>
  `;
  return `
  <li class="list-group-item">
    <div class="row">
        <div class="col-md-2">
        <img src="${img}" class="img-fluid" alt="${destination}" />
        </div>
        <div class="col-md-8">
        <div class="card-body">
            <h5 class="card-title">${destination}</h5>
            <h6 class="card-subtitle mb-2 text-muted">
            ${price}
            </h6>
            <p class="card-text">
            ${description}
            </p>
        </div>
        </div>
        <div class="col-md-2">
        <button type="button" class="btn btn-success w-100" id="listSeeMoreBtn-${id}">
          See More<i class="bi bi-arrow-right m-2"></i>
        </button>
        <button type="button" class="btn btn-primary w-100" id="addToFavoritebtn-${id}">
          Add to favorites<i class="bi bi-arrow-right m-2"></i>
        </button>
        ${isAdmin ? adminBtns : ""}
        </div>
    </div>
    </li>
  `;
};

const getIdFromClick = (ev) => {
  let idFromId = ev.target.id.split("-"); // split the id to array
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
const handleAddFavoriteBtnClick = (ev) => {
  addFavorite(getIdFromClick(ev));
};

const clearEventListeners = (idKeyword, handleFunction) => {
  //get all old btns
  let btnsBefore = document.querySelectorAll(`[id^='${idKeyword}-']`);
  //remove old events
  for (let btn of btnsBefore) {
    btn.removeEventListener("click", handleFunction);
  }
};

const createList = () => {
  let innerStr = "";
  //clear event listeners for delete btns
  clearEventListeners("flightListDeleteBtn", handleDeleteBtnClick);
  //clear event listeners for edit btns
  clearEventListeners("flightListEditBtn", handleEditBtnClick);
  clearEventListeners("listSeeMoreBtn", handleShowMoreBtnClick);
  clearEventListeners("addToFavoritebtn", handleAddFavoriteBtnClick);

  //create new elements and remove old ones
  for (let flight of flightsArr) {
    innerStr += createItem(
      flight.destination,
      flight.description,
      flight.price,
      flight.imgUrl,
      flight.id
    );
  }
  listDiv.innerHTML = innerStr;
  // add event listeners for delete btns
  createBtnEventListener("flightListDeleteBtn", handleDeleteBtnClick);
  // add event listeners for edit btns
  createBtnEventListener("flightListEditBtn", handleEditBtnClick);
  createBtnEventListener("listSeeMoreBtn", handleShowMoreBtnClick);
  createBtnEventListener("addToFavoritebtn", handleAddFavoriteBtnClick);
};

//Creates event listener for the delete buttons
const createBtnEventListener = (idKeyword, handleFunction) => {
  let btns = document.querySelectorAll(`[id^='${idKeyword}-']`);
  //add events to new btns
  for (let btn of btns) {
    btn.addEventListener("click", handleFunction);
  }
};

export {
  initialFlightList,
  updateFlightList,
  createItem,
  createList,
  createBtnEventListener,
  clearEventListeners,
  handleAddFavoriteBtnClick,
  getIdFromClick,
};
