// import { knex } from "../database/connection";
const knex = require("../database/connection");

class Turma {
    async findAll() {
        try {
            return knex.select(["t.id", "t.grupo", "t.ano_inicio", "t.periodo_atual", "t.turno",
                "c.id as id_curso", "c.nome as curso", "c.nome_abreviado as curso_abr", "c.grau", "c.duracao_anos",
                'p.nome as periodo_letivo', 'p.nome_abreviado as periodo_letivo_abreviado'
            ])
                .from("turmas as t")
                .innerJoin("cursos as c", 't.fk_id_curso', '=', 'c.id')
                .innerJoin("periodicidades as p", 'p.id', '=', 'c.fk_id_periodicidade');
        } catch (error) {
            console.log(error);
            return undefined;
        }
    }

    async add(turma) {
        let { grupo, ano_inicio, periodo_atual, turno, id_curso } = turma;
        // Validar campos

        try {
            return await knex.insert({ grupo, ano_inicio, periodo_atual, turno, fk_id_curso: id_curso }).table("turmas")
        } catch (error) {
            return undefined;
        }
    }

    async findById(id) {
        try {
            let turmas = await knex.select().from("turmas").where({ id: id });

            if (turmas.length > 0) {
                return turmas[0];
            }

            return 404;

        } catch (error) {
            console.log(error);
            return undefined;
        }
    }

    async update(turmaReq) {
        let { grupo, id, ano_inicio, periodo_atual, turno, id_curso } = turmaReq;
        let editTurma = {};
        let turma = await this.findById(id);

        if (!turma) {
            return undefined;
        }

        if (grupo && grupo.toLowerCase() != turma.grupo.toLowerCase()) {
            editTurma.grupo = grupo;
        }
        if (ano_inicio && ano_inicio != turma.ano_inicio) {
            editTurma.ano_inicio = ano_inicio;
        }
        if (periodo_atual && periodo_atual != turma.periodo_atual) {
            editTurma.periodo_atual = periodo_atual;
        }
        if (turno && turno.toLowerCase() != turma.turno.toLowerCase()) {
            editTurma.turno = turno;
        }
        if (id_curso && id_curso != turma.fk_id_curso) {
            editTurma.fk_id_curso = id_curso;
        }

        try {
            var result = await knex.update(editTurma).where({ id: id }).table("turmas");
            console.log(result)
            return result;
        } catch (error) {
            console.log(error)
            return undefined;
        }
    }

    async delete(id) {
        try {
            let result = await knex.delete().from("turmas").where({ id: id });
            console.log(result)
            return result;

        } catch (error) {
            console.log(error);
            return undefined;
        }
    }
}

module.exports = new Turma();