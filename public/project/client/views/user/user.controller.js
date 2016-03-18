(function(){
  "use strict";

  angular
    .module("FreshPotatoes")
    .controller("UserController", UserController);

  function UserController($scope, $rootScope, $location, UserService) {
    $scope.deleteUser = deleteUser;
    $scope.selectUser = selectUser;
    $scope.updateUser = updateUser;
    $scope.addUser = addUser;

    function deleteUser(id) {
      UserService.deleteUserById(id, function(response) {
        $rootScope.users = response;
      });
    }

    function fieldsToUserObject() {
      return {
        avatar: $scope.avatarUrlSubmit,
        username: $scope.usernameSubmit,
        password: $scope.passwordSubmit,
        firstName: $scope.firstNameSubmit,
        lastName: $scope.lastNameSubmit,
        dob: $scope.birthdateSubmit,
        role: parseInt($scope.roleSubmit, 10)
      };
    }

    function selectUser(index) {
      $scope.selectedUser = $rootScope.users[index];

      $scope.avatarUrlSubmit = $scope.selectedUser.avatar;
      $scope.usernameSubmit = $scope.selectedUser.username;
      $scope.passwordSubmit = $scope.selectedUser.password;
      $scope.firstNameSubmit = $scope.selectedUser.firstName;
      $scope.lastNameSubmit = $scope.selectedUser.lastName;
      $scope.birthdateSubmit = $scope.selectedUser.dob;
      $scope.roleSubmit = $scope.selectedUser.role.toString();
    }

    function updateUser() {
      var updatedUser = fieldsToUserObject();

      UserService.updateUser(updatedUser, $scope.selectedUser._id, function(response) {
        $rootScope.users = response;
      });
    }

    function addUser() {
      var newUser = fieldsToUserObject();

      UserService.createUser(newUser, function(response) {
        $rootScope.users = response;
      });
    }
  }
})();