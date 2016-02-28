(function() {
  "use strict";

  angular
    .module("FreshPotatoes")
    .factory("UserService", UserService);

  function UserService($rootScope) {

    var users = [
      {
        "_id": 123,
        "firstName": "Bob",
        "lastName": "Saget",
        "username": "bobsaget",
        "password": "bobsaget",
        "role": 2,
        "avatar": "http://goo.gl/957rZZ",
        "dob": new Date(),
        "description": "I love Full House and romantic comedies!"
      },
      {
        "_id": 999,
        "firstName": "Jonathan",
        "lastName": "Chiu",
        "username": "admin",
        "password": "admin",
        "role": 1,
        "avatar": "images/avatar.gif",
        "dob": new Date(),
        "description": "I love all types of movies! I'm also an administrator!"
      }
    ];

    $rootScope.users = users;

    function findUserByCredentials(username, password, callback) {
      users.forEach(function(user) {
        if (user.username === username && user.password === password) {
          callback(user);
          return;
        }
      });
      callback(null);
    }

    function createUser(user, callback) {
      user._id = (new Date).getTime();
      users.push(user);
      $rootScope.users = users;
      callback(user);
    }

    function updateUserProfile(userId, user, callback) {

      users.forEach(function(updatedUser) {
        if (updatedUser._id === userId) {
          updatedUser.firstName = user.firstName;
          updatedUser.lastName = user.lastName;
          updatedUser.password = user.password;
          updatedUser.description = user.description;
          updatedUser.dob = user.dob;

          $rootScope.currentUser = updatedUser;
          callback(updatedUser);
          return;
        }
      });
      callback(null);
    }

    function deleteUserById(id, callback) {
      users = _.filter(users, function(u) { return u._id !== id; });
      callback(users);
    }

    function updateUser(user, id, callback) {
      for (var i = 0; i < users.length; i++) {
        if (users[i]._id === id) {
          users[i].avatar = user.avatar;
          users[i].username = user.username;
          users[i].password = user.password;
          users[i].firstName = user.firstName;
          users[i].lastName = user.lastName;
          users[i].dob = user.dob;
          users[i].role = user.role;
          callback(users);
          return;
        }
      }
    }

    function createUser(user, callback) {
      user._id = (new Date).getTime();
      users.push(user);
      callback(users);
    }

    var service = {
      findUserByCredentials: findUserByCredentials,
      createUser: createUser,
      updateUserProfile: updateUserProfile,
      updateUser: updateUser,
      deleteUserById: deleteUserById,
      createUser: createUser
    };

    return service;
  }
})();