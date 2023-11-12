import "../style/profile.css";
import "../style/App.css";
import React, { useEffect } from "react";
import avatar from "../media/avatars";
import { useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../components/Loding/loding";
import { Alert } from "@mui/material";

export default function Profile() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [User, setUser] = useState(
    JSON.parse(localStorage.getItem("MyUser")).user
  );
  const [UserData, setUserData] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch("https://conversa-backend-up11.onrender.com/usersData", {
          method: "POST",
          cache: "no-cache",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: User,
          }),
        });

        if (response.ok) {
          console.log("Email sent successfully");
          setIsLoading(false);
          const data = await response.json();
          setUserData(data);
        } else {
          console.error("Error sending email");
          setError("An error occurred. Please try again later.");
        }
      } catch (error) {
        setError("An error occurred. Please try again later.");
        console.error("Error:", error);
        setTimeout(() => {
          setIsLoading(false);
        }, 5000);
      }
    };

    getUser();
  }, );

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
      <div className="pro_main_main">
        <Link to="/">
          {/* Add a Link component */}
          <button className="back-button">Go Back</button>
        </Link>
        {isLoading ? (
          <Loading />
        ) : (
          <div className="pro_main">
            <div>
              {UserData !== null ? (
                <img
                  height={64}
                  width={64}
                  src={avatar[UserData.avatar]}
                  alt=""
                />
              ) : (
                <p className="resulte">No avatar available</p>
              )}
            </div>
            <div>
              nickName:{" "}
              {UserData !== null ? (
                UserData.nickName
              ) : (
                <p className="resulte">No nickName available</p>
              )}
            </div>
            <div>
              email:{" "}
              {UserData !== null ? (
                UserData.email
              ) : (
                <p className="resulte">No email available</p>
              )}
            </div>
            <div>
              ID:{" "}
              {UserData !== null ? (
                UserData._id
              ) : (
                <p className="resulte">No ID available</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
