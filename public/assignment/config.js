(function(){
  "use strict";

  angular
    .module("FormBuilderApp")
    .config(function($routeProvider) {
      $routeProvider
        .when("/home", {
          templateUrl: "client/views/home/home.view.html",
          controller: 'MainController',
          resolve: {
            loggedin: checkCurrentUser
          }
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
          controllerAs: "model",
          resolve: {
            loggedin: checkLoggedin
          }
        })
        .when("/admin", {
          templateUrl: "client/views/admin/admin.view.html",
          controller: "AdminController",
          controllerAs: "model"
        })
        .when("/forms", {
          templateUrl: "client/views/forms/forms.view.html",
          controller: "FormController",
          controllerAs: "model",
          resolve: {
            loggedin: checkLoggedin
          }
        })
        .when("/fields", {
          templateUrl: "client/views/forms/field.view.html",
          controller: "FieldController",
          controllerAs: "model"
        })
        .when("/form/:formId/fields", {
          templateUrl: "client/views/forms/field.view.html",
          controller: "FieldController",
          controllerAs: "model",
          resolve: {
            loggedin: checkLoggedin
          }
        })
        .otherwise({
          redirectTo: "/home"
        });
    });

    var checkCurrentUser = function($q, $timeout, $http, $location, $rootScope) {
      var deferred = $q.defer();
  
      $http.get('/api/loggedin').success(function(user) {
        $rootScope.errorMessage = null;
        // User is Authenticated
        if (user !== '0') {
          $rootScope.currentUser = user;
        }
        deferred.resolve();
      });

      return deferred.promise;
    };

    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope) {
      var deferred = $q.defer();
  
      $http.get('/api/loggedin').success(function(user) {

        $rootScope.errorMessage = null;

        if (user !== '0') {
          $rootScope.currentUser = user;
          deferred.resolve();
        }

        else {
          deferred.reject();
          $rootScope.errorMessage = "You need to login!";
          $location.url('/login');
        }
      });

      return deferred.promise;
    };
})();
