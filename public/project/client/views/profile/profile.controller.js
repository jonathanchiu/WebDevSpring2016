(function(){
  "use strict";

  angular
    .module("FreshPotatoes")
    .controller("ProfileController", ProfileController);

  function ProfileController($rootScope, $routeParams, UserService, MovieService, ReviewService) {
    var vm = this;
    var user = $rootScope.currentUser;
    vm.userId = $routeParams.userId;

    vm.update = update;
    vm.follow = follow;
    vm.init = init;
    vm.likes;

    function init() {
      UserService
        .findUserById(vm.userId)
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

            MovieService
              .getMoviesByIds(user.likes)
              .then(function(response) {
                if (response.data) {
                  vm.likedMovies = chunk(response.data, 5);
                  console.log(vm.likedMovies);
                }
              });
          }
        });

      ReviewService
        .getReviewsByUserId(vm.userId)
        .then(function(response) {
          if (response.data) {
            vm.reviews = response.data;
          }
        });
    }
    init();

    function follow() {
      
    }

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

    function chunk(array, size) {
      var modified = [];
      for (var i = 0; i < array.length; i += size) {
        modified.push(array.slice(i, i + size));
      }
      return modified;
    }

  }
})();