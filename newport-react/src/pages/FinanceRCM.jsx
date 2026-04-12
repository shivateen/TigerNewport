import React from 'react'
import { useApp } from '../context/AppContext.jsx'
export default function FinanceRCM() {
  const { setOpenModal } = useApp()
  const claims = [
    {id:'CLM-9821',pt:'#NHP-7821',prog:'RTC',payer:'Magellan Health',code:'H0018',amt:'$51,800',issue:'Revenue code not in Magellan template',days:'14 dy',daysCls:'vr',risk:'High Denial',rCls:'br',action:'Fix',aCls:'btn-c',modal:'fix-9821'},
    {id:'CLM-9740',pt:'#NHP-7598',prog:'Ext. Care',payer:'UnitedHealth',code:'H0019',amt:'$12,900',issue:'Auth # missing from field 63',days:'9 dy',daysCls:'vr',risk:'High Denial',rCls:'br',action:'Fix',aCls:'btn-c',modal:'fix-9740'},
    {id:'CLM-9695',pt:'#NHP-7821',prog:'RTC',payer:'Optum Behavioral',code:'H0018 HQ',amt:'$37,500',issue:'Modifier HQ required for Optum BH carve-out',days:'5 dy',daysCls:'da',risk:'Medium',rCls:'ba',action:'Review',aCls:'btn-gh',modal:'rev-9695'},
    {id:'CLM-9612',pt:'#NHP-7440',prog:'PHP',payer:'BCBS Anthem',code:'S9480',amt:'$19,720',issue:'Diagnosis ordering — primary must be F-code',days:'4 dy',daysCls:'da',risk:'Medium',rCls:'ba',action:'Review',aCls:'btn-gh',modal:'rev-9612'},
  ]
  return (
    <div className="page">
      <div className="ph"><div className="ph-top">
        <div><div className="ph-tag">Finance · Phase 5 · Newport Healthcare</div><div className="ph-title">RCM & Claims — Manual Code Mapping Queue</div>
          <div className="ph-sub">UB-04/837 behavioral health claims · H0018 (RTC) · H0019 (PHP) · S9480 (IOP) · Payer-template mismatches</div></div>
        <div className="ph-pills"><span className="pill pill-r">Pain P4 — High</span><span className="pill pill-o">18 Claims Pending</span></div>
      </div></div>
      <div className="kg kg4">
        <div className="kc cr"><div className="kpain ptag">⚠ P4</div><div className="kv vr">18</div><div className="kl">Claims Needing Manual Code Map</div><div className="kd db">Magellan + Optum template mismatches</div></div>
        <div className="kc"><div className="kv vo">$780K</div><div className="kl">Unpaid Claims Outstanding</div><div className="kd dw">↑ 22% vs 90-day average</div></div>
        <div className="kc cg"><div className="kv vg">79%</div><div className="kl">First-Pass Claim Acceptance</div><div className="kd db">Target: 93% · Gap: -14 pts</div></div>
        <div className="kc ct"><div className="kv vc">38 dy</div><div className="kl">Days in A/R</div><div className="kd db">Benchmark: 26 · Behavioral health</div></div>
      </div>
      <div className="panel">
        <div className="phead"><div><div className="ptitle"><span className="pic">📋</span> Claims Queue — Newport Behavioral Health Programs</div>
          <div className="psub">18 claims flagged · BH-specific billing codes · Magellan, Optum Behavioral, BCBS payer templates</div></div>
          <button className="btn btn-o" onClick={() => setOpenModal({type:'remediate-all'})}>🤖 Auto-Remediate All</button>
        </div>
        <table className="dt">
          <thead><tr><th>Claim ID</th><th>Patient</th><th>Program</th><th>Payer</th><th>BH Code</th><th>Claim Amt</th><th>Issue</th><th>Days Pending</th><th>Risk</th><th>Action</th></tr></thead>
          <tbody>{claims.map(c => (
            <tr key={c.id}>
              <td style={{fontFamily:'JetBrains Mono,monospace',fontSize:10}}>{c.id}</td>
              <td>{c.pt}</td>
              <td><span className={`b ${c.prog==='RTC'?'bo':c.prog==='PHP'?'bc':'ba'}`}>{c.prog}</span></td>
              <td>{c.payer}</td>
              <td style={{fontFamily:'JetBrains Mono,monospace',fontSize:10}}>{c.code}</td>
              <td style={{fontFamily:'JetBrains Mono,monospace'}}>{c.amt}</td>
              <td>{c.issue}</td>
              <td className={c.daysCls} style={{fontFamily:'JetBrains Mono,monospace'}}>{c.days}</td>
              <td><span className={`b b${c.rCls}`}>{c.risk}</span></td>
              <td><button className={`btn ${c.aCls}`} style={{fontSize:9,padding:'3px 8px'}} onClick={() => setOpenModal({type:c.modal})}>{c.action}</button></td>
            </tr>
          ))}</tbody>
        </table>
      </div>
      <div className="ai-box"><div className="ai-ico">🤖</div><div className="ai-txt"><strong>AI RCM Agent:</strong> 16 of 18 flagged claims can be auto-corrected using Newport's learned payer template library — Magellan H0018 routing rules, Optum Behavioral modifier HQ logic, and BCBS F-code ordering priority. Applying fixes today recovers ~$84,000 within 7 days. Eliminating manual code mapping is projected to improve Newport's first-pass acceptance from 79% to 93%, reducing Days in A/R from 38 to approximately 26 days.</div></div>
    </div>
  )
}
