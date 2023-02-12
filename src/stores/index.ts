import UserStore from "./UserStore";
import React from "react";

class Stores {
  public userStore: UserStore;
  constructor() {
    this.userStore = new UserStore();
  }
}

const StoreContext = React.createContext(new Stores());
export const useStores = () => React.useContext(StoreContext);
