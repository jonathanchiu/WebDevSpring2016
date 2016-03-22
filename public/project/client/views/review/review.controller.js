(function(){
  "use strict";

  angular
    .module("FreshPotatoes")
    .controller("ReviewController", ReviewController);

  function ReviewController($routeParams, ReviewService) {
    var vm = this;

    vm.imdbID = $routeParams.id;
    vm.init = init;
    vm.deleteReview = deleteReview;
    vm.selectReview = selectReview;
    vm.updateReview = updateReview;
    vm.createReview = createReview;

    function init() {
      ReviewService
        .getReviewsByMovieId(vm.imdbID)
        .then(function(response) {
          if (response.data) {
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
        edited: new Date()
      };

      ReviewService
        .updateReview(vm.selectedReview._id, updatedReview)
        .then(function(response) {
          if (response.data) {
            init();
          }
        });
    }

    function createReview() {
      var newReview = {
        imdbID: vm.imdbID,
        title: vm.reviewTitleSubmission,
        author: vm.reviewAuthorSubmission,
        content: vm.reviewContentSubmission,
        edited: new Date(),
        created: new Date()
      };

      ReviewService
        .createReview(newReview)
        .then(function(response) {
          if (response.data) {
            vm.reviews.unshift(response.data);
          }
        });
    }
  }
})();