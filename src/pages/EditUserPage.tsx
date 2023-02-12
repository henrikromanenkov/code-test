import { useNavigate, useParams } from "react-router-dom";
import { ChangeEvent, useState } from "react";
import { UserI } from "../models/UserModel";
import { UserMetaValues } from "../components/User/User";
import { useStores } from "../stores";

import "./styles/EditUserPage.scss";

interface EditUserProps {
  isNewUser?: boolean;
}
const EditUserPage = (props: EditUserProps): JSX.Element => {
  const { isNewUser } = props;
  const { id = "" } = useParams();
  const navigation = useNavigate();
  const { userStore } = useStores();
  const [state, updateState] = useState({} as UserI);

  const userData = id ? userStore.getUser(parseInt(id, 10)) : undefined;

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>,
    parentName: string | undefined
  ): void => {
    const { target } = event;
    const { value, name } = target;

    updateState((prevState) => {
      let newState;
      switch (parentName) {
        case "company":
          newState = { company: { ...prevState.company, [name]: value } };
          break;
        case "address":
          newState = { address: { ...prevState.address, [name]: value } };
          break;
        case "geo":
          newState = {
            address: {
              ...prevState.address,
              geo: {
                ...prevState.address?.geo,
                [name]: value,
              },
            },
          };
          break;
        default:
          newState = { [name]: value };
      }

      return {
        ...prevState,
        ...newState,
      };
    });
  };

  const getInputEl = (
    value: string | undefined,
    label: UserMetaValues,
    name?: string,
    parentName?: string | undefined
  ): JSX.Element => {
    return (
      <>
        <label className="input-label">{label}</label>
        <input
          className="input-area"
          type="text"
          defaultValue={value}
          name={name}
          onChange={(event) => handleInputChange(event, parentName)}
        />
      </>
    );
  };

  const getUserData = (): JSX.Element | null => {
    return userData || isNewUser ? (
      <div className="user-form">
        <form>
          {getUserPersonalData()}
          {getUserCompanyData()}
          {getUserAddressData()}
        </form>
      </div>
    ) : null;
  };

  const getUserPersonalData = (): JSX.Element => {
    return (
      <div className="form-section">
        <h4>Personal information</h4>
        {getInputEl(state.name || userData?.name, UserMetaValues.NAME, "name")}
        {getInputEl(
          state.username || userData?.username,
          UserMetaValues.USERNAME,
          "username"
        )}
        {getInputEl(
          state.email || userData?.email,
          UserMetaValues.EMAIL,
          "email"
        )}
        {getInputEl(
          state.phone || userData?.phone,
          UserMetaValues.PHONE,
          "phone"
        )}
        {getInputEl(
          state.website || userData?.website,
          UserMetaValues.WEBSITE,
          "website"
        )}
      </div>
    );
  };

  const getUserCompanyData = (): JSX.Element => {
    return (
      <div className="form-section">
        <h4>Company information</h4>
        {getInputEl(
          state.company?.name || userData?.company?.name,
          UserMetaValues.NAME,
          "name",
          "company"
        )}
        {getInputEl(
          state.company?.bs || userData?.company?.bs,
          UserMetaValues.COMPANY_BS,
          "bs",
          "company"
        )}
        {getInputEl(
          state.company?.catchPhrase || userData?.company?.catchPhrase,
          UserMetaValues.COMPANY_CATCH_PHRASE,
          "catchPhrase",
          "company"
        )}
      </div>
    );
  };

  const getUserAddressData = (): JSX.Element => {
    return (
      <div className="form-section">
        <h4>Address information</h4>
        {getInputEl(
          state.address?.city || userData?.address?.city,
          UserMetaValues.CITY,
          "city",
          "address"
        )}
        {getInputEl(
          state.address?.street || userData?.address?.street,
          UserMetaValues.STREET,
          "street",
          "address"
        )}
        {getInputEl(
          state.address?.suite || userData?.address?.suite,
          UserMetaValues.SUITE,
          "suite",
          "address"
        )}
        {getInputEl(
          state.address?.zipcode || userData?.address?.zipcode,
          UserMetaValues.ZIPCODE,
          "zipcode",
          "address"
        )}
        {getInputEl(
          state.address?.geo?.lat || userData?.address?.geo?.lat,
          UserMetaValues.GEO_LAT,
          "lat",
          "geo"
        )}
        {getInputEl(
          state.address?.geo?.lng || userData?.address?.geo?.lng,
          UserMetaValues.GEO_LNG,
          "lng",
          "geo"
        )}
      </div>
    );
  };

  const saveUserData = (): void => {
    const userLength = userStore.users?.length || 0;
    const userId = isNewUser && !id ? userLength + 1 : parseInt(id, 10);
    const updatedData = { ...userData, ...state, id: userId };
    userStore.updateUser(userId, updatedData, isNewUser);

    goBack();
  };

  const goBack = (): void => {
    navigation("/");
  };

  return (
    <div className="edit-user">
      <h1>Edit User</h1>
      <h2>
        {!userData && !isNewUser ? "No user found or missing data" : null}
      </h2>
      {getUserData()}
      <div className="buttons">
        {userData || state?.name ? (
          <button onClick={saveUserData}>Save changes</button>
        ) : null}
        <button onClick={goBack}>Go Back</button>
      </div>
    </div>
  );
};
export default EditUserPage;
