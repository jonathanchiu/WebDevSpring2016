(function(){
  "use strict";

  angular
    .module("FormBuilderApp")
    .controller("HeaderController", HeaderController);

  function HeaderController($scope, $rootScope, $location, UserService) {
    $scope.isActive = isActive;
    $scope.logout = logout;

    // Given an Angular path, determine if the destination route is the same
    // as the path, and if they are, set the active class on a header link
    function isActive(path) {
      return $location.url() === path;
    }

    // "Logs out" the current user by resetting the currentUser var to null
    function logout() {
      UserService
        .logout()
        .then(
            function(response){
                $rootScope.currentUser = null;
                $location.url("/login");
            },
            function(err) {
                $scope.error = err;
            }
      );
    }
  }
})();