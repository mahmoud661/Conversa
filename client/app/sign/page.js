"use client";
import "./from.css";
import React, { useState } from "react";
import { redirect } from "next/navigation";

export default function sign() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Track whether to show or hide the password
  const [result, setresult] = useState("");


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle the showPassword state
  };

 const handleSubmit = async (e) => {
   e.preventDefault();
   try {
     const response = await fetch("http://localhost:4000/send-email", {
      cache:"no-cache",
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify({
         email: email,
         password: password,
       }),
     });

     if (response.ok) {
       console.log("Email sent successfully");
     } else {
       console.error("Error sending email");
     }

     
     const data = await response.text();
     setresult(data);


   } catch (error) {
     console.error("Error:", error);
   }
 };
  
    if (result === "approve") 
      redirect("/"); // Redirect to the home page if result is "approve"

  return (
    <div>
      <div className="Box">
        <div className="form-container">
          <p className="logintitle">Sign up</p>
          <form className="form">
            <div className="input-group">
              <label>Username</label>
              <input
                type="text"
                id="username"
                placeholder=""
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label>Password</label>
              <input
                type={showPassword ? "text" : "password"} // Toggle between text and password
                id="password"
                placeholder=""
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label>Confirm Password</label>
              <input
                type={showPassword ? "text" : "password"} // Toggle between text and password
                id="confirm-password"
                placeholder=""
              />
            </div>
            <div className="show-password-checkbox">
              <label className="show_password_label">Show Password</label>
              <input
                type="checkbox"
                id="show_hide_checkbox"
                checked={showPassword}
                onChange={togglePasswordVisibility}
              />
            </div>
            <div>{result}</div>
            <button className="sign" onClick={handleSubmit}>
              Sign up
            </button>
          </form>
          <div className="social-message"></div>
        </div>
      </div>
    </div>
  );
}
