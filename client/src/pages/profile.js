import "../style/profile.css";
import "../style/App.css";
import React, { useEffect } from "react";
import avatar from "../media/avatars";
import { useState } from "react";
import { Link } from "react-router-dom";
import RequstData from "../components/Data/requestData";
import Loading from "../components/Loding/loding";



export default function Profile() {

  const [isLoading, setIsLoading] = useState(true);
  const [User, setUser] = useState(JSON.parse(localStorage.getItem("MyUser")));
  const [UserData,setUserData] = useState(null)

useEffect(() => {
  
  RequstData(User)
    .then((result) => {
      setUserData(result);
      
    })
    .catch((error) => {
      console.error("Error:", error);
    })
    .finally(()=>{
      setIsLoading(false)
    })

}, []);

 

  return (
    <div>
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
              <img
                height={64}
                width={64}
                src={`${avatar[UserData.avatar]}`}
                alt=""
              />
            </div>
            <div>nickName: {UserData.nickName}</div>
            <div>email: {UserData.email}</div>
            <div>ID: {UserData._id}</div>
          </div>
        )}
      </div>
    </div>
  );
}

