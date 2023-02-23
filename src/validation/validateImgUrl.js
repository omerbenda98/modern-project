import validate from "./validate.js";
const validateImgUrl = (value) => {
  const reg = new RegExp(".(png|jpe?g|gif|bmp|webp)", "g");
  return validate(reg, value, 2, 255).map((err) => `Img Url is ${err}`);
};

export default validateImgUrl;
