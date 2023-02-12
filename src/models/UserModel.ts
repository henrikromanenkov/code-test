export interface UserCompany {
  bs: string;
  catchPhrase: string;
  name: string;
}

export interface UserAddress {
  city: string;
  geo: {
    lat: string;
    lng: string;
  };
  street: string;
  suite: string;
  zipcode: string;
}

export interface UserI {
  id: number;
  name: string;
  phone: string;
  username: string;
  website: string;
  email: string;
  company: UserCompany;
  address: UserAddress;
}

class UserModel {
  id: number;
  name: string;
  phone: string;
  username: string;
  website: string;
  email: string;
  company: UserCompany;
  address: UserAddress;

  constructor(args: UserI) {
    this.id = args.id;
    this.name = args.name;
    this.phone = args.phone;
    this.username = args.username;
    this.website = args.website;
    this.email = args.email;
    this.company = args.company;
    this.address = args.address;
  }
}

export default UserModel;
