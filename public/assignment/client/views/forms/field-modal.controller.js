(function(){
  "use strict";

  angular
    .module("FormBuilderApp")
    .controller("FieldModalController", FieldModalController);

  function FieldModalController($rootScope, $scope, selectedField, FieldService) {
    $scope.ok = ok;
    $scope.cancel = cancel;
    $scope.selectedField = selectedField;
    $scope.showPlaceholder = $scope.selectedField.type === 'TEXT' ||
                             $scope.selectedField.type === 'TEXTAREA';

    $scope.showTextarea = $scope.selectedField.type === 'OPTIONS' ||
                          $scope.selectedField.type === 'CHECKBOXES' ||
                          $scope.selectedField.type === 'RADIOS';

    function ok() {
      $rootScope.modalInstance.close();
    }

    function cancel() {
      $rootScope.modalInstance.dismiss('cancel');
    }
  }
})();