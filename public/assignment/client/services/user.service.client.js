(function() {
  "use strict";

  angular
    .module("FormBuilderApp")
    .factory("UserService", userService);

  function userService($http, $rootScope) {

    function login(user) {
      return $http.post("/api/assignment/login", user);
    }

    function logout() {
      return $http.post("/api/assignment/logout");
    }

    function findUserByCredentials(username, password) {
      return $http.get("/api/assignment/user?username=" + username + "&password=" + password);
    }

    function setCurrentUser(user) {
      $rootScope.currentUser = user;
    }

    function findAllUsers() {
      return $http.get("/api/assignment/admin/user");
    }

    function createUser(user) {
      return $http.post("/api/assignment/user", user);
    }

    function createUserAdmin(user) {
      return $http.post("/api/assignment/admin/user", user);
    }

    function deleteUserById(userId) {
      return $http.delete("/api/assignment/admin/user/" + userId);
    }

    function findUserByUsername(username) {
      return $http.get("/api/assignment/user?username=" + username);
    }

    function updateUser(userId, user) {
      return $http.put("/api/assignment/user/" + userId, user);
    }

    function updateUserAdmin(userId, user) {
      return $http.put("/api/assignment/admin/user/" + userId, user);
    }

    var service = {
      findAllUsers : findAllUsers,
      setCurrentUser: setCurrentUser,
      findUserByUsername: findUserByUsername,
      findUserByCredentials: findUserByCredentials,
      createUser : createUser,
      createUserAdmin : createUserAdmin,
      deleteUserById : deleteUserById,
      updateUser : updateUser,
      updateUserAdmin: updateUserAdmin,
      login : login,
      logout : logout
    };

    return service;
  }
})();