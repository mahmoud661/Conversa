import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import './menu.css'
// ... Other imports ...



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
              <span className="line line1"></span>
              <span className="line line2"></span>
              <span className="line line3"></span>
            </div>
          </button>
          {/* Step 4: Create the navigation menu */}
          <div className={`menu-items ${menuVisible ? "active" : ""}`}>
          <a href="nickName">change nickName</a>
            {/* ... Navigation links ... */}
          </div>
        </div>
      </div>
   
  );
}
