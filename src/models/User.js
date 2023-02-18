class User {
  id;
  firstName;
  lastName;
  state;
  country;
  city;
  street;
  houseNum;
  zip;
  email;
  password;
  phone;
  isAdmin;

  constructor(
    id,
    firstName,
    lastName,
    state,
    country,
    city,
    street,
    houseNum,
    zip,
    email,
    phone,
    password,
    isAdmin
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.state = state;
    this.country = country;
    this.city = city;
    this.street = street;
    this.houseNum = houseNum;
    this.zip = zip;
    this.email = email;
    this.phone = phone;
    this.password = password;

    this.isAdmin = isAdmin;
    this.id = id;
  }
}
export default User;
