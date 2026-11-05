import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { Link } from 'react-router-dom'
import StoreScene from './StoreScene'

export default function StoreView() {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <Canvas shadows camera={{ position: [0, 3, 7.5], fov: 55 }} dpr={[1, 2]}>
        <Suspense fallback={null}>
          <StoreScene />
        </Suspense>
      </Canvas>

      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between p-6">
        <div className="rounded-2xl bg-slate-900/70 px-5 py-3 backdrop-blur">
          <h1 className="text-2xl font-black tracking-tight">
            Tech<span className="text-sky-400">Store</span> 3D
          </h1>
          <p className="text-sm text-slate-300">Arrastra para recorrer la tienda · Rueda para acercar</p>
        </div>
      </div>

      <div className="absolute bottom-6 right-6 flex flex-col items-end gap-3">
        <Link
          to="/computadora"
          className="rounded-full bg-slate-800/80 px-5 py-2 text-sm font-semibold text-slate-100 shadow-lg backdrop-blur transition hover:bg-slate-700"
        >
          Ver computadora 3D
        </Link>
        <Link
          to="/panel"
          className="flex items-center gap-2 rounded-full bg-sky-500 px-6 py-4 text-base font-bold text-white shadow-[0_0_30px_rgba(14,165,233,0.6)] transition hover:scale-105 hover:bg-sky-400"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-5 w-5" aria-hidden>
            <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
          </svg>
          Ir al Panel de Ventas
        </Link>
      </div>
    </div>
  )
}
