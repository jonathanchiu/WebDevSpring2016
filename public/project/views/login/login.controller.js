(function(){
  "use strict";

  angular
    .module("FreshPotatoes")
    .controller("LoginController", LoginController);

  function LoginController($scope, $rootScope, $location) {
    $scope.login = login;
    $scope.register = register;

    function login() {

    }
    function register() {
      $location.url("/register");
    }
  }
})();