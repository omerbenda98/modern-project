import {
  initialFlightGallery,
  updateFlightGallery,
} from "../components/FlightGallery.js";
import {
  initialFlightList,
  updateFlightList,
} from "../components/FlightList.js";
import {
  initialFlightCarousel,
  updateFlightCarousel,
} from "../components/FlightCarousel.js";
import { initialFavoritesList, updateFavoritesPage } from "./FavoritesPage.js";
import { initPopup } from "../components/Popup.js";
import { initSeeMore } from "../components/SeeMore.js";
import checkIfAdmin from "../utils/checkIfAdmin.js";

let flightsArr, originalFlightsArr;
let displayNow; // display that we can see now
let favoritesArr;

let homeDisplayList;
let homeDisplayGallery;
let homeDisplayCarousel;

let flightGallery;
let flightList;
let flightCarousel;

let isAdmin;

window.addEventListener("load", () => {
  if (!favoritesArr) {
    favoritesArr = [];
    localStorage.setItem("favorites", JSON.stringify(favoritesArr));
  } else {
    favoritesArr = JSON.parse(favoritesArr);
  }
  flightsArr = localStorage.getItem("props");
  if (!flightsArr) {
    return;
  }
  flightsArr = JSON.parse(flightsArr);
  originalFlightsArr = [...flightsArr];
  isAdmin = checkIfAdmin();

  initialFlightGallery(
    flightsArr,
    isAdmin,
    deleteFlight,
    showPopup,
    seeMore,
    addFavorite
  );
  initialFlightList(
    flightsArr,
    isAdmin,
    deleteFlight,
    showPopup,
    seeMore,
    addFavorite
  );
  initialFlightCarousel(flightsArr);
  initialFavoritesList(favoritesArr, addFavorite, removeFavorite);
  initializeElements();
  initializeBtns();
});

const initializeElements = () => {
  /* Display btns */
  homeDisplayList = document.getElementById("homeDisplayList");
  homeDisplayGallery = document.getElementById("homeDisplayGallery");
  homeDisplayCarousel = document.getElementById("homeDisplayCarousel");
  /* divs */
  flightGallery = document.getElementById("flightGallery");
  flightList = document.getElementById("flightList");
  flightCarousel = document.getElementById("flightCarousel");
  displayNow = flightList; // choose who we want to display
  displayToDisplay(displayNow);
};

const initializeBtns = () => {
  homeDisplayList.addEventListener("click", () => {
    displayToDisplay(flightList);
  });
  homeDisplayGallery.addEventListener("click", () => {
    displayToDisplay(flightGallery);
  });
  homeDisplayCarousel.addEventListener("click", () => {
    displayToDisplay(flightCarousel);
  });
  document
    .getElementById("homeDisplaySortASC")
    .addEventListener("click", () => {
      sortFlights();
    });
  document
    .getElementById("homeDisplaySortDESC")
    .addEventListener("click", () => {
      sortFlights(false);
    });
  document
    .getElementById("homeDisplaySearch")
    .addEventListener("input", (ev) => {
      let regex = new RegExp("^" + ev.target.value, "i");
      flightsArr = originalFlightsArr.filter((item) => {
        let reg = regex.test(item.name);
        return reg;
      });
      updateDisplays();
    });
};

const displayToDisplay = (toDisplay) => {
  // hide what we currently showing
  displayNow.classList.remove("d-block");
  displayNow.classList.add("d-none");
  // show what we want to display now
  toDisplay.classList.remove("d-none");
  toDisplay.classList.add("d-block");
  //this is what we displaying now
  displayNow = toDisplay;
};

const updateDisplays = () => {
  updateFlightGallery(flightsArr);
  updateFlightList(flightsArr);
  updateFlightCarousel(flightsArr);
};

const saveToLocalStorage = (arrToSave) => {
  localStorage.setItem("props", JSON.stringify(arrToSave));
};

const deleteFlight = (id) => {
  id = +id;
  originalFlightsArr = originalFlightsArr.filter((item) => item.id !== id);
  saveToLocalStorage(originalFlightsArr);
  flightsArr = flightsArr.filter((item) => item.id !== id);
  updateDisplays();
};

const sortFlights = (asc = true) => {
  if (asc) {
    flightsArr.sort((a, b) => a.name.localeCompare(b.name));
  } else {
    flightsArr.sort((a, b) => b.name.localeCompare(a.name));
  }
  updateDisplays();
};

const seeMore = (id) => {
  let selectedFlight = flightsArr.find((item) => item.id === +id);
  if (!selectedFlight) {
    return;
  }
  initSeeMore(selectedFlight);
};

const showPopup = (id) => {
  let selectedFlight = flightsArr.find((item) => item.id === +id);
  if (!selectedFlight) {
    return;
  }
  initPopup(selectedFlight, editFlight);
};

const showNewPopup = () => {
  initPopup(undefined, addNewFlight);
};

const addNewFlight = (newFlight) => {
  originalFlightsArr = [...originalFlightsArr, newFlight];
  let nextId = +newFlight.id + 1;
  localStorage.setItem("nextid", nextId + "");
  flightsArr = [...originalFlightsArr];
  editFlight();
};

const editFlight = () => {
  saveToLocalStorage(originalFlightsArr);
  updateDisplays();
};

const addFavorite = (id) => {
  let selectedFlight = flightsArr.find((item) => item.id === +id);
  if (favoritesArr) {
    favoritesArr = [...favoritesArr, selectedFlight];
    localStorage.setItem("favorites", JSON.stringify(favoritesArr));
  } else {
    localStorage.setItem("favorites", JSON.stringify(selectedFlight));
  }
  updateFavoritesPage(favoritesArr);
};

const removeFavorite = (id) => {
  id = +id;
  favoritesArr = favoritesArr.filter((item) => item.id !== id);
  updateFavoritesPage(favoritesArr);
};

export { showNewPopup, addNewFlight };
