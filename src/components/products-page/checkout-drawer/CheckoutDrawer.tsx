import { useState } from 'react';
import { DialogTitle } from '@headlessui/react';
import { useTheme } from '../../../context/useTheme';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useCartStore } from '../../../stores/cartStore';
import { useDrawerStore } from '../../../stores/drawerStore';
import { calculateTotalFormatted } from '../../../utils/cart';
import { EmptyCart } from './EmptyCart';

export const CheckoutDrawer = () => {
  const { cart, removeItem, incrementItem, decrementItem } = useCartStore();
  const { closeDrawer } = useDrawerStore();
  const { theme } = useTheme();
  const subtotal = calculateTotalFormatted(cart);
  const [removingId, setRemovingId] = useState<string | null>(null);
  const isCartEmpty = !cart.length;

  const handleRemove = (cartItemId: string) => {
    setRemovingId(cartItemId);
    // Wait for animation to complete before removing
    setTimeout(() => {
      removeItem(cartItemId);
      setRemovingId(null);
    }, 500);
  };

  console.log(cart);

  return (
    <>
      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
        <div className="flex items-start justify-between">
          <DialogTitle className={`text-lg font-medium ${theme.textActive}`}>
            Shopping cart
          </DialogTitle>
          <div className="ml-3 flex h-7 items-center">
            <button
              type="button"
              onClick={() => closeDrawer()}
              className={`relative -m-2 p-2 ${theme.textMuted} ${theme.hoverItem}`}
            >
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Close panel</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
        </div>

        {isCartEmpty ? (
          <EmptyCart />
        ) : (
          <div className="mt-8">
            <div className="flow-root">
              <ul role="list" className={`-my-6 divide-y ${theme.border}`}>
                {cart.map((cartItem) => (
                  <li
                    key={cartItem.cartItemId}
                    className={`flex py-6 ${
                      removingId === cartItem.cartItemId
                        ? 'animate__animated animate__fadeOutLeft animate__faster'
                        : 'animate__animated animate__fadeInLeft'
                    }`}
                  >
                    <div
                      className={`size-24 shrink-0 overflow-hidden rounded-md border ${theme.border}`}
                    >
                      <img
                        alt={cartItem.product.name}
                        src={cartItem.product.image}
                        className="size-full object-cover"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div
                          className={`flex justify-between text-base font-medium ${theme.textActive}`}
                        >
                          <h3>
                            <a>{cartItem.product.name}</a>
                          </h3>
                          <p className="ml-4">{cartItem.product.price}</p>
                        </div>
                        <p className={`mt-1 text-sm ${theme.textMuted}`}>
                          {cartItem.product.category}
                        </p>

                        {/* Display selected options */}
                        {Object.keys(cartItem.selectedOptions).length > 0 && (
                          <div
                            className={`mt-2 text-xs ${theme.textMuted} flex flex-wrap gap-1`}
                          >
                            {Object.entries(cartItem.selectedOptions).map(
                              ([key, value]) => (
                                <span
                                  key={key}
                                  className="bg-slate-700/50 px-2 py-1 rounded"
                                >
                                  {value}
                                </span>
                              )
                            )}
                          </div>
                        )}
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => decrementItem(cartItem.cartItemId)}
                            className={`p-1 rounded ${theme.buttonBg} ${theme.buttonHover}`}
                          >
                            <span className={theme.text}>-</span>
                          </button>
                          <p className={`${theme.textMuted} font-medium`}>
                            Qty {cartItem.quantity}
                          </p>
                          <button
                            onClick={() => incrementItem(cartItem.cartItemId)}
                            className={`p-1 rounded ${theme.buttonBg} ${theme.buttonHover}`}
                          >
                            <span className={theme.text}>+</span>
                          </button>
                        </div>

                        <div className="flex">
                          <button
                            type="button"
                            onClick={() => handleRemove(cartItem.cartItemId)}
                            disabled={removingId === cartItem.cartItemId}
                            className="font-medium text-indigo-600 hover:text-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      <div className={`border-t ${theme.border} px-4 py-6 sm:px-6`}>
        <div
          className={`flex justify-between text-base font-medium ${theme.textActive}`}
        >
          <p>Subtotal</p>
          <p className="transition-all duration-300">{subtotal}</p>
        </div>
        <p className={`mt-0.5 text-sm ${theme.textMuted}`}>
          Shipping and taxes calculated at checkout.
        </p>
        <div className="mt-6">
          <button
            disabled={isCartEmpty}
            className="w-full flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-xs hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
          >
            Checkout
          </button>
        </div>
        <div
          className={`mt-6 flex justify-center text-center text-sm ${theme.textMuted}`}
        >
          <p>
            or{' '}
            <button
              type="button"
              onClick={() => closeDrawer()}
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Continue Shopping
              <span aria-hidden="true"> &rarr;</span>
            </button>
          </p>
        </div>
      </div>
    </>
  );
};
