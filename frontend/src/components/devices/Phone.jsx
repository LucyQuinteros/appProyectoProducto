import { RoundedBox } from '@react-three/drei'

export default function Phone({ color = '#0f172a', screenColor = '#f472b6', ...props }) {
  return (
    <group {...props}>
      <RoundedBox args={[0.22, 0.44, 0.025]} radius={0.03} smoothness={4}>
        <meshStandardMaterial color={color} metalness={0.6} roughness={0.3} />
      </RoundedBox>
      <mesh position={[0, 0, 0.0131]}>
        <planeGeometry args={[0.19, 0.4]} />
        <meshStandardMaterial color={screenColor} emissive={screenColor} emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0, 0.18, 0.0135]}>
        <planeGeometry args={[0.06, 0.015]} />
        <meshStandardMaterial color="#020617" />
      </mesh>
    </group>
  )
}
