import { useState, useEffect } from "react";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Sign from "./pages/sign";
import Home from "./pages/Home";
import NickNameSelect from "./pages/nickName";
import AvatarSelection from "./avatarSelection/avatarSelect";
import AddFriend from "./pages/addFriend";
function RoutesComp() {
  const [user, setLoginUser] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("MyUser") === "undefined") {
      setLoginUser(null);
    } else {
      setLoginUser(JSON.parse(localStorage.getItem("MyUser")));
    }
  }, []);

  const updateUser = (user) => {
    localStorage.setItem("MyUser", JSON.stringify(user));
    setLoginUser(user);
  };

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            user && user != null ? <Home /> : <Login updateUser={updateUser} />
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
        <Route path="/login" element={<Login updateUser={updateUser} />} />
        <Route path="/sign" element={<Sign />} />
      </Routes>
    </div>
  );
}

export default RoutesComp;
