var mock = require("./review.mock.json");

module.exports = function(uuid, db, mongoose) {

  var ReviewSchema = require("./review.schema.server.js")();
  var Review = mongoose.model("ProjectReview", ReviewSchema);

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
    return Review
            .find({})
            .then(function(doc) {
              return doc;
            });
  }

  function getReviewById(reviewId) {
    return Review
            .findById(reviewId)
            .then(function(doc) {
              return doc;
            });
  }

  function getReviewsByUserId(userId) {
    return Review
            .find({author: userId})
            .then(function(doc) {
              return doc;
            });
  }

  function getReviewsByMovieId(imdbid) {
    return Review
            .find({imdbid: imdbid})
            .then(function(doc) {
              return doc;
            });
  }

  function deleteReviewById(reviewId) {
    return Review
            .findById(reviewId)
            .then(function(doc) {
              doc.remove();
              return getAllReviews();
            }); 
  }

  function createReview(review) {
    delete review._id;

    return Review
          .create(review)
          .then(function(doc) {
            console.log("IMDB ID");
            console.log(doc.imdbid);
            if (!doc.imdbid) {
              doc.imdbid = doc._id;
            }
            console.log(doc);
            return doc.save();
          },
          function(err) {
            console.log(err);
          });
  }

  function updateReview(reviewId, review) {
    return Review.findOneAndUpdate(
      {_id: reviewId},
      {$set: review},
      {upsert: true}
    )
    .then(function(doc) {
      console.log(doc);
      return doc;
    });
  }
}