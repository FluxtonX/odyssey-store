"use client";

import { useState } from "react";
import GlassNavbar from "@/components/layout/GlassNavbar";
import GlassFooter from "@/components/layout/GlassFooter";
import CartDrawer from "@/components/cart/CartDrawer";
import ScrollReveal from "@/components/animation/ScrollReveal";
import { HelpCircle, Plus, Minus } from "lucide-react";

export default function FAQPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-[#2563EB] selection:text-white relative pt-24">
      <GlassNavbar />
      <CartDrawer />
      
      {/* --- FAQ ACCORDION SECTION --- */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto relative z-10">
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

      <GlassFooter />
    </div>
  );
}
