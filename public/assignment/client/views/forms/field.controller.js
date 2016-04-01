(function(){
  "use strict";

  angular
    .module("FormBuilderApp")
    .controller("FieldController", FieldController);

  function FieldController($rootScope, $uibModal, $routeParams, $location, FieldService) {
    var vm = this;
    var formId = $routeParams.formId;

    vm.removeField = removeField;
    vm.addField = addField;
    vm.showEditPane = showEditPane;
    vm.cloneField = cloneField;

    // When editing a field's location in array, if it is dropped in a new location
    // make a call to database to update the fields ordering for the form
    vm.fieldTree = {
      accept: function(sourceNodeScope, destNodesScope, destIndex) {
        return true;
      },
      dropped: function(sourceNodeScope, destNodesScope, destIndex) {
        FieldService
          .updateAllFieldsForForm(formId, vm.fields)
          .then(function(response) {
            return true;
          });
      }
    };

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

    function showEditPane(index) {
      $rootScope.modalInstance = $uibModal.open({
        templateUrl: 'client/views/forms/field-modal.view.html',
        controller: 'FieldModalController',
        size: 'lg',
        resolve: {
          selectedField: function () {
            return vm.fields[index];
          },
          formId: function() {
            return formId;
          }
        }
      });
    }

    function cloneField(field) {
      FieldService
        .createFieldForForm(formId, field)
        .then(function(response) {
          if (response.data) {
            vm.fields = response.data.fields;
          }
        });
    }

    function addField(fieldType) {
      console.log("adding field controller");
      // Get the field template for the given field type
      FieldService
        .getFieldTemplateType(fieldType)
        .then(function(response) {
          if (response.data) {
            var field = response.data;

            // Then add it to the form's list of fields
            FieldService
              .createFieldForForm(formId, field)
              .then(function(res) {
                if (res.data) {
                  vm.fields = res.data.fields;
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