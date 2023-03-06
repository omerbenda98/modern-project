import PAGES from "./models/pageModel.js";
import { handlePageChange } from "./routes/router.js";
import "./initialData/initialData.js";
import "./pages/RegisterPage.js";
import "./pages/LoginPage.js";
import "./pages/ProfilePage.js";
import { showNewPopup, addNewFlight } from "./pages/HomePage.js";
import initializeNavbar from "./components/Navbar.js";
import "./components/AddFlight.js";
import checkIfConnected from "./utils/checkIfConnected.js";

const navLogo = document.getElementById("navLogo");
const navHomeLink = document.getElementById("nav-home-link");
const navAboutusLink = document.getElementById("nav-aboutus-link");
const navRegisterPageLink = document.getElementById("nav-register-page");
const navLoginPageLink = document.getElementById("nav-login-page");
const navEditProfilePage = document.getElementById("nav-edit-profile-page");
const navLogout = document.getElementById("nav-logout");
const navFavoritesLink = document.getElementById("favorite-page-btn");

const aboutDisplaysBtnLink = document.getElementById("about-us-display-btn");

aboutDisplaysBtnLink.addEventListener("click", function () {
  handlePageChange(PAGES.HOME);
});

window.addEventListener("load", () => {
  initializeNavbar(showNewPopup, addNewFlight);
  if (checkIfConnected()) {
    let user = localStorage.getItem("token");
    user = JSON.parse(user);
    navEditProfilePage.innerText = user.firstName;
  }
});

navLogo.addEventListener("click", function () {
  handlePageChange(PAGES.HOME);
});
navHomeLink.addEventListener("click", function () {
  handlePageChange(PAGES.HOME);
});
navAboutusLink.addEventListener("click", function () {
  handlePageChange(PAGES.ABOUT);
});
navRegisterPageLink.addEventListener("click", function () {
  handlePageChange(PAGES.REGISTER);
});
navLoginPageLink.addEventListener("click", function () {
  handlePageChange(PAGES.LOGIN);
});
navEditProfilePage.addEventListener("click", () => {
  handlePageChange(PAGES.PROFILE);
});
navFavoritesLink.addEventListener("click", function () {
  handlePageChange(PAGES.FAVORITES);
});
navLogout.addEventListener("click", () => {
  localStorage.removeItem("token");
  location.reload();
});
