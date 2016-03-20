(function(){
  "use strict";

  angular
    .module("FreshPotatoes")
    .controller("ProfileController", ProfileController);

  function ProfileController($rootScope, $routeParams, UserService, MovieService) {
    var vm = this;
    var user = $rootScope.currentUser;
    var usernameRoute = $routeParams.username;

    vm.update = update;
    vm.init = init;

    function init() {
      UserService
        .findUserByUsername(usernameRoute)
        .then(function(response) {
          if (response.data) {
            var user = response.data;
            
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
        .updateUser(user._id, updatedUser)
        .then(function(response) {
          if (response.data) {
            UserService.setCurrentUser(response.data);
          }
        });
    }
  }
})();