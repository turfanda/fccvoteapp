var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var Schema = mongoose.Schema;

var userDataSchema = new Schema({
	username: {type: String,index:true},
	password: {type: String},
	email: {type: String},
	name: {type: String}
});

var userData = mongoose.model("userData",userDataSchema)


module.exports = userData;