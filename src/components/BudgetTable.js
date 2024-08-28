import React from 'react';
import IncomeTable from '../components/IncomeTable';
import { Button } from 'antd';

const initialData = [
  {
    key: '1',
    category: 'General Income',
    subcategories: [
      { name: 'Sales', values: Array(12).fill(0) },
      { name: 'Commission', values: Array(12).fill(0) },
    ],
  },
  // {
  //   key: '2',
  //   category: 'Other Income',
  //   subcategories: [
  //     { name: 'Training', values: Array(12).fill(0) },
  //     { name: 'Consulting', values: Array(12).fill(0) },
  //   ],
  // },
];

const BudgetTable = () => {
  return (
    <div>
      <h2>Income Overview</h2>
      <IncomeTable initialData={initialData} />
      <Button style={{ marginTop: 16 }}>Add a new Parent Income Category</Button>
    </div>
  );
};

export default BudgetTable;
