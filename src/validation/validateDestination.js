import validate from "./validate.js";
const validateDestination = (value) => {
  const reg = new RegExp("^[A-Z][a-z0-9-\\s]{0,}$", "g");
  return validate(reg, value, 2, 20).map((err) => `Destination name is ${err}`);
};

export default validateDestination;
