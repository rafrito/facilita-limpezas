// src/components/CustomerForm.js
import { useState } from 'react';
import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function CustomerForm() {
  const [customer, setCustomer] = useState({
    nome: '',
    email: '',
    telefone: ''
  });

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://${BACKEND_URL}/clientes/cadastro`, customer);
      console.log(response.data);
      // Limpa o formulário após a submissão
      setCustomer({ nome: '', email: '', telefone: '' });
      // Adicione aqui qualquer outra lógica pós-submissão necessária, como exibir uma notificação de sucesso
    } catch (error) {
      console.error('Erro ao adicionar cliente', error);
      // Adicione aqui qualquer lógica de tratamento de erro, como exibir uma mensagem de erro
    }
  };

  return (
    <div>
      <h2>Cadastrar Novo Cliente</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            id="nome"
            name="nome"
            maxLength="255"
            value={customer.nome}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            maxLength="255"
            value={customer.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="telefone">Telefone:</label>
          <input
            type="tel"
            id="telefone"
            name="telefone"
            placeholder='11 999888777'
            pattern='[0-9]{2} [0-9]{9}'
            value={customer.telefone}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Cadastrar Cliente</button>
      </form>
    </div>
  );
}

export default CustomerForm;
