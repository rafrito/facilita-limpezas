const express = require('express');
const app = express();

app.use(express.json());

// Defina suas rotas aqui

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
