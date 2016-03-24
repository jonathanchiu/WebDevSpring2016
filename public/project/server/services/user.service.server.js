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
    var followers = userModel.unfollowUser(followedId, followerId);
    res.json(followers);
  }

  function getFollowersByUserId(req, res) {
    var userId = req.params.userId;
    var followers = userModel.getFollowersByUserId(userId);
    res.json(followers);
  }

  function followUser(req, res) {
    var followedId = req.params.followedId;
    var followerId = req.params.followerId;
    var followers = userModel.followUser(followedId, followerId);
    res.json(followers);
  }

  function findUsersByIds(req, res) {
    var userIds = req.body;
    var users = userModel.findUsersByIds(userIds);
    res.json(users);
  }

  function addMovieToUserLikes(req, res) {
    var userId = req.params.userId;
    var imdbId = req.params.imdbid;
    var likes = userModel.addMovieToUserLikes(userId, imdbId);
    res.json(likes);
  }

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