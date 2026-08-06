"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingBag, Menu, X, ChevronRight, ShieldCheck } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { motion, AnimatePresence } from "framer-motion";

export default function GlassNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { items, openCartDrawer } = useCartStore();

  const totalCartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "py-3 bg-white/85 backdrop-blur-xl border-b border-gray-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)]"
            : "py-5 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Official Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group cursor-pointer">
            <img
              src="/spoken.png"
              alt="Spoken Odyssey Logo"
              className="h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-gray-900 flex items-center gap-1.5">
                ODYSSEY <span className="text-[#2563EB] font-semibold text-[10px] px-2 py-0.5 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/20">STORE</span>
              </span>
              <span className="text-[9px] tracking-widest text-gray-500 uppercase font-semibold">Smart Glasses Vault</span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <Link href="/" className="hover:text-gray-900 transition-colors cursor-pointer">Home</Link>
            <Link href="/product" className="hover:text-gray-900 transition-colors cursor-pointer flex items-center gap-1.5">
              <span>Recording Glasses</span>
              <span className="px-2 py-0.5 rounded-full bg-[#10B981]/10 text-[#10B981] text-[10px] font-bold uppercase">In Stock</span>
            </Link>
            <Link href="/specs" className="hover:text-gray-900 transition-colors cursor-pointer">Specifications</Link>
            <Link href="/faq" className="hover:text-gray-900 transition-colors cursor-pointer">FAQ</Link>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            {/* Cart Trigger */}
            <button
              onClick={openCartDrawer}
              className="relative p-2.5 rounded-2xl bg-gray-100/80 border border-gray-200 text-gray-800 hover:bg-[#2563EB]/10 hover:border-[#2563EB]/40 transition-all cursor-pointer active:scale-95 flex items-center gap-2"
              aria-label="Shopping Cart"
            >
              <ShoppingBag size={18} className="text-[#2563EB]" />
              <span className="hidden sm:inline font-semibold text-xs">Bag</span>
              {totalCartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#2563EB] text-white text-[11px] font-bold flex items-center justify-center shadow-md">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* Buy Now Primary CTA */}
            <Link
              href="/product"
              className="glass-button-primary hidden sm:flex items-center gap-1.5 px-5 py-2.5 rounded-2xl text-xs font-semibold tracking-wide cursor-pointer"
            >
              <span>Order Now</span>
              <ChevronRight size={16} />
            </Link>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2.5 rounded-2xl bg-gray-100 border border-gray-200 text-gray-700 hover:text-gray-900 transition cursor-pointer"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-white/95 backdrop-blur-2xl md:hidden flex flex-col justify-between p-6"
          >
            <div className="flex items-center justify-between border-b border-gray-200 pb-4">
              <div className="flex items-center gap-3">
                <img src="/spoken.png" alt="Spoken Odyssey Logo" className="h-8 w-auto object-contain" />
                <span className="font-bold text-base text-gray-900">ODYSSEY STORE</span>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-full bg-gray-100 text-gray-500 hover:text-gray-900 cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <nav className="flex flex-col gap-6 py-8">
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-bold text-gray-900 hover:text-[#2563EB] transition">
                Home
              </Link>
              <Link href="/product" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-bold text-[#2563EB] flex items-center justify-between">
                <span>Recording Glasses</span>
                <span className="text-xs px-2.5 py-1 rounded-full bg-[#10B981]/10 text-[#10B981] font-semibold">In Stock</span>
              </Link>
              <Link href="/cart" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-bold text-gray-900 hover:text-[#2563EB] transition flex items-center justify-between">
                <span>Shopping Cart</span>
                <span className="text-xs px-3 py-1 rounded-full bg-[#2563EB] text-white font-bold">{totalCartCount}</span>
              </Link>
              <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-bold text-gray-700 hover:text-gray-900 transition">
                Order Dashboard
              </Link>
              <Link href="/admin" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-bold text-gray-500 hover:text-gray-900 transition">
                Admin Management
              </Link>
            </nav>

            <div className="flex flex-col gap-4 border-t border-gray-200 pt-6">
              <Link
                href="/product"
                onClick={() => setIsMobileMenuOpen(false)}
                className="glass-button-primary w-full py-4 rounded-2xl font-semibold text-sm text-center flex items-center justify-center gap-2"
              >
                <span>Configure Glasses</span>
                <ChevronRight size={18} />
              </Link>
              <div className="flex items-center justify-center gap-2 text-xs text-gray-500 font-medium">
                <ShieldCheck size={14} className="text-[#10B981]" />
                <span>30-Day Money-Back Guarantee + 2-Year Warranty</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
