import React from 'react'
import { useApp } from '../context/AppContext.jsx'
export default function FinanceRevenue() {
  const { setOpenModal } = useApp()
  const rows = [
    {id:'#NHP-7821',prog:'RTC',payer:'Magellan Health',los:'45 dy',exp:'$56,250',billed:'$51,800',var:'-$4,450',varCls:'vr',status:'Code gap',sCls:'br'},
    {id:'#NHP-7740',prog:'PHP',payer:'Optum Behavioral',los:'25 dy',exp:'$17,000',billed:'$17,000',var:'$0',varCls:'vg',status:'Matched',sCls:'bg'},
    {id:'#NHP-7695',prog:'RTC',payer:'BCBS Anthem',los:'30 dy',exp:'$37,500',billed:'$33,200',var:'-$4,300',varCls:'vr',status:'VOB sync error',sCls:'br'},
    {id:'#NHP-7612',prog:'IOP',payer:'Aetna Commercial',los:'12 dy',exp:'$5,040',billed:'$5,040',var:'$0',varCls:'vg',status:'Matched',sCls:'bg'},
    {id:'#NHP-7598',prog:'Ext. Care',payer:'UnitedHealth',los:'14 dy',exp:'$15,400',billed:'$12,900',var:'-$2,500',varCls:'vr',status:'Auth gap',sCls:'br'},
    {id:'#NHP-7521',prog:'PHP',payer:'Cigna Behavioral',los:'21 dy',exp:'$14,280',billed:'$14,280',var:'$0',varCls:'vg',status:'Matched',sCls:'bg'},
  ]
  return (
    <div className="page">
      <div className="ph"><div className="ph-top">
        <div><div className="ph-tag">Finance · Phase 4–5 · Newport Healthcare</div><div className="ph-title">Revenue Fog Monitor</div>
          <div className="ph-sub">Net Patient Revenue · Daily Accrual vs Billed · True-Up · Program Rate Mix (RTC / PHP / IOP)</div></div>
        <div className="ph-pills"><span className="pill pill-r">Pain P5 — Critical</span><span className="pill pill-o">$1.6M Unvalidated</span><span className="pill pill-a">38-Day A/R</span></div>
      </div></div>
      <div style={{background:'var(--lg)',borderRadius:9,padding:'11px 14px',display:'flex',gap:20,alignItems:'center',flexWrap:'wrap'}}>
        <div style={{fontSize:10,fontWeight:700}}>Newport Program Rates (Daily):</div>
        <div style={{display:'flex',gap:14}}>
          <span style={{fontSize:10,color:'var(--mg)'}}>🏠 <strong style={{color:'var(--orange)'}}>$1,250</strong> RTC Residential (80 pts)</span>
          <span style={{fontSize:10,color:'var(--mg)'}}>🏥 <strong style={{color:'var(--cy)'}}>$680</strong> PHP (40 pts)</span>
          <span style={{fontSize:10,color:'var(--mg)'}}>📋 <strong style={{color:'var(--gr)'}}>$420</strong> IOP (22 pts)</span>
          <span style={{fontSize:10,color:'var(--mg)'}}>🔄 <strong style={{color:'var(--am)'}}>$1,100</strong> Extended Care</span>
        </div>
        <div style={{marginLeft:'auto',fontSize:10,color:'var(--sl)',fontFamily:'JetBrains Mono,monospace'}}>Monthly expected at census: ~<strong style={{color:'var(--gr)'}}>$5.4M</strong></div>
      </div>
      <div className="kg kg4">
        <div className="kc cr"><div className="kpain ptag">⚠ P5</div><div className="kv vr">$1.6M</div><div className="kl">Revenue Fog Exposure (MTD)</div><div className="kd db">~30% of monthly NPR in workbooks</div></div>
        <div className="kc"><div className="kv vo">$5.4M</div><div className="kl">Expected Net Revenue (MTD)</div><div className="kd dw">Accrued in manual Excel — no daily view</div></div>
        <div className="kc cg"><div className="kv vg">$3.8M</div><div className="kl">Billed Revenue (MTD)</div><div className="kd dg">↑ 6% vs last month</div></div>
        <div className="kc cr"><div className="kv vr">38 dy</div><div className="kl">Days in A/R</div><div className="kd db">Target: 26 · $780K outstanding</div></div>
      </div>
      <div className="g21">
        <div className="panel">
          <div className="phead"><div><div className="ptitle"><span className="pic">📊</span> Monthly True-Up: Billed vs Expected — Discharge Cohort</div>
            <div className="psub">PowerBI export · Phase 5 reconciliation · Manual today → should be automated</div></div><span className="b ba">Manual Today</span></div>
          <table className="dt">
            <thead><tr><th>Patient ID</th><th>Program</th><th>Payer</th><th>LOS</th><th>Expected</th><th>Billed</th><th>Variance</th><th>Status</th></tr></thead>
            <tbody>{rows.map(r => (
              <tr key={r.id}>
                <td style={{fontFamily:'JetBrains Mono,monospace',fontSize:10}}>{r.id}</td>
                <td><span className={`b ${r.prog==='RTC'?'bo':r.prog==='PHP'?'bc':r.prog==='IOP'?'bg':'ba'}`}>{r.prog}</span></td>
                <td>{r.payer}</td>
                <td style={{fontFamily:'JetBrains Mono,monospace'}}>{r.los}</td>
                <td style={{fontFamily:'JetBrains Mono,monospace'}}>{r.exp}</td>
                <td style={{fontFamily:'JetBrains Mono,monospace'}}>{r.billed}</td>
                <td style={{fontFamily:'JetBrains Mono,monospace'}} className={r.varCls}>{r.var}</td>
                <td><span className={`b b${r.sCls}`}>{r.status}</span></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:10}}>
          <div className="panel">
            <div className="phead"><div className="ptitle"><span className="pic">📈</span> Net Patient Revenue — Monthly</div></div>
            <div style={{padding:'10px 14px 4px'}}>
              <div className="revbars">
                {[['May',55],['Jun',62],['Jul',58],['Aug',68],['Sep',64],['Oct*',40]].map(([m,h]) => (
                  <div key={m} className="rbg"><div className="rb" style={{background:m==='Oct*'?'#CCC':'var(--orange)',height:h,opacity:m==='Oct*'?.6:1}}/><div className="rm">{m}</div></div>
                ))}
              </div>
              <div style={{fontSize:8,color:'var(--sl)',padding:'4px 0 6px',fontFamily:'JetBrains Mono,monospace'}}>*Oct partial — unvalidated without daily NPR automation</div>
            </div>
          </div>
          <div className="panel">
            <div className="phead"><div className="ptitle"><span className="pic">🤖</span> AI Revenue Agent</div></div>
            <div style={{padding:'10px 14px',display:'flex',flexDirection:'column',gap:8}}>
              <div className="ai-box"><div className="ai-ico">💡</div><div className="ai-txt"><strong>4 patients have billing variances</strong> totaling $11,250. Root causes: Magellan code template mismatch (P1), VOB sync gap (P2), missed auth renewal (P4). 3 of 4 auto-resolvable today.</div></div>
              <div className="ai-box"><div className="ai-ico">📊</div><div className="ai-txt"><strong>Daily NPR accrual</strong> can be automated from Lightning Step census data — eliminate Revenue Fog and give Newport's CFO a real-time NPR number by 8AM every day.</div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
