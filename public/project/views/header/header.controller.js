(function(){
  "use strict";

  angular
    .module("FreshPotatoes")
    .controller("HeaderController", HeaderController);

  function HeaderController($scope, $rootScope, $location) {
    $scope.logout = logout;

    function logout() {
      $rootScope.currentUser = null;
      $location.url("/home");
    }
  }
})();