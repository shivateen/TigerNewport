import React from 'react'
export default function FinanceVOB() {
  const cases = [
    {id:'VOB-841',pt:'#NHP-7901',prog:'RTC',payer:'Magellan Health',issue:'Auth updated in LS — not in Salesforce VOB',days:'8 dy',exp:'$22,500',status:'At Risk',sCls:'br'},
    {id:'VOB-838',pt:'#NHP-7887',prog:'PHP',payer:'Optum Behavioral',issue:'Coverage tier change — estimate incorrect in CRM',days:'4 dy',exp:'$11,900',status:'Monitor',sCls:'ba'},
    {id:'VOB-825',pt:'#NHP-7860',prog:'RTC',payer:'Aetna Commercial',issue:'Deductible reset — patient owes more than told',days:'3 dy',exp:'$7,800',status:'Monitor',sCls:'ba'},
  ]
  return (
    <div className="page">
      <div className="ph"><div className="ph-top">
        <div><div className="ph-tag">Finance · Phase 2 · Newport Healthcare</div><div className="ph-title">Verification of Benefits & Financial Clearance</div>
          <div className="ph-sub">Insurance screening · Deposit collection · Auth pipeline · Phase 2→3 transition · Magellan / Optum behavioral carve-outs</div></div>
        <div className="ph-pills"><span className="pill pill-r">Pain P2 — No Bidirectional Sync</span></div>
      </div></div>
      <div className="kg kg4">
        <div className="kc"><div className="kv vo">462</div><div className="kl">VOB Screenings Completed (Cycle)</div><div className="kd dg">Of 600 clinically cleared</div></div>
        <div className="kc cr"><div className="kpain ptag">⚠ P2</div><div className="kv vr">43</div><div className="kl">Open Support Cases — Unverified Benefits</div><div className="kd db">EHR updates not syncing to Salesforce</div></div>
        <div className="kc cg"><div className="kv vg">$228K</div><div className="kl">Deposits Collected (MTD)</div><div className="kd dg">↑ 14% vs last month</div></div>
        <div className="kc ct"><div className="kv vc">38</div><div className="kl">Auth Renewals Active (Next 30 Days)</div><div className="kd dw">Concurrent review every 5–7 days (RTC)</div></div>
      </div>
      <div className="panel">
        <div className="phead"><div><div className="ptitle"><span className="pic">🔍</span> Unverified Benefits Queue — Bidirectional Sync Gap</div>
          <div className="psub">Insurance updates made in Lightning Step EHR are not reflected in Salesforce · VOB team working off stale data</div></div>
          <span className="b br">⚠ P2: Sync Gap — $42K Exposure</span></div>
        <table className="dt">
          <thead><tr><th>Case ID</th><th>Patient</th><th>Program</th><th>Payer</th><th>Issue</th><th>Days Open</th><th>Exposure</th><th>Status</th></tr></thead>
          <tbody>{cases.map(c => (
            <tr key={c.id}>
              <td style={{fontFamily:'JetBrains Mono,monospace',fontSize:10}}>{c.id}</td>
              <td>{c.pt}</td>
              <td><span className={`b ${c.prog==='RTC'?'bo':'bc'}`}>{c.prog}</span></td>
              <td>{c.payer}</td>
              <td>{c.issue}</td>
              <td style={{color:'var(--rd)',fontFamily:'JetBrains Mono,monospace'}}>{c.days}</td>
              <td style={{fontFamily:'JetBrains Mono,monospace'}}>{c.exp}</td>
              <td><span className={`b b${c.sCls}`}>{c.status}</span></td>
            </tr>
          ))}</tbody>
        </table>
      </div>
      <div className="ai-box"><div className="ai-ico">🤖</div><div className="ai-txt"><strong>Bidirectional Sync Agent:</strong> Real-time EHR → Salesforce insurance status sync would close all 43 support cases within 24 hours, protect $42,200 in estimate accuracy, and eliminate the most common root cause of first-pass claim denials. Magellan and Optum Behavioral carve-out updates are the highest-frequency sync events — and currently the most likely to be missed by Newport's VOB team.</div></div>
    </div>
  )
}
