(function(){
  "use strict";

  angular
    .module("FormBuilderApp")
    .controller("FormController", FormController);

  function FormController($rootScope, $route, $location, FormService) {
    var vm = this;

    vm.createFormForUser = createFormForUser;
    vm.deleteFormById = deleteFormById;
    vm.updateFormById = updateFormById;
    vm.selectForm = selectForm;

    function init() {
      FormService
        .findAllFormsForUser($rootScope.currentUser._id)
        .then(function(response) {
          if (response.data) {
            vm.forms = response.data;
          }
        });
    }
    init();

    function createFormForUser(title) {
      if (title) {
        var newForm = {
          userId: $rootScope.currentUser._id,
          title: title,
          fields: []
        };

        FormService
          .createFormForUser($rootScope.currentUser._id, newForm)
          .then(function(response) {
            if (response.data) {
              vm.forms = response.data;
            }
          });
      }
    }

    function deleteFormById(index) {
      var deleteFormId = vm.forms[index]._id;

      FormService
        .deleteFormById(deleteFormId)
        .then(function(response) {
          $route.reload();
        });
    }

    function updateFormById() {
      if (vm.selectedFormId) {
        var updatedForm = {
          title: vm.formTitle
        };

        FormService
          .updateFormById(vm.selectedFormId, updatedForm)
          .then(function(response) {
            $route.reload();
          });
      }
    }

    function selectForm(index) {
      vm.selectedFormId = vm.forms[index]._id;
      vm.formTitle = vm.forms[index].title;
    }
  }
})();