export default function Mouse({ color = '#e5e7eb', ...props }) {
  return (
    <group {...props}>
      <mesh scale={[0.6, 0.35, 1]} position={[0, 0.05, 0]}>
        <sphereGeometry args={[0.14, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color={color} roughness={0.35} />
      </mesh>
      <mesh position={[0, 0.098, -0.05]}>
        <cylinderGeometry args={[0.012, 0.012, 0.03, 16]} />
        <meshStandardMaterial color="#111827" />
      </mesh>
      <mesh position={[0, 0.05, -0.02]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.004, 0.12]} />
        <meshStandardMaterial color="#9ca3af" />
      </mesh>
    </group>
  )
}
