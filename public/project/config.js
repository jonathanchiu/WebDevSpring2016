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
        .otherwise({
          redirectTo: "/home"
        });
    });
})();
