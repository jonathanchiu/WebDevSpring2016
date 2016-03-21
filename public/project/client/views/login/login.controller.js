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
        .findUserByCredentials(user.username, user.password)
        .then(function(response) {
          if (response.data) {
            UserService.setCurrentUser(response.data);
            $location.url("/profile/" + user.username);
          }
        });
    }

    function register() {
      $location.url("/register");
    }
  }
})();