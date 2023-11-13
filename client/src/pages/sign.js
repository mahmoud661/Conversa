import "../style/form.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Sign() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpass,setConfirmpass] = useState("")
  const [showPassword, setShowPassword] = useState(false); // Track whether to show or hide the password
  const [result, setresult] = useState("");
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle the showPassword state
  };

  const handleSubmit = async (e) => {

    const trimmedPassword = password.trim();

    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

    if (!email.match(emailRegex)) {
      setresult("Invalid email format");
      setEmail("");
      return;
    }
    if (trimmedPassword !== confirmpass) {
      setresult("Passwords do not match");
      setPassword("");
      setConfirmpass("");
    } else if (trimmedPassword === "") {
      setresult("Password is empty");
      setPassword("");
      setConfirmpass("");
    } else if (trimmedPassword.includes(" ")) {
      setresult("Password should not contain spaces");
      setPassword("");
      setConfirmpass("");
    } else {
      e.preventDefault();
      try {
        const response = await fetch("http://localhost:4000sign", {
          cache: "no-cache",
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

        const data = await response.json();
        setresult(data);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };



  
   if (result === "approve")
    navigate("/login")


     return (
       <div>
         <div className="Box">
           <div className="form-container">
             <p className="logintitle">Sign up</p>
             <div className="form">
               <div className="input-group">
                 <label>Username</label>
                 <input
                   type="email"
                   id="username"
                   placeholder=""
                   value={email}
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
                   value={confirmpass}
                   onChange={(e) => setConfirmpass(e.target.value)}
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
               <div className="resulte">{result}</div>

               <button className="sign" onClick={handleSubmit}>
                 Sign up
               </button>
             </div>
             <div className="social-message"></div>
             <p className="signup">
               You already have an account?
               <a href="/login" className="">
                 Login
               </a>
             </p>
           </div>
         </div>
       </div>
     );
}
