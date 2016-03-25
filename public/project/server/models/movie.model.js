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
      return m.imdbid;
    });

    if (ids.indexOf(id) < 0) {
      mock.push(movie);
      return movie;
    }
    else {
      for (var m in mock) {
        if (mock[m].imdbid === id) {
          mock[m].title = movie.title;
          mock[m].poster = movie.poster;
          return mock[m];
        }
      }
    }
  }

  function deleteMovieById(id) {
    for (var i = 0; i < mock.length; i++) {
      if (mock[i].imdbid === id) {
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
      if (ids.indexOf(mock[m].imdbid) > 0) {
        movies.push(mock[m]);
      }
    }
    return movies;
  }

  function getMovieById(id) {
    for (var m in mock) {
      if (mock[m].imdbid === id) {
        return mock[m];
      }
    }
    return null;
  }

  function createMovie(movie) {
    movie.imdbid = uuid.v4();
    mock.push(movie);
    return movie;
  }

  function userLikesMovie(userId, movie) {
    var ids = mock.map(function(m) {
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
      newMovie.likes.push(parseInt(userId, 10));
      mock.push(newMovie);
      return newMovie.likes;
    }
    else {
      for (var m in mock) {
        if (mock[m].imdbid === movie.imdbid) {
          if (mock[m].likes.indexOf(parseInt(userId, 10)) < 0) {
            mock[m].likes.push(userId);
          }
          return mock[m].likes;
        }
      }
    }
  }
}