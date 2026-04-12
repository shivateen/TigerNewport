import React, { useState } from 'react'
import { useApp } from '../context/AppContext.jsx'

function ModalShell({ id, title, sub, icon, wide, onClose, footer, children }) {
  return (
    <div className="modal-overlay open" onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div className={`modal ${wide ? 'modal-wide' : ''}`}>
        <div className="m-head">
          <div className="m-head-l">
            <div className="m-icon">{icon || '📋'}</div>
            <div>
              <div className="m-title">{title}</div>
              {sub && <div className="m-sub">{sub}</div>}
            </div>
          </div>
          <button className="m-close" onClick={onClose}>✕</button>
        </div>
        <div className="m-body">{children}</div>
        {footer && <div className="m-footer">{footer}</div>}
      </div>
    </div>
  )
}

function FieldGrid({ items }) {
  return (
    <div className="fg">
      {items.map(([lbl, val, cls]) => (
        <div key={lbl} className="fi">
          <div className="fi-lbl">{lbl}</div>
          <div className={`fi-val ${cls || ''}`}>{val}</div>
        </div>
      ))}
    </div>
  )
}

function DiffBlock({ before, after }) {
  return (
    <div className="diff-block">
      <div className="diff-before">
        <div className="diff-lbl">❌ Current — Will Be Denied</div>
        <div className="diff-code" dangerouslySetInnerHTML={{ __html: before }} />
      </div>
      <div className="diff-after">
        <div className="diff-lbl">✓ AI Fix — Payer Accepted</div>
        <div className="diff-code" dangerouslySetInnerHTML={{ __html: after }} />
      </div>
    </div>
  )
}

function Steps({ items }) {
  return (
    <div className="sl-list">
      {items.map(([num, text, cls], i) => (
        <div key={i} className="sl-item">
          <div className={`sl-num ${cls || ''}`}>{num}</div>
          <div className="sl-body" dangerouslySetInnerHTML={{ __html: text }} />
        </div>
      ))}
    </div>
  )
}

function AiBox({ children }) {
  return (
    <div className="m-ai">
      <div className="m-ai-ico">💡</div>
      <div className="m-ai-txt">{children}</div>
    </div>
  )
}

function WarnBox({ children }) {
  return (
    <div className="m-warn">
      <div className="m-ai-ico">⚠️</div>
      <div className="m-warn-txt">{children}</div>
    </div>
  )
}

// ─── Individual modals ────────────────────────────────────────────────────────

function FixMagellan({ onClose, showToast }) {
  return (
    <ModalShell title="AI Code Fix — CLM-9821 · Magellan Health"
      sub="H0018 · RTC 45-day · #NHP-7821 · $51,800 · 14 days pending"
      icon="🤖" onClose={onClose}
      footer={<>
        <button className="mb mb-gh" onClick={onClose}>Cancel</button>
        <button className="mb mb-s" onClick={() => { onClose(); showToast('✓ CLM-9821 approved — resubmitting for $51,800', 'success') }}>✓ Approve &amp; Resubmit</button>
      </>}>
      <AiBox><strong>Root cause:</strong> Magellan's H0018 template requires Revenue Code <strong>1002</strong> (Room &amp; Board — Residential). Newport submitted Revenue Code <strong>116</strong> (Residential Care) which is not in Magellan's accepted code set.</AiBox>
      <div className="m-sect"><div className="m-sect-title">Proposed Code Fix</div>
        <DiffBlock
          before="Field 42 (Revenue Code): <span style='color:#D93025;font-weight:700'>116</span> — Residential Care<br>Field 44 (HCPCS): H0018<br>Field 47 (Total): $56,250"
          after="Field 42 (Revenue Code): <span style='color:#1A7A4A;font-weight:700'>1002</span> — Room &amp; Board: Residential<br>Field 44 (HCPCS): H0018<br>Field 47 (Total): $56,250"
        />
      </div>
      <div className="m-sect"><div className="m-sect-title">Fix Steps</div>
        <Steps items={[['1','AI applies Revenue Code 1002 to UB-04 Field 42',''],['2','Updated 837 claim generated and queued',''],['3','<strong>Your sign-off required</strong> — claim will not submit until you approve',''],['4','Magellan receives corrected claim · Cash ~$51,800 in 5–7 business days','done']]} />
      </div>
      <FieldGrid items={[['Recovery Value','$51,800','vg'],['Expected Cash Date','~Oct 21, 2024',''],['AI Confidence','97%','vg'],['Rule Source','Magellan 2024 BH Manual §4.2','vc']]} />
    </ModalShell>
  )
}

function FixUnitedHealth({ onClose, showToast }) {
  return (
    <ModalShell title="AI Code Fix — CLM-9740 · UnitedHealth"
      sub="H0019 · Extended Care 14-day · #NHP-7598 · $12,900 · 9 days pending"
      icon="🤖" onClose={onClose}
      footer={<>
        <button className="mb mb-gh" onClick={onClose}>Cancel</button>
        <button className="mb mb-s" onClick={() => { onClose(); showToast('✓ CLM-9740 approved — resubmitting for $12,900', 'success') }}>✓ Approve &amp; Resubmit</button>
      </>}>
      <AiBox><strong>Root cause:</strong> UnitedHealth requires prior auth number in <strong>UB-04 Field 63</strong>. Newport's claim submitted without this field. Auth <strong>UHC-AUTH-2024-448821</strong> was confirmed in Lightning Step on Day 1 but not mapped to Field 63 during claim generation.</AiBox>
      <div className="m-sect"><div className="m-sect-title">Proposed Fix</div>
        <DiffBlock
          before="Field 63 (Treatment Auth Code): <span style='color:#D93025;font-weight:700'>[BLANK]</span><br>Auth on file in EHR: UHC-AUTH-2024-448821"
          after="Field 63 (Treatment Auth Code): <span style='color:#1A7A4A;font-weight:700'>UHC-AUTH-2024-448821</span><br>Pulled from Lightning Step · Confirmed Day 1"
        />
      </div>
      <WarnBox><strong>Systemic flag:</strong> Second UnitedHealth claim this month missing Field 63. AI has flagged a Lightning Step → billing export gap for H0019 claims. Recommend reviewing export template.</WarnBox>
      <FieldGrid items={[['Recovery Value','$12,900','vg'],['AI Confidence','99%','vg'],['UH Portal Response','3–5 business days','vc'],['Auth Source','Lightning Step EHR','']]} />
    </ModalShell>
  )
}

function ReviewOptum({ onClose, showToast }) {
  return (
    <ModalShell title="Human Review — CLM-9695 · Optum Behavioral"
      sub="H0018 HQ · RTC · #NHP-7821 · $37,500 · 5 days pending"
      icon="👁️" onClose={onClose}
      footer={<>
        <button className="mb mb-gh" onClick={onClose}>Close</button>
        <button className="mb mb-gh" onClick={() => { onClose(); showToast('📋 Sent to senior coder queue', 'cyan') }}>Escalate to Senior Coder</button>
        <button className="mb mb-p" onClick={() => { onClose(); showToast('✓ CLM-9695 — AI recommendation applied', 'success') }}>Apply AI Recommendation</button>
      </>}>
      <WarnBox><strong>Why human review is needed:</strong> Modifier HQ (Group Setting) required by Optum Behavioral. However #NHP-7821 had mixed individual and group sessions. AI cannot determine whether HQ applies to all days or only group-session days — clinical coding judgment required.</WarnBox>
      <div className="m-sect"><div className="m-sect-title">Session Log — from Lightning Step</div>
        <div style={{ background:'var(--lg)', borderRadius:7, padding:'10px 14px', fontSize:11, fontFamily:'JetBrains Mono,monospace', color:'var(--mg)', lineHeight:1.7 }}>
          Individual therapy sessions: <strong>28 days</strong><br/>
          Group therapy sessions: <strong>6 days</strong><br/>
          Family sessions: <strong>2 days</strong><br/>
          <span style={{ color:'var(--am)' }}>→ Optum policy: HQ applies if &gt;50% of days include group modality (6/36 = 17% — below threshold)</span>
        </div>
      </div>
      <AiBox><strong>AI recommendation:</strong> Group sessions = 17% of days — below 50% threshold. Suggest splitting claim: H0018 (no modifier) for 30 individual/family days + H0018 HQ for 6 group days. Estimated full recovery unchanged at $37,500.</AiBox>
    </ModalShell>
  )
}

function ReviewBCBS({ onClose, showToast }) {
  return (
    <ModalShell title="Human Review — CLM-9612 · BCBS Anthem"
      sub="S9480 · PHP 21-day · #NHP-7440 · $19,720 · 4 days pending"
      icon="👁️" onClose={onClose}
      footer={<>
        <button className="mb mb-gh" onClick={onClose}>Close</button>
        <button className="mb mb-gh" onClick={() => { onClose(); showToast('📋 Sent to clinical team for confirmation', 'cyan') }}>Request Clinical Confirmation</button>
        <button className="mb mb-p" onClick={() => { onClose(); showToast('✓ CLM-9612 — diagnosis fix applied', 'success') }}>Confirm &amp; Apply Fix</button>
      </>}>
      <AiBox><strong>Issue:</strong> BCBS Anthem requires primary ICD-10 <strong>F-code</strong> on all S9480 PHP claims. Newport submitted J45.9 (Asthma) as primary and F41.1 (GAD) as secondary. BCBS will deny as non-BH primary diagnosis.</AiBox>
      <div className="m-sect"><div className="m-sect-title">Diagnosis Reordering</div>
        <DiffBlock
          before="Dx 1 (Primary): <span style='color:#D93025;font-weight:700'>J45.9</span> — Unspecified Asthma<br>Dx 2: F41.1 — Generalized Anxiety Disorder<br>Dx 3: F32.1 — Major Depressive Disorder"
          after="Dx 1 (Primary): <span style='color:#1A7A4A;font-weight:700'>F41.1</span> — Generalized Anxiety Disorder<br>Dx 2: F32.1 — Major Depressive Disorder<br>Dx 3: J45.9 — Unspecified Asthma"
        />
      </div>
      <WarnBox><strong>Clinical verification needed:</strong> Confirm with treating clinician that F41.1 is medically appropriate as primary diagnosis before reordering. Sequence must reflect actual reason for admission.</WarnBox>
    </ModalShell>
  )
}

function RemediateAll({ onClose, showToast }) {
  const [running, setRunning] = useState(false)
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState('')
  const statuses = ['Processing Magellan Health (4 claims)...','Processing UnitedHealth (3 claims)...','Processing Aetna (3 claims)...','Processing BCBS Anthem (6 claims)...','✓ 16 claims auto-fixed · 2 queued for human review']

  const run = () => {
    setRunning(true)
    let i = 0
    const iv = setInterval(() => {
      setStatus(statuses[i])
      setProgress(((i + 1) / statuses.length) * 100)
      i++
      if (i >= statuses.length) {
        clearInterval(iv)
        setTimeout(() => { onClose(); showToast('🤖 16 claims auto-remediated — $84,100 recovery queued', 'success') }, 700)
      }
    }, 700)
  }

  return (
    <ModalShell title="Auto-Remediate All — 18 Claims"
      sub="AI will process 16 auto-fixable claims · 2 require human review"
      icon="🤖" onClose={onClose}
      footer={!running && <>
        <button className="mb mb-gh" onClick={onClose}>Cancel</button>
        <button className="mb mb-s" onClick={run}>🤖 Run Auto-Remediation</button>
      </>}>
      <FieldGrid items={[['Auto-Fixable','16 claims','vg'],['Human Review','2 claims','vo'],['Total Recovery','$84,100','vg'],['Estimated Time','~4 minutes','vc']]} />
      <div className="m-sect"><div className="m-sect-title">Fix Plan by Payer</div>
        <Steps items={[['✓','<strong>Magellan Health (4)</strong> — Revenue Code 116→1002 · Auto-fixable','done'],['✓','<strong>UnitedHealth (3)</strong> — Field 63 auth population · Auto-fixable','done'],['✓','<strong>Aetna (3)</strong> — Modifier sequence correction · Auto-fixable','done'],['!','<strong>Optum Behavioral (2)</strong> — HQ modifier clinical determination needed','info'],['✓','<strong>BCBS Anthem (6)</strong> — 4 F-code reorder auto + 2 need clinical confirm','done']]} />
      </div>
      {running && (
        <div>
          <div className="m-sect-title" style={{ marginBottom: 6 }}>Processing...</div>
          <div className="m-prog"><div className="m-prog-fill" style={{ width: `${progress}%`, transition: 'width .6s ease' }} /></div>
          <div style={{ fontSize: 11, color: 'var(--sl)', fontFamily: 'JetBrains Mono,monospace', marginTop: 4 }}>{status}</div>
        </div>
      )}
    </ModalShell>
  )
}

function ConfirmAdmission({ wlId, onClose, showToast }) {
  const data = {
    '5241': { title: 'Confirm Admission — WL-5241', sub: 'RTC 30-day · Room R-114 · BCBS Anthem · Match 97%', fields: [['Patient','WL-5241 · F / Age 16',''],['Room','RTC Floor 1 · R-114','vc'],['Admission Date','Friday, Oct 11','vo'],['Projected Discharge','Nov 10 (30-day protocol)',''],['Payer','BCBS Anthem',''],['Expected Revenue','$37,500','vg'],['VOB Status','✓ Verified','vg'],['Auth Status','Pending — initiating now','vo']], ai: 'RTC Floor 1 serves females 12–17. WL-5241 (F/16) is exact cohort match. BCBS Anthem is Newport\'s highest-margin RTC payer at ~$1,250/day.', warn: null },
    '5238': { title: 'Confirm Admission — WL-5238', sub: 'RTC 45-day · Room R-211 · Magellan Health · Match 93%', fields: [['Patient','WL-5238 · M / Age 20',''],['Room','RTC Floor 2 · R-211','vc'],['Admission Date','Friday, Oct 11','vo'],['Expected Revenue','$56,250','vg'],['Payer','Magellan Health',''],['Auth Number','MAG-2024-557312','vc']], ai: null, warn: 'Magellan billing note: Use Revenue Code 1002 (not 116) — same fix from CLM-9821. Billing template has been updated.' },
  }
  const d = data[wlId] || data['5241']
  return (
    <ModalShell title={d.title} sub={d.sub} icon="🛏️" onClose={onClose}
      footer={<>
        <button className="mb mb-gh" onClick={onClose}>Cancel</button>
        <button className="mb mb-s" onClick={() => { onClose(); showToast(`✓ WL-${wlId} confirmed — housekeeping + auth initiated`, 'success') }}>✓ Confirm Admission</button>
      </>}>
      <FieldGrid items={d.fields} />
      {d.warn && <WarnBox>{d.warn}</WarnBox>}
      {d.ai && <div className="m-ai"><div className="m-ai-ico">🤖</div><div className="m-ai-txt"><strong>Why this match:</strong> {d.ai}</div></div>}
      <div className="m-sect"><div className="m-sect-title">Actions Triggered on Confirmation</div>
        <Steps items={[['1','Housekeeping notified — room prep scheduled Thursday 3PM',''],['2','Payer authorization request initiated automatically',''],['3','Salesforce → Lightning Step data transfer queued — no manual re-entry',''],['4','Projected discharge date auto-set per program protocol',''],['5','Concurrent review schedule built','']]} />
      </div>
    </ModalShell>
  )
}

function ReviewMatch({ wlId, onClose, showToast }) {
  const data = {
    '5230': { title: 'Match Review — WL-5230', sub: 'PHP 21-day · PHP Wing P-08 · Aetna · F/17 · Match 89%', type: 'warn', msg: 'Aetna requires pre-authorisation for PHP admissions for patients under 18. Auth request has been initiated but not yet confirmed. Recommend holding until auth received — expected within 24–48 hours.', fields: [['Patient','WL-5230 · F / Age 17',''],['Payer','Aetna Commercial',''],['Auth Status','⏳ Pending — initiated today','vo'],['Expected Auth','Oct 10 (48 hrs)',''],['Match Score','89% — good fit','vg']] },
    '5219': { title: 'Match Review — WL-5219', sub: 'RTC 60-day · R-228 Floor 2 · UnitedHealth · M/22 · Match 85%', type: 'ai', msg: 'Score reduced because UnitedHealth RTC benefit requires medical necessity documentation from a psychiatrist. Newport\'s file has psychologist notes only. Recommend psychiatrist countersignature before admission to avoid mid-stay denial.', fields: [['Patient','WL-5219 · M / Age 22',''],['Payer','UnitedHealth',''],['Auth Status','✓ Confirmed UH-2024-661','vg'],['Action Needed','Psychiatrist countersign','vr'],['Match Score','85% — one doc gap','vc']] },
  }
  const d = data[wlId] || data['5230']
  return (
    <ModalShell title={d.title} sub={d.sub} icon="🔍" onClose={onClose}
      footer={<>
        <button className="mb mb-gh" onClick={onClose}>Close</button>
        <button className="mb mb-gh" onClick={() => { onClose(); showToast(`📋 WL-${wlId} held — pending review`, 'cyan') }}>Hold for Review</button>
        <button className="mb mb-p" onClick={() => { onClose(); showToast(`✓ WL-${wlId} match approved`, 'success') }}>Approve Match</button>
      </>}>
      {d.type === 'warn' ? <WarnBox>{d.msg}</WarnBox> : <AiBox><strong>Why this score:</strong> {d.msg}</AiBox>}
      <FieldGrid items={d.fields} />
    </ModalShell>
  )
}

function ApproveAll({ onClose, showToast }) {
  return (
    <ModalShell title="Approve All Friday Matches — 4 Admissions"
      sub="RTC Wing discharge cluster · Oct 11 admission date"
      icon="✅" onClose={onClose}
      footer={<>
        <button className="mb mb-gh" onClick={onClose}>Cancel</button>
        <button className="mb mb-s" onClick={() => { onClose(); showToast('✓ 4 admissions confirmed — housekeeping + auth + EHR transfer initiated', 'success') }}>✓ Confirm All 4</button>
      </>}>
      <FieldGrid items={[['Total Admissions','4 confirmed','vg'],['Total Revenue','$145,950','vg'],['Housekeeping','Thursday 3–5 PM','vc'],['Auth Requests','4 auto-initiated','vo']]} />
      <div className="m-sect"><div className="m-sect-title">Admissions Being Confirmed</div>
        <Steps items={[['✓','<strong>WL-5241</strong> → R-114 · RTC F1 · BCBS · F/16 · $37,500','done'],['✓','<strong>WL-5238</strong> → R-211 · RTC F2 · Magellan · M/20 · $56,250','done'],['✓','<strong>WL-5230</strong> → P-08 · PHP Wing · Aetna · F/17 · $28,560 <span style="color:var(--am)">(auth pending)</span>','done'],['✓','<strong>WL-5219</strong> → R-228 · RTC F2 · UnitedHealth · M/22 · $23,640 <span style="color:var(--am)">(psych countersign needed)</span>','done']]} />
      </div>
    </ModalShell>
  )
}

const UR_DATA = {
  '7540': { title: '#NHP-7540 · Magellan Health', sub: 'RTC 30-day · Day 42 · Every 7 days', urgency: 'OVERDUE', urgCls: 'vr', risk: '$8,750 at risk if not submitted today', riskCls: 'vr', cadence: 'Every 7 days (Magellan RTC)', notes: 'Patient in day 42 of RTC treatment. Clinical notes from Oct 8: strong therapeutic engagement, medication stabilised. GAF improved 38→52. Treatment team recommends continued stay for 14 additional days to consolidate gains before PHP transition.' },
  '7612': { title: '#NHP-7612 · Optum Behavioral', sub: 'PHP 21-day · Day 18 · Every 3 days', urgency: 'DUE IN 1 DAY', urgCls: 'vr', risk: '$2,040 at risk if missed', riskCls: 'vr', cadence: 'Every 3 days (Optum PHP)', notes: 'Patient at day 18 of PHP. Attending all group sessions, engaged in family therapy twice weekly. GAD-7 trending down: 14→9. Recommending continued PHP for 7 additional days then step-down to IOP.' },
  '7480': { title: '#NHP-7480 · BCBS Anthem', sub: 'RTC 28-day · Day 28 · Every 7 days', urgency: 'DUE IN 3 DAYS', urgCls: 'vo', risk: '$8,750 next window', riskCls: 'vo', cadence: 'Every 7 days (BCBS RTC)', notes: 'Patient at day 28. ADL independence 78%. Continued stay recommended for 2 additional weeks to complete family therapy module and solidify aftercare plan.' },
  '7821': { title: '#NHP-7821 · UnitedHealth', sub: 'RTC 45-day ext. · Day 35 · Every 7 days', urgency: 'DUE IN 4 DAYS', urgCls: 'vo', risk: '$8,750 next window', riskCls: 'vo', cadence: 'Every 7 days (UH RTC)', notes: 'Extended stay patient. Day 35 of approved 45-day stay. PHQ-9 improved 22→11. Safety plan in place. Extended stay justified by active suicidal ideation history requiring monitored transition.' },
  '7740': { title: '#NHP-7740 · Cigna Behavioral', sub: 'PHP 21-day · Day 12 · Every 3 days', urgency: 'DUE IN 8 DAYS', urgCls: 'vg', risk: 'On track', riskCls: 'vg', cadence: 'Every 3 days (Cigna PHP)', notes: 'Patient engaged and progressing. No immediate concerns. Routine documentation to be AI-prepared 48hrs before deadline.' },
  '7695': { title: '#NHP-7695 · Aetna', sub: 'RTC 30-day · Day 20 · Every 7 days', urgency: 'DUE IN 10 DAYS', urgCls: 'vg', risk: 'On track', riskCls: 'vg', cadence: 'Every 7 days (Aetna RTC)', notes: 'Patient in good standing. Treatment goals on track for projected Day 30 discharge. Documentation will be auto-prepared and queued for UR nurse review.' },
}

function URDetail({ patientId, onClose, showToast }) {
  const d = UR_DATA[patientId] || UR_DATA['7540']
  return (
    <ModalShell title={`Concurrent Review — ${d.title}`} sub={d.sub} icon="📁" wide onClose={onClose}
      footer={<>
        <button className="mb mb-gh" onClick={onClose}>Close</button>
        <button className="mb mb-gh" onClick={() => { onClose(); showToast('📄 Draft saved to UR queue', 'cyan') }}>Save Draft</button>
        <button className="mb mb-p" onClick={() => { onClose(); showToast('✓ Continued stay documentation submitted to payer', 'success') }}>Submit to Payer</button>
      </>}>
      <FieldGrid items={[['Review Status', d.urgency, d.urgCls], ['Payer Cadence', d.cadence, 'vc'], ['Financial Risk', d.risk, d.riskCls]]} />
      <div className="m-sect"><div className="m-sect-title">AI-Drafted Clinical Summary (from Lightning Step)</div>
        <div style={{ background:'var(--lg)', borderRadius:7, padding:'11px 14px', fontSize:11.5, color:'var(--mg)', lineHeight:1.65, borderLeft:'3px solid var(--cy)' }}>{d.notes}</div>
      </div>
      <div className="m-sect"><div className="m-sect-title">Payer Documentation Requirements</div>
        <Steps items={[['✓','Clinical progress summary (last 7 days) — <strong>AI drafted above</strong>','done'],['✓','Current diagnosis codes and treatment plan goals — <strong>pulled from EHR</strong>','done'],['!','UR nurse signature and attestation — <strong>your sign-off required before submission</strong>','info']]} />
      </div>
    </ModalShell>
  )
}

function AutoPrep({ onClose, showToast }) {
  return (
    <ModalShell title="Auto-Prep All Concurrent Review Documentation"
      sub="38 active review cycles · AI drafts from Lightning Step clinical notes"
      icon="🤖" onClose={onClose}
      footer={<>
        <button className="mb mb-gh" onClick={onClose}>Cancel</button>
        <button className="mb mb-p" onClick={() => { onClose(); showToast('🤖 Drafts queued for 38 review cycles — check UR queue in 5 min', 'cyan') }}>🤖 Generate All Drafts</button>
      </>}>
      <FieldGrid items={[['Due Today / Tomorrow','2 urgent','vr'],['Due in 3–5 Days','4 upcoming','vo'],['AI Draft Confidence','94% avg','vg'],['UR Time Saved','~6 hours','vc']]} />
      <div className="m-sect"><div className="m-sect-title">What AI Prepares</div>
        <Steps items={[['✓','<strong>Clinical progress summary</strong> — last 7 days in payer-required format','done'],['✓','<strong>Functional status update</strong> — ADL scores, safety assessment from EHR','done'],['✓','<strong>Treatment plan goals</strong> — current goals, progress status, discharge timeline','done'],['!','<strong>UR nurse review required</strong> before submission — ~10 min per case vs 45 min manual','info']]} />
      </div>
      <div className="m-ai"><div className="m-ai-ico">💡</div><div className="m-ai-txt">Priority: #NHP-7540 (Magellan, due TODAY) → #NHP-7612 (Optum, due tomorrow) → remaining 4 by due date.</div></div>
    </ModalShell>
  )
}

function Throttle({ onClose, showToast }) {
  return (
    <ModalShell title="Capacity-Linked Spend — Auto-Throttle"
      sub="AI adjusts weekly digital budgets based on real-time bed availability"
      icon="🔗" onClose={onClose}
      footer={<>
        <button className="mb mb-gh" onClick={onClose}>Cancel</button>
        <button className="mb mb-p" onClick={() => { onClose(); showToast('✓ Capacity-linked spend activated — budgets auto-adjust each Monday', 'success') }}>Activate Auto-Throttle</button>
      </>}>
      <div className="m-ai"><div className="m-ai-ico">💡</div><div className="m-ai-txt"><strong>This week:</strong> Newport has 21 beds. Optimal lead volume = ~38 inquiries. Current budget of $13,000 generates ~59 inquiries — 56% over capacity. Recommended: <strong>$9,200</strong>, saving $3,800.</div></div>
      <div className="m-sect"><div className="m-sect-title">4-Week Budget Plan</div>
        <div style={{ display:'flex', flexDirection:'column', gap:5 }}>
          {[['Wk 1','21 beds','$13,000','$9,200','-$3,800','var(--rb)','var(--rd)'],['Wk 2','28 beds','$13,000','$11,400','-$1,600','var(--ab)','var(--am)'],['Wk 3 ⚠','8 beds (surge)','$13,000','$3,800','-$9,200','var(--rb)','var(--rd)'],['Wk 4','38 beds','$13,000','$14,600','+$1,600 ↑','var(--gb)','var(--gr)']].map(([wk, beds, cur, rec, diff, bg, tc]) => (
            <div key={wk} style={{ display:'flex', alignItems:'center', gap:10, padding:'8px 12px', background:`${bg}`, borderRadius:7 }}>
              <div style={{ fontSize:11, fontWeight:700, color:tc, width:72 }}>{wk}</div>
              <div style={{ flex:1, fontSize:11, color:'var(--mg)' }}>{beds} — <s style={{ color:'var(--sl)' }}>{cur}</s> → <strong style={{ color:tc }}>{rec}</strong></div>
              <div style={{ fontSize:9.5, fontFamily:'JetBrains Mono,monospace', color:tc }}>{diff}</div>
            </div>
          ))}
        </div>
      </div>
    </ModalShell>
  )
}

function AlumniOutreach({ onClose, showToast }) {
  const [notes, setNotes] = useState('')
  return (
    <ModalShell title="Outreach — ALM-6820 · HIGH Risk (76%)"
      sub="RTC 45-day · Age 17 · Discharged Sep 5 · 33 days post-discharge"
      icon="📞" onClose={onClose}
      footer={<>
        <button className="mb mb-gh" onClick={onClose}>Close</button>
        <button className="mb mb-gh" onClick={() => { onClose(); showToast('📋 Escalated to clinical supervisor', 'cyan') }}>Escalate to Clinical</button>
        <button className="mb mb-p" onClick={() => { onClose(); showToast('✓ Outreach logged — follow-up reminder set for 48 hrs', 'success') }}>Log Outreach &amp; Set Follow-up</button>
      </>}>
      <WarnBox><strong>High readmission risk (76%):</strong> Last clinical contact 7 days ago. Missed aftercare appointment Sep 28. 30-day outcome survey not completed. Coordinator notes: "patient seems withdrawn, not engaging with school."</WarnBox>
      <div className="m-sect"><div className="m-sect-title">Risk Factors</div>
        <Steps items={[['!','Missed outpatient aftercare Sep 28 — no reschedule on file','info'],['!','30-day outcome survey not completed (due Sep 26)','info'],['!','Coordinator notes Sep 29: withdrawn, not engaging with school','info'],['✓','Alumni app last opened Sep 30 — still engaged at low level','done']]} />
      </div>
      <div className="m-ai"><div className="m-ai-ico">💡</div><div className="m-ai-txt"><strong>Recommended approach:</strong> Primary therapist direct call within 24 hours. Focus on reconnecting to goals, not symptoms. Do not use app push notification as first contact at this risk level.</div></div>
      <textarea value={notes} onChange={e => setNotes(e.target.value)}
        style={{ width:'100%', border:'1.5px solid var(--bd)', borderRadius:7, padding:'9px 12px', fontSize:12, fontFamily:'Outfit,sans-serif', resize:'vertical', minHeight:60, outline:'none', color:'var(--bl)', marginTop:4 }}
        placeholder="Notes from outreach attempt..." />
    </ModalShell>
  )
}

function AlumniSchedule({ onClose, showToast }) {
  return (
    <ModalShell title="Schedule Check-in — ALM-6741"
      sub="PHP 21-day · Age 21 · Discharged Aug 22 · Medium risk 48%"
      icon="📅" onClose={onClose}
      footer={<>
        <button className="mb mb-gh" onClick={onClose}>Cancel</button>
        <button className="mb mb-p" onClick={() => { onClose(); showToast('📅 Check-in call scheduled — alumni notified via app', 'success') }}>Confirm &amp; Notify Alumni</button>
      </>}>
      <FieldGrid items={[['Days Post-Discharge','47 days','vo'],['60-Day Check-in Due','Oct 21 (11 days)','vr'],['Outpatient Status','IOP 2x/week — attending','vg'],['Last Contact','Sep 28 · Coordinator','']]} />
      <div className="m-sect"><div className="m-sect-title">Select Call Time</div>
        <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
          {['Tuesday Oct 15 · 10:00 AM','Wednesday Oct 16 · 2:00 PM','Thursday Oct 17 · 11:00 AM'].map(t => (
            <label key={t} style={{ display:'flex', alignItems:'center', gap:9, padding:'9px 12px', border:'1.5px solid var(--bd)', borderRadius:7, cursor:'pointer', fontSize:12, color:'var(--mg)' }}>
              <input type="radio" name="ct" style={{ accentColor:'var(--orange)' }} /> {t}
            </label>
          ))}
        </div>
      </div>
    </ModalShell>
  )
}

function AlumniReferral({ onClose, showToast }) {
  return (
    <ModalShell title="Referral Ask — ALM-6690"
      sub="RTC 60-day · Age 19 · Discharged Aug 10 · Low risk 16%"
      icon="🤝" onClose={onClose}
      footer={<>
        <button className="mb mb-gh" onClick={onClose}>Cancel</button>
        <button className="mb mb-s" onClick={() => { onClose(); showToast('✓ Referral outreach sent — tracked in Salesforce alumni campaign', 'success') }}>Send Referral Ask</button>
      </>}>
      <div className="m-ai"><div className="m-ai-ico">💡</div><div className="m-ai-txt"><strong>Why ideal for referral:</strong> 59 days post-discharge, low readmission risk (16%), strong alumni app engagement, all aftercare appointments completed, family satisfaction score 4.8/5. The 60-day milestone is Newport's highest-converting referral window.</div></div>
      <div className="m-sect"><div className="m-sect-title">Suggested Outreach Message</div>
        <div style={{ background:'var(--lg)', borderRadius:7, padding:'12px 14px', fontSize:12, color:'var(--mg)', lineHeight:1.6, borderLeft:'3px solid var(--gr)' }}>
          "Hi [Name], we're so glad to hear you're doing well. It's been 60 days since your time at Newport and you've made incredible progress. If you know anyone who might benefit from the same support you received, we'd love a warm introduction."
        </div>
      </div>
      <FieldGrid items={[['Alumni CPL','~$0 vs $220 digital','vg'],['Avg Referral Value','~$37,500','vg'],['Historical Conversion','62% → inquiry','vc'],['Channel','Personal call + app','']]} />
    </ModalShell>
  )
}

// ─── Main modal dispatcher ────────────────────────────────────────────────────
export default function ModalSystem() {
  const { openModal, closeModal, showToast } = useApp()
  if (!openModal) return null

  const props = { onClose: closeModal, showToast }

  switch (openModal.type) {
    case 'fix-9821':        return <FixMagellan {...props} />
    case 'fix-9740':        return <FixUnitedHealth {...props} />
    case 'rev-9695':        return <ReviewOptum {...props} />
    case 'rev-9612':        return <ReviewBCBS {...props} />
    case 'remediate-all':   return <RemediateAll {...props} />
    case 'conf-5241':       return <ConfirmAdmission {...props} wlId="5241" />
    case 'conf-5238':       return <ConfirmAdmission {...props} wlId="5238" />
    case 'rev-5230':        return <ReviewMatch {...props} wlId="5230" />
    case 'rev-5219':        return <ReviewMatch {...props} wlId="5219" />
    case 'approve-all':     return <ApproveAll {...props} />
    case 'ur-detail':       return <URDetail {...props} patientId={openModal.patientId} />
    case 'autoprep':        return <AutoPrep {...props} />
    case 'throttle':        return <Throttle {...props} />
    case 'out-6820':        return <AlumniOutreach {...props} />
    case 'sched-6741':      return <AlumniSchedule {...props} />
    case 'ref-6690':        return <AlumniReferral {...props} />
    default: return null
  }
}
