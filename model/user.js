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

var createUser = function(newUser, callback){
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.password, salt, function(err, hash) {
	        newUser.password = hash;
	        newUser.save(callback);
	    });
	});
}


module.exports = userData;
module.exports = createUser;