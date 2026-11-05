import { RoundedBox } from '@react-three/drei'

export default function Tablet({ color = '#d1d5db', screenColor = '#34d399', ...props }) {
  return (
    <group {...props}>
      <RoundedBox args={[0.5, 0.68, 0.03]} radius={0.035} smoothness={4}>
        <meshStandardMaterial color={color} metalness={0.7} roughness={0.25} />
      </RoundedBox>
      <mesh position={[0, 0, 0.0155]}>
        <planeGeometry args={[0.44, 0.6]} />
        <meshStandardMaterial color={screenColor} emissive={screenColor} emissiveIntensity={0.45} />
      </mesh>
    </group>
  )
}
