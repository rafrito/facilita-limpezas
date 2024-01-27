const pool = require('../config/db');


async function insertCliente(nome, email, telefone) {
    const result = await pool.query(
        'INSERT INTO operacao.clientes (nome, email, telefone) VALUES ($1, $2, $3) RETURNING *;',
        [nome, email, telefone]
    );
    return result.rows[0];
};

async function insertEndereco(email, eixo_x, eixo_y) {
    const result = await pool.query(`
        INSERT INTO operacao.enderecos_clientes (cliente_id, eixo_x, eixo_y)
        VALUES ((SELECT id FROM operacao.clientes WHERE email = $1), $2, $3)
        RETURNING *;
        `,
        [email, eixo_x, eixo_y]
    );
    return result.rows[0];
};

async function emailExiste(email) {
    const result = await pool.query('SELECT * FROM operacao.clientes WHERE email = $1', [email]);
    return result.rows.length > 0;
};

async function buscarClientes(limit, offset, termoBusca) {
    const result = await pool.query(`
        SELECT c.nome, c.email, c.telefone, e.eixo_x, e.eixo_y
        FROM operacao.clientes c
        LEFT JOIN operacao.enderecos_clientes e
            ON c.id = e.cliente_id
        WHERE
            LOWER(nome) LIKE '%' || LOWER($3) || '%'
            or LOWER(email) LIKE '%' || LOWER($3) || '%'
        LIMIT $1 OFFSET $2
        `,
        [limit, offset, termoBusca]
    );
    return result.rows;
};

async function buscarEnderecos(limit, offset) {
    const result = await pool.query(`
        SELECT c.nome, e.eixo_x, e.eixo_y
        FROM operacao.clientes c
        JOIN operacao.enderecos_clientes e
            ON c.id = e.cliente_id
        LIMIT $1 OFFSET $2
        `,
        [limit, offset]
    );
    return result.rows;
};
module.exports = {
    insertCliente,
    insertEndereco,
    emailExiste,
    buscarClientes,
    buscarEnderecos
}