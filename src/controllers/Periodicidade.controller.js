const periodicidade = require('../repositories/Periodicidade');

class PeriodicidadeController {
    async get(req, res) {
        let periodicidades = await periodicidade.findAll();

        if (!periodicidades) {
            return res.status(500).send();
        }

        return res.status(200).json(periodicidades);
    }
}

module.exports = new PeriodicidadeController();
