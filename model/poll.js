var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var pollDataSchema = new Schema({
	userId: {type: String,index:true},
  pollName: {type: String,index:true},
	pollQuestion: {type: String},
  pollItems:[{"optionName":String,"optionVal":String,"optionCount":Number}]
});

var pollData = mongoose.model("pollData",pollDataSchema);

module.exports = pollData;

module.exports.createPoll = function(newPoll,callback){
  newPoll.save(callback)
}

module.exports.getPollByPollname = function(pollName, callback){
  var query = {pollName: pollName};
	pollData.findOne(query, callback);
}

module.exports.getPollByUserId = function(userId, callback){
  var query = {userId: userId};
	pollData.find(query, callback);
}

module.exports.getPollById = function(id, callback){
	pollData.findById(id, callback);
}

module.exports.deletePollByPollName = function(pollName, callback){
   var query = {pollName: pollName};
	pollData.remove(query, callback);
}

module.exports.getAllPoll = function(callback){
	pollData.find(callback);
}

module.exports.updatePoll = function(pollName,voteValue,callback){
  var query = {pollName: pollName, 'pollItems.optionName': voteValue};
  pollData.update(query, {'$inc': {'pollItems.$.optionCount': 1}}, callback);
}
