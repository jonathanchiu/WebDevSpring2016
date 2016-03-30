var mock = require("./form.mock.json");
var fieldTemplates = require("./field-templates.mock.json");

module.exports = function(uuid, db, mongoose) {

  var FieldSchema = require("./field.schema.server.js")();
  var Field = mongoose.model("Field", FieldSchema);

  function getFieldTemplateType(fieldType) {
    return Field
            .findOne({type: fieldType.toUpperCase()})
            .then(function(doc) {
              console.log(doc);
              return doc;
            });
  }

  var api = {
    getFieldTemplateType: getFieldTemplateType
  };
  return api
};