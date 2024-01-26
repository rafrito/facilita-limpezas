const express = require('express');
const app = express();
const routerClientes = require('./routes/clientes');

app.use(express.json());

app.use('/clientes', routerClientes);

app.get('/', (req, res) => {
  res.send('Bem-vindo ao servidor!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
