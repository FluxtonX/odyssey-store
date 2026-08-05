"use client";

import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, MeshWobbleMaterial } from "@react-three/drei";
import * as THREE from "three";

interface SmartGlassesModelProps {
  colorHex?: string;
  mousePos: { x: number; y: number };
}

function SmartGlassesModel({ colorHex = "#111827", mousePos }: SmartGlassesModelProps) {
  const meshRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      // Base gentle floating levitation
      const floatY = Math.sin(t / 1.8) * 0.12;
      const floatRotY = Math.sin(t / 2.5) * 0.15;
      const floatRotX = Math.sin(t / 3.5) * 0.06;

      // Subtle mouse tilt target (3-5 degrees max)
      const targetRotX = mousePos.y * 0.08 + floatRotX;
      const targetRotY = mousePos.x * 0.12 + floatRotY;

      // Smooth lerp easing towards target rotation
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetRotX, 0.05);
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotY, 0.05);
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, floatY, 0.05);
    }
  });

  return (
    <group ref={meshRef} dispose={null} scale={[1.45, 1.45, 1.45]}>
      {/* Front Frame Bridge */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2.4, 0.4, 0.15]} />
        <meshStandardMaterial color={colorHex} metalness={0.9} roughness={0.12} />
      </mesh>

      {/* Left Lens Frame */}
      <mesh position={[-1.3, -0.2, 0]}>
        <torusGeometry args={[0.75, 0.08, 16, 100]} />
        <meshStandardMaterial color={colorHex} metalness={0.9} roughness={0.12} />
      </mesh>

      {/* Left Lens Glass Surface */}
      <mesh position={[-1.3, -0.2, 0.02]}>
        <circleGeometry args={[0.72, 32]} />
        <meshPhysicalMaterial
          color="#2563EB"
          transmission={0.9}
          opacity={0.7}
          transparent={true}
          roughness={0.03}
          ior={1.5}
          thickness={0.25}
          reflectivity={0.9}
        />
      </mesh>

      {/* Right Lens Frame */}
      <mesh position={[1.3, -0.2, 0]}>
        <torusGeometry args={[0.75, 0.08, 16, 100]} />
        <meshStandardMaterial color={colorHex} metalness={0.9} roughness={0.12} />
      </mesh>

      {/* Right Lens Glass Surface */}
      <mesh position={[1.3, -0.2, 0.02]}>
        <circleGeometry args={[0.72, 32]} />
        <meshPhysicalMaterial
          color="#2563EB"
          transmission={0.9}
          opacity={0.7}
          transparent={true}
          roughness={0.03}
          ior={1.5}
          thickness={0.25}
          reflectivity={0.9}
        />
      </mesh>

      {/* 4K Camera Sensor Ring */}
      <mesh position={[-2.0, 0.2, 0.1]}>
        <cylinderGeometry args={[0.12, 0.12, 0.08, 32]} />
        <meshStandardMaterial color="#2563EB" metalness={0.95} roughness={0.08} />
      </mesh>
      <mesh position={[-2.0, 0.2, 0.15]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshBasicMaterial color="#06B6D4" />
      </mesh>

      {/* Microphones */}
      <mesh position={[-0.4, 0.15, 0.09]}>
        <cylinderGeometry args={[0.04, 0.04, 0.04, 16]} />
        <meshStandardMaterial color="#374151" />
      </mesh>
      <mesh position={[0.4, 0.15, 0.09]}>
        <cylinderGeometry args={[0.04, 0.04, 0.04, 16]} />
        <meshStandardMaterial color="#374151" />
      </mesh>

      {/* Temple Arms */}
      <mesh position={[-2.15, 0.1, -1.2]} rotation={[0, -0.2, 0]}>
        <boxGeometry args={[0.12, 0.35, 2.3]} />
        <meshStandardMaterial color={colorHex} metalness={0.9} roughness={0.12} />
      </mesh>
      <mesh position={[2.15, 0.1, -1.2]} rotation={[0, 0.2, 0]}>
        <boxGeometry args={[0.12, 0.35, 2.3]} />
        <meshStandardMaterial color={colorHex} metalness={0.9} roughness={0.12} />
      </mesh>

      {/* Privacy LED Light */}
      <mesh position={[2.0, 0.2, 0.1]}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <MeshWobbleMaterial color="#10B981" factor={0.3} speed={2} />
      </mesh>
    </group>
  );
}

export default function HeroGlassesCanvas({ colorHex = "#2563EB" }: { colorHex?: string }) {
  const [hasError, setHasError] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  if (hasError) {
    return (
      <div className="w-full h-full flex items-center justify-center relative">
        <img
          src="https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1200&q=80"
          alt="Odyssey Smart Glasses"
          className="max-h-[420px] w-auto object-contain drop-shadow-[0_20px_40px_rgba(37,99,235,0.15)]"
        />
      </div>
    );
  }

  return (
    <div className="w-full h-[450px] sm:h-[550px] lg:h-[620px] relative cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [0, 0, 7.2], fov: 42 }}
        onError={() => setHasError(true)}
        className="w-full h-full"
      >
        <ambientLight intensity={2.0} />
        <directionalLight position={[12, 12, 10]} intensity={3.5} color="#ffffff" />
        <directionalLight position={[-12, -10, -5]} intensity={1.5} color="#2563EB" />
        <pointLight position={[0, 6, 6]} intensity={2.5} color="#06B6D4" />

        <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.8}>
          <SmartGlassesModel colorHex={colorHex} mousePos={mousePos} />
        </Float>

        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.0} maxPolarAngle={Math.PI / 1.7} minPolarAngle={Math.PI / 3} />
      </Canvas>

      {/* 3D Preview Indicator Badge */}
      <div className="absolute bottom-6 right-6 pointer-events-none px-4 py-2 rounded-full bg-white/90 backdrop-blur-md border border-gray-200 shadow-[0_4px_20px_rgba(0,0,0,0.06)] flex items-center gap-2 z-20">
        <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
        <span className="text-[11px] font-semibold tracking-wider uppercase text-gray-800">3D Interactive Preview</span>
      </div>
    </div>
  );
}
