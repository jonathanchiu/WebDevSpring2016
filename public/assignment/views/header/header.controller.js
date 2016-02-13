(function(){
  angular
    .module("FormBuilderApp")
    .controller("HeaderController", HeaderController);

  function HeaderController($scope, $location) {
    $scope.isActive = isActive;

    // Given an Angular path, determine if the destination route is the same
    // as the path, and if they are, set the active class on a header link
    function isActive(path) {
      return $location.url() === path;
    }

  }
})();