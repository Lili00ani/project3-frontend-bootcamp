//-----------Libraries-----------//
import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import ReactDOM from "react-dom/client";
//-----------Components-----------//

import App from "./App.js";

//-----------Styling-----------//
import "./index.css";

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
const AUDIENCE = process.env.REACT_APP_AUTH0_AUDIENCE;
const root = ReactDOM.createRoot(document.getElementById("root"));

// const AdminRoutes = () => (
//   <Routes>
//     <Route path="/" element={<AdminHomePage />} />
//     <Route path="attendance" element={<AdminEventAttendancePage />} />
//     <Route path="edit" element={<AdminEventPage />} />
//     <Route path="add" element={<AdminEventPage />} />
//     <Route path="profile" element={<AdminProfilePage />} />
//     <Route path="analytics" element={<AdminAnalyticsPage />} />
//   </Routes>
// );

//testing with simple basic auth0
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
