(function() {
  "use strict";

  angular
    .module("FreshPotatoes")
    .factory("UserService", userService);

  function userService($http, $rootScope) {

    function getFollowersByUserId(userId) {
      return $http.get("/api/project/user/" + userId + "/followers");
    }

    function login(user) {
      return $http.post("/api/project/login", user);
    }

    function unfollowUser(userIdFollow, userIdFollower) {
      return $http.put("/api/project/user/" + userIdFollow + "/unfollow/" + userIdFollower);
    }

    function followUser(userIdFollow, userIdFollower) {
      return $http.put("/api/project/user/" + userIdFollow + "/follow/" + userIdFollower);
    }

    function findUsersByIds(userIds) {
      return $http.put("/api/project/users", userIds);
    }

    function findUserByCredentials(username, password) {
      return $http.get("/api/project/user?username=" + username + "&password=" + password);
    }

    function addMovieToUserLikes(userId, imdbId) {
      return $http.put("/api/project/user/" + userId + "/likes/" + imdbId);
    }

    function setCurrentUser(user) {
      $rootScope.currentUser = user;
    }

    function getAllUsers() {
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

    function findUserById(id) {
      return $http.get("/api/project/user/" + id);
    }

    function updateUserById(userId, user) {
      return $http.put("/api/project/user/" + userId, user);
    }

    function logout() {
      return $http.post("/api/project/logout");
    }

    var service = {
      getAllUsers : getAllUsers,
      getFollowersByUserId: getFollowersByUserId,
      followUser: followUser,
      unfollowUser: unfollowUser,
      setCurrentUser: setCurrentUser,
      findUserByUsername: findUserByUsername,
      findUserByCredentials: findUserByCredentials,
      createUser : createUser,
      deleteUserById : deleteUserById,
      updateUserById : updateUserById,
      findUserById: findUserById,
      addMovieToUserLikes: addMovieToUserLikes,
      logout : logout,
      login: login
    };

    return service;
  }
})();