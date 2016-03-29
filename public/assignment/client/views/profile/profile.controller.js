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
      vm.emails = currentUser.emails;
      vm.phones = currentUser.phones;

      console.log($rootScope.currentUser);
    }
    init();

    function update() {
      // Generate new user object with updated attributes
      var user = {
        username: vm.username,
        password: vm.password,
        firstName: vm.firstname,
        lastName: vm.lastname,
      };

      if (vm.emails) {
        user.emails = vm.emails.replace(/ /g,'').split(",");
      }

      if (vm.phones) {
        user.phones = vm.phones.replace(/ /g,'').split(",")
      }
      UserService
        .updateUser($rootScope.currentUser._id, user)
        .then(function(response) {
          if (response.data) {
            UserService.setCurrentUser(response.data);
            $location.url("/profile");
          }
        });
    }
  }
})();