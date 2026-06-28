import { useState, useEffect } from 'react'
import { FiX } from 'react-icons/fi'
import { DEPARTMENTS } from '../utils/helpers'

const EMPTY = { firstName: '', lastName: '', email: '', department: '' }

function FilterModal({ open, initialFilters, onApply, onReset, onClose }) {
  const [draft, setDraft] = useState(initialFilters || EMPTY)

  useEffect(() => {
    if (open) {
      setDraft(initialFilters || EMPTY)
    }
  }, [open, initialFilters])

  if (!open) {
    return null
  }

  const update = (field, value) => setDraft((current) => ({ ...current, [field]: value }))

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Filter users"
      >
        <div className="modal-header">
          <h2 className="modal-title">Filter users</h2>
          <button type="button" className="icon-button" onClick={onClose} aria-label="Close">
            <FiX />
          </button>
        </div>
        <div className="modal-body">
          <div className="field">
            <label className="field-label" htmlFor="filter-first">First name</label>
            <input
              id="filter-first"
              className="field-input"
              value={draft.firstName}
              onChange={(event) => update('firstName', event.target.value)}
              placeholder="Contains…"
            />
          </div>
          <div className="field">
            <label className="field-label" htmlFor="filter-last">Last name</label>
            <input
              id="filter-last"
              className="field-input"
              value={draft.lastName}
              onChange={(event) => update('lastName', event.target.value)}
              placeholder="Contains…"
            />
          </div>
          <div className="field">
            <label className="field-label" htmlFor="filter-email">Email</label>
            <input
              id="filter-email"
              className="field-input"
              value={draft.email}
              onChange={(event) => update('email', event.target.value)}
              placeholder="Contains…"
            />
          </div>
          <div className="field">
            <label className="field-label" htmlFor="filter-department">Department</label>
            <select
              id="filter-department"
              className="field-input"
              value={draft.department}
              onChange={(event) => update('department', event.target.value)}
            >
              <option value="">All departments</option>
              {DEPARTMENTS.map((department) => (
                <option key={department} value={department}>
                  {department}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="button button-ghost"
            onClick={() => {
              setDraft(EMPTY)
              onReset()
            }}
          >
            Reset
          </button>
          <button type="button" className="button button-primary" onClick={() => onApply(draft)}>
            Apply filters
          </button>
        </div>
      </div>
    </div>
  )
}

export default FilterModal
