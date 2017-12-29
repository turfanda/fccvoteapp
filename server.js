
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var mongo = require('mongodb');
var routes = require("./routes/index");
var hbs = require("express-handlebars");
var bodyParser = require('body-parser');
var session = require('express-session');
var app = express();

mongoose.connect(process.env.MONGO_URI, {useMongoClient: true}, function(err){
    if(err) {
        console.log('Some problem with the connection ' +err);
    } else {
        console.log('The Mongoose connection is ready');
    }
});

var db = mongoose.connection;

app.engine("hbs",hbs({extname:"hbs",defaultLayout:"main",layoutsDir:__dirname+"/views/layouts/"}));
app.set("views",process.cwd()+"/views");
app.set("view engine","hbs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/",express.static('public'));

app.use(session({
    secret: 'turfanda',
    saveUninitialized: true,
    resave: true
}));

app.use(passport.initialize());
app.use(passport.session());

/*app.use(function (req, res, next) {
  res.locals.basarili_mesaj = req.flash('basarili_mesaj');
  res.locals.hata_mesaj = req.flash('hata_mesaj');
  res.locals.hata = req.flash('hata');
  res.locals.kullanici = req.kullanici || null;
  next();
});*/


app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));


app.use("/", routes);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

// error handler
// define as the last app.use callback
app.use(function (err, req, res, next) {
  res.render("error",{error: err.status+" "+err.message});
});


var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});


