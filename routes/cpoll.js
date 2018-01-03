var express = require("express");
var router = express.Router();

var User = require('../model/user');
var Poll = require('../model/poll');
var Common = require('../common/common');

router.post("/",Common.ensureAuthenticated,function(req,res,next){  
  console.log(req.body); 
  var pName=req.body.pollName;
   var pQ=req.body.pollQuestion;
   var OpCount=req.body.optionCount;
   var pA=req.body.A;
   var pB=req.body.B;
   var pC=req.body.C;
   var pD=req.body.D ;   
  Poll.getPollByPollname(pName, function (err, asd) {
        if (err) throw err;
        if (asd) {
            res.render('dashboard', { hata_mesaj: "Poll name already in use" });
        }
        else{
          req.checkBody('pollName', 'Poll Name is required').notEmpty();
          req.checkBody('pollQuestion', 'Poll Question is required').notEmpty();
          req.checkBody('A', 'At least enter two option').notEmpty();
          req.checkBody('B', 'At least enter two option').notEmpty();
          var hatalar = req.validationErrors();
          if (hatalar) {
            res.render('dashboard', { hatalar: hatalar });
}
          else{
            var newPoll = new Poll({
              userId: req.user.id,
              pollName: pName,
              pollQuestion: pQ,
              optionCount:OpCount,
              A: pA,
              B: pB,
              C: pC,
              D: pD,
              Act: 0,
              Bct: 0,
              Cct: 0,
              Dct: 0,
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