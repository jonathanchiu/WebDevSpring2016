(function(){
  "use strict";

  angular
    .module("FreshPotatoes")
    .controller("ProfileController", ProfileController);

  function ProfileController($scope, $rootScope, $location, UserService) {
    var vm = this;
    var user = $rootScope.currentUser;

    vm.update = update;
    vm.init = init;

    function init() {
      vm.profilePassword = user.password;
      vm.profileFirstName = user.firstName;
      vm.profileLastName = user.lastName;
      vm.profileDescription = user.description;
      vm.profileBirthdate = user.dob;
    }
    init();

    function update() {
      var updatedUser = {
        password: vm.profilePassword,
        firstName: vm.profileFirstName,
        lastName: vm.profileLastName,
        description: vm.profileDescription,
        dob: vm.profileBirthdate
      };

      UserService
        .updateUser(user._id, updatedUser)
        .then(function(response) {
          if (response.data) {
            UserService.setCurrentUser(response.data);
          }
        });
    }
  }
})();