(function(){
  "use strict";

  angular
    .module("FreshPotatoes")
    .controller("RegisterController", RegisterController);

  function RegisterController($rootScope, $location, UserService) {
    var vm = this;
    
    vm.register = register;

    function register() {
      if (vm.registerConfirmPassword === vm.registerPassword) {
        var user = {
          firstName: null,
          lastName: null,
          username: vm.registerUsername,
          password: vm.registerPassword,
          followers: [],
          likes: [],
          role: 2,
          avatar: "",
          dob: "",
          description: ""
        };

        UserService
          .createUser(user)
          .then(function(response) {
            if (response.data) {
              UserService.setCurrentUser(response.data);
              $location.url("/profile/" + response.data._id);
            }
          });
      }
      else {

      }
    }
  }
})();