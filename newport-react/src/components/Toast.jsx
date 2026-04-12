import React from 'react'
import { useApp } from '../context/AppContext.jsx'

export default function Toast() {
  const { toast } = useApp()
  if (!toast) return null
  return (
    <div className={`toast show ${toast.type === 'success' ? 'ts' : toast.type === 'cyan' ? 'tc' : ''}`}>
      {toast.msg}
    </div>
  )
}
