"use client";

import { useState, useRef, MouseEvent as ReactMouseEvent, useEffect } from "react";
import { RecordingGlassesProduct, GlassesVariant } from "@/data/products";
import { Star, ShoppingBag, ArrowRight } from "lucide-react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";

interface ProductCardProps {
  product: RecordingGlassesProduct;
  onQuickAdd: (product: RecordingGlassesProduct, variant: GlassesVariant) => void;
}

export default function ProductCard({ product, onQuickAdd }: ProductCardProps) {
  const [selectedVariant, setSelectedVariant] = useState<GlassesVariant>(product.variants[0]);
  
  const angles = ["hero", "front", "side", "lifestyle"] as const;
  const [activeAngleIndex, setActiveAngleIndex] = useState(0);
  const activeAngle = angles[activeAngleIndex];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveAngleIndex((prev) => (prev + 1) % angles.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // --- 3D Tilt Physics ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring physics for natural feel (not linear)
  const springConfig = { stiffness: 150, damping: 15, mass: 0.5 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig);

  // Dynamic shadow movement follows tilt
  const shadowX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), springConfig);
  const shadowY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-15, 15]), springConfig);

  // Reflection sweep position follows mouse
  const reflectionX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-120, 120]), { stiffness: 80, damping: 20 });

  const handleMouseMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        transformPerspective: 1200,
      }}
      whileTap={{ scale: 0.985 }}
      className="relative rounded-3xl overflow-hidden cursor-pointer"
    >
      {/* Dynamic Shadow Layer */}
      <motion.div
        style={{
          x: shadowX,
          y: shadowY,
        }}
        className="absolute -inset-2 rounded-3xl -z-10 transition-opacity duration-300"
        animate={{
          boxShadow: isHovered
            ? "0 25px 60px rgba(37, 99, 235, 0.15), 0 10px 25px rgba(0, 0, 0, 0.06)"
            : "0 4px 20px rgba(0, 0, 0, 0.04)",
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Main Card Body */}
      <div className={`bg-white rounded-3xl border overflow-hidden flex flex-col transition-colors duration-300 ${isHovered ? "border-[#2563EB]/30" : "border-gray-200"}`}>
        {/* Lens Reflection Sweep */}
        <motion.div
          style={{ x: reflectionX }}
          className="absolute inset-0 z-30 pointer-events-none"
        >
          <div className="w-32 h-full bg-gradient-to-r from-transparent via-white/25 to-transparent" />
        </motion.div>

        {/* Border Glow on Hover */}
        <motion.div
          animate={{
            opacity: isHovered ? 1 : 0,
            boxShadow: isHovered ? "inset 0 0 0 1.5px rgba(37, 99, 235, 0.25)" : "inset 0 0 0 0px transparent",
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 rounded-3xl z-20 pointer-events-none"
        />

        {/* --- Image Container --- */}
        <div className="relative w-full aspect-[4/3] bg-gradient-to-b from-[#F8F9FB] to-[#F1F3F5] overflow-hidden">
          {/* Badge */}
          <div className="absolute top-4 left-4 z-10">
            <motion.span
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-gray-200/80 text-gray-900 text-[11px] font-semibold shadow-sm"
            >
              {product.badge}
            </motion.span>
          </div>

          {/* Product Image Slider */}
          <motion.div 
            className="flex w-full h-full"
            animate={{ x: `-${activeAngleIndex * 100}%` }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
          >
            {angles.map((angle) => (
              <div key={`${product.id}-${selectedVariant.id}-${angle}`} className="w-full h-full flex-shrink-0">
                <img
                  src={product.images[angle]}
                  alt={`${product.name} - ${angle}`}
                  className="w-full h-full object-cover object-center pointer-events-none select-none"
                />
              </div>
            ))}
          </motion.div>

          {/* Hover: subtle parallax image shift */}
          <motion.div
            style={{
              x: useTransform(mouseX, [-0.5, 0.5], [-6, 6]),
              y: useTransform(mouseY, [-0.5, 0.5], [-4, 4]),
            }}
            className="absolute inset-0 pointer-events-none"
          />

        </div>

        {/* --- Product Details --- */}
        <div className="p-6 space-y-4 flex-1 flex flex-col justify-between" style={{ transform: "translateZ(20px)" }}>
          {/* Rating + Weight */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-600 flex items-center gap-1">
              <Star size={13} className="fill-[#F59E0B] text-[#F59E0B]" />
              {product.rating} <span className="text-gray-400">({product.reviewsCount})</span>
            </span>
            <span className="text-[11px] text-gray-400 font-medium">{product.specs.weight}</span>
          </div>

          {/* Product Name */}
          <h3 className={`text-lg font-bold leading-snug transition-colors duration-200 ${isHovered ? "text-[#2563EB]" : "text-gray-900"}`}>
            {product.name}
          </h3>

          {/* Description */}
          <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          {/* Divider */}
          <div className="border-t border-gray-100" />

          {/* Pricing + Actions */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-gray-900">${product.basePrice}</span>
              <span className="text-xs text-gray-400 line-through">${product.originalPrice}</span>
            </div>

            <div className="flex items-center gap-2">
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  onQuickAdd(product, selectedVariant);
                }}
                whileHover={{ scale: 1.04, y: -1 }}
                whileTap={{ scale: 0.96 }}
                className="glass-button-primary px-4 py-2.5 rounded-xl text-xs font-semibold cursor-pointer flex items-center gap-1.5"
              >
                <ShoppingBag size={13} />
                Add
              </motion.button>

              <Link href={`/product`}>
                <motion.div
                  whileHover={{ scale: 1.04, y: -1 }}
                  whileTap={{ scale: 0.96 }}
                  className="p-2.5 rounded-xl bg-gray-100 border border-gray-200 text-gray-600 hover:text-[#2563EB] hover:border-[#2563EB]/30 transition-colors cursor-pointer"
                >
                  <ArrowRight size={14} />
                </motion.div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
