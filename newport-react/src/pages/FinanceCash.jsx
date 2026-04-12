import React from 'react'
export default function FinanceCash() {
  const cohort = [
    {id:'#NHP-7821',prog:'RTC 45-day',dis:'Sep 28',sub:'Sep 30',exp:'$56,250',days:'10 dy',status:'Payer Review',sCls:'ba'},
    {id:'#NHP-7740',prog:'PHP 25-day',dis:'Sep 25',sub:'Sep 26',exp:'$17,000',days:'13 dy',status:'Approved — EFT 3 days',sCls:'bg'},
    {id:'#NHP-7612',prog:'IOP 12-day',dis:'Oct 1', sub:'Oct 2', exp:'$5,040', days:'7 dy', status:'Under Review',sCls:'bc'},
    {id:'#NHP-7598',prog:'Ext. Care 14-day',dis:'Sep 22',sub:'Sep 24',exp:'$15,400',days:'16 dy',status:'Denied — Resubmit',sCls:'br'},
  ]
  const steps = [['✓','Discharge Day 0','Clinical records locked · RCM claim prep begins','var(--orange)'],['✓','Claim Submitted Day 1–3','UB-04/837 sent · Manual coding today','var(--orange)'],['~','Payer Review Day 3–10','Insurance adjudicates · Magellan: 5–7 days','var(--am)'],['?','Approval / Denial Day 7–14','Cash confirmation or denial to work','#E0E0E0'],['$','Cash Received Day 14–21','EFT to Newport account · True-Up reconciled','var(--gr)']]
  return (
    <div className="page">
      <div className="ph"><div className="ph-top">
        <div><div className="ph-tag">Finance · Phase 5–6 · Newport Healthcare</div><div className="ph-title">Post-Discharge Cash Collection Timeline</div>
          <div className="ph-sub">The 7–14 day cash lag after discharge · When Newport actually gets paid · Insurance approval window management</div></div>
        <div className="ph-pills"><span className="pill pill-o">7–14 Day Approval Window</span><span className="pill pill-r">$780K Outstanding</span></div>
      </div></div>
      <div className="kg kg4">
        <div className="kc"><div className="kv vo">28</div><div className="kl">Discharges (This Month)</div><div className="kd dg">Billing pipeline active</div></div>
        <div className="kc cr"><div className="kv vr">$780K</div><div className="kl">Claims Pending Insurance Approval</div><div className="kd db">7–14 day average approval window</div></div>
        <div className="kc cg"><div className="kv vg">$3.8M</div><div className="kl">Cash Received (MTD)</div><div className="kd dg">From prior month discharges</div></div>
        <div className="kc ct"><div className="kv vc">38 dy</div><div className="kl">Days in A/R</div><div className="kd db">Target 26 · Includes approval lag</div></div>
      </div>
      <div className="panel">
        <div className="phead"><div className="ptitle"><span className="pic">⏱️</span> Cash Collection Timeline — Per Discharge Episode</div>
          <div className="psub">From discharge event → payer approval → cash in account · Newport's 7–14 day window</div></div>
        <div style={{display:'flex',alignItems:'center',padding:'14px',overflowX:'auto',gap:0}}>
          {steps.map(([icon,label,sub,color],i) => (
            <React.Fragment key={i}>
              <div style={{display:'flex',flexDirection:'column',alignItems:'center',minWidth:110,gap:4}}>
                <div style={{width:28,height:28,borderRadius:'50%',background:color,color:color==='#E0E0E0'?'var(--sl)':'white',display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,fontWeight:700,flexShrink:0}}>{icon}</div>
                <div style={{fontSize:9,fontFamily:'JetBrains Mono,monospace',color:'var(--mg)',textAlign:'center',fontWeight:600}}>{label}</div>
                <div style={{fontSize:8,color:'var(--sl)',textAlign:'center'}}>{sub}</div>
              </div>
              {i < steps.length-1 && <div style={{flex:1,height:2,background:'#E0E0E0',minWidth:30,alignSelf:'flex-start',marginTop:13}}/>}
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className="panel">
        <div className="phead"><div className="ptitle"><span className="pic">📊</span> October Discharge Cohort — Cash Collection Status</div></div>
        <table className="dt">
          <thead><tr><th>Patient</th><th>Program</th><th>Discharge Date</th><th>Claim Submitted</th><th>Expected Cash</th><th>Days Since Discharge</th><th>Status</th></tr></thead>
          <tbody>{cohort.map(r => (
            <tr key={r.id}>
              <td style={{fontFamily:'JetBrains Mono,monospace',fontSize:10}}>{r.id}</td>
              <td><span className="b bo">{r.prog}</span></td>
              <td>{r.dis}</td><td>{r.sub}</td>
              <td style={{fontFamily:'JetBrains Mono,monospace'}}>{r.exp}</td>
              <td style={{fontFamily:'JetBrains Mono,monospace'}}>{r.days}</td>
              <td><span className={`b b${r.sCls}`}>{r.status}</span></td>
            </tr>
          ))}</tbody>
        </table>
      </div>
      <div className="ai-box"><div className="ai-ico">🤖</div><div className="ai-txt"><strong>Cash Flow Agent:</strong> By monitoring each discharge episode in real time, the AI agent tracks every claim through the Magellan/Optum/BCBS approval pipeline and alerts the RCM team on Day 10 if a claim hasn't moved to approval status — before the denial window closes. For Newport's current 28-discharge month, proactive monitoring would prevent the average 3-day approval delay that currently extends Days in A/R from a target 26 to actual 38.</div></div>
    </div>
  )
}
