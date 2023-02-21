import validate from "./validate.js";
const validateDescription = (value) => {
  const reg = new RegExp("^[A-Z][a-z0-9-\\s]{0,}$", "g");
  return validate(reg, value, 2, 255).map(
    (err) => `Description name is ${err}`
  );
};

export default validateDescription;
