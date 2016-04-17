module.exports = function(app, movieModel, userModel) {
  app.post("/api/project/user/:userId/movie/:id", userLikesMovie);
  app.get("/api/project/movie/:id/user", findUserLikes);
  app.get("/api/project/movie/:id", getMovieById);
  app.get("/api/project/movie/title/:title", getMoviesByTitle);
  app.get("/api/project/movie/top/:num", getTopMovies);
  app.post("/api/project/movies/", getMoviesByIds);
  app.post("/api/project/movie/", createMovie);
  app.put("/api/project/movie/:id", updateMovie);
  app.delete("/api/project/movie/:id", deleteMovieById);

  function getMoviesByTitle(req, res) {
    var title = req.params.title;
    movieModel
      .getMoviesByTitle(title)
      .then(
        function(doc) {
          res.json(doc);
        },
        function(err) {
          res.status(400).send(err);
        }
      );
  }

  function getTopMovies(req, res) {
    var numMovies = req.params.num;
    movieModel
      .getTopMovies(parseInt(numMovies, 10))
      .then(
        function(doc) {
          res.json(doc);
        },
        function(err) {
          res.status(400).send(err);
        }
      );
  }

  function getMoviesByIds(req, res) {
    var ids = req.body;
    movieModel
      .getMoviesByIds(ids)
      .then(
        function(doc) {
          res.json(doc);
        },
        function(err) {
          res.status(400).send(err);
        }
      );
  }

  function createMovie(req, res) {
    var movie = req.body;
    movieModel
      .createMovie(movie)
      .then(
        function(doc) {
          res.json(doc);
        },
        function(err) {
          res.status(400).send(err);
        }
      );
  }

  function updateMovie(req, res) {
    var movie = req.body;
    movieModel
      .updateMovie(movie.imdbid, movie)
      .then(
        function(doc) {
          res.json(doc);
        },
        function(err) {
          res.status(400).send(err);
        }
      );
  }

  function getMovieById(req, res) {
    var id = req.params.id;
    movieModel
      .getMovieById(id)
      .then(
        function(doc) {
          res.json(doc);
        },
        function(err) {
          res.status(400).send(err);
        }
      );
  }

  function deleteMovieById(req, res) {
    var id = req.params.id;
    movieModel
      .deleteMovieById(id)
      .then(
        function(doc) {
          res.json(doc);
        },
        function(err) {
          res.status(400).send(err);
        }
      );
  }

  function userLikesMovie(req, res) {
    var movieOmdb = req.body;
    var userId = req.params.userId;
    var movieId = req.params.id;
    var movie;

    movieModel
      .userLikesMovie(userId, movieOmdb)
      .then(
        function(doc) {
          res.json(doc);
        },
        function(err) {
          res.status(400).send(err);
        }
      );
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