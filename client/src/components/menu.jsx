import React, { useState, useEffect, useRef } from "react";
import './menu.css'


export default function Home() {
   

  const [menuVisible, setMenuVisible] = useState(false);
   const menu_ref = useRef(null);

      useEffect(() => {
    const handleOutSideClick = (event) => {
      if (!menu_ref.current?.contains(event.target)) {
        setMenuVisible(false);
      }
    };

    window.addEventListener("mousedown", handleOutSideClick);

    return () => {
      window.removeEventListener("mousedown", handleOutSideClick);
    };
  }, [menu_ref]);
  // Step 2: Function to toggle the menu visibility
  function toggleMenu() {
    setMenuVisible(!menuVisible);
  }

  // ... Existing code ...
  function clearData() {
    localStorage.setItem("MyUser", null);
  }
  return (
    <div>
      {/* ... Existing code ... */}
      <div className="menu" ref={menu_ref}>
        {/* Step 3: Add the burger menu button */}
        <button onClick={toggleMenu}>
          <div className="hamburger-lines">
            <span
              className={`line line1 ${menuVisible ? "rotate_1" : ""}`}
            ></span>
            <span className="line line2"></span>
            <span
              className={`line line1 ${menuVisible ? "rotate_2" : ""}`}
            ></span>
          </div>
        </button>
        {/* Step 4: Create the navigation menu */}
        <div className={`menu-items ${menuVisible ? "active" : ""}`}>
          <a href="nickName">profile</a>
          <a href="nickName" className="a_friend">
            Friends
          </a>
          <a href="/addFriend">Add Friend</a>
          <a href="/nickName">change nickName</a>
          <a href="avatarSelect">change avatar</a>
          <a onClick={clearData} href="/login">
            Log out
          </a>
          {/* ... Navigation links ... */}
        </div>
      </div>
    </div>
  );
}
