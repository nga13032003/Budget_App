import { useState } from 'react';
import months from '../components/months'; // Define your months array elsewhere

const useIncomeTable = (initialData) => {
  const [dataSource, setDataSource] = useState(initialData);

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
    return months.map((_, monthIndex) => 
      subcategories.reduce((sum, sub) => sum + sub.values[monthIndex], 0)
    );
  };

  const calculateTotalIncome = () => {
    return months.map((_, monthIndex) => 
      dataSource.reduce((sum, category) => 
        sum + calculateSubTotal(category.subcategories)[monthIndex], 0)
    );
  };

  return { dataSource, addCategory, addSubCategory, handleCellChange, calculateSubTotal, calculateTotalIncome };
};

export default useIncomeTable;
