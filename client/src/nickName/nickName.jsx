import React, { useState } from "react";
import avatar from "../media/avatars";
import "./nickname.css";

function avatarSelection() {
  
  async function selectavatar(email) {
    try {
      const response = await fetch("http://localhost:4000/chat", {
        method: "POST",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      });

      if (response.ok) {
        console.log("Email sent successfully");
      } else {
        console.error("Error sending email");
      }

      const data = await response.json();
      const array = data;
      return array;
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div>
      <div className="ava_main_main">
        <div className="ava_main">
          <p className="select_text">Select your nick name</p>
          <input type="text" className="nickName text_input" maxLength={15} />

          <a className="select_btn" href="/avatarSelection">
            Select
          </a>
        </div>
      </div>
    </div>
  );
}

export default avatarSelection;
