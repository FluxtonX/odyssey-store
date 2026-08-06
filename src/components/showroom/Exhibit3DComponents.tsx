"use client";

import React, { useRef, useState, useMemo } from "react";
import { useFrame, useLoader, ThreeEvent } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";

// ============================================================================
// TYPES
// ============================================================================
export interface ExhibitImageConfig {
  id: string;
  url: string;
  label: string;
  category: string;
  pos: [number, number, number];
  rot: [number, number, number];
  size: [number, number]; // [width, height]
  isHero?: boolean;
}

export interface ExhibitStationData {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  badge: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewsCount: number;
  position: [number, number, number]; // Center coordinate in 3D space
  pedestalColor?: string;
  images: ExhibitImageConfig[];
}

// ============================================================================
// INTERACTIVE 3D EXHIBIT CARD WITH 3D TILT, SPECULAR SWEEP & CONTACT SHADOW
// ============================================================================
export function ExhibitCard3D({
  config,
  stationPos,
  price,
  onSelectProduct,
  onHoverChange,
  cameraZ,
}: {
  config: ExhibitImageConfig;
  stationPos: [number, number, number];
  price: number;
  onSelectProduct?: (e: ThreeEvent<MouseEvent> | React.MouseEvent) => void;
  onHoverChange?: (hovered: boolean, config: ExhibitImageConfig) => void;
  cameraZ: number;
}) {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const pointerPos = useRef({ x: 0, y: 0 });

  // Load high-resolution texture
  const texture = useLoader(THREE.TextureLoader, config.url);
  useMemo(() => {
    if (texture) {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.generateMipmaps = true;
      texture.minFilter = THREE.LinearMipmapLinearFilter;
    }
  }, [texture]);

  // Distance from camera to this card for LOD & opacity fading
  const worldZ = stationPos[2] + config.pos[2];
  const distToCamera = Math.abs(cameraZ - worldZ);

  // Dynamic LOD calculations
  const isFar = distToCamera > 38;
  const isNear = distToCamera < 18;

  // Spring animation physics per frame
  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // Smooth tilt interpolation
    const targetRotX = config.rot[0] + (hovered ? -pointerPos.current.y * 0.22 : 0);
    const targetRotY = config.rot[1] + (hovered ? pointerPos.current.x * 0.28 : 0);
    const targetRotZ = config.rot[2] + (hovered ? pointerPos.current.x * -0.05 : 0);

    meshRef.current.rotation.x = THREE.MathUtils.damp(meshRef.current.rotation.x, targetRotX, 10, delta);
    meshRef.current.rotation.y = THREE.MathUtils.damp(meshRef.current.rotation.y, targetRotY, 10, delta);
    meshRef.current.rotation.z = THREE.MathUtils.damp(meshRef.current.rotation.z, targetRotZ, 10, delta);

    // Subtle float forward on hover
    const targetZ = config.pos[2] + (hovered ? 0.35 : 0);
    const targetY = config.pos[1] + (hovered ? 0.1 : 0);
    meshRef.current.position.z = THREE.MathUtils.damp(meshRef.current.position.z, targetZ, 8, delta);
    meshRef.current.position.y = THREE.MathUtils.damp(meshRef.current.position.y, targetY, 8, delta);

    // Specular sweep shimmer pass removed


  });

  const handlePointerOver = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setHovered(true);
    document.body.style.cursor = "pointer";
    if (onHoverChange) onHoverChange(true, config);
  };

  const handlePointerOut = () => {
    setHovered(false);
    document.body.style.cursor = "auto";
    pointerPos.current = { x: 0, y: 0 };
    if (onHoverChange) onHoverChange(false, config);
  };

  const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
    if (!hovered) return;
    const uv = e.uv;
    if (uv) {
      pointerPos.current = {
        x: (uv.x - 0.5) * 2,
        y: (uv.y - 0.5) * 2,
      };
    }
  };

  const [w, h] = config.size;

  return (
    <group
      ref={meshRef}
      position={[config.pos[0], config.pos[1], config.pos[2]]}
      rotation={config.rot}
    >
      {/* 1. Main High-Res Textured Image Plane */}
      <mesh
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onPointerMove={handlePointerMove}
        onClick={onSelectProduct}
        castShadow={isNear}
        receiveShadow
      >
        <planeGeometry args={[w, h, 16, 16]} />
        <meshPhysicalMaterial
          map={texture}
          roughness={0.25}
          metalness={0.1}
          clearcoat={0.3}
          clearcoatRoughness={0.15}
          reflectivity={0.5}
          side={THREE.DoubleSide}
          transparent={isFar}
          opacity={isFar ? 0.35 : 1}
        />
      </mesh>

      {/* 2. Frosted Acrylic Glass Frame Bezel */}
      <mesh position={[0, 0, -0.015]}>
        <boxGeometry args={[w + 0.08, h + 0.08, 0.02]} />
        <meshPhysicalMaterial
          color="#FFFFFF"
          roughness={0.15}
          metalness={0.1}
          transmission={0.85}
          thickness={0.04}
          ior={1.4}
          transparent
          opacity={isFar ? 0.2 : 0.8}
        />
      </mesh>

      {/* 3. Sleek Metallic Accent Trim (Apple/Bang & Olufsen aesthetic) */}
      <mesh position={[0, 0, -0.025]}>
        <boxGeometry args={[w + 0.1, h + 0.1, 0.01]} />
        <meshStandardMaterial
          color={hovered ? "#2563EB" : "#E2E8F0"}
          roughness={0.3}
          metalness={0.85}
        />
      </mesh>

      {/* 4. Glass UI Overlay on Hover */}
      {hovered && (
        <Html
          position={[0, h / 2 + 0.15, 0.05]}
          center
          pointerEvents="none"
          zIndexRange={[100, 0]}
        >
          <div className="flex flex-row items-center justify-center gap-3 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/40 shadow-lg">
            <span className="text-sm font-black text-gray-900 drop-shadow-sm">
              ${price}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (onSelectProduct) onSelectProduct(e as any);
              }}
              className="px-3 py-1 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs pointer-events-auto shadow-sm"
            >
              Order Now
            </button>
          </div>
        </Html>
      )}

    </group>
  );
}

// ============================================================================
// ARCHITECTURAL EXHIBIT PEDESTAL & AMBIENT GLOW BEACON
// ============================================================================
export function StationPedestal3D({
  position,
  color = "#2563EB",
  isNear,
}: {
  position: [number, number, number];
  color?: string;
  isNear: boolean;
}) {
  const [px, py, pz] = position;

  return (
    <group position={[px, py - 2.0, pz]}>
      {/* Frosted Glass Podium Cylinder */}
      <mesh position={[0, 0.4, 0]} receiveShadow>
        <cylinderGeometry args={[2.8, 3.2, 0.8, 32]} />
        <meshPhysicalMaterial
          color="#FFFFFF"
          roughness={0.2}
          metalness={0.15}
          transmission={0.7}
          thickness={0.5}
          ior={1.45}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Radiant Top Edge Light Ring */}
      <mesh position={[0, 0.81, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.7, 2.8, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.65} />
      </mesh>

      {/* Soft Radial Reflection Spot on Main Gallery Floor */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[4.2, 32]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={isNear ? 0.15 : 0.05}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

// ============================================================================
// DISTANT BACKGROUND LAYER (Semi-transparent Silhouette Monolith)
// ============================================================================
export function BackgroundStationSilhouette({
  position,
  name,
  badge,
  isFar,
}: {
  position: [number, number, number];
  name: string;
  badge: string;
  isFar: boolean;
}) {
  const [px, py, pz] = position;

  if (!isFar) return null;

  return (
    <group position={[px, py, pz]}>
      {/* Translucent Frosted Glass Monolith */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[4.5, 3.2, 0.1]} />
        <meshPhysicalMaterial
          color="#F1F5F9"
          roughness={0.3}
          metalness={0.1}
          transmission={0.9}
          transparent
          opacity={0.25}
        />
      </mesh>

      {/* Ambient Blue Halo Glow */}
      <mesh position={[0, 0.5, -0.2]}>
        <planeGeometry args={[6.0, 4.5]} />
        <meshBasicMaterial
          color="#2563EB"
          transparent
          opacity={0.06}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}
