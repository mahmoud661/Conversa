import React from "react"
import '../globals.css'
import avatar from "../media/avatars"
import './avatar.css'

export default function avatarSelection (){

return (
  <div>
    <div className="ava_main_main">
      <div className="ava_main">
        <div className="ava_slider">
          <button className="arrow_btn">{"<"}</button>
          <img height={64} width={64} src={avatar[0]}/>
          <button className="arrow_btn">{">"}</button>
        </div> 
        h
      </div>
    </div>
  </div>
);
    
}