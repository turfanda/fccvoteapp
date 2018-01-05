var express = require("express");
var router = express.Router();

var User = require('../model/user');
var Poll = require('../model/poll');
var Common = require('../common/common');

router.post("/",Common.ensureAuthenticated,function(req,res,next){  
  var pName=req.body.pollName;
  var pQ=req.body.pollQuestion;
  var pItems=JSON.parse(req.body.pollItems); 
  Poll.getPollByPollname(pName, function (err, asd) {
    if (err) throw err;
        if (asd) {
            res.json({success:"Poll name already in use", status : 501});
        }
        else{
          req.checkBody('pollName', 'Poll Name is required').notEmpty();
          req.checkBody('pollQuestion', 'Poll Question is required').notEmpty();
          var hatalar = req.validationErrors();
          if (hatalar) {
            res.json({success:"Fix problems shown in below", hatalar :hatalar, status : 501});
          }
          else{
            var newPoll = new Poll({
              userId: req.user.id,
              pollName: pName,
              pollQuestion: pQ,
              pollItems:pItems,
            });
            Poll.createPoll(newPoll,function(err,poll){
              if(err) throw err;
             res.json({success:"Internal Errors", status : 500});
            });
           res.json({success : "Poll generated you can vote now", status : 201});
          }
        }
    });
  });

module.exports = router;