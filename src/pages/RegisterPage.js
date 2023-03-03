import PAGES from "../models/pageModel.js";
import { handlePageChange } from "../routes/router.js";
import validateEmail from "../validation/validateEmail.js";
import validatePassword from "../validation/validatePassword.js";
import validateName from "../validation/validateName.js";

import User from "../models/User.js";
import showToast from "../services/Toast.js";

const inputFirstName = document.getElementById("register-input-firstName");
const inputLastName = document.getElementById("register-input-lastName");
const inputState = document.getElementById("register-input-state");
const inputCountry = document.getElementById("register-input-country");
const inputCity = document.getElementById("register-input-city");
const inputStreet = document.getElementById("register-input-street");
const inputHouseNum = document.getElementById("register-input-houseNumber");
const inputZip = document.getElementById("register-input-zip");
const inputEmail = document.getElementById("register-input-email");
const inputPhone = document.getElementById("register-input-phone");
const inputPassword = document.getElementById("register-input-password");
const inputRepeatPassword = document.getElementById(
  "register-input-repeatPassword"
);
const btnRegister = document.querySelector("#register-save-btn");

let firstNameOk = false;
let lastNameOk = false;
let passwordOk = false;
let repeatPasswordOk = false;
let emailOk = false;

window.addEventListener("load", () => {
  //when page loaded
  if (inputFirstName.value !== "") {
    checkFirstNameInput();
  }
  if (inputEmail.value !== "") {
    checkEmailInput();
  }
  if (inputPassword.value !== "") {
    checkPasswordInput();
  }
  if (inputRepeatPassword.value !== "") {
    checkRepeatPasswordInput();
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

inputRepeatPassword.addEventListener("input", () => {
  checkRepeatPasswordInput();
});

const checkFirstNameInput = () => {
  let errorArr = validateName(inputFirstName.value);

  if (errorArr.length === 0) {
    inputFirstName.classList.remove("is-invalid");
    document.getElementById("register-alert-firstName").classList.add("d-none");
    firstNameOk = true;
  } else {
    inputFirstName.classList.add("is-invalid");
    document
      .getElementById("register-alert-firstName")
      .classList.remove("d-none");
    document.getElementById("register-alert-firstName").innerHTML =
      errorArr.join("<br>");
    firstNameOk = false;
  }
  checkIfCanEnableBtn();
};

const checkEmailInput = () => {
  let errorArr = validateEmail(inputEmail.value);
  if (errorArr.length === 0) {
    inputEmail.classList.remove("is-invalid");
    document.getElementById("register-alert-email").classList.add("d-none");
    emailOk = true;
  } else {
    inputEmail.classList.add("is-invalid");
    document.getElementById("register-alert-email").classList.remove("d-none");
    document.getElementById("register-alert-email").innerHTML =
      errorArr.join("<br>");
    emailOk = false;
  }
  checkIfCanEnableBtn();
};

const checkPasswordInput = () => {
  let errorArr = validatePassword(inputPassword.value);
  if (errorArr.length === 0) {
    inputPassword.classList.remove("is-invalid");
    document.getElementById("register-alert-password").classList.add("d-none");
    passwordOk = true;
  } else {
    inputPassword.classList.add("is-invalid");
    document
      .getElementById("register-alert-password")
      .classList.remove("d-none");
    document.getElementById("register-alert-password").innerHTML =
      errorArr.join("<br>");
    passwordOk = false;
  }
  checkIfCanEnableBtn();
};
const checkRepeatPasswordInput = () => {
  let errorArr = validatePassword(inputPassword.value);
  if (inputRepeatPassword.value === inputPassword.value) {
    inputRepeatPassword.classList.remove("is-invalid");
    document
      .getElementById("register-alert-repeatPassword")
      .classList.add("d-none");
    repeatPasswordOk = true;
  } else {
    inputRepeatPassword.classList.add("is-invalid");
    document
      .getElementById("register-alert-repeatPassword")
      .classList.remove("d-none");
    document.getElementById("register-alert-repeatPassword").innerHTML =
      errorArr.join("<br>");
    repeatPasswordOk = false;
  }
  checkIfCanEnableBtn();
};
const checkLastNameInput = () => {
  let errorArr = validateName(inputLastName.value);
  if (errorArr.length === 0) {
    inputLastName.classList.remove("is-invalid");
    document.getElementById("register-alert-lastName").classList.add("d-none");
    lastNameOk = true;
  } else {
    inputLastName.classList.add("is-invalid");
    document
      .getElementById("register-alert-lastName")
      .classList.remove("d-none");
    document.getElementById("register-alert-lastName").innerHTML =
      errorArr.join("<br>");
    lastNameOk = false;
  }
  checkIfCanEnableBtn();
};

const checkIfCanEnableBtn = () =>
  (btnRegister.disabled = !(
    firstNameOk &&
    emailOk &&
    passwordOk &&
    repeatPasswordOk &&
    lastNameOk
  ));

btnRegister.addEventListener("click", () => {
  if (
    !(firstNameOk && emailOk && passwordOk && repeatPasswordOk && lastNameOk)
  ) {
    return;
  }
  const adminCheckbox = document.getElementById("adminCheckBox").checked;
  let users = localStorage.getItem("users");
  let nextUserId = localStorage.getItem("nextUserId");
  nextUserId = +nextUserId;
  let newUser = new User(
    nextUserId++,
    inputFirstName.value,
    inputLastName.value,
    inputState.value,
    inputCountry.value,
    inputCity.value,
    inputStreet.value,
    inputHouseNum.value,
    inputZip.value,
    inputEmail.value,
    inputPhone.value,
    inputPassword.value,
    adminCheckbox
  );

  localStorage.setItem("nextUserId", nextUserId + "");

  if (!users) {
    users = [newUser];
    localStorage.setItem("users", JSON.stringify(users));
  } else {
    users = JSON.parse(users);
    for (let user of users) {
      if (user.email === inputEmail.value) {
        showToast("Email already exists", false);
        return;
      }
    }
    users = [...users, newUser];
    localStorage.setItem("users", JSON.stringify(users));
  }
  handlePageChange(PAGES.LOGIN);
});
