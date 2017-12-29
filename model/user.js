var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var Schema = mongoose.Schema;

var userDataSchema = new Schema({
  email: {type: String,unique: true,required: true,trim: true},
  username: {type: String,unique: true,required: true,trim: true},
  password: {type: String,required: true},
});

var userData = mongoose.model("userData",userDataSchema)

module.exports.createUser = function(newUser, callback){
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.password, salt, function(err, hash) {
	        newUser.password = hash;
	        newUser.save(callback);
	    });
	});
}


module.exports = userData;