const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const Image = require("./models/giphyModel.js");

app.use(express.urlencoded({extended:true}));
app.use(express.json());

//IF DEPLOYED, USE THE DEPLOYED DB, OTHERWISE USE THE LOCAL GIPHY DB
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/giphy";
// CONNECT TO THE MONGO DB
mongoose.connect(MONGODB_URI);

// mongoose.connect("mongodb://localhost/giphy", {useNewUrlParser:true});

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Send every request to the React app

app.post("/api/add_image",function(req,res){
  console.log(req.body);
  Image.create(req.body)
    .then(function(data){
      res.json(data)
    }).catch(function(err){
      res.status(500)
    });
});

// Define any API routes before this runs
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, function() {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
