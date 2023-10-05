require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport")
const passportLocalMongoose = require("passport-local-mongoose");


const app = express();




const saltRounds = 10;

app.use(bodyParser.json());

app.use(cors());






const url = "mongodb+srv://Dooo:PhuwhUpA1dPg9AVL@cluster0.hha6mae.mongodb.net";
mongoose.connect(url + "/ConversaDB", { useNewUrlParser: true });
// mongoose.set("useCreateIndex", true)


const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  nickname:String,
  selectedAvatar:Number
});



const User = new mongoose.model("User", userSchema);


app.get("/api", function (req, res) {
  res.json({ user:"hello" });
});


app.get("/auth",function(req,res){
  if(req.isAuthenticated()){
    res.json({ isauth: "Yes" });
  }
  else{
    res.json({ isauth: "No" });
  }
  
})

app.post("/send-email", function (req, res) {
  const email = req.body.email;
  const password = req.body.password;

  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(password, salt, function (err, hash) {
const newuser = User({
  email:email,
  password:hash,
})   

newuser.save().then(() => {
  console.log("success");
           res.json("approve");
});

 });
  });
});


app.post("/login", function (req, res) {
  const email = req.body.email;
  const password = req.body.password;

  const query = User.find({ email });
  query
    .then((result) => {
      console.log(result)
      if (result[0] === undefined) {
        res.json("invalid input");
      } else {
        bcrypt.compare(password, result[0].password).then(function (match) {
          if (match)
           res.json("approve");
          else res.json("invalid password");
          // result == true
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

app.listen("4000", function () {
  console.log("server starts...");
});
