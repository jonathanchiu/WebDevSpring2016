var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function(app, userModel) {
  app.post("/api/project/user", register);
  app.put("/api/project/user/:followedId/follow/:followerId", followUser);
  app.put("/api/project/user/:followedId/unfollow/:followerId", unfollowUser);
  app.get("/api/project/user", delegate);
  app.get("/api/project/user/:userId/followers", getFollowersByUserId);
  app.get("/api/project/user/:userId", profile);
  app.put("/api/project/users", findUsersByIds);
  app.put("/api/project/user/:userId", updateUserById);
  app.delete("/api/project/user/:userId", deleteUserById);
  app.post("/api/project/user/logout", logout);
  app.put("/api/project/user/:userId/likes/:imdbId", addMovieToUserLikes);

  function unfollowUser(req, res) {
    var followedId = req.params.followedId;
    var followerId = req.params.followerId;
    userModel
      .unfollowUser(followedId, followerId)
      .then(
        function(doc) {
          res.json(doc)
        },
        function(err) {
          res.status(400).send(err);
        }
      );
  }

  function getFollowersByUserId(req, res) {
    var userId = req.params.userId;
    userModel
      .getFollowersByUserId(userId)
      .then(
        function(doc) {
          res.json(doc)
        },
        function(err) {
          res.status(400).send(err);
        }
      );
  }

  function followUser(req, res) {
    var followedId = req.params.followedId;
    var followerId = req.params.followerId;
    userModel
      .followUser(followedId, followerId)
      .then(
        function(doc) {
          res.json(doc)
        },
        function(err) {
          res.status(400).send(err);
        }
      );
  }

  function findUsersByIds(req, res) {
    var userIds = req.body;
    userModel
      .findUsersByIds(userIds)
      .then(
        function(doc) {
          res.json(doc)
        },
        function(err) {
          res.status(400).send(err);
        }
      );
  }

  function addMovieToUserLikes(req, res) {
    var userId = req.params.userId;
    var imdbId = req.params.imdbId;
    userModel
      .addMovieToUserLikes(userId, imdbId)
      .then(
        function(doc) {
          res.json(doc)
        },
        function(err) {
          res.status(400).send(err);
        }
      );
  }

  function register(req, res) {
    var user = req.body;
    userModel
      .createUser(user)
      .then(
        function(doc) {
          res.json(doc)
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
          res.json(doc)
        },
        function(err) {
          res.status(400).send(err);
        }
      );
  }

  function delegate(req, res) {
    if (req.query.username && req.query.password) {
      login(req, res);
    }
    else if (req.query.username) {
      findUserByUsername(req, res);
    }
    else {
      getAllUsers(req, res);
    }
  }

  function getAllUsers(req, res) {
    userModel
      .getAllUsers()
      .then(
        function(doc) {
          res.json(doc)
        },
        function(err) {
          res.status(400).send(err);
        }
      );
  }

  function findUserByUsername(req, res) {
    var username = req.query.username;
    userModel
      .findUserByUsername(username)
      .then(
        function(doc) {
          res.json(doc)
        },
        function(err) {
          res.status(400).send(err);
        }
      );
  }

  function login(req, res) {
    var credentials = {
        username: req.query.username,
        password: req.query.password
    };

    userModel
      .findUserByCredentials(credentials)
      .then(
        function(doc) {
          console.log(doc);
          res.json(doc)
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
          res.json(doc)
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
          res.json(doc)
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