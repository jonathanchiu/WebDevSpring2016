(function(){
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
          templateUrl: "views/users/login.view.html"
        })
        .when("/profile", {
          templateUrl: "views/users/profile.view.html"
        })
        .when("/admin", {
          templateUrl: "views/admin/admin.view.html"
        })
        .when("/forms", {
          templateUrl: "views/form/forms.view.html"
        })
        .when("/fields", {
          templateUrl: "views/field/form-fields.view.html"
        })
        .otherwise({
          redirectTo: "/home"
        });
    });
})();
