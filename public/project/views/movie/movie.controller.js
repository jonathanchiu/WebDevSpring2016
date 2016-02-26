(function(){
  "use strict";

  angular
    .module("FreshPotatoes")
    .controller("MovieController", MovieController);

  function MovieController($scope, $rootScope, $location, MovieService) {

    $scope.search = search;
    $scope.toggleDetails = toggleDetails;
    $scope.getNextPage = getNextPage;
    $scope.getPrevPage = getPrevPage;
    $rootScope.hideMessage = true;
    $rootScope.hideTable = false;

    function search() {
      $rootScope.lastSearched = $scope.searchedMovie;
      $rootScope.currentPage = 1;
      $location.url("/search");

      MovieService
        .searchMovie($scope.lastSearched, $rootScope.currentPage)
        .then(renderSearchResults, renderError);
    }

    function getNextPage() {
      $scope.activePosition = -1;
      $rootScope.currentPage += 1;

      MovieService
        .searchMovie($rootScope.lastSearched, $rootScope.currentPage)
        .then(renderSearchResults, renderError);
    }

    function getPrevPage() {
      $scope.activePosition = -1;
      $rootScope.currentPage -= 1;

      MovieService
        .searchMovie($rootScope.lastSearched, $rootScope.currentPage)
        .then(renderSearchResults, renderError);
    }

    function renderSearchResults(response) {
      if (response.Response == "False") {
        $rootScope.hideTable = true;
        $rootScope.hideMessage = false;
      }
      else {
        $rootScope.hideMessage = true;
        $rootScope.hideTable = false;
        $rootScope.movies = response.Search;
      }
    }

    function renderError(response) {
      $scope.error = "Unable to search for that movie!";
    }

    function toggleDetails(index, id) {
      $scope.activePosition = $scope.activePosition == index ? -1 : index;
      MovieService
        .getMovieDetails(id)
        .then(renderMovieDetails, renderError);
    }

    function renderMovieDetails(response) {
      $scope.title = response.Title;
      $scope.year = response.Year;
      $scope.rated = response.Rated;
      $scope.plot = response.Plot;
      $scope.actors = response.Actors;
      $scope.genre = response.Genre;
      $scope.director = response.Director;
      $scope.genre = response.Genre;
    }
  }
})();