import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
import Header from './components/Header';
import CustomerForm from './components/CustomerForm';
import CustomerList from './components/CustomerList';
import CustomerAddress from './components/CustomerAdress';
import Visitation from './components/Visitation';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ordemClientes, setOrdemClientes] = useState([]);

  const fetchOrderList = async () => {
    try {
      // Substitua com a URL correta da sua API
      const response = await axios.get(`http://${BACKEND_URL}/clientes/rota`);
      setOrdemClientes(response.data);
    } catch (error) {
      console.error('Erro ao buscar ordem dos clientes:', error);
    }
  };

  const handleOpenModal = () => {
    fetchOrderList();
    setIsModalOpen(true);
  };

  return (
    <div className='container'>
      <Header />
      <CustomerForm />
      <CustomerAddress />
      <CustomerList />
      <button onClick={handleOpenModal}>Ver Ordem de Visitação</button>
      <Visitation
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        orderList={ordemClientes}
      />
    </div>
  );
}

export default App;
