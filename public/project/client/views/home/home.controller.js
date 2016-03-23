(function(){
  "use strict";

  angular
    .module("FreshPotatoes")
    .controller("HomeController", HomeController);

  function HomeController($location, MovieService) {
    var vm = this;

    function init() {
      MovieService
        .getTopMovies(3)
        .then(function(response) {
          if (response.data) {
            vm.topMovies = response.data;
          }
        });
    }
    init();
  }
})();