const cliente = require('../models/db.clientes');


async function cadastroCliente(nome, email, telefone) {
    const clienteCadastrado = await cliente.emailExiste(email)

    if (clienteCadastrado) return { message: "Cadastro não efetuado. Email já está cadastrado." }

    await cliente.insertCliente(nome, email, telefone);
    return { message: "Cliente cadastrado com sucesso." }
};

async function buscarClientesPaginado(page, pageOffset, pageSize) {
    const limit = page * pageSize;
    const offset = pageSize * pageOffset;
    return await cliente.buscarClientes(limit, offset);
};

module.exports = { cadastroCliente, buscarClientesPaginado }
