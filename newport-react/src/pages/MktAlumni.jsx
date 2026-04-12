import React from 'react'
import { useApp } from '../context/AppContext.jsx'
export default function MktAlumni() {
  const { setOpenModal } = useApp()
  const alumni = [
    {id:'ALM-6820',prog:'RTC 45-day · Age 17',dis:'Sep 5',days:'33 dy',contact:'Oct 1',risk:'HIGH — 76%',rCls:'br',action:'Outreach Now',aCls:'btn-o',modal:'out-6820'},
    {id:'ALM-6741',prog:'PHP 21-day · Age 21',dis:'Aug 22',days:'47 dy',contact:'Sep 28',risk:'MED — 48%',rCls:'ba',action:'Schedule Call',aCls:'btn-gh',modal:'sched-6741'},
    {id:'ALM-6690',prog:'RTC 60-day · Age 19',dis:'Aug 10',days:'59 dy',contact:'Oct 3',risk:'LOW — 16%',rCls:'bg',action:'Referral Ask',aCls:'btn-gh',modal:'ref-6690'},
  ]
  return (
    <div className="page">
      <div className="ph"><div className="ph-top">
        <div><div className="ph-tag">Growth · Phase 6 · Newport Healthcare</div><div className="ph-title">Alumni Engagement & Clinical Outcomes</div>
          <div className="ph-sub">Post-discharge tracking · Readmission risk (behavioral health) · Outcomes surveys · JCAHO/CARF outcomes reporting</div></div>
        <div className="ph-pills"><span className="pill pill-r">14% Readmit Risk Flagged</span><span className="pill pill-g">200 Alumni Referrals / Cycle</span></div>
      </div></div>
      <div className="kg kg4">
        <div className="kc"><div className="kv vo">1,240</div><div className="kl">Total Alumni (Active Network)</div><div className="kd dg">↑ 28 added this month</div></div>
        <div className="kc cr"><div className="kv vr">174</div><div className="kl">High Readmission Risk (14%)</div><div className="kd db">Behavioral health 90-day window</div></div>
        <div className="kc"><div className="kv vo">$780K</div><div className="kl">Unpaid / Collections Outstanding</div><div className="kd dw">Bad debt monitoring active</div></div>
        <div className="kc cg"><div className="kv vg">200</div><div className="kl">Alumni Referrals (This Cycle)</div><div className="kd dg">20% of total inquiries · Most efficient channel</div></div>
      </div>
      <div className="panel">
        <div className="phead"><div className="ptitle"><span className="pic">🔄</span> Alumni — Readmission Risk Monitoring (90-Day Window)</div></div>
        <table className="dt">
          <thead><tr><th>Alumni ID</th><th>Program Completed</th><th>Discharge Date</th><th>Days Post</th><th>Last Clinical Contact</th><th>Readmit Risk</th><th>Action</th></tr></thead>
          <tbody>{alumni.map(a => (
            <tr key={a.id}>
              <td style={{fontFamily:'JetBrains Mono,monospace',fontSize:10}}>{a.id}</td>
              <td>{a.prog}</td><td>{a.dis}</td>
              <td style={{fontFamily:'JetBrains Mono,monospace'}}>{a.days}</td>
              <td>{a.contact}</td>
              <td><span className={`b b${a.rCls}`}>{a.risk}</span></td>
              <td><button className={`btn ${a.aCls}`} style={{fontSize:9,padding:'4px 8px'}} onClick={() => setOpenModal({type:a.modal})}>{a.action}</button></td>
            </tr>
          ))}</tbody>
        </table>
      </div>
      <div className="ai-box"><div className="ai-ico">🤖</div><div className="ai-txt"><strong>Alumni Outcomes Agent:</strong> For Newport's JCAHO accreditation and continuous quality improvement, outcomes data needs to flow from alumni engagement back into clinical reporting. The AI agent scores readmission risk using post-discharge engagement patterns, flags at-risk alumni within the 90-day critical window, and surfaces the 200 low-risk alumni as the highest-quality referral source for Newport's growth team.</div></div>
    </div>
  )
}
