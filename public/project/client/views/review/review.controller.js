(function(){
  "use strict";

  angular
    .module("FreshPotatoes")
    .controller("ReviewController", ReviewController);

  function ReviewController($scope, $routeParams, ReviewService) {
    var vm = this;

    vm.id = $routeParams.id;
    vm.deleteReview = deleteReview;
    vm.selectReview = selectReview;
    vm.updateReview = updateReview;
    vm.addReview = addReview;

    ReviewService.findAllReviewsForMovie(vm.id, function(response) {
      vm.reviews = response;
    });

    function deleteReview(index) {
      vm.reviews.splice(index, 1);
    }

    function selectReview(index) {
      vm.selectedReview = vm.reviews[index];
      vm.reviewTitleSubmission = vm.selectedReview.title;
      vm.reviewCreatedSubmission = vm.selectedReview.created;
      vm.reviewAuthorSubmission = vm.selectedReview.author;
      vm.reviewContentSubmission = vm.selectedReview.content;
    }

    function updateReview() {
      for (var i = 0; i < vm.reviews.length; i++) {
        if (vm.reviews[i].id === vm.selectedReview.id) {
          vm.reviews[i].title = vm.reviewTitleSubmission;
          vm.reviews[i].created = vm.reviewCreatedSubmission;
          vm.reviews[i].author = vm.reviewAuthorSubmission;
          vm.reviews[i].content = vm.reviewContentSubmission;
          return;
        }
      }
    }

    function addReview() {
      var newReview = {
        imdb_id: vm.id,
        title: vm.reviewTitleSubmission,
        author: vm.reviewAuthorSubmission,
        content: vm.reviewContentSubmission,
        edited: new Date(),
        created: new Date()
      };

      ReviewService.createReview(newReview, function(response) {
        vm.reviews = response;
      });
    }
  }
})();