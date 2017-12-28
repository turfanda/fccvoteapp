var express = require("express");
var mongoose = require('mongoose');
var router = express.Router();
mongoose.connect(process.env.MONGO_URI,{ useMongoClient: true });


router.get("/", function (req, res, nex) {
    res.render("index",{title: "Vote-App"});
});

router.get("/register", function (req, res, nex) {
    res.render("register");
});

router.post('/register', function (req, res, next) {
  console.log("register");
  if (req.body.password !== req.body.passwordConf) {
    var err = new Error('Passwords do not match.');
    err.status = 400;
    res.send("passwords dont match");
    return next(err);
  }
  
  if (req.body.email &&req.body.username &&req.body.password &&req.body.passwordConf){
      var userData = {
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            passwordConf: req.body.passwordConf,
        }

        User.create(userData, function (error, user) {
            if (error) {
                return next(error);
            } else {
                req.session.userId = user._id;
                return res.redirect('/profile');
            }
        });
  }
  else{
    var err = new Error('All fields required.');
    err.status = 400;
    return next(err);
  }
});

router.get("/login", function (req, res, nex) {
    res.render("login");
});

router.post('/login', function (req, res, next) {
  console.log("login");
});


module.exports = router;
