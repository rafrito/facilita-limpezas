const cliente = require('../models/db.clientes');


async function cadastroCliente(nome, email, telefone) {
    const clienteCadastrado = await cliente.emailExiste(email)

    if (clienteCadastrado) return {
        inserted: false,
        message: "Cadastro não efetuado. Email já está cadastrado."
    }

    await cliente.insertCliente(nome, email, telefone);
    return { inserted: true, message: "Cliente cadastrado com sucesso." }
};

async function buscarClientesPaginado(pagina, tamanhoPagina, termoBusca) {
    const limit = tamanhoPagina || 10;
    const offset = pagina * tamanhoPagina || 0;
    return await cliente.buscarClientes(limit, offset, termoBusca);
};

module.exports = { cadastroCliente, buscarClientesPaginado }
