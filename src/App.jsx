import { useState, useEffect, useMemo } from 'react'
import { FiFilter, FiPlus, FiRefreshCw, FiAlertCircle, FiInbox } from 'react-icons/fi'
import Navbar from './components/Navbar'
import SearchBar from './components/SearchBar'
import SortDropdown from './components/SortDropdown'
import FilterModal from './components/FilterModal'
import UserForm from './components/UserForm'
import UserTable from './components/UserTable'
import Pagination from './components/Pagination'
import Loader from './components/Loader'
import { useUsers } from './hooks/useUsers'
import './App.css'

const EMPTY_FILTERS = { firstName: '', lastName: '', email: '', department: '' }

function App() {
  const { users, loading, error, reload, addUser, editUser, removeUser } = useUsers()

  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [sortField, setSortField] = useState('firstName')
  const [sortDirection, setSortDirection] = useState('asc')
  const [filters, setFilters] = useState(EMPTY_FILTERS)
  const [filterOpen, setFilterOpen] = useState(false)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [form, setForm] = useState({ open: false, mode: 'add', user: null })
  const [confirm, setConfirm] = useState({ open: false, user: null })
  const [pendingDelete, setPendingDelete] = useState(false)
  const [deleteError, setDeleteError] = useState('')

  useEffect(() => {
    const handle = setTimeout(() => setDebouncedSearch(search.trim().toLowerCase()), 300)
    return () => clearTimeout(handle)
  }, [search])

  const activeFilterCount = useMemo(
    () => Object.values(filters).filter((value) => value.trim() !== '').length,
    [filters],
  )

  const processedUsers = useMemo(() => {
    let result = [...users]

    if (debouncedSearch) {
      result = result.filter((user) => {
        const haystack = `${user.firstName} ${user.lastName} ${user.email}`.toLowerCase()
        return haystack.includes(debouncedSearch)
      })
    }

    result = result.filter((user) => {
      const matchFirst =
        !filters.firstName || user.firstName.toLowerCase().includes(filters.firstName.toLowerCase())
      const matchLast =
        !filters.lastName || user.lastName.toLowerCase().includes(filters.lastName.toLowerCase())
      const matchEmail =
        !filters.email || user.email.toLowerCase().includes(filters.email.toLowerCase())
      const matchDept = !filters.department || user.department === filters.department
      return matchFirst && matchLast && matchEmail && matchDept
    })

    result.sort((a, b) => {
      const left = String(a[sortField] ?? '').toLowerCase()
      const right = String(b[sortField] ?? '').toLowerCase()
      if (left < right) return sortDirection === 'asc' ? -1 : 1
      if (left > right) return sortDirection === 'asc' ? 1 : -1
      return 0
    })

    return result
  }, [users, debouncedSearch, filters, sortField, sortDirection])

  const totalItems = processedUsers.length
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize))

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages)
    }
  }, [page, totalPages])

  useEffect(() => {
    setPage(1)
  }, [debouncedSearch, filters, pageSize])

  const pagedUsers = useMemo(() => {
    const startIndex = (page - 1) * pageSize
    return processedUsers.slice(startIndex, startIndex + pageSize)
  }, [processedUsers, page, pageSize])

  const handleSort = (field) => {
    if (field === sortField) {
      setSortDirection((current) => (current === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const openAdd = () => setForm({ open: true, mode: 'add', user: null })
  const openEdit = (user) => setForm({ open: true, mode: 'edit', user })
  const closeForm = () => setForm((current) => ({ ...current, open: false }))

  const submitForm = async (values) => {
    if (form.mode === 'edit' && form.user) {
      await editUser(form.user.id, values)
    } else {
      await addUser(values)
    }
  }

  const requestDelete = (user) => {
    setConfirm({ open: true, user })
    setDeleteError('')
  }

  const confirmDelete = async () => {
    if (!confirm.user) {
      return
    }
    setPendingDelete(true)
    setDeleteError('')
    try {
      await removeUser(confirm.user.id)
      setConfirm({ open: false, user: null })
    } catch {
      setDeleteError('We could not delete this user. Please try again.')
    } finally {
      setPendingDelete(false)
    }
  }

  const applyFilters = (next) => {
    setFilters(next)
    setFilterOpen(false)
  }

  const resetFilters = () => {
    setFilters(EMPTY_FILTERS)
    setFilterOpen(false)
  }

  const renderBody = () => {
    if (error) {
      return (
        <div className="state-panel state-error">
          <FiAlertCircle className="state-icon" />
          <p className="state-title">Couldn’t load users</p>
          <p className="state-message">{error}</p>
          <button type="button" className="button button-primary" onClick={reload}>
            <FiRefreshCw /> Try again
          </button>
        </div>
      )
    }

    if (loading) {
      return (
        <div className="state-panel">
          <Loader />
        </div>
      )
    }

    if (totalItems === 0) {
      return (
        <div className="state-panel state-empty">
          <FiInbox className="state-icon" />
          <p className="state-title">No users found</p>
          <p className="state-message">
            {users.length === 0
              ? 'There are no users yet. Add your first one to get started.'
              : 'Try adjusting your search or filters.'}
          </p>
        </div>
      )
    }

    return (
      <>
        <UserTable
          users={pagedUsers}
          sortField={sortField}
          sortDirection={sortDirection}
          onSort={handleSort}
          onEdit={openEdit}
          onDelete={requestDelete}
        />
        <Pagination
          page={page}
          pageSize={pageSize}
          totalItems={totalItems}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
        />
      </>
    )
  }

  return (
    <div className="app">
      <Navbar userCount={users.length} />

      <main className="content">
        <div className="toolbar">
          <div className="toolbar-left">
            <SearchBar value={search} onChange={setSearch} />
          </div>
          <div className="toolbar-right">
            <SortDropdown
              field={sortField}
              direction={sortDirection}
              onFieldChange={setSortField}
              onDirectionToggle={() =>
                setSortDirection((current) => (current === 'asc' ? 'desc' : 'asc'))
              }
            />
            <button
              type="button"
              className={`button button-ghost ${activeFilterCount > 0 ? 'is-active' : ''}`}
              onClick={() => setFilterOpen(true)}
            >
              <FiFilter /> Filter{activeFilterCount > 0 ? ` (${activeFilterCount})` : ''}
            </button>
            <button type="button" className="button button-primary" onClick={openAdd}>
              <FiPlus /> Add user
            </button>
          </div>
        </div>

        {renderBody()}
      </main>

      <FilterModal
        open={filterOpen}
        initialFilters={filters}
        onApply={applyFilters}
        onReset={resetFilters}
        onClose={() => setFilterOpen(false)}
      />

      <UserForm
        open={form.open}
        mode={form.mode}
        initialUser={form.user}
        onSubmit={submitForm}
        onClose={closeForm}
      />

      {confirm.open && (
        <div
          className="modal-overlay"
          onClick={() => !pendingDelete && setConfirm({ open: false, user: null })}
        >
          <div
            className="modal modal-sm"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Confirm delete"
          >
            <div className="modal-header">
              <h2 className="modal-title">Delete user</h2>
            </div>
            <div className="modal-body">
              {deleteError && <div className="form-banner">{deleteError}</div>}
              <p className="confirm-text">
                Delete{' '}
                <strong>
                  {confirm.user?.firstName} {confirm.user?.lastName}
                </strong>
                ? This action cannot be undone.
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="button button-ghost"
                onClick={() => setConfirm({ open: false, user: null })}
                disabled={pendingDelete}
              >
                Cancel
              </button>
              <button
                type="button"
                className="button button-danger"
                onClick={confirmDelete}
                disabled={pendingDelete}
              >
                {pendingDelete ? 'Deleting…' : 'Delete user'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
