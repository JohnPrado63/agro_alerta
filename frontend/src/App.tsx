import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import ModulePlaceholder from './pages/ModulePlaceholder'
import AppLayout from './layouts/AppLayout'

const modules = [
  ['clima', 'Monitoreo climático'],
  ['mapa', 'Mapa agrícola'],
  ['alertas', 'Alertas agroclimáticas'],
  ['predictivo', 'Modelo predictivo'],
  ['prescriptivo', 'Modelo prescriptivo'],
  ['datasets', 'Gestión de datasets'],
  ['agricultura', 'Gestión agrícola'],
  ['reportes', 'Reportes'],
]

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {modules.map(([path, title]) => (
            <Route
              key={path}
              path={`/${path}`}
              element={<ModulePlaceholder title={title} />}
            />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
