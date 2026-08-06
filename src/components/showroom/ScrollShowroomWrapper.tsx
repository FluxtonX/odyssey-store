"use client";

import dynamic from "next/dynamic";

// ScrollShowroom uses R3F Canvas which requires browser-only rendering
const ScrollShowroom = dynamic(
  () => import("@/components/showroom/ScrollShowroom"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-screen bg-gradient-to-b from-white via-[#F8F9FB] to-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 rounded-full border-2 border-[#2563EB] border-t-transparent animate-spin mx-auto" />
          <p className="text-sm text-gray-500 font-semibold">Loading 3D Showroom...</p>
        </div>
      </div>
    ),
  }
);

export default function ScrollShowroomWrapper() {
  return <ScrollShowroom />;
}
