module.exports = function(app, formModel) {
  app.get("/api/assignment/user/:userId/form", findAllFormsForUser);
  app.post("/api/assignment/user/:userId/form", createFormForUser);
  app.get("/api/assignment/form/:formId", findFormById);
  app.delete("/api/assignment/form/:formId", deleteFormById);
  app.put("/api/assignment/form/:formId", updateFormById);

  function createFormForUser(req, res) {
    var userId = req.params.userId;
    var newForm = req.body;
    var forms = formModel.createFormForUser(userId, newForm);
    res.json(forms);
  }

  function findFormById(req, res) {
    var formId = req.params.formId;
    var form = formModel.findFormById(formId);
    res.json(form);
  }

  function findAllFormsForUser(req, res) {
    var userId = req.params.userId;
    var forms = formModel.findAllFormsForUser(userId);
    res.json(forms);
  }

  function deleteFormById(req, res) {
    var formId = req.params.formId;
    var forms = formModel.deleteFormById(formId);
    res.json(forms);
  }

  function updateFormById(req, res) {
    var formId = req.params.formId;
    var form = req.body;
    var forms = formModel.updateFormById(formId, form);
    res.json(forms);
  }
};