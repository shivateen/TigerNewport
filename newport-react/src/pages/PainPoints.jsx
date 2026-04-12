import React from 'react'
const critical = [
  {id:'P1',title:'Manual Re-keying: Salesforce → Lightning Step',desc:'At Phase 3 admission, Newport\'s staff manually re-enter every patient\'s demographics, insurance details, and clinical flags from Salesforce into Lightning Step EHR. No automated data pipeline. Every admission = duplicated data entry, transcription risk, and 20–30 minutes of avoidable delay.',impact:'⚡ Impact: ~8 hours/day staff time lost · Transcription errors entering clinical record · Onboarding delays'},
  {id:'P2',title:'No Bidirectional Sync: EHR ↔ Salesforce',desc:'Insurance status changes, authorization updates, and payer tier changes made in Lightning Step never sync back to Salesforce. Newport\'s VOB team and growth team operate with stale data — creating inaccurate patient estimates, unnecessary support cases, and downstream claim denials with Magellan and Optum Behavioral carve-outs.',impact:'⚡ Impact: 43 open support cases · $42K estimate exposure · Leading cause of Magellan/Optum claim denials'},
  {id:'P5',title:'"Revenue Fog": Manual FP&A Workbooks',desc:'Newport\'s finance team accrues daily expected revenue in manual Excel workbooks, reconciled monthly in PowerBI. The CFO has no real-time Net Patient Revenue number. At $5.4M monthly expected revenue, approximately $1.6M is in a fog at any given time — unvalidated until month-end close.',impact:'⚡ Impact: $1.6M unvalidated monthly · 38-day A/R (target 26) · Finance flying blind between closes'},
]
const high = [
  {id:'P3',title:'Paper-Based Consents & Demographics (JCAHO/CARF Risk)',desc:'Patient demographics and legal consents at Phase 3 admission are captured on paper forms and manually scanned. For a JCAHO/CARF-accredited behavioral health organization like Newport, this creates a direct compliance finding risk. It also adds 30–45 minutes per admission and makes records non-searchable.',impact:'⚡ Impact: JCAHO/CARF finding risk · 40-min/patient delay · Compliance audit exposure'},
  {id:'P4',title:'Manual RCM Code Mapping: H0018, H0019, S9480',desc:'Newport\'s behavioral health billing codes must be manually mapped to each payer\'s specific UB-04/837 template — Magellan wants different modifiers than Optum Behavioral, BCBS requires F-code ordering priority. This drives Newport\'s first-pass acceptance rate down to 79% against a 93% target.',impact:'⚡ Impact: 18 claims pending · 79% first-pass (target 93%) · 38 Days in A/R vs 26 target'},
  {id:'P6',title:'Marketing Spend Disconnected from Bed Capacity',desc:'Newport\'s digital marketing runs at constant spend regardless of how many beds are available. When 600 patients clear for admission against 21 available beds, the admissions team faces a surge they cannot safely handle. The marketing budget continues to run during capacity-constrained weeks.',impact:'⚡ Impact: $14K/week over-spend during surge · Admissions burnout · Sub-optimal bed fill rate'},
]
const resolutions = [
  {p:'P1',cls:'br',current:'Manual data entry at every admission',solution:'Automated Salesforce → Lightning Step pipeline triggered on admission clearance event',systems:'Salesforce API + Lightning Step',roi:'~8 hrs/day saved · Zero transcription errors'},
  {p:'P2',cls:'br',current:'One-way, manual insurance updates',solution:'Real-time bidirectional insurance status sync — EHR changes push to Salesforce within minutes',systems:'Lightning Step + Salesforce',roi:'$42K/cycle exposure closed · Magellan/Optum denials prevented'},
  {p:'P3',cls:'ba',current:'Paper forms scanned post-admission',solution:'Digital pre-admission consent capture in Salesforce — e-signatures before arrival day',systems:'Salesforce + LS intake module',roi:'40 min/patient saved · JCAHO/CARF compliance gap closed'},
  {p:'P4',cls:'ba',current:'RCM manually maps H0018/H0019/S9480',solution:'Payer template AI — auto-maps BH billing codes to Magellan, Optum, BCBS, Aetna, UH formats',systems:'RCM + PowerBI + Payer APIs',roi:'79% → 93% first-pass · A/R 38 → 26 days'},
  {p:'P5',cls:'br',current:'Monthly manual workbooks — no daily NPR',solution:'Daily NPR accrual agent from Lightning Step census · CFO sees real-time net revenue by 8AM',systems:'Lightning Step + PowerBI + Finance',roi:'$1.6M visible daily · Month-end recon eliminated'},
  {p:'P6',cls:'ba',current:'Constant digital spend regardless of capacity',solution:'Weekly CPC throttle/scale agent — reads bed availability, writes to Salesforce campaign budget',systems:'Ops bed data + Salesforce Campaigns',roi:'$14K/week surge prevention · Burnout reduction ~40%'},
]
export default function PainPoints() {
  return (
    <div className="page">
      <div className="ph"><div className="ph-top">
        <div><div className="ph-tag">System Analysis · Newport Healthcare</div><div className="ph-title">6 Pain Points — Root Cause & Resolution Map</div>
          <div className="ph-sub">Salesforce ↔ Lightning Step ↔ PowerBI · All 6 phases · Clinical + Financial + Operational impact</div></div>
        <div className="ph-pills"><span className="pill pill-r">3 Critical</span><span className="pill pill-a">3 High</span><span className="pill pill-c">6 AI Agent Resolutions</span></div>
      </div></div>
      <div className="g2">
        <div className="panel"><div className="phead"><div className="ptitle"><span className="pic">⚠️</span> Critical Pain Points (3)</div></div>
          <div className="pstrip">
            {critical.map(p => (
              <div key={p.id} className="pitem crit">
                <div className="pico">🔁</div>
                <div className="pb"><div className="ptit">{p.id} — {p.title}</div><div className="pdesc">{p.desc}</div><div className="pimp">{p.impact}</div></div>
                <div className="psev sc">CRITICAL</div>
              </div>
            ))}
          </div>
        </div>
        <div className="panel"><div className="phead"><div className="ptitle"><span className="pic">⚡</span> High Pain Points (3)</div></div>
          <div className="pstrip">
            {high.map(p => (
              <div key={p.id} className="pitem high">
                <div className="pico">📄</div>
                <div className="pb"><div className="ptit">{p.id} — {p.title}</div><div className="pdesc">{p.desc}</div><div className="pimp">{p.impact}</div></div>
                <div className="psev sh">HIGH</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="panel">
        <div className="phead"><div className="ptitle"><span className="pic">🤖</span> AI Agent Resolution Map — Pain Point → Automation → Newport ROI</div></div>
        <table className="dt">
          <thead><tr><th>Pain Point</th><th>Current State</th><th>AI Agent Solution</th><th>Systems</th><th>Estimated Newport ROI</th></tr></thead>
          <tbody>{resolutions.map(r => (
            <tr key={r.p}><td><span className={`b b${r.cls}`}>{r.p}</span></td><td>{r.current}</td><td>{r.solution}</td><td>{r.systems}</td>
              <td style={{color:'var(--gr)',fontFamily:'JetBrains Mono,monospace'}}>{r.roi}</td></tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  )
}
