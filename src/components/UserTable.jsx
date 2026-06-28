import { FiArrowUp, FiArrowDown } from 'react-icons/fi'
import UserRow from './UserRow'

const COLUMNS = [
  { key: 'id', label: 'ID', sortable: false },
  { key: 'firstName', label: 'First name', sortable: true },
  { key: 'lastName', label: 'Last name', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'department', label: 'Department', sortable: true },
  { key: 'actions', label: 'Actions', sortable: false },
]

function UserTable({ users, sortField, sortDirection, onSort, onEdit, onDelete }) {
  return (
    <div className="table-wrap">
      <table className="user-table">
        <thead>
          <tr>
            {COLUMNS.map((column) => {
              const isActive = column.sortable && sortField === column.key
              return (
                <th
                  key={column.key}
                  className={column.sortable ? 'is-sortable' : ''}
                  onClick={column.sortable ? () => onSort(column.key) : undefined}
                  aria-sort={
                    isActive ? (sortDirection === 'asc' ? 'ascending' : 'descending') : undefined
                  }
                >
                  <span className="th-content">
                    {column.label}
                    {isActive && (
                      <span className="th-sort-icon">
                        {sortDirection === 'asc' ? <FiArrowUp /> : <FiArrowDown />}
                      </span>
                    )}
                  </span>
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <UserRow key={user.id} user={user} onEdit={onEdit} onDelete={onDelete} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserTable
