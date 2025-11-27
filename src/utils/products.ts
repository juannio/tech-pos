import type { ProductOption } from '../interfaces';
import { productOptionsConfig } from '../mocks/ProductOptions';

// Helper function to get options for a product
export const getProductOptions = (productId: string): ProductOption[] => {
  return productOptionsConfig[productId] || [];
};
