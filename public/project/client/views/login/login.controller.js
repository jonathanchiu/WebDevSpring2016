(function(){
  "use strict";

  angular
    .module("FreshPotatoes")
    .controller("LoginController", LoginController);

  function LoginController($scope, $rootScope, $location, UserService) {
    var vm = this;

    vm.login = login;
    vm.register = register;

    function init() {
    }
    init();

    function login(user) {
      if (!user) {
        return;
      }

      UserService
        .login(user)
        .then(function(response) {
          if (response.data) {
            UserService.setCurrentUser(response.data);
            $location.url("/profile/" + response.data._id);
          }
        });
    }

    function register() {
      $location.url("/register");
    }
  }
})();