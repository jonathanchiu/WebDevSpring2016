var mock = require("./form.mock.json");
var fieldTemplates = require("./field-templates.mock.json");

module.exports = function(uuid, db, mongoose) {

  var FormSchema = require("./form.schema.server.js")();
  var Form = mongoose.model("Form", FormSchema);

  function findFormByTitle(title) {
    for (var f in mock) {
      if (mock[f].title === title) {
        return mock[f];
      }
    }
    return null;
  }

  function createFormForUser(userId, newForm) {
    return Form
            .create(newForm)
            .then(function(doc) {
              return doc;
            });
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
    return Form
            .find(userId)
            .then(function(doc) {
              return doc;
            });
  }

  function deleteFormById(formId) {
    return Form
            .remove({_id: formId})
            .then(function(doc) {
              console.log(doc);
              return doc;
            });
  }

  function updateFormById(formId, form) {
    return Form.findOneAndUpdate(
      {_id: formId},
      {$set: form},
      {new: true}
    )
    .then(function(doc) {
      console.log(doc);
      return doc;
    });
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
            mock[f].fields[i].placeholder = field.placeholder;
            if (field.options && mock[f].fields[i].options) {
              mock[f].fields[i].options = field.options;
            }
            return mock[f].fields[i];
          }
        }
      }
    }
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