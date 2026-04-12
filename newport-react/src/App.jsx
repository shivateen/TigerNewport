import React, { useState, useEffect } from 'react'
import { getSession, clearSession } from './auth.js'
import LoginPage from './components/LoginPage.jsx'
import Platform from './components/Platform.jsx'
import { AppProvider } from './context/AppContext.jsx'

export default function App() {
  const [user, setUser] = useState(null)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    const session = getSession()
    if (session) setUser(session.user)
    setChecking(false)
  }, [])

  const handleLogin = (userData) => setUser(userData)

  const handleLogout = () => {
    clearSession()
    setUser(null)
  }

  if (checking) {
    return (
      <div style={{ display:'flex', alignItems:'center', justifyContent:'center',
        height:'100vh', background:'#000', color:'#FF8500',
        fontFamily:'JetBrains Mono, monospace', fontSize:'13px' }}>
        Loading…
      </div>
    )
  }

  if (!user) return <LoginPage onLogin={handleLogin} />

  return (
    <AppProvider>
      <Platform user={user} onLogout={handleLogout} />
    </AppProvider>
  )
}
