var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var pollDataSchema = new Schema({
	userId: {type: String,index:true},
  pollName: {type: String,index:true},
	pollQuestion: {type: String},
  optionCount:{type: Number},
	Act: {type: Number},
	Bct: {type: Number},
  Cct: {type: Number},
  Dct: {type: Number},
  A: {type: String},
	B: {type: String},
  C: {type: String},
  D: {type: String},
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

module.exports.getPollById = function(id, callback){
	pollData.findById(id, callback);
}

module.exports.getAllPoll = function(callback){
	pollData.find(callback);
}

module.exports.updatePoll = function(pollName,voteValue,callback){
  var query = {pollName: pollName};
  if(voteValue==="Act")
	pollData.update(query, { $inc: { Act: 1 }},callback);
    if(voteValue==="Bct")
	pollData.update(query, { $inc: { Bct: 1 }},callback);
    if(voteValue==="Cct")
	pollData.update(query, { $inc: { Cct: 1 }},callback);
    if(voteValue==="Dct")
	pollData.update(query, { $inc: { Dct: 1 }},callback);
}
