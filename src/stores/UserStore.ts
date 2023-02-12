import { action, observable } from "mobx";

import UsersService from "../services/UsersService";
import UserModel, { UserI } from "../models/UserModel";

class UserStore {
  @observable users: UserModel[] | undefined = undefined;

  // Load user data
  public async loadUserData(): Promise<UserModel[]> {
    // Is users already loaded do not load again
    if (this.users?.length) {
      return this.users;
    }

    const users = await UsersService.fetchUsers();
    this.setUsers(users); // set for local use

    return users;
  }

  @action setUsers(users: UserModel[]): void {
    this.users = users;
  }

  public getUser(id: number): UserModel | undefined {
    return this.users?.find((user) => user.id === id);
  }

  public updateUser(id: number, userData: UserI, isNew = false): void {
    // No users
    if (!this.users?.length) {
      return;
    }

    const activeUserIndex = isNew
      ? id - 1 // divide 1 because of index
      : this.users.findIndex((user) => user.id === id);

    // Do not update unknown user
    if (activeUserIndex < 0 && !isNew) {
      return;
    }

    this.users[activeUserIndex] = new UserModel(userData);
  }
}

export default UserStore;
