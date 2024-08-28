import React from 'react';

const Subtotal = ({ subtotals }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '8px', fontWeight: 'bold' }}>
      {subtotals.map((total, index) => (
        <div key={index} style={{ margin: '0 16px', textAlign: 'center' }}>
          {total}
        </div>
      ))}
    </div>
  );
};

export default Subtotal;
