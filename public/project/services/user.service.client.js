(function() {
  "use strict";

  angular
    .module("FreshPotatoes")
    .factory("UserService", UserService);

  function UserService() {

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

    function findUserByCredentials(username, password, callback) {
      users.forEach(function(user) {
        if (user.username === username && user.password === password) {
          callback(user);
          return;
        }
      });
      callback(null);
    }

    var service = {
      findUserByCredentials: findUserByCredentials,
    };

    return service;
  }
})();