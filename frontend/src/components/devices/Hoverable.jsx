import { useFrame } from '@react-three/fiber'
import { useRef, useState } from 'react'

export default function Hoverable({ children, lift = 0.08, ...props }) {
  const ref = useRef()
  const [hovered, setHovered] = useState(false)

  useFrame((_, delta) => {
    if (!ref.current) return
    const target = hovered ? lift : 0
    ref.current.position.y += (target - ref.current.position.y) * Math.min(1, delta * 8)
    ref.current.rotation.y += ((hovered ? 0.35 : 0) - ref.current.rotation.y) * Math.min(1, delta * 6)
  })

  return (
    <group {...props}>
      <group
        ref={ref}
        onPointerOver={(e) => {
          e.stopPropagation()
          setHovered(true)
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={() => {
          setHovered(false)
          document.body.style.cursor = 'auto'
        }}
      >
        {children}
      </group>
    </group>
  )
}
