import React, { useState, useEffect, useRef } from "react";
import avatar from "../media/avatars"
import Burmenu from "../components/menu";
import Smile from "../media/Smile.png";
import Friend from "../components/friend";
import EmojiPicker from "emoji-picker-react";
import requstData from "../components/requestData";
import RequestFriendData from "../components/requestFriendData";
import RequstChat from "../components/requestChat";

export default function Home() {
  
  
  const [selected, setSelected] = useState(null);
  const [selected_friend, setSelected_friend] = useState({
    name: "",
    avatar: Number,
  });
  const [emojiVisibale, setemojiVisibale] = useState(false);
  const [textValue, settextValue] = useState("");
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("MyUser"))
  );
  const [userData,setUserData] = useState({})
  const [friends, setFriends] = useState([]);
  const emoji_ref = useRef(null);

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
  }

  function addemoji(e) {
    const emoji = e.emoji;
    settextValue((prevtextValue) => prevtextValue + emoji);
  }

  function handelTextChange(input) {
    settextValue(input.target.value);
  }

  function select(index) {
    setSelected(index);
    RequstChat(currentUser)
       .then((result) => { 
        console.log(result)
       })
       .catch((err)=>{
        console.log(err);
       })
    console.log(friends[index].email)
    setSelected_friend({
      name: friends[index].nickName,
      avatar: friends[index].avatar,
    });
  }

  useEffect(() => {
    
     requstData(currentUser)
       .then((result) => { 
          setUserData(result)
 RequestFriendData(result.friends)
   .then((data) => {
     setFriends(data);
   })
   .catch((error) => {
     console.error("Error fetching friend data:", error);
   });          
       })
       .catch((error) => {
         console.error("Error:", error);
       });
    const handleOutSideClick = (event) => {
      if (!emoji_ref.current?.contains(event.target)) {
        setemojiVisibale(false);
      }
    };

    window.addEventListener("mousedown", handleOutSideClick);

    return () => {
      window.removeEventListener("mousedown", handleOutSideClick);
    };
  }, [emoji_ref,currentUser]);

  
  return (
    <div>
      <div className="main-structure">
        <div className="main-divs friend_list">
          <div className="friend_list_div">
            {friends.map((friend, index) => (
              <Friend
                name={friend.nickName}
                avatar={avatar[friend.avatar]}
                selected={selected === index}
                select={() => select(index)}
                key={index}
              ></Friend>
            ))}
          </div>

          <div className="friend_list_profile">
            <div className="avatar">
              <img height={64} width={64} src={avatar[userData.avatar]} alt="" />
            </div>
            <p>{userData.nickName}</p>
          </div>

        </div>

        <div className="main-divs chat">

          <div className="chat_details">
            <div className="chat_details">
              <img height={48} width={48} src={avatar[selected_friend.avatar]} alt="" />
              <p>{selected_friend.name}</p>
            </div>
            <div className="menu">
              <Burmenu key={0}></Burmenu>
            </div> 
          </div>

          <div className="chat_space">
            {chating.map((message, index) => (
              <p key={index} className={message.class}>
                {message.message}
              </p>
            ))}
          </div>
          <div className="chat_typing">
            <div className="emoji" ref={emoji_ref}>
              <button className="emoji_btn" onClick={emojiBtnHandelr}>
                <img width={32} height={32} src={Smile} alt="" />
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
              {"⇛"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
