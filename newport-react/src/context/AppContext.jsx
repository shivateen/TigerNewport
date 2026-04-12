import React, { createContext, useContext, useState, useCallback } from 'react'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [activePage, setActivePage] = useState('overview')
  const [activePersona, setActivePersona] = useState('all')
  const [openModal, setOpenModal] = useState(null)
  const [toast, setToast] = useState(null)

  const showToast = useCallback((msg, type = 'default') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3200)
  }, [])

  const closeModal = useCallback(() => setOpenModal(null), [])

  return (
    <AppContext.Provider value={{
      activePage, setActivePage,
      activePersona, setActivePersona,
      openModal, setOpenModal, closeModal,
      toast, showToast
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)
