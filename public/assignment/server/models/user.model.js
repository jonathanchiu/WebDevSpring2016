var mock = require("./user.mock.json");

module.exports = function() {
  var api = {
    findUserByCredentials: findUserByCredentials,
    findUserByUsername: findUserByUsername,
    createUser: createUser,
    findUserById: findUserById,
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

  function createUser(user) {
    user._id = (new Date()).getTime();
    mock.push(user);
    return user;
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
}