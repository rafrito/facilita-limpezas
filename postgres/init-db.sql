CREATE SCHEMA IF NOT EXISTS operacao;

CREATE TABLE IF NOT EXISTS operacao.clientes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    telefone VARCHAR(10)
);

CREATE TABLE IF NOT EXISTS operacao.enderecos_clientes (
    id SERIAL PRIMARY KEY,
    cliente_id INTEGER REFERENCES operacao.clientes(id),
    rua VARCHAR(255),
    eixo_x INTEGER,
    eixo_y INTEGER
);
