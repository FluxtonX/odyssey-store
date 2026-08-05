"use client";

import GlassNavbar from "@/components/layout/GlassNavbar";
import GlassFooter from "@/components/layout/GlassFooter";
import CartDrawer from "@/components/cart/CartDrawer";
import { Package, ShieldCheck, MapPin } from "lucide-react";
import Link from "next/link";

export default function UserDashboardPage() {
  const recentOrders = [
    {
      id: "ODYSSEY-84920",
      date: "August 5, 2026",
      status: "Processing & Optical Preparation",
      statusColor: "text-amber-600 bg-amber-50 border-amber-200",
      item: "Odyssey Pro Titanium 4K (Onyx Black, 128GB)",
      total: 398.0,
      tracking: "TRK-948201849",
    },
    {
      id: "ODYSSEY-62910",
      date: "June 14, 2026",
      status: "Delivered",
      statusColor: "text-[#10B981] bg-[#10B981]/10 border-[#10B981]/20",
      item: "Odyssey Sport Polarized Edition (Stealth Black, 64GB)",
      total: 279.0,
      tracking: "TRK-102938472",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 relative">
      <GlassNavbar />
      <CartDrawer />

      <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
        {/* User Profile Header */}
        <div className="bg-[#F8F9FB] p-8 rounded-3xl border border-gray-200 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#2563EB] to-[#06B6D4] flex items-center justify-center font-bold text-2xl text-white shadow-md shadow-[#2563EB]/25">
              MS
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-gray-900">Mudassir Safi</h1>
                <span className="px-2.5 py-0.5 rounded-full bg-[#2563EB]/10 text-[#2563EB] text-[10px] font-semibold uppercase border border-[#2563EB]/20">
                  VIP Odyssey Member
                </span>
              </div>
              <p className="text-xs text-gray-500 font-medium mt-0.5">muhammedmudassir40@gmail.com • Member since 2026</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/product" className="glass-button-primary px-5 py-2.5 rounded-xl text-xs font-semibold uppercase">
              Configure New Glasses
            </Link>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Recent Orders List */}
          <div className="lg:col-span-8 bg-white p-8 rounded-3xl border border-gray-200 space-y-6 shadow-xs">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Package size={20} className="text-[#2563EB]" /> Your Smart Glasses Orders
              </h2>
              <span className="text-xs font-semibold text-gray-500">2 Orders Total</span>
            </div>

            <div className="space-y-4">
              {recentOrders.map((ord) => (
                <div key={ord.id} className="p-6 rounded-2xl bg-[#F8F9FB] border border-gray-200 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-200 pb-3">
                    <div>
                      <span className="font-bold text-sm text-gray-900">{ord.id}</span>
                      <span className="text-xs text-gray-500 ml-3 font-normal">{ord.date}</span>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${ord.statusColor}`}>
                      {ord.status}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-sm text-gray-900">{ord.item}</p>
                      <p className="text-xs text-gray-500 font-normal">Tracking Ref: {ord.tracking}</p>
                    </div>
                    <span className="text-lg font-bold text-[#2563EB]">${ord.total.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Info Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-gray-200 space-y-4 shadow-xs">
              <h3 className="font-bold text-base text-gray-900 flex items-center gap-2">
                <MapPin size={18} className="text-[#2563EB]" /> Default Shipping Address
              </h3>
              <div className="p-4 rounded-2xl bg-[#F8F9FB] border border-gray-200 text-xs text-gray-700 space-y-1">
                <p className="font-bold text-gray-900">Mudassir Safi</p>
                <p>742 Evergreen Terrace</p>
                <p>San Francisco, CA 94107</p>
                <p>United States</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-gray-200 space-y-4 shadow-xs">
              <h3 className="font-bold text-base text-gray-900 flex items-center gap-2">
                <ShieldCheck size={18} className="text-[#10B981]" /> Active Warranty Coverage
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed font-normal">
                Your Odyssey Pro Titanium 4K includes 2-Year Accidental Loss Protection & Unlimited Battery Replacements.
              </p>
            </div>
          </div>
        </div>
      </main>

      <GlassFooter />
    </div>
  );
}
