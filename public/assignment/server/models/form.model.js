var mock = require("./form.mock.json");

module.exports = function() {

  function findFormByTitle(title) {
    for (var f in mock) {
      if (mock[f].title === title) {
        return mock[f];
      }
    }
    return null;
  }

  function createFormForUser(userId, newForm) {
    newForm._id = (new Date()).getTime();
    newForm.userId = userId;
    mock.push(newForm);
    return findAllFormsForUser(userId);
  }

  function findFormById(formId) {
    for (var f in mock) {
      if (mock[f]._id === formId) {
        return mock[f];
      }
    }
    return null;
  }

  function findAllFormsForUser(userId) {
    var forms = [];
    for (var f in mock) {
      if (mock[f].userId == userId) {
        forms.push(mock[f]);
      }
    }
    return forms;
  }

  function deleteFormById(formId) {
    for (var i = 0; i < mock.length; i++) {
      if (mock[i]._id == formId) {
        mock.splice(i, 1);
        break;
      }
    }
    return mock;
  }

  function updateFormById(formId, form) {
    for (var f in mock) {
      if (mock[f]._id == formId) {
        mock[f].title = form.title;
        break;
      }
    }
    return mock;
  }

  var api = {
    findFormByTitle: findFormByTitle,
    createFormForUser: createFormForUser,
    findFormById: findFormById,
    findAllFormsForUser: findAllFormsForUser,
    deleteFormById: deleteFormById,
    updateFormById: updateFormById
  };
  return api
};