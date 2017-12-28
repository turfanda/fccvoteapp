'use strict'

var express = require('express');
var routes = require("./routes/index");
var hbs = require("express-handlebars");
var bodyParser = require('body-parser');
var session = require('express-session');
var app = express();

app.use("/",express.static('public'));


app.engine("hbs",hbs({extname:"hbs",defaultLayout:"main",layoutsDir:__dirname+"/views/layouts/"}));
app.set("views",process.cwd()+"/views");
app.set("view engine","hbs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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


