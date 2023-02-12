import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserModel from "../models/UserModel";
import User from "../components/User/User";
import { useStores } from "../stores";

import "./styles/UserPage.scss";

const UsersPage = (): JSX.Element => {
  const [users, setUsers] = useState([] as UserModel[]);
  const [userLoaded, setUserLoaded] = useState(false);
  const navigation = useNavigate();
  const { userStore } = useStores();

  useEffect(() => {
    (async () => {
      setUserLoaded(false);
      const users = await userStore.loadUserData();
      if (users?.length) {
        setUsers(users);
        setUserLoaded(true);
      }
    })();
  }, []);

  const searchUser = (searchKey: ChangeEvent<HTMLInputElement>): void => {
    const { target } = searchKey;
    const matchingUsers =
      userStore.users?.filter((user) => user.name.includes(target?.value)) ||
      [];
    setUsers(matchingUsers);
  };

  const createUser = (): void => {
    return navigation(`/user`);
  };

  const usersList = (): JSX.Element[] | JSX.Element => {
    if (!users.length) {
      return <p>No user found, please try again!</p>;
    }

    return users.map((user, index) => <User user={user} key={index} />);
  };

  const getHeaderContent = (): JSX.Element => {
    return (
      <>
        <div>
          <span>Search: </span>
          <input
            type="input"
            placeholder="Search user"
            onChange={searchUser}
          ></input>
        </div>
        <button className="new-user-button" onClick={createUser}>
          Add User
        </button>
      </>
    );
  };

  return (
    <div className="users-page">
      <h1>Users</h1>
      <div className="users-header">{getHeaderContent()}</div>
      {userLoaded ? <div className="users-list">{usersList()}</div> : null}
    </div>
  );
};

export default UsersPage;
