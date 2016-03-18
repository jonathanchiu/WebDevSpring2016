(function(){
  "use strict";

  angular
    .module("FreshPotatoes")
    .controller("MovieController", MovieController);

  function MovieController($scope, $rootScope, $location, MovieService) {
    var vm = this;

    vm.search = search;
    vm.toggleDetails = toggleDetails;
    vm.addMovie = addMovie;
    vm.deleteMovie = deleteMovie;
    vm.selectMovie = selectMovie;
    vm.updateMovie = updateMovie;
    vm.favoriteMovie = favoriteMovie;

    vm.getPage = getPage;
    vm.noPoster = 'images/saitama.jpeg';
    $rootScope.hideMessage = true;
    $rootScope.hideTable = false;

    function search() {
      $rootScope.lastSearched = vm.searchedMovie;
      $rootScope.currentPage = 1;

      MovieService
        .searchMovie(vm.searchedMovie, $rootScope.currentPage)
        .then(renderSearchResults, renderError);
    }

    function addMovie() {
      var newMovie = {
        imdbID: vm.editID,
        Poster: vm.editMoviePoster,
        Title: vm.editMovieTitle,
        Year: vm.editMovieYear
      };

      // Prepend newly added movie to current result set
      $rootScope.movies.unshift(newMovie);
    }
    function deleteMovie(index) {
      $rootScope.movies.splice(index, 1);
    }

    function updateMovie() {
      for (var i = 0; i < $rootScope.movies.length; i++) {
        if ($rootScope.movies[i].imdbID === vm.selectedMovie) {
          $rootScope.movies[i].Title = vm.editMovieTitle;
          $rootScope.movies[i].Poster = vm.editMoviePoster;
          $rootScope.movies[i].Year = vm.editMovieYear;
          return;
        }
      }
    }

    function favoriteMovie(index) {
      vm.favoritedMovie = $rootScope.movies[index].imdbID;
    }

    function selectMovie(index) {
      vm.selectedMovie = $rootScope.movies[index].imdbID;
      vm.editMoviePoster = $rootScope.movies[index].Poster;
      vm.editMovieTitle = $rootScope.movies[index].Title;
      vm.editMovieYear = parseInt($rootScope.movies[index].Year, 10);
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
      vm.activePosition = -1;
      // Clears fields for editing/adding a movie
      vm.editMoviePoster = null;
      vm.editMovieTitle = null;
      vm.editMovieYear = null;
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
      vm.error = "Unable to search for that movie!";
    }

    function toggleDetails(index, id) {
      vm.activePosition = vm.activePosition == index ? -1 : index;
      MovieService
        .getMovieDetails(id)
        .then(renderMovieDetails, renderError);
    }

    function renderMovieDetails(response) {
      vm.title = response.Title;
      vm.year = response.Year;
      vm.rated = response.Rated;
      vm.plot = response.Plot;
      vm.actors = response.Actors;
      vm.genre = response.Genre;
      vm.director = response.Director;
      vm.genre = response.Genre;
    }
  }
})();