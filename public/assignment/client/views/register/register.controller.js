(function(){
  "use strict";

  angular
    .module("FormBuilderApp")
    .controller("RegisterController", RegisterController);

  function RegisterController($location, UserService) {
    var vm = this;

    vm.register = register;

    function init() {

    }
    init();

    function register() {
      var user = {
        firstName: null,
        lastName: null,
        username: vm.username,
        password: vm.password,
        email: vm.email
      };

      UserService
        .createUser(user)
        .then(function(response) {
          if (response.data) {
            UserService.setCurrentUser(response.data);
            $location.url("/profile");
          }
        });
    }
  }
})();