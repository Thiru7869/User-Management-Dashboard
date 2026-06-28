import { FiSearch, FiX } from 'react-icons/fi'

function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <FiSearch className="search-icon" aria-hidden="true" />
      <input
        type="search"
        className="search-input"
        placeholder="Search by name or email"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-label="Search users"
      />
      {value && (
        <button
          type="button"
          className="search-clear"
          onClick={() => onChange('')}
          aria-label="Clear search"
        >
          <FiX />
        </button>
      )}
    </div>
  )
}

export default SearchBar
