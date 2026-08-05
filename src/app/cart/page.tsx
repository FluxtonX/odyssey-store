"use client";

import { useCartStore } from "@/store/useCartStore";
import GlassNavbar from "@/components/layout/GlassNavbar";
import GlassFooter from "@/components/layout/GlassFooter";
import CartDrawer from "@/components/cart/CartDrawer";
import Link from "next/link";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, Tag } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const router = useRouter();
  const {
    items,
    removeItem,
    updateQuantity,
    appliedCoupon,
    discountPercentage,
    applyCoupon,
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

  return (
    <div className="min-h-screen bg-white text-gray-900 relative">
      <GlassNavbar />
      <CartDrawer />

      <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#2563EB]">Order Review</span>
          <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 tracking-tight mt-1">Your Shopping Bag</h1>
        </div>

        {items.length === 0 ? (
          <div className="bg-[#F8F9FB] border border-gray-200 p-12 rounded-3xl text-center max-w-md mx-auto my-12 space-y-6 shadow-xs">
            <div className="w-16 h-16 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 mx-auto">
              <ShoppingBag size={32} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Your bag is empty</h3>
            <p className="text-sm text-gray-500 font-normal">
              Configure your SpokenOdyssey Smart Glasses to begin your purchase.
            </p>
            <Link
              href="/product"
              className="glass-button-primary inline-flex px-8 py-3.5 rounded-2xl text-xs font-semibold uppercase tracking-wider"
            >
              Configure Smart Glasses
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Col: Cart Items */}
            <div className="lg:col-span-8 space-y-4">
              {items.map((item) => (
                <div key={item.cartItemId} className="bg-white p-6 rounded-3xl border border-gray-200 flex flex-col sm:flex-row gap-6 items-center shadow-xs">
                  <img
                    src={item.product.images.hero}
                    alt={item.product.name}
                    className="w-28 h-28 object-contain bg-[#F8F9FB] border border-gray-200 rounded-2xl p-2 shrink-0"
                  />

                  <div className="flex-1 space-y-2 text-center sm:text-left">
                    <h3 className="font-bold text-lg text-gray-900">{item.product.name}</h3>
                    <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                      <span className="px-2.5 py-0.5 rounded-full bg-gray-100 border border-gray-200 text-xs font-semibold text-gray-700">
                        {item.variant.colorName}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-gray-100 border border-gray-200 text-xs font-semibold text-gray-700">
                        {item.storage.size}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-gray-100 border border-gray-200 text-xs font-semibold text-gray-700">
                        {item.lens.name}
                      </span>
                    </div>

                    <div className="pt-2 flex items-center justify-between">
                      <div className="flex items-center gap-3 bg-gray-100 border border-gray-200 rounded-xl px-3 py-1.5">
                        <button onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)} className="text-gray-500 hover:text-gray-900">
                          <Minus size={14} />
                        </button>
                        <span className="font-bold text-sm text-gray-900 px-2">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)} className="text-gray-500 hover:text-gray-900">
                          <Plus size={14} />
                        </button>
                      </div>

                      <span className="text-xl font-bold text-[#2563EB]">
                        ${(item.unitPrice * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <button onClick={() => removeItem(item.cartItemId)} className="text-gray-400 hover:text-rose-500 transition p-2">
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>

            {/* Right Col: Order Summary */}
            <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-gray-200 space-y-6 shadow-xs">
              <h3 className="font-bold text-lg text-gray-900">Order Summary</h3>

              {/* Coupon Form */}
              <form onSubmit={handleCouponSubmit} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag size={14} className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Coupon Code"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-[#F8F9FB] border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:border-[#2563EB]"
                  />
                </div>
                <button type="submit" className="px-4 py-2 bg-gray-100 border border-gray-300 text-xs font-semibold rounded-xl text-gray-800 hover:bg-[#2563EB] hover:text-white">
                  Apply
                </button>
              </form>

              {couponError && <p className="text-xs text-rose-500 font-semibold">{couponError}</p>}

              <div className="space-y-3 text-sm text-gray-600 pt-4 border-t border-gray-200">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-gray-900">${getSubtotal().toFixed(2)}</span>
                </div>
                {getDiscountAmount() > 0 && (
                  <div className="flex justify-between text-[#10B981]">
                    <span>Discount ({discountPercentage}%)</span>
                    <span className="font-semibold">-${getDiscountAmount().toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Express Worldwide Shipping</span>
                  <span className="font-bold text-gray-900">{getShippingFee() === 0 ? "FREE" : `$${getShippingFee().toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-gray-900 pt-4 border-t border-gray-200">
                  <span>Grand Total</span>
                  <span className="text-[#2563EB]">${getGrandTotal().toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={() => router.push("/checkout")}
                className="glass-button-primary w-full py-4 rounded-2xl font-semibold text-sm uppercase flex items-center justify-center gap-2"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}
      </main>

      <GlassFooter />
    </div>
  );
}
