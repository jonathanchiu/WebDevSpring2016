var mock = require("./form.mock.json");
var fieldTemplates = require("./field-templates.mock.json");

module.exports = function(uuid, db, mongoose) {

  var FormSchema = require("./form.schema.server.js")();
  var Form = mongoose.model("Form", FormSchema);

  function updateAllFieldsForForm(formId, fields) {
    return Form
            .findById(formId)
            .then(function(doc) {
              doc.fields = fields;
              return doc.save();
            });
  }

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
    return Form
            .findById(formId)
            .then(function(doc) {
              return doc.fields;
            });
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
    return Form
            .update(
              {_id: formId},
              // We must convert the fieldId to an ObjectId that Mongo can recognize
              {$pull: {fields: {_id: mongoose.Types.ObjectId(fieldId)}}}
            )
            .then(function(doc) {
              console.log(doc);
              return doc;
            });
  }

  function createFieldForForm(formId, field) {
    // We do this so we can uniquely identify each field for other operations
    field._id = mongoose.Types.ObjectId();
    return Form
            .findById(formId)
            .then(function(doc) {
              doc.fields.push(field);
              return doc.save();
            });
  }


  function updateField(formId, fieldId, field) {
    return Form
            .update(
              {_id: formId, "fields._id" : mongoose.Types.ObjectId(fieldId) },
              {$set: {
                'fields.$.label' : field.label,
                'fields.$.type' : field.type,
                'fields.$.placeholder' : field.placeholder,
                'fields.$.options' : field.options
              }}
            )
            .then(function(doc) {
              return doc;
            });
  }

  var api = {
    findFormByTitle: findFormByTitle,
    updateAllFieldsForForm: updateAllFieldsForForm,
    createFormForUser: createFormForUser,
    findFormById: findFormById,
    findAllFormsForUser: findAllFormsForUser,
    deleteFormById: deleteFormById,
    updateFormById: updateFormById,
    getFieldsForForm: getFieldsForForm,
    getFieldForForm: getFieldForForm,
    deleteFieldFromForm: deleteFieldFromForm,
    createFieldForForm: createFieldForForm,
    updateField: updateField
  };
  return api
};