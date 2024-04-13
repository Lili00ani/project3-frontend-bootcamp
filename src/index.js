//-----------Libraries-----------//
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import ReactDOM from "react-dom/client";

//-----------Components-----------//
import NavBar from "./components/navbar.js";

//-----------Styling-----------//
import "./index.css";

//-----------Pages-----------//
import RegisterPage from "./pages/registerPage.js";
import SignInPage from "./pages/signInPage.js";
import ResetPasswordPage from "./pages/resetPasswordPage.js";
import ErrorPage from "./pages/errorPage.js";
import IntroPage from "./pages/introPage.js";
import ContactUsPage from "./pages/contactUsPage.js";

//-----------UserPages-----------//
import HomePage from "./pages/userPages/homePage.js";
import EventDetailPage from "./pages/userPages/eventDetailPage.js";
import MyBookingPage from "./pages/userPages/myBookingPage.js";
import MyProfilePage from "./pages/userPages/myProfilePage.js";
import CheckoutForm from "./pages/userPages/checkOutPage.js";
import FreeReturnPage from "./pages/userPages/freeReturnPage.js";
import ReturnPage from "./pages/userPages/returnPage.js";
import SearchPage from "./pages/userPages/searchPage.js";

//-----------AdminPages-----------//
import AdminHomePage from "./pages/adminPages/adminHomePage.js";
import AdminProfilePage from "./pages/adminPages/adminProfilePage.js";
import AdminCreateEvent from "./pages/adminPages/AdminCreateEvent.jsx";
import { Toaster } from "react-hot-toast";

const root = ReactDOM.createRoot(document.getElementById("root"));

const AdminRoutes = () => (
  <Routes>
    <Route path="/" element={<AdminHomePage />} />
    <Route path="edit" element={<AdminCreateEvent />} />
    <Route path="add" element={<AdminCreateEvent />} />
    <Route path="profile" element={<AdminProfilePage />} />
  </Routes>
);

const NonAdminRoutes = () => (
  <Routes>
    <Route
      path="/home"
      element={
        <>
          <NavBar /> <HomePage />
        </>
      }
    />
    <Route
      path="mybooking"
      element={
        <>
          <NavBar /> <MyBookingPage />
        </>
      }
    />
    <Route
      path="profile"
      element={
        <>
          <NavBar /> <MyProfilePage />
        </>
      }
    />
    <Route
      path="contactus"
      element={
        <>
          <NavBar /> <ContactUsPage />
        </>
      }
    />
    <Route
      path="search"
      element={
        <>
          <NavBar /> <SearchPage />
        </>
      }
    />
    <Route
      path="search/:keyword"
      element={
        <>
          <NavBar /> <SearchPage />
        </>
      }
    />
    <Route path="/" element={<IntroPage />} />
    <Route path="checkout" element={<CheckoutForm />} />
    <Route path="free-return" element={<FreeReturnPage />} />
    <Route path="/return" element={<ReturnPage />} />
    <Route path="events/:eventId" element={<EventDetailPage />} />
    <Route path="*" element={<ErrorPage />} />
  </Routes>
);

const newUrl = window.location.origin + "/home";

//testing with simple basic auth0
root.render(
  <Auth0Provider
    domain={process.env.REACT_APP_AUTH0_DOMAIN}
    clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
    authorizationParams={{
      redirect_uri: newUrl,
    }}
  >
    <BrowserRouter>
      <Routes>
        <Route path="admin/*" element={<AdminRoutes />} />
        <Route path="/*" element={<NonAdminRoutes />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  </Auth0Provider>
);
