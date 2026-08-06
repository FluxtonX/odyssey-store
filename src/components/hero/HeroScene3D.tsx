"use client"

import React, { useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ContactShadows, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

// Glasses Model
function SmartGlasses({ color, mousePos }: { color: string, mousePos: { x: number, y: number } }) {
  const group = useRef<THREE.Group>(null);
  const { camera } = useThree();
  
  // Camera orbit state
  const timeRef = useRef(0);
  const ORBIT_RADIUS = 6.5;
  const ORBIT_HEIGHT = 1.5;
  const ORBIT_SPEED = 0.15; // radians per second
  
  // Target camera position for lerping
  const targetCameraPos = useRef(new THREE.Vector3());

  useFrame((state, delta) => {
    // 1. Calculate base orbit position
    timeRef.current += delta;
    const angle = timeRef.current * ORBIT_SPEED;
    
    const baseOrbitX = Math.sin(angle) * ORBIT_RADIUS;
    const baseOrbitZ = Math.cos(angle) * ORBIT_RADIUS;
    const baseOrbitY = ORBIT_HEIGHT;
    
    // 2. Add mouse influence
    // max offset ±0.5 units
    const mouseOffsetX = mousePos.x * 0.5;
    const mouseOffsetY = mousePos.y * 0.5;
    
    // Perpendicular vector to camera-to-center for horizontal offset
    const camDir = new THREE.Vector3(-baseOrbitX, 0, -baseOrbitZ).normalize();
    const rightDir = new THREE.Vector3().crossVectors(camDir, new THREE.Vector3(0, 1, 0)).normalize();
    
    const finalX = baseOrbitX + rightDir.x * mouseOffsetX;
    const finalZ = baseOrbitZ + rightDir.z * mouseOffsetX;
    const finalY = baseOrbitY - mouseOffsetY; // invert Y so mouse up moves camera up
    
    targetCameraPos.current.set(finalX, finalY, finalZ);
    
    // 3. Smoothly interpolate camera position
    camera.position.lerp(targetCameraPos.current, 0.05); // LERP factor
    
    // 4. Always look at center (with slight upward bias)
    camera.lookAt(0, 0.2, 0);
  });

  // Materials
  const frameMaterial = new THREE.MeshStandardMaterial({
    color: color,
    roughness: 0.2,
    metalness: 0.8,
  });

  const lensMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x000000,
    transmission: 0.9,
    opacity: 1,
    metalness: 0.1,
    roughness: 0.05,
    ior: 1.5,
    thickness: 0.05,
  });

  return (
    <group ref={group} scale={1.6}>
      {/* Bridge */}
      <RoundedBox args={[0.6, 0.15, 0.1]} radius={0.05} position={[0, 0.4, 0]}>
        <primitive object={frameMaterial} attach="material" />
      </RoundedBox>

      {/* Dual Mic Dots on Bridge */}
      <mesh position={[-0.15, 0.48, 0.03]}>
        <sphereGeometry args={[0.015, 16, 16]} />
        <meshBasicMaterial color="#111111" />
      </mesh>
      <mesh position={[0.15, 0.48, 0.03]}>
        <sphereGeometry args={[0.015, 16, 16]} />
        <meshBasicMaterial color="#111111" />
      </mesh>

      {/* Left Lens Frame */}
      <mesh position={[-0.65, 0.25, 0]} rotation={[0, 0.05, 0]}>
        <torusGeometry args={[0.4, 0.06, 16, 64]} />
        <primitive object={frameMaterial} attach="material" />
      </mesh>
      
      {/* Left Lens */}
      <mesh position={[-0.65, 0.25, -0.01]} rotation={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.39, 0.39, 0.02, 32]} />
        <primitive object={lensMaterial} attach="material" />
      </mesh>

      {/* Right Lens Frame */}
      <mesh position={[0.65, 0.25, 0]} rotation={[0, -0.05, 0]}>
        <torusGeometry args={[0.4, 0.06, 16, 64]} />
        <primitive object={frameMaterial} attach="material" />
      </mesh>

      {/* Right Lens */}
      <mesh position={[0.65, 0.25, -0.01]} rotation={[0, -0.05, 0]}>
        <cylinderGeometry args={[0.39, 0.39, 0.02, 32]} />
        <primitive object={lensMaterial} attach="material" />
      </mesh>

      {/* Left Temple/Hinge */}
      <RoundedBox args={[0.1, 0.15, 0.2]} radius={0.02} position={[-1.1, 0.35, -0.05]} rotation={[0, 0.1, 0]}>
        <primitive object={frameMaterial} attach="material" />
      </RoundedBox>

      {/* Camera Sensor on Left Temple */}
      <mesh position={[-1.12, 0.35, 0.06]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.05, 16]} />
        <meshStandardMaterial color="#111111" roughness={0.3} metalness={0.9} />
      </mesh>
      {/* Camera Lens Element */}
      <mesh position={[-1.12, 0.35, 0.09]}>
        <sphereGeometry args={[0.02, 16, 16]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
      {/* Recording LED (Blue) */}
      <mesh position={[-1.12, 0.42, 0.06]}>
        <sphereGeometry args={[0.01, 16, 16]} />
        <meshBasicMaterial color="#3b82f6" />
      </mesh>
      
      {/* Right Temple/Hinge */}
      <RoundedBox args={[0.1, 0.15, 0.2]} radius={0.02} position={[1.1, 0.35, -0.05]} rotation={[0, -0.1, 0]}>
        <primitive object={frameMaterial} attach="material" />
      </RoundedBox>

      {/* Privacy LED on Right Temple (Green) */}
      <mesh position={[1.15, 0.35, 0.06]}>
        <sphereGeometry args={[0.015, 16, 16]} />
        <meshBasicMaterial color="#22c55e" />
        <pointLight color="#22c55e" intensity={0.5} distance={0.2} />
      </mesh>

      {/* Left Arm */}
      <RoundedBox args={[0.05, 0.1, 1.8]} radius={0.02} position={[-1.15, 0.35, -0.9]} rotation={[0, -0.05, 0]}>
        <primitive object={frameMaterial} attach="material" />
      </RoundedBox>

      {/* Right Arm */}
      <RoundedBox args={[0.05, 0.1, 1.8]} radius={0.02} position={[1.15, 0.35, -0.9]} rotation={[0, 0.05, 0]}>
        <primitive object={frameMaterial} attach="material" />
      </RoundedBox>
    </group>
  );
}

interface HeroScene3DProps {
  colorHex: string;
  mousePos: { x: number; y: number };
}

export default function HeroScene3D({ colorHex, mousePos }: HeroScene3DProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-900 rounded-2xl overflow-hidden">
        <div className="text-center text-gray-400">
          <p>3D Scene unavailable</p>
          <p className="text-sm">Please update your browser or enable WebGL</p>
        </div>
      </div>
    );
  }

  return (
    <Canvas
      shadows
      camera={{ fov: 35, position: [0, 1.5, 6.5] }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.outputColorSpace = THREE.SRGBColorSpace;
      }}
      onError={() => setHasError(true)}
      className="pointer-events-none"
    >
      <ambientLight intensity={0.8} />
      
      {/* Studio Lighting */}
      {/* Key Light (warm white) */}
      <directionalLight 
        position={[5, 5, 4]} 
        intensity={3} 
        color="#fff5e6" 
        castShadow 
      />
      
      {/* Fill Light (cool blue) */}
      <directionalLight 
        position={[-5, -2, 2]} 
        intensity={1.5} 
        color="#2563EB" 
      />
      
      {/* Rim Light (cyan) */}
      <directionalLight 
        position={[0, 3, -5]} 
        intensity={2} 
        color="#06B6D4" 
      />

      <SmartGlasses color={colorHex} mousePos={mousePos} />
      
      <ContactShadows 
        position={[0, -0.8, 0]} 
        opacity={0.6} 
        scale={10} 
        blur={2} 
        far={4} 
        color="#000000"
      />
    </Canvas>
  );
}
