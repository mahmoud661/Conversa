import React, { useState, useEffect, useRef } from "react";
import avatar from "../media/avatars";
import Menu from "../components/menu/menu";
import Friend from "../components/friendhandler/friend";
import EmojiPicker from "emoji-picker-react";
import requstData from "../components/Data/requestData";
import RequestFriendData from "../components/Data/requestFriendData";
import RequstChat from "../components/Data/requestChat";
import ScrollableFeed from "react-scrollable-feed";
import io from "socket.io-client";
import SendButton from "../components/Buttons/send button";
import Wellcome from "../components/wellcome";
import Loading from "../components/Loding/loding";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [selected, setSelected] = useState(null);
  const [selected_friend, setSelected_friend] = useState({
    name: String,
    email: String,
    avatar: Number,
  });
  const [emojiVisibale, setemojiVisibale] = useState(false);
  const [textValue, settextValue] = useState("");
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("MyUser")).user
  );
  const [userData, setUserData] = useState({});
  const [friends, setFriends] = useState([]);
  const emoji_ref = useRef(null);
  const [socket, setSocket] = useState(io("http://localhost:4000/"));
  const [socketConnected, setSocketConnected] = useState(false);
  const [chating, setChating] = useState([]);
  const [chatID, setChatId] = useState("");
  const [isReversed, setIsReversed] = useState(false);

  const reverseStyle = () => {
    setIsReversed(!isReversed);
  };

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
  }, [currentUser, socket]);

  useEffect(() => {
    function recivemessage(message) {
      console.log("Received message:", message);
      setChating((prevMessages) => [...prevMessages, message]);
    }
    socket.on("newMessage", recivemessage);
  }, [socket]);

  function formatMessageDate(timestamp) {
    const date = new Date(timestamp);
    const options = {
      hour: "numeric",
      minute: "numeric",
      month: "short",
      day: "numeric",
    };
    return date.toLocaleString(undefined, options);
  }

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
        chatId: chatID,
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
        setIsLoading(true);
        setChating(result.messages);
        setChatId(result._id);
        socket.emit("join chat", result._id);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
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
        <div
          className={`main-divs friend_list ${
            !isReversed ? "hidden_phones" : "shown"
          }`}
        >
          <div className="conversa">
            <p>Conversa</p>
            <a href="/addFriend" className="add_btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="currentColor"
                class="bi bi-plus-square-dotted"
                viewBox="0 0 16 16"
              >
                <path d="M2.5 0c-.166 0-.33.016-.487.048l.194.98A1.51 1.51 0 0 1 2.5 1h.458V0H2.5zm2.292 0h-.917v1h.917V0zm1.833 0h-.917v1h.917V0zm1.833 0h-.916v1h.916V0zm1.834 0h-.917v1h.917V0zm1.833 0h-.917v1h.917V0zM13.5 0h-.458v1h.458c.1 0 .199.01.293.029l.194-.981A2.51 2.51 0 0 0 13.5 0zm2.079 1.11a2.511 2.511 0 0 0-.69-.689l-.556.831c.164.11.305.251.415.415l.83-.556zM1.11.421a2.511 2.511 0 0 0-.689.69l.831.556c.11-.164.251-.305.415-.415L1.11.422zM16 2.5c0-.166-.016-.33-.048-.487l-.98.194c.018.094.028.192.028.293v.458h1V2.5zM.048 2.013A2.51 2.51 0 0 0 0 2.5v.458h1V2.5c0-.1.01-.199.029-.293l-.981-.194zM0 3.875v.917h1v-.917H0zm16 .917v-.917h-1v.917h1zM0 5.708v.917h1v-.917H0zm16 .917v-.917h-1v.917h1zM0 7.542v.916h1v-.916H0zm15 .916h1v-.916h-1v.916zM0 9.375v.917h1v-.917H0zm16 .917v-.917h-1v.917h1zm-16 .916v.917h1v-.917H0zm16 .917v-.917h-1v.917h1zm-16 .917v.458c0 .166.016.33.048.487l.98-.194A1.51 1.51 0 0 1 1 13.5v-.458H0zm16 .458v-.458h-1v.458c0 .1-.01.199-.029.293l.981.194c.032-.158.048-.32.048-.487zM.421 14.89c.183.272.417.506.69.689l.556-.831a1.51 1.51 0 0 1-.415-.415l-.83.556zm14.469.689c.272-.183.506-.417.689-.69l-.831-.556c-.11.164-.251.305-.415.415l.556.83zm-12.877.373c.158.032.32.048.487.048h.458v-1H2.5c-.1 0-.199-.01-.293-.029l-.194.981zM13.5 16c.166 0 .33-.016.487-.048l-.194-.98A1.51 1.51 0 0 1 13.5 15h-.458v1h.458zm-9.625 0h.917v-1h-.917v1zm1.833 0h.917v-1h-.917v1zm1.834-1v1h.916v-1h-.916zm1.833 1h.917v-1h-.917v1zm1.833 0h.917v-1h-.917v1zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
              </svg>
            </a>
            <div className="burmenu">
              <Menu onClick={reverseStyle} key={0}></Menu>
            </div>
          </div>
          <div className="friend_list_div">
            {friends.map((friend, index) => (
              <Friend
                name={friend.nickName}
                avatar={avatar[friend.avatar]}
                selected={selected === index}
                select={() => {
                  select(index);
                  reverseStyle();
                }}
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
        {selected === null ? (
          <div
            className={`main-divs chat wellcome_div ${
              isReversed ? "hidden_phones" : "shown"
            }`}
          >
            <div className="menu menu_wellcome">
              <Menu onClick={reverseStyle} key={0}></Menu>
            </div>
            <div className="wellcome">
              <Wellcome></Wellcome>
            </div>
          </div>
        ) : (
          <div
            className={`main-divs chat ${
              isReversed ? "hidden_phones" : "shown"
            }`}
          >
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
                <Menu onClick={reverseStyle} key={0}></Menu>
              </div>
            </div>

            <div className="chat_space">
              {isLoading ? (
                <div className="chat_loading">
                  <Loading></Loading>
                </div>
              ) : (
                <ScrollableFeed className="chat_scroll">
                  {chating.map((message, index) => (
                    <div
                      key={index}
                      className={
                        message.sender === currentUser
                          ? "user_message"
                          : "friend_message"
                      }
                    >
                      <p>{message.content}</p>
                      <p className="message_date">
                        {formatMessageDate(message.timestamp)}
                      </p>
                    </div>
                  ))}
                </ScrollableFeed>
              )}
            </div>
            <div className="chat_typing">
              <div className="emoji" ref={emoji_ref}>
                <button className="emoji_btn" onClick={emojiBtnHandelr}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zM4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM10 8c-.552 0-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5S10.552 8 10 8z" />
                  </svg>
                </button>
                <div
                  className={`emoji_div ${emojiVisibale ? "show" : "hidden"}`}
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
              <div className="go_btn">
                <SendButton
                  onClick={() =>
                    addmessage({
                      content: textValue,
                      sender: currentUser,
                    })
                  }
                ></SendButton>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
