"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, ShoppingBag, Eye, Zap, Shield, Battery, Radio, Sparkles } from "lucide-react";
import { RecordingGlassesProduct, GlassesVariant, GlassesStorage, GlassesLens } from "@/data/products";
import { useCartStore } from "@/store/useCartStore";
import Image from "next/image";

interface ShowroomQuickViewModalProps {
  product: RecordingGlassesProduct | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ShowroomQuickViewModal({
  product,
  isOpen,
  onClose,
}: ShowroomQuickViewModalProps) {
  const { addItem } = useCartStore();
  const [selectedVariant, setSelectedVariant] = useState<GlassesVariant | null>(null);
  const [selectedStorage, setSelectedStorage] = useState<GlassesStorage | null>(null);
  const [selectedLens, setSelectedLens] = useState<GlassesLens | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [addedAnimation, setAddedAnimation] = useState(false);

  // Initialize selections when product changes
  React.useEffect(() => {
    if (product) {
      setSelectedVariant(product.variants[0]);
      setSelectedStorage(product.storageOptions[0]);
      setSelectedLens(product.lensOptions[0]);
      setActiveImageIndex(0);
    }
  }, [product]);

  if (!product || !isOpen) return null;

  const currentVariant = selectedVariant || product.variants[0];
  const currentStorage = selectedStorage || product.storageOptions[0];
  const currentLens = selectedLens || product.lensOptions[0];

  const currentPrice =
    product.basePrice + (currentStorage?.priceAdd || 0) + (currentLens?.priceAdd || 0);

  const galleryImages = [
    product.images.hero,
    product.images.front,
    product.images.side,
    product.images.lifestyle,
    product.images.angle3D,
  ];

  const handleAddToCart = () => {
    addItem(product, currentVariant, currentStorage, currentLens, 1);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      onClose();
    }, 900);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          className="fixed inset-0 bg-gray-900/60 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
          className="relative w-full max-w-4xl bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/60 overflow-hidden z-10 my-auto"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 z-20 p-2.5 rounded-full bg-gray-100/80 hover:bg-gray-200 text-gray-600 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 sm:p-8 md:p-10">
            {/* Left Column: Interactive Visuals */}
            <div className="flex flex-col space-y-4">
              {/* Main Image Stage */}
              <div className="relative aspect-4/3 w-full bg-gradient-to-b from-gray-50 to-gray-100 rounded-2xl overflow-hidden border border-gray-200/80 shadow-inner group">
                <Image
                  src={galleryImages[activeImageIndex] || product.images.hero}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-[#2563EB] border border-gray-200 shadow-sm">
                  {product.badge}
                </div>
              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-5 gap-2">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                      activeImageIndex === idx
                        ? "border-[#2563EB] shadow-md scale-102"
                        : "border-gray-200/80 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`View ${idx + 1}`}
                      fill
                      sizes="80px"
                      className="object-cover object-center"
                    />
                  </button>
                ))}
              </div>

              {/* Quick Spec Highlights */}
              <div className="grid grid-cols-3 gap-2 pt-2 text-center">
                <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-200/60">
                  <span className="block text-[10px] uppercase font-bold text-gray-600 tracking-wider">Video</span>
                  <span className="text-xs font-semibold text-gray-900">{product.specs.videoResolution.split(" ")[0]}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-200/60">
                  <span className="block text-[10px] uppercase font-bold text-gray-600 tracking-wider">Battery</span>
                  <span className="text-xs font-semibold text-gray-900">{product.specs.battery.split(" ")[0]} hrs</span>
                </div>
                <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-200/60">
                  <span className="block text-[10px] uppercase font-bold text-gray-600 tracking-wider">Weight</span>
                  <span className="text-xs font-semibold text-gray-900">{product.specs.weight.split(" ")[0]}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Configuration & Add to Cart */}
            <div className="flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                    {product.name}
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1 font-medium">
                    {product.tagline}
                  </p>
                </div>

                {/* Price Display */}
                <div className="flex items-baseline gap-3 py-2 border-b border-gray-100">
                  <span className="text-3xl font-extrabold text-gray-900">${currentPrice}</span>
                  <span className="text-sm text-gray-400 line-through">${product.originalPrice}</span>
                  <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-600 text-xs font-semibold">
                    Save ${product.originalPrice - currentPrice}
                  </span>
                </div>

                {/* Color Variants */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                    Finish: <span className="text-gray-900 font-semibold">{currentVariant.name}</span>
                  </label>
                  <div className="flex items-center gap-3">
                    {product.variants.map((v) => (
                      <button
                        key={v.id}
                        onClick={() => setSelectedVariant(v)}
                        className={`group flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                          currentVariant.id === v.id
                            ? "border-[#2563EB] bg-[#2563EB]/5 text-[#2563EB] shadow-sm ring-2 ring-[#2563EB]/20"
                            : "border-gray-200 hover:border-gray-300 text-gray-700"
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-black/10 shadow-sm"
                          style={{ backgroundColor: v.colorHex }}
                        />
                        <span>{v.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Storage Selector */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                    Storage Capacity
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {product.storageOptions.map((st) => (
                      <button
                        key={st.id}
                        onClick={() => setSelectedStorage(st)}
                        className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                          currentStorage.id === st.id
                            ? "border-[#2563EB] bg-[#2563EB]/5 text-[#2563EB] shadow-sm"
                            : "border-gray-200 hover:border-gray-300 text-gray-700"
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold">{st.size}</span>
                          <span className="text-[10px] font-semibold text-gray-500">
                            {st.priceAdd === 0 ? "Included" : `+$${st.priceAdd}`}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Lens Selection */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                    Lens Configuration
                  </label>
                  <div className="space-y-1.5">
                    {product.lensOptions.map((lens) => (
                      <button
                        key={lens.id}
                        onClick={() => setSelectedLens(lens)}
                        className={`w-full p-2.5 rounded-xl border text-left flex justify-between items-center transition-all cursor-pointer ${
                          currentLens.id === lens.id
                            ? "border-[#2563EB] bg-[#2563EB]/5 text-[#2563EB] shadow-sm"
                            : "border-gray-200 hover:border-gray-300 text-gray-700"
                        }`}
                      >
                        <div className="flex flex-col">
                          <span className="text-xs font-bold">{lens.name}</span>
                          <span className="text-[10px] text-gray-500">{lens.type}</span>
                        </div>
                        <span className="text-xs font-semibold text-gray-500">
                          {lens.priceAdd === 0 ? "Included" : `+$${lens.priceAdd}`}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-gray-100 flex items-center gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={addedAnimation}
                  className={`flex-1 py-3.5 px-6 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer active:scale-98 ${
                    addedAnimation
                      ? "bg-emerald-600 text-white shadow-emerald-500/25"
                      : "bg-[#2563EB] hover:bg-[#1D4ED8] text-white shadow-[#2563EB]/25 hover:shadow-xl hover:shadow-[#2563EB]/35"
                  }`}
                >
                  {addedAnimation ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Bag!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Bag • ${currentPrice}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
