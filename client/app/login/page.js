"use client"
import './form.css'
import React,{useState} from 'react';
export default function login (){

const [email, setEmail] = useState("");


console.log(email)

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch("http://localhost:4000/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    if (response.ok) {
      console.log("Email sent successfully");
    } else {
      console.error("Error sending email");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
    return (
      <div>
        <div className="Box">
          <div className="form-container">
            <p className="logintitle">Login</p>
            <form className="form">
              <div className="input-group">
                <label>Username</label>
                <input
                  type="email"
                  id="username"
                  placeholder=""
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <label >Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder=""
                />
                <div className="forgot">
                  <a href="#">
                    Forgot Password ?
                  </a>
                </div>
              </div>
              <button className="sign" onClick={handleSubmit}>
                Login
              </button>
            </form>
            <div className="social-message">
              <div className="line"></div>
              <p className="message">Login with social accounts</p>
              <div className="line"></div>
            </div>
            <p className="signup">
              Don't have an account?
              <a  href="/sign" className="">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    );}