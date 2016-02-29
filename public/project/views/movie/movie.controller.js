(function(){
  "use strict";

  angular
    .module("FreshPotatoes")
    .controller("MovieController", MovieController);

  function MovieController($scope, $rootScope, $location, MovieService) {

    $scope.search = search;
    $scope.toggleDetails = toggleDetails;
    $scope.addMovie = addMovie;
    $scope.deleteMovie = deleteMovie;
    $scope.selectMovie = selectMovie;
    $scope.updateMovie = updateMovie;
    $scope.favoriteMovie = favoriteMovie;

    $scope.getPage = getPage;
    $scope.noPoster = 'images/saitama.jpeg';
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

    function addMovie() {
      var newMovie = {
        imdbID: $scope.editID,
        Poster: $scope.editMoviePoster,
        Title: $scope.editMovieTitle,
        Year: $scope.editMovieYear
      };

      // Prepend newly added movie to current result set
      $rootScope.movies.unshift(newMovie);
    }
    function deleteMovie(index) {
      $rootScope.movies.splice(index, 1);
    }

    function updateMovie() {
      for (var i = 0; i < $rootScope.movies.length; i++) {
        if ($rootScope.movies[i].imdbID === $scope.selectedMovie) {
          $rootScope.movies[i].Title = $scope.editMovieTitle;
          $rootScope.movies[i].Poster = $scope.editMoviePoster;
          $rootScope.movies[i].Year = $scope.editMovieYear;
          return;
        }
      }
    }

    function favoriteMovie(index) {
      $scope.favoritedMovie = $rootScope.movies[index].imdbID;
    }

    function selectMovie(index) {
      $scope.selectedMovie = $rootScope.movies[index].imdbID;
      $scope.editMoviePoster = $rootScope.movies[index].Poster;
      $scope.editMovieTitle = $rootScope.movies[index].Title;
      $scope.editMovieYear = parseInt($rootScope.movies[index].Year, 10);
    }

    function getPage(page) {
      if (page === "n") {
        $rootScope.currentPage += 1;
      }
      else {
        $rootScope.currentPage -= 1;
      }

      resetViewState();

      MovieService
        .searchMovie($rootScope.lastSearched, $rootScope.currentPage)
        .then(renderSearchResults, renderError);
    }

    function resetViewState() {
      // Reset any expanded details pane to close
      $scope.activePosition = -1;
      // Clears fields for editing/adding a movie
      $scope.editMoviePoster = null;
      $scope.editMovieTitle = null;
      $scope.editMovieYear = null;
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