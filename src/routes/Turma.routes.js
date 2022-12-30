const express = require('express');
const turmaController = require('../controllers/Turma.controller');
const turmaRouter = express.Router();

turmaRouter.get('/turmas', turmaController.get);
turmaRouter.get('/turma/:id', turmaController.getById);
turmaRouter.post('/turma', turmaController.create);
turmaRouter.put('/turma/:id', turmaController.edit);
turmaRouter.delete('/turma/:id', turmaController.remove);

module.exports = turmaRouter;