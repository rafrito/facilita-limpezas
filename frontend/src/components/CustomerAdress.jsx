import { useState } from 'react';
import axios from 'axios';
import Toast from './Toast.jsx'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function CustomerAddress() {
  const [customer, setCustomer] = useState({
    email: '',
    eixo_x: '',
    eixo_y: ''
  });

  const [toast, setToast] = useState({ show: false, message: '' });

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://${BACKEND_URL}/clientes/endereco`, customer);
      setCustomer({ email: '', eixo_x: '', eixo_y: '' });
      response.data.inserted ?
        setToast({ show: true, message: 'Endereço cadastrado com sucesso!' }) :
        setToast({ show: true, message: response.data.message })
    } catch (error) {
      console.error('Erro ao adicionar endereço de cliente', error);
      setToast({ show: true, message: 'Erro ao cadastrar endereço.' });
    }
  };

  return (
    <div>
      <h2>Cadastrar Endereço de Cliente</h2>
      <form onSubmit={handleSubmit}>
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
          <label htmlFor="eixo_x">Eixo X:</label>
          <input
            type="number"
            id="eixo_x"
            name="eixo_x"
            min="-100"
            max="100"
            value={customer.eixo_x}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="eixo_x">Eixo Y:</label>
          <input
            type="number"
            id="eixo_y"
            name="eixo_y"
            min="-100"
            max="100"
            value={customer.eixo_y}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Cadastrar Endereço</button>
      </form>
      <Toast 
      message={toast.message}
      show={toast.show}
      onClose={() => setToast({ ...toast, show: false })}
    />
    </div>
  );
}

export default CustomerAddress;
