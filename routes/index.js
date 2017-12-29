var express = require("express");
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../model/user');


router.get("/", function (req, res, nex) {
    res.render("index",{title: "Vote-App"});
});

router.get("/register", function (req, res, nex) {
    res.render("register");
});

router.post('/register', function (req, res, next) {
  if (req.body.psw !== req.body.psw2) {
    var err = new Error('Passwords do not match.');
    err.status = 400;
    res.send("passwords dont match");
    return next(err);
  }
  
  if (req.body.email &&req.body.username &&req.body.psw &&req.body.psw2){
    var name = req.body.name;
	  var email = req.body.email;
	  var username = req.body.username;
	  var password = req.body.psw;
	  var password2 = req.body.psw2;  
   
   req.checkBody('name', 'Name is required').notEmpty();
	 req.checkBody('email', 'Email is required').notEmpty();
	 req.checkBody('email', 'Email is not valid').isEmail();
	 req.checkBody('username', 'Username is required').notEmpty();
	 req.checkBody('password', 'Password is required').notEmpty();
	 req.checkBody('password2', 'Passwords do not match').equals(req.body.psw);

    var hatalar = req.validationErrors();
  console.log(1);
    if(hatalar)
      res.render('register',{hatalar:hatalar});
    else{
       console.log(2);
      var yeniUser = new User({
			name: name,
			email:email,
			username: username,
			password: password
		});
      
      User.createUser(yeniUser, function(err, user){
			if(err) throw err;
			console.log(user);
      console.log("bu ne")
		});
      
      //req.flash('basarili_mesaj', 'You are registered and can now login');

		  res.redirect('/login');
    
    }
     console.log(3);
    var userData = {
            email: req.body.email,
            username: req.body.username,
            password: req.body.psw,
            passwordConf: req.body.pswConf,
        }

        User.create(userData, function (error, user) {
            if (error) {
                return next(error);
            } else {
                req.session.userId = user._id;
                return res.redirect('/profile');
            }
        });
     console.log(4);
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
