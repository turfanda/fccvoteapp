var express = require("express");
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../model/user');
var Poll = require('../model/poll');
var Common = require('../common/common');

router.get("/", function (req, res, nex) {
  if(!req.user)
    res.render("index", { title: "Vote-App" });
  else{
  res.redirect("/dashboard");
  }
});

router.get("/dashboard", Common.ensureAuthenticated, function (req, res, nex) {
    res.render("dashboard");
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

    User.getUserByUsername(req.body.username, function (err, asd) {
        if (err) throw err;
        if (asd) {
            res.render('register', { hata_mesaj: "User name already in use" });
        }
        else {
            req.checkBody('name', 'Name is required').notEmpty();
            req.checkBody('email', 'Email is required').notEmpty();
            req.checkBody('email', 'Email is not valid').isEmail();
            req.checkBody('username', 'Username is required').notEmpty();
            req.checkBody('psw', 'Password is required').notEmpty();
            req.checkBody('psw2', 'Passwords do not match').equals(req.body.psw);
            var hatalar = req.validationErrors();

            if (hatalar) {
                res.render('register', { hatalar: hatalar });
            }
            else {

                var newUser = new User({
                    name: name,
                    email: email,
                    username: username,
                    password: password
                });
                User.createUser(newUser, function (err, user) {
                    if (err) { throw err; }
                });
                req.flash('basarili_mesaj', 'You are registered and can now login');
                res.redirect('/login');
            }
        }
    });
});

router.get("/login", function (req, res, nex) {
    res.render("login");
});

router.get("/getAllPoll",function(req,res,next){
 Poll.getAllPoll(function(err,asd){
   if (err) throw err;
   else{
     res.json(asd);
   }
        
 });
  
});

router.get("/getAllUserPoll",Common.ensureAuthenticated,function(req,res,next){
  
 Poll.getPollByUserId(req.user.id,function(err,asd){
   if (err) throw err;
   else{
     res.json(asd);
   }
        
 });
  
});

passport.use(new LocalStrategy(function (username, password, done) {
    User.getUserByUsername(username, function (err, user) {
        if (err) throw err;
        if (!user) {
            return done(null, false, { message: 'Unknown User' });
        }
        User.comparePassword(password, user.password, function (err, isMatch) {
            if (err) throw err;
            if (isMatch) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'Invalid password' });
            }
        });
    });
}));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.getUserById(id, function (err, user) {
        done(err, user);
    });
});

router.post('/login', passport.authenticate('local', { successRedirect: '/dashboard', failureRedirect: '/login', failureFlash: true }), function (req, res) {
    res.redirect('/dashboard');
});

router.get('/logout', function (req, res) {
    req.logout();

    req.flash('success_msg', 'You are logged out');

    res.redirect('/');
});

router.post('/vote',function(req,res){
  
  Poll.updatePoll(req.body.pollName,req.body.vote,function(err){
    if(err) throw err;
  });
});

router.post('/getPollResult',function(req,res){

Poll.getPollByPollname(req.body.pollName,function(err,asd){
  if(err)
    throw err;
  else
  {
    console.log(asd);
    res.json(asd);
  }
});
  });

module.exports = router;
