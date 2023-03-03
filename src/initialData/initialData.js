import Flight from "../models/Flight.js";
import User from "../models/User.js";

let id = 1;

const createData = () => {
  let flightsArr = [
    new Flight(
      id++,
      "Dubai",
      799.9,
      `Experience the magic of Dubai with our unbeatable flight deals! Whether you're seeking adventure in the desert or luxury shopping in the city, our flights to Dubai are the perfect way to get there. With prices that won't break the bank, you can enjoy all that this vibrant destination has to offer without worrying about your budget. Book now and start planning your dream vacation to Dubai today!`,
      "./assets/imgs/homepageCarouselImg.jpg"
    ),
    new Flight(
      id++,
      "Ibiza",
      399.9,
      `Looking for a sun-soaked escape? Look no further than Ibiza! Our flights to this Balearic Island paradise are now available at amazing prices, making it easier than ever to discover the vibrant culture, stunning beaches, and unforgettable nightlife that Ibiza is famous for. Whether you're seeking relaxation or adventure, our flights to Ibiza are the perfect way to kick-start your island getaway. So why wait? Book now and get ready to experience the magic of Ibiza!`,
      "./assets/imgs/homepageCarouselImg2.jpg"
    ),
    new Flight(
      id++,
      "Iceland",
      499.9,
      `Experience the awe-inspiring beauty of Iceland with our incredible flight deals! From the dramatic landscapes of the Golden Circle to the breathtaking Northern Lights, Iceland is a destination unlike any other. And now, with our unbeatable prices on flights, you can experience this natural wonderland without breaking the bank. So whether you're seeking adventure or relaxation, our flights to Iceland are the perfect way to get there. Book now and get ready to discover the magic of Iceland!`,
      "./assets/imgs/homepageCarouselImg3.jpg"
    ),
  ];
  return flightsArr;
};

const createUserData = () => {
  let intitialUsersArr = [
    new User(
      "1",
      "Omer",
      "Ben-David",
      "israel",
      "israel",
      "modiin",
      "shimon peres",
      "26",
      "7179902",
      "omerbenda98@gmail.com",
      "0547563977",
      "Omerbenda98!",

      true
    ),
  ];
  return intitialUsersArr;
};

const setInitialData = () => {
  let flights = localStorage.getItem("props");
  let users = localStorage.getItem("users");
  if (flights && users) {
    return;
  }
  localStorage.setItem("props", JSON.stringify(createData()));
  localStorage.setItem("favorites", "");
  localStorage.setItem("users", JSON.stringify(createUserData()));
  localStorage.setItem("nextid", id + "");
};

setInitialData();
