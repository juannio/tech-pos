import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../../../context/useTheme';
import { useDrawerStore } from '../../../stores/drawerStore';

export const EmptyCart = () => {
  const { theme } = useTheme();
  const { closeDrawer } = useDrawerStore();

  return (
    <div className="flex flex-col items-center justify-center h-full px-6 py-12">
      {/* Icon */}
      <div
        className={`w-24 h-24 rounded-full ${theme.cardBg} flex items-center justify-center mb-6`}
      >
        <ShoppingCartIcon className={`w-12 h-12 ${theme.textMuted}`} />
      </div>

      {/* Title */}
      <h3 className={`text-xl font-semibold ${theme.text} mb-2`}>
        Your cart is empty
      </h3>

      {/* Description */}
      <p className={`text-center ${theme.textMuted} mb-8 max-w-sm`}>
        Add some delicious items to your cart to get started!
      </p>

      {/* Button */}
      <button
        onClick={closeDrawer}
        className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
      >
        Start Shopping
      </button>
    </div>
  );
};
