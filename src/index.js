var bodyParser = require('body-parser')
const express = require('express');
const routers = require('./routes/routes');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    return res.status(200).json({ "msg": "Olá, mundo!" });
});

app.use(routers);


app.listen('8081', () => {
    console.log('Servidor no ar!')
});