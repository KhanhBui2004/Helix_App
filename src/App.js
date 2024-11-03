import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import SignUp from "./components/SignUp/SignUp";
import LogIn from "./components/LogIn/LogIn";
import Home from "./components/Home/Home";
import Navbar from "./components/navbar/navbar";
import Profile from "./components/Profile/Profile";
import Search from "./components/Search/Search";

function Layout() {
  const currentLocation = useLocation();
  const isAuthPage =
    currentLocation.pathname === "/login" ||
    currentLocation.pathname === "/register";

  return (
    <div>
      {/* Nếu không phải trang login hoặc register thì chia cột */}
      {!isAuthPage ? (
        <div className="content">
          <div className="col-1">
            <Navbar />
          </div>
          <div className="col-11">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/search" element={<Search />} />
            </Routes>
          </div>
        </div>
      ) : (
        <>
          <Routes>
            <Route path="/login" element={<LogIn />} />
            <Route path="/register" element={<SignUp />} />
          </Routes>
        </>
      )}
    </div>
  );
}

function App() {
  return (
    <>
      <Router>
        <Layout />
      </Router>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
