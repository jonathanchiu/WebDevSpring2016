(function() {
  "use strict";

  angular
    .module("FreshPotatoes")
    .factory("MovieService", MovieService);

  function MovieService($http) {

    function searchMovie(searchedMovie) {
      var url = "http://www.omdbapi.com/?s=MOVIE";
      url = url.replace("MOVIE", searchedMovie);

      return $http.get(url)
                  .then(function(result) {
                    return result.data;
                  });
    }

    var service = {
      searchMovie: searchMovie
    };

    return service;
  }
})();