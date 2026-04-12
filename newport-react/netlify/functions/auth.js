// netlify/functions/auth.js
// Login endpoint - returns user info on valid credentials

const USERS = [
  {
    id: 'u1',
    email: 'finance@newport.com',
    password: 'Newport2024!',
    name: 'Sarah Chen',
    role: 'fin',
    roleLabel: 'Finance & Revenue Cycle',
    title: 'CFO',
    avatar: '💰'
  },
  {
    id: 'u2',
    email: 'operations@newport.com',
    password: 'Newport2024!',
    name: 'Marcus Reed',
    role: 'ops',
    roleLabel: 'Clinical Operations',
    title: 'COO',
    avatar: '🛏️'
  },
  {
    id: 'u3',
    email: 'growth@newport.com',
    password: 'Newport2024!',
    name: 'Priya Nair',
    role: 'mkt',
    roleLabel: 'Growth & Marketing',
    title: 'VP Growth',
    avatar: '📊'
  },
  {
    id: 'u4',
    email: 'admin@newport.com',
    password: 'Newport2024!',
    name: 'James Whitfield',
    role: 'all',
    roleLabel: 'Executive Leadership',
    title: 'CEO',
    avatar: '🏥'
  }
]

export const handler = async (event) => {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) }
  }

  try {
    const { email, password } = JSON.parse(event.body || '{}')

    if (!email || !password) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Email and password are required' })
      }
    }

    const user = USERS.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    )

    if (!user) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: 'Invalid email or password' })
      }
    }

    // Simple session token (base64 encoded user info + timestamp)
    const sessionData = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      roleLabel: user.roleLabel,
      title: user.title,
      avatar: user.avatar,
      exp: Date.now() + 8 * 60 * 60 * 1000 // 8 hours
    }
    const token = Buffer.from(JSON.stringify(sessionData)).toString('base64')

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, user: sessionData })
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Server error' })
    }
  }
}
