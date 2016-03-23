module.exports = function(app, movieModel, userModel) {
  app.post("/api/project/user/:userId/movie/:id", userLikesMovie);
  app.get("/api/project/movie/:id/user", findUserLikes);
  app.get("/api/project/movie/:id", getMovieById);
  app.get("/api/project/movie/top/:num", getTopMovies);
  app.post("/api/project/movies/", getMoviesByIds);
  app.post("/api/project/movie/", createMovie);
  app.put("/api/project/movie/:id", updateMovie);
  app.delete("/api/project/movie/:id", deleteMovieById);

  function getTopMovies(req, res) {
    var numMovies = req.params.num;
    var topMovies = movieModel.getTopMovies(parseInt(numMovies, 10));
    res.json(topMovies);
  }

  function getMoviesByIds(req, res) {
    var ids = req.body;
    var movies = movieModel.getMoviesByIds(ids);
    res.json(movies);
  }

  function createMovie(req, res) {
    var movie = req.body;
    movies = movieModel.createMovie(movie);
    res.json(movies);
  }

  function updateMovie(req, res) {
    var movie = req.body;
    var movies = movieModel.updateMovie(movie.imdbID, movie);
    res.json(movies);
  }

  function getMovieById(req, res) {
    var id = req.params.id;
    var movie = movieModel.getMovieById(id);
    res.json(movie);
  }

  function deleteMovieById(req, res) {
    var id = req.params.id;
    var movies = movieModel.deleteMovieById(id);
    res.json(movies);
  }

  function userLikesMovie(req, res) {
    var movieOmdb = req.body;
    var userId = req.params.userId;
    var movieId = req.params.id;
    var movie;

    var movie = movieModel.userLikesMovie(userId, movieOmdb);
    res.json(movie);
  }

  function findUserLikes(req, res) {
    var movieId = req.params.id;

    movieModel
      .getMovieById(movieId)
      .then(function(response) {
        if (response.data) {
          var movie = response.data
          return userModel.findUsersByIds(movie.likes);
        }
      });
  }
}