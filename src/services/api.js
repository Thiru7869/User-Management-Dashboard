import axios from 'axios'

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
})

export async function fetchUsers() {
  const { data } = await api.get('/users')
  return data
}

export async function createUser(payload) {
  const { data } = await api.post('/users', payload)
  return data
}

export async function updateUser(id, payload) {
  const { data } = await api.put(`/users/${id}`, payload)
  return data
}

export async function deleteUser(id) {
  await api.delete(`/users/${id}`)
  return id
}

export default api
