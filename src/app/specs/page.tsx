"use client";

import GlassNavbar from "@/components/layout/GlassNavbar";
import GlassFooter from "@/components/layout/GlassFooter";
import CartDrawer from "@/components/cart/CartDrawer";
import ScrollReveal from "@/components/animation/ScrollReveal";
import { RECORDING_GLASSES_PRODUCTS } from "@/data/products";

export default function SpecsPage() {
  const flagshipProduct = RECORDING_GLASSES_PRODUCTS[0];

  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-[#2563EB] selection:text-white relative pt-24">
      <GlassNavbar />
      <CartDrawer />
      
      {/* --- TECHNICAL SPECIFICATIONS GRID --- */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 bg-[#F8F9FB] rounded-3xl my-12 border border-gray-200">
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

      <GlassFooter />
    </div>
  );
}
