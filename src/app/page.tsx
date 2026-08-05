"use client";

import { useState } from "react";
import Link from "next/link";
import GlassNavbar from "@/components/layout/GlassNavbar";
import GlassFooter from "@/components/layout/GlassFooter";
import CartDrawer from "@/components/cart/CartDrawer";
import HeroGlassesCanvas from "@/components/animation/HeroGlassesCanvas";
import ScrollReveal from "@/components/animation/ScrollReveal";
import ProductCard from "@/components/product/ProductCard";
import PinnedScrollStory from "@/components/story/PinnedScrollStory";
import { RECORDING_GLASSES_PRODUCTS, RecordingGlassesProduct, GlassesVariant } from "@/data/products";
import { useCartStore } from "@/store/useCartStore";
import {
  Video,
  Zap,
  Check,
  Star,
  Plus,
  Minus,
  HelpCircle,
  Eye,
  Layers,
  ArrowRight,
  ShieldCheck,
  Cpu,
} from "lucide-react";
import { motion } from "framer-motion";

export default function LandingPage() {
  const flagshipProduct = RECORDING_GLASSES_PRODUCTS[0];
  const [selectedHeroColor, setSelectedHeroColor] = useState(flagshipProduct.variants[0]);
  const [activeHotspotId, setActiveHotspotId] = useState<string | null>(flagshipProduct.hardwareHotspots[0].id);
  const [activeSpecTab, setActiveSpecTab] = useState<"optics" | "audio" | "battery" | "connectivity">("optics");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const { addItem } = useCartStore();

  const handleQuickAdd = (product: RecordingGlassesProduct, variant?: GlassesVariant) => {
    const targetVariant = variant || product.variants[0];
    addItem(product, targetVariant, product.storageOptions[0], product.lensOptions[0], 1);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-[#2563EB] selection:text-white relative">
      <GlassNavbar />
      <CartDrawer />

      {/* Ambient Soft Light Blobs */}
      <div className="w-[650px] h-[650px] bg-[#2563EB]/5 rounded-full blur-[150px] absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none" />
      <div className="w-[500px] h-[500px] bg-[#06B6D4]/5 rounded-full blur-[140px] absolute top-[35%] right-0 pointer-events-none" />

      {/* --- CINEMATIC 100VH+ HERO SECTION --- */}
      <section className="relative min-h-screen pt-32 pb-20 md:pt-40 md:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Hero Left Content */}
        <ScrollReveal className="flex-1 space-y-6 text-center lg:text-left z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/20 text-[#2563EB] text-xs font-semibold tracking-wider uppercase shadow-xs">
            <Video size={14} />
            <span>Next-Gen Smart Recording Glasses</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08] text-gray-900">
            Capture Your Odyssey <br className="hidden sm:inline" />
            <span className="gradient-text-electric">Hands-Free in 4K</span>
          </h1>

          <p className="text-base sm:text-xl text-gray-600 font-normal max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            Record life's precious moments as you see them. Ultra-lightweight 4K HDR video camera, 3D spatial audio recording, and instant AI memory sync.
          </p>

          {/* Color Switcher Pills */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Select Finish:</span>
            <div className="flex items-center gap-2 p-1.5 rounded-full bg-gray-100 border border-gray-200">
              {flagshipProduct.variants.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setSelectedHeroColor(v)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    selectedHeroColor.id === v.id
                      ? "bg-[#2563EB] text-white shadow-md shadow-[#2563EB]/30"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <span className="w-3.5 h-3.5 rounded-full border border-gray-300 shadow-xs" style={{ backgroundColor: v.colorHex }} />
                  <span>{v.colorName}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <Link
              href="/product"
              className="glass-button-primary w-full sm:w-auto px-8 py-4 rounded-2xl font-semibold text-sm tracking-wide flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#2563EB]/25"
            >
              <span>Configure & Order</span>
              <ArrowRight size={18} />
            </Link>

            <button
              onClick={() => handleQuickAdd(flagshipProduct, selectedHeroColor)}
              className="glass-button-secondary w-full sm:w-auto px-8 py-4 rounded-2xl font-medium text-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <Zap size={18} className="text-[#2563EB]" />
              <span>Quick Order ($349)</span>
            </button>
          </div>

          {/* Trust Badges */}
          <div className="pt-6 flex items-center justify-center lg:justify-start gap-6 text-xs text-gray-500 font-medium">
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={16} className="text-[#10B981]" /> 30-Day Guarantee
            </span>
            <span className="flex items-center gap-1.5">
              <Check size={16} className="text-[#10B981]" /> Free 3-Day Shipping
            </span>
            <span className="flex items-center gap-1.5">
              <Star size={16} className="text-[#F59E0B] fill-[#F59E0B]" /> 4.9/5 (1.2k+ Reviews)
            </span>
          </div>
        </ScrollReveal>

        {/* Hero Right Interactive 3D Canvas with Mouse Parallax */}
        <div className="flex-1 w-full relative z-10">
          <div className="glass-card-light p-4 rounded-3xl relative overflow-hidden group shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-200">
            <HeroGlassesCanvas colorHex={selectedHeroColor.colorHex} />
          </div>
        </div>
      </section>

      {/* --- PINNED HARDWARE STORYTELLING EXPERIENCE --- */}
      <PinnedScrollStory />

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

      {/* --- INTERACTIVE HARDWARE HOTSPOTS SECTION --- */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/20 text-[#2563EB] text-xs font-semibold">
            <Eye size={14} />
            <span>Precision Hardware</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-gray-900">
            Explore the Hardware Innovations
          </h2>
          <p className="text-gray-600 text-base sm:text-lg">
            Tap any hotspot on the Smart Glasses frame to discover high-performance optics, acoustics, and privacy features.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* Glasses Visual Container */}
          <div className="lg:col-span-2 bg-[#F8F9FB] p-6 sm:p-10 rounded-3xl border border-gray-200 relative min-h-[350px] sm:min-h-[450px] flex items-center justify-center overflow-hidden">
            <img
              src={flagshipProduct.images.hero}
              alt="Smart Glasses Hardware Breakdown"
              className="max-h-[320px] w-auto object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.08)]"
            />

            {/* Hotspot Markers */}
            {flagshipProduct.hardwareHotspots.map((spot) => (
              <button
                key={spot.id}
                onClick={() => setActiveHotspotId(spot.id)}
                style={{ top: `${spot.y}%`, left: `${spot.x}%` }}
                className={`absolute w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                  activeHotspotId === spot.id
                    ? "bg-[#2563EB] text-white scale-125 shadow-lg shadow-[#2563EB]/40 ring-4 ring-[#2563EB]/20 z-20"
                    : "bg-white text-gray-700 border border-gray-300 hover:scale-110 shadow-md z-10"
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#2563EB] animate-ping" />
              </button>
            ))}
          </div>

          {/* Hotspot Detail Card */}
          <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6">
            {activeHotspotId && (
              <>
                {(() => {
                  const currentSpot = flagshipProduct.hardwareHotspots.find((h) => h.id === activeHotspotId);
                  if (!currentSpot) return null;
                  return (
                    <motion.div
                      key={currentSpot.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-[#2563EB]/10 border border-[#2563EB]/20 flex items-center justify-center text-[#2563EB]">
                        <Cpu size={22} />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">{currentSpot.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed font-normal">
                        {currentSpot.description}
                      </p>
                      <div className="pt-4 border-t border-gray-100 flex items-center gap-2 text-xs font-semibold text-[#2563EB]">
                        <Check size={16} /> Integrated into all SpokenOdyssey Recording Glasses
                      </div>
                    </motion.div>
                  );
                })()}
              </>
            )}
          </div>
        </div>
      </section>

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {RECORDING_GLASSES_PRODUCTS.map((prod) => (
            <ProductCard
              key={prod.id}
              product={prod}
              onQuickAdd={(p, v) => handleQuickAdd(p, v)}
            />
          ))}
        </div>
      </section>

      {/* --- TECHNICAL SPECIFICATIONS GRID --- */}
      <section id="specs" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 bg-[#F8F9FB] rounded-3xl my-12 border border-gray-200">
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-gray-900">
            Technical Specifications
          </h2>
          <p className="text-gray-600 text-base sm:text-lg">
            Built with aerospace titanium, Sony 4K optics, and custom spatial audio micro-processors.
          </p>
        </ScrollReveal>

        <div className="bg-white p-8 rounded-3xl border border-gray-200 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 shadow-xs">
          <div className="p-4 rounded-2xl bg-[#F8F9FB] border border-gray-200 space-y-1.5">
            <span className="text-xs text-[#2563EB] font-semibold uppercase tracking-wider">Video Camera Sensor</span>
            <p className="font-bold text-gray-900 text-base">{flagshipProduct.specs.videoResolution}</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#F8F9FB] border border-gray-200 space-y-1.5">
            <span className="text-xs text-[#2563EB] font-semibold uppercase tracking-wider">Spatial Audio & Mics</span>
            <p className="font-bold text-gray-900 text-base">{flagshipProduct.specs.audio}</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#F8F9FB] border border-gray-200 space-y-1.5">
            <span className="text-xs text-[#2563EB] font-semibold uppercase tracking-wider">Battery Stamina</span>
            <p className="font-bold text-gray-900 text-base">{flagshipProduct.specs.battery}</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#F8F9FB] border border-gray-200 space-y-1.5">
            <span className="text-xs text-[#2563EB] font-semibold uppercase tracking-wider">Frame Weight & Material</span>
            <p className="font-bold text-gray-900 text-base">{flagshipProduct.specs.weight}</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#F8F9FB] border border-gray-200 space-y-1.5">
            <span className="text-xs text-[#2563EB] font-semibold uppercase tracking-wider">Wireless Protocol</span>
            <p className="font-bold text-gray-900 text-base">{flagshipProduct.specs.connectivity}</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#F8F9FB] border border-gray-200 space-y-1.5">
            <span className="text-xs text-[#2563EB] font-semibold uppercase tracking-wider">Environmental Rating</span>
            <p className="font-bold text-gray-900 text-base">{flagshipProduct.specs.waterResistance}</p>
          </div>
        </div>
      </section>

      {/* --- FAQ ACCORDION SECTION --- */}
      <section id="faq" className="py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto relative z-10">
        <ScrollReveal className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/20 text-[#2563EB] text-xs font-semibold">
            <HelpCircle size={14} />
            <span>Questions & Answers</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-gray-900">
            Frequently Asked Questions
          </h2>
        </ScrollReveal>

        <div className="space-y-4">
          {[
            {
              q: "How does the privacy LED indicator work?",
              a: "An automated LED indicator light shines visibly on the front frame whenever video or audio recording is active. It cannot be tampered with or disabled via software, ensuring 100% privacy compliance in public places.",
            },
            {
              q: "Can I use prescription lenses with SpokenOdyssey Smart Glasses?",
              a: "Yes! All SpokenOdyssey glasses frames feature standard lens mounting slots compatible with any local optometrist or optical provider.",
            },
            {
              q: "How do recordings sync with my SpokenOdyssey Memory Vault?",
              a: "The glasses pair via Wi-Fi 6 / Bluetooth 5.3 to your phone. When connected, new recordings automatically sync securely with your private SpokenOdyssey memory vault and family circle.",
            },
            {
              q: "What is the return policy and warranty?",
              a: "Every pair comes with a 30-Day Money-Back Guarantee and a 2-Year Replacement Warranty covering hardware and battery replacements.",
            },
          ].map((faq, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs"
            >
              <button
                onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                className="w-full p-6 text-left font-bold text-base text-gray-900 flex items-center justify-between cursor-pointer hover:text-[#2563EB] transition"
              >
                <span>{faq.q}</span>
                <span className="p-1.5 rounded-full bg-gray-100 text-gray-600">
                  {openFaqIndex === idx ? <Minus size={16} /> : <Plus size={16} />}
                </span>
              </button>
              {openFaqIndex === idx && (
                <div className="px-6 pb-6 text-sm text-gray-600 font-normal border-t border-gray-100 pt-4 leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Sticky Bottom Pre-Order Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-white/90 backdrop-blur-xl border-t border-gray-200 py-3 px-4 sm:px-6 shadow-[0_-4px_25px_rgba(0,0,0,0.05)]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-ping hidden sm:inline" />
            <div>
              <p className="font-bold text-xs sm:text-sm text-gray-900">{flagshipProduct.name}</p>
              <p className="text-[11px] text-gray-500 font-medium hidden sm:block">In Stock • Ships within 24 hours</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-bold text-lg sm:text-xl text-gray-900">${flagshipProduct.basePrice}</span>
            <Link
              href="/product"
              className="glass-button-primary px-6 py-2.5 rounded-xl text-xs font-semibold cursor-pointer"
            >
              Order Now
            </Link>
          </div>
        </div>
      </div>

      <GlassFooter />
    </div>
  );
}
