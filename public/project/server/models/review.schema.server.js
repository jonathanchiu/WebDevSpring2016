var mongoose = require("mongoose");

module.exports = function () {

  var ReviewSchema = mongoose.Schema({
    imdbid: String,
    title: String,
    author: String,
    content: String
  }, {collection: 'project.review'});
  return ReviewSchema;
};