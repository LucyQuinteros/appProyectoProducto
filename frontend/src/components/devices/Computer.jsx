import { RoundedBox } from '@react-three/drei'

const KEY_ROWS = 4
const KEY_COLS = 12

export default function Computer({ detailed = false, screenColor = '#38bdf8', ...props }) {
  return (
    <group {...props}>
      {/* Monitor */}
      <group position={[0, 0.62, 0]}>
        <RoundedBox args={[1.2, 0.72, 0.05]} radius={0.02} smoothness={4}>
          <meshStandardMaterial color="#111827" metalness={0.4} roughness={0.4} />
        </RoundedBox>
        <mesh position={[0, 0.02, 0.027]}>
          <planeGeometry args={[1.1, 0.6]} />
          <meshStandardMaterial color={screenColor} emissive={screenColor} emissiveIntensity={0.6} />
        </mesh>
        {detailed && (
          <>
            <mesh position={[-0.3, 0.12, 0.028]}>
              <planeGeometry args={[0.4, 0.22]} />
              <meshStandardMaterial color="#0f172a" emissive="#1e293b" emissiveIntensity={0.4} />
            </mesh>
            <mesh position={[0.25, 0.12, 0.028]}>
              <planeGeometry args={[0.45, 0.05]} />
              <meshStandardMaterial color="#f8fafc" emissive="#f8fafc" emissiveIntensity={0.5} />
            </mesh>
            <mesh position={[0.25, 0.02, 0.028]}>
              <planeGeometry args={[0.45, 0.04]} />
              <meshStandardMaterial color="#a78bfa" emissive="#a78bfa" emissiveIntensity={0.6} />
            </mesh>
            <mesh position={[0, -0.16, 0.028]}>
              <planeGeometry args={[1.0, 0.12]} />
              <meshStandardMaterial color="#0f172a" emissive="#0ea5e9" emissiveIntensity={0.25} />
            </mesh>
          </>
        )}
      </group>
      {/* Soporte */}
      <mesh position={[0, 0.17, -0.02]}>
        <boxGeometry args={[0.08, 0.3, 0.05]} />
        <meshStandardMaterial color="#9ca3af" metalness={0.8} roughness={0.25} />
      </mesh>
      <RoundedBox args={[0.42, 0.03, 0.26]} radius={0.012} position={[0, 0.015, -0.02]}>
        <meshStandardMaterial color="#9ca3af" metalness={0.8} roughness={0.25} />
      </RoundedBox>
      {/* Teclado */}
      <group position={[0, 0.015, 0.36]}>
        <RoundedBox args={[0.9, 0.03, 0.28]} radius={0.01}>
          <meshStandardMaterial color="#1f2937" />
        </RoundedBox>
        {detailed &&
          Array.from({ length: KEY_ROWS * KEY_COLS }, (_, i) => {
            const row = Math.floor(i / KEY_COLS)
            const col = i % KEY_COLS
            return (
              <mesh key={i} position={[-0.385 + col * 0.07, 0.022, -0.09 + row * 0.06]}>
                <boxGeometry args={[0.055, 0.015, 0.045]} />
                <meshStandardMaterial color="#e5e7eb" />
              </mesh>
            )
          })}
      </group>
      {/* Torre */}
      <group position={[0.95, 0.35, -0.05]}>
        <RoundedBox args={[0.3, 0.7, 0.6]} radius={0.02}>
          <meshStandardMaterial color="#111827" metalness={0.3} roughness={0.5} />
        </RoundedBox>
        <mesh position={[-0.151, 0.05, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <planeGeometry args={[0.5, 0.55]} />
          <meshStandardMaterial color="#312e81" emissive="#6366f1" emissiveIntensity={0.35} transparent opacity={0.85} />
        </mesh>
        <mesh position={[0, 0.25, 0.301]}>
          <circleGeometry args={[0.02, 24]} />
          <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={2} />
        </mesh>
      </group>
    </group>
  )
}
