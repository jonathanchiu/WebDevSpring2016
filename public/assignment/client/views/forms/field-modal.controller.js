(function(){
  "use strict";

  angular
    .module("FormBuilderApp")
    .controller("FieldModalController", FieldModalController);

  function FieldModalController($rootScope, $scope, $route, selectedField, formId, FieldService) {
    $scope.ok = ok;
    $scope.init = init;
    $scope.cancel = cancel;
    $scope.selectedField = selectedField;
    $scope.formId = formId;
    $scope.showPlaceholder = $scope.selectedField.type === 'TEXT' ||
                             $scope.selectedField.type === 'TEXTAREA';

    $scope.showTextarea = $scope.selectedField.type === 'OPTIONS' ||
                          $scope.selectedField.type === 'CHECKBOXES' ||
                          $scope.selectedField.type === 'RADIOS';
    

    function init() {
      $scope.label = $scope.selectedField.label;
      $scope.placeholder = $scope.selectedField.placeholder;

      if ($scope.showTextarea) {
        $scope.textArea = [];
        var options = $scope.selectedField.options;
        for (var i = 0; i < options.length; i++) {
          // Create an array of strings of LABEL:VALUE of each option
          $scope.textArea.push(options[i].label + ":" + options[i].value);
        }
        // Join the strings with new line for proper rendering in view
        $scope.options = $scope.textArea.join("\n");
      }
    }
    init();

    function ok() {
      var formOptionsArray = [];

      if ($scope.options) {
        // Undo the join from the init function
        var formOptions = $scope.options.split("\n");
        for (var i = 0; i < formOptions.length; i++) {
          // Split the string into an array of [LABEL,VALUE]
          var labelValuePair = formOptions[i].split(":");
          // Generate and push the object of label and value
          formOptionsArray.push({
            label: labelValuePair[0],
            value: labelValuePair[1]
          });
        }
      }

      var field = {
        label: $scope.label,
        placeholder: $scope.placeholder,
        type: $scope.selectedField.type.toUpperCase(),
        // Only add options key and value if they exist
        options: formOptionsArray.length > 0 ? formOptionsArray : null
      };

      FieldService
        .updateField($scope.formId, $scope.selectedField._id, field)
        .then(function(response) {
        });

      // Do a hard reload because we don't have access to the field controller
      $route.reload();
      $rootScope.modalInstance.close();
    }

    function cancel() {
      $rootScope.modalInstance.dismiss('cancel');
    }
  }
})();