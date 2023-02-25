import { handlePageChange } from "../routes/router.js";
import checkIfAdmin from "../utils/checkIfAdmin.js";
import checkIfConnected from "../utils/checkIfConnected.js";
import getNextId from "../utils/getNextId.js";

let nextId;
let newFlight;
let isAdmin;
let isConnected;
let showNewPopup;
let editSaveBtn = document.getElementById("editFlightPopupSaveBtn");

let navAddNewFlightLink;
let addNewFlight;

const navBeforeLogin = document.getElementById("navBeforeLogin");
const navAfterLogin = document.getElementById("navAfterLogin");

const initializeNavbar = (showNewPopupFromHomePage, addFlightFromHomePage) => {
  nextId = getNextId();
  isAdmin = checkIfAdmin();
  isConnected = checkIfConnected();
  if (isConnected) {
    navBeforeLogin.classList.add("d-none");
    navAfterLogin.classList.remove("d-none");
  }
  showNewPopup = showNewPopupFromHomePage;
  addNewFlight = addFlightFromHomePage;
  /* nav */
  navAddNewFlightLink = document.getElementById("nav-add-new-flight-link");
  if (!isAdmin) {
    navAddNewFlightLink.classList.add("d-none");
  }
  navAddNewFlightLink.addEventListener("click", () => {
    showNewPopup();
    editSaveBtn.classList.add("d-none");
  });
};

export default initializeNavbar;
