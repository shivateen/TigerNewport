import React from 'react'
export default function OpsStaff() {
  const weeks = [
    {wk:'Week 1 (Current)',type:'Core FTE',typeCls:'bg',pct:72,bar:'var(--gr)',desc:'142 pts · 5:1 ratio RTC · 8:1 PHP/IOP · 28 clinical FTE total',need:'28 FTE',surge:false},
    {wk:'Week 2',type:'Core FTE',typeCls:'bg',pct:77,bar:'var(--orange)',desc:'152 pts · Discharge rotation continues · 29 FTE',need:'29 FTE',surge:false},
    {wk:'Week 3 ⚠ Surge',type:'+4 Contingent',typeCls:'br',pct:86,bar:'var(--rd)',desc:'168 pts · 80%+ util · 4 contingent milieu counselors required',need:'29 + 4',surge:true},
    {wk:'Week 4',type:'Flex Down',typeCls:'bc',pct:70,bar:'var(--cy)',desc:'148 pts · 12 discharges predicted · Reduce contingent to 2',need:'29 + 2',surge:false},
  ]
  const roles = [
    {role:'Primary Therapist',prog:'RTC Residential',target:'1:5',curr:'16 pts / therapist',wk3:'+1 FTE',sCls:'ba'},
    {role:'Case Manager',prog:'All Programs',target:'1:8',curr:'7.5 pts / CM',wk3:'On Track',sCls:'bg'},
    {role:'Milieu Counselor',prog:'RTC Residential',target:'1:8',curr:'7.9 pts / counselor',wk3:'+4 contingent',sCls:'br'},
    {role:'Prescriber / MD',prog:'RTC + PHP',target:'1:30',curr:'28 pts / MD',wk3:'On Track',sCls:'bg'},
  ]
  return (
    <div className="page">
      <div className="ph"><div className="ph-top">
        <div><div className="ph-tag">Operations · Phase 4 · Newport Healthcare</div><div className="ph-title">Staffing Ratio Optimizer</div>
          <div className="ph-sub">Clinical staff-to-patient ratios · FTE + contingent mix · 4-week surge forecast from 600 cleared admissions</div></div>
        <div className="ph-pills"><span className="pill pill-o">4-Week Forecast</span><span className="pill pill-r">Week 3 Surge Alert</span></div>
      </div></div>
      <div className="kg kg4">
        <div className="kc cg"><div className="kv vg">142</div><div className="kl">Current Census</div><div className="kd dg">87% occupancy</div></div>
        <div className="kc"><div className="kv vo">4.8:1</div><div className="kl">Clinical Staff:Patient (RTC Today)</div><div className="kd dg">Target ≤ 5:1 · On track</div></div>
        <div className="kc cr"><div className="kv vr">80%+</div><div className="kl">Projected Occupancy — Week 3</div><div className="kd db">↑ Surge from cleared admissions</div></div>
        <div className="kc ct"><div className="kv vc">4</div><div className="kl">Contingent FTEs Required (Wk 3)</div><div className="kd dw">Engage agency today — 2-week lead</div></div>
      </div>
      <div className="panel">
        <div className="phead"><div><div className="ptitle"><span className="pic">👥</span> 4-Week Staffing Plan — Newport Clinical Roles</div>
          <div className="psub">Forecast from 600 cleared patients · Primary Therapists · Case Managers · Milieu Counselors · Psychiatry</div></div></div>
        <div>
          <div className="srow" style={{background:'var(--obg)'}}>
            <div className="slbl" style={{color:'var(--orange)',fontWeight:700}}>Week / Program</div>
            <div className="stype" style={{color:'var(--orange)'}}>FTE Type</div>
            <div style={{flex:1,fontSize:9,fontFamily:'JetBrains Mono,monospace',color:'var(--orange)'}}>Projected Census → Clinical Load</div>
            <div style={{fontSize:9,color:'var(--orange)',fontFamily:'JetBrains Mono,monospace',width:80,textAlign:'right'}}>Staff Needed</div>
          </div>
          {weeks.map((w,i) => (
            <div key={i} className="srow" style={w.surge ? {background:'var(--ab)'} : {}}>
              <div className="slbl">{w.wk}</div>
              <div className="stype"><span className={`b b${w.typeCls}`} style={{fontSize:8}}>{w.type}</span></div>
              <div style={{flex:1}}>
                <div className="pbar-b"><div className="pbar-f" style={{width:`${w.pct}%`,background:w.bar}}/></div>
                <div style={{fontSize:8.5,color:w.surge?'var(--rd)':'var(--sl)',marginTop:2}}>{w.desc}</div>
              </div>
              <div style={{fontSize:10,fontFamily:'JetBrains Mono,monospace',width:80,textAlign:'right',color:w.surge?'var(--rd)':undefined}}>{w.need}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="panel">
        <div className="phead"><div className="ptitle"><span className="pic">📋</span> Clinical Role Mix — Newport Program Requirements</div></div>
        <table className="dt">
          <thead><tr><th>Role</th><th>Program</th><th>Ratio Target</th><th>Current</th><th>Week 3 Need</th><th>Status</th></tr></thead>
          <tbody>{roles.map(r => (
            <tr key={r.role}><td><strong>{r.role}</strong></td><td>{r.prog}</td>
              <td style={{fontFamily:'JetBrains Mono,monospace'}}>{r.target}</td>
              <td style={{fontFamily:'JetBrains Mono,monospace'}}>{r.curr}</td>
              <td style={{fontFamily:'JetBrains Mono,monospace'}}>{r.wk3}</td>
              <td><span className={`b b${r.sCls}`}>{r.sCls==='br'?'Action Now':r.sCls==='ba'?'Plan Needed':'OK'}</span></td></tr>
          ))}</tbody>
        </table>
      </div>
      <div className="ai-box"><div className="ai-ico">🤖</div><div className="ai-txt"><strong>Staffing AI Agent:</strong> Based on 600 cleared admissions with tentative dates spread over next 6 weeks, Week 3 census will peak at 168 patients (80%+ utilization). <strong>Action required today:</strong> engage 4 contingent FTEs through your staffing agency. Contingent should be scaled back in Week 4 as 12 discharges are predicted. FTE core stays at 29 clinical across both wings.</div></div>
    </div>
  )
}
