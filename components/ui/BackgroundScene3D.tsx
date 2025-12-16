'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useMemo } from 'react'
import { Mesh, Vector3 } from 'three'
import { useTheme } from 'next-themes'

// Floating geometric shape component
function FloatingShape({ position, color, speed = 1 }: { position: [number, number, number], color: string, speed?: number }) {
  const meshRef = useRef<Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.001 * speed
      meshRef.current.rotation.y += 0.002 * speed
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed * 0.5) * 0.5
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <octahedronGeometry args={[1, 0]} />
      <meshStandardMaterial 
        color={color} 
        wireframe
        transparent
        opacity={0.15}
      />
    </mesh>
  )
}

// Particle field component
function ParticleField({ count = 100 }: { count?: number }) {
  const { theme } = useTheme()
  const pointsRef = useRef<any>(null)
  
  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 20
      const y = (Math.random() - 0.5) * 20
      const z = (Math.random() - 0.5) * 20
      temp.push(x, y, z)
    }
    return new Float32Array(temp)
  }, [count])

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05
    }
  })

  const color = theme === 'dark' ? '#4299e1' : '#2b6cb0'

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color={color}
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

// Main background scene component
export function BackgroundScene3D() {
  const { theme } = useTheme()
  
  const shapes = useMemo(() => [
    { position: [-8, 2, -5] as [number, number, number], color: '#4299e1', speed: 0.8 },
    { position: [8, -2, -8] as [number, number, number], color: '#48bb78', speed: 1.2 },
    { position: [0, 4, -6] as [number, number, number], color: '#9f7aea', speed: 1 },
    { position: [-6, -3, -7] as [number, number, number], color: '#ed8936', speed: 0.9 },
    { position: [6, 3, -9] as [number, number, number], color: '#f56565', speed: 1.1 },
  ], [])

  return (
    <div className="fixed inset-0 -z-10 opacity-40">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        
        {/* Floating geometric shapes */}
        {shapes.map((shape, index) => (
          <FloatingShape
            key={index}
            position={shape.position}
            color={shape.color}
            speed={shape.speed}
          />
        ))}
        
        {/* Particle field */}
        <ParticleField count={150} />
      </Canvas>
    </div>
  )
}
