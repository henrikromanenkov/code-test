import UserModel, { UserI } from "../models/UserModel";

class UsersService {
  static fetchUsers = async (): Promise<UserModel[]> => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const jsonData = await response.json();
      return jsonData.map((userData: UserI) => new UserModel(userData));
    } catch (err) {
      console.warn(err);
      throw "Failed to load users";
    }
  };
}

export default UsersService;
