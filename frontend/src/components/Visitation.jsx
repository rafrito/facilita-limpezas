import React from 'react';


const Visitation = ({ isOpen, onClose, orderList }) => {
  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ backgroundColor: 'black', padding: 20, maxHeight: '90vh', overflowY: 'auto' }}>
        <button onClick={onClose}>Fechar</button>
        <h3>Ordem de Visitação</h3>
        <table>
          <thead>
            <tr>
              <th>Ordem</th>
              <th>Nome do Cliente</th>
              <th>Eixo X</th>
              <th>Eixo Y</th>
            </tr>
          </thead>
          <tbody>
            {orderList.map((cliente, index) => (
              <tr key={index}>
                <td>{cliente.ordem}</td>
                <td>{cliente.nome}</td>
                <td>{cliente.eixo_x}</td>
                <td>{cliente.eixo_y}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Visitation;
