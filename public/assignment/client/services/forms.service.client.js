(function() {
  "use strict";

  angular
    .module("FormBuilderApp")
    .factory("FormService", FormService);

  function FormService($rootScope, $http) {

    var forms = [];

    function createFormForUser(userId, form) {
      return $http.post("/api/assignment/user/" + userId + "/form", form);
    }

    function findAllFormsForUser(userId) {
      console.log(userId);
      return $http.get("/api/assignment/user/" + userId + "/form");
    }

    function deleteFormById(formId) {
      return $http.delete("/api/assignment/form/" + formId);
    }

    function updateFormById(formId, updatedForm) {
      return $http.put("/api/assignment/form/" + formId, updatedForm);
    }

    var service = {
      createFormForUser: createFormForUser,
      findAllFormsForUser: findAllFormsForUser,
      deleteFormById: deleteFormById,
      updateFormById: updateFormById
    };

    return service;
  }
})();