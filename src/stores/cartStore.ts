import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, Product, SelectedOptions } from '../interfaces';

interface CartStore {
  cart: CartItem[];

  // Actions
  addItemWithOptions: (
    product: Product,
    selectedOptions: SelectedOptions
  ) => void;
  addItemSimple: (product: Product) => void; // For quick add without options
  removeItem: (cartItemId: string) => void;
  incrementItem: (cartItemId: string) => void;
  decrementItem: (cartItemId: string) => void;
  clearCart: () => void;

  // Selectors
  getCartItemsByProduct: (productId: string) => CartItem[];
  getTotalQuantityForProduct: (productId: string) => number;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

// Helper to create unique cart item ID
const createCartItemId = (
  productId: string,
  options: SelectedOptions
): string => {
  const optionsString = JSON.stringify(options);
  return `${productId}__${optionsString}`;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],
      addItemWithOptions: (product, selectedOptions) => {
        const cartItemId = createCartItemId(product.id, selectedOptions);

        set((state) => {
          const existingItem = state.cart.find(
            (item) => item.cartItemId === cartItemId
          );

          if (existingItem) {
            // Same product with same options - increment quantity
            return {
              cart: state.cart.map((item) =>
                item.cartItemId === cartItemId
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }

          // New product variation
          return {
            cart: [
              ...state.cart,
              {
                cartItemId,
                product,
                selectedOptions,
                quantity: 1,
              },
            ],
          };
        });
      },
      addItemSimple: (product) => {
        // Add without options (for increment/decrement on cards)
        const cartItemId = createCartItemId(product.id, {});

        set((state) => {
          const existingItem = state.cart.find(
            (item) => item.cartItemId === cartItemId
          );

          if (existingItem) {
            return {
              cart: state.cart.map((item) =>
                item.cartItemId === cartItemId
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }

          return {
            cart: [
              ...state.cart,
              {
                cartItemId,
                product,
                selectedOptions: {},
                quantity: 1,
              },
            ],
          };
        });
      },
      removeItem: (cartItemId) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.cartItemId !== cartItemId),
        }));
      },
      incrementItem: (cartItemId) => {
        set((state) => ({
          cart: state.cart.map((item) =>
            item.cartItemId === cartItemId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        }));
      },
      decrementItem: (cartItemId) => {
        set((state) => {
          const item = state.cart.find((i) => i.cartItemId === cartItemId);

          if (!item) return state;

          if (item.quantity === 1) {
            return {
              cart: state.cart.filter((i) => i.cartItemId !== cartItemId),
            };
          }

          return {
            cart: state.cart.map((i) =>
              i.cartItemId === cartItemId
                ? { ...i, quantity: i.quantity - 1 }
                : i
            ),
          };
        });
      },
      clearCart: () => set({ cart: [] }),

      getCartItemsByProduct: (productId) => {
        return get().cart.filter((item) => item.product.id === productId);
      },

      getTotalQuantityForProduct: (productId) => {
        return get()
          .cart.filter((item) => item.product.id === productId)
          .reduce((total, item) => total + item.quantity, 0);
      },

      getTotalItems: () => {
        return get().cart.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().cart.reduce((total, item) => {
          const price = parseFloat(item.product.price.replace('$', ''));
          return total + price * item.quantity;
        }, 0);
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);
