class User {
  id;
  name;
  email;
  password;
  phone;
  address;
  isAdmin;
  constructor(id, name, email, password, phone, address) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.phone = phone;
    this.address = address;
    this.isAdmin = false;
    this.id = id;
  }
}
export default User;
