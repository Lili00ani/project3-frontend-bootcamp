//-----------Libraries-----------//
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//-----------Components-----------//
import NavBar from "./components/navbar.js";

//-----------Styling-----------//
import "./index.css";

//-----------Pages-----------//
import RegisterPage from "./pages/registerPage.js";
import SignInPage from "./pages/signInPage.js";
import ResetPasswordPage from "./pages/resetPasswordPage.js";
import ErrorPage from "./pages/errorPage.js";

//-----------UserPages-----------//
import HomePage from "./pages/userPages/homePage.js";
import EventDetailPage from "./pages/userPages/eventDetailPage.js";
import FavPage from "./pages/userPages/favPage.js";
import MyBookingPage from "./pages/userPages/myBookingPage.js";
import MyProfilePage from "./pages/userPages/myProfilePage.js";

//-----------AdminPages-----------//
import AdminHomePage from "./pages/adminPages/adminHomePage.js";
import AdminProfilePage from "./pages/adminPages/adminProfilePage.js";
import AdminEventPage from "./pages/adminPages/adminEventPage.js";
import AdminEventAttendancePage from "./pages/adminPages/adminEventAttendancePage.js";
import AdminAnalyticsPage from "./pages/adminPages/adminAnalyticsPage.js";

const AdminRoutes = () => (
  <Routes>
    <Route path="/" element={<AdminHomePage />} />
    <Route path="attendance" element={<AdminEventAttendancePage />} />
    <Route path="edit" element={<AdminEventPage />} />
    <Route path="add" element={<AdminEventPage />} />
    <Route path="profile" element={<AdminProfilePage />} />
    <Route path="analytics" element={<AdminAnalyticsPage />} />
  </Routes>
);

const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="reset-password" element={<ResetPasswordPage />} />
        <Route path="signin" element={<SignInPage />} />
        <Route path="fav" element={<FavPage />} />
        <Route path="mybooking" element={<MyBookingPage />} />
        <Route path="profile" element={<MyProfilePage />} />
        <Route path="event" element={<EventDetailPage />} />
        <Route path="admin/*" element={<AdminRoutes />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;