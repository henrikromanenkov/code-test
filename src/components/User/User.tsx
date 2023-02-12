import { useNavigate } from "react-router-dom";
import { UserI } from "../../models/UserModel";

import FallbackUserImage from "../../images/user-image.png";

import "./styles/User.scss";

interface UserProps {
  user: UserI;
}

export enum UserMetaValues {
  NAME = "Name: ",
  USERNAME = "Username: ",
  EMAIL = "Email: ",
  PHONE = "Phone: ",
  WEBSITE = "Website: ",
  COMPANY_BS = "Bs: ",
  COMPANY_CATCH_PHRASE = "CatchPhrase: ",
  CITY = "City: ",
  STREET = "Street: ",
  SUITE = "Suite: ",
  ZIPCODE = "zipcode: ",
  GEO_LAT = "Geo(lat): ",
  GEO_LNG = "Geo(lng): ",
}

const User = (props: UserProps): JSX.Element => {
  const { user } = props;
  const navigation = useNavigate();

  const getMetaItem = (key: UserMetaValues, value: string): JSX.Element => {
    return (
      <div className="user-data-item">
        <span className="data-key">{key}</span>
        <span className="data-value">{value}</span>
      </div>
    );
  };

  const nameEl = (): JSX.Element => {
    return getMetaItem(UserMetaValues.NAME, user.name);
  };
  const usernameEl = (): JSX.Element => {
    return getMetaItem(UserMetaValues.USERNAME, user.username);
  };
  const emailEl = (): JSX.Element => {
    return getMetaItem(UserMetaValues.EMAIL, user.email);
  };

  const editUser = (): void => {
    navigation(`/user/${user.id}`);
  };

  return (
    <div className="user" key={user.id}>
      <img alt="user-image" src={FallbackUserImage} />
      <div className="user-data">
        {nameEl()}
        {usernameEl()}
        {emailEl()}
      </div>
      <button className="edit-user-button" onClick={editUser}>
        Edit User
      </button>
    </div>
  );
};

export default User;
