var express = require("express");
var router = express.Router();

var User = require('../model/user');
var Common = require('../common/common');

router.post("/",Common.ensureAuthenticated,function(req,res,next){
  console.log(req.body);
});


module.exports = router;