"use client";

import { useState } from "react";
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Tag, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CartDrawer() {
  const router = useRouter();
  const {
    items,
    isCartDrawerOpen,
    closeCartDrawer,
    removeItem,
    updateQuantity,
    appliedCoupon,
    discountPercentage,
    applyCoupon,
    removeCoupon,
    getSubtotal,
    getDiscountAmount,
    getShippingFee,
    getGrandTotal,
  } = useCartStore();

  const [couponInput, setCouponInput] = useState("");
  const [couponError, setCouponError] = useState("");

  const handleCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError("");
    const success = applyCoupon(couponInput);
    if (success) {
      setCouponInput("");
    } else {
      setCouponError("Invalid code. Try ODYSSEY10");
    }
  };

  const handleCheckoutClick = () => {
    closeCartDrawer();
    router.push("/checkout");
  };

  return (
    <AnimatePresence>
      {isCartDrawerOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCartDrawer}
            className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm"
          />

          {/* Slide-over Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-white border-l border-gray-200 shadow-2xl flex flex-col justify-between"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#2563EB]/10 border border-[#2563EB]/20 flex items-center justify-center text-[#2563EB]">
                  <ShoppingBag size={18} />
                </div>
                <div>
                  <h2 className="font-bold text-lg text-gray-900 leading-tight">Your Cart</h2>
                  <p className="text-xs text-gray-500 font-medium">
                    {items.length} {items.length === 1 ? "item" : "items"} selected
                  </p>
                </div>
              </div>

              <button
                onClick={closeCartDrawer}
                className="p-2 rounded-full bg-gray-100 text-gray-500 hover:text-gray-900 transition cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-400 mb-4">
                    <ShoppingBag size={28} />
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 mb-1">Your bag is empty</h3>
                  <p className="text-sm text-gray-500 max-w-xs mb-6">
                    Configure your SpokenOdyssey Smart Recording Glasses to begin your journey.
                  </p>
                  <Link
                    href="/product"
                    onClick={closeCartDrawer}
                    className="glass-button-primary px-6 py-3 rounded-2xl text-xs font-semibold uppercase cursor-pointer"
                  >
                    Configure Smart Glasses
                  </Link>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.cartItemId}
                    className="glass-card-light p-4 rounded-2xl flex gap-4 relative group"
                  >
                    <img
                      src={item.product.images.hero}
                      alt={item.product.name}
                      className="w-20 h-20 rounded-xl object-cover bg-gray-50 border border-gray-200 shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-bold text-sm text-gray-900 truncate">{item.product.name}</h4>
                        <button
                          onClick={() => removeItem(item.cartItemId)}
                          className="text-gray-400 hover:text-rose-500 transition p-1 cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      <div className="flex flex-wrap gap-1.5 mt-1.5 mb-3">
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-gray-100 border border-gray-200 text-gray-700">
                          {item.variant.colorName}
                        </span>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-gray-100 border border-gray-200 text-gray-700">
                          {item.storage.size}
                        </span>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-gray-100 border border-gray-200 text-gray-700">
                          {item.lens.name}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 bg-gray-100 border border-gray-200 rounded-xl px-2 py-1">
                          <button
                            onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                            className="text-gray-600 hover:text-gray-900 cursor-pointer"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="text-xs font-bold text-gray-900 px-1">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                            className="text-gray-600 hover:text-gray-900 cursor-pointer"
                          >
                            <Plus size={12} />
                          </button>
                        </div>

                        <span className="font-bold text-sm text-[#2563EB]">
                          ${(item.unitPrice * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Cart Footer Summary & Checkout */}
            {items.length > 0 && (
              <div className="p-6 border-t border-gray-200 bg-gray-50/80 space-y-4">
                {/* Coupon Input */}
                <form onSubmit={handleCouponSubmit} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag size={14} className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Discount code (e.g. ODYSSEY10)"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:border-[#2563EB]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-gray-200 border border-gray-300 hover:bg-[#2563EB] hover:text-[#FFFFFF] text-gray-800 text-xs font-semibold rounded-xl transition cursor-pointer"
                  >
                    Apply
                  </button>
                </form>

                {appliedCoupon && (
                  <div className="flex items-center justify-between text-xs text-[#10B981] font-semibold bg-[#10B981]/10 px-3 py-1.5 rounded-xl border border-[#10B981]/20">
                    <span className="flex items-center gap-1.5">
                      <Tag size={14} /> Coupon {appliedCoupon} applied ({discountPercentage}% OFF)
                    </span>
                    <button onClick={removeCoupon} className="text-gray-400 hover:text-gray-700">
                      <X size={14} />
                    </button>
                  </div>
                )}
                {couponError && <p className="text-[11px] text-rose-500 font-semibold">{couponError}</p>}

                {/* Subtotal & Totals Breakdown */}
                <div className="space-y-1.5 text-xs text-gray-600 pt-2 border-t border-gray-200">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-gray-900">${getSubtotal().toFixed(2)}</span>
                  </div>
                  {getDiscountAmount() > 0 && (
                    <div className="flex justify-between text-[#10B981]">
                      <span>Discount</span>
                      <span className="font-semibold">-${getDiscountAmount().toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Express Insured Shipping</span>
                    <span className="font-semibold text-gray-900">
                      {getShippingFee() === 0 ? "FREE" : `$${getShippingFee().toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-gray-900 pt-2 border-t border-gray-200">
                    <span>Total Due</span>
                    <span className="text-[#2563EB]">${getGrandTotal().toFixed(2)}</span>
                  </div>
                </div>

                {/* Checkout CTA */}
                <button
                  onClick={handleCheckoutClick}
                  className="glass-button-primary w-full py-4 rounded-2xl font-semibold text-sm uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#2563EB]/25"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight size={18} />
                </button>

                <div className="flex items-center justify-center gap-2 text-[11px] text-gray-500 font-medium pt-1">
                  <ShieldCheck size={14} className="text-[#10B981]" />
                  <span>Encrypted 256-Bit SSL Checkout</span>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
