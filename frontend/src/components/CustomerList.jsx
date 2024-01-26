import React, { useState } from 'react';
import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function CustomerList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [customers, setCustomers] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://${BACKEND_URL}/clientes/list?name=${searchTerm}`);
      setCustomers(response.data); // Supondo que a API retorne uma lista de clientes
    } catch (error) {
      console.error('Erro ao buscar clientes', error);
    }
  };

  return (
    <div>
      <h2>Lista de Clientes</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Digite um nome"
        />
        <button type="submit">Buscar</button>
      </form>
      {customers.map((customer, index) => (
        <div key={index}>
          <p>{customer.nome}</p>
          <p>{customer.email}</p>
          <p>{customer.telefone}</p>
        </div>
      ))}
    </div>
  );
}

export default CustomerList;
