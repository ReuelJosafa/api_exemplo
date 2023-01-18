const aluno = require('../repositories/Alunos');

class AlunosController {
    async get(req, res) {
        let alunos = await aluno.findAll();

        if (!alunos) {
            return res.status(500).send();
        }

        return res.status(200).json(alunos);
    }
}

module.exports = new AlunosController();
