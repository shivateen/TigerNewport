import React from 'react'
import { useApp } from '../context/AppContext.jsx'

const NAV = [
  { section: 'Platform' },
  { id: 'overview',    icon: '🏠', label: 'Command Center' },
  { id: 'journey',     icon: '🗺️', label: '6-Phase Journey Map' },
  { section: 'Finance' },
  { id: 'fin-rev',     icon: '💰', label: 'Revenue Fog Monitor',      badge: '3', badgeType: 'r' },
  { id: 'fin-rcm',     icon: '📋', label: 'RCM & Claims' },
  { id: 'fin-vob',     icon: '🔍', label: 'VOB & Financial Clearance' },
  { id: 'fin-cash',    icon: '⏱️', label: 'Post-Discharge Cash Lag' },
  { section: 'Operations' },
  { id: 'ops-beds',    icon: '🛏️', label: 'Bed Management',           badge: '2', badgeType: 'a' },
  { id: 'ops-staff',   icon: '👥', label: 'Staffing Optimizer' },
  { id: 'ops-ur',      icon: '📁', label: 'Concurrent Review / UR' },
  { section: 'Growth / Marketing' },
  { id: 'mkt-funnel',  icon: '📊', label: 'Inquiry Funnel',            badge: '↑', badgeType: 'g' },
  { id: 'mkt-cap',     icon: '🔗', label: 'Capacity-Linked Spend' },
  { id: 'mkt-alumni',  icon: '🔄', label: 'Alumni & Outcomes' },
  { section: 'System Analysis' },
  { id: 'pain',        icon: '⚠️', label: 'Pain Point Analysis',       badge: '6', badgeType: 'r' },
]

// Which nav items belong to which persona
const PERSONA_MAP = {
  fin: ['fin-rev','fin-rcm','fin-vob','fin-cash'],
  ops: ['ops-beds','ops-staff','ops-ur'],
  mkt: ['mkt-funnel','mkt-cap','mkt-alumni'],
}

export default function Sidebar() {
  const { activePage, setActivePage, activePersona } = useApp()

  const isRelevant = (id) => {
    if (!id) return true
    if (activePersona === 'all') return true
    const relevant = PERSONA_MAP[activePersona] || []
    return relevant.includes(id) || ['overview','journey','pain'].includes(id)
  }

  return (
    <div className="sidebar">
      {NAV.map((item, i) => {
        if (item.section) {
          return <div key={i} className="sb-sect">{item.section}</div>
        }
        const dim = !isRelevant(item.id)
        return (
          <div
            key={item.id}
            className={`ni ${activePage === item.id ? 'active' : ''}`}
            style={dim ? { opacity: 0.3 } : {}}
            onClick={() => setActivePage(item.id)}
          >
            <span className="ni-ico">{item.icon}</span>
            {item.label}
            {item.badge && (
              <span className={`nbadge nb-${item.badgeType}`}>{item.badge}</span>
            )}
          </div>
        )
      })}
    </div>
  )
}
