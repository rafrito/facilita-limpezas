const cliente = require('../models/db.clientes');
const { heldKarp } = require('../utils/tspSolver')

async function cadastroCliente(nome, email, telefone) {
    const clienteCadastrado = await cliente.emailExiste(email)

    if (clienteCadastrado) return {
        inserted: false,
        message: "Cadastro não efetuado. Email já está cadastrado."
    }

    await cliente.insertCliente(nome, email, telefone);
    return { inserted: true, message: "Cliente cadastrado com sucesso." }
};

async function cadastroEndereco(email, eixo_x, eixo_y) {
    const clienteCadastrado = await cliente.emailExiste(email)

    if (!clienteCadastrado) return {
        inserted: false,
        message: "Cadastro de endereço não efetuado. Email não está cadastrado."
    }

    await cliente.insertEndereco(email, eixo_x, eixo_y);
    return { inserted: true, message: "Endereço cadastrado com sucesso." }
};

async function buscarClientesPaginado(pagina, tamanhoPagina, termoBusca) {
    const limit = tamanhoPagina || 10;
    const offset = pagina * tamanhoPagina || 0;
    return await cliente.buscarClientes(limit, offset, termoBusca);
};

async function buscarRota() {
    const limit = 15;
    const offset = 0;
    const clientes = await cliente.buscarEnderecos(limit, offset);
    const pontos = clientes.map(cliente => ({ x: cliente.eixo_x, y: cliente.eixo_y }));
    pontos.unshift({ x: 0, y: 0 })
    let { distancia, caminho } = heldKarp(pontos);
    const body = [];
    caminho = caminho.filter(x => x != 0)
    caminho.forEach((el, index) => {
        body.push(
            {
                ordem: index + 1,
                nome: clientes[el - 1].nome,
                eixo_x: clientes[el - 1].eixo_x,
                eixo_y: clientes[el - 1].eixo_y,

            }
        )
    });
    return body
}

module.exports = {
    cadastroCliente, buscarClientesPaginado, cadastroEndereco, buscarRota
}
