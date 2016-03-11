(function() {
  "use strict";

  angular
    .module("FormBuilderApp")
    .factory("FieldService", FieldService);

  function FieldService($rootScope, $http) {

    function getFieldsForForm(formId) {
      return $http.get("/api/assignment/form/" + formId + "/field");
    }

    function getFieldForForm(formId, fieldId) {
      return $http.get("/api/assignment/form/" + formId + "/field/" + fieldId);
    }

    function deleteFieldFromForm(formId, fieldId) {
      return $http.delete("/api/assignment/form/" + formId + "/field/" + fieldId);
    }

    function getFieldTemplateType(fieldType) {
      return $http.get("/api/assignment/field/" + fieldType);
    }

    function createFieldForForm(formId, field) {
      return $http.post("/api/assignment/form/" + formId + "/field", field);
    }

    function updateField(formId, fieldId, field) {
      return $http.put("/api/assignment/form/" + formId + "/field/" + fieldId, field);
    }

    var service = {
      getFieldsForForm: getFieldsForForm,
      getFieldForForm: getFieldForForm,
      deleteFieldFromForm: deleteFieldFromForm,
      createFieldForForm: createFieldForForm,
      updateField: updateField,
      getFieldTemplateType: getFieldTemplateType
    };

    return service;
  }
})();