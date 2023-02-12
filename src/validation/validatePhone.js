import validate from "./validate.js";
const validatePhone = (value) => {
  const reg = new RegExp(
    "^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{2,20}$",
    "gmi"
  );
  return validate(reg, value, 5, 255).map((err) => `phone is ${err}`);
};

export default validatePhone;
