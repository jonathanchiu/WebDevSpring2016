module.exports = function(app, userModel) {
  app.post("/api/assignment/user", register);
  app.get("/api/assignment/user", delegate);
  app.get("/api/assignment/user/:id", profile);
  app.put("/api/assignment/user/:userId", updateUserById);
  app.delete("/api/assignment/user/:userId", deleteUserById);
  app.post("/api/project/omdb/logout", logout);

  function register(req, res) {
    var user = req.body;
    user = userModel.createUser(user)
            .then(
              function(user) {
                res.json(user);
              },
              function(err) {
                res.status(400).send(err);
              }
            );
  }

  function profile(req, res) {
    var userId = req.params.userId;
    userModel
      .findUserById(userId)
      .then(
        function(doc) {
          res.json(doc);
        },
        function(err) {
          res.status(400).send(err);
        }
      );
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

    userModel
      .findUserByCredentials(credentials)
      .then(
        function(doc) {
          res.json(doc);
        },
        function(err) {
          res.status(400).send(err);
        }
      );
  }

  function updateUserById(req, res) {
    var userId = req.params.userId;
    var user = req.body;
    userModel
      .updateUserById(userId, user)
      .then(
        function(doc) {
          res.json(doc);
        },
        function(err) {
          res.status(400).send(err);
        }
      );
  }

  function deleteUserById(req, res) {
    var userId = req.params.userId;
    userModel
      .deleteUserById(userId)
      .then(
        function(doc) {
          res.json(doc);
        },
        function(err) {
          res.status(400).send(err);
        }
      );
  }

  function logout(req, res) {
    res.send(200);
  }
};