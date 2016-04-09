var mongoose = require("mongoose");

module.exports = function () {

  var UserSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    emails: [String],
    phones: [String],
    roles: [String],
    likes: [String],
    followers: [String],
    avatar: String,
    dob: Date,
    description: String
  }, {collection: 'project.user'});
  return UserSchema;
};