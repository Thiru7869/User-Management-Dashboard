import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

const PAGE_SIZES = [10, 25, 50, 100]

function Pagination({ page, pageSize, totalItems, onPageChange, onPageSizeChange }) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize))
  const start = totalItems === 0 ? 0 : (page - 1) * pageSize + 1
  const end = Math.min(page * pageSize, totalItems)

  return (
    <div className="pagination">
      <div className="pagination-info">
        Showing <strong>{start}</strong>–<strong>{end}</strong> of <strong>{totalItems}</strong>
      </div>
      <div className="pagination-controls">
        <label className="page-size">
          Rows
          <select value={pageSize} onChange={(event) => onPageSizeChange(Number(event.target.value))}>
            {PAGE_SIZES.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </label>
        <div className="pager">
          <button
            type="button"
            className="icon-button"
            onClick={() => onPageChange(page - 1)}
            disabled={page <= 1}
            aria-label="Previous page"
          >
            <FiChevronLeft />
          </button>
          <span className="pager-status">
            Page {page} of {totalPages}
          </span>
          <button
            type="button"
            className="icon-button"
            onClick={() => onPageChange(page + 1)}
            disabled={page >= totalPages}
            aria-label="Next page"
          >
            <FiChevronRight />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Pagination
