class Flight {
  id;
  destenation;
  price;
  description;
  imgUrl;
  constructor(id, destenation, price, description, imgUrl) {
    this.id = id;
    this.destenation = destenation;
    this.price = price;
    this.description = description;
    this.imgUrl = imgUrl;
  }
}
export default Flight;
