require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
const routerClientes = require('./routes/clientes');


app.use(cors());

app.use(express.json());

app.use('/clientes', routerClientes);

app.get('/', (req, res) => {
  res.send('Bem-vindo ao servidor!\n');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
