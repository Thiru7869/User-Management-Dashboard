import { useState, useEffect, useCallback } from 'react'
import { fetchUsers, createUser, updateUser, deleteUser } from '../services/api'
import { normalizeUser, getNextId } from '../utils/helpers'

function readError(err) {
  if (err.code === 'ECONNABORTED') {
    return 'The request timed out. Check your connection and try again.'
  }
  if (err.response) {
    return `The server responded with an error (${err.response.status}). Please try again.`
  }
  if (err.request) {
    return 'Could not reach the server. Check your network connection.'
  }
  return 'Something went wrong while loading users.'
}

export function useUsers() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadUsers = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const data = await fetchUsers()
      if (!Array.isArray(data)) {
        throw new Error('Invalid response')
      }
      setUsers(data.map(normalizeUser))
    } catch (err) {
      setError(readError(err))
      setUsers([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadUsers()
  }, [loadUsers])

  const addUser = useCallback(async (values) => {
    await createUser(values)
    setUsers((prev) => [{ id: getNextId(prev), ...values }, ...prev])
  }, [])

  const editUser = useCallback(async (id, values) => {
    await updateUser(id, values)
    setUsers((prev) => prev.map((user) => (user.id === id ? { ...user, ...values, id } : user)))
  }, [])

  const removeUser = useCallback(async (id) => {
    await deleteUser(id)
    setUsers((prev) => prev.filter((user) => user.id !== id))
  }, [])

  return { users, loading, error, reload: loadUsers, addUser, editUser, removeUser }
}
