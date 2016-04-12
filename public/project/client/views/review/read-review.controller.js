(function(){
  "use strict";

  angular
    .module("FreshPotatoes")
    .controller("ReadReviewController", ReadReviewController);

  function ReadReviewController($routeParams, $route, $rootScope, $location, ReviewService) {
    var vm = this;

    vm.imdbid = $routeParams.id;
    vm.init = init;
    vm.deleteReview = deleteReview;
    vm.selectReview = selectReview;
    vm.createReview = createReview;
    vm.updateReview = updateReview;

    function init() {
      console.log(vm.imdbid);
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
        content: vm.reviewContentSubmission
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
        imdbid: vm.imdbid,
        title: vm.reviewTitleSubmission,
        author: vm.reviewAuthorSubmission,
        content: vm.reviewContentSubmission
      };

      ReviewService
        .createReview(newReview)
        .then(function(response) {
          if (response.data) {
            $route.reload();
          }
        });
    }
  }
})();