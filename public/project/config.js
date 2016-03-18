(function(){
  "use strict";

  angular
    .module("FreshPotatoes")
    .config(function($routeProvider) {
      $routeProvider
        .when("/home", {
          templateUrl: "client/views/home/home.view.html",
          controller: "HomeController",
          controllerAs: "model"
        })
        .when("/login", {
          templateUrl: "client/views/login/login.view.html",
          controller: "LoginController",
          controllerAs: "model"
        })
        .when("/search", {
          templateUrl: "client/views/movie/movie.view.html",
        })
        .when("/register", {
          templateUrl: "client/views/register/register.view.html",
          controller: "RegisterController",
          controllerAs: "model"
        })
        .when("/write-review/:id", {
          templateUrl: "client/views/review/write-review.view.html",
          controller: "ReviewController",
          controllerAs: "model"
        })
        .when("/read-review/:id", {
          templateUrl: "client/views/review/read-review.view.html",
          controller: "ReviewController",
          controllerAs: "model"
        })
        .when("/profile/:username", {
          templateUrl: "client/views/profile/profile.view.html",
          controller: "ProfileController",
          controllerAs: "model"
        })
        .when("/users", {
          templateUrl: "client/views/user/user.view.html",
          controller: "UserController",
          controllerAs: "model"
        })
        .otherwise({
          redirectTo: "/home"
        });
    });
})();
