const { cadastroCliente, buscarClientesPaginado } = require('../services/clientes');

const express = require('express');
const router = express.Router();


router.post('/cadastro', async (req, res) => {
  try {
    const { nome, email, telefone } = req.body
    const body = await cadastroCliente(nome, email, telefone);
    res.json(body);
  } catch (error) {
    console.error(error)
    res.status(500).send({ message: "Erro ao cadastrar cliente." });
  }
});

router.post('/list', async (req, res) => {
  try {
    const clientes = await buscarClientesPaginado(req.body.page, req.body.pageOffset, req.body.pageSize);
    res.json(clientes);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Erro ao buscar clientes." });
  }
});

module.exports = router
