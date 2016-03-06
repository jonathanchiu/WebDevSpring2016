(function(){
  "use strict";

  angular
    .module("FormBuilderApp")
    .controller("RegisterController", RegisterController);

  function RegisterController($scope, $rootScope, $location, UserService) {

    $scope.register = register;

    /**
     * Generate new user object and store it as variable in $rootScope before
     * redirecting to profile page
     */
    function register() {
      var user = {
        firstName: null,
        lastName: null,
        username: $scope.username,
        password: $scope.password,
        email: $scope.email
      };

      // Once new user is created in the UserService, callback here
      UserService.createUser(user, function(newUser) {
        if (newUser) {
          $rootScope.newUser = newUser;
          $rootScope.currentUser = newUser;
          $location.url("/profile");
        }
      });
    }
  }
})();