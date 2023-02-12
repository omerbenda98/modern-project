import PAGES from "../models/pageModel.js";
import { handlePageChange } from "../routes/router.js";
import validateEmail from "../validation/validateEmail.js";
import validatePassword from "../validation/validatePassword.js";
import validateName from "../validation/validateName.js";
import validatePhone from "../validation/validatePhone.js";
import validateAddress from "../validation/validateAddress.js";
import User from "../models/User.js";
import showToast from "../services/Toast.js";

const inputName = document.getElementById("register-input-name");
const inputEmail = document.getElementById("register-input-email");
const inputPassword = document.getElementById("register-input-password");
const inputPhone = document.getElementById("register-input-phone");
const inputAddress = document.getElementById("register-input-address");
const btnRegister = document.querySelector("#register-btn");

let nameOk = false;
let emailOk = false;
let passwordOk = false;
let phoneOk = false;
let addressOk = false;

window.addEventListener("load", () => {
  //when page loaded
  if (inputName.value !== "") {
    checkNameInput();
  }
  if (inputEmail.value !== "") {
    checkEmailInput();
  }
  if (inputPassword.value !== "") {
    checkPasswordInput();
  }
  if (inputPhone.value !== "") {
    checkPhoneInput();
  }
  if (inputAddress.value !== "") {
    checkAddressInput();
  }
});

inputName.addEventListener("input", () => {
  checkNameInput();
});

inputEmail.addEventListener("input", () => {
  checkEmailInput();
});

inputPassword.addEventListener("input", () => {
  checkPasswordInput();
});
inputPhone.addEventListener("input", () => {
  checkPhoneInput();
});

inputAddress.addEventListener("input", () => {
  checkAddressInput();
});

const checkNameInput = () => {
  let errorArr = validateName(inputName.value);
  //   console.log(reg.test(inputName.value));
  if (errorArr.length === 0) {
    //the text is ok
    inputName.classList.remove("is-invalid");
    document.getElementById("register-alert-name").classList.add("d-none");
    nameOk = true;
  } else {
    //the text is not ok
    inputName.classList.add("is-invalid");
    document.getElementById("register-alert-name").classList.remove("d-none");
    document.getElementById("register-alert-name").innerHTML =
      errorArr.join("<br>");
    nameOk = false;
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
const checkPhoneInput = () => {
  let errorArr = validatePhone(inputPhone.value);
  if (errorArr.length === 0) {
    //the text is ok
    inputPhone.classList.remove("is-invalid");
    document.getElementById("register-alert-phone").classList.add("d-none");
    phoneOk = true;
  } else {
    //the text is not ok
    inputPhone.classList.add("is-invalid");
    document.getElementById("register-alert-phone").classList.remove("d-none");
    document.getElementById("register-alert-phone").innerHTML =
      errorArr.join("<br>");
    phoneOk = false;
  }
  checkIfCanEnableBtn();
};
const checkAddressInput = () => {
  let errorArr = validateAddress(inputAddress.value);
  if (errorArr.length === 0) {
    //the text is ok
    inputAddress.classList.remove("is-invalid");
    document.getElementById("register-alert-address").classList.add("d-none");
    addressOk = true;
  } else {
    //the text is not ok
    inputAddress.classList.add("is-invalid");
    document
      .getElementById("register-alert-address")
      .classList.remove("d-none");
    document.getElementById("register-alert-address").innerHTML =
      errorArr.join("<br>");
    addressOk = false;
  }
  checkIfCanEnableBtn();
};

const checkIfCanEnableBtn = () =>
  (btnRegister.disabled = !(
    nameOk &&
    emailOk &&
    passwordOk &&
    phoneOk &&
    addressOk
  ));

btnRegister.addEventListener("click", () => {
  if (!(nameOk && emailOk && passwordOk && phoneOk && addressOk)) {
    //if someone changed the html from dev tools
    return;
  }
  let users = localStorage.getItem("users");
  let nextUserId = localStorage.getItem("nextUserId");
  nextUserId = +nextUserId;
  let newUser = new User(
    nextUserId++,
    inputName.value,
    inputEmail.value,
    inputPassword.value,
    inputPhone.value,
    inputAddress.value
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
