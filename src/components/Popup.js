import Flight from "../models/Flight.js";
import getNextId from "../utils/getNextId.js";
import validateDescription from "../validation/validateDescription.js";
import validateDestination from "../validation/validateDestination.js";
import validateImgUrl from "../validation/validateImgUrl.js";
import validatePrice from "../validation/validatePrice.js";

let selectedFlight;

let destinationInput = document.getElementById("editFlightPopupDestination");
let descriptionInput = document.getElementById("editFlightPopupDescription");
let priceInput = document.getElementById("editFlightPopupPrice");
let imgUrlInput = document.getElementById("editFlightPopupImg");
let popupSaveBtn = document.getElementById("editFlightPopupSaveBtn");

let priceOk = true;
let descriptionOk = true;
let destinationOk = true;
let imgUrlOk = true;
// popupSaveBtn.disabled = false;

const editFlightPopup = document.getElementById("editFlightPopup");

const initPopup = (selectedFlightFromHomePage, selectedFlight) => {
  /*
    set data from selectedFlight to html
    */
  if (selectedFlightFromHomePage) {
    selectedFlight = selectedFlightFromHomePage;
  } else {
    selectedFlight = new Flight(getNextId(), "", 0, "", "");
  }
  editFlightPopupImgDisplay.src = selectedFlight.imgUrl;
  destinationInput.value = selectedFlight.destination;
  descriptionInput.value = selectedFlight.description;
  priceInput.value = selectedFlight.price;
  imgUrlInput.value = selectedFlight.imgUrl;
  showPopup();
};

const showPopup = () => {
  editFlightPopup.classList.remove("d-none");
};

const hidePopup = () => {
  editFlightPopup.classList.add("d-none");
};

window.addEventListener("load", () => {
  editFlightPopup.addEventListener("click", (ev) => {
    if (
      ev.target.id !== "editFlightPopup" &&
      ev.target.id !== "editFlightPopupCancelBtn" &&
      ev.target.id !== "editFlightPopupCancelBtnIcon"
    ) {
      return;
    }
    hidePopup();
  });

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

const checkDestinationInput = () => {
  let errorArr = validateDestination(destinationInput.value);
  //   console.log(reg.test(inputName.value));
  if (errorArr.length === 0) {
    //the text is ok
    destinationInput.classList.remove("is-invalid");
    document.getElementById("popup-alert-destination").classList.add("d-none");
    destinationOk = true;
  } else {
    //the text is not ok
    destinationInput.classList.add("is-invalid");
    document
      .getElementById("popup-alert-destination")
      .classList.remove("d-none");
    document.getElementById("popup-alert-destination").innerHTML =
      errorArr.join("<br>");
    destinationOk = false;
  }
  checkIfCanEnableBtn();
};

const checkDescriptionInput = () => {
  let errorArr = validateDescription(descriptionInput.value);
  if (errorArr.length === 0) {
    //the text is ok
    descriptionInput.classList.remove("is-invalid");
    document.getElementById("popup-alert-description").classList.add("d-none");
    descriptionOk = true;
  } else {
    //the text is not ok
    descriptionInput.classList.add("is-invalid");
    document
      .getElementById("popup-alert-description")
      .classList.remove("d-none");
    document.getElementById("popup-alert-description").innerHTML =
      errorArr.join("<br>");
    descriptionOk = false;
  }
  checkIfCanEnableBtn();
};

const checkPriceInput = () => {
  let errorArr = validatePrice(priceInput.value);
  if (errorArr.length === 0) {
    //the text is ok
    priceInput.classList.remove("is-invalid");
    document.getElementById("popup-alert-price").classList.add("d-none");
    priceOk = true;
  } else {
    //the text is not ok
    priceInput.classList.add("is-invalid");
    document.getElementById("popup-alert-price").classList.remove("d-none");
    document.getElementById("popup-alert-price").innerHTML =
      errorArr.join("<br>");
    priceOk = false;
  }
  checkIfCanEnableBtn();
};
const checkImgUrlInput = () => {
  let errorArr = validateImgUrl(imgUrlInput.value);
  if (errorArr.length === 0) {
    //the text is ok
    imgUrlInput.classList.remove("is-invalid");
    document.getElementById("popup-alert-imgUrl").classList.add("d-none");
    imgUrlOk = true;
  } else {
    //the text is not ok
    imgUrlInput.classList.add("is-invalid");
    document.getElementById("popup-alert-imgUrl").classList.remove("d-none");
    document.getElementById("popup-alert-imgUrl").innerHTML =
      errorArr.join("<br>");
    imgUrlOk = false;
  }
  checkIfCanEnableBtn();
};

const checkIfCanEnableBtn = () =>
  (popupSaveBtn.disabled = !(
    destinationOk &&
    priceOk &&
    descriptionOk &&
    imgUrlOk
  ));

popupSaveBtn.addEventListener("click", () => {
  selectedFlight.destination = destinationInput.value;
  selectedFlight.description = descriptionInput.value;
  selectedFlight.price = priceInput.value;
  selectedFlight.imgUrl = imgUrlInput.value;
  addNewFlight(selectedFlight);
  hidePopup();
});
imgUrlInput.addEventListener("input", () => {
  editFlightPopupImgDisplay.src = imgUrlInput.value;
});
console.log(popupSaveBtn);
export { initPopup, showPopup, hidePopup };
