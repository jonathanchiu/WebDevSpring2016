module.exports = function(app, uuid, db, mongoose) {
  var userModel = require("./models/user.model.js")(uuid, db, mongoose);
  var formModel = require("./models/form.model.js")(uuid, db, mongoose);
  var userService = require("./services/user.service.server.js") (app, userModel);
  var formService = require("./services/form.service.server.js") (app, formModel);
  var fieldService = require("./services/field.service.server.js") (app, formModel);
};