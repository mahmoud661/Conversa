import "../nickName/nickname.css";
import "../App.css";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddFriend() {

  const [ID, setID] = useState("");
  const [result,setresult] = useState("")

  const navigate = useNavigate();

  const handleSubmit = async () => {
    const response = await fetch("http://localhost:4000/addfriend", {
      method: "POST",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: JSON.parse(localStorage.getItem("MyUser")),
        ID: ID,
      }),
    });

    const data = await response.json();
    setresult(data)
    if (response.ok) {
      console.log("Email sent successfully");
    } else {
      console.error("Error sending email");
    }

  };

   if (result.msg === "Friend added and chat created") {
     navigate("/");
   }
  return (
    <div>
      <div className="ava_main_main">
        <div className="ava_main">
          <p className="select_text">put your friend`s ID</p>
          <input
            type="text"
            className="nickName text_input"
            value={ID}
            onChange={(e) => {
              setID(e.target.value);
            }}
          />
          <p className="resulte">{result.msg}</p>
          <button className="select_btn" onClick={handleSubmit}>
            ADD
          </button>
        </div>
      </div>
    </div>
  );
}
/* <div className="forgot">
  <a href="/">Forgot Password ?</a>
</div>; */
