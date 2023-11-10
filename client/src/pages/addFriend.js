import "../style/nickname.css";
import "../style/App.css";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import { Link } from "react-router-dom"; 
import AddButton from "../components/Buttons/ADDButton";
import {Alert} from "@mui/material";
export default function AddFriend() {

  const [error, setError] = useState(null);
  const [ID, setID] = useState("");
  const [result, setresult] = useState("");

  const navigate = useNavigate();
 
  const handleSubmit = async () => {
    try{
    const response = await fetch("http://localhost:4000/addfriend", {
      method: "POST",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: JSON.parse(localStorage.getItem("MyUser")).user,
        ID: ID,
      }),
    });

    const data = await response.json();
    setresult(data);
    if (response.ok) {
      console.log("Email sent successfully");
    } else {
      console.error("Error sending email");
    }}
    catch (error){
      console.error("An error occurred during the fetch:", error);
      setError("An error occurred. Please try again later.");
    }
  };

  if (result.msg === "Friend added and chat created") {
    navigate("/");
  }
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
          <p className="select_text">put your friend`s ID</p>
          <div>
            <TextField
              label="ID"
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
                sx: {
                  color: "#fff",
                },
              }}
              // helperText="Please enter a valid input"
              value={ID}
              onChange={(e) => {
                setID(e.target.value);
              }}
            />
          </div>
          <p className="resulte">{result.msg}</p>
          <div>
            <AddButton onClick={handleSubmit}></AddButton>
          </div>
        </div>
      </div>
    </div>
  );
}

