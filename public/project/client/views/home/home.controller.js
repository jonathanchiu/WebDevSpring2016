(function(){
  "use strict";

  angular
    .module("FreshPotatoes")
    .controller("HomeController", HomeController);

  function HomeController($location, $anchorScroll, MovieService) {
    var vm = this;
    vm.numTopMovies = 8;
    vm.noPoster = 'images/saitama.jpeg';
    vm.scrollToTopMovies = scrollToTopMovies;

    function init() {
      MovieService
        .getTopMovies(vm.numTopMovies)
        .then(function(response) {
          if (response.data) {
            vm.topMovies = response.data;
          }
        });
    }
    init();

    function scrollToTopMovies() {
      if ($location.hash() !== "top-movies") {
        $location.hash("top-movies");
      }
      else {
        $anchorScroll();
      }
    }
  }
})();