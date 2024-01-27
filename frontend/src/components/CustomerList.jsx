import { useState, useEffect } from 'react';
import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async (termoBusca = '') => {
    try {
      const response = await axios.post(`http://${BACKEND_URL}/clientes/list`, {
        pagina: 0,
        tamanhoPagina: 10,
        termoBusca
      });
      setCustomers(response.data);
    } catch (error) {
      console.error('Erro ao buscar clientes', error);
      // Tratamento de erros
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    fetchCustomers(searchTerm);
  };

  return (
    <div className='container'>
      <h2>Lista de Clientes</h2>
      <input
        style={{width: "200px"}}
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Pesquisar por nome ou email"
      />
      <button onClick={handleSearch}>Buscar</button>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Coordenada x</th>
            <th>Coordenada y</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer, index) => (
            <tr key={index}>
              <td>{customer.nome}</td>
              <td>{customer.email}</td>
              <td>{customer.telefone}</td>
              <td>{customer.eixo_x}</td>
              <td>{customer.eixo_y}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomerList;
