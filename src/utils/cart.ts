import type { CartItem } from '../interfaces';

export const calculateTotal = (cart: CartItem[]): number => {
  return cart.reduce((total, item) => {
    const price = parseFloat(item.product.price.replace('$', ''));
    return total + price * item.quantity;
  }, 0);
};

export const calculateTotalFormatted = (cart: CartItem[]): string => {
  const total = calculateTotal(cart);
  return `$${total.toFixed(2)}`;
};

export const calculateTotalItems = (cart: CartItem[]): number => {
  return cart.reduce((total, item) => total + item.quantity, 0);
};
