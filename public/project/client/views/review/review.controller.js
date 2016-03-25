(function(){
  "use strict";

  angular
    .module("FreshPotatoes")
    .controller("ReviewController", ReviewController);

  function ReviewController($routeParams, $q, $rootScope, $location, ReviewService) {
    var vm = this;

    vm.imdbid = $routeParams.id;
    vm.init = init;
    vm.deleteReview = deleteReview;
    vm.selectReview = selectReview;
    vm.updateReview = updateReview;
    vm.createReview = createReview;
    vm.writeReview = writeReview;

    function init() {
      ReviewService
        .getReviewsByMovieId(vm.imdbid)
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

    function writeReview() {
      var newReview = {
        imdbID: vm.imdbid,
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
            vm.reviews.unshift(response.data);
          }
        });
    }
  }
})();