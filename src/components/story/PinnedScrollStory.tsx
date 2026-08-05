"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Video, Mic, Volume2, Cpu, ShieldCheck, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

const STORY_STEPS = [
  {
    id: "4k-camera",
    tag: "01 / Ultrawide Optics",
    title: "Hands-Free 4K HDR Video Capture",
    description: "Capture life's spontaneous adventures exactly as your eyes see them. High-speed 4K HDR recording @ 60 FPS with hardware optical gyro-stabilization.",
    icon: Video,
    stat: "4K @ 60 FPS",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "spatial-audio",
    tag: "02 / Acoustic Engineering",
    title: "Dual Wind-Shielded Beamforming Mics",
    description: "Studio-grade directional microphones isolate your voice while actively cancelling background wind and city noise during calls and recordings.",
    icon: Mic,
    stat: "Dual Beam Mics",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "open-ear",
    tag: "03 / Private Audio",
    title: "Open-Ear Spatial Acoustics",
    description: "Rich directional micro-speakers deliver immersive spatial audio directly to your ears without blocking ambient awareness.",
    icon: Volume2,
    stat: "Private Boundary",
    image: "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "ai-sync",
    tag: "04 / Voice Vault",
    title: "Instant AI Voice Memory Sync",
    description: "Tap the touch temple or speak a voice command to instantly save voice journals and video clips to your private SpokenOdyssey cloud memory vault.",
    icon: Cpu,
    stat: "Wi-Fi 6 Vault",
    image: "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=1200&q=80",
  },
];

export default function PinnedScrollStory() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const currentStep = STORY_STEPS[activeStepIndex];
  const StepIcon = currentStep.icon;

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto my-12 bg-[#F8F9FB] rounded-3xl border border-gray-200/80 relative overflow-hidden">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/20 text-[#2563EB] text-xs font-semibold uppercase">
          <Sparkles size={14} />
          <span>Product Journey</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-gray-900">
          Engineered for Living in the Moment
        </h2>
        <p className="text-gray-600 text-base sm:text-lg font-normal">
          Explore how SpokenOdyssey Smart Glasses combine 4K optics, directional acoustics, and AI voice sync into an ultra-lightweight titanium frame.
        </p>

        {/* Step Selector Tabs */}
        <div className="pt-6 flex justify-center gap-2 flex-wrap">
          {STORY_STEPS.map((st, idx) => (
            <button
              key={st.id}
              onClick={() => setActiveStepIndex(idx)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeStepIndex === idx
                  ? "bg-[#2563EB] text-white shadow-md shadow-[#2563EB]/20"
                  : "bg-white border border-gray-200 text-gray-600 hover:text-gray-900"
              }`}
            >
              {st.tag}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Visual Presentation */}
        <div className="lg:col-span-7 bg-white p-8 sm:p-12 rounded-3xl border border-gray-200 relative overflow-hidden flex items-center justify-center min-h-[380px] sm:min-h-[480px] shadow-xs">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentStep.id}
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.05, y: -15 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              src={currentStep.image}
              alt={currentStep.title}
              className="max-h-[360px] w-auto object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.08)]"
            />
          </AnimatePresence>
        </div>

        {/* Right Column: Interactive Story Details */}
        <div className="lg:col-span-5 space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-8 rounded-3xl border border-gray-200 space-y-6 shadow-xs"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#2563EB]/10 border border-[#2563EB]/20 flex items-center justify-center text-[#2563EB]">
                <StepIcon size={24} />
              </div>

              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-[#2563EB] block mb-1">
                  {currentStep.tag}
                </span>
                <h3 className="text-2xl font-bold text-gray-900">{currentStep.title}</h3>
              </div>

              <p className="text-gray-600 text-sm leading-relaxed font-normal">
                {currentStep.description}
              </p>

              <div className="p-4 rounded-2xl bg-[#F8F9FB] border border-gray-200 flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-500 uppercase">Key Specification</span>
                <span className="text-sm font-bold text-[#2563EB]">{currentStep.stat}</span>
              </div>

              <Link
                href="/product"
                className="glass-button-primary w-full py-4 rounded-2xl font-semibold text-xs uppercase flex items-center justify-center gap-2 shadow-lg shadow-[#2563EB]/25"
              >
                <span>Configure Glasses with {currentStep.stat}</span>
                <ArrowRight size={16} />
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
