//-----------Libraries-----------//
import React from "react";
import ReactDOM from "react-dom/client";
import store from "./Store.jsx";
import { Provider } from "react-redux";
//-----------Components-----------//
import App from "./App";

//-----------Styling-----------//
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
