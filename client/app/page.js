"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import man from "./media/man.png";
import Smile from "./media/Smile.png";
import EmojiPicker from "emoji-picker-react";
import Friend from "./components/friend";

export default function Home() {

  let friends = ["mahmoud", "ahmad", "abd"];
  const [selected, setSelected] = useState(null);
  const [selected_friend, setSelected_friend] = useState({
    name: "",
    avatar: "",
  });
  const [emojiVisibale, setemojiVisibale] = useState(false);
  const [textValue, settextValue] = useState("");

  const emoji_ref = useRef(null);

  function emojiBtnHandelr() {
    setemojiVisibale(!emojiVisibale);
  }

  function addemoji(e) {
    const emoji = e.emoji;
    settextValue((prevtextValue) => prevtextValue + e.emoji);
  }
  
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
            <img height={48} width={48} src={man.src} />
            <p>{selected_friend.name}</p>
          </div>

          <div className="chat_space">
            <p className="friend_message">friend</p>
            <p className="user_message">user</p>
            <p className="user_message">user</p>
            <p className="friend_message">friend</p>
            <p className="user_message">usdsfkndflsdner</p>
            <p className="friend_message">frkdsnfsiend</p>
            <p className="user_message">user</p>
            <p className="friend_message">friend</p>
            <p className="friend_message">frieksfnkdsfnd</p>
            <p className="friend_message">friend</p>
          </div>
          <div className="chat_typing">
            <div className="emoji">
              <button className="emoji_btn" onClick={emojiBtnHandelr}>
                <img width={32} height={32} src={Smile.src} />
              </button>
              <div
                className={`emoji_div ${emojiVisibale ? "show" : "hidden"}`}
                ref={emoji_ref}
              >
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
            <button className="go_btn">{"->"}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
