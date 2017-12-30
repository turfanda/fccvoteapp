var express = require("express");
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../model/user');

router.get("/", function (req, res, nex) {
    res.render("index",{title: "Vote-App"});
});

router.get("/dashboard", ensureAuthenticated, function (req, res, nex) {
    res.render("dashboard");
  console.log(req.user.name);
});

router.get("/register", function (req, res, nex) {
    res.render("register");
});

router.post('/register', function (req, res, next) {
  
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

   if(hatalar){
      res.render('register',{hatalar:hatalar});}
    else{

      var newUser = new User({
			name: name,
			email:email,
			username: username,
			password: password
		});
      
    
    User.createUser(newUser,function(err,user){
      if(err) {throw err;}
    });
      req.flash('basarili_mesaj', 'You are registered and can now login');
		  res.redirect('/login');
    }

});

router.get("/login", function (req, res, nex) {
    res.render("login");
});

passport.use(new LocalStrategy(function(username, password, done) {
   User.getUserByUsername(username, function(err, user){
   	if(err) throw err;
   	if(!user){
   		return done(null, false, {message: 'Unknown User'});
   	}
   	User.comparePassword(password, user.password, function(err, isMatch){
   		if(err) throw err;
   		if(isMatch){
   			return done(null, user);
   		} else {
   			return done(null, false, {message: 'Invalid password'});
   		}
   	});
   });
  }));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

router.post('/login',passport.authenticate('local', {successRedirect:'/dashboard', failureRedirect:'/login',failureFlash: true}),function(req, res) {
    res.redirect('/dashboard');
});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		res.redirect('/login');
	}
}

module.exports = router;
