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
            res.render('dashboard', { hata_mesaj: "Poll name already in use" });
        }
        else{
          req.checkBody('pollName', 'Poll Name is required').notEmpty();
          req.checkBody('pollQuestion', 'Poll Question is required').notEmpty();
          var hatalar = req.validationErrors();
          if (hatalar) {
            res.render('dashboard', { hatalar: hatalar });}
          else{
            var newPoll = new Poll({
              userId: req.user.id,
              pollName: pName,
              pollQuestion: pQ,
              pollItems:pItems,
            });
            Poll.createPoll(newPoll,function(err,poll){
              if(err) throw err;

            });
            req.flash('basarili_mesaj', 'Poll generated you can vote now');
            res.redirect('/dashboard');
          }
        }
    });
  });

module.exports = router;