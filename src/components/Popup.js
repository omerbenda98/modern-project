import Property from "../models/Property.js";
import getNextId from "../utils/getNextId.js";
import validateDescription from "../validation/validateDescription.js";
import validateDestination from "../validation/validateDestination.js";
import validateImgUrl from "../validation/validateImgUrl.js";
import validatePrice from "../validation/validatePrice.js";

let selectedProperty, editProperty;

let destinationInput = document.getElementById("editPropertiesPopupName");
let descriptionInput = document.getElementById(
  "editPropertiesPopupDescription"
);
let priceInput = document.getElementById("editPropertiesPopupPrice");
let imgUrlInput = document.getElementById("editPropertiesPopupImg");

let priceOk = false;
let descriptionOk = false;
let destinationOk = false;
let imgUrlOk = false;

const editPropertiesPopupImgDisplay = document.getElementById(
  "editPropertiesPopupImgDisplay"
);
// const editPropertiesPopupName = document.getElementById(
//   "editPropertiesPopupName"
// );
// const editPropertiesPopupDescription = document.getElementById(
//   "editPropertiesPopupDescription"
// );
// const editPropertiesPopupPrice = document.getElementById(
//   "editPropertiesPopupPrice"
// );
// const editPropertiesPopupImg = document.getElementById(
//   "editPropertiesPopupImg"
// );
const editPropertiesPopup = document.getElementById("editPropertiesPopup");

const initPopup = (selectedPropertyFromHomePage, editPropertyFromHomePage) => {
  /*
    set data from selectedProperty to html
    */
  if (selectedPropertyFromHomePage) {
    selectedProperty = selectedPropertyFromHomePage;
  } else {
    selectedProperty = new Property(getNextId(), "", 0, "", "");
  }
  editProperty = editPropertyFromHomePage;
  editPropertiesPopupImgDisplay.src = selectedProperty.imgUrl;
  descriptionInput.value = selectedProperty.name;
  descriptionInput.value = selectedProperty.description;
  priceInput.value = selectedProperty.price;
  imgUrlInput.value = selectedProperty.imgUrl;
  showPopup();
};

const showPopup = () => {
  editPropertiesPopup.classList.remove("d-none");
};

const hidePopup = () => {
  editPropertiesPopup.classList.add("d-none");
};

window.addEventListener("load", () => {
  editPropertiesPopup.addEventListener("click", (ev) => {
    if (
      ev.target.id !== "editPropertiesPopup" &&
      ev.target.id !== "editPropertiesPopupCancelBtn" &&
      ev.target.id !== "editPropertiesPopupCancelBtnIcon"
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
  let errorArr = validateImgUrl(priceInput.value);
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
  (btnRegister.disabled = !(
    destinationOk &&
    priceOk &&
    descriptionOk &&
    imgUrlOk
  ));

document
  .getElementById("editPropertiesPopupSaveBtn")
  .addEventListener("click", () => {
    selectedProperty.name = destinationInput.value;
    selectedProperty.description = descriptionInput.value;
    selectedProperty.price = priceInput.value;
    selectedProperty.imgUrl = imgUrlInput.value;
    editProperty(selectedProperty);
    hidePopup();
  });
imgUrlInput.addEventListener("input", () => {
  editPropertiesPopupImgDisplay.src = imgUrlInput.value;
});

export { initPopup, showPopup, hidePopup };
