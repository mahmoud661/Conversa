"use client";
<<<<<<< HEAD
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import man from "./media/1.png";
=======
import React, { useState, useEffect, useRef } from "react";
import man from "./media/1.png";
import Bur_menu from "./components/menu";
>>>>>>> bdedb2bedf3b0b50f779f8cf7dab3de02e94541e
import Smile from "./media/Smile.png";
import Friend from "./components/friend";
import dynamic from "next/dynamic";

const EmojiPicker = dynamic(
  () => {
    return import("emoji-picker-react");
  },
  { ssr: false }
);

export default function Home() {
<<<<<<< HEAD

=======
>>>>>>> bdedb2bedf3b0b50f779f8cf7dab3de02e94541e
  let friends = ["mahmoud", "ahmad", "abd"];
  const [selected, setSelected] = useState(null);
  const [selected_friend, setSelected_friend] = useState({
    name: "",
    avatar: "",
  });
  const [emojiVisibale, setemojiVisibale] = useState(false);
  const [textValue, settextValue] = useState("");

  const emoji_ref = useRef(null);

<<<<<<< HEAD

 const [chating, setchating] = useState([
   {
     message: "",
     class: "",
   },
 ]);


  const addmessage = (message) =>{

setchating((prech) => [...prech, message]);
settextValue("")
  }


  function emojiBtnHandelr() {
  setemojiVisibale(!emojiVisibale);
=======
  const [chating, setchating] = useState([
    {
      message: "",
      class: "",
    },
  ]);

  const addmessage = (message) => {
    if (textValue.trim() !== "") {
      setchating((prech) => [...prech, message]);
      settextValue("");
    }
  };

  function emojiBtnHandelr() {
    setemojiVisibale(!emojiVisibale);
>>>>>>> bdedb2bedf3b0b50f779f8cf7dab3de02e94541e
  }

  function addemoji(e) {
    const emoji = e.emoji;
    settextValue((prevtextValue) => prevtextValue + e.emoji);
  }
<<<<<<< HEAD
  
=======

>>>>>>> bdedb2bedf3b0b50f779f8cf7dab3de02e94541e
  function handelTextChange(input) {
    settextValue(input.target.value);
  }

  function select(index) {
    setSelected(index);
    setSelected_friend({
      name: friends[index],
      avatar: "man.src",
    });
  }

  useEffect(() => {
    const handleOutSideClick = (event) => {
      if (!emoji_ref.current?.contains(event.target)) {
        setemojiVisibale(false);
      }
    };

    window.addEventListener("mousedown", handleOutSideClick);

    return () => {
      window.removeEventListener("mousedown", handleOutSideClick);
    };
  }, [emoji_ref]);

  return (
    <div>
      <div className="main-structure">
        <div className="main-divs friend_list">
          <div className="friend_list_div">
            {friends.map((friend, index) => (
              <Friend
                name={friend}
                avatar={man.src}
                selected={selected === index}
                select={() => select(index)}
                key={index}
              ></Friend>
            ))}
          </div>

          <div className="friend_list_profile">
            <div className="avatar">
              <img height={64} width={64} src={man.src} />
            </div>
            <p>Mahmoud Hassan</p>
          </div>
        </div>

        <div className="main-divs chat">
          <div className="chat_details">
<<<<<<< HEAD
            <img height={48} width={48} src={man.src} />
            <p>{selected_friend.name}</p>
=======
            <div className="chat_details">
              <img height={48} width={48} src={man.src} />
              <p>{selected_friend.name}</p>
            </div>
            <div className="menu">
              <Bur_menu key={0}></Bur_menu>
            </div>
>>>>>>> bdedb2bedf3b0b50f779f8cf7dab3de02e94541e
          </div>

          <div className="chat_space">
            {chating.map((message, index) => (
<<<<<<< HEAD
              <p className={message.class}>{message.message}</p>
=======
              <p key={index} className={message.class}>{message.message}</p>
>>>>>>> bdedb2bedf3b0b50f779f8cf7dab3de02e94541e
            ))}
          </div>
          <div className="chat_typing">
            <div className="emoji" ref={emoji_ref}>
              <button className="emoji_btn" onClick={emojiBtnHandelr}>
                <img width={32} height={32} src={Smile.src} />
              </button>
              <div className={`emoji_div ${emojiVisibale ? "show" : "hidden"}`}>
                <EmojiPicker
                  width={250}
                  height={350}
                  onEmojiClick={addemoji}
                  theme="dark"
                />
              </div>
            </div>
            <input
              className="text_input balck"
              type="text"
              onChange={handelTextChange}
              value={textValue}
            />
            <button
              className="go_btn"
              onClick={() =>
                addmessage({
                  message: textValue,
                  class: "user_message",
                })
              }
            >
              {"->"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
