import React, { useEffect, useRef } from 'react'
import { useApp } from '../context/AppContext.jsx'

function BedGrid({ id, total, occ, dis, hold, maint }) {
  const ref = useRef(null)
  useEffect(() => {
    if (!ref.current) return
    ref.current.innerHTML = ''
    for (let i = 1; i <= total; i++) {
      const d = document.createElement('div')
      d.className = 'bcell'
      d.textContent = String(i).padStart(2,'0')
      if (i <= dis) d.classList.add('bdis')
      else if (i <= dis + maint) d.classList.add('bmaint')
      else if (i <= dis + maint + hold) d.classList.add('bhold')
      else if (i <= dis + maint + hold + occ) d.classList.add('bocc')
      else d.classList.add('bempty')
      ref.current.appendChild(d)
    }
  }, [])
  return <div className="bgrid" ref={ref} />
}

export default function OpsBeds() {
  const { setOpenModal } = useApp()
  const matches = [
    {wl:'WL-5241',prog:'RTC 30-day',wing:'RTC Fl.1 / R-114',age:'16 / F',payer:'BCBS Anthem',cleared:'Oct 2',score:'97%',sCls:'bg',action:'Confirm',aCls:'btn-o',modal:'conf-5241'},
    {wl:'WL-5238',prog:'RTC 45-day',wing:'RTC Fl.2 / R-211',age:'20 / M',payer:'Magellan Health',cleared:'Oct 3',score:'93%',sCls:'bg',action:'Confirm',aCls:'btn-o',modal:'conf-5238'},
    {wl:'WL-5230',prog:'PHP 21-day',wing:'PHP Wing / P-08',age:'17 / F',payer:'Aetna',cleared:'Oct 4',score:'89%',sCls:'bc',action:'Review',aCls:'btn-gh',modal:'rev-5230'},
    {wl:'WL-5219',prog:'RTC 60-day',wing:'RTC Fl.2 / R-228',age:'22 / M',payer:'UnitedHealth',cleared:'Oct 5',score:'85%',sCls:'bc',action:'Review',aCls:'btn-gh',modal:'rev-5219'},
  ]
  return (
    <div className="page">
      <div className="ph"><div className="ph-top">
        <div><div className="ph-tag">Operations · Phase 3–4 · Newport Healthcare</div><div className="ph-title">Bed Management — RTC & Outpatient Wings</div>
          <div className="ph-sub">From 600 cleared admissions: bed allocation by wing · Discharge prediction · AI waitlist matching · 163 total capacity</div></div>
        <div className="ph-pills"><span className="pill pill-c">142 Active / 163 Capacity</span><span className="pill pill-o">87% Occupancy</span><span className="pill pill-g">8 Discharging Fri</span></div>
      </div></div>
      <div className="kg kg5">
        <div className="kc ct"><div className="kv vc">142</div><div className="kl">Active Census (All Programs)</div><div className="kd dg">87% occupancy</div></div>
        <div className="kc"><div className="kv vo">21</div><div className="kl">Empty Beds Available</div><div className="kd db">↑ 13% idle capacity</div></div>
        <div className="kc cg"><div className="kv vg">8</div><div className="kl">Predicted Discharges (Friday)</div><div className="kd dg">RTC Wing cluster · Pre-plan now</div></div>
        <div className="kc"><div className="kv vo">600</div><div className="kl">Cleared — Awaiting Admission</div><div className="kd dw">Dates spread over 6–8 weeks</div></div>
        <div className="kc ct"><div className="kv vc">5</div><div className="kl">AI Waitlist Pre-Matched (Fri)</div><div className="kd dg">Program + payer + clinical fit</div></div>
      </div>
      <div className="g2">
        <div className="panel">
          <div className="phead"><div><div className="ptitle"><span className="pic">🏠</span> RTC Residential Wing — 82 Beds</div>
            <div className="psub">Teen & Young Adult Residential · 30–90 day programs · 8 discharging Friday</div></div><span className="b bg">8 Discharging Fri</span></div>
          <div className="wing-lbl">RTC Floor 1 — Ages 12–17</div>
          <BedGrid total={20} occ={12} dis={5} hold={0} maint={1} />
          <div className="wing-lbl">RTC Floor 2 — Ages 18–28</div>
          <BedGrid total={22} occ={17} dis={3} hold={1} maint={0} />
        </div>
        <div className="panel">
          <div className="phead"><div><div className="ptitle"><span className="pic">🏥</span> PHP / IOP Outpatient Wing — 81 Beds</div>
            <div className="psub">Partial Hospitalization + Intensive Outpatient programs</div></div><span className="b ba">2 Admin Hold</span></div>
          <div className="wing-lbl">PHP Wing — Partial Hospitalization</div>
          <BedGrid total={20} occ={18} dis={0} hold={1} maint={0} />
          <div className="wing-lbl">IOP Wing — Intensive Outpatient</div>
          <BedGrid total={20} occ={16} dis={0} hold={1} maint={0} />
        </div>
      </div>
      <div className="panel">
        <div className="phead"><div><div className="ptitle"><span className="pic">🎯</span> Waitlist → Bed Matching (Friday Discharge Cluster)</div>
          <div className="psub">From 600 cleared admissions · AI pre-ranked by program type, payer, clinical profile, and age cohort</div></div>
          <button className="btn btn-o" onClick={() => setOpenModal({type:'approve-all'})}>Approve All Matches</button></div>
        <table className="dt">
          <thead><tr><th>Waitlist ID</th><th>Program</th><th>Wing / Room</th><th>Age / Gender</th><th>Payer</th><th>Cleared Date</th><th>Match Score</th><th>Action</th></tr></thead>
          <tbody>{matches.map(m => (
            <tr key={m.wl}>
              <td style={{fontFamily:'JetBrains Mono,monospace',fontSize:10}}>{m.wl}</td>
              <td><span className="b bo">{m.prog}</span></td>
              <td>{m.wing}</td><td>{m.age}</td><td>{m.payer}</td><td>{m.cleared}</td>
              <td><span className={`b b${m.sCls}`}>{m.score}</span></td>
              <td><button className={`btn ${m.aCls}`} style={{fontSize:9,padding:'4px 10px'}} onClick={() => setOpenModal({type:m.modal})}>{m.action}</button></td>
            </tr>
          ))}</tbody>
        </table>
      </div>
      <div className="ai-box"><div className="ai-ico">🤖</div><div className="ai-txt"><strong>Bed Orchestration Agent:</strong> 8 RTC Wing discharges predicted Friday. 5 waitlist patients pre-matched from the 600 cleared pipeline by program type (RTC vs PHP), age cohort (teen vs young adult), payer, and clinical profile. Approving now pre-schedules housekeeping 48hrs ahead. From today's 600 cleared patients, the 6-week intake plan projects 91% occupancy across both wings.</div></div>
    </div>
  )
}
