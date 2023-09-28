require("dotenv").config()
const express = require("express")
const mongoose = require('mongoose');
const cors = require("cors")

const app = express()

app.use(cors())

app.get('/api', function (req, res) {
res.json({'user':"mm"})
});

app.listen('4000',function(){

    console.log("server starts...")
})