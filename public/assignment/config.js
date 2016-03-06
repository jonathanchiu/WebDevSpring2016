(function(){
  "use strict";

  angular
    .module("FormBuilderApp")
    .config(function($routeProvider) {
      $routeProvider
        .when("/home", {
          templateUrl: "client/views/home/home.view.html",
          controller: 'MainController'
        })
        .when("/register", {
          templateUrl: "client/views/register/register.view.html",
          controller: "RegisterController"
        })
        .when("/login", {
          templateUrl: "client/views/login/login.view.html",
          controller: "LoginController"
        })
        .when("/profile", {
          templateUrl: "client/views/profile/profile.view.html",
          controller: "ProfileController"
        })
        .when("/admin", {
          templateUrl: "client/views/admin/admin.view.html"
        })
        .when("/forms", {
          templateUrl: "client/views/form/forms.view.html",
          controller: "FormController"
        })
        .when("/fields", {
          templateUrl: "client/views/fields/form-fields.view.html"
        })
        .otherwise({
          redirectTo: "/home"
        });
    });
})();
