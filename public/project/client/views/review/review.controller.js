(function(){
  "use strict";

  angular
    .module("FreshPotatoes")
    .controller("ReviewController", ReviewController);

  function ReviewController($scope, $routeParams, ReviewService) {
    $scope.id = $routeParams.id;
    $scope.deleteReview = deleteReview;
    $scope.selectReview = selectReview;
    $scope.updateReview = updateReview;
    $scope.addReview = addReview;

    ReviewService.findAllReviewsForMovie($scope.id, function(response) {
      $scope.reviews = response;
    });

    function deleteReview(index) {
      $scope.reviews.splice(index, 1);
    }

    function selectReview(index) {
      $scope.selectedReview = $scope.reviews[index];
      $scope.reviewTitleSubmission = $scope.selectedReview.title;
      $scope.reviewCreatedSubmission = $scope.selectedReview.created;
      $scope.reviewAuthorSubmission = $scope.selectedReview.author;
      $scope.reviewContentSubmission = $scope.selectedReview.content;
    }

    function updateReview() {
      for (var i = 0; i < $scope.reviews.length; i++) {
        if ($scope.reviews[i].id === $scope.selectedReview.id) {
          $scope.reviews[i].title = $scope.reviewTitleSubmission;
          $scope.reviews[i].created = $scope.reviewCreatedSubmission;
          $scope.reviews[i].author = $scope.reviewAuthorSubmission;
          $scope.reviews[i].content = $scope.reviewContentSubmission;
          return;
        }
      }
    }

    function addReview() {
      var newReview = {
        imdb_id: $scope.id,
        title: $scope.reviewTitleSubmission,
        author: $scope.reviewAuthorSubmission,
        content: $scope.reviewContentSubmission,
        edited: new Date(),
        created: new Date()
      };

      ReviewService.createReview(newReview, function(response) {
        $scope.reviews = response;
      });
    }
  }
})();