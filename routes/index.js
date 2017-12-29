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
	 req.checkBody('psw', 'Password is required').notEmpty();
	 req.checkBody('psw2', 'Passwords do not match').equals(req.body.psw);
   var hatalar = req.validationErrors();


    if(hatalar)
      res.render('register',{hatalar:hatalar});
    else{

      var newUser = new User({
			name: name,
			email:email,
			username: username,
			password: password
		});
      
    
    User.createUser(newUser,function(err,user){
      if(err) {throw err;}
			console.log(user);
    });
      //req.flash('basarili_mesaj', 'You are registered and can now login');
		  res.redirect('/login');
    }
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
