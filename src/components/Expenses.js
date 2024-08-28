import React, { useState } from 'react';
import { Table, Input, Button, Form } from 'antd';
import months from '../components/BudgetTable'; 

const IncomeTable = () => {
  const [dataSource, setDataSource] = useState([]);
  const [form] = Form.useForm();

  const addCategory = (categoryType) => {
    const newCategory = {
      key: Date.now().toString(),
      category: categoryType,
      subcategories: [{ name: '', values: Array(12).fill(0) }],
    };
    setDataSource([...dataSource, newCategory]);
  };

  const addSubCategory = (categoryKey) => {
    const newData = [...dataSource];
    const category = newData.find(cat => cat.key === categoryKey);
    category.subcategories.push({ name: '', values: Array(12).fill(0) });
    setDataSource(newData);
  };

  const handleCellChange = (value, recordKey, subIndex, monthIndex) => {
    const newData = [...dataSource];
    const record = newData.find((item) => item.key === recordKey);
    record.subcategories[subIndex].values[monthIndex] = parseFloat(value) || 0;
    setDataSource(newData);
  };

  const calculateSubTotal = (subcategories) => {
    return subcategories.reduce((totals, sub) => {
      return totals.map((total, monthIndex) => total + sub.values[monthIndex]);
    }, Array(12).fill(0));
  };

  const calculateTotalIncome = () => {
    return dataSource.reduce((totals, category) => {
      const subTotal = calculateSubTotal(category.subcategories);
      return totals.map((total, monthIndex) => total + subTotal[monthIndex]);
    }, Array(12).fill(0));
  };

  const columns = [
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (text, record) => (
        <div>
          <strong>{text}</strong>
          <Button onClick={() => addSubCategory(record.key)} style={{ marginLeft: 8 }}>
            Add a new Expenses
          </Button>
        </div>
      ),
    },
    ...months.map((month, index) => ({
      title: month,
      dataIndex: `month_${index + 1}`,
      key: `month_${index + 1}`,
      render: (_, record) =>
        record.subcategories.map((sub, subIndex) => (
          <Input
            key={`${record.key}_${subIndex}`}
            value={sub.values[index]}
            onChange={(e) => handleCellChange(e.target.value, record.key, subIndex, index)}
            style={{ width: '100%' }}
          />
        )),
    })),
    {
      title: 'Subtotal',
      dataIndex: 'subtotal',
      key: 'subtotal',
      render: (_, record) => (
        <div style={{ fontWeight: 'bold' }}>
          {calculateSubTotal(record.subcategories).map((total, index) => (
            <span key={index} style={{ marginRight: 16 }}>
              {months[index]}: {total}
            </span>
          ))}
        </div>
      ),
    },
  ];

  return (
    <Form form={form} component={false}>
      <div style={{ marginBottom: 16 }}>
        <Button onClick={() => addCategory('Other Income')} style={{ marginLeft: 8 }}>Add Other Expenses</Button>
      </div>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        rowClassName="editable-row"
      />
      <div style={{ marginTop: 16 }}>
        <strong>Total Expenses:</strong>
        <div>
          {calculateTotalIncome().map((total, index) => (
            <span key={index} style={{ marginRight: 16 }}>
              {months[index]}: {total}
            </span>
          ))}
        </div>
      </div>
    </Form>
  );
};

export default IncomeTable;
