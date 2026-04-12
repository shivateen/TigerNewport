import React, { useEffect } from 'react'
import { useApp } from '../context/AppContext.jsx'
import Sidebar from './Sidebar.jsx'
import Topbar from './Topbar.jsx'
import Toast from './Toast.jsx'
import ModalSystem from './ModalSystem.jsx'

// Pages
import Overview from '../pages/Overview.jsx'
import JourneyMap from '../pages/JourneyMap.jsx'
import FinanceRevenue from '../pages/FinanceRevenue.jsx'
import FinanceRCM from '../pages/FinanceRCM.jsx'
import FinanceVOB from '../pages/FinanceVOB.jsx'
import FinanceCash from '../pages/FinanceCash.jsx'
import OpsBeds from '../pages/OpsBeds.jsx'
import OpsStaff from '../pages/OpsStaff.jsx'
import OpsUR from '../pages/OpsUR.jsx'
import MktFunnel from '../pages/MktFunnel.jsx'
import MktCapacity from '../pages/MktCapacity.jsx'
import MktAlumni from '../pages/MktAlumni.jsx'
import PainPoints from '../pages/PainPoints.jsx'

const PAGES = {
  overview:    Overview,
  journey:     JourneyMap,
  'fin-rev':   FinanceRevenue,
  'fin-rcm':   FinanceRCM,
  'fin-vob':   FinanceVOB,
  'fin-cash':  FinanceCash,
  'ops-beds':  OpsBeds,
  'ops-staff': OpsStaff,
  'ops-ur':    OpsUR,
  'mkt-funnel': MktFunnel,
  'mkt-cap':   MktCapacity,
  'mkt-alumni': MktAlumni,
  pain:        PainPoints,
}

export default function Platform({ user, onLogout }) {
  const { activePage, setActivePersona } = useApp()

  // Auto-set persona based on login role
  useEffect(() => {
    if (user.role !== 'all') setActivePersona(user.role)
  }, [user.role])

  const PageComponent = PAGES[activePage] || Overview

  return (
    <div className="shell">
      <Topbar user={user} onLogout={onLogout} />
      <Sidebar />
      <div className="content">
        <PageComponent />
      </div>
      <Toast />
      <ModalSystem />
    </div>
  )
}
