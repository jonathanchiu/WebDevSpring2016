(function() {
  angular
    .module("FormBuilderApp")
    .factory("UserService", userService);

  function userService($rootScope) {
    var users = [
      {"_id":123, "firstName":"Alice", "lastName":"Wonderland",
      "username":"alice", "password":"alice", "roles": ["student"]},
      {"_id":234, "firstName":"Bob","lastName":"Hope",
      "username":"bob", "password":"bob", "roles": ["admin"]},
      {"_id":345, "firstName":"Charlie","lastName":"Brown",
      "username":"charlie", "password":"charlie", "roles": ["faculty"]},
      {"_id":456, "firstName":"Dan", "lastName":"Craig",
      "username":"dan", "password":"dan", "roles": ["faculty", "admin"]},
      {"_id":567, "firstName":"Edward","lastName":"Norton",
      "username":"ed", "password":"ed", "roles": ["student"]}
    ];

    function findUserByUsernameAndPassword(username, password, callback) {
      var found = false;

      users.forEach(function(user) {
        if (user.username === username && user.password === password) {
          found = user;
        }
      });

      found ? callback(found) : callback(null);
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
      var found = false;

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

      found ? callback(found) : callback(null);
    }

    var service = {
      findAllUsers : findAllUsers,
      findUserByUsernameAndPassword : findUserByUsernameAndPassword,
      createUser : createUser,
      deleteUserById : deleteUserById,
      updateUser : updateUser
    };

    return service;
  }
})();