(function(){
  "use strict";

  angular
    .module("FreshPotatoes")
    .controller("ReviewController", ReviewController);

  function ReviewController($scope, $routeParams, ReviewService) {
    $scope.id = $routeParams.id;

    ReviewService.findAllReviewsForMovie($scope.id, function(response) {
      $scope.reviews = response;
    });
  }
})();