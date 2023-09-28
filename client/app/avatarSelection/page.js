'use client'
import React, { useState } from "react"
import '../globals.css'
import avatar from "../media/avatars"
import './avatar.css'

export default function avatarSelection (){

  const [selected_avatar,setSelected_avatar] = useState(avatar[0])

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
   
return (
  <div>
    <div className="ava_main_main">
      <div className="ava_main">
          <p className="select_text">Select your avatar</p>
        <div className="ava_slider">
          <button className="arrow_btn" onClick={handelLeftArrow}>{"<-"}</button>
          <img height={64} width={64} src={selected_avatar}/>
          <button className="arrow_btn" onClick={handelRightArrow}>{"->"}</button>
        </div> 
       <a className="select_btn" href="/">Select</a>
      </div>
    </div>
  </div>
);
    
}