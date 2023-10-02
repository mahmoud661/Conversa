import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
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
          <Link href="nickName">profile</Link>
          <Link href="nickName" className="a_friend">
            Friends
          </Link>
          <Link href="nickName">Add Friend</Link>
          <Link href="nickName">change nickName</Link>
          <Link href="nickName">Log out</Link>
          {/* ... Navigation links ... */}
        </div>
      </div>
    </div>
  );
}
