(function() {
  "use strict";

  angular
    .module("FormBuilderApp")
    .factory("FormService", FormService);

  function FormService($rootScope) {

    var forms = [];

    function createFormForUser(userId, form, callback) {
      var uniqueId = (new Date).getTime();

      form._id = uniqueId;
      form.userId = userId;
      forms.push(form);
      callback(forms);
    }

    function findAllFormsForUser(userId, callback) {
      var foundForms = [];

      forms.forEach(function(form) {
        if (form.userId === userId) {
          foundForms.push(form);
        }
      });

      callback(foundForms);
    }

    function deleteFormById(formId, callback) {
      forms = forms.filter(function(form) {
        return form._id !== formId;
      });
      callback(forms);
    }

    function updateFormById(formId, newForm, callback) {
      var foundForm = null;

      for (var i = 0; i < forms.length; i++) {
        if (forms[i]._id === formId) {
          forms[i].title = newForm.title;
          break;
        }
      }

      callback(forms);
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