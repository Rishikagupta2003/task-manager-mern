const FilterBar = ({ currentFilter, onFilterChange }) => {
  const filters = ['all', 'pending', 'completed'];

  return (
    <div className="filter-bar">
      {filters.map(filter => (
        <button
          key={filter}
          className={`filter-btn ${currentFilter === filter ? 'active' : ''}`}
          onClick={() => onFilterChange(filter)}
        >
          {filter.charAt(0).toUpperCase() + filter.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default FilterBar;
