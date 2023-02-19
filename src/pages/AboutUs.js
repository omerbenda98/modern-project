import { handlePageChange } from "./routes/router.js";

const displaysBtnLink = document.getElementById("about-us-display-btn");
displaysBtnLink.addEventListener("click", handlePageChange(page.HOME));
const registerBtnLink = document.getElementById("about-us-display-btn");
registerBtnLink.addEventListener("click", handlePageChange(page.REGISTER));
const profileBtnLink = document.getElementById("about-us-display-btn");
profileBtnLink.addEventListener("click", handlePageChange(page.PROFILE));
