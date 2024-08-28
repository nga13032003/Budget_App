import React from 'react';
import { Table, Input, Button, Form } from 'antd';
import useIncomeTable from '../hooks/useIncomeTable';
import months from './months';

const IncomeTable = ({ initialData }) => {
  const { dataSource, addSubCategory, handleCellChange, calculateTotalIncome } = useIncomeTable(initialData);
  const [form] = Form.useForm();

  const columns = [
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (text, record, rowIndex) => {
        const isSubtotalRow = record.subcategories.length === 0; // Identify if the row is a subtotal row
        return isSubtotalRow ? (
          <strong style={{ color: 'blue' }}>Subtotal:</strong>
        ) : (
          <div>
            <strong>{text}</strong>
            <Button onClick={() => addSubCategory(record.key)} style={{ marginLeft: 8 }}>
              Add Subcategory
            </Button>
          </div>
        );
      },
    },
    ...months.map((month, monthIndex) => ({
      title: month,
      dataIndex: `month_${monthIndex + 1}`,
      key: `month_${monthIndex + 1}`,
      render: (_, record, rowIndex) => {
        const isSubtotalRow = record.subcategories.length === 0; // Identify if the row is a subtotal row
        return isSubtotalRow ? (
          <div style={{ fontWeight: 'bold', textAlign: 'center' }}>
            {calculateTotalIncome()[monthIndex]}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {record.subcategories.map((sub, subIndex) => (
              <Input
                key={`${record.key}_${subIndex}_${monthIndex}`}
                value={sub.values[monthIndex]}
                onChange={(e) => handleCellChange(e.target.value, record.key, subIndex, monthIndex)}
                style={{ width: '100%', marginBottom: 8 }}
              />
            ))}
          </div>
        );
      },
    })),
  ];

  // Extend the dataSource to include a subtotal row after each main category row
  const extendedDataSource = dataSource.reduce((acc, record) => {
    const subTotalRow = {
      key: `${record.key}_subtotal`,
      category: 'Subtotal',
      subcategories: [], // Empty subcategories to differentiate from the main rows
    };
    return [...acc, record, subTotalRow];
  }, []);

  return (
    <Form form={form} component={false}>
      <div style={{ marginBottom: 16 }}>
        <Button onClick={() => addSubCategory()} style={{ marginLeft: 8 }}>
          Add New Income Category
        </Button>
      </div>
      <Table
        dataSource={extendedDataSource}
        columns={columns}
        pagination={false}
        rowClassName={(record) => (record.subcategories.length === 0 ? 'subtotal-row' : 'editable-row')}
      />
    </Form>
  );
};

export default IncomeTable;
