import validateEmail from "../validation/validateEmail.js";
import validatePassword from "../validation/validatePassword.js";
import validateName from "../validation/validateName.js";

import showToast from "../services/Toast.js";

const inputName = document.getElementById("profile-input-Name");

const inputEmail = document.getElementById("profile-input-email");
const inputPhone = document.getElementById("profile-input-phone");
const inputAddress = document.getElementById("profile-input-address");
const inputPassword = document.getElementById("profile-input-password");
const saveProfileBtn = document.querySelector("#profile-save-btn");
const editProfileBtn = document.getElementById("profile-edit-btn");
const cancelProfileBtn = document.getElementById("profile-cancel-btn");

let nameDisplay = document.getElementById("profile-name-display");
let emailDisplay = document.getElementById("profile-email-display");
let phoneDisplay = document.getElementById("profile-phone-display");
let addressDisplay = document.getElementById("profile-address-display");
let passwordDisplay = document.getElementById("profile-password-display");

let inEdit = false;

let nameOk = false;
let emailOk = false;
let phoneOk = false;
let addressOk = false;
let passwordOk = false;

window.addEventListener("load", () => {
  let users = localStorage.getItem("users");
  let token = localStorage.getItem("token");

  if (users && token) {
    //we have users
    users = JSON.parse(users); // convert from string to array of objects
    token = JSON.parse(token);
    let user = users.find((item) => item.id === token.id);
    if (user) {
      nameDisplay.innerHTML = user.name;
      emailDisplay.innerHTML = user.email;
      phoneDisplay.innerHTML = user.phone;
      addressDisplay.innerHTML = user.address;
      passwordDisplay.innerHTML = user.password;
      inputName.value = user.name;
      inputEmail.value = user.email;
      inputPhone.value = user.phone;
      inputAddress.value = user.address;
      inputPassword.value = user.password;
    }
  }
  editProfileBtn.addEventListener("click", () => {
    inEdit = true;
    if (inEdit) {
      inputName.classList.remove("d-none");
      inputEmail.classList.remove("d-none");
      inputPhone.classList.remove("d-none");
      inputAddress.classList.remove("d-none");
      inputPassword.classList.remove("d-none");
      nameDisplay.classList.add("d-none");
      emailDisplay.classList.add("d-none");
      phoneDisplay.classList.add("d-none");
      addressDisplay.classList.add("d-none");
      passwordDisplay.classList.add("d-none");
      editProfileBtn.classList.add("d-none");
      saveProfileBtn.classList.remove("d-none");
      cancelProfileBtn.classList.remove("d-none");
    }
    cancelProfileBtn.addEventListener("click", () => {
      inEdit = false;
      if (!inEdit) {
        inputName.classList.add("d-none");
        inputEmail.classList.add("d-none");
        inputPhone.classList.add("d-none");
        inputAddress.classList.add("d-none");
        inputPassword.classList.add("d-none");
        nameDisplay.classList.remove("d-none");
        emailDisplay.classList.remove("d-none");
        phoneDisplay.classList.remove("d-none");
        addressDisplay.classList.remove("d-none");
        passwordDisplay.classList.remove("d-none");
        editProfileBtn.classList.remove("d-none");
        saveProfileBtn.classList.add("d-none");
        cancelProfileBtn.classList.add("d-none");
      }
    });
  });
  //when page loaded
  if (inputName.value !== "") {
    checkNameInput();
  }
  if (inputEmail.value !== "") {
    checkEmailInput();
  }
  if (inputPhone.value !== "") {
    checkPhoneInput();
  }
  if (inputAddress.value !== "") {
    checkAddressInput();
  }
  if (inputPassword.value !== "") {
    checkPasswordInput();
  }
});

inputName.addEventListener("input", () => {
  checkNameInput();
});

inputEmail.addEventListener("input", () => {
  checkEmailInput();
});
inputEmail.addEventListener("input", () => {
  checkPhoneInput();
});
inputEmail.addEventListener("input", () => {
  checkAddressInput();
});

inputPassword.addEventListener("input", () => {
  checkPasswordInput();
});

const checkNameInput = () => {
  let errorArr = validateName(inputName.value);
  //   console.log(reg.test(inputName.value));
  if (errorArr.length === 0) {
    //the text is ok
    inputName.classList.remove("is-invalid");
    document.getElementById("profile-alert-name").classList.add("d-none");
    nameOk = true;
  } else {
    //the text is not ok
    inputName.classList.add("is-invalid");
    document.getElementById("profile-alert-name").classList.remove("d-none");
    document.getElementById("profile-alert-name").innerHTML =
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
    document.getElementById("profile-alert-email").classList.add("d-none");
    emailOk = true;
  } else {
    //the text is not ok
    inputEmail.classList.add("is-invalid");
    document.getElementById("profile-alert-email").classList.remove("d-none");
    document.getElementById("profile-alert-email").innerHTML =
      errorArr.join("<br>");
    emailOk = false;
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

const checkPasswordInput = () => {
  let errorArr = validatePassword(inputPassword.value);
  if (errorArr.length === 0) {
    //the text is ok
    inputPassword.classList.remove("is-invalid");
    document.getElementById("profile-alert-password").classList.add("d-none");
    passwordOk = true;
  } else {
    //the text is not ok
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

const checkIfCanEnableBtn = () =>
  (saveProfileBtn.disabled = !(
    nameOk &&
    emailOk &&
    passwordOk &&
    phoneOk &&
    addressOk
  ));

saveProfileBtn.addEventListener("click", () => {
  if (!(nameOk && emailOk && passwordOk && phoneOk && addressOk)) {
    //if someone changed the html from dev tools
    return;
  }
  let users = localStorage.getItem("users");
  let token = localStorage.getItem("token");
  if (users && token) {
    //we have users
    users = JSON.parse(users); // convert from string to array of objects
    token = JSON.parse(token);
    let userEmail = users.find((item) => item.email === inputEmail.value);
    let user = users.find((item) => item.id === token.id);
    if (userEmail && user.id !== userEmail.id) {
      //the email already token
      showToast("The email already taken", false);
      return;
    }
    if (user) {
      user.name = token.name = inputName.value;
      user.email = token.email = inputEmail.value;
      user.password = inputPassword.value;
      user.phone = inputPhone.value;
      user.address = inputAddress.value;
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("token", JSON.stringify(token));
      showToast("Saved");
    }
  }
  setTimeout(() => {
    location.reload();
  }, 1500);
});
