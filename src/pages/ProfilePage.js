import validateEmail from "../validation/validateEmail.js";
import validatePassword from "../validation/validatePassword.js";
import validateName from "../validation/validateName.js";

import showToast from "../services/Toast.js";

const inputFirstName = document.getElementById("profile-input-firstName");
const inputLastName = document.getElementById("profile-input-lastName");
const inputState = document.getElementById("profile-input-state");
const inputCountry = document.getElementById("profile-input-country");
const inputCity = document.getElementById("profile-input-city");
const inputStreet = document.getElementById("profile-input-street");
const inputHouseNum = document.getElementById("profile-input-houseNumber");
const inputZip = document.getElementById("profile-input-zip");
const inputEmail = document.getElementById("profile-input-email");
const inputPhone = document.getElementById("profile-input-phone");
const inputPassword = document.getElementById("profile-input-password");
const inputCheckBox = document.getElementById("profile-input-adminCheckBox");

let firstNameDisplay = document.getElementById("profile-firstName-display");
let lastNameDisplay = document.getElementById("profile-lastName-display");
let stateDisplay = document.getElementById("profile-state-display");
let countryDisplay = document.getElementById("profile-country-display");
let cityDisplay = document.getElementById("profile-city-display");
let streetDisplay = document.getElementById("profile-street-display");
let houseNumDisplay = document.getElementById("profile-houseNum-display");
let zipDisplay = document.getElementById("profile-zip-display");
let emailDisplay = document.getElementById("profile-email-display");
let phoneDisplay = document.getElementById("profile-phone-display");
let passwordDisplay = document.getElementById("profile-password-display");

let editProfileBtn = document.getElementById("profile-edit-btn");
let saveProfileBtn = document.getElementById("profile-save-btn");
let cancelProfileBtn = document.getElementById("profile-cancel-btn");

let inEdit = false;

let firstNameOk = false;
let lastNameOk = false;
let passwordOk = false;
let emailOk = false;

window.addEventListener("load", () => {
  let users = localStorage.getItem("users");
  let token = localStorage.getItem("token");

  if (users && token) {
    users = JSON.parse(users);
    token = JSON.parse(token);
    let user = users.find((item) => item.id === token.id);
    if (user) {
      firstNameDisplay.innerHTML = user.firstName;
      lastNameDisplay.innerHTML = user.lastName;
      stateDisplay.innerHTML = user.state;
      countryDisplay.innerHTML = user.country;
      cityDisplay.innerHTML = user.city;
      streetDisplay.innerHTML = user.street;
      houseNumDisplay.innerHTML = user.houseNum;
      zipDisplay.innerHTML = user.zip;
      emailDisplay.innerHTML = user.email;
      phoneDisplay.innerHTML = user.phone;
      passwordDisplay.innerHTML = user.password;

      inputFirstName.value = user.firstName;
      inputLastName.value = user.lastName;
      inputState.value = user.state;
      inputCountry.value = user.county;
      inputCity.value = user.city;
      inputStreet.value = user.street;
      inputHouseNum.value = user.houseNum;
      inputZip.value = user.zip;
      inputEmail.value = user.email;
      inputPhone.value = user.phone;
      inputPassword.value = user.password;
    }
  }
  editProfileBtn.addEventListener("click", () => {
    inEdit = true;
    if (inEdit) {
      let inputs = document.querySelectorAll('[id^="profile-input"]');

      inputs.forEach((input) => {
        input.classList.remove("d-none");
      });

      let displays = document.querySelectorAll('[id$="display"]');

      displays.forEach((display) => {
        display.classList.add("d-none");
      });

      editProfileBtn.classList.add("d-none");
      saveProfileBtn.classList.remove("d-none");
      cancelProfileBtn.classList.remove("d-none");
    }
    cancelProfileBtn.addEventListener("click", () => {
      inEdit = false;
      if (!inEdit) {
        let inputs = document.querySelectorAll('[id^="profile-input"]');

        inputs.forEach((input) => {
          input.classList.add("d-none");
        });

        let displays = document.querySelectorAll('[id$="display"]');

        displays.forEach((display) => {
          display.classList.remove("d-none");
        });

        editProfileBtn.classList.remove("d-none");
        saveProfileBtn.classList.add("d-none");
        cancelProfileBtn.classList.add("d-none");
      }
    });
  });

  if (inputFirstName.value !== "") {
    checkFirstNameInput();
  }
  if (inputEmail.value !== "") {
    checkEmailInput();
  }
  if (inputPassword.value !== "") {
    checkPasswordInput();
  }

  if (inputLastName.value !== "") {
    checkLastNameInput();
  }
});

inputFirstName.addEventListener("input", () => {
  checkFirstNameInput();
});

inputLastName.addEventListener("input", () => {
  checkLastNameInput();
});

inputEmail.addEventListener("input", () => {
  checkEmailInput();
});

inputPassword.addEventListener("input", () => {
  checkPasswordInput();
});

const checkFirstNameInput = () => {
  let errorArr = validateName(inputFirstName.value);

  if (errorArr.length === 0) {
    inputFirstName.classList.remove("is-invalid");
    document.getElementById("profile-alert-firstName").classList.add("d-none");
    firstNameOk = true;
  } else {
    inputFirstName.classList.add("is-invalid");
    document
      .getElementById("profile-alert-firstName")
      .classList.remove("d-none");
    document.getElementById("profile-alert-firstName").innerHTML =
      errorArr.join("<br>");
    firstNameOk = false;
  }
  checkIfCanEnableBtn();
};

const checkEmailInput = () => {
  let errorArr = validateEmail(inputEmail.value);
  if (errorArr.length === 0) {
    inputEmail.classList.remove("is-invalid");
    document.getElementById("profile-alert-email").classList.add("d-none");
    emailOk = true;
  } else {
    inputEmail.classList.add("is-invalid");
    document.getElementById("profile-alert-email").classList.remove("d-none");
    document.getElementById("profile-alert-email").innerHTML =
      errorArr.join("<br>");
    emailOk = false;
  }
  checkIfCanEnableBtn();
};

const checkPasswordInput = () => {
  let errorArr = validatePassword(inputPassword.value);
  if (errorArr.length === 0) {
    inputPassword.classList.remove("is-invalid");
    document.getElementById("profile-alert-password").classList.add("d-none");
    passwordOk = true;
  } else {
    inputPassword.classList.add("is-invalid");
    document
      .getElementById("profile-alert-password")
      .classList.remove("d-none");
    document.getElementById("profile-alert-password").innerHTML =
      errorArr.join("<br>");
    passwordOk = false;
  }
  checkIfCanEnableBtn();
};

const checkLastNameInput = () => {
  let errorArr = validateName(inputLastName.value);
  if (errorArr.length === 0) {
    inputLastName.classList.remove("is-invalid");
    document.getElementById("profile-alert-lastName").classList.add("d-none");
    lastNameOk = true;
  } else {
    inputLastName.classList.add("is-invalid");
    document
      .getElementById("profile-alert-lastName")
      .classList.remove("d-none");
    document.getElementById("profile-alert-lastName").innerHTML =
      errorArr.join("<br>");
    lastNameOk = false;
  }
  checkIfCanEnableBtn();
};

const checkIfCanEnableBtn = () =>
  (saveProfileBtn.disabled = !(
    firstNameOk &&
    emailOk &&
    passwordOk &&
    lastNameOk
  ));

saveProfileBtn.addEventListener("click", () => {
  if (!(firstNameOk && emailOk && passwordOk && lastNameOk)) {
    return;
  }
  let users = localStorage.getItem("users");
  let token = localStorage.getItem("token");
  if (users && token) {
    users = JSON.parse(users);
    token = JSON.parse(token);
    let userEmail = users.find((item) => item.email === inputEmail.value);
    let user = users.find((item) => item.id === token.id);
    if (userEmail && user.id !== userEmail.id) {
      showToast("The email already taken", false);
      return;
    }
    if (user) {
      user.firstName = token.firstName = inputFirstName.value;
      user.lastName = token.lastName = inputLastName.value;
      user.email = token.email = inputEmail.value;
      user.password = inputPassword.value;
      user.state = inputState.value;
      user.country = inputCountry.value;
      user.city = inputCity.value;
      user.street = inputStreet.value;
      user.houseNum = inputHouseNum.value;
      user.zip = inputZip.value;
      user.phone = inputPhone.value;
      user.admin = inputCheckBox.checked;
      token.isAdmin = inputCheckBox.checked;

      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("token", JSON.stringify(token));
      showToast("Saved");
    }
  }
  setTimeout(() => {
    location.reload();
  }, 1500);
});
