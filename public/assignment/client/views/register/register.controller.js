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
        emails: vm.email.replace(/ /g,'').split(","),
        phones: [],
        roles: ['student']
      };

      console.log(user);

      UserService
        .createUser(user)
        .then(
          function(response) {
            console.log(response.data);
            response.data.emails = response.data.emails.join(",");
            console.log(response.data);
            UserService.setCurrentUser(response.data);
            $location.url("/profile");
          });
    }
  }
})();