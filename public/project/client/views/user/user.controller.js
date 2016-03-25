(function(){
  "use strict";

  angular
    .module("FreshPotatoes")
    .controller("UserController", UserController);

  function UserController(UserService) {
    var vm = this;

    vm.deleteUser = deleteUser;
    vm.selectUser = selectUser;
    vm.updateUser = updateUser;
    vm.addUser = addUser;
    vm.init = init;

    function init() {
      UserService
        .getAllUsers()
        .then(function(response) {
          if (response.data) {
            vm.users = response.data;
          }
        });
    }
    init();

    function deleteUser(id) {
      UserService
        .deleteUserById(id)
        .then(function(response) {
          if (response.data) {
            vm.users = response.data
          }
        });
    }

    function fieldsToUserObject() {
      return {
        avatar: vm.avatarUrlSubmit,
        username: vm.usernameSubmit,
        password: vm.passwordSubmit,
        firstName: vm.firstNameSubmit,
        lastName: vm.lastNameSubmit,
        dob: new Date(vm.birthdateSubmit).toISOString(),
        role: parseInt(vm.roleSubmit, 10)
      };
    }

    function selectUser(index) {
      vm.selectedUser = vm.users[index];

      vm.avatarUrlSubmit = vm.selectedUser.avatar;
      vm.usernameSubmit = vm.selectedUser.username;
      vm.passwordSubmit = vm.selectedUser.password;
      vm.firstNameSubmit = vm.selectedUser.firstName;
      vm.lastNameSubmit = vm.selectedUser.lastName;
      vm.birthdateSubmit = new Date(vm.selectedUser.dob);
      vm.roleSubmit = vm.selectedUser.role.toString();
    }

    function updateUser() {
      var updatedUser = fieldsToUserObject();

      UserService
        .updateUserById(vm.selectedUser._id, updatedUser)
        .then(function(response) {
          if (response.data) {
            vm.users = response.data;
          }
        });
    }

    function addUser() {
      var newUser = fieldsToUserObject();

      UserService
        .createUser(newUser)
        .then(function(response) {
          if (response.data) {
            vm.users.push(response.data);
          }
        });
    }
  }
})();