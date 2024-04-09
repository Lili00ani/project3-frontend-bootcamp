// //-----------Libraries-----------//
// import React, { useEffect, useState } from "react";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// //-----------Components-----------//
// import NavBar from "./components/navbar.js";

// //-----------Styling-----------//
// import "./index.css";

// //-----------Pages-----------//
// import RegisterPage from "./pages/registerPage.js";
// import SignInPage from "./pages/signInPage.js";
// import ResetPasswordPage from "./pages/resetPasswordPage.js";
// import ErrorPage from "./pages/errorPage.js";

//-----------UserPages-----------//
import HomePage from "./pages/userPages/homePage.js";
import EventDetailPage from "./pages/userPages/eventDetailPage.js";
import FavPage from "./pages/userPages/favPage.js";
import MyBookingPage from "./pages/userPages/myBookingPage.js";
import MyProfilePage from "./pages/userPages/myProfilePage.js";
import CheckoutForm from "./pages/userPages/checkOutPage.js";
import FreeReturnPage from "./pages/userPages/freeReturnPage.js";
import ReturnPage from "./pages/userPages/returnPage.js";

//-----------AdminPages-----------//
import AdminHomePage from "./pages/adminPages/adminHomePage.js";
import AdminProfilePage from "./pages/adminPages/adminProfilePage.js";
import AdminEventAttendancePage from "./pages/adminPages/adminEventAttendancePage.js";
import AdminAnalyticsPage from "./pages/adminPages/adminAnalyticsPage.js";
import { Toaster } from "react-hot-toast";

// Auth0
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import AdminCreateEvent from "./pages/adminPages/AdminCreateEvent.jsx";

const AdminRoutes = () => (
  <Routes>
    <Route path="/" element={<AdminHomePage />} />
    <Route path="attendance" element={<AdminEventAttendancePage />} />
    <Route path="edit" element={<AdminCreateEvent />} />
    <Route path="add" element={<AdminCreateEvent />} />
    <Route path="profile" element={<AdminProfilePage />} />
    <Route path="analytics" element={<AdminAnalyticsPage />} />
  </Routes>
);

const App = () => {
  const {
    loginWithRedirect,
    loginWithPopup,
    isAuthenticated,
    logout,
    isLoading,
    getAccessTokenSilently,
    user,
  } = useAuth0();

  return (
    <BrowserRouter>
      {isAuthenticated && <NavBar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        {!isAuthenticated ? (
          <Route path="/signin" element={<SignInPage />} /> // Show SignInPage if not authenticated
        ) : (
          <>
            <Route path="/profile" element={<MyProfilePage />} />
            <Route path="fav" element={<FavPage />} />
            <Route path="mybooking" element={<MyBookingPage />} />
            <Route path="checkout" element={<CheckoutForm />} />
            <Route path="free-return" element={<FreeReturnPage />} />
            <Route path="/return" element={<ReturnPage />} />
            <Route path="events/:eventId" element={<EventDetailPage />} />
            <Route path="admin/*" element={<AdminRoutes />} />
            <Route path="*" element={<ErrorPage />} />
          </>
        )}
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
};

// export default App;
