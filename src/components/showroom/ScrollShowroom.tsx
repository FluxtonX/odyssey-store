"use client";

import React, { useRef, useMemo, useEffect, useState, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRouter } from "next/navigation";
import { RECORDING_GLASSES_PRODUCTS, RecordingGlassesProduct } from "@/data/products";
import { useCartStore } from "@/store/useCartStore";
import ShowroomQuickViewModal from "./ShowroomQuickViewModal";
import {
  ExhibitCard3D,
  StationPedestal3D,
  BackgroundStationSilhouette,
  ExhibitStationData,
  ExhibitImageConfig,
} from "./Exhibit3DComponents";
import {
  ShoppingBag,
  Eye,
  Check,
  ChevronDown,
  Sparkles,
  Layers,
  Compass,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// ============================================================================
// CONSTANTS & 3D SPATIAL EXHIBIT DATA
// ============================================================================
const CAMERA_START_Z = 6;
const CAMERA_END_Z = -58;
const TOTAL_Z_DEPTH = CAMERA_START_Z - CAMERA_END_Z; // 80 units

// Build organic multi-angle exhibit configurations for all stations
function buildExhibitionStations(): ExhibitStationData[] {
  const p1 = RECORDING_GLASSES_PRODUCTS[0];
  const p2 = RECORDING_GLASSES_PRODUCTS[1];
  const p3 = RECORDING_GLASSES_PRODUCTS[2];

  return [
    // --- STATION 1: ODYSSEY PRO TITANIUM 4K (Flagship) ---
    {
      id: p1.id,
      slug: p1.slug,
      name: p1.name,
      tagline: p1.tagline,
      badge: p1.badge,
      price: p1.basePrice,
      originalPrice: p1.originalPrice,
      rating: p1.rating,
      reviewsCount: p1.reviewsCount,
      position: [1.9, 0.05, -14],
      pedestalColor: "#2563EB",
      images: [
        {
          id: "p1-hero",
          url: p1.images.hero,
          label: "Titanium 4K Dual Sensor",
          category: "Front Architecture",
          pos: [0, 0.1, 0],
          rot: [0, -0.15, 0],
          size: [2.6, 1.75],
          isHero: true,
        },
        {
          id: "p1-angle",
          url: p1.images.angle3D,
          label: "Aerospace Ergonomic Curvature",
          category: "45° Dynamic Angle",
          pos: [-1.9, 0.25, 0.8],
          rot: [0, 0.32, 0.02],
          size: [2.1, 1.45],
        },
        {
          id: "p1-sensor",
          url: p1.images.front,
          label: "Optical Gyro Stabilization",
          category: "Sensor Macro",
          pos: [1.95, 0.35, 0.9],
          rot: [0, -0.36, -0.02],
          size: [2.05, 1.4],
        },
        {
          id: "p1-temple",
          url: p1.images.side,
          label: "Directional Beamforming Mics",
          category: "Acoustic Temple",
          pos: [-1.55, -0.65, -1.0],
          rot: [0.03, 0.22, 0],
          size: [1.9, 1.3],
        },
        {
          id: "p1-lifestyle",
          url: p1.images.lifestyle,
          label: "Seamless Hands-Free Capture",
          category: "Lifestyle Context",
          pos: [1.6, -0.6, -0.9],
          rot: [-0.02, -0.24, 0],
          size: [1.95, 1.35],
        },
      ],
    },

    // --- STATION 2: ODYSSEY SPORT POLARIZED EDITION (Active Sport) ---
    {
      id: p2.id,
      slug: p2.slug,
      name: p2.name,
      tagline: p2.tagline,
      badge: p2.badge,
      price: p2.basePrice,
      originalPrice: p2.originalPrice,
      rating: p2.rating,
      reviewsCount: p2.reviewsCount,
      position: [-2.1, 0.2, -33],
      pedestalColor: "#D97706",
      images: [
        {
          id: "p2-hero",
          url: p2.images.hero,
          label: "Polarized UV400 Action Optic",
          category: "Impact Frame",
          pos: [0, 0.1, 0],
          rot: [0, 0.18, 0],
          size: [2.55, 1.7],
          isHero: true,
        },
        {
          id: "p2-angle",
          url: p2.images.angle3D,
          label: "High-Velocity Aerodynamic Form",
          category: "3D Perspective",
          pos: [1.9, 0.22, 0.8],
          rot: [0, -0.34, 0],
          size: [2.1, 1.45],
        },
        {
          id: "p2-sensor",
          url: p2.images.front,
          label: "Hydrophobic Anti-Glare Shield",
          category: "Optics Close-Up",
          pos: [-1.95, 0.32, 0.9],
          rot: [0, 0.35, 0],
          size: [2.05, 1.4],
        },
        {
          id: "p2-temple",
          url: p2.images.side,
          label: "Anti-Slip Rubber Comfort Grip",
          category: "Active Grip",
          pos: [1.5, -0.6, -0.95],
          rot: [0, -0.25, 0],
          size: [1.9, 1.3],
        },
        {
          id: "p2-lifestyle",
          url: p2.images.lifestyle,
          label: "Rugged Mountain Trail Endurance",
          category: "Active POV",
          pos: [-1.55, -0.65, -1.0],
          rot: [0, 0.22, 0],
          size: [1.9, 1.3],
        },
      ],
    },

    // --- STATION 3: ODYSSEY AUDIO & BLUE-LIGHT (Everyday Comfort) ---
    {
      id: p3.id,
      slug: p3.slug,
      name: p3.name,
      tagline: p3.tagline,
      badge: p3.badge,
      price: p3.basePrice,
      originalPrice: p3.originalPrice,
      rating: p3.rating,
      reviewsCount: p3.reviewsCount,
      position: [2.0, -0.05, -52],
      pedestalColor: "#059669",
      images: [
        {
          id: "p3-hero",
          url: p3.images.hero,
          label: "All-Day Screen Comfort Filter",
          category: "Featherweight Acetate",
          pos: [0, 0.1, 0],
          rot: [0, -0.16, 0],
          size: [2.55, 1.7],
          isHero: true,
        },
        {
          id: "p3-angle",
          url: p3.images.angle3D,
          label: "Classic Italian Craftsmanship",
          category: "Frame Aesthetic",
          pos: [-1.85, 0.25, 0.85],
          rot: [0, 0.32, 0],
          size: [2.1, 1.45],
        },
        {
          id: "p3-sensor",
          url: p3.images.front,
          label: "Ultra-Clear Blue Light Blocking",
          category: "Daily Lens",
          pos: [1.9, 0.3, 0.9],
          rot: [0, -0.34, 0],
          size: [2.05, 1.4],
        },
        {
          id: "p3-temple",
          url: p3.images.side,
          label: "Leak-Proof Acoustic Speakers",
          category: "Open-Ear Driver",
          pos: [-1.5, -0.6, -0.95],
          rot: [0, 0.22, 0],
          size: [1.9, 1.3],
        },
        {
          id: "p3-lifestyle",
          url: p3.images.lifestyle,
          label: "Effortless AI Voice Memory Sync",
          category: "Studio POV",
          pos: [1.55, -0.65, -0.95],
          rot: [0, -0.22, 0],
          size: [1.9, 1.3],
        },
      ],
    }
  ];
}

// ============================================================================
// CAMERA CONTROLLER: DAMPED SPRING-INERTIA PHYSICS & ORGANIC AISLE TRAJECTORY
// ============================================================================
function ShowroomDollyCamera({
  scrollProgressRef,
  mousePosRef,
  stations,
  onActiveStationIndexChange,
  currentCamZRef,
}: {
  scrollProgressRef: React.MutableRefObject<number>;
  mousePosRef: React.MutableRefObject<{ x: number; y: number }>;
  stations: ExhibitStationData[];
  onActiveStationIndexChange: (idx: number) => void;
  currentCamZRef: React.MutableRefObject<number>;
}) {
  const { camera } = useThree();

  // Damped spring physics state
  const physicsProgress = useRef(0);
  const velocity = useRef(0);
  const lastActiveIndex = useRef(-1);

  // Reusable vectors to avoid per-frame GC allocations
  const targetCamPos = useMemo(() => new THREE.Vector3(), []);
  const lookAtTarget = useMemo(() => new THREE.Vector3(), []);
  const smoothedLookAt = useMemo(() => new THREE.Vector3(0, 0.3, -8), []);

  useFrame((_, delta) => {
    const targetP = THREE.MathUtils.clamp(scrollProgressRef.current, 0, 1);

    // Spring-based interpolation with damping & inertia
    const tension = 28;
    const damping = 0.88;
    const diff = targetP - physicsProgress.current;
    velocity.current = (velocity.current + diff * tension * delta) * Math.pow(damping, delta * 60);
    physicsProgress.current += velocity.current * delta * 14;
    physicsProgress.current = THREE.MathUtils.clamp(physicsProgress.current, 0, 1);

    const progress = physicsProgress.current;

    // 1. Calculate Base Camera Z down the gallery aisle
    const camZ = CAMERA_START_Z - progress * TOTAL_Z_DEPTH;
    currentCamZRef.current = camZ;

    // 2. Organic Aisle Curvature: Gentle S-Curve trajectory
    const aisleCurvatureX = Math.sin(camZ * 0.08) * 0.65;
    const eyeLevelY = 0.45;

    // 3. Mouse Parallax Offset (subtle, non-disruptive)
    const mouseOffsetX = mousePosRef.current.x * 0.45;
    const mouseOffsetY = mousePosRef.current.y * 0.2;

    targetCamPos.set(aisleCurvatureX + mouseOffsetX, eyeLevelY - mouseOffsetY, camZ);

    // Smooth camera positioning
    camera.position.lerp(targetCamPos, 0.12);

    // 4. Find the most relevant station in front of or next to the camera
    let bestStationIdx = 0;
    let closestDist = Infinity;

    for (let i = 0; i < stations.length; i++) {
      const stationZ = stations[i].position[2];
      const dist = Math.abs(camZ - stationZ);
      if (dist < closestDist) {
        closestDist = dist;
        bestStationIdx = i;
      }
    }

    if (bestStationIdx !== lastActiveIndex.current) {
      lastActiveIndex.current = bestStationIdx;
      onActiveStationIndexChange(bestStationIdx);
    }

    const activeStation = stations[bestStationIdx];

    // 5. LookAt Target Interpolation: Gaze gracefully shifts towards the active exhibit
    // maintaining optimal distance so the product occupies max ~28% of viewport
    const lookAheadZ = camZ - 7.5;
    const targetLookX = activeStation.position[0] * 0.45 + mouseOffsetX * 0.2;
    const targetLookY = activeStation.position[1] * 0.4 + 0.15;

    lookAtTarget.set(targetLookX, targetLookY, lookAheadZ);
    smoothedLookAt.lerp(lookAtTarget, 0.08);

    camera.lookAt(smoothedLookAt);
  });

  return null;
}

// ============================================================================
// MAIN 3D SHOWROOM SCENE
// ============================================================================
function ShowroomWorld({
  stations,
  scrollProgressRef,
  mousePosRef,
  onActiveIndexChange,
  onOrderDirect,
  currentCamZRef,
}: {
  stations: ExhibitStationData[];
  scrollProgressRef: React.MutableRefObject<number>;
  mousePosRef: React.MutableRefObject<{ x: number; y: number }>;
  onActiveIndexChange: (idx: number) => void;
  onOrderDirect: (product: RecordingGlassesProduct) => void;
  currentCamZRef: React.MutableRefObject<number>;
}) {
  const [camZ, setCamZ] = useState(CAMERA_START_Z);

  useFrame(() => {
    setCamZ(currentCamZRef.current);
  });

  return (
    <>
      {/* Studio Lighting Setup */}
      <ambientLight intensity={0.7} color="#F8FAFC" />

      {/* Key Directional Light */}
      <directionalLight
        position={[10, 12, 10]}
        intensity={2.8}
        color="#FFFBF2"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={90}
        shadow-camera-left={-15}
        shadow-camera-right={15}
        shadow-camera-top={15}
        shadow-camera-bottom={-15}
        shadow-bias={-0.0001}
      />

      {/* Fill Directional Light */}
      <directionalLight
        position={[-8, 4, 0]}
        intensity={1.2}
        color="#2563EB"
      />

      {/* Backlight / Rim Light */}
      <directionalLight
        position={[0, 6, -80]}
        intensity={2.0}
        color="#06B6D4"
      />

      {/* Atmospheric Showroom Fog */}
      <fog attach="fog" args={["#F8F9FB", 18, 75]} />

      {/* Architectural Gallery Floor */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -1.95, -34]}
        receiveShadow
      >
        <planeGeometry args={[45, 110, 32, 32]} />
        <meshPhysicalMaterial
          color="#F9FAFB"
          roughness={0.65}
          metalness={0.08}
          clearcoat={0.35}
          clearcoatRoughness={0.2}
          reflectivity={0.4}
        />
      </mesh>

      {/* Architectural Linear Ceiling Light Strip */}
      <mesh position={[0, 5.2, -34]}>
        <boxGeometry args={[0.08, 0.08, 110]} />
        <meshBasicMaterial color="#2563EB" transparent opacity={0.22} />
      </mesh>

      {/* Global Soft Contact Shadows */}
      <ContactShadows
        position={[0, -1.94, -34]}
        opacity={0.35}
        scale={60}
        blur={2.8}
        far={15}
        color="#0F172A"
      />

      {/* --- RENDER ALL PRODUCT EXHIBIT STATIONS --- */}
      {stations.map((station, sIdx) => {
        const distToCam = Math.abs(camZ - station.position[2]);
        const isFar = distToCam > 36;
        const isNear = distToCam < 20;

        // Corresponding RecordingGlassesProduct for cart/modal actions
        const rawProduct =
          RECORDING_GLASSES_PRODUCTS.find((p) => p.id === station.id) ||
          RECORDING_GLASSES_PRODUCTS[0];

        return (
          <group
            key={`station-${station.id}`}
            position={station.position}
          >
            {/* Pedestal & Ambient Glow */}
            <StationPedestal3D
              position={[0, 0, 0]}
              color={station.pedestalColor}
              isNear={isNear}
            />

            {/* Background Layer: Distant Silhouette Monolith */}
            <BackgroundStationSilhouette
              position={[0, 0, -2.5]}
              name={station.name}
              badge={station.badge}
              isFar={isFar}
            />

            {/* Mid & Foreground Layers: 5 Multi-Angle Image Planes */}
            {station.images.map((imgCfg) => (
              <ExhibitCard3D
                key={imgCfg.id}
                config={imgCfg}
                stationPos={station.position}
                price={rawProduct.basePrice}
                cameraZ={camZ}
                onSelectProduct={() => onOrderDirect(rawProduct)}
              />
            ))}
          </group>
        );
      })}

      {/* Camera Dolly with Damped Spring Physics */}
      <ShowroomDollyCamera
        scrollProgressRef={scrollProgressRef}
        mousePosRef={mousePosRef}
        stations={stations}
        onActiveStationIndexChange={onActiveIndexChange}
        currentCamZRef={currentCamZRef}
      />
    </>
  );
}

// ============================================================================
// SHOWROOM FOREGROUND HUD & INTERACTIVE CONTROLS
// ============================================================================
function ShowroomHUD({
  activeStation,
  activeIndex,
  totalStations,
  scrollProgress,
  onQuickView,
  onQuickAdd,
}: {
  activeStation: ExhibitStationData;
  activeIndex: number;
  totalStations: number;
  scrollProgress: number;
  onQuickView: () => void;
  onQuickAdd: () => void;
}) {
  const [addedFeedback, setAddedFeedback] = useState(false);

  const handleAddClick = () => {
    onQuickAdd();
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 1200);
  };

  return (
    <>
      {/* 1. Top Exhibition Header (Fades smoothly as user progresses) */}
      <div
        className="absolute top-6 left-1/2 -translate-x-1/2 z-20 text-center space-y-1.5 pointer-events-none transition-opacity duration-500"
        style={{
          opacity: scrollProgress < 0.06 ? 1 : Math.max(0, 1 - (scrollProgress - 0.06) * 10),
        }}
      >
        <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          Walk Through Our Recording Glasses
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 font-medium max-w-md mx-auto">
          Scroll forward to explore multi-angle high-resolution exhibits in physical 3D space
        </p>
      </div>

      {/* Top Exhibition Header */}

      {/* 3. Right Station Timeline Minimap */}
      <div className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-4 bg-white/70 backdrop-blur-xl p-3 rounded-full border border-gray-200/80 shadow-lg hidden sm:flex">
        {Array.from({ length: totalStations }).map((_, idx) => {
          const isActive = idx === activeIndex;
          const isPassed = idx < activeIndex;

          return (
            <div
              key={`nav-dot-${idx}`}
              className="relative group flex items-center"
            >
              <div
                className={`w-3 h-3 rounded-full transition-all duration-500 cursor-pointer ${
                  isActive
                    ? "bg-[#2563EB] scale-125 ring-4 ring-[#2563EB]/25"
                    : isPassed
                    ? "bg-[#2563EB]/50"
                    : "bg-gray-300"
                }`}
              />

              {/* Tooltip on hover */}
              <div className="absolute right-6 px-2.5 py-1 rounded-md bg-gray-900/90 text-white text-[10px] font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md">
                Station {idx + 1}
              </div>
            </div>
          );
        })}
      </div>

      {/* 4. Bottom Scroll Cue Indicator */}
      <div
        className="absolute bottom-6 right-6 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-gray-200/80 text-[11px] font-semibold text-gray-500 pointer-events-none transition-opacity duration-300"
        style={{
          opacity: scrollProgress > 0.95 ? 0 : 1,
        }}
      >
        <span className="text-[10px] uppercase tracking-widest text-[#2563EB]">
          Scroll to Walk
        </span>
        <ChevronDown className="w-4 h-4 text-[#2563EB] animate-bounce" />
      </div>
    </>
  );
}

// ============================================================================
// EXPORTED ROOT SHOWROOM COMPONENT WITH GSAP SCROLL PINNING
// ============================================================================
export default function ScrollShowroom() {
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { addItem } = useCartStore();

  const scrollProgressRef = useRef(0);
  const mousePosRef = useRef({ x: 0, y: 0 });
  const currentCamZRef = useRef(CAMERA_START_Z);

  const [displayProgress, setDisplayProgress] = useState(0);
  const [activeStationIndex, setActiveStationIndex] = useState(0);
  const [quickViewProduct, setQuickViewProduct] = useState<RecordingGlassesProduct | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(true);

  const stations = useMemo(() => buildExhibitionStations(), []);

  // GSAP ScrollTrigger pinning with 500vh distance for relaxed, 65% reduced velocity
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=500%", // 5x viewport height for majestic pacing
        pin: true,
        scrub: 1.8, // 1.8s smooth scrub inertia
        onUpdate: (self) => {
          scrollProgressRef.current = self.progress;
          setDisplayProgress(self.progress);
        },
      });
    });

    return () => ctx.revert();
  }, []);

  // Mouse tracking for subtle parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      mousePosRef.current = { x, y };
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // WebGL detection
  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
      if (!gl) setHasWebGL(false);
    } catch {
      setHasWebGL(false);
    }
  }, []);

  const handleOrderDirect = useCallback((product: RecordingGlassesProduct) => {
    addItem(
      product,
      product.variants[0],
      product.storageOptions[0],
      product.lensOptions[0],
      1
    );
    router.push("/checkout");
  }, [addItem, router]);

  if (!hasWebGL) {
    return null; // Graceful fallback
  }

  const activeStation = stations[activeStationIndex] || stations[0];

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen bg-gradient-to-b from-white via-[#F8F9FB] to-white overflow-hidden select-none"
    >
      {/* 3D Canvas Scene */}
      <Canvas
        shadows
        camera={{
          fov: 46, // Comfortable viewing angle
          position: [0, 0.45, CAMERA_START_Z],
          near: 0.1,
          far: 120,
        }}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.05,
          outputColorSpace: THREE.SRGBColorSpace,
          powerPreference: "high-performance",
        }}
        className="!absolute inset-0 z-0"
      >
        <ShowroomWorld
          stations={stations}
          scrollProgressRef={scrollProgressRef}
          mousePosRef={mousePosRef}
          onActiveIndexChange={setActiveStationIndex}
          onOrderDirect={handleOrderDirect}
          currentCamZRef={currentCamZRef}
        />
      </Canvas>

      {/* Foreground HUD */}
      <ShowroomHUD
        activeStation={activeStation}
        activeIndex={activeStationIndex}
        totalStations={stations.length}
        scrollProgress={displayProgress}
        onQuickView={() => {}}
        onQuickAdd={() => {}}
      />

      {/* Quick View Modal */}
      <ShowroomQuickViewModal
        product={quickViewProduct}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />
    </section>
  );
}
