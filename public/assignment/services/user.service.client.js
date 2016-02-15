(function() {
  angular
    .module("FormBuilderApp")
    .factory("UserService", userService);

  function userService() {
    var users = [
      {"_id":123, "firstName":"Alice",  "lastName":"Wonderland","username":"alice",  "password":"alice"},
      {"_id":234, "firstName":"Bob",    "lastName":"Hope",      "username":"bob",    "password":"bob"},
      {"_id":345, "firstName":"Charlie","lastName":"Brown",     "username":"charlie","password":"charlie"},
      {"_id":456, "firstName":"Dan",    "lastName":"Craig",     "username":"dan",    "password":"dan"},
      {"_id":567, "firstName":"Edward", "lastName":"Norton",    "username":"ed",     "password":"ed"}
    ];

    function findUserByUsernameAndPassword(username, password, callback) {
      var found = false;

      for (var user in users) {
        if (user.username === username && user.password === password) {
          found = user;
        }
      }

      found ? callback(found) : callback(null);
    }

    function findAllUsers(callback) {
      callback(users);
    }

    function createUser(user, callback) {
      user._id = (new Date).getTime();
      users.push(user);
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

      for (var currentUser in users) {
        if (currentUser._id === userId) {
          currentUser.firstName = user.firstName;
          currentUser.lastName = user.lastName;
          currentUser.username = user.username;
          currentUser.password = user.password;
          found = currentUser;
        }
      }

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

    function findAllUsers()
    {
      return users;
    }

    function findUserById(id)
    {
      return users[id];
    }

  }
})();