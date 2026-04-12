import React, { useState } from 'react'
import { login, saveSession } from '../auth.js'

const DEMO_USERS = [
  { email: 'finance@newport.com',    role: 'Finance (CFO)',       color: '#FF8500', icon: '💰' },
  { email: 'operations@newport.com', role: 'Operations (COO)',    color: '#00B5E2', icon: '🛏️' },
  { email: 'growth@newport.com',     role: 'Growth (VP Growth)',  color: '#1A7A4A', icon: '📊' },
  { email: 'admin@newport.com',      role: 'Executive (CEO)',     color: '#808080', icon: '🏥' },
]

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { token, user } = await login(email, password)
      saveSession(token, user)
      onLogin(user)
    } catch (err) {
      setError(err.message || 'Invalid credentials')
    } finally {
      setLoading(false)
    }
  }

  const fillDemo = (demoEmail) => {
    setEmail(demoEmail)
    setPassword('Newport2024!')
    setError('')
  }

  return (
    <div className="login-shell">
      <div className="login-bg-circle login-bg-circle-1" />
      <div className="login-bg-circle login-bg-circle-2" />

      <div className="login-card">
        {/* Logo */}
        <div className="login-logo-row">
          <div className="login-ta-badge">TIGER ANALYTICS</div>
          <span className="login-cross">×</span>
          <div className="login-client-name">Newport Healthcare</div>
        </div>

        <div className="login-title">Patient Journey<br /><span className="login-title-accent">Intelligence Platform</span></div>
        <div className="login-subtitle">AI-Powered · Behavioral Health · Role-Based Access</div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-field">
            <label className="login-label">Email Address</label>
            <input
              type="email"
              className="login-input"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@newport.com"
              required
              autoComplete="username"
            />
          </div>
          <div className="login-field">
            <label className="login-label">Password</label>
            <input
              type="password"
              className="login-input"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter password"
              required
              autoComplete="current-password"
            />
          </div>

          {error && <div className="login-error">⚠️ {error}</div>}

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Signing in…' : 'Sign In →'}
          </button>
        </form>

        {/* Demo accounts */}
        <div className="login-demo-section">
          <div className="login-demo-label">Demo accounts — click to auto-fill</div>
          <div className="login-demo-grid">
            {DEMO_USERS.map(u => (
              <button
                key={u.email}
                className="login-demo-btn"
                onClick={() => fillDemo(u.email)}
                style={{ borderColor: u.color + '44', color: u.color }}
              >
                <span>{u.icon}</span>
                <span>{u.role}</span>
              </button>
            ))}
          </div>
          <div className="login-demo-pw">All accounts — password: <strong>Newport2024!</strong></div>
        </div>
      </div>

      <div className="login-footer">
        Powered by Tiger Analytics · AI Agentic Systems Practice · 2026
      </div>
    </div>
  )
}
