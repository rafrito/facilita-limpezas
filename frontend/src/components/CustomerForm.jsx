import { useState } from 'react';
import axios from 'axios';
import Toast from './Toast.jsx'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function CustomerForm() {
  const [customer, setCustomer] = useState({
    nome: '',
    email: '',
    telefone: ''
  });

  const [toast, setToast] = useState({ show: false, message: '' });

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://${BACKEND_URL}/clientes/cadastro`, customer);
      setCustomer({ nome: '', email: '', telefone: '' });
      response.data.inserted ?
        setToast({ show: true, message: 'Cliente cadastrado com sucesso!' }) :
        setToast({ show: true, message: response.data.message })
    } catch (error) {
      console.error('Erro ao adicionar cliente', error);
      setToast({ show: true, message: 'Erro ao cadastrar cliente.' });
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
      <Toast 
      message={toast.message}
      show={toast.show}
      onClose={() => setToast({ ...toast, show: false })}
    />
    </div>
  );
}

export default CustomerForm;
