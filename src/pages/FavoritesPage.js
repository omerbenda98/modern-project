import {
  clearEventListeners,
  createBtnEventListener,
  handleAddFavoriteBtnClick,
} from "../components/FlightList.js";

let favoritesArr = localStorage.getItem("favorites");
let favoritesDiv;
let addFavorite;

const initialFavoritesList = (
  favoritesArrFromHomePage,
  addFavoriteFromHomePage
) => {
  favoritesDiv = document.getElementById("favorite-page-flight-list");
  addFavorite = addFavoriteFromHomePage;
  updateFavoritesPage(favoritesArrFromHomePage);
};
const updateFavoritesPage = (favoritesArrFromHomePage) => {
  favoritesArr = favoritesArrFromHomePage;
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
        <button type="button" class="btn btn-danger w-100" id="favoritesRemoveBtn-${id}">
          Remove from favorites<i class="bi bi-trash3"></i>
        </button>

        </div>
    </div>
    </li>
  `;
};

const createList = () => {
  let innerStr = "";
  //clear event listeners for delete btns
  // clearEventListeners("flightListDeleteBtn", handleDeleteBtnClick);
  // //clear event listeners for edit btns
  // clearEventListeners("flightListEditBtn", handleEditBtnClick);
  // clearEventListeners("listSeeMoreBtn", handleShowMoreBtnClick);
  clearEventListeners("addToFavoritebtn", handleAddFavoriteBtnClick);

  //create new elements and remove old ones
  for (let favorite of favoritesArr) {
    innerStr += createItem(
      favorite.destination,
      favorite.description,
      favorite.price,
      favorite.imgUrl,
      favorite.id
    );
  }
  favoritesDiv.innerHTML = innerStr;
  // add event listeners for delete btns
  // createBtnEventListener("flightListDeleteBtn", handleDeleteBtnClick);
  // // add event listeners for edit btns
  // createBtnEventListener("flightListEditBtn", handleEditBtnClick);
  // createBtnEventListener("listSeeMoreBtn", handleShowMoreBtnClick);
  createBtnEventListener("addToFavoritebtn", handleAddFavoriteBtnClick);
};

// const removeFavorite = () =>{

// }

export { initialFavoritesList, updateFavoritesPage };
