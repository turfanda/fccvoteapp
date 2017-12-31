var express = require("express");
var router = express.Router();

var User = require('../model/user');

router.post("/",function(req,res){
console.log(req.body);
});


module.exports = router;