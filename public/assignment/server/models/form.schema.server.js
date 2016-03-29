var mongoose = require("mongoose");

module.exports = function () {

  var FieldSchema = require("./field.schema.server.js");

  var FormSchema = mongoose.Schema({
    userId: String,
    title: String,
    fields: [FieldSchema],
    created: Date.now,
    updated: Date.now
  }, {collection: 'form'});
  return FormSchema;
};