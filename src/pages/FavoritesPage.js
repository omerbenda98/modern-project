import {
  clearEventListeners,
  createBtnEventListener,
  handleAddFavoriteBtnClick,
  getIdFromClick,
} from "../components/FlightList.js";

let favoritesArr = localStorage.getItem("favorites");
let favoritesDiv;
let removeFavorite;
let addFavorite;

const initialFavoritesList = (
  favoritesArrFromHomePage,
  addFavoriteFromHomePage,
  removeFavoriteFromHomePage
) => {
  favoritesDiv = document.getElementById("favorite-page-flight-list");
  addFavorite = addFavoriteFromHomePage;
  removeFavorite = removeFavoriteFromHomePage;
  updateFavoritesPage(favoritesArrFromHomePage);
};
const updateFavoritesPage = (favoritesArrFromHomePage) => {
  favoritesArr = favoritesArrFromHomePage;
  createList();
};

const createItem = (destination, description, price, img, id) => {
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
const addFavoriteBack = (id) => {
  let selectedListBtn = document.querySelector(
    `[id$='listAddToFavoriteBtn-${id}']`
  );
  let selectedGalleryBtn = document.querySelector(
    `[id$='galleryAddToFavoriteBtn-${id}']`
  );
  selectedListBtn.classList.remove("d-none");
  selectedGalleryBtn.classList.remove("d-none");
};

const handleRemoveFavoriteBtnClick = (ev) => {
  removeFavorite(getIdFromClick(ev));
  addFavoriteBack(getIdFromClick(ev));
};

const createList = () => {
  let innerStr = "";

  clearEventListeners("addToFavoritebtn", handleAddFavoriteBtnClick);
  clearEventListeners("favoritesRemoveBtn", handleRemoveFavoriteBtnClick);

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

  createBtnEventListener("addToFavoritebtn", handleAddFavoriteBtnClick);
  createBtnEventListener("favoritesRemoveBtn", handleRemoveFavoriteBtnClick);
};

export { initialFavoritesList, updateFavoritesPage };
