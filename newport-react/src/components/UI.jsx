// Shared reusable UI building blocks
import React from 'react'

export function KpiCard({ value, label, delta, deltaType, tag, tagType, topColor, children }) {
  return (
    <div className={`kc ${topColor || ''}`} style={{ position: 'relative' }}>
      {tag && <div className={`kpain ${tagType || 'ptag'}`}>{tag}</div>}
      <div className={`kv ${value?.startsWith?.('$') && deltaType === 'bad' ? 'vr' : value?.includes?.('%') ? 'vc' : 'vo'}`}
        style={children ? {} : undefined}>
        {value}
      </div>
      <div className="kl">{label}</div>
      {delta && <div className={`kd d${deltaType || 'w'}`}>{delta}</div>}
      {children}
    </div>
  )
}

export function Panel({ title, icon, sub, actions, children }) {
  return (
    <div className="panel">
      <div className="phead">
        <div>
          <div className="ptitle"><span className="pic">{icon}</span> {title}</div>
          {sub && <div className="psub">{sub}</div>}
        </div>
        {actions && <div className="pacts">{actions}</div>}
      </div>
      {children}
    </div>
  )
}

export function Badge({ type, children }) {
  return <span className={`b b${type}`}>{children}</span>
}

export function AiBox({ children }) {
  return (
    <div className="ai-box">
      <div className="ai-ico">🤖</div>
      <div className="ai-txt">{children}</div>
    </div>
  )
}

export function PageHeader({ tag, title, sub, pills }) {
  return (
    <div className="ph">
      <div className="ph-top">
        <div>
          <div className="ph-tag">{tag}</div>
          <div className="ph-title">{title}</div>
          {sub && <div className="ph-sub">{sub}</div>}
        </div>
        {pills && <div className="ph-pills">{pills}</div>}
      </div>
    </div>
  )
}

export function Btn({ variant = 'o', onClick, children, small }) {
  const cls = `btn btn-${variant}${small ? ' btn-sm' : ''}`
  return <button className={cls} onClick={onClick}>{children}</button>
}

export function ModalBtn({ variant = 'p', onClick, children }) {
  return <button className={`mb mb-${variant}`} onClick={onClick}>{children}</button>
}

