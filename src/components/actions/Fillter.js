// components/Filter.js
const Filter = ({ onFilterChange }) => {
    const handleFilterChange = (e) => {
      onFilterChange(e.target.value); // Trigger debounced filter
    };
  
    return (
      <div>
        <select onChange={handleFilterChange} className="border p-2 rounded">
          <option value="">Select Filter</option>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
        </select>
      </div>
    );
  };
  
  export default Filter;
  