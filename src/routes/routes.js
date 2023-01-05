const express = require('express');
const turmaController = require('../controllers/Turma.controller');
const periodicidadeController = require('../controllers/Periodicidade.controller');
const routers = express.Router();

routers.get('/turmas', turmaController.get);
routers.get('/turma/:id', turmaController.getById);
routers.post('/turma', turmaController.create);
routers.put('/turma/:id', turmaController.edit);
routers.delete('/turma/:id', turmaController.remove);

routers.get('/periodicidades', periodicidadeController.get);

module.exports = routers;