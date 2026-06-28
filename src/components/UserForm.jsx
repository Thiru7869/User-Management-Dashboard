import { useState, useEffect } from 'react'
import { FiX } from 'react-icons/fi'
import { DEPARTMENTS } from '../utils/helpers'
import { validateUser } from '../utils/validation'

const EMPTY = { firstName: '', lastName: '', email: '', department: '' }

function UserForm({ open, mode, initialUser, onSubmit, onClose }) {
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [serverError, setServerError] = useState('')

  useEffect(() => {
    if (open) {
      setValues(
        initialUser
          ? {
              firstName: initialUser.firstName,
              lastName: initialUser.lastName,
              email: initialUser.email,
              department: initialUser.department,
            }
          : EMPTY,
      )
      setErrors({})
      setServerError('')
    }
  }, [open, initialUser])

  if (!open) {
    return null
  }

  const update = (field, value) => {
    setValues((current) => ({ ...current, [field]: value }))
    if (errors[field]) {
      setErrors((current) => ({ ...current, [field]: undefined }))
    }
  }

  const handleSubmit = async () => {
    const nextErrors = validateUser(values)
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }
    setSubmitting(true)
    setServerError('')
    try {
      await onSubmit({
        firstName: values.firstName.trim(),
        lastName: values.lastName.trim(),
        email: values.email.trim(),
        department: values.department,
      })
      onClose()
    } catch {
      setServerError('We could not save this user. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={mode === 'edit' ? 'Edit user' : 'Add user'}
      >
        <div className="modal-header">
          <h2 className="modal-title">{mode === 'edit' ? 'Edit user' : 'Add user'}</h2>
          <button type="button" className="icon-button" onClick={onClose} aria-label="Close">
            <FiX />
          </button>
        </div>
        <div className="modal-body">
          {serverError && <div className="form-banner">{serverError}</div>}
          <div className="field-grid">
            <div className="field">
              <label className="field-label" htmlFor="firstName">First name</label>
              <input
                id="firstName"
                className={`field-input ${errors.firstName ? 'has-error' : ''}`}
                value={values.firstName}
                onChange={(event) => update('firstName', event.target.value)}
              />
              {errors.firstName && <span className="field-error">{errors.firstName}</span>}
            </div>
            <div className="field">
              <label className="field-label" htmlFor="lastName">Last name</label>
              <input
                id="lastName"
                className={`field-input ${errors.lastName ? 'has-error' : ''}`}
                value={values.lastName}
                onChange={(event) => update('lastName', event.target.value)}
              />
              {errors.lastName && <span className="field-error">{errors.lastName}</span>}
            </div>
          </div>
          <div className="field">
            <label className="field-label" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className={`field-input ${errors.email ? 'has-error' : ''}`}
              value={values.email}
              onChange={(event) => update('email', event.target.value)}
            />
            {errors.email && <span className="field-error">{errors.email}</span>}
          </div>
          <div className="field">
            <label className="field-label" htmlFor="department">Department</label>
            <select
              id="department"
              className={`field-input ${errors.department ? 'has-error' : ''}`}
              value={values.department}
              onChange={(event) => update('department', event.target.value)}
            >
              <option value="">Select a department</option>
              {DEPARTMENTS.map((department) => (
                <option key={department} value={department}>
                  {department}
                </option>
              ))}
            </select>
            {errors.department && <span className="field-error">{errors.department}</span>}
          </div>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="button button-ghost"
            onClick={onClose}
            disabled={submitting}
          >
            Cancel
          </button>
          <button
            type="button"
            className="button button-primary"
            onClick={handleSubmit}
            disabled={submitting}
          >
            {submitting ? 'Saving…' : mode === 'edit' ? 'Save changes' : 'Add user'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserForm
