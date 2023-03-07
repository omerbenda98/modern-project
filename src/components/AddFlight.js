import Flight from "../models/Flight.js";
import { addNewFlight } from "../pages/HomePage.js";
import getNextId from "../utils/getNextId.js";
import {
  checkDescriptionInput,
  checkDestinationInput,
  checkImgUrlInput,
  checkPriceInput,
  hidePopup,
} from "./Popup.js";

let destinationInput = document.getElementById("editFlightPopupDestination");
let descriptionInput = document.getElementById("editFlightPopupDescription");
let priceInput = document.getElementById("editFlightPopupPrice");
let imgUrlInput = document.getElementById("editFlightPopupImg");
let popupSaveBtn = document.getElementById("addFlightPopupsaveBtn");

let newFlight;

window.addEventListener("load", () => {
  if (destinationInput.value !== "") {
    checkDestinationInput();
  }
  if (descriptionInput.value !== "") {
    checkDescriptionInput();
  }
  if (priceInput.value !== "") {
    checkPriceInput();
  }
  if (imgUrlInput.value !== "") {
    checkImgUrlInput();
  }
});

destinationInput.addEventListener("input", () => {
  checkDestinationInput();
});

descriptionInput.addEventListener("input", () => {
  checkDescriptionInput();
});

priceInput.addEventListener("input", () => {
  checkPriceInput();
});

imgUrlInput.addEventListener("input", () => {
  checkImgUrlInput();
});
popupSaveBtn.addEventListener("click", () => {
  newFlight = new Flight(
    getNextId(),
    destinationInput.value,
    priceInput.value,
    descriptionInput.value,
    imgUrlInput.value
  );
  addNewFlight(newFlight);
  hidePopup();
});
