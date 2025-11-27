import { type ReactNode } from 'react';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { useTheme } from '../context/useTheme';
import { useDrawerStore } from '../stores/drawerStore';

interface DrawerLayoutProps {
  children: ReactNode;
}

export default function DrawerLayout({ children }: DrawerLayoutProps) {
  const { theme } = useTheme();
  const { isOpen, closeDrawer } = useDrawerStore();

  return (
    <div>
      <Dialog open={isOpen} onClose={closeDrawer} className="relative z-10">
        <DialogBackdrop
          transition
          className={`fixed inset-0 ${theme.backdrop} transition-opacity duration-500 ease-in-out data-closed:opacity-0`}
        />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
              <DialogPanel
                transition
                className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700"
              >
                <div
                  className={`flex h-full flex-col overflow-y-auto ${theme.bgDrawer} shadow-xl`}
                >
                  {children}
                </div>
              </DialogPanel>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
