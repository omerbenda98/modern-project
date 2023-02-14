import Property from "../models/Property.js";
import User from "../models/User.js";

let id = 1;
let nextUserId = 1;

const createData = () => {
  let propertiesArr = [
    new Property(
      id++,
      "Kenny's house",
      8.12,
      `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Id quasi ea culpa magnam enim soluta, totam, illum maiores, incidunt in quo natus eius sint. Alias nihil nobis dolor id cumque!
        Tempore tempora, et delectus dicta mollitia quo natus magnam vero aliquam quisquam! Nam expedita labore reprehenderit omnis eum. Aliquid neque suscipit reiciendis, sequi soluta illum quae at laborum quasi voluptatum.`,
      "./assets/imgs/1.jpg"
    ),
    new Property(
      id++,
      "Chocolate house",
      20,
      `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Id quasi ea culpa magnam enim soluta, totam, illum maiores, incidunt in quo natus eius sint. Alias nihil nobis dolor id cumque!
        Tempore tempora, et delectus dicta mollitia quo natus magnam vero aliquam quisquam! Nam expedita labore reprehenderit omnis eum. Aliquid neque suscipit reiciendis, sequi soluta illum quae at laborum quasi voluptatum.`,
      "./assets/imgs/2.jpg"
    ),
    new Property(
      id++,
      "Kenny's beach house",
      25,
      `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Id quasi ea culpa magnam enim soluta, totam, illum maiores, incidunt in quo natus eius sint. Alias nihil nobis dolor id cumque!
        Tempore tempora, et delectus dicta mollitia quo natus magnam vero aliquam quisquam! Nam expedita labore reprehenderit omnis eum. Aliquid neque suscipit reiciendis, sequi soluta illum quae at laborum quasi voluptatum.`,
      "./assets/imgs/3.jpg"
    ),
    new Property(
      id++,
      "John's raft",
      9.9,
      `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Id quasi ea culpa magnam enim soluta, totam, illum maiores, incidunt in quo natus eius sint. Alias nihil nobis dolor id cumque!
        Tempore tempora, et delectus dicta mollitia quo natus magnam vero aliquam quisquam! Nam expedita labore reprehenderit omnis eum. Aliquid neque suscipit reiciendis, sequi soluta illum quae at laborum quasi voluptatum.`,
      "./assets/imgs/4.jpg"
    ),
    new Property(
      id++,
      "John's pie",
      3.14,
      `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Id quasi ea culpa magnam enim soluta, totam, illum maiores, incidunt in quo natus eius sint. Alias nihil nobis dolor id cumque!
        Tempore tempora, et delectus dicta mollitia quo natus magnam vero aliquam quisquam! Nam expedita labore reprehenderit omnis eum. Aliquid neque suscipit reiciendis, sequi soluta illum quae at laborum quasi voluptatum.`,
      "./assets/imgs/5.jpg"
    ),
    new Property(
      id++,
      "Kart's dream house",
      2.5,
      `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Id quasi ea culpa magnam enim soluta, totam, illum maiores, incidunt in quo natus eius sint. Alias nihil nobis dolor id cumque!
        Tempore tempora, et delectus dicta mollitia quo natus magnam vero aliquam quisquam! Nam expedita labore reprehenderit omnis eum. Aliquid neque suscipit reiciendis, sequi soluta illum quae at laborum quasi voluptatum.`,
      "./assets/imgs/6.jpg"
    ),
  ];
  return propertiesArr;
};

const createUserData = () => {
  let intitialUsersArr = [
    new User("1", "Omer", "omerbenda98@gmail.com", "Omerbenda98!"),
    new User("2", "Benda", "benda98@gmail.com", "Omerbenda98!"),
  ];
  return intitialUsersArr;
};

const setInitialData = () => {
  let properties = localStorage.getItem("props");
  let users = localStorage.getItem("users");
  if (properties || users) {
    return;
  }
  localStorage.setItem("props", JSON.stringify(createData()));
  localStorage.setItem("users", JSON.stringify(createUserData()));
  localStorage.setItem("nextid", id + "");
};

setInitialData();
