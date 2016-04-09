(function(){
  "use strict";

  angular
    .module("FreshPotatoes")
    .controller("MovieController", MovieController);

  function MovieController($rootScope, $location, OmdbService, MovieService, UserService) {
    var vm = this;
    var detailsAreShowing = 0;

    vm.search = search;
    vm.toggleDetails = toggleDetails;
    vm.addMovie = addMovie;
    vm.deleteMovie = deleteMovie;
    vm.selectMovie = selectMovie;
    vm.updateMovie = updateMovie;
    vm.favoriteMovie = favoriteMovie;
    vm.movies = [];

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
        plot: vm.editMovieDescription,
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

    function deleteMovie(movie, index) {
      var deleteId = movie.imdbid ? movie.imdbid : movie._id;

      MovieService
        .deleteMovie(deleteId)
        .then(function(response) {
          vm.movies.splice(index, 1);
        });
    }

    function updateMovie(id) {

      var movie = {
        imdbid: vm.editID,
        title: vm.editMovieTitle,
        poster: vm.editMoviePoster
      };

      MovieService
        .updateMovie(vm.editID, movie)
        .then(function(response) {
          if (response.data) {
            for (var i = 0; i < vm.movies.length; i++) {
              if (vm.movies[i].imdbid == id) {
                vm.movies[i].title = movie.title;
                vm.movies[i].poster = movie.poster;
              }
            }
          }
        });
    }

    function favoriteMovie(index) {
      var movie = vm.movies[index];
      var favoriteId = movie.imdbid ? movie.imdbid : movie._id;
      MovieService
        .userLikesMovie($rootScope.currentUser._id, movie)
        .then(function(response) {
          if (response.data) {
            vm.numLikes = response.data.likes.length;
          }
        });

      UserService
        .addMovieToUserLikes($rootScope.currentUser._id, favoriteId)
        .then(function(response) {
          if (response.data) {
            console.log("Movie added to your favorites!");
          }
        });
    }

    function selectMovie(index) {
      vm.editID = vm.movies[index].imdbid;
      vm.editMoviePoster = vm.movies[index].poster;
      vm.editMovieTitle = vm.movies[index].title;
      vm.editMovieDescription = vm.movies[index].Plot;
      vm.editMovieYear = parseInt(vm.movies[index].year, 10);
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

    /**
     * Thanks to Gist - gonchub for code snippet
     * Sanitizes a given JSON/Javascript object's keys to lowercase
     */
    function keysToLowerCase(obj) {
      if (!typeof(obj) === "object" || typeof(obj) === "string" || typeof(obj) === "number" || typeof(obj) === "boolean") {
          return obj;
      }
      var keys = Object.keys(obj);
      var n = keys.length;
      var lowKey;
      while (n--) {
          var key = keys[n];
          if (key === (lowKey = key.toLowerCase()))
              continue;
          obj[lowKey] = keysToLowerCase(obj[key]);
          delete obj[key];
      }
      return (obj);
    }

    function renderSearchResults(response) {
      if (response.Response == "False") {
        vm.movies = [];

        MovieService
          .getMoviesByTitle($rootScope.lastSearched)
          .then(function(res) {
            if (res.data) {
              vm.movies = vm.movies.concat(res.data);
            }
          });
      }
      else {
        // Sanitize keys to conform to how database fields are laid out
        for (var i = 0; i < response.Search.length; i++) {
          keysToLowerCase(response.Search[i]);
        }

        MovieService
          .getMoviesByTitle($rootScope.lastSearched)
          .then(function(res) {
            if (res.data) {
              // First generate array of movie IDs fetched from OMDB
              var movieIds = response.Search.map(function(m) {
                return m.imdbid;
              });
              
              // Then find duplicates that match OMDB result set and filter them out
              var movies = res.data.filter(function(m) {
                return movieIds.indexOf(m.imdbid) < 0; 
              });

              // Merge external and local results together, again allowing no duplicates
              vm.movies = response.Search;
              if ($rootScope.currentPage == 1) {
                vm.movies = vm.movies.concat(movies);
              }
            }
          });
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
      vm.title = response.title;
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