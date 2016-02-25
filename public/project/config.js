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
        .when("/register", {
          templateUrl: "views/register/register.view.html",
          controller: "RegisterController"
        })
        .otherwise({
          redirectTo: "/home"
        });
    });
})();
