import React, { useState, useEffect, useRef } from "react";
import avatar from "../media/avatars";
import Burmenu from "../components/menu";
import Smile from "../media/Smile.png";
import Friend from "../components/friend";
import EmojiPicker from "emoji-picker-react";
import requstData from "../components/requestData";
import RequestFriendData from "../components/requestFriendData";
import RequstChat from "../components/requestChat";
import ScrollableFeed from "react-scrollable-feed";
import Sendmessage from "../components/sendmessage";
import io, { Socket } from "socket.io-client";

export default function Home() {
  const [selected, setSelected] = useState(null);
  const [selected_friend, setSelected_friend] = useState({
    name: String,
    email: String,
    avatar: Number,
  });
  const [emojiVisibale, setemojiVisibale] = useState(false);
  const [textValue, settextValue] = useState("");
const [currentUser, setCurrentUser] = useState(
  JSON.parse(localStorage.getItem("MyUser"))
);  const [userData, setUserData] = useState({});
  const [friends, setFriends] = useState([]);
  const emoji_ref = useRef(null);
  const [socket, setSocket] = useState(io("http://localhost:4000/"));
  const [socketConnected, setSocketConnected] = useState(false);
  const [chating, setChating] = useState([]);
  const [chatID,setChatId] = useState('')


  useEffect(() => {
    // Initialize the socket when the component mounts
    socket.emit("setup", currentUser);
    socket.on("connected", () => {
      console.log("Connected");

      setSocketConnected(true);
    });



    return () => {
      // Disconnect the socket when the component unmounts
      if (socket) {
        console.log("Disconnected");
        socket.disconnect();
      }
    };
  },[currentUser,socket]);

useEffect(()=>{
  function recivemessage  (message){
      console.log("Received message:", message);
      setChating((prevMessages) => [...prevMessages, message]);
       

    }
    socket.on("newMessage",recivemessage );
},[socket])

  const addmessage = (message) => {
    if (textValue.trim() !== "") {
      // Send the message using the existing socket
      socket.emit("sendMessage", {
        yourEmail: currentUser,
        friendEmail: selected_friend.email,
        message: {
          content: textValue,
          sender: currentUser,
        },
        chatId:chatID
      });

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

    setSelected_friend({
      name: friends[index].nickName,
      email: friends[index].email,
      avatar: friends[index].avatar,
    });
  }

  useEffect(() => {

    RequstChat(currentUser, selected_friend.email)
      .then((result) => {
        setChating(result.messages);
        setChatId(result._id)
        socket.emit("join chat", result._id);
      })
      .catch((err) => {
        console.log(err);
      });

    requstData(currentUser)
      .then((result) => {
        setUserData(result);
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
  }, [emoji_ref, currentUser, selected_friend, socket, socketConnected]);

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
              <img
                height={64}
                width={64}
                src={avatar[userData.avatar]}
                alt=""
              />
            </div>
            <p>{userData.nickName}</p>
          </div>
        </div>

        <div className="main-divs chat">
          <div className="chat_details">
            <div className="chat_details">
              <img
                height={48}
                width={48}
                src={avatar[selected_friend.avatar]}
                alt=""
              />
              <p>{selected_friend.name}</p>
            </div>
            <div className="menu">
              <Burmenu key={0}></Burmenu>
            </div>
          </div>

          <div className="chat_space">
            <ScrollableFeed className="chat_scroll">
              {chating.map((message, index) => (
                <p
                  key={index}
                  className={
                    message.sender === currentUser
                      ? "user_message"
                      : "friend_message"
                  }
                >
                  {message.content}
                </p>
              ))}
            </ScrollableFeed>
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
                  content: textValue,
                  sender: currentUser,
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
