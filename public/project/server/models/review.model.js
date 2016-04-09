var mock = require("./review.mock.json");

module.exports = function(uuid, db, mongoose) {
  var api = {
    getAllReviews: getAllReviews,
    getReviewById: getReviewById,
    getReviewsByUserId: getReviewsByUserId,
    getReviewsByMovieId: getReviewsByMovieId,
    deleteReviewById: deleteReviewById,
    updateReview: updateReview,
    createReview: createReview
  };
  return api;

  function getAllReviews() {
    return mock;
  }

  function getReviewById(reviewId) {
    for (var r in mock) {
      if (mock[r]._id == reviewId) {
        return mock[r];
      }
    }
    return null;
  }

  function getReviewsByUserId(userId) {
    var reviews = [];
    for (var r in mock) {
      if (mock[r].author == userId) {
        reviews.push(mock[r]);
      }
    }
    return reviews;
  }

  function getReviewsByMovieId(imdbId) {
    var reviews = []
    for (var r in mock) {
      if (mock[r].imdbid == imdbId) {
        reviews.push(mock[r]);
      }
    }
    return reviews;
  }

  function deleteReviewById(reviewId) {
    for (var i = 0; i < mock.length; i++) {
      if (mock[i]._id == reviewId) {
        mock.splice(i, 1);
        return mock;
      }
    }
  }

  function createReview(review) {
    review._id = uuid.v4();
    mock.push(review);
    return review;
  }

  function updateReview(reviewId, review) {
    for (var i = 0; i < mock.length; i++) {
      if (mock[i]._id == reviewId) {
        mock[i].title = review.title;
        mock[i].author = review.author;
        mock[i].edited = review.edited;
        mock[i].content = review.content;
      }
    }
    return mock;
  }
}