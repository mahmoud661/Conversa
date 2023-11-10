import "../style/nickname.css";
import "../style/App.css";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { TextField } from "@mui/material";
import SelectButton from "../components/Buttons/selectButton";

import {Alert} from "@mui/material";

export default function NickNameSelect() {

  const [error, setError] = useState(null);
  const [nickName, setNickName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {

    const trimmedNickName = nickName.trim();
     if (trimmedNickName === "") {
      setError("NickName is empty");
      
    } else if (trimmedNickName.includes(" ")) {
      setError("NickName should not contain spaces");
     
    } else {
     try {
       const response = await fetch("http://localhost:4000/nickName", {
         method: "POST",
         cache: "no-cache",
         credentials: "same-origin",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify({
           email: JSON.parse(localStorage.getItem("MyUser")).user,
           nickName: nickName,
         }),
       });

       if (response.ok) {
         console.log("Nickname updated successfully");
         navigate("/");
       } else {
         console.error("Error updating nickname");
         setError("Failed to add friend");
       }
     } catch (error) {
       console.error("An error occurred during the fetch:", error);
       setError("An error occurred. Please try again later.");
     }}
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
      <div className="ava_main_main">
        <Link to="/">
          {" "}
          {/* Add a Link component */}
          <button className="back-button">Go Back</button>
        </Link>
        <div className="ava_main">
          <p className="select_text">Enter your NickName</p>
          <div>
            <TextField
              label="NickName"
              id="standard-basic"
              variant="standard"
              sx={{
                width: "80%",
              }}
              InputLabelProps={{
                sx: {
                  color: "#fff",
                  textTransform: "capitalize",
                },
              }}
              inputProps={{
                maxLength: 14,
                sx: {
                  color: "#fff",
                },
              }}
              // helperText="Please enter a valid input"
              value={nickName}
              onChange={(e) => {
                setNickName(e.target.value);
              }}
            />
          </div>
          <div>
            <SelectButton onClick={handleSubmit}></SelectButton>
          </div>
        </div>
      </div>
    </div>
  );
}
/* <div className="forgot">
  <a href="/">Forgot Password ?</a>
</div>; */
