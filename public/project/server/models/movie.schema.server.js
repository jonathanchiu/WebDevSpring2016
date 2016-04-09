var mongoose = require("mongoose");

module.exports = function () {

  var MovieSchema = mongoose.Schema({
    imdbid: String,
    title: String,
    poster: String,
    likes: [String],
    reviews: [String]
  }, {collection: 'project.movie'});
  return MovieSchema;
};