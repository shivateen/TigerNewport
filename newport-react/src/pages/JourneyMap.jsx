import React from 'react'
export default function JourneyMap() {
  const pain = [{id:'P1',cls:'br',sev:'CRITICAL',title:'Manual Re-keying: Salesforce → Lightning Step',phase:'Phase 3',sys:'CRM / EHR',persona:'Operations',impact:'Staff hours lost · Transcription errors · Onboarding delays'},
    {id:'P2',cls:'br',sev:'CRITICAL',title:'No Bidirectional Sync EHR ↔ Salesforce',phase:'Phase 4',sys:'Lightning Step',persona:'Finance / Growth',impact:'43 open support cases · Stale VOB data · Claim denials'},
    {id:'P3',cls:'ba',sev:'HIGH',title:'Paper-Based Demographics & Legal Consents',phase:'Phase 3',sys:'Manual',persona:'Operations',impact:'JCAHO/CARF compliance risk · 40-min admission delay'},
    {id:'P4',cls:'ba',sev:'HIGH',title:'Manual RCM Code Mapping (UB-04/837)',phase:'Phase 5',sys:'RCM / PowerBI',persona:'Finance',impact:'18 claims pending · 79% first-pass rate (target 93%)'},
    {id:'P5',cls:'br',sev:'CRITICAL',title:'"Revenue Fog" — Manual FP&A Workbooks',phase:'Phase 4–5',sys:'Finance / PowerBI',persona:'Finance',impact:'$1.6M unvalidated monthly · No daily NPR'},
    {id:'P6',cls:'ba',sev:'HIGH',title:'Marketing Spend Disconnected from Bed Capacity',phase:'Phase 1–2',sys:'Salesforce / Ops',persona:'Growth / Ops',impact:'Intake surge risk · Staff burnout · $14K weekly over-spend'}]
  return (
    <div className="page">
      <div className="ph"><div className="ph-top">
        <div><div className="ph-tag">End-to-End View · Newport Healthcare</div><div className="ph-title">6-Phase Patient Journey</div>
          <div className="ph-sub">Salesforce CRM → Lightning Step EHR → PowerBI · Clinical + Financial + Operational flows</div></div>
        <div className="ph-pills"><span className="pill pill-r">6 Pain Points · 4 Phases</span><span className="pill pill-c">3 Core Systems</span><span className="pill pill-o">RTC · PHP · IOP · Extended Care</span></div>
      </div></div>
      <div className="panel">
        <div className="phead"><div className="ptitle"><span className="pic">⚠️</span> Pain Point → Phase → Persona → Impact Map</div></div>
        <table className="dt">
          <thead><tr><th>#</th><th>Pain Point</th><th>Phase</th><th>System</th><th>Persona</th><th>Severity</th><th>Business Impact</th></tr></thead>
          <tbody>{pain.map(p => (
            <tr key={p.id}><td><span className={`b b${p.cls}`}>{p.id}</span></td><td>{p.title}</td><td>{p.phase}</td><td>{p.sys}</td><td>{p.persona}</td>
              <td><span className={`b b${p.cls}`}>{p.sev}</span></td><td>{p.impact}</td></tr>
          ))}</tbody>
        </table>
      </div>
      <div className="panel">
        <div className="phead"><div className="ptitle"><span className="pic">🤖</span> AI Agent Resolution Map</div></div>
        <table className="dt">
          <thead><tr><th>Pain Point</th><th>Current State</th><th>AI Agent Solution</th><th>Systems</th><th>Estimated Newport ROI</th></tr></thead>
          <tbody>
            <tr><td><span className="b br">P1</span> Manual Re-keying</td><td>Manual entry at every admission</td><td>Automated Salesforce → Lightning Step pipeline triggered on clearance event</td><td>Salesforce API + Lightning Step</td><td style={{color:'var(--gr)',fontFamily:'JetBrains Mono,monospace'}}>~8 hrs/day saved · Zero transcription errors</td></tr>
            <tr><td><span className="b br">P2</span> No Bidirectional Sync</td><td>One-way, manual insurance updates</td><td>Real-time bidirectional insurance status sync — EHR changes push to Salesforce</td><td>Lightning Step + Salesforce</td><td style={{color:'var(--gr)',fontFamily:'JetBrains Mono,monospace'}}>$42K/cycle exposure closed</td></tr>
            <tr><td><span className="b ba">P3</span> Paper-Based Intake</td><td>Paper forms scanned post-admission</td><td>Digital pre-admission consent capture · e-signatures before arrival day</td><td>Salesforce + LS intake module</td><td style={{color:'var(--gr)',fontFamily:'JetBrains Mono,monospace'}}>40 min/patient saved · JCAHO gap closed</td></tr>
            <tr><td><span className="b ba">P4</span> Manual Code Mapping</td><td>RCM manually maps H0018/H0019/S9480</td><td>Payer template AI — auto-maps BH billing codes to Magellan, Optum, BCBS formats</td><td>RCM + PowerBI + Payer APIs</td><td style={{color:'var(--gr)',fontFamily:'JetBrains Mono,monospace'}}>79% → 93% first-pass · A/R 38→26 days</td></tr>
            <tr><td><span className="b br">P5</span> Revenue Fog</td><td>Monthly manual workbooks — no daily NPR</td><td>Daily NPR accrual agent from Lightning Step census · CFO sees real-time by 8AM</td><td>Lightning Step + PowerBI + Finance</td><td style={{color:'var(--gr)',fontFamily:'JetBrains Mono,monospace'}}>$1.6M visible daily</td></tr>
            <tr><td><span className="b ba">P6</span> Mktg-Capacity Gap</td><td>Constant digital spend regardless of capacity</td><td>Weekly CPC throttle/scale agent — reads bed availability, writes to Salesforce campaigns</td><td>Ops bed data + Salesforce Campaigns</td><td style={{color:'var(--gr)',fontFamily:'JetBrains Mono,monospace'}}>$14K/week surge prevention</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
