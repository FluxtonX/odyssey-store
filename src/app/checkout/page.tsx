"use client";

import { useState } from "react";
import { useCartStore } from "@/store/useCartStore";
import GlassNavbar from "@/components/layout/GlassNavbar";
import GlassFooter from "@/components/layout/GlassFooter";
import { CreditCard, Truck, ArrowRight, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getSubtotal, getDiscountAmount, getShippingFee, getGrandTotal, clearCart } = useCartStore();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState({
    firstName: "Mudassir",
    lastName: "Safi",
    email: "muhammedmudassir40@gmail.com",
    address: "742 Evergreen Terrace",
    city: "San Francisco",
    country: "United States",
    postalCode: "94107",
    shippingMethod: "express",
    paymentMethod: "card",
    cardNumber: "•••• •••• •••• 4242",
    cardExp: "12/28",
    cardCvc: "888",
  });

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) setStep((prev) => (prev + 1) as any);
    else {
      clearCart();
      router.push("/checkout/success");
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 relative">
      <GlassNavbar />

      <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        {/* Stepper Header */}
        <div className="mb-10 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#2563EB]">256-Bit Encrypted Checkout</span>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mt-1">Complete Your Order</h1>

          {/* Stepper Progress */}
          <div className="flex items-center justify-center gap-4 mt-8 max-w-md mx-auto">
            {[
              { num: 1, label: "Shipping" },
              { num: 2, label: "Delivery" },
              { num: 3, label: "Payment" },
            ].map((s) => (
              <div key={s.num} className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                    step >= s.num ? "bg-[#2563EB] text-white shadow-md shadow-[#2563EB]/30" : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {s.num}
                </div>
                <span className={`text-xs font-semibold ${step >= s.num ? "text-gray-900" : "text-gray-400"}`}>{s.label}</span>
                {s.num < 3 && <div className="w-8 h-0.5 bg-gray-200" />}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main Step Form */}
          <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-gray-200 shadow-xs">
            <form onSubmit={handleNext} className="space-y-6">
              {step === 1 && (
                <div className="space-y-4">
                  <h3 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                    <Truck size={18} className="text-[#2563EB]" /> Shipping Information
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">First Name</label>
                      <input
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="w-full px-4 py-2.5 bg-[#F8F9FB] border border-gray-300 rounded-xl text-xs text-gray-900 focus:border-[#2563EB]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Last Name</label>
                      <input
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="w-full px-4 py-2.5 bg-[#F8F9FB] border border-gray-300 rounded-xl text-xs text-gray-900 focus:border-[#2563EB]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[#F8F9FB] border border-gray-300 rounded-xl text-xs text-gray-900 focus:border-[#2563EB]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Street Address</label>
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[#F8F9FB] border border-gray-300 rounded-xl text-xs text-gray-900 focus:border-[#2563EB]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">City</label>
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-4 py-2.5 bg-[#F8F9FB] border border-gray-300 rounded-xl text-xs text-gray-900 focus:border-[#2563EB]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Postal Code</label>
                      <input
                        type="text"
                        required
                        value={formData.postalCode}
                        onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                        className="w-full px-4 py-2.5 bg-[#F8F9FB] border border-gray-300 rounded-xl text-xs text-gray-900 focus:border-[#2563EB]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <h3 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                    <Truck size={18} className="text-[#2563EB]" /> Delivery Speed
                  </h3>
                  <div className="space-y-3">
                    <label className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer ${formData.shippingMethod === 'express' ? 'border-[#2563EB] bg-[#2563EB]/5' : 'border-gray-200'}`}>
                      <div className="flex items-center gap-3">
                        <input type="radio" name="shipping" checked={formData.shippingMethod === 'express'} onChange={() => setFormData({ ...formData, shippingMethod: 'express' })} />
                        <div>
                          <span className="font-bold text-sm text-gray-900 block">Express Air Shipping (3-5 Days)</span>
                          <span className="text-xs text-gray-500 font-normal">Insured tracking via DHL / FedEx</span>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-[#10B981]">FREE</span>
                    </label>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <h3 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                    <CreditCard size={18} className="text-[#2563EB]" /> Payment Method
                  </h3>

                  <div className="p-4 rounded-2xl bg-[#F8F9FB] border border-gray-200 space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Card Number</label>
                      <input type="text" readOnly value={formData.cardNumber} className="w-full px-4 py-2 bg-white border border-gray-300 rounded-xl text-xs text-gray-900" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">Expiry</label>
                        <input type="text" readOnly value={formData.cardExp} className="w-full px-4 py-2 bg-white border border-gray-300 rounded-xl text-xs text-gray-900" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">CVC</label>
                        <input type="text" readOnly value={formData.cardCvc} className="w-full px-4 py-2 bg-white border border-gray-300 rounded-xl text-xs text-gray-900" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="pt-4 flex items-center justify-between">
                {step > 1 ? (
                  <button type="button" onClick={() => setStep((prev) => (prev - 1) as any)} className="glass-button-secondary px-5 py-3 rounded-xl text-xs font-semibold flex items-center gap-1">
                    <ArrowLeft size={16} /> Back
                  </button>
                ) : <div />}

                <button type="submit" className="glass-button-primary px-8 py-3.5 rounded-2xl font-semibold text-xs uppercase flex items-center gap-2">
                  <span>{step === 3 ? "Complete Purchase" : "Continue"}</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </form>
          </div>

          {/* Right Col: Summary */}
          <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-gray-200 space-y-4 shadow-xs">
            <h3 className="font-bold text-base text-gray-900">Order Summary</h3>
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.cartItemId} className="flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-gray-900 block">{item.product.name} ({item.quantity}x)</span>
                    <span className="text-gray-500">{item.variant.colorName} • {item.storage.size}</span>
                  </div>
                  <span className="font-bold text-gray-900">${(item.unitPrice * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-gray-200 space-y-2 text-xs">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${getSubtotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="text-[#10B981] font-bold">FREE</span>
              </div>
              <div className="flex justify-between text-base font-bold text-gray-900 pt-2 border-t border-gray-200">
                <span>Total</span>
                <span className="text-[#2563EB]">${getGrandTotal().toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <GlassFooter />
    </div>
  );
}
