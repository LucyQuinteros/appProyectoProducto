import { useMemo } from 'react'
import { createLabelTexture } from './labelTexture'

const WOOD = '#3f2a1d'
const PANEL = '#1e293b'

export default function Shelf({ label, accent = '#38bdf8', width = 3, levels = 3, children, ...props }) {
  const height = levels * 0.9 + 0.2
  const depth = 0.7
  const labelTexture = useMemo(() => createLabelTexture(label, accent), [label, accent])

  return (
    <group {...props}>
      {/* Panel trasero */}
      <mesh position={[0, height / 2, -depth / 2]} receiveShadow>
        <boxGeometry args={[width, height, 0.05]} />
        <meshStandardMaterial color={PANEL} />
      </mesh>
      {/* Laterales */}
      {[-1, 1].map((side) => (
        <mesh key={side} position={[(side * width) / 2, height / 2, 0]} castShadow>
          <boxGeometry args={[0.06, height, depth]} />
          <meshStandardMaterial color={WOOD} />
        </mesh>
      ))}
      {/* Repisas */}
      {Array.from({ length: levels + 1 }, (_, i) => (
        <mesh key={i} position={[0, 0.05 + i * 0.9, 0]} castShadow receiveShadow>
          <boxGeometry args={[width, 0.05, depth]} />
          <meshStandardMaterial color={WOOD} />
        </mesh>
      ))}
      {/* Tira LED */}
      <mesh position={[0, height + 0.03, depth / 2 - 0.02]}>
        <boxGeometry args={[width, 0.04, 0.04]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={2} />
      </mesh>
      {/* Letrero */}
      <mesh position={[0, height + 0.35, 0]}>
        <planeGeometry args={[1.4, 0.35]} />
        <meshBasicMaterial map={labelTexture} transparent toneMapped={false} />
      </mesh>
      {children}
    </group>
  )
}
