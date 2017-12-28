var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var Schema = mongoose.Schema;

var userDataSchema = new Schema({
  email: {type: String,unique: true,required: true,trim: true},
  username: {type: String,unique: true,required: true,trim: true},
  password: {type: String,required: true},
  passwordConf: {type: String,required: true}
});

var userData = mongoose.model("userData",userDataSchema)

userDataSchema.statics.authenticate = function (email, password, callback) {
  userData.findOne({ email: email })
    .exec(function (err, user) {
      if (err) {
        return callback(err)
      } else if (!user) {
        var err = new Error('User not found.');
        err.status = 401;
        return callback(err);
      }
      bcrypt.compare(password, user.password, function (err, result) {
        if (result === true) {
          return callback(null, user);
        } else {
          return callback();
        }
      })
    });
}

module.exports = userData;