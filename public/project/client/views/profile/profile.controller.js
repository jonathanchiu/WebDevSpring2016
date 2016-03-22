(function(){
  "use strict";

  angular
    .module("FreshPotatoes")
    .controller("ProfileController", ProfileController);

  function ProfileController($rootScope, $routeParams, UserService, MovieService) {
    var vm = this;
    var user = $rootScope.currentUser;
    vm.userId = $routeParams.userId;

    vm.update = update;
    vm.init = init;

    function init() {
      UserService
        .findUserById(vm.userId)
        .then(function(response) {
          if (response.data) {
            var user = response.data;
            console.log(user);
            
            vm.profilePassword = user.password;
            vm.profileFirstName = user.firstName;
            vm.profileLastName = user.lastName;
            vm.profileDescription = user.description;
            vm.profileBirthdate = user.dob;
            vm.avatar = user.avatar;
            vm.username = user.username;
          }
        });
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
        .updateUserById(vm.userId, updatedUser)
        .then(function(response) {
          if (response.data) {
            init();
          }
        });
    }
  }
})();