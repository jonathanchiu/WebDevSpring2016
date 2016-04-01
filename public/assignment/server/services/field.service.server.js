module.exports = function(app, formModel, fieldModel) {
  app.get("/api/assignment/form/:formId/field", getFieldsForForm);
  app.get("/api/assignment/form/:formId/field/:fieldId", getFieldForForm);
  app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldFromForm);
  app.post("/api/assignment/form/:formId/field", createFieldForForm);
  app.put("/api/assignment/form/:formId/field/:fieldId", updateField);
  app.get("/api/assignment/field/:fieldType", getFieldTemplateType);
  app.put("/api/assignment/form/:formId/field/", updateAllFieldsForForm);

  function updateAllFieldsForForm(req, res) {
    var formId = req.params.formId;
    var fields = req.body;

    formModel
      .updateAllFieldsForForm(formId, fields)
      .then(
        function(doc) {
          res.json(doc);
        },
        function(err) {
          res.status(400).send(err);
        }
      );
  }

  function getFieldsForForm(req, res) {
    var formId = req.params.formId;
    formModel
      .getFieldsForForm(formId)
      .then(
        function(doc) {
          res.json(doc);
        },
        function(err) {
          res.status(400).send(err);
        }
      );
  }

  function getFieldTemplateType(req, res) {
    var fieldType = req.params.fieldType;

    fieldModel
      .getFieldTemplateType(fieldType)
      .then(
        function(doc) {
          res.json(doc);
        },
        function(err) {
          res.status(400).send(err);
        }
      );
  }

  function getFieldForForm(req, res) {
    var formId = req.params.formId;
    var fieldId = req.params.fieldId;
    var field = formModel.getFieldForForm(formId, fieldId);
    res.json(field);
  }

  function deleteFieldFromForm(req, res) {
    var formId = req.params.formId;
    var fieldId = req.params.fieldId;
    formModel
      .deleteFieldFromForm(formId, fieldId)
      .then(
        function(doc) {
          return formModel.getFieldsForForm(formId);
        },
        function(err) {
          res.status(400).send(err);
        }
      )
      .then(
        function(doc) {
          res.json(doc);
        },
        function(err) {
          res.status(400).send(err);
        }
      );
  }

  function createFieldForForm(req, res) {
    var formId = req.params.formId;
    var field = req.body;

    formModel
      .createFieldForForm(formId, field)
      .then(
        function(doc) {
          res.json(doc);
        },
        function(err) {
          console.log(err);
          res.status(400).send(err);
        }
      );
  }

  function updateField(req, res) {
    var formId = req.params.formId;
    var fieldId = req.params.fieldId;
    var field = req.body;
    formModel
      .updateField(formId, fieldId, field)
      .then(
        function(doc) {
          return formModel.getFieldsForForm(formId);
        },
        function(err) {
          res.status(400).send(err);
        }
      )
      .then(
        function(doc) {
          res.json(doc);
        },
        function(err) {
          res.status(400).send(err);
        }
      );
  }
};