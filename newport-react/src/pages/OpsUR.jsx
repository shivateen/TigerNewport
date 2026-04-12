import React from 'react'
import { useApp } from '../context/AppContext.jsx'
export default function OpsUR() {
  const { setOpenModal } = useApp()
  const cards = [
    {id:'7540',name:'#NHP-7540',payer:'Magellan Health · RTC',due:'Due TODAY',dueCls:'cr-urgent',dueColor:'var(--rd)',sub:'Day 42 · Review overdue'},
    {id:'7612',name:'#NHP-7612',payer:'Optum Behavioral · PHP',due:'Due in 1 day',dueCls:'cr-urgent',dueColor:'var(--rd)',sub:'Day 18 · PHP 3-day cycle'},
    {id:'7480',name:'#NHP-7480',payer:'BCBS Anthem · RTC',due:'Due in 3 days',dueCls:'cr-due',dueColor:'var(--am)',sub:'Day 28 · Standard 7-day cycle'},
    {id:'7821',name:'#NHP-7821',payer:'UnitedHealth · RTC',due:'Due in 4 days',dueCls:'cr-due',dueColor:'var(--am)',sub:'Day 35 · Extended stay auth'},
    {id:'7740',name:'#NHP-7740',payer:'Cigna Behavioral · PHP',due:'Due in 8 days',dueCls:'cr-ok',dueColor:'var(--gr)',sub:'Day 12 · On track'},
    {id:'7695',name:'#NHP-7695',payer:'Aetna · RTC',due:'Due in 10 days',dueCls:'cr-ok',dueColor:'var(--gr)',sub:'Day 20 · On track'},
  ]
  return (
    <div className="page">
      <div className="ph"><div className="ph-top">
        <div><div className="ph-tag">Operations · Phase 4 · Newport Healthcare</div><div className="ph-title">Utilization Review — Concurrent Review Cycles</div>
          <div className="ph-sub">Continued stay authorizations · Every 5–7 days (RTC) · Every 3 days (PHP) · EHR↔CRM sync gap creates blind spots</div></div>
        <div className="ph-pills"><span className="pill pill-r">P2 — Sync Gap</span><span className="pill pill-o">38 Active Review Cycles</span></div>
      </div></div>
      <div className="kg kg4">
        <div className="kc"><div className="kv vo">142</div><div className="kl">Active Patients Under UR</div><div className="kd dg">All in Lightning Step EHR</div></div>
        <div className="kc cr"><div className="kv vr">38</div><div className="kl">Active Concurrent Review Cycles</div><div className="kd db">Next 10 days · Continued stay docs needed</div></div>
        <div className="kc cg"><div className="kv vg">104</div><div className="kl">Auths Confirmed — Active</div><div className="kd dg">73% of census covered</div></div>
        <div className="kc ct"><div className="kpain ptag">⚠ P2</div><div className="kv vc">43</div><div className="kl">EHR Auth Updates Not in Salesforce</div><div className="kd db">VOB + Growth team blind spots</div></div>
      </div>
      <div className="panel">
        <div className="phead"><div><div className="ptitle"><span className="pic">📁</span> Concurrent Review Queue — Urgent & Due Soon</div>
          <div className="psub">BH payers require continued stay docs every 5–7 days (RTC) · 3 days (PHP)</div></div>
          <button className="btn btn-o" onClick={() => setOpenModal({type:'autoprep'})}>🤖 Auto-Prep All Documentation</button></div>
        <div className="cr-grid">
          {cards.map(c => (
            <div key={c.id} className={`cr-card ${c.dueCls}`} style={{cursor:'pointer'}} onClick={() => setOpenModal({type:'ur-detail',patientId:c.id})}>
              <div className="cr-name">{c.name}</div>
              <div className="cr-payer">{c.payer}</div>
              <div className="cr-days" style={{color:c.dueColor}}>{c.due}</div>
              <div style={{fontSize:9,color:c.dueColor}}>{c.sub}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="ai-box"><div className="ai-ico">🤖</div><div className="ai-txt"><strong>Concurrent Review Agent:</strong> Newport has 38 active concurrent review cycles across Magellan, Optum Behavioral, BCBS, UnitedHealth, Cigna, and Aetna — each with different cadences and documentation requirements. The AI agent monitors every cycle, auto-prepares continued stay documentation from Lightning Step clinical notes 48 hours before each deadline, and escalates to the UR team only when clinical judgment is needed. One missed Magellan RTC review costs Newport 5–7 days of denied revenue — at $1,250/day, that's $6,250–$8,750 per episode.</div></div>
    </div>
  )
}
