(function(){
  angular
    .module("FormBuilderApp")
    .controller("FormController", FormController);

  function FormController($scope, $rootScope, $location, FormService) {
    $scope.addForm = addForm;
    $scope.deleteForm = deleteForm;
    $scope.updateForm = updateForm;
    $scope.selectForm = selectForm;

    var currentUser = $rootScope.currentUser;

    FormService.findAllFormsForUser(currentUser._id,
      function(response) {
        $scope.forms = response;
      });

    /**
     * Adds a new form for the current user
     * Create a skeleton form object, pass it to the FormService,
     * populate the form object with more info, and update scope
     */
    function addForm() {
      if ($scope.formTitle) {
        var newForm = {
          title: $scope.formTitle
        }

        FormService.createFormForUser(currentUser._id, newForm,
          function(response) {
            $scope.forms = response;
          });
      }
    }

    /**
     * Delete the form at the given index and update the forms in the scope
     * so that the view will update appropriately
     */
    function deleteForm(index) {
      var deleteFormId = $scope.forms[index]._id;

      FormService.deleteFormById(deleteFormId, function(response) {
        $scope.forms = response;
      });
    }

    function updateForm() {
      console.table($scope.forms);
      // Generate an array of form names of all the forms a user has created
      var formNames = $scope.forms.map(function(form) {
        return form.title
      });

      var updatedForm = {
        title: $scope.formTitle
      }
      // Only allow updating a form if there is a valid form title and
      // the user has selected a form to edit
      if (formNames.indexOf($scope.formTitle) && $scope.selectedFormId) {
        FormService.updateFormById($scope.selectedFormId, updatedForm,
          function(response) {
            $scope.forms = response;
          });
      }
    }

    /**
     * Selects the form at the given index by highlighting the table row of
     * the form, and updating the form title in the edit field
     */
    function selectForm(index) {
      $scope.selectedFormId = $scope.forms[index]._id;
      $scope.formTitle = $scope.forms[index].title;
    }
  }
})();