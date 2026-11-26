import { CloudRain, Droplets, Thermometer, TriangleAlert } from 'lucide-react'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const weatherData = [
  { day: 'Lun', temperatura: 15, lluvia: 8 },
  { day: 'Mar', temperatura: 16, lluvia: 12 },
  { day: 'Mié', temperatura: 14, lluvia: 18 },
  { day: 'Jue', temperatura: 13, lluvia: 10 },
  { day: 'Vie', temperatura: 17, lluvia: 6 },
  { day: 'Sáb', temperatura: 18, lluvia: 4 },
  { day: 'Dom', temperatura: 16, lluvia: 9 },
]

const kpis = [
  { label: 'Temperatura', value: '16.4 °C', detail: 'Dato demostrativo', icon: Thermometer, color: 'text-orange-600 bg-orange-50' },
  { label: 'Precipitación', value: '9.6 mm', detail: 'Dato demostrativo', icon: CloudRain, bg: 'text-blue-600 bg-blue-50' },
  { label: 'Humedad relativa', value: '68 %', detail: 'Dato demostrativo', icon: Droplets, color: 'text-cyan-700 bg-cyan-50' },
  { label: 'Alertas activas', value: '03', detail: 'Datos simulados', icon: TriangleAlert, color: 'text-amber-700 bg-amber-50' },
]

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-leaf">Panel general</p>
          <h1 className="mt-1 text-2xl font-bold text-gray-900">Resumen agroclimático</h1>
        </div>
        <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-800">
          DATOS DEMO / SIMULADOS
        </span>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map(({ label, value, detail, icon: Icon, color, bg }) => (
          <article key={label} className="rounded-xl border border-gray-200/80 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{label}</p>
                <p className="mt-2 text-2xl font-bold text-gray-900">{value}</p>
              </div>
              <div className={`rounded-lg p-2.5 ${color ?? bg ?? ''}`}>
                <Icon className="h-5 w-5" />
              </div>
            </div>
            <p className="mt-3 text-xs text-gray-400">{detail}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-5 xl:grid-cols-[2fr_1fr]">
        <article className="rounded-xl border border-gray-200/80 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-gray-900">Tendencia climática semanal</h2>
              <p className="mt-1 text-xs text-gray-400">Serie demostrativa — no representa observaciones reales</p>
            </div>
            <select className="rounded-lg border border-gray-200 px-3 py-2 text-xs text-gray-600" aria-label="Período">
              <option>Últimos 7 días</option>
            </select>
          </div>
          <div className="mt-5 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weatherData}>
                <defs>
                  <linearGradient id="temperature" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2F7D4C" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#2F7D4C" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#edf0eb" vertical={false} />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#8a948d' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#8a948d' }} />
                <Tooltip />
                <Area type="monotone" dataKey="temperatura" name="Temperatura DEMO (°C)" stroke="#2F7D4C" strokeWidth={2.5} fill="url(#temperature)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </article>

        <article className="rounded-xl border border-gray-200/80 bg-white p-5 shadow-sm">
          <h2 className="font-semibold text-gray-900">Actividad reciente</h2>
          <p className="mt-1 text-xs text-gray-400">Eventos locales del sistema</p>
          <div className="mt-5 space-y-4">
            {[
              ['Infraestructura preparada', 'Backend disponible', 'Ahora'],
              ['Conexión configurada', 'Cliente API inicializado', 'Hace 5 min'],
              ['Entorno iniciado', 'Dashboard demostrativo creado', 'Hoy'],
            ].map(([title, detail, time]) => (
              <div key={title} className="flex gap-3">
                <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-leaf" />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-800">{title}</p>
                  <p className="mt-0.5 text-xs text-gray-400">{detail}</p>
                </div>
                <span className="ml-auto whitespace-nowrap text-xs text-gray-400">{time}</span>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  )
}
