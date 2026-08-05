"use client";

import Link from "next/link";
import { Truck, ShieldCheck, Award, Headphones, Check } from "lucide-react";
import { useState } from "react";

export default function GlassFooter() {
  const [emailInput, setEmailInput] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setIsSubscribed(true);
      setEmailInput("");
      setTimeout(() => setIsSubscribed(false), 4000);
    }
  };

  return (
    <footer className="bg-[#F8F9FB] border-t border-gray-200 text-gray-700 relative overflow-hidden pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Trust Badges Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-16 border-b border-gray-200">
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-gray-200 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
            <div className="w-12 h-12 rounded-xl bg-[#2563EB]/10 border border-[#2563EB]/20 flex items-center justify-center text-[#2563EB]">
              <Truck size={22} />
            </div>
            <div>
              <h4 className="font-semibold text-sm text-gray-900">Free Insured Shipping</h4>
              <p className="text-xs text-gray-500">Worldwide 3-5 Day Express</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-gray-200 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
            <div className="w-12 h-12 rounded-xl bg-[#10B981]/10 border border-[#10B981]/20 flex items-center justify-center text-[#10B981]">
              <ShieldCheck size={22} />
            </div>
            <div>
              <h4 className="font-semibold text-sm text-gray-900">30-Day Money-Back</h4>
              <p className="text-xs text-gray-500">100% Risk-Free Guarantee</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-gray-200 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
            <div className="w-12 h-12 rounded-xl bg-[#F59E0B]/10 border border-[#F59E0B]/20 flex items-center justify-center text-[#F59E0B]">
              <Award size={22} />
            </div>
            <div>
              <h4 className="font-semibold text-sm text-gray-900">2-Year Full Warranty</h4>
              <p className="text-xs text-gray-500">Accidental Loss Protection</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-gray-200 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
            <div className="w-12 h-12 rounded-xl bg-[#EC4899]/10 border border-[#EC4899]/20 flex items-center justify-center text-[#EC4899]">
              <Headphones size={22} />
            </div>
            <div>
              <h4 className="font-semibold text-sm text-gray-900">24/7 Priority Support</h4>
              <p className="text-xs text-gray-500">Direct Odyssey Concierge</p>
            </div>
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 py-16">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img src="/spoken.png" alt="Spoken Odyssey Logo" className="h-8 w-auto object-contain" />
              <span className="text-lg font-bold text-gray-900 tracking-tight">ODYSSEY STORE</span>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed max-w-sm">
              The official flagship eCommerce store for SpokenOdyssey Smart Recording Glasses. Capture memories hands-free in 4K HDR and spatial 3D audio.
            </p>

            {/* Newsletter Subscription Form */}
            <form onSubmit={handleSubscribe} className="pt-2 max-w-md">
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">
                Join the Odyssey Circle & Get $30 Off
              </label>
              <div className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full px-4 py-3 text-xs bg-white border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:border-[#2563EB]"
                />
                <button
                  type="submit"
                  className="glass-button-primary px-5 py-3 rounded-xl text-xs font-semibold uppercase shrink-0 cursor-pointer flex items-center gap-1"
                >
                  {isSubscribed ? <Check size={16} /> : <span>Join</span>}
                </button>
              </div>
              {isSubscribed && (
                <p className="text-xs text-[#10B981] font-semibold mt-2 flex items-center gap-1">
                  <Check size={14} /> You're on the VIP launch list! Check your inbox.
                </p>
              )}
            </form>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="font-bold text-xs text-gray-900 uppercase tracking-wider mb-4">Smart Glasses</h5>
            <ul className="space-y-3 text-sm font-medium text-gray-600">
              <li><Link href="/product" className="hover:text-gray-900 transition">Pro Titanium 4K</Link></li>
              <li><Link href="/product" className="hover:text-gray-900 transition">Sport Polarized</Link></li>
              <li><Link href="/product" className="hover:text-gray-900 transition">Audio & Blue-Light</Link></li>
              <li><Link href="/product" className="hover:text-gray-900 transition">Prescription Lenses</Link></li>
            </ul>
          </div>

          {/* Platform Links */}
          <div>
            <h5 className="font-bold text-xs text-gray-900 uppercase tracking-wider mb-4">Store Navigation</h5>
            <ul className="space-y-3 text-sm font-medium text-gray-600">
              <li><Link href="/" className="hover:text-gray-900 transition">Product Story</Link></li>
              <li><Link href="/cart" className="hover:text-gray-900 transition">Cart Overview</Link></li>
              <li><Link href="/checkout" className="hover:text-gray-900 transition">Secure Checkout</Link></li>
              <li><Link href="/dashboard" className="hover:text-gray-900 transition">Order Tracking</Link></li>
              <li><Link href="/admin" className="hover:text-gray-900 transition">Admin Management</Link></li>
            </ul>
          </div>

          {/* Legal & Guarantee */}
          <div>
            <h5 className="font-bold text-xs text-gray-900 uppercase tracking-wider mb-4">Support & Legal</h5>
            <ul className="space-y-3 text-sm font-medium text-gray-500">
              <li><a href="#faq" className="hover:text-gray-900 transition">Frequently Asked Questions</a></li>
              <li><a href="#" className="hover:text-gray-900 transition">Privacy & Data Security</a></li>
              <li><a href="#" className="hover:text-gray-900 transition">Terms of Service</a></li>
              <li><a href="#" className="hover:text-gray-900 transition">Return & Exchange Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 font-medium gap-4">
          <p>© {new Date().getFullYear()} SpokenOdyssey Inc. All rights reserved. Enterprise eCommerce Platform.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-gray-800 cursor-pointer">Security Audited</span>
            <span className="hover:text-gray-800 cursor-pointer">Stripe Verified</span>
            <span className="hover:text-gray-800 cursor-pointer">Global Patents Pending</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
