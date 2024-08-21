import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import BudgetRow from './BudgetRow';

const BudgetTable = () => {
  const defaultMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const [dataSource, setDataSource] = useState([{ key: '1', category: 'Income', January: 0, February: 0, ... async (params) => {
    }
  }]);
  const [months, setMonths] = useState(defaultMonths);

  const handleCellChange = (index, key, value) => {
    const newData = [...dataSource];
    newData[index][key] = value;
    setDataSource(newData);
    // Update totals and carry forward logic here
  };

  const handleAddRow = () => {
    const newRow = { key: Date.now().toString(), category: '', ...months.reduce((acc, month) => ({ ...acc, [month]: 0 }), {}) };
    setDataSource([...dataSource, newRow]);
  };

  const handleDeleteRow = (index) => {
    const newData = dataSource.filter((_, i) => i !== index);
    setDataSource(newData);
    // Update totals here
  };

  
  const columns = [
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (text, record, index) => (
        <BudgetRow
          value={text}
          onChange={(value) => handleCellChange(index, 'category', value)}
          onDeleteRow={() => handleDeleteRow(index)}
        />
      ),
    },
    ...months.map((month) => ({
      title: month,
      dataIndex: month,
      key: month,
      render: (text, record, index) => (
        <BudgetRow
          value={text}
          onChange={(value) => handleCellChange(index, month, value)}
          onContextMenu={(e) => handleRightClick(e, index, month)}
        />
      ),
    })),
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record, index) => <button onClick={() => handleDeleteRow(index)}>Delete</button>,
    },
  ];
  const handleRightClick = (e, index, key) => {
    e.preventDefault();
    const applyToAll = () => {
      const value = dataSource[index][key];
      const newData = dataSource.map(row => ({ ...row, [key]: value }));
      setDataSource(newData);
    };
    // Render ContextMenu component
  };
  
  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      pagination={false}
      bordered
    />
  );
};

export default BudgetTable;
