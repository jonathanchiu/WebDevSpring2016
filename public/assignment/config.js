(function(){
  "use strict";

  angular
    .module("FormBuilderApp")
    .config(function($routeProvider) {
      $routeProvider
        .when("/home", {
          templateUrl: "views/home/home.view.html",
          controller: 'MainController'
        })
        .when("/register", {
          templateUrl: "register/register.view.html",
          controller: "RegisterController"
        })
        .when("/login", {
          templateUrl: "login/login.view.html",
          controller: "LoginController"
        })
        .when("/profile", {
          templateUrl: "profile/profile.view.html",
          controller: "ProfileController"
        })
        .when("/admin", {
          templateUrl: "views/admin/admin.view.html"
        })
        .when("/forms", {
          templateUrl: "views/form/forms.view.html",
          controller: "FormController"
        })
        .when("/fields", {
          templateUrl: "views/fields/form-fields.view.html"
        })
        .otherwise({
          redirectTo: "/home"
        });
    });
})();
