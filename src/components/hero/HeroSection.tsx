"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Video, Zap, ArrowRight } from "lucide-react";
import Link from "next/link";
import { RECORDING_GLASSES_PRODUCTS } from "@/data/products";
import { useCartStore } from "@/store/useCartStore";

const HERO_BACKGROUND_IMAGES = [
  {
    url: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1600&q=80",
    caption: "4K HDR Optics & Aerospace Titanium",
  },
  {
    url: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1600&q=80",
    caption: "Action Sport Shatterproof Polarized Edition",
  },
  {
    url: "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=1600&q=80",
    caption: "Open-Ear Acoustic Micro Drivers",
  },
  {
    url: "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=1600&q=80",
    caption: "Hands-Free Spontaneous Recording",
  },
  {
    url: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=1600&q=80",
    caption: "Instant AI Memory Vault Sync",
  },
];

export default function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const flagshipProduct = RECORDING_GLASSES_PRODUCTS[0];

  const { addItem } = useCartStore();

  // Auto-slide background image every 4 seconds (4000ms) for calm, luxurious motion
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_BACKGROUND_IMAGES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleQuickOrder = () => {
    addItem(
      flagshipProduct,
      flagshipProduct.variants[0],
      flagshipProduct.storageOptions[0],
      flagshipProduct.lensOptions[0],
      1
    );
  };

  return (
    <section className="relative min-h-[80vh] sm:min-h-[90vh] flex items-center justify-center overflow-hidden bg-white pt-28 pb-20">
      {/* Background Image Auto-Slider Carousel */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 0.88, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${HERO_BACKGROUND_IMAGES[currentImageIndex].url})` }}
          />
        </AnimatePresence>

        {/* Soft, Transparent Glass Overlay for Crisp High Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/75 via-white/55 to-white/90 z-10 pointer-events-none" />
        <div className="w-[600px] h-[600px] bg-[#2563EB]/15 rounded-full blur-[120px] absolute top-10 left-1/2 -translate-x-1/2 z-10 pointer-events-none" />
      </div>

      {/* Main Hero Content Overlay */}
      <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        {/* Top Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-md border border-gray-200 text-[#2563EB] text-xs font-semibold uppercase tracking-wider shadow-sm"
        >
          <Video size={14} />
          <span>Next-Gen Smart Recording Glasses</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 leading-[1.08]"
        >
          Capture Your Odyssey <br />
          <span className="gradient-text-electric">Hands-Free in 4K</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-xl text-gray-700 font-medium max-w-2xl mx-auto leading-relaxed bg-white/40 backdrop-blur-xs p-2 rounded-xl"
        >
          Experience life without a smartphone screen getting in the way. Ultra-lightweight 4K HDR camera, 3D spatial audio recording, and instant AI voice memory sync.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
        >
          <Link
            href="/product"
            className="glass-button-primary w-full sm:w-auto px-8 py-4 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#2563EB]/25 cursor-pointer"
          >
            <span>Configure & Order</span>
            <ArrowRight size={18} />
          </Link>

          <button
            onClick={handleQuickOrder}
            className="glass-button-secondary w-full sm:w-auto px-8 py-4 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer bg-white/90"
          >
            <Zap size={18} className="text-[#2563EB]" />
            <span>Quick Order (${flagshipProduct.basePrice})</span>
          </button>
        </motion.div>

        {/* Auto-Slide Image Progress Indicator Dots */}
        <div className="pt-6 flex flex-col items-center gap-2">
          <div className="flex items-center justify-center gap-2">
            {HERO_BACKGROUND_IMAGES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImageIndex(idx)}
                aria-label={`Jump to background image ${idx + 1}`}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  currentImageIndex === idx
                    ? "w-8 bg-[#2563EB]"
                    : "w-2 bg-gray-400 hover:bg-gray-600"
                }`}
              />
            ))}
          </div>
          <p className="text-xs text-gray-700 font-semibold tracking-wide bg-white/70 px-3 py-1 rounded-full border border-gray-200 shadow-xs">
            Live Preview • {HERO_BACKGROUND_IMAGES[currentImageIndex].caption}
          </p>
        </div>
      </div>
    </section>
  );
}
