// Product options configuration - separate from products

export interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  image: string;
}

export interface ProductOption {
  id: string;
  label: string;
  type: 'radio' | 'select' | 'number';
  options?: string[];
  defaultValue?: string | number;
  required?: boolean;
}

export interface ProductOptionsConfig {
  [productId: string]: ProductOption[];
}

export interface SelectedOptions {
  [key: string]: string | number;
}

export interface CartItem {
  cartItemId: string; // Unique ID: productId + options hash
  product: Product;
  selectedOptions: SelectedOptions;
  quantity: number;
}
