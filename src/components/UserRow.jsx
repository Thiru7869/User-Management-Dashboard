import { FiEdit2, FiTrash2 } from 'react-icons/fi'

const DEPARTMENT_CLASS = {
  Engineering: 'badge-engineering',
  HR: 'badge-hr',
  Finance: 'badge-finance',
  Marketing: 'badge-marketing',
  Sales: 'badge-sales',
  Support: 'badge-support',
  Operations: 'badge-operations',
}

function UserRow({ user, onEdit, onDelete }) {
  return (
    <tr className="user-row">
      <td data-label="ID" className="cell-id">{user.id}</td>
      <td data-label="First name">{user.firstName}</td>
      <td data-label="Last name">{user.lastName}</td>
      <td data-label="Email">
        <a className="cell-email" href={`mailto:${user.email}`}>{user.email}</a>
      </td>
      <td data-label="Department">
        <span className={`badge ${DEPARTMENT_CLASS[user.department] || ''}`}>{user.department}</span>
      </td>
      <td data-label="Actions" className="cell-actions">
        <button
          type="button"
          className="icon-button"
          onClick={() => onEdit(user)}
          aria-label={`Edit ${user.firstName} ${user.lastName}`}
          title="Edit"
        >
          <FiEdit2 />
        </button>
        <button
          type="button"
          className="icon-button icon-button-danger"
          onClick={() => onDelete(user)}
          aria-label={`Delete ${user.firstName} ${user.lastName}`}
          title="Delete"
        >
          <FiTrash2 />
        </button>
      </td>
    </tr>
  )
}

export default UserRow
