(function(){
  "use strict";

  angular
    .module("FreshPotatoes")
    .config(function($routeProvider) {
      $routeProvider
        .when("/home", {
          templateUrl: "views/home/home.view.html",
          controller: "HomeController"
        })
        .when("/login", {
          templateUrl: "views/login/login.view.html",
          controller: "LoginController"
        })
        .when("/search", {
          templateUrl: "views/movie/movie.view.html",
        })
        .when("/register", {
          templateUrl: "views/register/register.view.html",
          controller: "RegisterController"
        })
        .when("/write-review/:id", {
          templateUrl: "views/review/write-review.view.html",
          controller: "ReviewController"
        })
        .when("/read-review/:id", {
          templateUrl: "views/review/read-review.view.html",
          controller: "ReviewController"
        })
        .when("/profile", {
          templateUrl: "views/profile/profile.view.html",
          controller: "ProfileController"
        })
        .when("/users", {
          templateUrl: "views/user/user.view.html",
          controller: "UserController"
        })
        .otherwise({
          redirectTo: "/home"
        });
    });
})();
