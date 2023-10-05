'use client'
import React, { useState } from "react"
import '../globals.css'
import avatar from "../media/avatars"
import './nickname.css'

export default function avatarSelection (){

const [nickName,setnickName] = useState("")
   
return (
  <div>
    <div className="ava_main_main">
      <div className="ava_main">
      <p className="select_text">Select your nick name</p>
          <input type="text" className="nickName text_input" maxLength={15} onChange={(e)=>{
              setnickName(e.target.value)
          }}/>
        
       <a className="select_btn" href="/avatarSelection">Select</a>
      </div>
    </div>
  </div>
);
    
}