"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { RecordingGlassesProduct, GlassesVariant, GlassesStorage, GlassesLens } from "@/data/products";

export interface CartItem {
  cartItemId: string;
  product: RecordingGlassesProduct;
  variant: GlassesVariant;
  storage: GlassesStorage;
  lens: GlassesLens;
  quantity: number;
  unitPrice: number;
}

interface CartStore {
  items: CartItem[];
  isCartDrawerOpen: boolean;
  appliedCoupon: string | null;
  discountPercentage: number;
  addItem: (product: RecordingGlassesProduct, variant: GlassesVariant, storage: GlassesStorage, lens: GlassesLens, quantity?: number) => void;
  removeItem: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  openCartDrawer: () => void;
  closeCartDrawer: () => void;
  toggleCartDrawer: () => void;
  getSubtotal: () => number;
  getDiscountAmount: () => number;
  getShippingFee: () => number;
  getGrandTotal: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isCartDrawerOpen: false,
      appliedCoupon: null,
      discountPercentage: 0,

      addItem: (product, variant, storage, lens, quantity = 1) => {
        const unitPrice = product.basePrice + storage.priceAdd + lens.priceAdd;
        const cartItemId = `${product.id}-${variant.id}-${storage.id}-${lens.id}`;

        set((state) => {
          const existingIndex = state.items.findIndex((i) => i.cartItemId === cartItemId);
          if (existingIndex > -1) {
            const updated = [...state.items];
            updated[existingIndex].quantity += quantity;
            return { items: updated, isCartDrawerOpen: true };
          }

          return {
            items: [
              ...state.items,
              {
                cartItemId,
                product,
                variant,
                storage,
                lens,
                quantity,
                unitPrice,
              },
            ],
            isCartDrawerOpen: true,
          };
        });
      },

      removeItem: (cartItemId) => {
        set((state) => ({
          items: state.items.filter((i) => i.cartItemId !== cartItemId),
        }));
      },

      updateQuantity: (cartItemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(cartItemId);
          return;
        }
        set((state) => ({
          items: state.items.map((i) => (i.cartItemId === cartItemId ? { ...i, quantity } : i)),
        }));
      },

      clearCart: () => set({ items: [], appliedCoupon: null, discountPercentage: 0 }),

      applyCoupon: (code) => {
        const clean = code.trim().toUpperCase();
        if (clean === "ODYSSEY10" || clean === "SPOKEN10") {
          set({ appliedCoupon: clean, discountPercentage: 10 });
          return true;
        } else if (clean === "ODYSSEY20" || clean === "VIP20") {
          set({ appliedCoupon: clean, discountPercentage: 20 });
          return true;
        }
        return false;
      },

      removeCoupon: () => set({ appliedCoupon: null, discountPercentage: 0 }),

      openCartDrawer: () => set({ isCartDrawerOpen: true }),
      closeCartDrawer: () => set({ isCartDrawerOpen: false }),
      toggleCartDrawer: () => set((state) => ({ isCartDrawerOpen: !state.isCartDrawerOpen })),

      getSubtotal: () => {
        return get().items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
      },

      getDiscountAmount: () => {
        const subtotal = get().getSubtotal();
        const pct = get().discountPercentage;
        return (subtotal * pct) / 100;
      },

      getShippingFee: () => {
        const subtotal = get().getSubtotal();
        return subtotal > 200 || subtotal === 0 ? 0 : 15;
      },

      getGrandTotal: () => {
        const subtotal = get().getSubtotal();
        const discount = get().getDiscountAmount();
        const shipping = get().getShippingFee();
        return Math.max(0, subtotal - discount + shipping);
      },
    }),
    {
      name: "odyssey_cart_storage",
    }
  )
);
