require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const io = require("socket.io");
const http = require("http"); // Import the 'http' module
const app = express();
const server = http.createServer(app); // Create an HTTP server
const corsOptions = {
  origin: ["https://deploy-mern-lwhq.vercel.app"],
  methods: ["POST", "GET"],
  optionsSuccessStatus: 200,
  credentials: true,
  origin: true,
};
const socketIo = io(server, {
  pingTimeout: 60000,
  cors: corsOptions,
});
const saltRounds = 10;
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());
const url =
  "mongodb+srv://Dooo:PhuwhUpA1dPg9AVL@cluster0.hha6mae.mongodb.net/ConversaDB";
mongoose.Promise = global.Promise;
mongoose.connect(url, { useNewUrlParser: true });
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  chats: Array,
  nickName: String,
  friends: Array,
  avatar: {
    type: Number,
    default: 1,
  },
});
const chatSchema = new mongoose.Schema({
  participants: [{ type: String }], // An array of participant emails
  messages: [
    {
      sender: String, // Email of the sender
      content: String,
      timestamp: Date,
    },
  ],
});
const User = new mongoose.model("User", userSchema);
const Chat = new mongoose.model("Chat", chatSchema);
socketIo.on("connection", (socket) => {
  socket.on("setup", (currentUser) => {
    socket.join(currentUser);
    socket.emit("connected");
  });
  socket.on("leave chat", (room) => {
    socket.leave(room);
    console.log("user leaved room :", room);
  });
  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("user joined room :", room);
  });
  socket.on(
    "sendMessage",
    async ({ yourEmail, friendEmail, message, chatId }) => {
      console.log("message");
      // Save the message to the database
      const newMessage = {
        content: message.content,
        sender: yourEmail,
        timestamp: new Date(),
      };
      try {
        const chat = await Chat.findOne({
          participants: { $all: [yourEmail, friendEmail] },
        });
        if (chat) {
          chat.messages.push(newMessage);
          const savedChat = await chat.save();
          // Emit the new message to the sender and the friend
          socket.emit("newMessage", newMessage);
          socket.to(chatId).emit("newMessage", newMessage);
        } else {
          // Handle the case where the chat doesn't exist
          // You might want to create a new chat here
        }
      } catch (err) {
        console.log(err);
        // Handle the error
      }
    }
  );
});
app.get("/api", function (req, res) {
  res.json({ message: "hello" });
});
app.get("/", function (req, res) {
  res.send("hello");
  console.log("hello");
});
app.post("/sign", function (req, res) {
  const email = req.body.email;
  const password = req.body.password;
  let user = User.findOne({ email });
  user.then((result) => {
    if (result) {
      res.json("user already exist");
    } else
      bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
          const newuser = new User({
            email: email,
            password: hash,
          });
          newuser.save().then(() => {
            console.log("success");
            res.json("approve");
          });
        });
      });
  });
});
app.post("/login", async function (req, res) {
  const email = req.body.email;
  const password = req.body.password;
  const query = User.find({ email });
  query
    .then((result) => {
      if (result[0] === undefined) {
        res.json({ msg: "invalid input" });
      } else {
        bcrypt.compare(password, result[0].password).then(function (match) {
          if (match) {
            res.json({ msg: "approve", email: email, id: result[0]._id });
          } else res.json({ msg: "wrong password" });
          // result == true
        });
      }
    })
    .catch((err) => {
      res.json({ msg: "error" });
      console.log(err);
    });
});
app.post("/usersData", async function (req, res) {
  const email = req.body.email;
  const query = User.find({ email });
  query
    .then((result) => {
      if (result[0] === undefined) {
        res.json();
      } else {
        res.json({
          email: result[0].email,
          nickName: result[0].nickName,
          friends: result[0].friends,
          avatar: result[0].avatar,
          _id: result[0]._id,
        });
        // result == true
      }
    })
    .catch((err) => {
      console.log(err);
    });
});
app.post("/chat", function (req, res) {
  const yourEmail = req.body.yourEmail; // Your email
  const friendEmail = req.body.friendEmail; // Friend's email
  Chat.find({
    participants: { $all: [yourEmail, friendEmail] },
  })
    .then((result) => {
      res.json(result[0]);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Error retrieving chats" });
    });
});
app.post("/sendmessage", async function (req, res) {
  const yourEmail = req.body.yourEmail;
  const friendEmail = req.body.friendEmail;
  const messageContent = req.body.message;
  // Construct the new message object
  const newMessage = {
    content: messageContent.content,
    sender: yourEmail,
  };
  const chat = await Chat.findOne({
    participants: { $all: [yourEmail, friendEmail] },
  });
  if (chat) {
    chat.messages.push(newMessage);
    chat
      .save()
      .then((savedChat) => {
        res.json(savedChat); // Return the updated chat with the new message
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: "Error sending message" });
      });
  } else {
    // Handle the case where the chat doesn't exist
    res.status(404).json({ error: "Chat not found" });
  }
});
app.post("/nickName", async function (req, res) {
  const email = req.body.email;
  const nickName = req.body.nickName;
  let doc = await User.findOneAndUpdate(
    { email: email },
    { nickName: nickName }
  )
    .then((result) => {
      res.json("success!");
    })
    .catch((err) => {
      console.log(err);
    });
});
app.post("/avatarselect", async function (req, res) {
  const email = req.body.email;
  const avatar = req.body.avatar;
  let doc = await User.findOneAndUpdate(
    { email: email },
    { avatar: avatar }
  ).then((result) => {
    res.json("success!");
  });
});
app.post("/addfriend", function (req, res) {
  const yourEmail = req.body.email;
  const friendID = req.body.ID;
  // Step 1: Find the user with the provided ID
  User.findById(friendID)
    .then((friend) => {
      if (!friend) {
        return res.json({ msg: "Friend not found" });
      }
      if (friend.email === yourEmail) {
        return res.json({ msg: "You cannot add yourself as a friend" });
      }
      // Step 2: Check if a chat between you and the friend already exists
      Chat.findOne({
        participants: { $all: [yourEmail, friend.email] },
      })
        .then((existingChat) => {
          if (existingChat) {
            return res.json({ msg: "Chat already exists" });
          }
          // Step 3: Create a new chat if it doesn't exist
          const newChat = new Chat({
            participants: [yourEmail, friend.email],
            messages: [],
          });
          newChat
            .save()
            .then((savedChat) => {
              // Step 4: Update your and the friend's information with the new chat and friendship
              User.findOneAndUpdate(
                { email: yourEmail },
                {
                  $addToSet: {
                    friends: friend.email,
                    chats: savedChat._id,
                  },
                }
              )
                .then(() => {
                  User.findOneAndUpdate(
                    { _id: friendID },
                    {
                      $addToSet: {
                        friends: yourEmail,
                        chats: savedChat._id,
                      },
                    }
                  )
                    .then(() => {
                      res.json({ msg: "Friend added and chat created" });
                    })
                    .catch((err) => {
                      console.log(err);
                      res
                        .status(500)
                        .json({ msg: "Error updating friend's data" });
                    });
                })
                .catch((err) => {
                  console.log(err);
                  res.status(500).json({ msg: "Error updating your data" });
                });
            })
            .catch((err) => {
              console.log(err);
              res.status(500).json({ msg: "Error creating chat" });
            });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({ msg: "Error checking existing chat" });
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "Error finding the friend" });
    });
});
app.listen(5000, () => {
  console.log("Running on port 5000.");
});

// Export the Express API
module.exports = app;
