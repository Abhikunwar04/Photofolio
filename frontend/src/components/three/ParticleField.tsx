import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const FloatingOrbs = () => {
  const group = useRef<THREE.Group>(null)

  const orbs = useMemo(() => {
    return Array.from({ length: 6 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 4,
      ] as [number, number, number],
      scale: 0.3 + Math.random() * 1.2,
      speed: 0.2 + Math.random() * 0.3,
      offset: Math.random() * Math.PI * 2,
      color: ['#6366f1', '#a855f7', '#ec4899', '#3b82f6', '#8b5cf6', '#6366f1'][i],
    }))
  }, [])

  useFrame((state) => {
    if (!group.current) return
    group.current.children.forEach((child, i) => {
      const orb = orbs[i]
      child.position.y = orb.position[1] + Math.sin(state.clock.elapsedTime * orb.speed + orb.offset) * 0.8
      child.position.x = orb.position[0] + Math.cos(state.clock.elapsedTime * orb.speed * 0.5 + orb.offset) * 0.4
    })
  })

  return (
    <group ref={group}>
      {orbs.map((orb, i) => (
        <mesh key={i} position={orb.position} scale={orb.scale}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial
            color={orb.color}
            transparent
            opacity={0.15}
            roughness={0}
            metalness={0.1}
          />
        </mesh>
      ))}
    </group>
  )
}

const GlowParticles = () => {
  const meshRef = useRef<THREE.Points>(null)

  const positions = useMemo(() => {
    const count = 800
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 25
      arr[i * 3 + 1] = (Math.random() - 0.5) * 15
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    return arr
  }, [])

  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.01
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.005) * 0.1
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#818cf8" transparent opacity={0.6} sizeAttenuation />
    </points>
  )
}

const ParticleField = () => {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 8], fov: 75 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#6366f1" />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#a855f7" />
        <FloatingOrbs />
        <GlowParticles />
      </Canvas>
    </div>
  )
}

export default ParticleField