export const DEPARTMENTS = [
  'Engineering',
  'HR',
  'Finance',
  'Marketing',
  'Sales',
  'Support',
  'Operations',
]

export function splitName(fullName = '') {
  const parts = String(fullName).trim().split(/\s+/).filter(Boolean)
  const firstName = parts.shift() || ''
  const lastName = parts.join(' ') || ''
  return { firstName, lastName }
}

export function assignDepartment(id) {
  const index = Math.abs(Number(id) || 0) % DEPARTMENTS.length
  return DEPARTMENTS[index]
}

export function normalizeUser(raw) {
  const { firstName, lastName } = splitName(raw.name)
  return {
    id: raw.id,
    firstName,
    lastName,
    email: raw.email || '',
    department: assignDepartment(raw.id),
  }
}

export function getNextId(users) {
  return users.reduce((max, user) => Math.max(max, Number(user.id) || 0), 0) + 1
}
