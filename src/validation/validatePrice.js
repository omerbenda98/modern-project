import validate from "./validate.js";
const validatePrice = (value) => {
  const reg = new RegExp("[(0-9)+.?(0-9)*]+", "g");
  return validate(reg, value, 2, 255).map((err) => `Price name is ${err}`);
};

export default validatePrice;
