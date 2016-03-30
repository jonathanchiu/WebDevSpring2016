var mongoose = require("mongoose");

module.exports = function () {

  var FieldSchema = require("./field.schema.server.js");

  var FormSchema = mongoose.Schema({
    userId: String,
    title: String,
    fields: [{type: mongoose.Schema.Types.Object, ref: 'Field'}],
    created: {
      type: Date,
      default: Date.now
    },
    updated: {
      type: Date,
      default: Date.now
    }
  }, {collection: 'form'});
  return FormSchema;
};