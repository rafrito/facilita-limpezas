import React from 'react';

const Toast = ({ message, show, onClose }) => {
  if (!show) {
    return null;
  }

  setTimeout(() => {
    onClose();
  }, 5000);

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      padding: '10px 20px',
      backgroundColor: 'rgba(0,0,0,0.7)',
      color: 'white',
      borderRadius: '5px',
      zIndex: 1000,
    }}>
      {message}
    </div>
  );
};

export default Toast;
