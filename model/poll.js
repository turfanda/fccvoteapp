var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var pollDataSchema = new Schema({
	userId: {type: String,index:true},
  pollName: {type: String,index:true},
	pollQuestion: {type: String},
	A: {type: Number},
	B: {type: Number},
  C: {type: Number},
  D: {type: Number}
});

var pollData = mongoose.model("pollData",pollDataSchema);

module.exports = pollData;

module.exports.createPoll = function(newUser,callback){

}

module.exports.getPollByUsername = function(username, callback){
	var query = {username: username};
	pollData.findOne(query, callback);
}

module.exports.getPollById = function(id, callback){
	pollData.findById(id, callback);
}

module.exports.getAllPoll = function(id, callback){
	pollData.findById(id, callback);
}
