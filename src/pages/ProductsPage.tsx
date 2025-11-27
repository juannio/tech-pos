import { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../context/useTheme';
import { useCartStore } from '../stores/cartStore';
import { FloatingCartButton } from '../components/products-page/FloatingCartButton';
import DrawerLayout from '../layouts/DrawerLayout';
import { CheckoutDrawer } from '../components/products-page/checkout-drawer/CheckoutDrawer';
import ProductOptionsModal from '../components/products-page/product-options-modal/OptionsModal';
import { products } from '../mocks/ProductOptions';
import type { Product } from '../interfaces';

export default function ProductPage() {
  const { darkMode, theme } = useTheme();
  const { getTotalQuantityForProduct, getCartItemsByProduct } = useCartStore();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  console.log(selectedProduct);

  return (
    <div className={`min-h-screen ${theme.bg} p-4 md:p-8`}>
      <DrawerLayout>
        <CheckoutDrawer />
      </DrawerLayout>
      <FloatingCartButton />
      <ProductOptionsModal
        product={selectedProduct}
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedProduct(null);
        }}
      />

      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex justify-between gap-4">
          <h1 className={`text-xl md:text-2xl font-semibold ${theme.text}`}>
            Que vamos a vender hoy?
          </h1>
          {/* Search */}
          <div
            className={`hidden sm:flex items-center gap-2 ${theme.searchBg} px-4 py-2 rounded-lg flex-1 max-w-md`}
          >
            <MagnifyingGlassIcon
              className={`w-5 h-5 ${darkMode ? 'text-slate-500' : 'text-gray-400'} flex-shrink-0`}
            />
            <input
              type="text"
              placeholder="Search"
              className={`bg-transparent border-none outline-none ${theme.inputText} ${theme.placeholder} w-full`}
            />
          </div>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => {
            const totalQuantity = getTotalQuantityForProduct(product.id);
            const cartItems = getCartItemsByProduct(product.id);
            const inCart = totalQuantity > 0;

            return (
              <div
                key={product.id}
                onClick={() => {
                  setSelectedProduct(product);
                  setModalOpen(true);
                }}
                className={`${theme.cardBg} border ${theme.border} rounded-xl overflow-hidden transition-all hover:scale-[1.02] cursor-pointer`}
              >
                {/* Card Content */}
                <div className="p-6 text-center">
                  {/* Product Image */}
                  <div className="mb-4 relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-24 h-24 md:w-28 md:h-28 rounded-full mx-auto object-cover border-4 border-slate-700"
                    />
                    {inCart && (
                      <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm animate__animated animate__fadeIn">
                        {totalQuantity}
                      </div>
                    )}
                  </div>

                  {/* Product Name */}
                  <h3 className={`text-lg font-semibold ${theme.text} mb-1`}>
                    {product.name}
                  </h3>

                  {/* Category */}
                  <p className={`text-sm ${theme.textMuted} mb-3`}>
                    {product.category}
                  </p>

                  {/* Price Badge */}
                  <div className="mb-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${theme.badge}`}
                    >
                      {product.price}
                    </span>
                  </div>

                  {/* Show variations if multiple items in cart */}
                  {cartItems.length > 1 && (
                    <div className={`text-xs ${theme.textMuted}`}>
                      {cartItems.length} variations
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
