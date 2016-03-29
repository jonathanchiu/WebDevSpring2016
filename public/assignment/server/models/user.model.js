var mock = require("./user.mock.json");

module.exports = function(uuid, db, mongoose) {

  var UserSchema = require("./user.schema.server.js")();
  var User = mongoose.model("User", UserSchema);

  var api = {
    findUserByCredentials: findUserByCredentials,
    findUserByUsername: findUserByUsername,
    createUser: createUser,
    findUserById: findUserById,
    deleteUserById: deleteUserById,
    getAllUsers: getAllUsers,
    updateUserById: updateUserById
  };
  return api;

  function findUserById(userId) {
    return User.findById(userId)
          .then(function(user) {
            return user;
          });
  }

  function deleteUserById(userId) {
    return User.findById(userId)
          .then(function(doc) {
            doc.remove();
            return getAllUsers();
          });
  }

  function createUser(user) {
    return User.create(user)
          .then(function(user) {
            return user;
          });
  }

  function getAllUsers() {
    return User.find({})
          .then(function(doc) {
            return doc;
          });
  }

  function updateUserById(userId, user) {
    return User.findOneAndUpdate(
      {_id: userId},
      {$set: user},
      {new: true}
    )
    .then(function(doc) {
      return doc;
    });
  }

  function findUserByCredentials(credentials) {
    return User.findOne({
        username: credentials.username,
        password: credentials.password
      }).then(function(user) {
        return user;
      });
  }

  function findUserByUsername(username) {
    return User.find({
      username: username
    }).then(function(doc) {
      return doc;
    });
  }
};