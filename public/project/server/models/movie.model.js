var mock = require("./movie.mock.json");

module.exports = function(uuid) {
  var api = {
    getAllMovies: getAllMovies,
    getMoviesByIds: getMoviesByIds,
    getMovieById: getMovieById,
    createMovie: createMovie,
    userLikesMovie: userLikesMovie,
    deleteMovieById: deleteMovieById,
    updateMovie: updateMovie,
    getTopMovies: getTopMovies
  };
  return api;

  function getTopMovies(x) {
    var mockCopy = mock.sort(function(m1, m2) {
      return m2.likes.length - m1.likes.length;
    });

    var topMovies = [];

    for (var i = 0; i < x; i++) {
      topMovies.push(mockCopy[i]);
    }
    return topMovies;
  }

  function updateMovie(id, movie) {
    var ids = mock.map(function(m) {
      return m.imdbID;
    });

    if (ids.indexOf(id) < 0) {
      mock.push(movie);
      return movie;
    }
    else {
      for (var m in mock) {
        if (mock[m].imdbID === id) {
          mock[m].title = movie.title;
          mock[m].poster = movie.poster;
          return mock[m];
        }
      }
    }
  }

  function deleteMovieById(id) {
    for (var i = 0; i < mock.length; i++) {
      if (mock[i].imdbID === id) {
        mock.splice(i, 1);
        return mock;
      }
    }
    return null;
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