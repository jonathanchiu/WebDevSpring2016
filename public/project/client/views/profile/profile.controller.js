(function(){
  "use strict";

  angular
    .module("FreshPotatoes")
    .controller("ProfileController", ProfileController);

  function ProfileController($rootScope, $routeParams, $location, UserService, MovieService, ReviewService) {
    var vm = this;
    var user = $rootScope.currentUser;
    vm.userId = $routeParams.userId;

    vm.update = update;
    vm.delegateFollowUnfollow = delegateFollowUnfollow;
    vm.deleteUser = deleteUser;
    vm.init = init;
    vm.likes;

    function init() {
      if ($rootScope.currentUser) {
        UserService
          .findUserById(vm.userId)
          .then(function(response) {
            if (response.data) {
              var user = response.data;
              
              vm.profilePassword = user.password;
              vm.profileFollowers = user.followers.length;
              vm.profileFirstName = user.firstName;
              vm.profileLastName = user.lastName;
              vm.profileAvatarUrl = user.avatar;
              vm.profileDescription = user.description;
              vm.profileBirthdate = new Date(user.dob);
              vm.avatar = user.avatar;
              vm.username = user.username;

              MovieService
                .getMoviesByIds(user.likes)
                .then(function(response) {
                  if (response.data) {
                    vm.likedMovies = chunk(response.data, 5);
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

        determineFollowStatus();
      }
      // Redirect users who aren't logged in
      else {
        $location.url("/home");
      }
    }
    init();

    function deleteUser() {
      UserService
        .deleteUserById($routeParams.userId)
        .then(function(response) {
          if (response.data) {
            $location.url("/login");
          }
        });
    }

    // Is the current user viewing the profile a follower or the same user?
    function determineFollowStatus() {
      UserService
        .getFollowersByUserId($routeParams.userId)
        .then(function(response) {
          var loggedInId = parseInt($rootScope.currentUser._id, 10);
          if (response.data) {
            var isFollower = (response.data.indexOf(loggedInId) > -1);
            var isSameUser = $rootScope.currentUser._id == $routeParams.userId;
            vm.currentUserIsFollower = isFollower || isSameUser;
            vm.followText = vm.currentUserIsFollower ? "Unfollow" : "Follow";
          }
        });
    }

    function update() {
      var updatedUser = {
        password: vm.profilePassword,
        firstName: vm.profileFirstName,
        lastName: vm.profileLastName,
        avatar: vm.profileAvatarUrl,
        description: vm.profileDescription
      };

      if (document.getElementById("profileBirthdate").value.length > 0) {
        updatedUser.dob = new Date(vm.profileBirthdate).toISOString();
      }

      UserService
        .updateUserById(vm.userId, updatedUser)
        .then(function(response) {
          if (response.data) {
            init();
          }
        });
    }

    function delegateFollowUnfollow() {
      var followedId = $routeParams.userId;
      var followerId = $rootScope.currentUser._id;

      if (vm.currentUserIsFollower) {
        UserService
            .unfollowUser(followedId, followerId)
            .then(function(response) {
              if (response.data) {
                vm.profileFollowers = response.data.followers.length;
                vm.currentUserIsFollower = false;
                vm.followText = "Follow";
              }
            });
      }
      else {
        UserService
          .followUser(followedId, followerId)
          .then(function(response) {
            if (response.data) {
              vm.profileFollowers = response.data.followers.length;
              vm.currentUserIsFollower = true;
              vm.followText = "Unfollow";
            }
          });        
      }
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