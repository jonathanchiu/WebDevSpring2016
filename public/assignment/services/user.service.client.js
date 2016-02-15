(function() {
  angular
    .module("FormBuilderApp")
    .factory("UserService", userService);

  function userService($rootScope) {
    var users = [
      {"_id":123, "firstName":"Alice",  "lastName":"Wonderland","username":"alice",  "password":"alice"},
      {"_id":234, "firstName":"Bob",    "lastName":"Hope",      "username":"bob",    "password":"bob"},
      {"_id":345, "firstName":"Charlie","lastName":"Brown",     "username":"charlie","password":"charlie"},
      {"_id":456, "firstName":"Dan",    "lastName":"Craig",     "username":"dan",    "password":"dan"},
      {"_id":567, "firstName":"Edward", "lastName":"Norton",    "username":"ed",     "password":"ed"}
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
          console.log("CURRENT USER");
          console.log(oldUser);
          console.log("GIVEN USER");
          console.log(user);
          oldUser.firstName = user.firstName;
          oldUser.lastName = user.lastName;
          oldUser.username = user.username;
          oldUser.password = user.password;
          oldUser.email = user.email;
          found = oldUser;
          $rootScope.currentUser = found;
        }
      });

      console.log(found);
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