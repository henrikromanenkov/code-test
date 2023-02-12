import { Route, Routes } from "react-router-dom";

import UsersPage from "./pages/UsersPage";
import EditUserPage from "./pages/EditUserPage";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path={"/"} element={<UsersPage />} />
        <Route path={"/user/:id"} element={<EditUserPage />} />
        <Route path={"/user"} element={<EditUserPage isNewUser={true} />} />
      </Routes>
    </div>
  );
};

export default App;
