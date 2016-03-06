module.exports = function(app, userModel) {

    // Creates a new user embedded in the body of the request, and responds with an array of all users
    app.post("/api/assignment/user", register);
    // Responds with an array of all users
    app.get("/api/assignment/user", findAllUsers);
    // Responds with a single user whose id property is
    // equal to the id path parameter
    app.get("/api/assignment/user/:id", findUserById);
    // Responds with a single user whose username property is equal to the
    // username path parameter
    app.get("/api/assignment/user?username=username", findUserByUsername);
    // Responds with a single user whose username property is equal to the
    // username path parameter and its password is equal to the password
    // path parameter
    app.get("/api/assignment/user?username=username&password=password", login);
    // updates an existing user whose id property is equal to the id path
    // parameter. The new properties are set to the values in the user
    // object embedded in the HTTP request. Responds with an array of all users
    app.put("/api/assignment/user/:id", updateUserById);
    // Removes an existing user whose id property is equal to the id path
    // parameter. Responds with an array of all users
    app.delete("/api/assignment/user/:id", deleteUserById);
    app.post("/api/project/omdb/logout", logout);

    function register(req, res) {
      var user = req.body;
      user = userModel.createUser(user);
      res.json(user);
    }

    function login(req, res) {
        var credentials = req.body;
        var user = userModel.findUserByCredentials(credentials);
        res.json(user);
    }

    function logout(req, res) {
        res.send(200);
    }
}