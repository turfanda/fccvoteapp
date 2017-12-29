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

module.exports.createUser = function(newUser,callback){
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.password, salt, function(err, hash) {
	        newUser.password = hash;
	        newUser.save(callback);
	    });
	});
}

module.exports.getUserByUsername = function(username, callback){
	var query = {username: username};
	userData.findOne(query, callback);
}

module.exports.getUserById = function(id, callback){
	userData.findById(id, callback);
}