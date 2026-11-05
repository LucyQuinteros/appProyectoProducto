import { ContactShadows, OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import Computer from '../devices/Computer'
import Mouse from '../devices/Mouse'

export default function ComputerViewer({ autoRotate = false, className = '' }) {
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-b from-slate-800 to-slate-950 ${className}`}>
      <Canvas camera={{ position: [1.8, 1.4, 2.6], fov: 45 }} dpr={[1, 2]} shadows>
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[3, 5, 4]} intensity={1.4} castShadow />
          <pointLight position={[-3, 2, -2]} intensity={8} color="#818cf8" />
          <group position={[-0.35, -0.4, 0]}>
            <Computer detailed />
            <Mouse position={[0.65, 0.0, 0.38]} scale={1.2} />
          </group>
          <ContactShadows position={[0, -0.401, 0]} opacity={0.6} scale={6} blur={2} far={2} />
          <OrbitControls
            makeDefault
            enableZoom
            enablePan={false}
            minDistance={1.2}
            maxDistance={7}
            autoRotate={autoRotate}
            autoRotateSpeed={1.5}
            target={[0, 0, 0]}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}
