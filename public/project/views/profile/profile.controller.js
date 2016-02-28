(function(){
  "use strict";

  angular
    .module("FreshPotatoes")
    .controller("ProfileController", ProfileController);

  function ProfileController($scope, $rootScope, $location, UserService) {
    $scope.update = update;
    $scope.init = init;

    function init() {
      $scope.profilePassword = $rootScope.currentUser.password;
      $scope.profileFirstName = $rootScope.currentUser.firstName;
      $scope.profileLastName = $rootScope.currentUser.lastName;
      $scope.profileDescription = $rootScope.currentUser.description;
      $scope.profileBirthdate = $rootScope.currentUser.dob;
    }

    init();

    function update() {

      var updatedUser = {
        password: $scope.profilePassword,
        firstName: $scope.profileFirstName,
        lastName: $scope.profileLastName,
        description: $scope.profileDescription,
        dob: $scope.profileBirthdate
      };

      UserService.updateUserProfile($rootScope.currentUser._id, updatedUser, function(found) {
        if (found) {
          $location.url("/profile");
        }
      });
    }
  }
})();