(function(){
  "use strict";

  angular
    .module("FormBuilderApp")
    .controller("ProfileController", ProfileController);

  function ProfileController($scope, $rootScope, $location, UserService) {
    var vm = this;

    vm.update = update;

    function init() {
      var currentUser = $rootScope.currentUser;

      // Update view with the current user's info
      vm.username = currentUser.username;
      vm.password = currentUser.password;
      vm.firstname = currentUser.firstName;
      vm.lastname = currentUser.lastName;
      vm.email = currentUser.email;
    }
    init();

    function update() {
      // Generate new user object with updated attributes
      var user = {
        username: vm.username,
        password: vm.password,
        firstName: vm.firstname,
        lastName: vm.lastname,
        email: vm.email
      };

      UserService
        .updateUser($rootScope.currentUser._id, user)
        .then(function(response) {
          if (response.data) {
            // Since we return all users, get the user with the matching ID
            // and set current user to it
            var updatedUser = response.data.filter(function(u) {
              return u._id == $rootScope.currentUser._id;
            })[0]
            UserService.setCurrentUser(updatedUser);
          }
        });
    }
  }
})();