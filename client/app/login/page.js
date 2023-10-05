"use client"
import './form.css'
import React,{useState} from 'react';
import { redirect } from "next/navigation";



export default function login (){



const [email, setEmail] = useState("");
const [password,setpassword] = useState("")
const [result, setresult] =useState("")
const [showPassword, setShowPassword] = useState(false); // Track whether to show or hide the password

const togglePasswordVisibility = () => {
  setShowPassword(!showPassword); // Toggle the showPassword state
};

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch("http://localhost:4000/login", {
      method: "POST",
      cache: "no-cache",
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
    const data = await response.json();
    setresult(data)
  } 
  
  catch (error) {
    console.error("Error:", error);
  }
};

 if (result === "approve")
  redirect("/"); 

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
                <label>Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder=""
                  onChange={(e) => setpassword(e.target.value)}
                />
                <div className="show-password-checkbox">
                  <label className="show_password_label">Show Password</label>
                  <input
                    type="checkbox"
                    id="show_hide_checkbox"
                    checked={showPassword}
                    onChange={togglePasswordVisibility}
                  />
                </div>
                <div className="forgot">
                  <a href="#">Forgot Password ?</a>
                </div>
                
                <div className='resulte'>{result}</div>
              </div>

              <button className="sign" onClick={handleSubmit}>
                Login
              </button>
            </form>
            <div className="social-message"></div>
            <p className="signup">
              Don't have an account?
              <a href="/sign" className="">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    );}