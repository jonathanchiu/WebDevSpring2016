(function() {
  "use strict";

  angular
    .module("FreshPotatoes")
    .factory("MovieService", MovieService);

  function MovieService($http) {
    var api = {
      userLikesMovie: userLikesMovie,
      findUserLikes: findUserLikes,
      createMovie: createMovie,
      deleteMovie: deleteMovie,
      getMovieById: getMovieById
    };
    return api;

    function findUserLikes(imdbID) {
      return $http.get("/api/project/movie/" + imdbID + "/user");
    }

    function deleteMovie(id) {
      return $http.delete("/api/project/movie/" + id);
    }

    function getMovieById(id) {
      return $http.get("/api/project/movie/" + id);
    }

    function createMovie(movie) {
      return $http.post("/api/project/movie", movie);
    }

    function userLikesMovie(userId, movie) {
      return $http.post("/api/project/user/"+ userId + "/movie/" + movie.imdbID, movie);
    }
  }
})();