(function(){
  "use strict";

  angular
    .module("FreshPotatoes")
    .config(function($routeProvider) {
      $routeProvider
        .when("/home", {
          templateUrl: "client/views/home/home.view.html",
          controller: "HomeController",
          controllerAs: "model",
          resolve: {
            loggedin: checkCurrentUser
          }
        })
        .when("/login", {
          templateUrl: "client/views/login/login.view.html",
          controller: "LoginController",
          controllerAs: "model"
        })
        .when("/search", {
          templateUrl: "client/views/movie/movie.view.html",
          controller: "MovieController",
          controllerAs: "model"
        })
        .when("/register", {
          templateUrl: "client/views/register/register.view.html",
          controller: "RegisterController",
          controllerAs: "model"
        })
        .when("/write-review/:id", {
          templateUrl: "client/views/review/write-review.view.html",
          controller: "WriteReviewController",
          controllerAs: "model",
          resolve: {
            loggedin: checkLoggedin
          }
        })
        .when("/read-review/:id", {
          templateUrl: "client/views/review/read-review.view.html",
          controller: "ReadReviewController",
          controllerAs: "model"
        })
        .when("/profile/:userId", {
          templateUrl: "client/views/profile/profile.view.html",
          controller: "ProfileController",
          controllerAs: "model"
        })
        .when("/users", {
          templateUrl: "client/views/user/user.view.html",
          controller: "UserController",
          controllerAs: "model",
          resolve: {
            loggedin: checkAdmin
          }
        })
        .otherwise({
          redirectTo: "/home"
        });
    });

    var checkCurrentUser = function($q, $timeout, $http, $location, $rootScope) {
      var deferred = $q.defer();
  
      $http.get('/api/project/loggedin').success(function(user) {
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
  
      $http.get('/api/project/loggedin').success(function(user) {

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

    var checkAdmin = function($q, $timeout, $http, $location, $rootScope) {
      var deferred = $q.defer();
    
      $http.get('/api/project/loggedin').success(function(user) {
        console.log(user);
        $rootScope.errorMessage = null;
        // User is Authenticated
        if (user !== '0' && user.roles.indexOf('admin') != -1) {
          $rootScope.currentUser = user;
          deferred.resolve();
        }
      });
      
      return deferred.promise;
    };
})();
