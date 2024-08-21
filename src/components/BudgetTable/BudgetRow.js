import React from 'react';
import { Input } from 'antd';

const BudgetRow = ({ value, onChange, onDeleteRow, onContextMenu }) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onChange(e.target.value);
    }
  };

  return (
    <div onContextMenu={onContextMenu}>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={handleKeyPress}
        onKeyDown={(e) => e.key === 'Delete' && onDeleteRow()}
      />
    </div>
  );
};

export default BudgetRow;
