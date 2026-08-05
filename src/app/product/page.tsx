"use client";

import { useState } from "react";
import GlassNavbar from "@/components/layout/GlassNavbar";
import GlassFooter from "@/components/layout/GlassFooter";
import CartDrawer from "@/components/cart/CartDrawer";
import { RECORDING_GLASSES_PRODUCTS, RecordingGlassesProduct, GlassesVariant, GlassesStorage, GlassesLens } from "@/data/products";
import { useCartStore } from "@/store/useCartStore";
import { Check, Package, ArrowRight, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function ProductCustomizerPage() {
  const router = useRouter();
  const [selectedProduct, setSelectedProduct] = useState<RecordingGlassesProduct>(RECORDING_GLASSES_PRODUCTS[0]);
  const [selectedVariant, setSelectedVariant] = useState<GlassesVariant>(RECORDING_GLASSES_PRODUCTS[0].variants[0]);
  const [selectedStorage, setSelectedStorage] = useState<GlassesStorage>(RECORDING_GLASSES_PRODUCTS[0].storageOptions[0]);
  const [selectedLens, setSelectedLens] = useState<GlassesLens>(RECORDING_GLASSES_PRODUCTS[0].lensOptions[0]);
  const [activeImageKey, setActiveImageKey] = useState<"hero" | "front" | "side" | "lifestyle">("hero");

  const { addItem } = useCartStore();

  const handleProductChange = (prod: RecordingGlassesProduct) => {
    setSelectedProduct(prod);
    setSelectedVariant(prod.variants[0]);
    setSelectedStorage(prod.storageOptions[0]);
    setSelectedLens(prod.lensOptions[0]);
    setActiveImageKey("hero");
  };

  const calculatedTotalPrice = selectedProduct.basePrice + selectedStorage.priceAdd + selectedLens.priceAdd;

  const handleAddToCart = () => {
    addItem(selectedProduct, selectedVariant, selectedStorage, selectedLens, 1);
  };

  const handleBuyNow = () => {
    addItem(selectedProduct, selectedVariant, selectedStorage, selectedLens, 1);
    router.push("/checkout");
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 relative">
      <GlassNavbar />
      <CartDrawer />

      {/* Background Ambient Glow */}
      <div className="w-[500px] h-[500px] bg-[#2563EB]/5 rounded-full blur-[140px] absolute top-20 right-0 pointer-events-none" />

      <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#2563EB]">Interactive Customizer</span>
          <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 tracking-tight mt-1">Configure Your Smart Glasses</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Image Gallery Viewer */}
          <div className="lg:col-span-7 space-y-6 lg:sticky lg:top-28">
            <div className="bg-[#F8F9FB] p-6 sm:p-10 rounded-3xl border border-gray-200 relative overflow-hidden flex items-center justify-center min-h-[380px] sm:min-h-[480px]">
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white border border-gray-200 text-gray-800 text-xs font-semibold shadow-xs">
                {selectedVariant.colorName}
              </span>

              <motion.img
                key={`${selectedProduct.id}-${selectedVariant.id}-${activeImageKey}`}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                src={selectedProduct.images[activeImageKey]}
                alt={selectedProduct.name}
                className="max-h-[360px] w-auto object-contain drop-shadow-[0_15px_35px_rgba(0,0,0,0.08)]"
              />
            </div>

            {/* Thumbnail Angle Selectors */}
            <div className="grid grid-cols-4 gap-4">
              {[
                { key: "hero", label: "Angle" },
                { key: "front", label: "Front" },
                { key: "side", label: "Temple" },
                { key: "lifestyle", label: "Wear" },
              ].map((thumb) => (
                <button
                  key={thumb.key}
                  onClick={() => setActiveImageKey(thumb.key as any)}
                  className={`p-2 rounded-2xl border transition-all cursor-pointer overflow-hidden bg-white ${
                    activeImageKey === thumb.key
                      ? "border-[#2563EB] ring-2 ring-[#2563EB]/20 shadow-xs"
                      : "border-gray-200 opacity-60 hover:opacity-100"
                  }`}
                >
                  <img
                    src={selectedProduct.images[thumb.key as keyof typeof selectedProduct.images]}
                    alt={thumb.label}
                    className="h-14 w-full object-cover rounded-xl"
                  />
                  <span className="block text-[10px] font-semibold text-center mt-1 text-gray-700 uppercase">{thumb.label}</span>
                </button>
              ))}
            </div>

            {/* Included Accessories */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 space-y-3 shadow-xs">
              <h4 className="font-semibold text-xs text-gray-900 uppercase tracking-wider flex items-center gap-2">
                <Package size={14} className="text-[#2563EB]" /> Included Accessories
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 font-normal">
                <span className="flex items-center gap-1.5"><Check size={14} className="text-[#10B981]" /> SpokenOdyssey Glasses</span>
                <span className="flex items-center gap-1.5"><Check size={14} className="text-[#10B981]" /> Magnetic Fast Charging Case</span>
                <span className="flex items-center gap-1.5"><Check size={14} className="text-[#10B981]" /> Microfiber Cloth</span>
                <span className="flex items-center gap-1.5"><Check size={14} className="text-[#10B981]" /> USB-C Braided Cable</span>
              </div>
            </div>
          </div>

          {/* Right Column: Customizer Selector */}
          <div className="lg:col-span-5 space-y-8">
            {/* Step 1: Model Selection */}
            <div className="space-y-3">
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700">
                1. Select Glasses Model
              </label>
              <div className="grid grid-cols-1 gap-3">
                {RECORDING_GLASSES_PRODUCTS.map((prod) => (
                  <button
                    key={prod.id}
                    onClick={() => handleProductChange(prod)}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between bg-white ${
                      selectedProduct.id === prod.id
                        ? "border-[#2563EB] bg-[#2563EB]/5 shadow-xs"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div>
                      <span className="font-bold text-sm text-gray-900 block">{prod.name}</span>
                      <span className="text-xs text-gray-500 font-normal">{prod.specs.videoResolution}</span>
                    </div>
                    <span className="font-bold text-sm text-[#2563EB]">${prod.basePrice}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Color Variant Selection */}
            <div className="space-y-3">
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700">
                2. Select Finish: <span className="text-gray-900 font-bold">{selectedVariant.colorName}</span>
              </label>
              <div className="flex gap-3">
                {selectedProduct.variants.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVariant(v)}
                    className={`flex-1 p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center gap-2 bg-white ${
                      selectedVariant.id === v.id
                        ? "border-[#2563EB] bg-[#2563EB]/5 ring-2 ring-[#2563EB]/20"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <span className="w-6 h-6 rounded-full border border-gray-300 shadow-xs" style={{ backgroundColor: v.colorHex }} />
                    <span className="text-xs font-semibold text-gray-800">{v.colorName}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Storage Selection */}
            <div className="space-y-3">
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700">
                3. Storage Capacity
              </label>
              <div className="grid grid-cols-1 gap-2.5">
                {selectedProduct.storageOptions.map((st) => (
                  <button
                    key={st.id}
                    onClick={() => setSelectedStorage(st)}
                    className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between bg-white ${
                      selectedStorage.id === st.id
                        ? "border-[#2563EB] bg-[#2563EB]/5 text-gray-900"
                        : "border-gray-200 text-gray-600 hover:border-gray-300"
                    }`}
                  >
                    <div>
                      <span className="font-bold text-xs text-gray-900 block">{st.size}</span>
                      <span className="text-[11px] text-gray-500 font-normal">{st.description}</span>
                    </div>
                    <span className="text-xs font-semibold text-[#2563EB]">
                      {st.priceAdd === 0 ? "Included" : `+$${st.priceAdd}`}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Lens Type Selection */}
            <div className="space-y-3">
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700">
                4. Select Optics & Lens Coating
              </label>
              <div className="grid grid-cols-1 gap-2.5">
                {selectedProduct.lensOptions.map((ln) => (
                  <button
                    key={ln.id}
                    onClick={() => setSelectedLens(ln)}
                    className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between bg-white ${
                      selectedLens.id === ln.id
                        ? "border-[#2563EB] bg-[#2563EB]/5 text-gray-900"
                        : "border-gray-200 text-gray-600 hover:border-gray-300"
                    }`}
                  >
                    <div>
                      <span className="font-bold text-xs text-gray-900 block">{ln.name}</span>
                      <span className="text-[11px] text-gray-500 font-normal">{ln.type}</span>
                    </div>
                    <span className="text-xs font-semibold text-[#2563EB]">
                      {ln.priceAdd === 0 ? "Included" : `+$${ln.priceAdd}`}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Total Price & Purchase CTA */}
            <div className="bg-white p-6 rounded-3xl border border-gray-200 space-y-4 shadow-[0_10px_35px_rgba(0,0,0,0.05)]">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-gray-500 uppercase font-semibold">Configured Price</span>
                  <p className="text-3xl font-bold text-gray-900">${calculatedTotalPrice}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-[#10B981] font-semibold flex items-center gap-1 justify-end">
                    <Check size={14} /> In Stock
                  </span>
                  <span className="text-[11px] text-gray-500 font-medium">Free Express Shipping</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={handleAddToCart}
                  className="glass-button-secondary py-4 rounded-2xl font-semibold text-xs uppercase flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingBag size={16} />
                  <span>Add to Bag</span>
                </button>

                <button
                  onClick={handleBuyNow}
                  className="glass-button-primary py-4 rounded-2xl font-semibold text-xs uppercase flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#2563EB]/25"
                >
                  <span>Buy Now</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <GlassFooter />
    </div>
  );
}
