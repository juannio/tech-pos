import { useEffect, useState } from 'react';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useCartStore } from '../../stores/cartStore';
import { useDrawerStore } from '../../stores/drawerStore';
import { useTheme } from '../../context/useTheme';

export const FloatingCartButton = () => {
  const { getTotalItems } = useCartStore();
  const { openDrawer, isOpen } = useDrawerStore();
  const { darkMode } = useTheme();

  const totalItems = getTotalItems();
  const hasItems = totalItems > 0;
  const [shouldBounce, setShouldBounce] = useState(false);
  const [prevTotal, setPrevTotal] = useState(totalItems);

  useEffect(() => {
    if (totalItems > prevTotal) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShouldBounce(true);
      // Remove animation class after it completes
      setTimeout(() => {
        setShouldBounce(false);
      }, 1000); // Animate.css default duration
    }
    setPrevTotal(totalItems);
  }, [totalItems, prevTotal]);

  return (
    <button
      onClick={openDrawer}
      className={`fixed bottom-10 right-10 z-50 flex items-center justify-center w-16 h-16 rounded-full shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 ${
        darkMode
          ? 'bg-indigo-600 hover:bg-indigo-700'
          : 'bg-indigo-600 hover:bg-indigo-700'
      } ${isOpen ? 'animate__animated animate__bounceOut' : 'animate__animated animate__bounceIn'}`}
      aria-label="Open shopping cart"
    >
      <ShoppingCartIcon className="w-7 h-7 text-white" />

      {hasItems && (
        <span
          key={totalItems} // Force re-render to restart animation
          className={`absolute -top-2 -right-2 flex items-center justify-center w-7 h-7 text-xs font-bold text-white bg-red-500 rounded-full border-2 border-white ${
            shouldBounce ? 'animate__animated animate__bounceIn' : ''
          }`}
        >
          {totalItems}
        </span>
      )}
    </button>
  );
};
