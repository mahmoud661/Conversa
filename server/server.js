require("dotenv").config()
const express = require("express")
const mongoose = require('mongoose');
<<<<<<< HEAD
=======
const bodyParser = require("body-parser");
>>>>>>> bdedb2bedf3b0b50f779f8cf7dab3de02e94541e
const cors = require("cors")

const app = express()

<<<<<<< HEAD
app.use(cors())

app.get('/api', function (req, res) {
res.json({'user':"mm"})
=======
app.use(bodyParser.json());

const url =
  "mongodb+srv://"+ process.env.MDPass +"@cluster0.hha6mae.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(url + "/ConversaDB", { useNewUrlParser: true });

// const userSchema = new mongoose.Schema({
//   email: String,
//   password: String,
// });

// const User = new mongoose.model("User", userSchema);

let mm = "mahmoud"

app.use(cors())

app.get('/api', function (req, res) {
res.json({'user':mm})
});


app.post("/send-email",function (req, res) {

const email = req.body

mm = email

>>>>>>> bdedb2bedf3b0b50f779f8cf7dab3de02e94541e
});

app.listen('4000',function(){

    console.log("server starts...")
})