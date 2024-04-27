const knex = require('../infra/conexao');
const bcrypt = require('bcrypt');

const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
        const emailExistente = await knex('usuarios').where({ email }).first();

        if (emailExistente) {
            return res.status(401).json({ mensagem: 'Email existente! Faça o login.' });
        }

        const senhaCrypt = await bcrypt.hash(senha, 10);

        const usuarioCadastrado = await knex('usuarios').insert({ nome, email, senha: senhaCrypt }).returning(["id", "nome", "email"]);

        const { senha: _, ...usuarioReturn } = usuarioCadastrado[0];

        return res.status(202).json(usuarioReturn);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
}

const login = async (req, res) => {
    const { email, senha } = req.body;

    try {
        const usuarioExistente = await knex('usuarios').where({ email }).first();

        if (!usuarioExistente) {
            return res.status(401).json({ mensagem: 'E-mail ou senha incorretos ! Tente novamente.' });
        }

        if (!(await bcrypt.compare(senha, usuarioExistente.senha))) {
            return res.status(401).json({ mensagem: 'E-mail ou senha incorretos ! Tente novamente.' });
        }

        return res.json({ mensagem: 'Login efetuado com sucesso.' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
}

module.exports = {
    cadastrarUsuario,
    login
}