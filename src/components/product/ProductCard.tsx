"use client";

import { useState } from "react";
import { RecordingGlassesProduct, GlassesVariant } from "@/data/products";
import { Star, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ProductCardProps {
  product: RecordingGlassesProduct;
  onQuickAdd: (product: RecordingGlassesProduct, variant: GlassesVariant) => void;
  onSelectProduct?: (product: RecordingGlassesProduct) => void;
}

export default function ProductCard({ product, onQuickAdd }: ProductCardProps) {
  const [selectedVariant, setSelectedVariant] = useState<GlassesVariant>(product.variants[0]);
  const [activeAngle, setActiveAngle] = useState<"hero" | "front" | "side" | "lifestyle">("hero");

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.015 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="bg-white rounded-3xl border border-gray-200/90 overflow-hidden flex flex-col justify-between group shadow-[0_4px_25px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(37,99,235,0.12)] hover:border-[#2563EB]/40 relative transition-all duration-300"
    >
      {/* Light Reflection Sweep Effect on Hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none z-20" />

      {/* Media Container - Fully Covered Image Box (Zero awkward empty spacing!) */}
      <div className="relative w-full h-64 sm:h-72 bg-[#F8F9FB] border-b border-gray-100 overflow-hidden flex items-center justify-center">
        {/* Badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-gray-200 text-gray-900 text-xs font-semibold shadow-xs">
            {product.badge}
          </span>
        </div>

        {/* Fully Covered Product Image */}
        <AnimatePresence mode="wait">
          <motion.img
            key={`${product.id}-${selectedVariant.id}-${activeAngle}`}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.3 }}
            src={product.images[activeAngle]}
            alt={`${product.name} - ${selectedVariant.colorName}`}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
        </AnimatePresence>

        {/* Thumbnail Angle Selectors Bar */}
        <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-center gap-1.5 p-1.5 rounded-full bg-white/80 backdrop-blur-md border border-gray-200 shadow-xs">
          {[
            { key: "hero", label: "Angle" },
            { key: "front", label: "Front" },
            { key: "side", label: "Temple" },
            { key: "lifestyle", label: "Wear" },
          ].map((angle) => (
            <button
              key={angle.key}
              onClick={() => setActiveAngle(angle.key as any)}
              className={`text-[10px] font-semibold px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                activeAngle === angle.key
                  ? "bg-[#2563EB] text-white shadow-xs"
                  : "text-gray-700 hover:text-gray-900"
              }`}
            >
              {angle.label}
            </button>
          ))}
        </div>
      </div>

      {/* Product Details & Variant Swatches */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-700 flex items-center gap-1">
              <Star size={14} className="fill-[#F59E0B] text-[#F59E0B]" /> {product.rating} ({product.reviewsCount})
            </span>
            <span className="text-xs text-gray-500 font-medium">{product.specs.weight}</span>
          </div>

          <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#2563EB] transition-colors leading-snug">
            {product.name}
          </h3>

          <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed font-normal">
            {product.description}
          </p>

          {/* Color Finish Swatches */}
          <div className="pt-1 flex items-center gap-2">
            <span className="text-[11px] font-semibold text-gray-500 uppercase">Finish:</span>
            <div className="flex gap-1.5">
              {product.variants.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setSelectedVariant(v)}
                  title={v.colorName}
                  className={`w-5 h-5 rounded-full border transition-all cursor-pointer ${
                    selectedVariant.id === v.id
                      ? "ring-2 ring-[#2563EB] ring-offset-1 border-white"
                      : "border-gray-300 opacity-70 hover:opacity-100"
                  }`}
                  style={{ backgroundColor: v.colorHex }}
                />
              ))}
            </div>
            <span className="text-xs font-semibold text-gray-800 ml-1">{selectedVariant.colorName}</span>
          </div>
        </div>

        {/* Pricing & Add to Bag Actions */}
        <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-400 line-through mr-2">${product.originalPrice}</span>
            <span className="text-2xl font-bold text-gray-900">${product.basePrice}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onQuickAdd(product, selectedVariant)}
              className="glass-button-primary px-4 py-2.5 rounded-xl text-xs font-semibold cursor-pointer flex items-center gap-1.5"
            >
              <ShoppingBag size={14} />
              <span>Add to Bag</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
