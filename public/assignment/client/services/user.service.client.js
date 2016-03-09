(function() {
  "use strict";

  angular
    .module("FormBuilderApp")
    .factory("UserService", userService);

  function userService($http, $rootScope) {

    function login(username, password) {
      return $http.get("/api/assignment/user?username=" + username + "&password=" + password);
    }

    function setCurrentUser(user) {
      $rootScope.currentUser = user;
    }

    function findAllUsers(callback) {
      callback(users);
    }

    function createUser(user, callback) {
      user._id = (new Date).getTime();
      users.push(user);
      $rootScope.usersList = users;
      callback(user);
    }

    function deleteUserById(userId, callback) {
      users = users.filter(function(user) {
        return user._id === userId;
      });

      callback(users);
    }

    function updateUser(userId, user, callback) {
      var found = null;

      users.forEach(function(oldUser) {
        if (oldUser._id === userId) {
          oldUser.firstName = user.firstName;
          oldUser.lastName = user.lastName;
          oldUser.username = user.username;
          oldUser.password = user.password;
          oldUser.email = user.email;
          found = oldUser;
          $rootScope.currentUser = found;
        }
      });

      callback(found);
    }

    var service = {
      findAllUsers : findAllUsers,
      setCurrentUser: setCurrentUser,
      login: login,
      createUser : createUser,
      deleteUserById : deleteUserById,
      updateUser : updateUser
    };

    return service;
  }
})();