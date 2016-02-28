(function(){
  "use strict";

  angular
    .module("FreshPotatoes")
    .controller("LoginController", LoginController);

  function LoginController($scope, $location, $rootScope, UserService) {
    $scope.login = login;
    $scope.register = register;

    function login() {
      UserService.findUserByCredentials(
        $scope.loginUsername,
        $scope.loginPassword,
        function(found) {
          if (found) {
            $rootScope.currentUser = found;
            $location.url("/profile");
          }
        });
    }

    function register() {
      $location.url("/register");
    }
  }
})();