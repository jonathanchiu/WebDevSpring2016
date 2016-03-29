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
          controller: "RegisterController",
          controllerAs: "model"
        })
        .when("/login", {
          templateUrl: "client/views/login/login.view.html",
          controller: "LoginController",
          controllerAs: "model"
        })
        .when("/profile", {
          templateUrl: "client/views/profile/profile.view.html",
          controller: "ProfileController",
          controllerAs: "model"
        })
        .when("/admin", {
          templateUrl: "client/views/admin/admin.view.html",
          controller: "AdminController",
          controllerAs: "model"
        })
        .when("/forms", {
          templateUrl: "client/views/forms/forms.view.html",
          controller: "FormController",
          controllerAs: "model"
        })
        .when("/fields", {
          templateUrl: "client/views/forms/field.view.html",
          controller: "FieldController",
          controllerAs: "model"
        })
        .when("/form/:formId/fields", {
          templateUrl: "client/views/forms/field.view.html",
          controller: "FieldController",
          controllerAs: "model"
        })
        .otherwise({
          redirectTo: "/home"
        });
    });
})();
