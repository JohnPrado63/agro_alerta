import { Construction } from 'lucide-react'

export default function ModulePlaceholder({ title }: { title: string }) {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
      <div className="mt-6 flex min-h-80 items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white">
        <div className="max-w-md px-6 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-mint text-leaf">
            <Construction className="h-6 w-6" />
          </div>
          <h2 className="mt-4 font-semibold text-gray-800">Módulo preparado</h2>
          <p className="mt-2 text-sm leading-6 text-gray-500">
            Esta sección está lista para implementar su interfaz y conectar fuentes oficiales de datos.
            No contiene información real ni resultados de modelos.
          </p>
        </div>
      </div>
    </div>
  )
}
