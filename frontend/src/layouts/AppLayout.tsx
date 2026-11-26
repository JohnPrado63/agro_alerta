import { useEffect, useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import {
  AlertTriangle, BarChart3, Bell, Database, LayoutDashboard,
  Map, Menu, Sprout, ThermometerSun, Wheat, X,
} from 'lucide-react'
import axios from 'axios'

const navigation = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/clima', label: 'Clima', icon: ThermometerSun },
  { to: '/mapa', label: 'Mapa agrícola', icon: Map },
  { to: '/alertas', label: 'Alertas', icon: AlertTriangle },
  { to: '/predictivo', label: 'Modelo predictivo', icon: BarChart3 },
  { to: '/prescriptivo', label: 'Recomendaciones', icon: Sprout },
  { to: '/datasets', label: 'Datasets', icon: Database },
  { to: '/agricultura', label: 'Agricultura', icon: Wheat },
  { to: '/reportes', label: 'Reportes', icon: BarChart3 },
]

export default function AppLayout() {
  const [open, setOpen] = useState(false)
  const [apiStatus, setApiStatus] = useState<'checking' | 'online' | 'offline'>('checking')

  useEffect(() => {
    axios.get('/api/v1/health')
      .then(() => setApiStatus('online'))
      .catch(() => setApiStatus('offline'))
  }, [])

  return (
    <div className="min-h-screen bg-cream">
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-forest text-white transition-transform lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex h-20 items-center gap-3 px-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
            <Sprout className="h-6 w-6 text-emerald-200" />
          </div>
          <div>
            <p className="text-lg font-bold tracking-tight">AGROALERTA</p>
            <p className="text-[11px] uppercase tracking-[0.18em] text-emerald-200">Ayacucho</p>
          </div>
          <button className="ml-auto lg:hidden" onClick={() => setOpen(false)} aria-label="Cerrar menú">
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="space-y-1 px-3 py-4">
          {navigation.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${isActive ? 'bg-white text-forest shadow-sm' : 'text-emerald-50/80 hover:bg-white/10 hover:text-white'}`
              }
            >
              <Icon className="h-[18px] w-[18px]" />
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {open && <button className="fixed inset-0 z-30 bg-black/30 lg:hidden" onClick={() => setOpen(false)} aria-label="Cerrar menú" />}

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex h-20 items-center border-b border-gray-200/80 bg-white/95 px-5 backdrop-blur lg:px-8">
          <button className="mr-3 rounded-lg p-2 hover:bg-gray-100 lg:hidden" onClick={() => setOpen(true)} aria-label="Abrir menú">
            <Menu className="h-5 w-5" />
          </button>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-gray-400">Centro de operaciones</p>
            <p className="text-sm font-semibold text-gray-800">Sistema agroclimático regional</p>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-full border border-gray-200 px-3 py-1.5 text-xs text-gray-600 sm:flex">
              <span className={`h-2 w-2 rounded-full ${apiStatus === 'online' ? 'bg-emerald-500' : apiStatus === 'offline' ? 'bg-red-500' : 'bg-amber-400'}`} />
              API {apiStatus === 'online' ? 'conectada' : apiStatus === 'offline' ? 'desconectada' : 'verificando'}
            </div>
            <button className="relative rounded-lg border border-gray-200 p-2 text-gray-600" aria-label="Notificaciones">
              <Bell className="h-[18px] w-[18px]" />
              <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-amber-500" />
            </button>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-mint text-xs font-bold text-forest">AA</div>
          </div>
        </header>
        <main className="p-5 lg:p-8"><Outlet /></main>
      </div>
    </div>
  )
}
