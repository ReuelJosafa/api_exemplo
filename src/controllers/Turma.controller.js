const turma = require('../models/Turma');

class TurmaController {
    async get(req, res) {
        let turmas = await turma.findAll();

        if (!turmas) {
            return res.status(500).send();
        }

        let turmaCursoJson = [];

        turmas.forEach(turma => {
            let { id, grupo, ano_inicio, periodo_atual, turno,
                id_curso, curso, curso_abr, grau, duracao_anos,
                periodo_letivo, periodo_letivo_abreviado } = turma
            turmaCursoJson.push({
                id, grupo, ano_inicio, periodo_atual, turno,
                curso: { id_curso, nome: curso, abreviado: curso_abr, grau, duracao_anos, periodo_letivo, periodo_letivo_abreviado }
            });
        });

        return res.status(200).json(turmaCursoJson);
    }

    async getById(req, res) {
        let id = req.params.id;
        let turmaEncontrada = await turma.findById(id);

        if (!turmaEncontrada) {
            return res.status(500).send();
        }

        let { grupo, ano_inicio, periodo_atual, turno, fk_id_curso } = turmaEncontrada

        return res.json({
            id, grupo, ano_inicio, periodo_atual, turno, id_curso: fk_id_curso
        });
    }

    async create(req, res) {
        let { grupo, ano_inicio, periodo_atual, turno, id_curso } = req.body;

        try {
            await turma.add({ grupo, ano_inicio, periodo_atual, turno, id_curso });

            return res.status(200).send();
        } catch (error) {
            console.log(error);
            return res.status(500);
        }
    }

    async edit(req, res) {
        let { grupo, ano_inicio, periodo_atual, turno, id_curso } = req.body;
        let id = req.params.id;
        let result = await turma.update({ id, ano_inicio, periodo_atual, turno, id_curso });

        if (!result) {
            return res.status(406).send();
        }

        if (result) {
            return res.status(200).send();
        }
    }

    async remove(req, res) {
        let id = req.params.id;
        let result = await turma.delete(id);

        if (!result) {
            return res.status(406).send();
        }

        if (result) {
            return res.status(200).send();
        }
    }

}

module.exports = new TurmaController();