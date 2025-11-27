import { useState, Fragment } from 'react';
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Transition,
  RadioGroup,
  Listbox,
} from '@headlessui/react';
import {
  XMarkIcon,
  CheckIcon,
  MinusIcon,
  PlusIcon,
  ChevronUpDownIcon,
} from '@heroicons/react/24/outline';
import { useTheme } from '../../../context/useTheme';
import { useCartStore, type Product } from '../../../stores/cartStore';
import { getProductOptions } from '../../../utils';
import type { ProductOption } from '../../../interfaces';

interface ProductOptionsModalProps {
  product: Product | null;
  open: boolean;
  onClose: () => void;
}

const initialState = (product: Product) => {
  const defaults: { [key: string]: string | number } = {};
  if (product) {
    const options = getProductOptions(product.id);
    options.forEach((option: ProductOption) => {
      if (option.defaultValue !== undefined) {
        defaults[option.id] = option.defaultValue;
      } else if (
        option.type === 'radio' &&
        option.options &&
        option.options.length > 0
      ) {
        defaults[option.id] = option.options[0];
      } else if (option.type === 'number') {
        defaults[option.id] = 1;
      }
    });
  }
  return defaults;
};

export default function ProductOptionsModal({
  product,
  open,
  onClose,
}: ProductOptionsModalProps) {
  const { theme, darkMode } = useTheme();
  const { addItemWithOptions } = useCartStore();

  const [selectedOptions, setSelectedOptions] = useState<{
    [key: string]: string | number;
  }>(initialState(product as Product));

  if (!product) return null;

  const options = product ? getProductOptions(product.id) : [];

  const handleOptionChange = (optionId: string, value: string | number) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [optionId]: value,
    }));
  };

  const handleAddToCart = () => {
    addItemWithOptions(product, selectedOptions);
    onClose();
  };

  const handleAddSimple = () => {
    addItemWithOptions(product, {});
    onClose();
  };

  const handleCancel = () => {
    onClose();
    setSelectedOptions({});
  };

  return (
    <Transition show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={handleCancel}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <DialogBackdrop
            className={`fixed inset-0 ${darkMode ? 'bg-slate-950/90' : 'bg-gray-900/50'}`}
          />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel
                className={`relative transform overflow-hidden rounded-2xl ${theme.sidebarBg} text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-2xl`}
              >
                {/* Header */}
                <div className={`relative px-6 pt-8 pb-6`}>
                  <button
                    onClick={handleCancel}
                    className={`absolute top-4 right-4 rounded-full p-2 ${theme.iconBg} ${theme.iconHover} transition-colors`}
                  >
                    <XMarkIcon className={`w-6 h-6 ${theme.textMuted}`} />
                  </button>

                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-32 h-32 rounded-2xl object-cover shadow-lg ring-4 ring-slate-700/50"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h2
                        className={`text-3xl font-bold ${theme.textActive} mb-2`}
                      >
                        {product.name}
                      </h2>
                      <p className={`text-base ${theme.textMuted} mb-3`}>
                        {product.category}
                      </p>
                      <div className="inline-flex items-center gap-2 bg-green-500/10 px-4 py-2 rounded-full">
                        <span className="text-3xl font-bold text-green-500">
                          {product.price}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Options */}
                <div
                  className={`px-6 py-6 space-y-8 max-h-[60vh] overflow-y-auto border-t ${theme.border}`}
                >
                  {options.length > 0 ? (
                    options.map((option: ProductOption) => (
                      <div key={option.id} className="space-y-3">
                        <div className="flex items-center justify-between">
                          <label
                            className={`text-lg font-semibold ${theme.text}`}
                          >
                            {option.label}
                          </label>
                          {option.required && (
                            <span className="inline-flex items-center gap-1 text-xs font-semibold text-red-400 bg-red-500/10 px-3 py-1 rounded-full">
                              <span className="w-1.5 h-1.5 bg-red-400 rounded-full"></span>
                              Required
                            </span>
                          )}
                        </div>

                        {/* Radio Group */}
                        {option.type === 'radio' && option.options && (
                          <RadioGroup
                            value={selectedOptions[option.id]}
                            onChange={(value) =>
                              handleOptionChange(option.id, value)
                            }
                          >
                            <div className="grid grid-cols-2 gap-3">
                              {option.options.map((optionValue) => (
                                <RadioGroup.Option
                                  key={optionValue}
                                  value={optionValue}
                                  className={({ checked }) =>
                                    `relative flex cursor-pointer rounded-xl px-5 py-4 shadow-md focus:outline-none transition-all ${
                                      checked
                                        ? 'bg-indigo-600 text-white ring-2 ring-indigo-500 ring-offset-2 ring-offset-slate-800'
                                        : `${theme.cardBg} ${theme.buttonHover} ${theme.text}`
                                    }`
                                  }
                                >
                                  {({ checked }) => (
                                    <>
                                      <div className="flex w-full items-center justify-between">
                                        <RadioGroup.Label
                                          as="span"
                                          className={`font-medium ${checked ? 'text-white' : theme.text}`}
                                        >
                                          {optionValue}
                                        </RadioGroup.Label>
                                        {checked && (
                                          <CheckIcon className="h-6 w-6 text-white" />
                                        )}
                                      </div>
                                    </>
                                  )}
                                </RadioGroup.Option>
                              ))}
                            </div>
                          </RadioGroup>
                        )}

                        {/* Listbox (Select) - Custom Combobox Style */}
                        {option.type === 'select' && option.options && (
                          <Listbox
                            value={selectedOptions[option.id] || ''}
                            onChange={(value) =>
                              handleOptionChange(option.id, value)
                            }
                          >
                            <div className="relative">
                              <Listbox.Button
                                className={`relative w-full cursor-pointer rounded-lg ${darkMode ? 'bg-slate-800' : 'bg-gray-100'} border-2 ${
                                  darkMode
                                    ? 'border-slate-700'
                                    : 'border-gray-300'
                                } py-3 px-4 text-left ${theme.text} hover:border-indigo-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors`}
                              >
                                <span className="block truncate font-medium">
                                  {selectedOptions[option.id] ||
                                    `Select ${option.label}...`}
                                </span>
                                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                                  <ChevronUpDownIcon
                                    className={`h-5 w-5 ${theme.textMuted}`}
                                    aria-hidden="true"
                                  />
                                </span>
                              </Listbox.Button>
                              <Transition
                                as={Fragment}
                                enter="transition ease-out duration-200"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="transition ease-in duration-150"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                              >
                                <Listbox.Options
                                  className={`absolute z-10 mt-2 w-full overflow-auto rounded-xl ${darkMode ? 'bg-slate-800' : 'bg-white'} border-2 ${
                                    darkMode
                                      ? 'border-slate-700'
                                      : 'border-gray-300'
                                  } py-1 shadow-xl max-h-60 focus:outline-none`}
                                >
                                  {option.options.map((optionValue) => (
                                    <Listbox.Option
                                      key={optionValue}
                                      value={optionValue}
                                      className={({ active }) =>
                                        `relative cursor-pointer select-none py-3 px-4 transition-colors ${
                                          active
                                            ? darkMode
                                              ? 'bg-slate-700'
                                              : 'bg-gray-100'
                                            : ''
                                        } ${theme.text}`
                                      }
                                    >
                                      {({ selected }) => (
                                        <span
                                          className={`block truncate ${
                                            selected
                                              ? 'font-semibold'
                                              : 'font-normal'
                                          }`}
                                        >
                                          {optionValue}
                                        </span>
                                      )}
                                    </Listbox.Option>
                                  ))}
                                </Listbox.Options>
                              </Transition>
                            </div>
                          </Listbox>
                        )}

                        {/* Number Input */}
                        {option.type === 'number' && (
                          <div className="flex items-center justify-center gap-8 py-4">
                            <button
                              type="button"
                              onClick={() => {
                                const current =
                                  Number(selectedOptions[option.id]) || 1;
                                if (current > 1)
                                  handleOptionChange(option.id, current - 1);
                              }}
                              disabled={Number(selectedOptions[option.id]) <= 1}
                              className={`group w-16 h-16 flex items-center justify-center rounded-2xl ${theme.cardBg} ${theme.buttonHover} transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed shadow-lg`}
                            >
                              <MinusIcon
                                className={`w-6 h-6 ${theme.text} group-hover:scale-110 transition-transform`}
                              />
                            </button>

                            <div className="flex flex-col items-center">
                              <span
                                className={`text-5xl font-bold ${theme.text}`}
                              >
                                {selectedOptions[option.id] || 1}
                              </span>
                              <span
                                className={`text-sm ${theme.textMuted} mt-2`}
                              >
                                {option.label}
                              </span>
                            </div>

                            <button
                              type="button"
                              onClick={() => {
                                const current =
                                  Number(selectedOptions[option.id]) || 1;
                                if (current < 10)
                                  handleOptionChange(option.id, current + 1);
                              }}
                              disabled={
                                Number(selectedOptions[option.id]) >= 10
                              }
                              className={`group w-16 h-16 flex items-center justify-center rounded-2xl ${theme.cardBg} ${theme.buttonHover} transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed shadow-lg`}
                            >
                              <PlusIcon
                                className={`w-6 h-6 ${theme.text} group-hover:scale-110 transition-transform`}
                              />
                            </button>
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className={`text-center py-12`}>
                      <div
                        className={`inline-flex items-center gap-2 ${theme.textMuted}`}
                      >
                        <CheckIcon className="w-6 h-6" />
                        <p className="text-lg">
                          Ready to add - no customization needed
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className={`px-6 py-6 border-t ${theme.border} space-y-3`}>
                  {options.length > 0 ? (
                    <>
                      <button
                        type="button"
                        onClick={handleAddToCart}
                        className="w-full px-6 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white font-bold transition-all shadow-lg hover:shadow-indigo-500/50 active:scale-[0.98] text-lg flex items-center justify-center gap-2"
                      >
                        <PlusIcon className="w-6 h-6" />
                        Add to Cart
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={handleAddSimple}
                      className="w-full px-6 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white font-bold transition-all shadow-lg hover:shadow-indigo-500/50 active:scale-[0.98] text-lg flex items-center justify-center gap-2"
                    >
                      <PlusIcon className="w-6 h-6" />
                      Add to Cart
                    </button>
                  )}
                </div>
              </DialogPanel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
