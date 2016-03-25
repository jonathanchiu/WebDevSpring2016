(function(){
  "use strict";

  angular
    .module("FreshPotatoes")
    .controller("HomeController", HomeController);

  function HomeController($location, MovieService) {
    var vm = this;
    vm.numTopMovies = 5;

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
  }
})();