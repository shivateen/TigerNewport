import React from 'react'
import { useApp } from '../context/AppContext.jsx'

const PERSONA_SUBS = {
  all: '1,000 inquiries this cycle · Phase 3 active · 3 interventions required today',
  fin: 'Revenue Fog · RCM Claims · VOB · Days in A/R · $1.6M exposure requiring action today',
  ops: 'Active census 142 · 8 discharges Friday · Week 3 staffing surge · 38 concurrent reviews',
  mkt: '1,000 inquiries · 60% clearance · Spend 40% over capacity headroom this week'
}
const PERSONA_TITLES = { all:'Command Center — All Personas', fin:'Command Center — Finance View', ops:'Command Center — Operations View', mkt:'Command Center — Growth & Marketing View' }

const PHASE_MAP = { fin:[1,3,4,5], ops:[2,3,4], mkt:[0,1,5] }
const PHASES = ['Prospect Engagement','Pre-Admission','Admission / Intake','Active Treatment','Discharge & Billing','Post-Discharge']
const PHASE_SYSTEMS = ['Salesforce CRM','Salesforce CRM','Lightning Step EHR','Lightning Step EHR','PowerBI + RCM','Salesforce + BI']
const PHASE_KPI = [['1,000 inquiries','$220 avg CPL','Digital + field + alumni'],['600 clinically cleared','462 financially cleared','VOB · Auth · Financial clearance'],['142 admitted (active)','⚠ Paper consents (JCAHO)','⚠ Manual re-key P1'],['142 active · 32 day avg LOS','38 concurrent review cycles','⚠ No bidirectional sync P2'],['28 discharges this month','⚠ Manual RCM code mapping','Cash arrives 7–14 days'],['$780K unpaid claims','14% readmission risk','Alumni network']]
const PHASE_BG = ['bg-ph1','bg-ph2','bg-ph3','bg-ph4','bg-ph5','bg-ph6']
const PHASE_C  = ['c-ph1','c-ph2','c-ph3','c-ph4','c-ph5','c-ph6']

export default function Overview() {
  const { activePersona, setActivePersona, setActivePage } = useApp()

  const isKpiRelevant = (p) => activePersona === 'all' || p === activePersona
  const isPhaseRelevant = (i) => activePersona === 'all' || (PHASE_MAP[activePersona] || []).includes(i)

  const personaBannerMsg = {
    fin: '💰  Showing Finance view — Revenue, Claims & VOB metrics highlighted',
    ops: '🛏️  Showing Operations view — Beds, Staffing & UR highlighted',
    mkt: '📊  Showing Growth view — Inquiry funnel & Capacity-linked spend highlighted',
  }

  return (
    <div className="page">
      {/* PERSONA BAR */}
      <div className="pbar">
        <div className="pbar-l">
          <div className="pbar-tag">Newport Healthcare · Platform Overview</div>
          <div className="pbar-title">{PERSONA_TITLES[activePersona] || PERSONA_TITLES.all}</div>
          <div className="pbar-sub" style={{color:'#666'}}>{PERSONA_SUBS[activePersona]}</div>
        </div>
        <div className="ptabs">
          {[['all','All Roles','on'],['fin','Finance','on'],['ops','Operations','on-c'],['mkt','Growth','on-g']].map(([r,lbl,cls]) => (
            <div key={r} className={`ptab ${activePersona===r ? cls : ''}`} onClick={() => setActivePersona(r)}>{lbl}</div>
          ))}
        </div>
      </div>

      {/* PERSONA BANNER */}
      {activePersona !== 'all' && (
        <div className={`persona-banner vis ${activePersona === 'fin' ? 'fin-b' : activePersona === 'ops' ? 'ops-b' : 'mkt-b'}`}>
          {personaBannerMsg[activePersona]}
          <span onClick={() => setActivePersona('all')} style={{marginLeft:'auto',cursor:'pointer',fontSize:10,opacity:.7,textDecoration:'underline'}}>Clear filter</span>
        </div>
      )}

      {/* KPI STRIP */}
      <div className="kg kg5">
        {[
          { v:'1,000', l:'Total Inquiries (Cycle)', d:'Manual re-key begins at Phase 3 →', dc:'dw', tag:'⚠ Pain P1', p:'mkt', top:'' },
          { v:'600',   l:'Cleared for Admission',   d:'60% inquiry-to-clearance rate',    dc:'dg', top:'ct', p:'mkt' },
          { v:'142',   l:'Active Census (All Programs)', d:'↑ 87% occupancy · 163 capacity', dc:'dg', top:'cg', p:'ops' },
          { v:'$1.6M', l:'Revenue Fog Exposure (MTD)', d:'Unvalidated in manual FP&A workbooks', dc:'db', tag:'⚠ Pain P5', top:'cr', p:'fin' },
          { v:'38 dy', l:'Days in A/R', d:'↑ Target: 26 · 46% above goal', dc:'db', tag:'🤖 AI', tagType:'atag', top:'', p:'fin' },
        ].map((k, i) => (
          <div key={i} className={`kc ${k.top}`} style={{ transition:'opacity .25s, filter .25s', opacity: isKpiRelevant(k.p) ? 1 : 0.15, filter: isKpiRelevant(k.p) ? '' : 'grayscale(.5)' }}>
            {k.tag && <div className={`kpain ${k.tagType || 'ptag'}`}>{k.tag}</div>}
            <div className="kv vo">{k.v}</div>
            <div className="kl">{k.l}</div>
            <div className={`kd ${k.dc}`}>{k.d}</div>
          </div>
        ))}
      </div>

      {/* JOURNEY STRIP */}
      <div className="panel" style={{opacity: activePersona === 'all' ? 1 : 0.4, transition:'opacity .25s'}}>
        <div className="phead">
          <div><div className="ptitle"><span className="pic">🗺️</span> 6-Phase Patient Journey — Newport Program Architecture</div>
            <div className="psub">Salesforce CRM → Lightning Step EHR → PowerBI · System boundaries &amp; pain point flags</div></div>
          <div className="pacts"><span className="b bo">Phase 3 Active</span><span className="b bc">3 Systems</span></div>
        </div>
        <div className="jstrip">
          {PHASES.map((ph, i) => (
            <React.Fragment key={i}>
              <div className="jph" style={{ outline: isPhaseRelevant(i) && activePersona !== 'all' ? `2px solid ${activePersona==='fin'?'var(--orange)':activePersona==='ops'?'var(--cy)':'var(--gr)'}` : 'none', borderRadius:8, opacity: isPhaseRelevant(i) || activePersona==='all' ? 1 : 0.18, transition:'all .25s' }}>
                <div className={`jhead ${PHASE_BG[i]}`}><div className="jnum">PHASE {i+1}</div><div className={`jname ${PHASE_C[i]}`}>{ph}</div></div>
                <div className="jbody">
                  <div className="jsys">📍 {PHASE_SYSTEMS[i]}</div>
                  {PHASE_KPI[i].map((k, j) => <div key={j} className="jkl" style={k.startsWith('⚠') ? {fontSize:8.5,color:'var(--rd)',background:'var(--rb)',border:'1px solid var(--rd)',borderRadius:4,padding:'3px 6px',marginTop:3} : {}}>{k}</div>)}
                </div>
              </div>
              {i < PHASES.length - 1 && <div className="jcon" style={{opacity: activePersona==='all'?1:0.2}}>→</div>}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* PERSONA CARDS */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:12}}>
        {[
          { role:'fin', color:'var(--orange)', bg:'var(--obg)', title:'💰 Finance', sub:'Revenue · Claims · VOB', badge:'3 Alerts', badgeCls:'br', alerts:[['ar','⚠️','Revenue Fog — $1.6M unvalidated MTD','Manual FP&A workbooks · No daily NPR view'],['aa','📋','18 claims pending manual code fix','H0018/H0019 · Magellan + Optum templates']], page:'fin-rev' },
          { role:'ops', color:'var(--cy)', bg:'var(--cb)', title:'🛏️ Operations', sub:'Beds · Staffing · UR', badge:'2 Flags', badgeCls:'ba', alerts:[['aa','🛏️','RTC Wing — 8 discharging Friday','Predictive match: 5 waitlist pre-ranked'],['ac','👥','Wk 3 surge: 4 contingent FTEs needed','168 projected census · Plan now']], page:'ops-beds' },
          { role:'mkt', color:'var(--gr)', bg:'var(--gb)', title:'📊 Growth', sub:'Funnel · Spend · Alumni', badge:'↑ Funnel Strong', badgeCls:'bg', alerts:[['ag','📈','1,000 inquiries · 60% clinical clearance','Digital + field + 200 alumni referrals'],['aa','⚡','Spend exceeds capacity by ~40% (Wk 3)','Intake surge risk · Staff burnout P6']], page:'mkt-funnel' },
        ].map(card => (
          <div key={card.role} className="panel" style={{ cursor:'pointer', opacity: activePersona==='all'||activePersona===card.role ? 1 : 0.15, transition:'opacity .25s', filter: activePersona==='all'||activePersona===card.role ? '' : 'grayscale(.5)' }} onClick={() => setActivePage(card.page)}>
            <div className="phead" style={{background:card.bg, borderBottom:`2px solid ${card.color}`}}>
              <div><div className="ptitle" style={{color:card.color}}>{card.title}</div><div className="psub">{card.sub}</div></div>
              <span className={`b b${card.badgeCls}`}>{card.badge}</span>
            </div>
            {card.alerts.map(([dot,icon,title,meta], j) => (
              <div key={j} className="arow">
                <div className={`adot a${dot}`}>{icon}</div>
                <div><div className="atitl">{title}</div><div className="ameta">{meta}</div></div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* AI INSIGHT */}
      <div className="ai-box" style={{ opacity: activePersona==='all'?1:0.4, transition:'opacity .25s' }}>
        <div className="ai-ico">🤖</div>
        <div className="ai-txt"><strong>AI Orchestration Agent — Today's Priority Actions:</strong> (1) 18 RCM claims have code mapping gaps — Magellan and Optum Behavioral templates are auto-learnable; resolving today recovers ~$84K in A/R. (2) RTC Wing discharging 8 beds Friday — 5 waitlist patients pre-matched; approve to pre-schedule housekeeping 48hrs ahead. (3) Week 3 marketing spend is 40% above available intake capacity — recommend reducing Google/Meta CPCs by $14K to prevent intake surge.</div>
      </div>
    </div>
  )
}
