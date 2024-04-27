const express = require('express');

const rotas = express();

rotas.get('/', (req, res) => {
    return res.send('Servidor ligado.')
})

module.exports = rotas;