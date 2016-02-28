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

    function updateUser(userId, user, callback) {

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

    var service = {
      findUserByCredentials: findUserByCredentials,
      createUser: createUser,
      updateUser: updateUser
    };

    return service;
  }
})();