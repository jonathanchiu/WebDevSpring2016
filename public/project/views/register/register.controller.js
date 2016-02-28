(function(){
  "use strict";

  angular
    .module("FreshPotatoes")
    .controller("RegisterController", RegisterController);

  function RegisterController($scope, $rootScope, $location, UserService) {

    $scope.register = register;

    function register() {
      var user = {
        firstName: null,
        lastName: null,
        username: $scope.registerUsername,
        password: $scope.registerPassword
      };

      UserService.createUser(user, function(newUser) {
        if (newUser) {
          $rootScope.currentUser = newUser;
          console.log($rootScope.currentUser);
          $location.url("/profile");
        }
      });
    }
  }
})();