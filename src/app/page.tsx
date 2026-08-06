"use client";

import Link from "next/link";
import GlassNavbar from "@/components/layout/GlassNavbar";
import GlassFooter from "@/components/layout/GlassFooter";
import CartDrawer from "@/components/cart/CartDrawer";
import HeroSection from "@/components/hero/HeroSection";
import GlassesMarquee from "@/components/hero/GlassesMarquee";
import ScrollReveal from "@/components/animation/ScrollReveal";
import ProductCard from "@/components/product/ProductCard";
import ScrollShowroomWrapper from "@/components/showroom/ScrollShowroomWrapper";
import { RECORDING_GLASSES_PRODUCTS, RecordingGlassesProduct, GlassesVariant } from "@/data/products";
import { useCartStore } from "@/store/useCartStore";
import { Zap, Layers } from "lucide-react";

export default function LandingPage() {
  const { addItem } = useCartStore();

  const handleQuickAdd = (product: RecordingGlassesProduct, variant?: GlassesVariant) => {
    const targetVariant = variant || product.variants[0];
    addItem(product, targetVariant, product.storageOptions[0], product.lensOptions[0], 1);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-[#2563EB] selection:text-white relative">
      <GlassNavbar />
      <CartDrawer />

      {/* --- HERO SECTION WITH AUTO-SLIDING BACKGROUND IMAGES --- */}
      <HeroSection />

      {/* --- CONTINUOUS INFINITE GLASSES MARQUEE --- */}
      <GlassesMarquee />

      {/* --- PREMIUM 3D SCROLL-DRIVEN PRODUCT SHOWROOM --- */}
      <ScrollShowroomWrapper />

      {/* --- REDESIGNED 3D PRODUCT CARDS LINEUP SECTION --- */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/20 text-[#2563EB] text-xs font-semibold">
            <Layers size={14} />
            <span>Recording Glasses Lineup</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-gray-900">
            Choose Your Recording Style
          </h2>
          <p className="text-gray-600 text-base sm:text-lg">
            Explore our precision-crafted Smart Recording Glasses models designed for everyday comfort, outdoor action, or cinematic 4K capture.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {RECORDING_GLASSES_PRODUCTS.map((prod) => (
            <ProductCard
              key={prod.id}
              product={prod}
              onQuickAdd={(p, v) => handleQuickAdd(p, v)}
            />
          ))}
        </div>
      </section>

      {/* --- PROBLEM VS SOLUTION COMPARISON SECTION --- */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 bg-[#F8F9FB] rounded-3xl my-12 border border-gray-200/80">
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-gray-900">
            Why SpokenOdyssey Smart Glasses?
          </h2>
          <p className="text-gray-600 font-normal text-base sm:text-lg">
            Stop living life behind a smartphone screen. Capture spontaneous family moments, travels, and conversations naturally as you experience them.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Traditional Way */}
          <div className="bg-white p-8 rounded-3xl border border-gray-200 space-y-6 shadow-xs">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-600 text-xs font-semibold">
              <span>Traditional Phones & Cameras</span>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900">Distracted & Disconnected</h3>
            <ul className="space-y-4 text-sm text-gray-600 font-normal">
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">✕</span>
                <span>Forced to pull out your phone and miss being present in the moment.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">✕</span>
                <span>Awkward handheld recording obscures your field of view.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">✕</span>
                <span>Wind noise ruins audio quality; phone storage fills up quickly.</span>
              </li>
            </ul>
          </div>

          {/* SpokenOdyssey Smart Glasses Solution */}
          <div className="bg-white p-8 rounded-3xl border border-[#2563EB]/30 space-y-6 shadow-[0_10px_40px_rgba(37,99,235,0.08)]">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10B981]/10 border border-[#10B981]/30 text-[#10B981] text-xs font-semibold">
              <Zap size={14} />
              <span>SpokenOdyssey Smart Glasses</span>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900">100% Present & Hands-Free</h3>
            <ul className="space-y-4 text-sm text-gray-700 font-normal">
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-[#10B981]/15 text-[#10B981] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">✓</span>
                <span>Tap or use voice commands to record 4K video instantly while enjoying the view.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-[#10B981]/15 text-[#10B981] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">✓</span>
                <span>Dual beamforming microphones cancel background noise for crystal clear audio.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-[#10B981]/15 text-[#10B981] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">✓</span>
                <span>Instant wireless sync with SpokenOdyssey memory vault and family circle.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <GlassFooter />
    </div>
  );
}
