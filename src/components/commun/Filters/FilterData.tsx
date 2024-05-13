 
interface DataItem {
  id: number;
  name: string;
  age: number;
  city: string;
}

const filterData = (data: DataItem[], selectedColumn: string, operator: Operator, value: string): DataItem[] => {
    return data.filter((item) => {
      const fieldValue = item[selectedColumn];
      switch (operator) {
        case 'equals':
          return fieldValue.toString().toLowerCase() === value.toString().toLowerCase();
        case 'greaterThan':
          return typeof fieldValue === 'number' && fieldValue > Number(value);
        case 'lessThan':
          return typeof fieldValue === 'number' && fieldValue < Number(value);
        default:
          return true; // No filtering if operator is invalid
      }
    });
  };

  export default FilterData;