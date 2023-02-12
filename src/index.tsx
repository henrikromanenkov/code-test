import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App";

import "./index.scss";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <Routes>
      <Route path={"*"} element={<App />} />
    </Routes>
  </BrowserRouter>
);
