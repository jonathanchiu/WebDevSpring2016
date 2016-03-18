module.exports = function(app, userModel) {
  app.post("/api/project/user", register);
  app.get("/api/project/user", delegate);
  app.get("/api/project/user/:id", profile);
  app.put("/api/project/user/:userId", updateUserById);
  app.delete("/api/project/user/:userId", deleteUserById);
  app.post("/api/project/user/logout", logout);

  function register(req, res) {
    var user = req.body;
    user = userModel.createUser(user);
    res.json(user);
  }

  function profile(req, res) {
    var userId = req.params.userId;
    var user = userModel.findUserById(userId);
    res.json(user)
  }

  function delegate(req, res) {
    if (req.query.username && req.query.password) {
      findUserByCredentials(req, res);
    }
    else if (req.query.username) {
      findUserByUsername(req, res);
    }
    else {
      getAllUsers(req, res);
    }
  }

  function getAllUsers(req, res) {
    var users = userModel.getAllUsers();
    res.json(users);
  }

  function findUserByUsername(req, res) {
    var username = req.query.username;
    var user = userModel.findUserByUsername(username);
    res.json(user);
  }

  function findUserByCredentials(req, res) {
    var credentials = {
        username: req.query.username,
        password: req.query.password
    };

    var user = userModel.findUserByCredentials(credentials);
    res.json(user);
  }

  function updateUserById(req, res) {
    var userId = req.params.userId;
    var user = req.body;
    var users = userModel.updateUserById(userId, user);
    res.json(users);
  }

  function deleteUserById(req, res) {
    var userId = req.params.userId;
    var users = userModel.deleteUserById(userId);
    res.json(users);
  }

  function logout(req, res) {
    res.send(200);
  }
};