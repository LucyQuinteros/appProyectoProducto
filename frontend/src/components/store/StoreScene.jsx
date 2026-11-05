import { ContactShadows, OrbitControls } from '@react-three/drei'
import { useMemo } from 'react'
import Computer from '../devices/Computer'
import Hoverable from '../devices/Hoverable'
import Mouse from '../devices/Mouse'
import Phone from '../devices/Phone'
import Tablet from '../devices/Tablet'
import { createSignTexture } from './labelTexture'
import Shelf from './Shelf'

const ROOM = { width: 14, depth: 12, height: 5 }
const LEVELS = 3
const levelY = (level) => 0.075 + level * 0.9

const SCREEN_COLORS = ['#38bdf8', '#a78bfa', '#f472b6', '#34d399', '#fbbf24']
const MOUSE_COLORS = ['#e5e7eb', '#111827', '#ef4444', '#3b82f6', '#22c55e']
const PHONE_COLORS = ['#0f172a', '#e5e7eb', '#1d4ed8', '#be185d', '#065f46']

const range = (n) => Array.from({ length: n }, (_, i) => i)

function Room() {
  const { width, depth, height } = ROOM
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[width, depth]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.8} />
      </mesh>
      <gridHelper args={[width, 14, '#94a3b8', '#94a3b8']} position={[0, 0.002, 0]} />
      <mesh position={[0, height / 2, -depth / 2]} receiveShadow>
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial color="#1e1b4b" />
      </mesh>
      <mesh position={[-width / 2, height / 2, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[depth, height]} />
        <meshStandardMaterial color="#172554" />
      </mesh>
      <mesh position={[width / 2, height / 2, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[depth, height]} />
        <meshStandardMaterial color="#172554" />
      </mesh>
      <mesh position={[0, height, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[width, depth]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>
      {[-3, 0, 3].map((z) =>
        [-3.5, 3.5].map((x) => (
          <mesh key={`${x}-${z}`} position={[x, height - 0.01, z]} rotation={[Math.PI / 2, 0, 0]}>
            <planeGeometry args={[2.4, 0.4]} />
            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1.5} />
          </mesh>
        )),
      )}
    </group>
  )
}

function StoreSign() {
  const texture = useMemo(() => createSignTexture(), [])
  return (
    <mesh position={[0, 3.9, -ROOM.depth / 2 + 0.05]}>
      <planeGeometry args={[4.6, 1.15]} />
      <meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>
  )
}

function ComputersShelf(props) {
  return (
    <Shelf label="Computadoras" accent="#0ea5e9" width={3.4} levels={LEVELS} {...props}>
      {range(LEVELS).map((level) =>
        [-0.85, 0.75].map((x, i) => (
          <Hoverable key={`${level}-${i}`} position={[x, levelY(level), 0]}>
            <Computer scale={0.42} screenColor={SCREEN_COLORS[(level * 2 + i) % SCREEN_COLORS.length]} />
          </Hoverable>
        )),
      )}
    </Shelf>
  )
}

function PhonesShelf(props) {
  return (
    <Shelf label="Celulares" accent="#ec4899" width={3.4} levels={LEVELS} {...props}>
      {range(LEVELS).map((level) =>
        range(5).map((i) => (
          <Hoverable key={`${level}-${i}`} position={[-1.2 + i * 0.6, levelY(level) + 0.24, 0]}>
            <Phone
              rotation={[-0.15, 0, 0]}
              color={PHONE_COLORS[i]}
              screenColor={SCREEN_COLORS[(i + level) % SCREEN_COLORS.length]}
            />
          </Hoverable>
        )),
      )}
    </Shelf>
  )
}

function MousesShelf(props) {
  return (
    <Shelf label="Mouses" accent="#22c55e" width={3.4} levels={LEVELS} {...props}>
      {range(LEVELS).map((level) =>
        range(5).map((i) => (
          <Hoverable key={`${level}-${i}`} position={[-1.2 + i * 0.6, levelY(level), 0]}>
            <Mouse scale={1.6} color={MOUSE_COLORS[(i + level) % MOUSE_COLORS.length]} />
          </Hoverable>
        )),
      )}
    </Shelf>
  )
}

function TabletsShelf(props) {
  return (
    <Shelf label="Tablets" accent="#f59e0b" width={3.4} levels={LEVELS} {...props}>
      {range(LEVELS).map((level) =>
        range(4).map((i) => (
          <Hoverable key={`${level}-${i}`} position={[-1.15 + i * 0.77, levelY(level) + 0.37, 0]}>
            <Tablet rotation={[-0.15, 0, 0]} screenColor={SCREEN_COLORS[(i + level + 2) % SCREEN_COLORS.length]} />
          </Hoverable>
        )),
      )}
    </Shelf>
  )
}

function Counter() {
  return (
    <group position={[0, 0, 1.5]}>
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.6, 1, 0.9]} />
        <meshStandardMaterial color="#e2e8f0" />
      </mesh>
      <mesh position={[0, 1.02, 0]} castShadow>
        <boxGeometry args={[3.8, 0.05, 1]} />
        <meshStandardMaterial color="#0f172a" metalness={0.5} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.5, 0.451]}>
        <planeGeometry args={[3.6, 0.12]} />
        <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={1.5} />
      </mesh>
      <Hoverable position={[-0.6, 1.045, 0]}>
        <Computer scale={0.5} rotation={[0, 0.25, 0]} />
      </Hoverable>
      <Hoverable position={[1.0, 1.045, 0.1]}>
        <Tablet rotation={[-Math.PI / 2 + 0.25, 0, 0.3]} position={[0, 0.03, 0]} scale={0.8} />
      </Hoverable>
      <Hoverable position={[1.45, 1.045, 0.2]}>
        <Mouse scale={1.4} />
      </Hoverable>
    </group>
  )
}

export default function StoreScene() {
  const { width, depth } = ROOM
  return (
    <>
      <color attach="background" args={['#020617']} />
      <fog attach="fog" args={['#020617', 14, 26]} />
      <ambientLight intensity={0.55} />
      <hemisphereLight args={['#e0f2fe', '#1e1b4b', 0.6]} />
      <directionalLight
        position={[4, 8, 6]}
        intensity={1.2}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
      />
      <pointLight position={[-3.5, 4, -3]} intensity={12} color="#38bdf8" />
      <pointLight position={[3.5, 4, -3]} intensity={12} color="#f472b6" />

      <Room />
      <StoreSign />
      <ComputersShelf position={[-2.2, 0, -depth / 2 + 0.45]} />
      <PhonesShelf position={[2.2, 0, -depth / 2 + 0.45]} />
      <MousesShelf position={[-width / 2 + 0.45, 0, -1.5]} rotation={[0, Math.PI / 2, 0]} />
      <TabletsShelf position={[width / 2 - 0.45, 0, -1.5]} rotation={[0, -Math.PI / 2, 0]} />
      <Counter />

      <ContactShadows position={[0, 0.005, 0]} opacity={0.4} scale={14} blur={2.5} far={4} />
      <OrbitControls
        makeDefault
        target={[0, 1.4, -2]}
        minDistance={3}
        maxDistance={10}
        maxPolarAngle={Math.PI / 2.05}
        enablePan={false}
      />
    </>
  )
}
