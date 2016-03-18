(function(){
  "use strict";

  angular
    .module("FreshPotatoes")
    .controller("HeaderController", HeaderController);

  function HeaderController($rootScope, $location, UserService) {
    var vm = this;

    vm.logout = logout;

    function logout() {
      $rootScope.currentUser = null;
      $location.url("/home");
    }
  }
})();