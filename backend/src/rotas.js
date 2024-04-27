const express = require('express');
const usuarios = require('./controlador/usuarios');

const rotas = express();

rotas.get('/', (req, res) => {
    return res.send('Servidor ligado.')
});

rotas.post('/usuarios', usuarios.cadastrarUsuario);
rotas.post('/login', usuarios.login);

module.exports = rotas;