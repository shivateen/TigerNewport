import React from 'react'
import { useApp } from '../context/AppContext.jsx'

const PHASES = ['Prospect','Pre-Admission','Admission','Active Tx','Discharge','Post-Discharge']

export default function Topbar({ user, onLogout }) {
  const { activePersona } = useApp()

  return (
    <div className="topbar">
      <div className="topbar-left">
        <div className="ta-badge">TIGER ANALYTICS</div>
        <div className="ta-name">×</div>
        <div className="ta-client">Newport Healthcare</div>
        <div className="ta-sub"> · Patient Journey Intelligence Platform · v1.0</div>
      </div>
      <div className="top-right">
        <div className="phase-rail">
          {PHASES.map((ph, i) => (
            <React.Fragment key={ph}>
              <div
                className={`pr-dot ${i < 2 ? 'done' : i === 2 ? 'active' : 'pend'}`}
                title={ph}
              >{i + 1}</div>
              {i < PHASES.length - 1 && (
                <div className={`pr-line ${i < 2 ? 'done' : ''}`} />
              )}
            </React.Fragment>
          ))}
        </div>
        <div className="live-tag">
          <div className="ldot" />&nbsp;Live · Salesforce + LS + PowerBI
        </div>
        <div className="user-pill">
          <span className="user-avatar">{user.avatar}</span>
          <div>
            <div className="user-name">{user.name}</div>
            <div className="user-role">{user.title}</div>
          </div>
          <button className="logout-btn" onClick={onLogout} title="Sign out">↗</button>
        </div>
      </div>
    </div>
  )
}
