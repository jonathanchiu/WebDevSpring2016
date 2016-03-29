var mock = require("./form.mock.json");
var fieldTemplates = require("./field-templates.mock.json");

module.exports = function(uuid, db, mongoose) {

  var FieldSchema = require("./field.schema.server.js")();
  var Field = mongoose.model("Field", FieldSchema);

  var api = {

  };
  return api
};