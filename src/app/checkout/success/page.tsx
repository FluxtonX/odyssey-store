"use client";

import { useEffect } from "react";
import confetti from "canvas-confetti";
import GlassNavbar from "@/components/layout/GlassNavbar";
import GlassFooter from "@/components/layout/GlassFooter";
import Link from "next/link";
import { CheckCircle2, PackageCheck, ArrowRight, Printer } from "lucide-react";

export default function OrderSuccessPage() {
  useEffect(() => {
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#2563EB", "#06B6D4", "#10B981", "#1E293B"],
    });
  }, []);

  const orderId = "#ODYSSEY-84920";

  return (
    <div className="min-h-screen bg-white text-gray-900 relative">
      <GlassNavbar />

      <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto text-center space-y-8">
        <div className="w-20 h-20 rounded-full bg-[#10B981]/15 border border-[#10B981]/30 text-[#10B981] flex items-center justify-center mx-auto shadow-lg shadow-[#10B981]/20 animate-bounce">
          <CheckCircle2 size={44} />
        </div>

        <div className="space-y-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#10B981]">Order Confirmed</span>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">Welcome to the Future</h1>
          <p className="text-gray-600 font-normal text-base sm:text-lg max-w-lg mx-auto">
            Thank you for your order! Your SpokenOdyssey Smart Recording Glasses are being prepared for express shipping.
          </p>
        </div>

        {/* Order Details Glass Box */}
        <div className="bg-white p-8 rounded-3xl border border-gray-200 text-left space-y-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-6 border-b border-gray-200">
            <div>
              <span className="text-xs text-gray-500 font-semibold uppercase">Order Reference</span>
              <p className="text-xl font-bold text-gray-900">{orderId}</p>
            </div>
            <div className="sm:text-right">
              <span className="text-xs text-gray-500 font-semibold uppercase">Estimated Delivery</span>
              <p className="text-sm font-bold text-[#10B981]">3-5 Business Days (Express Insured)</p>
            </div>
          </div>

          {/* Tracking Timeline */}
          <div className="space-y-4">
            <h4 className="font-bold text-sm text-gray-900 uppercase tracking-wider flex items-center gap-2">
              <PackageCheck size={18} className="text-[#2563EB]" /> Live Order Status Timeline
            </h4>

            <div className="space-y-3 pl-4 border-l-2 border-[#2563EB]">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-[#10B981]" />
                <span className="text-xs font-semibold text-gray-900">Order Confirmed & Payment Verified</span>
              </div>
              <div className="flex items-center gap-3 opacity-60">
                <span className="w-3 h-3 rounded-full bg-gray-300" />
                <span className="text-xs font-normal text-gray-500">Preparing Glasses in Optical Vault</span>
              </div>
              <div className="flex items-center gap-3 opacity-60">
                <span className="w-3 h-3 rounded-full bg-gray-300" />
                <span className="text-xs font-normal text-gray-500">Handed to Express Courier</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200 flex items-center justify-between">
            <button onClick={() => window.print()} className="glass-button-secondary px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer">
              <Printer size={14} /> Print Receipt
            </button>
            <span className="text-xs text-gray-500 font-medium">Confirmation sent to email</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/dashboard"
            className="glass-button-primary px-8 py-4 rounded-2xl font-semibold text-xs uppercase tracking-wider flex items-center gap-2"
          >
            <span>View Order Dashboard</span>
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/"
            className="glass-button-secondary px-8 py-4 rounded-2xl font-semibold text-xs uppercase"
          >
            Return to Store
          </Link>
        </div>
      </main>

      <GlassFooter />
    </div>
  );
}
