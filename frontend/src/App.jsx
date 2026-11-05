import { lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Dashboard from './components/dashboard/Dashboard'

const StoreView = lazy(() => import('./components/store/StoreView'))
const ComputerViewerPage = lazy(() => import('./components/computer/ComputerViewerPage'))

function Loader() {
  return (
    <div className="flex h-full items-center justify-center text-slate-400">Cargando escena 3D…</div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<StoreView />} />
          <Route path="/panel" element={<Dashboard />} />
          <Route path="/computadora" element={<ComputerViewerPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
