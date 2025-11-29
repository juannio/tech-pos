import { useState } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import {
  BellIcon,
  ChevronDownIcon,
  Bars3Icon,
} from '@heroicons/react/24/outline';
import ProductPage from '../pages/ProductsPage';
import { useTheme } from '../context/useTheme';
import { SideBar } from '../components/SideBar';
/* import { SalesPage } from '../pages/SalesPage';
import { EmployeesAttendance } from '../pages/EmployesPage';
import InventoryManagement from '../pages/InventoryPage'; */

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { theme, darkMode } = useTheme();

  return (
    <div className={`flex h-screen ${theme.text}`}>
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className={`fixed inset-0 ${theme.backdrop} z-40 lg:hidden`}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <SideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Content Area */}
      <div className={`flex-1 ${theme.bg} flex flex-col min-w-0`}>
        {/* Top Bar */}
        <header
          className={`h-16 border-b ${theme.border} flex items-center justify-between px-4 lg:px-6`}
        >
          {/* Mobile menu button & Search */}
          <div className="flex items-center gap-3 flex-1">
            <button
              onClick={() => setSidebarOpen(true)}
              className={`lg:hidden p-2 ${theme.hoverBg} rounded-lg transition-colors`}
            >
              <Bars3Icon className={`w-6 h-6 ${theme.textMuted}`} />
            </button>
          </div>

          {/* User Menu */}
          <div className="flex items-center gap-2 lg:gap-4">
            <button
              className={`p-2 ${theme.hoverBg} rounded-lg transition-colors`}
            >
              <BellIcon className={`w-5 h-5 ${theme.textMuted}`} />
            </button>

            <Menu as="div" className="relative">
              <MenuButton
                className={`flex items-center gap-2 lg:gap-3 ${theme.hoverBg} px-2 lg:px-3 py-2 rounded-lg transition-colors`}
              >
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
                  alt="User"
                  className="w-8 h-8 rounded-full flex-shrink-0"
                />
                <span
                  className={`hidden md:block font-medium ${theme.textActive}`}
                >
                  Tom Cook
                </span>
                <ChevronDownIcon
                  className={`hidden md:block w-4 h-4 ${theme.textMuted}`}
                />
              </MenuButton>

              <MenuItems
                className={`absolute right-0 mt-2 w-56 origin-top-right rounded-lg ${theme.sidebarBg} ${theme.border} border shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none py-1 z-50`}
              >
                <MenuItem>
                  {({ active }) => (
                    <button
                      className={`${
                        active
                          ? darkMode
                            ? 'bg-slate-800'
                            : 'bg-gray-100'
                          : ''
                      } ${theme.text} group flex w-full items-center px-4 py-3 text-sm transition-colors`}
                    >
                      Your profile
                    </button>
                  )}
                </MenuItem>
                <MenuItem>
                  {({ active }) => (
                    <button
                      className={`${
                        active
                          ? darkMode
                            ? 'bg-slate-800'
                            : 'bg-gray-100'
                          : ''
                      } ${theme.text} group flex w-full items-center px-4 py-3 text-sm transition-colors`}
                    >
                      Sign out
                    </button>
                  )}
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </header>

        {/* Main Content */}
        {/* flex-1 p-4 lg:p-8  */}
        <main className="overflow-auto">
          <div
          /*             className={`h-full border-2 border-dashed ${theme.border} rounded-lg`}
           */
          >
            <ProductPage />
            {/* <SalesPage /> */}
            {/* <EmployeesAttendance /> */}
            {/* <InventoryManagement /> */}
          </div>
        </main>
      </div>
    </div>
  );
}
