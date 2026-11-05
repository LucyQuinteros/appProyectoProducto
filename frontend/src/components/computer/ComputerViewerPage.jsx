import { useState } from 'react'
import Navbar from '../layout/Navbar'
import ComputerViewer from './ComputerViewer'

export default function ComputerViewerPage() {
  const [autoRotate, setAutoRotate] = useState(true)

  return (
    <div className="flex min-h-full flex-col">
      <Navbar />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-4 p-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Visor 3D · Computadora interactiva</h2>
            <p className="text-sm text-slate-400">
              Clic izquierdo y arrastra para rotar · Rueda del mouse para hacer zoom
            </p>
          </div>
          <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-300">
            <input
              type="checkbox"
              className="h-4 w-4 accent-sky-500"
              checked={autoRotate}
              onChange={(e) => setAutoRotate(e.target.checked)}
            />
            Rotación automática
          </label>
        </div>
        <ComputerViewer autoRotate={autoRotate} className="h-[70vh] min-h-[420px] w-full" />
      </main>
    </div>
  )
}
