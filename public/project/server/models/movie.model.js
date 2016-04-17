var mock = require("./movie.mock.json");

module.exports = function(uuid, db, mongoose) {

  var MovieSchema = require("./movie.schema.server.js")();
  var Movie = mongoose.model("ProjectMovie", MovieSchema);

  var api = {
    getAllMovies: getAllMovies,
    getMoviesByTitle: getMoviesByTitle,
    getMoviesByIds: getMoviesByIds,
    getMovieById: getMovieById,
    createMovie: createMovie,
    userLikesMovie: userLikesMovie,
    deleteMovieById: deleteMovieById,
    updateMovie: updateMovie,
    getTopMovies: getTopMovies
  };
  return api;

  function getMoviesByTitle(title) {
    var regex = new RegExp(title);
    return Movie
            .find({title: regex})
            .then(function(doc) {
              return doc;
            });
  }

  function getTopMovies(x) {
    return Movie
            .find({})
            .then(function(doc) {
              return doc;
            });
    // var mockCopy = mock.sort(function(m1, m2) {
    //   return m2.likes.length - m1.likes.length;
    // });

    // var topMovies = [];

    // for (var i = 0; i < x; i++) {
    //   topMovies.push(mockCopy[i]);
    // }
    // return topMovies;
  }

  function updateMovie(id, movie) {
    return Movie.findOneAndUpdate(
      {imdbid: id},
      {$set: movie},
      {upsert: true}
    )
    .then(function(doc) {
      return doc;
    });
  }

  function deleteMovieById(id) {
    return Movie
            .findOne({$or: [
              // We have an or because it can either be a locally created movie or one from OMDB
              {imdbid: id},
              {_id: id}
            ]})
            .then(function(doc) {
              doc.remove();
              return getAllMovies();
            });
  }

  function getAllMovies() {
    return Movie.find({})
          .then(function(doc) {
            return doc;
          });
  }

  function getMoviesByIds(ids) {
    return Movie
            .find({ "imdbid": { "$in": ids }})
            .then(function(doc) {
              return doc;
            });
  }

  function getMovieById(id) {
    return Movie
            .findOne({imdbid: id})
            .then(function(doc) {
              return doc;
            });
  }

  function createMovie(movie) {
    delete movie._id;
    return Movie.create(movie)
          .then(function(doc) {
            
            if (!doc.imdbid) {
              doc.imdbid = doc._id;
            }
            return doc.save();
          },
          function(err) {
          });
  }

  function userLikesMovie(userId, movie) {
    return Movie
      .find({})
      .then(function(doc) {
        var ids = doc.map(function(m) {
          return m.imdbid;
        });

        if (ids.indexOf(movie.imdbid) < 0) {
          var newMovie = {
            imdbid: movie.imdbid,
            title: movie.title,
            poster: movie.poster,
            likes: [],
            reviews: []
          };
          newMovie.likes.push(userId);
          return createMovie(newMovie);
        }
        else {
          Movie
            .findOne({imdbid: movie.imdbid})
            .then(function(doc) {
              if (doc.likes.indexOf(userId) < 0) {
                doc.likes.push(userId);
              }
              return doc.save();
            });
        }
      });
  }
}