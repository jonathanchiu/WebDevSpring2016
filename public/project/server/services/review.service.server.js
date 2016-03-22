module.exports = function(app, reviewModel) {
  app.get("/api/project/review/:id", getReviewById);
  app.get("/api/project/user/:userId/review", getReviewsByUserId);
  app.get("/api/project/movie/:movieId/review", getReviewsByMovieId);
  app.post("/api/project/review/", createReview);
  app.put("/api/project/review/:id", updateReview);
  app.delete("/api/project/review/:id", deleteReviewById);

  function getReviewById(req, res) {
    var id = req.params.id;
    var review = reviewModel.getReviewById(id);
    res.json(review);
  }

  function getReviewsByUserId(req, res) {
    var userId = req.params.userId;
    var reviews = reviewModel.getReviewsByUserId(userId);
    res.json(reviews);
  }

  function getReviewsByMovieId(req, res) {
    var movieId = req.params.movieId;
    var reviews = reviewModel.getReviewsByMovieId(movieId);
    res.json(reviews);
  }

  function createReview(req, res) {
    var review = req.body;
    var returnedReview = reviewModel.createReview(review);
    res.json(returnedReview);
  }

  function deleteReviewById(req, res) {
    var id = req.params.id;
    var reviews = reviewModel.deleteReviewById(id);
    res.json(reviews);
  }

  function updateReview(req, res) {
    var review = req.body;
    var reviewId = req.params.id
    var reviews = reviewModel.updateReview(reviewId, review);
    res.json(reviews);
  }
}