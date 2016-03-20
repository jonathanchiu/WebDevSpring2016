var mock = require("./movie.mock.json");

module.exports = function(uuid) {
  var api = {
    getAllMovies: getAllMovies,
    getMoviesByIds: getMoviesByIds,
    getMovieById: getMovieById,
    createMovie: createMovie,
    userLikesMovie: userLikesMovie,
    deleteMovieById: deleteMovieById
  };
  return api;

  function deleteMovieById(id) {
    for (var i = 0; i < mock.length; i++) {
      if (mock[i].imdbID === id) {
        mock.splice(i, 1);
        return mock;
      }
    }
  }

  function getAllMovies() {
    return mock;
  }

  function getMoviesByIds(ids) {
    var movies = [];
    for (var m in mock) {
      if (ids.indexOf(mock[m].imdbID) > 0) {
        movies.push(mock[m]);
      }
    }
    return movies;
  }

  function getMovieById(id) {
    for (var m in mock) {
      if (mock[m].imdbID === id) {
        return mock[m];
      }
    }
    return null;
  }

  function createMovie(movie) {
    movie.imdbID = uuid.v4();
    mock.push(movie);
    return movie;
  }

  function userLikesMovie(userId, movie) {
    var ids = mock.map(function(m) {
      return m.imdbID;
    });

    if (ids.indexOf(movie.imdbID) < 0) {
      var newMovie = {
        imdbID: movie.imdbID,
        title: movie.Title,
        poster: movie.Poster,
        likes: [],
        reviews: []
      };
      newMovie.likes.push(userId);
      mock.push(newMovie);
      return newMovie;
    }
    else {
      for (var m in mock) {
        if (mock[m].imdbID === movie.imdbID) {
          mock[m].likes.push(userId);
          return mock[m];
        }
      }
    }
  }
}