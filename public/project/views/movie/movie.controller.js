(function(){
  "use strict";

  angular
    .module("FreshPotatoes")
    .controller("MovieController", MovieController);

  function MovieController($scope, $rootScope, $location, MovieService) {

    $scope.search = search;

    function search() {
      $location.url("/search");
      MovieService
        .searchMovie($scope.searchedMovie)
        .then(renderSearchResults, renderError);
    }

    function renderSearchResults(response) {
      $rootScope.movies = response.Search;
    }

    function renderError(response) {
      $scope.error = "Unable to search for that movie!";
    }
  }
})();