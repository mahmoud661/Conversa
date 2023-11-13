import React, { useState } from "react"
import avatar from "../media/avatars"
import './avatar.css'
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Alert } from "@mui/material";

export default function AvatarSelection (){

  const [error, setError] = useState(null);
  const [selected_avatar,setSelected_avatar] = useState(avatar[0])
  const navigate = useNavigate();

   function handelRightArrow(){
    
    if (avatar[avatar.length-1] === selected_avatar ) {
      setSelected_avatar(avatar[0])
    }
    else{
    setSelected_avatar(avatar[avatar.indexOf(selected_avatar)+1])
  }
   }
   function handelLeftArrow(){
    
    if (avatar[0] === selected_avatar ) {
      setSelected_avatar(avatar[avatar.length-1])
    }
    else{
    setSelected_avatar(avatar[avatar.indexOf(selected_avatar)-1])
  }
   }
   
     const handleSubmit = async () => {
      try{
       const response = await fetch("http://localhost:4000/avatarselect", {
         method: "POST",
         cache: "no-cache",
         credentials: "same-origin",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify({
           email: JSON.parse(localStorage.getItem("MyUser")).user,
           avatar: avatar.indexOf(selected_avatar),
         }),
       });

       if (response.ok) {
         console.log("Email sent successfully");
         navigate("/");
       } else {
          setError("An error occurred. Please try again later.");
         console.error("Error sending email");
       }}
       catch(err){
        console.error("An error occurred during the fetch:", error);
        setError("An error occurred. Please try again later.");
       }

       
     };
return (
  <div>
    {error ? (
      <div className="error">
        <Alert
          severity="error"
          onClose={() => {
            setError(null);
          }}
          style={{ backgroundColor: "#10060D", color: "white" }}
        >
          {error}
        </Alert>
      </div>
    ) : null}
    <Link to="/">
      {" "}
      {/* Add a Link component */}
      <button className="back-button">Go Back</button>
    </Link>
    <div className="ava_main_main">
      <div className="ava_main">
        <p className="select_text">Select your avatar</p>
        <div className="ava_slider">
          <button className="arrow_btn" onClick={handelLeftArrow}>
            {"←"}
          </button>
          <img height={64} width={64} src={selected_avatar} alt="avatar" />
          <button className="arrow_btn" onClick={handelRightArrow}>
            {"→"}
          </button>
        </div>
        <button className="select_btn" onClick={handleSubmit}>
          Select
        </button>
      </div>
    </div>
  </div>
);
    
}
