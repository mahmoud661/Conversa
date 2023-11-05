import "../style/form.css";
import React from "react";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Login({ updateUser }) {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [result, setresult] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Track whether to show or hide the password
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle the showPassword state
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        cache: "no-cache",
        credentials: "same-origin",
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
      setresult(data);
      
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (result.msg === "approve") {
    updateUser(result.email);
    navigate("/");
    return <Navigate to={"/"} />;
  }
  return (
    <div>
      <div className="Box">
        <div className="form-container">
          <p className="logintitle">Login</p>
          <div className="form">
            <div className="input-group">
              <label>Username</label>
              <input
                type="email"
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
                onChange={(e) => setpassword(e.target.value)}
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
        
            <div className="forgot">
              <a href="/">Forgot Password ?</a>
            </div>
            
            <div className="resulte">{result.msg}</div>
            <button className="sign" onClick={handleSubmit}>
              Login
            </button>
          </div>
          <div className="social-message"></div>
          <p className="signup">
            You don`t have  account?
            <a href="/sign" className="">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
/* <div className="forgot">
  <a href="/">Forgot Password ?</a>
</div>; */