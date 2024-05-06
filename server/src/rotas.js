const express = require('express');
const usuarios = require('./controlador/usuarios');

const rotas = express();

rotas.post('/usuarios', usuarios.cadastrarUsuario);
rotas.post('/login', usuarios.login);

module.exports = rotas;