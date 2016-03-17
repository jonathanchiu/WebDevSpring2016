(function(){
  "use strict";

  angular
    .module("FormBuilderApp")
    .controller("LoginController", LoginController);

  function LoginController($scope, $rootScope, $location, UserService) {
    var vm = this;

    vm.login = login;

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
            $location.url("/profile");
          }
        });
    }
  }
})();