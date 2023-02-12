import validate from "./validate.js";
const validateAddress = (value) => {
  const reg = new RegExp("^[A-Z][a-z0-9-\\s]{0,}$", "g");
  return validate(reg, value, 5, 255).map((err) => `address is ${err}`);
};

export default validateAddress;
