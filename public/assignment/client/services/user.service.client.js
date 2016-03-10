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

    function createUser(user) {
      return $http.post("/api/assignment/user", user);
    }

    function deleteUserById(userId, callback) {
      users = users.filter(function(user) {
        return user._id === userId;
      });

      callback(users);
    }

    function updateUser(userId, user) {
      return $http.put("/api/assignment/user/" + userId, user);
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