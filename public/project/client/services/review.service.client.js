(function() {
  "use strict";

  angular
    .module("FreshPotatoes")
    .factory("ReviewService", ReviewService);

  function ReviewService($http) {

    function getReviewsByMovieId(imdbId) {
      return $http.get("/api/project/movie/" + imdbId + "/review");
    }

    function getReviewById(id) {
      return $http.get("/api/project/review/" + id);
    }

    function getReviewsByUserId(userId) {
      return $http.get("/api/project/user/" + userId + "/review");
    }

    function createReview(review) {
      return $http.post("/api/project/review/", review);
    }

    function updateReview(reviewId, review) {
      return $http.put("/api/project/review/" + reviewId, review);
    }

    function deleteReviewById(reviewId) {
      return $http.delete("/api/project/review/" + reviewId);
    }

    var service = {
      createReview: createReview,
      updateReview: updateReview,
      deleteReviewById: deleteReviewById,
      getReviewsByUserId: getReviewsByUserId,
      getReviewById: getReviewById,
      getReviewsByMovieId: getReviewsByMovieId
    };

    return service;
  }
})();