import checkIfAdmin from "../utils/checkIfAdmin.js";
import checkIfConnected from "../utils/checkIfConnected.js";
import getNextId from "../utils/getNextId.js";

let nextId;
let isAdmin;
let isConnected;
let showPopup;

let navAddNewFlightLink;
let addFlight;

const navBeforeLogin = document.getElementById("navBeforeLogin");
const navAfterLogin = document.getElementById("navAfterLogin");

const initializeNavbar = (showPopupFromHomePage, addFlightFromHomePage) => {
  nextId = getNextId();
  isAdmin = checkIfAdmin();
  isConnected = checkIfConnected();
  if (isConnected) {
    navBeforeLogin.classList.add("d-none");
    navAfterLogin.classList.remove("d-none");
  }
  showPopup = showPopupFromHomePage;
  addFlight = addFlightFromHomePage;
  /* nav */
  navAddNewFlightLink = document.getElementById("nav-add-new-flight-link");
  if (!isAdmin) {
    navAddNewFlightLink.classList.add("d-none");
  }
  navAddNewFlightLink.addEventListener("click", () => {
    showPopup();
    addFlight();
  });
};

export default initializeNavbar;
