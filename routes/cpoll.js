var express = require("express");
var router = express.Router();

var User = require('../model/user');
var Poll = require('../model/poll');
var Common = require('../common/common');

router.post("/",Common.ensureAuthenticated,function(req,res,next){  
      Poll.getPollByPollname(req.body.pollName, function (err, asd) {
        if (err) throw err;
        if (asd) {
            res.render('/dashboard', { hata_mesaj: "Poll name already in use" });
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
              pollName: req.body.pollName,
              pollQuestion: req.body.pollQuestion,
              A: req.body.A,
              B: req.body.B,
              C: req.body.C,
              D: req.body.D
            });
            Poll.createPoll(newPoll,function(err,poll){
              if(err) throw err;
              console.log(newPoll);

            });
            req.flash('basarili_mesaj', 'Poll generated you can vote now');
            res.redirect('/dashboard');

          }
        }
    });
  });

module.exports = router;