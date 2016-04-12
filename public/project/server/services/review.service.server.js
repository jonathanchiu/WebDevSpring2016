module.exports = function(app, reviewModel) {
  app.get("/api/project/review/:id", getReviewById);
  app.get("/api/project/user/:userId/review", getReviewsByUserId);
  app.get("/api/project/movie/:movieId/review", getReviewsByMovieId);
  app.post("/api/project/review/", createReview);
  app.put("/api/project/review/:id", updateReview);
  app.delete("/api/project/review/:id", deleteReviewById);

  function getReviewById(req, res) {
    var id = req.params.id;
    reviewModel
      .getReviewById(id)
      .then(
        function(doc) {
          res.json(doc);
        },
        function(err) {
          res.status(400).send(err);
        }
      );
  }

  function getReviewsByUserId(req, res) {
    var userId = req.params.userId;
    reviewModel
      .getReviewsByUserId(userId)
      .then(
        function(doc) {
          res.json(doc);
        },
        function(err) {
          res.status(400).send(err);
        }
      );
  }

  function getReviewsByMovieId(req, res) {
    var movieId = req.params.movieId;
    console.log("GETTIN REVIEWS FOR: " + movieId);
    reviewModel
      .getReviewsByMovieId(movieId)
      .then(
        function(doc) {
          res.json(doc);
        },
        function(err) {
          res.status(400).send(err);
        }
      );
  }

  function createReview(req, res) {
    var review = req.body;
    reviewModel
      .createReview(review)
      .then(
        function(doc) {
          res.json(doc);
        },
        function(err) {
          res.status(400).send(err);
        }
      );
  }

  function deleteReviewById(req, res) {
    var id = req.params.id;
    reviewModel
      .deleteReviewById(id)
      .then(
        function(doc) {
          res.json(doc);
        },
        function(err) {
          res.status(400).send(err);
        }
      );
  }

  function updateReview(req, res) {
    var review = req.body;
    var reviewId = req.params.id
    reviewModel
      .updateReview(reviewId, review)
      .then(
        function(doc) {
          res.json(doc);
        },
        function(err) {
          res.status(400).send(err);
        }
      );
  }
}