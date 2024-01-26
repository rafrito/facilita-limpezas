const pool = require('../config/db');


async function insertCliente(nome, email, telefone) {
    const result = await pool.query(
        'INSERT INTO operacao.clientes (nome, email, telefone) VALUES ($1, $2, $3) RETURNING *;',
        [nome, email, telefone]
    );
    return result.rows[0];
};

async function emailExiste(email) {
    const result = await pool.query('SELECT * FROM operacao.clientes WHERE email = $1', [email]);
    return result.rows.length > 0;
};

async function buscarClientes(limit, offset) {
    const result = await pool.query(
        'SELECT * FROM operacao.clientes LIMIT $1 OFFSET $2',
        [limit, offset]
        );
    return result.rows;
}

module.exports = {
    insertCliente,
    emailExiste,
    buscarClientes
}