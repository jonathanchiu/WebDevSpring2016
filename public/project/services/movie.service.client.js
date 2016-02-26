(function() {
  "use strict";

  angular
    .module("FreshPotatoes")
    .factory("MovieService", MovieService);

  function MovieService($http) {

    function searchMovie(searchedMovie, page) {
      var url = "http://www.omdbapi.com/?s=MOVIE&page=PAGE&type=movie";
      url = url.replace("MOVIE", searchedMovie);
      url = url.replace("PAGE", page.toString());

      return $http.get(url)
                  .then(function(result) {
                    return result.data;
                  });
    }

    function getMovieDetails(id) {
      var url = "http://www.omdbapi.com/?i=IMDB_ID&plot=full&r=json";
      url = url.replace("IMDB_ID", id);

      return $http.get(url)
                  .then(function(result) {
                    return result.data;
                  });
    }

    var service = {
      searchMovie: searchMovie,
      getMovieDetails: getMovieDetails
    };

    return service;
  }
})();