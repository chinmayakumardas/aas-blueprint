// components/Sort.js
const Sort = ({ onSortChange }) => {
    const handleSortChange = (e) => {
      onSortChange(e.target.value); // Trigger debounced sort
    };
  
    return (
      <div>
        <select onChange={handleSortChange} className="border p-2 rounded">
          <option value="asc">Sort Ascending</option>
          <option value="desc">Sort Descending</option>
        </select>
      </div>
    );
  };
  
  export default Sort;
  