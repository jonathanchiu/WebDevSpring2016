(function(){
  "use strict";

  angular
    .module("FreshPotatoes")
    .controller("MovieController", MovieController);

  function MovieController($scope, $rootScope, $location, OmdbService, MovieService) {
    var vm = this;
    var detailsAreShowing = 0;

    vm.search = search;
    vm.toggleDetails = toggleDetails;
    vm.addMovie = addMovie;
    vm.deleteMovie = deleteMovie;
    vm.selectMovie = selectMovie;
    vm.updateMovie = updateMovie;
    vm.favoriteMovie = favoriteMovie;

    vm.getPage = getPage;
    vm.noPoster = 'images/saitama.jpeg';
    vm.hideMessage = true;
    vm.hideTable = false;

    function search() {
      $rootScope.lastSearched = vm.searchedMovie;
      $rootScope.currentPage = 1;

      OmdbService
        .searchMovie(vm.searchedMovie, $rootScope.currentPage)
        .then(renderSearchResults, renderError);
    }

    function addMovie() {
      var newMovie = {
        _id: vm.editID,
        title: vm.editMovieTitle,
        poster: vm.editMoviePoster,
        likes: [],
        reviews: []
      };

      MovieService
        .createMovie(newMovie)
        .then(function(response) {
          if (response.data) {
            vm.movies.unshift(response.data);
          }
        });
    }

    function deleteMovie(id, index) {
      MovieService
        .getMovieById(id)
        .then(function(response) {
          // If movie exists in our own database
          if (response.data) {
            MovieService
              .deleteMovie(function(response) {
                if (response.data) {
                  vm.movies = response.data
                }
              });
          }
          else {
            vm.movies.splice(index, 1);
          }
        });
    }

    function updateMovie(id) {

      var movie = {
        imdbID: vm.editID,
        title: vm.editMovieTitle,
        poster: vm.editMoviePoster
      };

      MovieService
        .updateMovie(vm.editID, movie)
        .then(function(response) {
          if (response.data) {
            console.log(response.data);
            var movie = response.data;

            for (var i = 0; i < vm.movies.length; i++) {
              if (vm.movies[i].imdbID == id) {
                vm.movies[i].title = movie.title;
                vm.movies[i].poster = movie.poster;
                return;
              }
            }
          }
        });
    }

    function favoriteMovie(index) {
      var movie = vm.movies[index];
      MovieService
        .userLikesMovie($rootScope.currentUser._id, movie)
        .then(function(response) {
          if (response.data) {
            vm.numLikes += 1;
          }
        });
    }

    function selectMovie(index) {
      vm.editID = vm.movies[index].imdbID;
      vm.editMoviePoster = vm.movies[index].Poster;
      vm.editMovieTitle = vm.movies[index].Title;
      vm.editMovieYear = parseInt(vm.movies[index].Year, 10);
    }

    function getPage(page) {
      if (page === "n") {
        $rootScope.currentPage += 1;
      }
      else {
        $rootScope.currentPage -= 1;
      }

      resetViewState();

      OmdbService
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
        vm.hideTable = true;
        vm.hideMessage = false;
      }
      else {
        vm.hideMessage = true;
        vm.hideTable = false;
        vm.movies = response.Search;
      }
    }

    function renderError(response) {
      vm.error = "Unable to search for that movie!";
    }

    function toggleDetails(index, id) {
      vm.activePosition = vm.activePosition == index ? -1 : index;

      OmdbService
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

      MovieService
        .getMovieById(response.imdbID)
        .then(function(response) {
          vm.numLikes = response.data ? response.data.likes.length : 0;
        });
    }
  }
})();