require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");

const app = express();

const saltRounds = 10;

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
  credentials: true,
  origin: true,
};

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

function createNewChat(myEmail, friendEmail) {}

const User = new mongoose.model("User", userSchema);
const Chat = new mongoose.model("Chat", chatSchema);

app.get("/api", function (req, res) {});

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
        });
        // result == true
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/chat", function (req, res) {
  const email = req.body.email;

  const query = Chat.find({ email });
  query
    .then((result) => {
      if (result[0] === undefined) {
        res.json();
      } else {
        res.json(result[0]);
        // result == true
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/nickName", async function (req, res) {
  const email = req.body.email;
  const nickName = req.body.nickName;
  let doc = await User.findOneAndUpdate(
    { email: email },
    { nickName: nickName }
  ).then((result) => {
    res.json("success!");
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


app.listen("4000", "0.0.0.0", function () {
  console.log("server starts...");
});
