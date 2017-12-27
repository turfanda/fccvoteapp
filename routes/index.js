var express = require("express");
var mongoose = require('mongoose');
var router = express.Router();
mongoose.connect(process.env.MONGO_URI,{ useMongoClient: true });
var Schema = mongoose.Schema;

var userDataSchema = new Schema({
  username:{type:String, required:true},
  password:{type:String, required:true},
});

var userData = mongoose.model("userData",userDataSchema)


router.get("/", function (req, res, nex) {
    res.render("index",{title: "Vote-App"});
});


module.exports = router;
