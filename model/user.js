var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var Schema = mongoose.Schema;

var userDataSchema = new Schema({
  email: {type: String,unique: true,required: true,trim: true},
  username: {type: String,unique: true,required: true,trim: true},
  password: {type: String,required: true},
});

var userData = mongoose.model("userData",userDataSchema)

module.exports = userData;