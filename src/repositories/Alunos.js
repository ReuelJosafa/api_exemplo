const knex = require("../database/connection");
let nomeTabela = 'alunos';

class Aluno {

    async findAll() {
        try {
            return knex.select()
                .from(nomeTabela);
        } catch (error) {
            console.log(error);
            return undefined;
        }
    }

}

module.exports = new Aluno();