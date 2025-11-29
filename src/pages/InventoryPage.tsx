import { useState } from 'react';
import {
  PlusIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  PencilIcon,
  TrashIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';
import { useTheme } from '../context/useTheme';

export default function InventoryManagement() {
  const { darkMode, theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [showAddModal, setShowAddModal] = useState(false);

  console.log(showAddModal);

  // Sample inventory data
  const inventory = [
    {
      id: 1,
      name: 'Espresso Premium',
      sku: 'ESP-001',
      category: 'Hot Beverages',
      stock: 45,
      minStock: 20,
      price: 3.5,
      cost: 1.2,
      supplier: 'Coffee Beans Co.',
      lastRestocked: '2024-11-20',
      image:
        'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=100&h=100&fit=crop',
    },
    {
      id: 2,
      name: 'Cappuccino Mix',
      sku: 'CAP-002',
      category: 'Hot Beverages',
      stock: 12,
      minStock: 15,
      price: 4.5,
      cost: 1.8,
      supplier: 'Coffee Beans Co.',
      lastRestocked: '2024-11-18',
      image:
        'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=100&h=100&fit=crop',
    },
    {
      id: 3,
      name: 'Croissant',
      sku: 'BKY-003',
      category: 'Bakery',
      stock: 28,
      minStock: 10,
      price: 3.0,
      cost: 0.9,
      supplier: 'Fresh Bakery Ltd.',
      lastRestocked: '2024-11-24',
      image:
        'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=100&h=100&fit=crop',
    },
    {
      id: 4,
      name: 'Blueberry Muffin',
      sku: 'BKY-004',
      category: 'Bakery',
      stock: 8,
      minStock: 12,
      price: 2.75,
      cost: 0.85,
      supplier: 'Fresh Bakery Ltd.',
      lastRestocked: '2024-11-22',
      image:
        'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=100&h=100&fit=crop',
    },
    {
      id: 5,
      name: 'Club Sandwich',
      sku: 'FD-005',
      category: 'Food',
      stock: 15,
      minStock: 8,
      price: 9.0,
      cost: 3.5,
      supplier: 'Daily Fresh Foods',
      lastRestocked: '2024-11-24',
      image:
        'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=100&h=100&fit=crop',
    },
    {
      id: 6,
      name: 'Caesar Salad',
      sku: 'FD-006',
      category: 'Food',
      stock: 22,
      minStock: 10,
      price: 8.5,
      cost: 2.8,
      supplier: 'Daily Fresh Foods',
      lastRestocked: '2024-11-23',
      image:
        'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=100&h=100&fit=crop',
    },
    {
      id: 7,
      name: 'Iced Latte',
      sku: 'CLD-007',
      category: 'Cold Beverages',
      stock: 35,
      minStock: 15,
      price: 4.75,
      cost: 1.5,
      supplier: 'Coffee Beans Co.',
      lastRestocked: '2024-11-21',
      image:
        'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=100&h=100&fit=crop',
    },
    {
      id: 8,
      name: 'Smoothie Bowl Mix',
      sku: 'HLT-008',
      category: 'Healthy',
      stock: 5,
      minStock: 10,
      price: 7.5,
      cost: 2.5,
      supplier: 'Organic Supplies Inc.',
      lastRestocked: '2024-11-19',
      image:
        'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=100&h=100&fit=crop',
    },
  ];

  const categories = [
    'Todos',
    'Hot Beverages',
    'Cold Beverages',
    'Bakery',
    'Food',
    'Healthy',
  ];

  // Calculate stats
  const totalItems = inventory.length;
  const lowStockItems = inventory.filter(
    (item) => item.stock <= item.minStock
  ).length;
  const totalValue = inventory.reduce(
    (sum, item) => sum + item.stock * item.price,
    0
  );

  return (
    <div className={`${theme.bg} min-h-screen`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-4 sm:px-6 md:px-8 lg:px-10 pt-6 sm:pt-8 pb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 md:gap-8 w-full sm:w-auto">
          <h2
            className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}
          >
            Gestión de inventario
          </h2>
          <div
            className={`hidden sm:block h-5 w-px ${darkMode ? 'bg-gray-600' : 'bg-gray-300'}`}
          ></div>
          <div className="flex items-center gap-4 sm:gap-6 md:gap-8 overflow-x-auto w-full sm:w-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`text-xs sm:text-sm font-medium whitespace-nowrap ${
                  selectedCategory === category
                    ? 'text-[#7c85ff]'
                    : darkMode
                      ? 'text-gray-400 hover:text-gray-300'
                      : 'text-gray-500 hover:text-gray-900'
                } transition-colors`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div
        className={`grid grid-cols-1 sm:grid-cols-3 border-t border-b ${theme.border} divide-y md:divide-y-0 md:divide-x ${theme.divider}`}
      >
        <div
          className={`flex flex-col justify-center px-6 md:px-8 lg:px-10 py-6`}
        >
          <div className="flex items-center justify-between mb-4">
            <span
              className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}
            >
              Total productos
            </span>
          </div>
          <div
            className={`text-2xl md:text-3xl lg:text-[32px] font-semibold leading-none ${darkMode ? 'text-white' : 'text-gray-900'}`}
          >
            {totalItems}
          </div>
        </div>

        <div
          className={`flex flex-col justify-center px-6 md:px-8 lg:px-10 py-6`}
        >
          <div className="flex items-center justify-between mb-4">
            <span
              className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}
            >
              Stock bajo
            </span>
            {lowStockItems > 0 && (
              <span
                className={`text-xs font-medium ${darkMode ? 'text-orange-400' : 'text-orange-600'}`}
              >
                ¡Atención!
              </span>
            )}
          </div>
          <div
            className={`text-2xl md:text-3xl lg:text-[32px] font-semibold leading-none ${darkMode ? 'text-white' : 'text-gray-900'}`}
          >
            {lowStockItems}
          </div>
        </div>

        <div
          className={`flex flex-col justify-center px-6 md:px-8 lg:px-10 py-6`}
        >
          <div className="flex items-center justify-between mb-4">
            <span
              className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}
            >
              Valor total
            </span>
            <span
              className={`text-xs font-medium ${darkMode ? 'text-green-400' : 'text-green-600'}`}
            >
              Inventario
            </span>
          </div>
          <div
            className={`text-2xl md:text-3xl lg:text-[32px] font-semibold leading-none ${darkMode ? 'text-white' : 'text-gray-900'}`}
          >
            ${totalValue.toFixed(2)}
          </div>
        </div>
      </div>

      {/* Actions Bar */}
      <div className="px-4 sm:px-6 md:px-8 lg:px-10 py-6">
        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between mb-6">
          <div className="flex flex-col sm:flex-row gap-3 flex-1">
            <div className="relative flex-1 max-w-md">
              <MagnifyingGlassIcon
                className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}
              />
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-2.5 rounded-lg ${
                  darkMode
                    ? 'bg-[#1e2936] text-white placeholder-gray-500 border border-gray-700'
                    : 'bg-white text-gray-900 placeholder-gray-400 border border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-[#7c85ff] transition-all`}
              />
            </div>
            <button
              className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg ${
                darkMode
                  ? 'bg-[#1e2936] hover:bg-[#242f3d] text-gray-300 border border-gray-700'
                  : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-300'
              } transition-colors`}
            >
              <FunnelIcon className="w-5 h-5" />
              <span className="hidden sm:inline">Filtrar</span>
            </button>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center justify-center gap-2 px-6 py-2.5 bg-[#7c85ff] hover:bg-[#6b75e8] text-white rounded-lg transition-colors font-medium"
          >
            <PlusIcon className="w-5 h-5" />
            Agregar producto
          </button>
        </div>

        {/* Inventory Table */}
        <div className="md:overflow-y-auto md:max-h-[calc(100vh-500px)]">
          {/* Table Header - Desktop */}
          <div className="hidden md:grid grid-cols-[0.8fr_1.5fr_1fr_0.8fr_0.8fr_1fr_1fr_0.8fr] gap-4 px-6 py-3 mb-2">
            <div
              className={`text-xs font-medium uppercase ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}
            >
              Imagen
            </div>
            <div
              className={`text-xs font-medium uppercase ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}
            >
              Producto
            </div>
            <div
              className={`text-xs font-medium uppercase ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}
            >
              Categoría
            </div>
            <div
              className={`text-xs font-medium uppercase ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}
            >
              Stock
            </div>
            <div
              className={`text-xs font-medium uppercase ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}
            >
              Precio
            </div>
            <div
              className={`text-xs font-medium uppercase ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}
            >
              Proveedor
            </div>
            <div
              className={`text-xs font-medium uppercase ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}
            >
              Última reposición
            </div>
            <div
              className={`text-xs font-medium uppercase ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}
            >
              Acciones
            </div>
          </div>

          {/* Table Rows */}
          <div className="space-y-2">
            {inventory.map((item) => (
              <div
                key={item.id}
                className={`grid grid-cols-1 md:grid-cols-[0.8fr_1.5fr_1fr_0.8fr_0.8fr_1fr_1fr_0.8fr] gap-4 px-6 py-4 rounded-lg ${
                  darkMode
                    ? 'bg-[#1e2936] hover:bg-[#242f3d]'
                    : 'bg-gray-50 hover:bg-gray-100'
                } transition-colors`}
              >
                {/* Image */}
                <div className="flex items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                </div>

                {/* Product Info */}
                <div className="flex flex-col justify-center">
                  <p
                    className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}
                  >
                    {item.name}
                  </p>
                  <p
                    className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}
                  >
                    SKU: {item.sku}
                  </p>
                </div>

                {/* Category */}
                <div className="flex items-center">
                  <span
                    className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                  >
                    {item.category}
                  </span>
                </div>

                {/* Stock */}
                <div className="flex items-center gap-2">
                  {item.stock <= item.minStock && (
                    <ExclamationTriangleIcon className="w-4 h-4 text-orange-500" />
                  )}
                  <div className="flex flex-col">
                    <span
                      className={`text-sm font-medium ${
                        item.stock <= item.minStock
                          ? 'text-orange-500'
                          : darkMode
                            ? 'text-white'
                            : 'text-gray-900'
                      }`}
                    >
                      {item.stock}
                    </span>
                    <span
                      className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}
                    >
                      Min: {item.minStock}
                    </span>
                  </div>
                </div>

                {/* Price */}
                <div className="flex flex-col justify-center">
                  <span
                    className={`text-sm font-medium ${darkMode ? 'text-green-400' : 'text-green-600'}`}
                  >
                    ${item.price.toFixed(2)}
                  </span>
                  <span
                    className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}
                  >
                    Costo: ${item.cost.toFixed(2)}
                  </span>
                </div>

                {/* Supplier */}
                <div className="flex items-center">
                  <span
                    className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                  >
                    {item.supplier}
                  </span>
                </div>

                {/* Last Restocked */}
                <div className="flex items-center">
                  <span
                    className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}
                  >
                    {item.lastRestocked}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button
                    className={`p-2 rounded-lg ${
                      darkMode
                        ? 'hover:bg-[#2a3544] text-gray-400 hover:text-white'
                        : 'hover:bg-gray-200 text-gray-600 hover:text-gray-900'
                    } transition-colors`}
                  >
                    <PencilIcon className="w-4 h-4" />
                  </button>
                  <button
                    className={`p-2 rounded-lg ${
                      darkMode
                        ? 'hover:bg-red-900/20 text-gray-400 hover:text-red-400'
                        : 'hover:bg-red-50 text-gray-600 hover:text-red-600'
                    } transition-colors`}
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
