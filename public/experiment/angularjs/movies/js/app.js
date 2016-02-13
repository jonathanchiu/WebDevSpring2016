(function() {
  angular
    .module("MovieAdminApp", [])
    .controller("MovieListController", MovieListController);

  function MovieListController($scope) {
    $scope.movies = [
      {id: 123, title: "Star Wars", director: "JJ Abrams"},
      {id: 234, title: "Avatar", director: "James Cameron"},
      {id: 345, title: "Aliens", director: "James Cameron"}
    ];

    // Event handler declarations
    $scope.addMovie = addMovie;
    $scope.deleteMovie = deleteMovie;
    $scope.selectMovie = selectMovie;
    $scope.updateMovie = updateMovie;

    function addMovie(movie) {
      console.log("addMovie");
      console.log(movie);

      var newMovie = {
        id: movie.id,
        title: movie.title,
        director: movie.director
      };

      // Push the new movie, Angular will automatically update table
      $scope.movies.push(newMovie);
    };

    function deleteMovie(movie) {
      console.log("deleteMovie");

      var index = $scope.movies.indexOf(movie);
      $scope.movies.splice(index, 1);
    };

    var selectedMovieIndex = -1;
    function selectMovie(movie) {
      console.log(movie);
      selectedMovieIndex = $scope.movies.indexOf(movie);

      $scope.movie = {
        id: movie.id,
        title: movie.title,
        director: movie.director
      };
    };

    function updateMovie(movie) {
      if (selectedMovieIndex >= 0) {
        $scope.movies[selectedMovieIndex] = {
          id: movie.id,
          title: movie.title,
          director: movie.director
        };
      }
    };

  }
})();