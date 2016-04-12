module.exports = function(uuid, db, mongoose) {

  var UserSchema = require("./user.schema.server.js")();
  var User = mongoose.model("ProjectUser", UserSchema);

  var api = {
    findUserByCredentials: findUserByCredentials,
    getFollowersByUserId: getFollowersByUserId,
    findUserByUsername: findUserByUsername,
    createUser: createUser,
    findUserById: findUserById,
    deleteUserById: deleteUserById,
    getAllUsers: getAllUsers,
    updateUserById: updateUserById,
    findUsersByIds: findUsersByIds,
    addMovieToUserLikes: addMovieToUserLikes,
    followUser: followUser,
    unfollowUser: unfollowUser
  };
  return api;

  function getFollowersByUserId(userId) {
    return User
            .findById(userId)
            .then(function(doc) {
              return doc.followers;
            });
  }

  function followUser(followedId, followerId) {
    return User
            .findById(followedId)
            .then(function(doc) {
              doc.followers.push(followerId);
              return doc.save();
            });
  }

  function unfollowUser(followedId, followerId) {
    return User
            .findById(followedId)
            .then(function(doc) {
              var index = doc.followers.indexOf(followerId);
              doc.followers.splice(index, 99);
              return doc.save();
            });
  }

  function addMovieToUserLikes(userId, imdbId) {
    return User
            .findById(userId)
            .then(function(doc) {
              if (doc.likes.indexOf(imdbId) < 0) {
                doc.likes.push(imdbId);
              }
              doc.save();
              return doc.likes;
            });
  }

  function findUsersByIds(userIds) {
    return User
            .find({ "_id": { "$in": userIds }})
            .then(function(doc) {
              return doc;
            });
  }

  function findUserById(userId) {
    return User
            .findById(userId)
            .then(function(doc) {
              return doc;
            });
  }

  function deleteUserById(userId) {
    return User.findById(userId)
          .then(function(doc) {
            doc.remove();
            return getAllUsers();
          });
  }

  function getAllUsers() {
    return User.find({})
          .then(function(doc) {
            return doc;
          });
  }

  function createUser(user) {
    // Account for adding a user in admin panel
    delete user._id;

    return User.create(user)
          .then(function(user) {
            return user;
          },
          function(err) {
            console.log(err);
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
      console.log("findUserByUsername");
      console.log(doc);
      return doc;
    });
  }
};