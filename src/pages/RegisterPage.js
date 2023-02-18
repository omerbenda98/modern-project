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
  //   console.log(reg.test(inputName.value));
  if (errorArr.length === 0) {
    //the text is ok
    inputFirstName.classList.remove("is-invalid");
    document.getElementById("register-alert-firstName").classList.add("d-none");
    firstNameOk = true;
  } else {
    //the text is not ok
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
    //the text is ok
    inputEmail.classList.remove("is-invalid");
    document.getElementById("register-alert-email").classList.add("d-none");
    emailOk = true;
  } else {
    //the text is not ok
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
    //the text is ok
    inputPassword.classList.remove("is-invalid");
    document.getElementById("register-alert-password").classList.add("d-none");
    passwordOk = true;
  } else {
    //the text is not ok
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
    //the text is ok
    inputRepeatPassword.classList.remove("is-invalid");
    document
      .getElementById("register-alert-repeatPassword")
      .classList.add("d-none");
    repeatPasswordOk = true;
  } else {
    //the text is not ok
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
    //the text is ok
    inputLastName.classList.remove("is-invalid");
    document.getElementById("register-alert-lastName").classList.add("d-none");
    lastNameOk = true;
  } else {
    //the text is not ok
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
    //if someone changed the html from dev tools
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
    //the first user
    users = [newUser];
    // let user = new User(inputName.value, inputEmail.value, inputPassword.value);
    // users = [user]
    localStorage.setItem("users", JSON.stringify(users));
    /*
      JSON.stringify(users) - convert array of objects to string
      localStorage.setItem - store the json string to localStorage with 
        key users 
        and value users as json string
    */
  } else {
    //we have users
    users = JSON.parse(users); // convert from string to array of objects
    // console.log("users from localStorage", users);
    for (let user of users) {
      if (user.email === inputEmail.value) {
        //display msg - email already exists
        showToast("Email already exists", false);
        return;
      }
    }
    //user provided new email
    users = [...users, newUser];
    localStorage.setItem("users", JSON.stringify(users));
  }
  handlePageChange(PAGES.LOGIN);
});
