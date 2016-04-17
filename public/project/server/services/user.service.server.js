var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function(app, userModel) {
  var auth = authorized;

  app.put("/api/project/user/:userId", auth, updateUserById);
  app.delete("/api/project/user/:userId", auth, deleteUserById);
  app.get("/api/project/user", delegate);
  app.post("/api/project/login", passport.authenticate('project'), login);
  app.put("/api/project/user/:followedId/follow/:followerId", auth, followUser);
  app.put("/api/project/user/:followedId/unfollow/:followerId", auth, unfollowUser);

  app.post("/api/project/user", register);
  app.get("/api/project/user/:userId/followers", getFollowersByUserId);
  app.get("/api/project/user/:userId", profile);
  app.put("/api/project/users", findUsersByIds);
  app.post("/api/project/user/logout", logout);
  app.put("/api/project/user/:userId/likes/:imdbId", addMovieToUserLikes);
  app.get("/api/project/loggedin", loggedin);
  app.post("/api/project/logout", logout);

  passport.use('project', new LocalStrategy(localStrategy));
  // passport.serializeUser(serializeUser);
  // passport.deserializeUser(deserializeUser);

  function authorized(req, res, next) {
    if (!req.isAuthenticated()) {
      res.send(401);
    } 
    else {
      next();
    }
  }

  function isAdmin(user) {
    if (user.roles.indexOf("admin") > -1) {
      return true
    }
    return false;
  }

  function localStrategy(username, password, done) {
    userModel
      .findUserByCredentials({username: username, password: password})
      .then(
        function(user) {
          console.log("local Strategy");
          console.log(user);
          if (!user) { 
            console.log("user not found");
            return done(null, false); 
          }
            return done(null, user);
        },
        function(err) {
          console.log("user error");
          if (err) { return done(err); }
        }
        );
  }

  // function serializeUser(user, done) {
  //   console.log("serializeUser");
  //   console.log(user);
  //   done(null, user);
  // }

  // function deserializeUser(user, done) {
  //   console.log("deserializeUser");
  //   console.log(user);
  //   userModel
  //     .findUserById(user._id)
  //     .then(
  //       function(user) {
  //         done(null, user);
  //       },
  //       function(err) {
  //         done(err, null);
  //       }
  //     );
  // }

  function loggedin(req, res) {
    console.log("loggedin");
    console.log(req.isAuthenticated());
    res.send(req.isAuthenticated() ? req.user : '0');
  }

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
    if (req.query.username) {
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
    console.log(req.user);
    var user = req.user;
    res.json(user);
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
    req.logOut();
    res.send(200);
  }
};