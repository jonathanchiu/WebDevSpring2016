var mock = require("./form.mock.json");
var fieldTemplates = require("./field-templates.mock.json");

module.exports = function(uuid) {

  function findFormByTitle(title) {
    for (var f in mock) {
      if (mock[f].title === title) {
        return mock[f];
      }
    }
    return null;
  }

  function createFormForUser(userId, newForm) {
    newForm._id = uuid.v4();
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

  function getFieldsForForm(formId) {
    for (var f in mock) {
      if (mock[f]._id == formId) {
        return mock[f].fields;
      }
    }
    return null;
  }

  function getFieldForForm(formId, fieldId) {
    for (var f in mock) {
      if (mock[f]._id == formId) {
        for (var i = 0; i < mock[f].fields.length; i++) {
          if (mock[f].fields[i]._id == fieldId) {
            return mock[f].fields[i]._id;
          }
        }
      }
    }
    return null;
  }

  function deleteFieldFromForm(formId, fieldId) {
    for (var f in mock) {
      if (mock[f]._id == formId) {
        for (var i = 0; i < mock[f].fields.length; i++) {
          if (mock[f].fields[i]._id == fieldId) {
            mock[f].fields.splice(i, 1);
            return mock[f].fields;
          }
        }
      }
    }
    return null;
  }

  function getFieldTemplateType(fieldType) {
    for (var f in fieldTemplates) {
      if (fieldTemplates[f].type.toLowerCase() == fieldType.toLowerCase()) {
        fieldTemplates[f]._id = uuid.v4();
        return fieldTemplates[f];
      }
    }
    return null;
  }

  function createFieldForForm(formId, field) {
    field._id = uuid.v4();

    for (var f in mock) {
      if (mock[f]._id == formId) {
        mock[f].fields.push(field);
        return mock[f].fields;
      }
    }
    return null;
  }

  function updateField(formId, fieldId, field) {
    for (var f in mock) {
      if (mock[f]._id == formId) {
        for (var i = 0; i < mock[f].fields.length; i++) {
          if (mock[f].fields[i]._id == fieldId) {
            mock[f].fields[i].label = field.label;
            mock[f].fields[i].type = field.type;
            mock[f].fields[i].placeholder = field.placeholder;
            break;
          }
        }
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
    updateFormById: updateFormById,
    getFieldsForForm: getFieldsForForm,
    getFieldForForm: getFieldForForm,
    deleteFieldFromForm: deleteFieldFromForm,
    createFieldForForm: createFieldForForm,
    updateField: updateField,
    getFieldTemplateType: getFieldTemplateType
  };
  return api
};