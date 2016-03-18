module.exports = function(app, uuid) {
  var userModel = require("./models/user.model.js")(uuid);
  var movieModel = require("./models/movie.model.js")(uuid);
  var reviewModel = require("./models/review.model.js")(uuid);
  var userService = require("./services/user.service.server.js") (app, userModel);
  var movieService = require("./services/movie.service.server.js") (app, movieModel);
  var reviewService = require("./services/review.service.server.js") (app, reviewModel);
};