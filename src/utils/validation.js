const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function isValidEmail(email) {
  return EMAIL_REGEX.test(String(email).trim())
}

export function validateUser(values) {
  const errors = {}
  const firstName = (values.firstName || '').trim()
  const lastName = (values.lastName || '').trim()
  const email = (values.email || '').trim()
  const department = (values.department || '').trim()

  if (!firstName) {
    errors.firstName = 'First name is required.'
  } else if (firstName.length < 2) {
    errors.firstName = 'Use at least two characters.'
  }

  if (!lastName) {
    errors.lastName = 'Last name is required.'
  } else if (lastName.length < 2) {
    errors.lastName = 'Use at least two characters.'
  }

  if (!email) {
    errors.email = 'Email is required.'
  } else if (!isValidEmail(email)) {
    errors.email = 'Enter a valid email address.'
  }

  if (!department) {
    errors.department = 'Select a department.'
  }

  return errors
}
