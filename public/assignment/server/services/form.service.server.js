module.exports = function(app, formModel) {
  app.get("/api/assignment/user/:userId/form", findAllFormsForUser);
  app.post("/api/assignment/user/:userId/form", createFormForUser);
  app.get("/api/assignment/form/:formId", findFormById);
  app.delete("/api/assignment/form/:formId", deleteFormById);
  app.put("/api/assignment/form/:formId", updateFormById);

  function createFormForUser(req, res) {
    var userId = req.params.userId;
    var newForm = req.body;
    formModel
      .createFormForUser(userId, newForm)
      .then(
        function(doc) {
          return formModel.findAllFormsForUser(userId);
        },
        function(err) {
          res.status(400).send(err);
        }
      )
      .then(
        function(forms) {
          res.json(forms);
        },
        function(err) {
          res.status(400).send(err);
        }
      );
  }

  function findFormById(req, res) {
    var formId = req.params.formId;
    var form = formModel.findFormById(formId);
    res.json(form);
  }

  function findAllFormsForUser(req, res) {
    var userId = req.params.userId;
    formModel
      .findAllFormsForUser(userId)
      .then(
        function(doc) {
          res.json(doc);
        },
        function(err) {
          res.status(400).send(err);
        }
      );
  }

  function deleteFormById(req, res) {
    var formId = req.params.formId;

    formModel
      .deleteFormById(formId)
      .then(
        function(doc) {
          res.send(200);
        },
        function(err) {
          res.status(400).send(err);
        }
      );
  }

  function updateFormById(req, res) {
    var formId = req.params.formId;
    var form = req.body;
    formModel
      .updateFormById(formId, form)
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