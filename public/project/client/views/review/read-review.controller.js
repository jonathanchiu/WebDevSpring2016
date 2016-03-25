(function(){
  "use strict";

  angular
    .module("FreshPotatoes")
    .controller("ReadReviewController", ReadReviewController);

  function ReadReviewController($routeParams, $q, $rootScope, $location, ReviewService) {
    var vm = this;

    vm.imdbid = $routeParams.id;
    vm.init = init;
    vm.deleteReview = deleteReview;
    vm.selectReview = selectReview;
    vm.updateReview = updateReview;

    function init() {
      ReviewService
        .getReviewsByMovieId(vm.imdbid)
        .then(function(response) {
          if (response.data) {
            console.log(response.data);
            vm.reviews = response.data;
          }
        });
    }
    init();

    function deleteReview(id, index) {
      ReviewService
        .deleteReviewById(id)
        .then(function(response) {
          if (response.data) {
            vm.reviews.splice(index, 1);
          }
        });
    }

    function selectReview(index) {
      vm.selectedReview = vm.reviews[index];
      vm.reviewTitleSubmission = vm.selectedReview.title;
      vm.reviewCreatedSubmission = vm.selectedReview.created;
      vm.reviewAuthorSubmission = vm.selectedReview.author;
      vm.reviewContentSubmission = vm.selectedReview.content;
    }

    function updateReview() {
      var updatedReview = {
        title: vm.reviewTitleSubmission,
        author: vm.reviewAuthorSubmission,
        content: vm.reviewContentSubmission,
        edited: new Date().toISOString().toISOString()
      };

      ReviewService
        .updateReview(vm.selectedReview._id, updatedReview)
        .then(function(response) {
          if (response.data) {
            init();
          }
        });
    }
  }
})();