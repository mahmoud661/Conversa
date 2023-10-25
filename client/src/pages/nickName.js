import "../nickName/nickname.css";
import "../App.css";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NickNameSelect() {
  const [nickName, setNickName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const response = await fetch("http://localhost:4000/nickName", {
      method: "POST",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: JSON.parse(localStorage.getItem("MyUser")),
        nickName: nickName,
      }),
    });

    if (response.ok) {
      console.log("Email sent successfully");
    } else {
      console.error("Error sending email");
    }

    navigate("/");
  };

  return (
    <div>
      <div className="ava_main_main">
        <div className="ava_main">
          <p className="select_text">Select your nick name</p>
          <input
            type="text"
            className="nickName text_input"
            maxLength={15}
            value={nickName}
            onChange={(e) => {
              setNickName(e.target.value);
            }}
          />

          <button className="select_btn" onClick={handleSubmit}>
            Select
          </button>
        </div>
      </div>
    </div>
  );
}
/* <div className="forgot">
  <a href="/">Forgot Password ?</a>
</div>; */
