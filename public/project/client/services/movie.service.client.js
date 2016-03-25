(function() {
  "use strict";

  angular
    .module("FreshPotatoes")
    .factory("MovieService", MovieService);

  function MovieService($http) {
    var api = {
      userLikesMovie: userLikesMovie,
      findUserLikes: findUserLikes,
      getMoviesByTitle: getMoviesByTitle,
      createMovie: createMovie,
      deleteMovie: deleteMovie,
      getMovieById: getMovieById,
      updateMovie: updateMovie,
      getMoviesByIds: getMoviesByIds,
      getTopMovies: getTopMovies
    };
    return api;

    function getMoviesByTitle(title) {
      return $http.get("/api/project/movie/title/" + title);
    }

    function getTopMovies(num) {
      return $http.get("/api/project/movie/top/" + num);
    }

    function getMoviesByIds(ids) {
      return $http.post("/api/project/movies/", ids);
    }

    function updateMovie(id, movie) {
      return $http.put("/api/project/movie/" + id, movie);
    }

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
      return $http.post("/api/project/movie/", movie);
    }

    function userLikesMovie(userId, movie) {
      return $http.post("/api/project/user/"+ userId + "/movie/" + movie.imdbid, movie);
    }
  }
})();