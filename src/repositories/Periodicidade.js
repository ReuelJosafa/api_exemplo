const knex = require("../database/connection");
let nomeTabela = 'periodicidades';

class Periodicidade {

    async findAll() {
        try {
            return knex.select()
                .from(nomeTabela);
        } catch (error) {
            console.log(error);
            return undefined;
        }
    }

    async add(periodicidade) {
        let { nome, nome_abreviado } = periodicidade;
        // Validar campos

        try {
            return await knex.insert({ nome, nome_abreviado }).table(nomeTabela)
        } catch (error) {
            return undefined;
        }
    }

    async findById(id) {
        try {
            let periodicidade = await knex.select().from(nomeTabela).where({ id: id });

            if (periodicidade.length > 0) {
                return periodicidade[0];
            }

            return 404;

        } catch (error) {
            console.log(error);
            return undefined;
        }
    }

    async update(periodicidadeReq) {
        let { nome, nome_abreviado } = periodicidadeReq;
        let editPeriodicidade = {};
        let periodicidade = await this.findById(id);

        if (!periodicidade) {
            return undefined;
        }

        if (nome && nome.toLowerCase() != periodicidade.nome.toLowerCase()) {
            editPeriodicidade.nome = nome;
        }
        if (nome_abreviado && nome_abreviado.toLowerCase() != periodicidade.nome_abreviado.toLowerCase()) {
            editPeriodicidade.nome_abreviado = nome_abreviado;
        }


        try {
            var result = await knex.update(editPeriodicidade).where({ id: id }).table(nomeTabela);
            console.log(result)
            return result;
        } catch (error) {
            console.log(error)
            return undefined;
        }
    }

    async delete(id) {
        try {
            let result = await knex.delete().from(nomeTabela).where({ id: id });
            console.log(result)
            return result;

        } catch (error) {
            console.log(error);
            return undefined;
        }
    }
}

module.exports = new Periodicidade();