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
  console.log("register");
  if (req.body.password !== req.body.passwordConf) {
    var err = new Error('Passwords do not match.');
    err.status = 400;
    res.send("passwords dont match");
    return next(err);
  }
  
  if (req.body.email &&req.body.username &&req.body.password &&req.body.passwordConf){
    var name = req.body.name;
	  var email = req.body.email;
	  var username = req.body.username;
	  var password = req.body.password;
	  var password2 = req.body.passwordConf;  
   
   req.checkBody('name', 'Name is required').notEmpty();
	 req.checkBody('email', 'Email is required').notEmpty();
	 req.checkBody('email', 'Email is not valid').isEmail();
	 req.checkBody('username', 'Username is required').notEmpty();
	 req.checkBody('password', 'Password is required').notEmpty();
	 req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

    var hatalar = req.validationErrors();
    
    if(hatalar)
      res.render('register',{hatalar:hatalar});
    else{
      var yeniUser = new User({
			name: name,
			email:email,
			username: username,
			password: password
		});
    
    }
    
    
    
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
