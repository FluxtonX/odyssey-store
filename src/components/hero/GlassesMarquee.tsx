"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { RECORDING_GLASSES_PRODUCTS, RecordingGlassesProduct } from "@/data/products";
import { useCartStore } from "@/store/useCartStore";
import { ShieldCheck, Zap, Video, Volume2, Cpu, BatteryCharging, ShoppingCart } from "lucide-react";

export default function GlassesMarquee() {
  const router = useRouter();
  const { addItem } = useCartStore();

  const marqueeItems = [
    {
      id: "m1",
      product: RECORDING_GLASSES_PRODUCTS[0],
      title: "Odyssey Pro 4K Titanium",
      img: RECORDING_GLASSES_PRODUCTS[0].images.hero,
      tag: "4K HDR Optics",
      icon: Video,
      price: 349,
    },
    {
      id: "m2",
      product: RECORDING_GLASSES_PRODUCTS[1],
      title: "Sport Polarized Edition",
      img: RECORDING_GLASSES_PRODUCTS[1].images.front,
      tag: "IPX5 Shatterproof",
      icon: ShieldCheck,
      price: 279,
    },
    {
      id: "m3",
      product: RECORDING_GLASSES_PRODUCTS[2],
      title: "Audio Blue-Light Edition",
      img: RECORDING_GLASSES_PRODUCTS[2].images.side,
      tag: "Spatial Audio",
      icon: Volume2,
      price: 219,
    },
    {
      id: "m4",
      product: RECORDING_GLASSES_PRODUCTS[0],
      title: "Instant Voice Vault Sync",
      img: RECORDING_GLASSES_PRODUCTS[0].images.lifestyle,
      tag: "AI Memory Vault",
      icon: Cpu,
      price: 349,
    },
    {
      id: "m5",
      product: RECORDING_GLASSES_PRODUCTS[1],
      title: "12-Hour Stamina Battery",
      img: RECORDING_GLASSES_PRODUCTS[1].images.side,
      tag: "12H Playback",
      icon: BatteryCharging,
      price: 279,
    },
    {
      id: "m6",
      product: RECORDING_GLASSES_PRODUCTS[2],
      title: "Aerospace Titanium Frame",
      img: RECORDING_GLASSES_PRODUCTS[2].images.front,
      tag: "42g Featherweight",
      icon: Zap,
      price: 219,
    },
  ];

  // Handle clicking on any marquee item: adds to cart and redirects to /checkout!
  const handleItemClick = (product: RecordingGlassesProduct) => {
    addItem(
      product,
      product.variants[0],
      product.storageOptions[0],
      product.lensOptions[0],
      1
    );
    router.push("/checkout");
  };

  // Duplicate items for seamless continuous looping
  const doubleItems = [...marqueeItems, ...marqueeItems];

  return (
    <div className="w-full bg-[#F8F9FB] border-y border-gray-200 py-4 overflow-hidden relative shadow-xs">
      {/* Gradient Fades on Edges */}
      <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-[#F8F9FB] to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-[#F8F9FB] to-transparent z-10 pointer-events-none" />

      <div className="animate-marquee items-center gap-6 sm:gap-10">
        {doubleItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <button
              key={`${item.id}-${idx}`}
              onClick={() => handleItemClick(item.product)}
              title={`Buy ${item.title} ($${item.price}) - Click to Order Now`}
              className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-white border border-gray-200/90 shadow-xs hover:border-[#2563EB] hover:shadow-md transition-all shrink-0 cursor-pointer group text-left"
            >
              {/* Glasses Image Thumbnail */}
              <div className="w-14 h-10 sm:w-16 sm:h-12 bg-gray-50 rounded-xl flex items-center justify-center p-1 overflow-hidden border border-gray-100">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              {/* Specs, Label & Order CTA */}
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 text-[#2563EB]">
                  <Icon size={12} />
                  <span className="text-[10px] font-bold uppercase tracking-wider">{item.tag}</span>
                </div>
                <p className="text-xs font-bold text-gray-900 group-hover:text-[#2563EB] transition-colors">
                  {item.title}
                </p>
                <div className="flex items-center gap-1 text-[10px] font-semibold text-gray-500 group-hover:text-[#2563EB]">
                  <ShoppingCart size={10} />
                  <span>Order Now • ${item.price}</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
