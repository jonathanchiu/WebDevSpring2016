(function(){
  "use strict";

  angular
    .module("FormBuilderApp")
    .controller("ProfileController", ProfileController);

  function ProfileController($scope, $rootScope, $location, UserService) {

    $scope.update = update;

    var currentUser = $rootScope.currentUser;

    // Update view with the current user's info
    $scope.profileUsername = currentUser.username;
    $scope.profilePassword = currentUser.password;
    $scope.profileFirstName = currentUser.firstName;
    $scope.profileLastName = currentUser.lastName;
    $scope.profileEmail = currentUser.email;

    function update() {

      // Generate new user object with updated attributes
      var updatedUser = {
        username: $scope.profileUsername,
        password: $scope.profilePassword,
        firstName: $scope.profileFirstName,
        lastName: $scope.profileLastName,
        email: $scope.profileEmail
      };

      UserService.updateUser(currentUser._id, updatedUser, function(found) {
        if (found) {
          $location.url("/profile");
        }
      });
    }
  }
})();