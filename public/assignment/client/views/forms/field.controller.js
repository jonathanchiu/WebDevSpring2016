(function(){
  "use strict";

  angular
    .module("FormBuilderApp")
    .controller("FieldController", FieldController);

  function FieldController($scope, $routeParams, $location, FieldService) {
    var vm = this;
    var formId = $routeParams.formId;

    vm.removeField = removeField;
    vm.addField = addField;

    function init() {
      var formId = $routeParams.formId;
      FieldService
        .getFieldsForForm(formId)
        .then(function(response) {
          if (response.data) {
            vm.fields = response.data;
          }
        });
    }
    init();

    function addField(fieldType) {
      // Get the field template for the given field type
      FieldService
        .getFieldTemplateType(fieldType)
        .then(function(response) {
          if (response.data) {
            var field = response.data;

            // Then add it to the form's list of fields
            FieldService
              .createFieldForForm(formId, field)
              .then(function(response) {
                if (response.data) {
                  vm.fields = response.data;
                }
              });
          }
        });
    }

    function removeField(field) {
      FieldService
        .deleteFieldFromForm(formId, field._id)
        .then(function(response) {
          if (response.data) {
            vm.fields = response.data;
          }
        });
    }
  }
})();