(function(){
  "use strict";

  angular
    .module("FreshPotatoes")
    .controller("WriteReviewController", WriteReviewController);

  function WriteReviewController($routeParams, $q, $rootScope, $location, ReviewService) {
    var vm = this;

    vm.imdbid = $routeParams.id;
    vm.createReview = createReview;
    vm.writeReview = writeReview;

    function writeReview() {
      var newReview = {
        imdbid: vm.imdbid,
        title: vm.reviewTitle,
        author: $rootScope.currentUser._id,
        content: vm.reviewContent,
        edited: new Date().toISOString(),
        created: new Date().toISOString()
      };

      ReviewService
        .createReview(newReview)
        .then(function(response) {
          if (response.data) {
            $location.url("/read-review/" + vm.imdbid);
          }
        });
    }

    function createReview() {
      var newReview = {
        imdbID: vm.imdbid,
        title: vm.reviewTitleSubmission,
        author: vm.reviewAuthorSubmission,
        content: vm.reviewContentSubmission,
        edited: new Date().toISOString(),
        created: new Date().toISOString()
      };

      ReviewService
        .createReview(newReview)
        .then(function(response) {
          if (response.data) {
          }
        });
    }
  }
})();