const { cadastroCliente, buscarClientesPaginado } = require('../services/clientes');

const express = require('express');
const router = express.Router();


router.post('/cadastro', async (req, res) => {
  try {
    const body = await cadastroCliente(req.body.nome, req.body.email, req.body.telefone);
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