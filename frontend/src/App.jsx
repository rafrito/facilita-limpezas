// src/App.js
import React from 'react';
import './App.css';
import Header from './components/Header';
import CustomerForm from './components/CustomerForm';
import CustomerList from './components/CustomerList';

function App() {
  return (
    <div className="container">
      <Header />
      <CustomerForm />
      <CustomerList />
    </div>
  );
}

export default App;
