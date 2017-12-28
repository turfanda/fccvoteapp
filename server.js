'use strict'

var express = require('express');
var routes = require("./routes/index");
var hbs = require("express-handlebars");
var app = express();

app.use("/",express.static('public'));


app.engine("hbs",hbs({extname:"hbs",defaultLayout:"main",layoutsDir:__dirname+"/views/layouts/"}));
app.set("views",process.cwd()+"/views");
app.set("view engine","hbs");

app.use("/", routes);

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});


