import React from 'react'
import { useApp } from '../context/AppContext.jsx'
export default function MktCapacity() {
  const { setOpenModal } = useApp()
  const rows = [
    {wk:'Wk 1 (Now)',beds:21,optimal:'~38',cur:'$13,000',rec:'$9,200',var:'-$3,800 over',varCls:'vr',action:'Reduce',aCls:'br'},
    {wk:'Wk 2',beds:28,optimal:'~50',cur:'$13,000',rec:'$11,400',var:'-$1,600 over',varCls:'da',action:'Trim',aCls:'ba'},
    {wk:'Wk 3 (Surge)',beds:8,optimal:'~15',cur:'$13,000',rec:'$3,800',var:'-$9,200 over',varCls:'vr',action:'Pause Ads',aCls:'br'},
    {wk:'Wk 4 (Recovery)',beds:38,optimal:'~65',cur:'$13,000',rec:'$14,600',var:'+$1,600 — scale',varCls:'vg',action:'Increase',aCls:'bg'},
  ]
  return (
    <div className="page">
      <div className="ph"><div className="ph-top">
        <div><div className="ph-tag">Growth · Pain Point P6 · Newport Healthcare</div><div className="ph-title">Capacity-Linked Marketing Spend</div>
          <div className="ph-sub">Marketing budget not connected to bed availability · Intake surges causing admissions team burnout · $14K weekly over-spend risk</div></div>
        <div className="ph-pills"><span className="pill pill-r">Pain P6 — High</span><span className="pill pill-o">$14K Over-Spend Risk</span></div>
      </div></div>
      <div className="kg kg3">
        <div className="kc cr"><div className="kpain ptag">⚠ P6</div><div className="kv vr">21</div><div className="kl">Empty Beds Available Now</div><div className="kd db">Only 13% headroom for new admits</div></div>
        <div className="kc"><div className="kv vo">320</div><div className="kl">Cleared Patients — Awaiting Bed</div><div className="kd db">Demand exceeds supply — stop adding</div></div>
        <div className="kc ct"><div className="kv vc">$14K</div><div className="kl">Recommended Spend Reduction (Wk 3)</div><div className="kd dg">Throttle digital CPCs during surge week</div></div>
      </div>
      <div className="panel">
        <div className="phead"><div><div className="ptitle"><span className="pic">🔗</span> Weekly Spend vs Capacity Alignment</div>
          <div className="psub">Newport's intake capacity drives optimal lead volume · Current spend is capacity-blind</div></div>
          <button className="btn btn-o" onClick={() => setOpenModal({type:'throttle'})}>🤖 Auto-Throttle Spend</button></div>
        <table className="dt">
          <thead><tr><th>Week</th><th>Beds Available</th><th>Optimal Leads</th><th>Current Budget</th><th>Recommended</th><th>Variance</th><th>Action</th></tr></thead>
          <tbody>{rows.map(r => (
            <tr key={r.wk}>
              <td>{r.wk}</td>
              <td style={{fontFamily:'JetBrains Mono,monospace'}}>{r.beds}</td>
              <td style={{fontFamily:'JetBrains Mono,monospace'}}>{r.optimal}</td>
              <td style={{fontFamily:'JetBrains Mono,monospace'}}>{r.cur}</td>
              <td style={{fontFamily:'JetBrains Mono,monospace'}}>{r.rec}</td>
              <td className={r.varCls} style={{fontFamily:'JetBrains Mono,monospace'}}>{r.var}</td>
              <td><span className={`b b${r.aCls}`}>{r.action}</span></td>
            </tr>
          ))}</tbody>
        </table>
      </div>
      <div className="ai-box"><div className="ai-ico">🤖</div><div className="ai-txt"><strong>Capacity-Linked Spend Agent:</strong> Connects Newport's real-time RTC/PHP/IOP bed availability (from Operations) to weekly digital marketing budget controls (in Salesforce). Automatically throttles or scales Google/Meta CPCs based on actual intake headroom. Estimated impact: prevent 2–3 intake surge episodes per quarter, reduce admissions team burnout incidents by ~40%, and eliminate the $14K/week over-spend during capacity-constrained weeks.</div></div>
    </div>
  )
}
