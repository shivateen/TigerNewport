import React from 'react'
const funnel = [
  {label:'Total Inquiries',val:1000,pct:'100%',width:'100%',color:'var(--orange)',conv:''},
  {label:'↓ Initial Screen Passed',val:760,pct:'76%',width:'76%',color:'#E07800',conv:'-240 screened'},
  {label:'✓ Clinical Clearance',val:600,pct:'60%',width:'60%',color:'var(--cy)',conv:'-160 clinical'},
  {label:'↓ VOB Completed',val:510,pct:'51%',width:'51%',color:'#0090B8',conv:'-90 VOB'},
  {label:'✓ Financial Clearance',val:462,pct:'46%',width:'46%',color:'var(--gr)',conv:'-48 financial'},
  {label:'🛏️ Admitted (Census)',val:142,pct:'14.2%',width:'14.2%',color:'var(--mg)',conv:'Bed-limited'},
]
export default function MktFunnel() {
  return (
    <div className="page">
      <div className="ph"><div className="ph-top">
        <div><div className="ph-tag">Growth · Phase 1–2 · Newport Healthcare</div><div className="ph-title">Inquiry-to-Admission Funnel</div>
          <div className="ph-sub">1,000 inquiries → sequential clinical + financial clearance → 142 admitted · Family-initiated inquiries for teen & young adult programs</div></div>
        <div className="ph-pills"><span className="pill pill-o">$220 Avg CPL</span><span className="pill pill-g">60% Clinical Clearance</span><span className="pill pill-r">Bed Capacity = Binding Constraint</span></div>
      </div></div>
      <div className="kg kg4">
        <div className="kc"><div className="kv vo">1,000</div><div className="kl">Total Inquiries (Cycle)</div><div className="kd dg">↑ 12% vs last cycle</div></div>
        <div className="kc ct"><div className="kv vc">600</div><div className="kl">Clinically Cleared</div><div className="kd dg">60% clearance — strong rate</div></div>
        <div className="kc cg"><div className="kv vg">462</div><div className="kl">Financially Cleared + VOB Done</div><div className="kd dw">77% of clinically cleared</div></div>
        <div className="kc cr"><div className="kpain ptag">⚠ P6</div><div className="kv vr">$220</div><div className="kl">Cost Per Lead (Avg)</div><div className="kd db">Spend not linked to bed capacity</div></div>
      </div>
      <div className="g21">
        <div className="panel">
          <div className="phead"><div><div className="ptitle"><span className="pic">📊</span> Inquiry-to-Admission Funnel — Two Sequential Hurdles</div>
            <div className="psub">Clinical clearance must happen before financial clearance · Newport's 2-step qualification</div></div></div>
          <div className="funnel">
            {funnel.map((f,i) => (
              <div key={i} className="frow">
                <div className="flabel">{f.label}</div>
                <div className="fbw"><div className="fb" style={{width:f.width,background:f.color}}><div className="fbval">{f.val.toLocaleString()}</div></div></div>
                <div className="fpct">{f.pct}</div>
                <div className="fconv" style={{color:f.conv==='Bed-limited'?'var(--rd)':f.conv.startsWith('-')?'var(--amber)':''}}>{f.conv}</div>
              </div>
            ))}
          </div>
          <div style={{padding:'8px 14px 12px'}}>
            <div className="ai-box"><div className="ai-ico">💡</div><div className="ai-txt"><strong>320 cleared patients are waiting for a bed.</strong> This is not a demand problem — Newport's funnel performance is strong. The constraint is operational: bed throughput from RTC discharges. Reducing marketing spend right now adds cost without adding admissions.</div></div>
          </div>
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:10}}>
          <div className="panel">
            <div className="phead"><div className="ptitle"><span className="pic">📍</span> Lead Source — Newport Channels</div></div>
            <div style={{padding:'10px 14px',display:'flex',flexDirection:'column',gap:6}}>
              {[['Digital Campaigns',480,'var(--orange)'],['Field / Referral Outreach',320,'var(--cy)'],['Alumni Referrals',200,'var(--gr)']].map(([lbl,val,clr]) => (
                <div key={lbl} className="srow" style={{padding:'5px 0',borderBottom:'1px solid #F5F5F5'}}>
                  <div className="slbl" style={{width:160}}>{lbl}</div>
                  <div style={{flex:1}}><div className="pbar-b"><div className="pbar-f" style={{width:`${val/1000*100}%`,background:clr}}/></div></div>
                  <div style={{fontSize:10,fontFamily:'JetBrains Mono,monospace',width:40,textAlign:'right'}}>{val}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="panel">
            <div className="phead"><div className="ptitle"><span className="pic">💰</span> Spend by Channel (MTD)</div></div>
            <div style={{padding:'8px 14px',display:'flex',flexDirection:'column',gap:5}}>
              {[['Google / Meta Ads','$31,200','bo','↑ 40% vs capacity'],['Field & Detailing','$17,600','bg','Aligned'],['Alumni Programs','$4,400','bg','Most Efficient']].map(([lbl,amt,bcls,tag]) => (
                <div key={lbl} className="srow" style={{padding:'5px 0',borderBottom:'1px solid #F5F5F5'}}>
                  <div className="slbl" style={{width:140}}>{lbl}</div>
                  <div style={{flex:1,fontSize:11,fontFamily:'JetBrains Mono,monospace'}}>{amt}</div>
                  <span className={`b b${bcls}`}>{tag}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
