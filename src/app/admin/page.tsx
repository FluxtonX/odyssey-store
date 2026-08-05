"use client";

import GlassNavbar from "@/components/layout/GlassNavbar";
import GlassFooter from "@/components/layout/GlassFooter";
import CartDrawer from "@/components/cart/CartDrawer";
import { DollarSign, ShoppingBag, Layers, TrendingUp, Glasses } from "lucide-react";

export default function AdminDashboardPage() {
  const metrics = [
    { label: "Total Gross Revenue", val: "$142,850.00", change: "+18.4% this month", icon: DollarSign, color: "text-[#10B981]" },
    { label: "Glasses Units Sold", val: "394 Units", change: "+24 Units today", icon: Glasses, color: "text-[#2563EB]" },
    { label: "Active Pre-Orders", val: "48 Orders", change: "12 In Assembly", icon: ShoppingBag, color: "text-[#F59E0B]" },
    { label: "Inventory Stock Level", val: "842 Units", change: "92% Stock Health", icon: Layers, color: "text-blue-500" },
  ];

  const adminOrders = [
    { id: "#ODYSSEY-84920", customer: "Mudassir Safi", model: "Pro Titanium 4K (Onyx Black, 128GB)", price: "$398.00", status: "Processing", date: "Just now" },
    { id: "#ODYSSEY-84919", customer: "Sarah Mitchell", model: "Sport Polarized (Stealth Black, 64GB)", price: "$279.00", status: "Shipped", date: "15 mins ago" },
    { id: "#ODYSSEY-84918", customer: "Robert Chen", model: "Audio Blue-Light (Space Gray, 128GB)", price: "$258.00", status: "Delivered", date: "2 hours ago" },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 relative">
      <GlassNavbar />
      <CartDrawer />

      <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
        {/* Admin Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#2563EB]">Store Administrator</span>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mt-1">Odyssey Store Management</h1>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-[#10B981]/10 border border-[#10B981]/20 text-[#10B981] text-xs font-semibold">
              Live Production Backend Mock
            </span>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((m, idx) => {
            const Icon = m.icon;
            return (
              <div key={idx} className="bg-white p-6 rounded-3xl border border-gray-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 font-semibold uppercase">{m.label}</span>
                  <div className={`w-10 h-10 rounded-2xl bg-gray-100 border border-gray-200 flex items-center justify-center ${m.color}`}>
                    <Icon size={20} />
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{m.val}</h2>
                  <span className="text-xs text-[#10B981] font-semibold flex items-center gap-1 mt-1">
                    <TrendingUp size={12} /> {m.change}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent Admin Orders Management Table */}
        <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900">Recent Customer Orders</h3>
            <span className="text-xs text-gray-500 font-semibold">Showing latest 3 orders</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-700">
              <thead className="border-b border-gray-200 text-gray-500 font-bold uppercase">
                <tr>
                  <th className="py-3 px-4">Order Ref</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Glasses Model</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-normal">
                {adminOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-gray-50 transition">
                    <td className="py-4 px-4 font-bold text-gray-900">{ord.id}</td>
                    <td className="py-4 px-4 text-gray-800">{ord.customer}</td>
                    <td className="py-4 px-4 text-gray-600">{ord.model}</td>
                    <td className="py-4 px-4 font-bold text-[#2563EB]">{ord.price}</td>
                    <td className="py-4 px-4">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#2563EB]/10 text-[#2563EB] font-semibold border border-[#2563EB]/20">
                        {ord.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray-500">{ord.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <GlassFooter />
    </div>
  );
}
