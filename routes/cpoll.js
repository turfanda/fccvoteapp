var express = require("express");
var router = express.Router();

var User = require('../model/user');
var Common = require('../common/common');

router.post("/",Common.ensureAuthenticated,function(req,res,next){
  var pName=req.body.pollName;
  var pQ=req.body.pollQuestion;
  var pA=req.body.A
  var pB=req.body.B
  var pC=req.body.C
  var pD=req.body.D
  
  req.checkBody('pollName', 'Poll Name is required').notEmpty();
  req.checkBody('pollQuestion', 'Poll Question is required').notEmpty();
  req.checkBody('A', 'At least enter two option').notEmpty();
  req.checkBody('B', 'At least enter two option').notEmpty();

  var hatalar = req.validationErrors();

  


});

module.exports = router;