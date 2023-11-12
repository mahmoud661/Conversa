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

const corsOptions = {
  origin: ["https://deploy-mern-lwhq.vercel.app"],
  methods: ["POST", "GET"],
  optionsSuccessStatus: 200,
  credentials: true,
  origin: true,
};

const saltRounds = 10;
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());

app.get("/api", function (req, res) {
  res.json({ message: "hello" });
});
app.get("/", function (req, res) {
  res.send("hello");
  console.log("hello");
});








const port = process.env.PORT || 4000; 
app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
