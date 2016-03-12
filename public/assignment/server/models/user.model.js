var mock = require("./user.mock.json");

module.exports = function(uuid) {
  var api = {
    findUserByCredentials: findUserByCredentials,
    findUserByUsername: findUserByUsername,
    createUser: createUser,
    findUserById: findUserById,
    deleteUserById: deleteUserById,
    getAllUsers: getAllUsers,
    updateUserById: updateUserById
  };
  return api;

  function findUserById(userId) {
    for (var u in mock) {
      if (mock[u]._id === userId) {
        return mock[u];
      }
    }
    return null;
  }

  function deleteUserById(userId) {

    for (var i = 0; i < mock.length; i++) {
      if (mock[i]._id === userId) {
        mock.splice(i, 1);
        break;
      }
    }
    return mock;
  }

  function createUser(user) {
    user._id = uuid.v4();
    mock.push(user);
    return user;
  }

  function getAllUsers() {

    return mock;
  }

  function updateUserById(userId, user) {
    for (var i = 0; i < mock.length; i++) {
      if (mock[i]._id == userId) {
        mock[i].firstName = user.firstName;
        mock[i].lastName = user.lastName;
        mock[i].username = user.username;
        mock[i].password = user.password;
        break;
      }
    }
    return mock;
  }

  function findUserByCredentials(credentials) {

    for (var u in mock) {
      if (mock[u].username === credentials.username &&
        mock[u].password === credentials.password) {
        return mock[u];
      }
    }
    return null;
  }

  function findUserByUsername(username) {

    for (var u in mock) {
      if (mock[u].username === username) {
        return mock[u];
      }
    }
    return null
  }
};