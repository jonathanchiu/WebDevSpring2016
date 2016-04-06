var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var userModel = require('../models/user.model.js');

module.exports = function(app, userModel) {
  var auth = authorized;

  app.post("/api/assignment/login", passport.authenticate('local'), login);
  app.post("/api/assignment/user", register);
  app.get("/api/assignment/user", delegate);
  app.get("/api/assignment/user/:id", profile);
  app.put("/api/assignment/user/:userId/admin", updateUserByIdAdmin);
  app.get("/api/user", auth, getAllUsers);
  app.put("/api/assignment/user/:userId", auth, updateUserById);
  app.delete("/api/assignment/user/:userId", auth, deleteUserById);
  app.post("/api/assignment/logout", logout);
  app.get("/api/loggedin", loggedin);

  passport.use(new LocalStrategy(localStrategy));
  passport.serializeUser(serializeUser);
  passport.deserializeUser(deserializeUser);

  function loggedin(req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
  }

  function localStrategy(username, password, done) {
    userModel
      .findUserByCredentials({username: username, password: password})
      .then(
        function(user) {
          if (!user) { return done(null, false); }
            return done(null, user);
        },
        function(err) {
          if (err) { return done(err); }
        }
        );
    }

  function serializeUser(user, done) {
    done(null, user);
  }

  function deserializeUser(user, done) {
    userModel
      .findUserById(user._id)
      .then(
        function(user) {
          done(null, user);
        },
        function(err) {
          done(err, null);
        }
      );
  }

  function login(req, res) {
    var user = req.user;
    res.json(user);
  }

  function logout(req, res) {
    req.logOut();
    res.send(200);
  }

  function register(req, res) {
    var newUser = req.body;
    if (newUser.roles.length === 0) {
      newUser.roles = ['student'];
    }

    userModel
      .findUserByUsername(newUser.username)
      .then(
        function(user) {
            if (user.length) {
              res.json(null);
            } 
            else {
              return userModel.createUser(newUser);
            }
        },
        function(err) {
          res.status(400).send(err);
        }
      )
      .then(
        function(user) {
          if (user) {
            req.login(user, function(err) {
                if (err) {
                  res.status(400).send(err);
                } 
                else {
                  res.json(user);
                }
            });
          }
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
  }

  function getAllUsers(req, res) {
    var users = userModel
                  .getAllUsers()
                  .then(
                    function(doc) {
                      res.json(doc);
                    },
                    function(err) {
                      res.status(400).send(err);
                    }
                  );
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

  function updateUserByIdAdmin(req, res) {
    var userId = req.params.userId;
    var user = req.body;
    console.log("USER TO UPDATE TO");
    console.log(user);
    userModel
      .updateUserByIdAdmin(userId, user)
      .then(
        function(doc) {
          console.log("UPDATED USER");
          console.log(doc);
          return userModel.getAllUsers();
        },
        function(err) {
          res.status(400).send(err);
        }
      )
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

  function isAdmin(user) {
    return (user.roles.indexOf("admin") > -1);
  }

  function authorized(req, res, next) {
    if (!req.isAuthenticated()) {
      res.send(401);
    } 
    else {
      next();
    }
  }
};