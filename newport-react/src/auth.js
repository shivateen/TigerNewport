// Auth utilities - token storage and decoding

export function saveSession(token, user) {
  localStorage.setItem('np_token', token)
  localStorage.setItem('np_user', JSON.stringify(user))
}

export function getSession() {
  try {
    const token = localStorage.getItem('np_token')
    const user = JSON.parse(localStorage.getItem('np_user') || 'null')
    if (!token || !user) return null
    // Check expiry
    if (user.exp && Date.now() > user.exp) {
      clearSession()
      return null
    }
    return { token, user }
  } catch {
    return null
  }
}

export function clearSession() {
  localStorage.removeItem('np_token')
  localStorage.removeItem('np_user')
}

export async function login(email, password) {
  const res = await fetch('/.netlify/functions/auth', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Login failed')
  return data
}
