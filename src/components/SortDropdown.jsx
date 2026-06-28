import { FiArrowUp, FiArrowDown } from 'react-icons/fi'

const SORT_FIELDS = [
  { value: 'firstName', label: 'First name' },
  { value: 'lastName', label: 'Last name' },
  { value: 'email', label: 'Email' },
  { value: 'department', label: 'Department' },
]

function SortDropdown({ field, direction, onFieldChange, onDirectionToggle }) {
  return (
    <div className="sort-dropdown">
      <label className="sort-label" htmlFor="sort-field">
        Sort
      </label>
      <select
        id="sort-field"
        className="sort-select"
        value={field}
        onChange={(event) => onFieldChange(event.target.value)}
      >
        {SORT_FIELDS.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
      <button
        type="button"
        className="sort-direction"
        onClick={onDirectionToggle}
        aria-label={direction === 'asc' ? 'Sorted ascending' : 'Sorted descending'}
        title={direction === 'asc' ? 'Ascending' : 'Descending'}
      >
        {direction === 'asc' ? <FiArrowUp /> : <FiArrowDown />}
      </button>
    </div>
  )
}

export default SortDropdown
