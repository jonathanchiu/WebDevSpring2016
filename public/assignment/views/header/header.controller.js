(function(){
  angular
    .module("FormBuilderApp")
    .controller("HeaderController", HeaderController);

  function HeaderController($scope, $rootScope, $location) {
    $scope.isActive = isActive;
    $scope.logout = logout;

    // Given an Angular path, determine if the destination route is the same
    // as the path, and if they are, set the active class on a header link
    function isActive(path) {
      return $location.url() === path;
    }

    // "Logs out" the current user by resetting the currentUser var to null
    function logout() {
      $rootScope.currentUser = null;
    }
  }
})();