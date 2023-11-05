import { useState, useEffect } from "react";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Sign from "./pages/sign";
import Home from "./pages/Home";
import NickNameSelect from "./pages/nickName";
import AvatarSelection from "./avatarSelection/avatarSelect";
import AddFriend from "./pages/addFriend";
import Loading from "./components/Loding/loding";
import Profile from "./pages/profile";
import "./style/App.css";

function RoutesComp() {
  const [user, setLoginUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("MyUser") === "undefined") {
      setLoginUser(null);
    } else {
      setLoginUser(JSON.parse(localStorage.getItem("MyUser")));
    }
    setTimeout(() => {
      setIsLoading(false); // Set isLoading to false when data is loaded
    }, 2000); // Adjust the timeout as needed
  }, []);

  const updateUser = (user) => {
    localStorage.setItem("MyUser", JSON.stringify(user));
    setLoginUser(user);
  };

  return (
    <div>
      {isLoading ? (
        <div className="page_loading">
          <Loading />
        </div> // Show loading screen while data is loading
      ) : (
        <Routes>
          <Route
            path="/"
            element={
              user && user != null ? (
                <Home />
              ) : (
                <Login updateUser={updateUser} />
              )
            }
          />
          <Route
            path="/nickName"
            element={
              user && user != null ? (
                <NickNameSelect />
              ) : (
                <Login updateUser={updateUser} />
              )
            }
          />
          <Route
            path="/avatarSelect"
            element={
              user && user != null ? (
                <AvatarSelection />
              ) : (
                <Login updateUser={updateUser} />
              )
            }
          />
          <Route
            path="/addFriend"
            element={
              user && user != null ? (
                <AddFriend />
              ) : (
                <Login updateUser={updateUser} />
              )
            }
          />
          <Route
            path="/profile"
            element={
              user && user != null ? (
                <Profile />
              ) : (
                <Login updateUser={updateUser} />
              )
            }
          />
          <Route path="/login" element={<Login updateUser={updateUser} />} />
          <Route path="/sign" element={<Sign />} />
        </Routes>
      )}
    </div>
  );
}

export default RoutesComp;
