(function() {
  "use strict";

  angular
    .module("FreshPotatoes")
    .factory("UserService", userService);

  function userService($http, $rootScope) {

    function findUserByCredentials(username, password) {
      return $http.get("/api/project/user?username=" + username + "&password=" + password);
    }

    function setCurrentUser(user) {
      $rootScope.currentUser = user;
    }

    function findAllUsers() {
      return $http.get("/api/project/user");
    }

    function createUser(user) {
      return $http.post("/api/project/user", user);
    }

    function deleteUserById(userId) {
      return $http.delete("/api/project/user/" + userId);
    }

    function findUserByUsername(username) {
      return $http.get("/api/project/user?username=" + username);
    }

    function updateUser(userId, user) {
      return $http.put("/api/project/user/" + userId, user);
    }

    var service = {
      findAllUsers : findAllUsers,
      setCurrentUser: setCurrentUser,
      findUserByUsername: findUserByUsername,
      findUserByCredentials: findUserByCredentials,
      createUser : createUser,
      deleteUserById : deleteUserById,
      updateUser : updateUser
    };

    return service;
  }
})();