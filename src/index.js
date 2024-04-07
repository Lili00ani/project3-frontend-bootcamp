//-----------Libraries-----------//
import React from "react";
import ReactDOM from "react-dom/client";
//-----------Components-----------//
import App from "./App";

//-----------Styling-----------//
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
const AUDIENCE = process.env.REACT_APP_AUTH0_AUDIENCE;
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    redirectUri={window.location.origin}
    audience={AUDIENCE}
    scope="openid email profile"
  >
    <App />
  </Auth0Provider>
);
